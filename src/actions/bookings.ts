'use server'

import { connectDB } from '@/lib/mongodb'
import ClassSession from '@/models/ClassSession'
import Booking from '@/models/Booking'
import ScheduleSlot from '@/models/ScheduleSlot'
import Gym from '@/models/Gym'
import { auth } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { Types } from 'mongoose'

/**
 * Gets upcoming sessions for the next 7 days, 
 * materializing them from ScheduleSlots if they don't exist.
 */
export async function getAvailableSessions() {
    await connectDB()
    const gym = await Gym.findOne({ slug: 'mmd' })
    if (!gym) return []

    // Get all active schedule slots
    const slots = await ScheduleSlot.find({ gymId: gym._id, active: true }).populate('classTypeId').lean()
    
    const sessions = []
    const now = new Date()
    
    // Check next 7 days
    for (let i = 0; i < 7; i++) {
        const date = new Date()
        date.setDate(now.getDate() + i)
        date.setHours(0, 0, 0, 0)
        
        const dayOfWeek = date.getDay()
        const daySlots = slots.filter(s => s.dayOfWeek === dayOfWeek)

        for (const slot of daySlots) {
            // Try to find existing session for this date/slot
            let session = await ClassSession.findOne({ 
                slotId: slot._id, 
                date: date 
            }).populate('classTypeId').lean()

            if (!session) {
                // Return a "virtual" session that will be created on first booking
                session = {
                    _id: `virtual-${slot._id}-${date.getTime()}`,
                    gymId: gym._id,
                    slotId: slot._id,
                    classTypeId: slot.classTypeId,
                    date: date,
                    startTime: slot.startTime,
                    capacity: slot.capacity,
                    bookedCount: 0,
                    status: 'scheduled',
                    isVirtual: true
                }
            }
            sessions.push(JSON.parse(JSON.stringify(session)))
        }
    }

    // Sort by date and time
    return sessions.sort((a, b) => {
        const dateA = new Date(a.date).getTime()
        const dateB = new Date(b.date).getTime()
        if (dateA !== dateB) return dateA - dateB
        return a.startTime.localeCompare(b.startTime)
    })
}

/**
 * Creates a booking for a session. 
 * If it's a virtual session, it creates the ClassSession first.
 */
export async function createBooking(sessionData: any) {
    const session_auth = await auth()
    if (!session_auth?.user?.id) throw new Error('Unauthorized')

    await connectDB()
    let sessionId: string

    if (sessionData.isVirtual) {
        // Materialize virtual session
        const newSession = await ClassSession.findOneAndUpdate(
            { slotId: sessionData.slotId, date: new Date(sessionData.date) },
            { 
                gymId: sessionData.gymId,
                slotId: sessionData.slotId,
                classTypeId: sessionData.classTypeId._id,
                date: new Date(sessionData.date),
                startTime: sessionData.startTime,
                capacity: sessionData.capacity,
                bookedCount: 0,
                status: 'scheduled'
            },
            { upsert: true, new: true }
        )
        sessionId = newSession._id.toString()
    } else {
        sessionId = sessionData._id
    }

    // Check capacity and create booking atomically
    const session = await ClassSession.findById(sessionId)
    if (!session) throw new Error('Session not found')
    if (session.bookedCount >= session.capacity) throw new Error('Class is full')

    try {
        await Booking.create({
            gymId: session.gymId,
            sessionId: session._id,
            userId: session_auth.user.id,
            status: 'confirmed'
        })

        // Increment count
        session.bookedCount += 1
        await session.save()
        
        revalidatePath('/home')
        revalidatePath('/admin/bookings')
        return { success: true }
    } catch (error: any) {
        if (error.code === 11000) throw new Error('Ya tienes una reserva para esta clase')
        throw error
    }
}

/**
 * Cancels an existing booking
 */
export async function cancelBooking(bookingId: string) {
    await connectDB()
    const booking = await Booking.findById(bookingId)
    if (!booking) throw new Error('Booking not found')

    await ClassSession.findByIdAndUpdate(booking.sessionId, { $inc: { bookedCount: -1 } })
    await Booking.findByIdAndDelete(bookingId)

    revalidatePath('/home')
    revalidatePath('/admin/bookings')
    return { success: true }
}

/**
 * Gets the user's active bookings
 */
export async function getUserBookings() {
    const session_auth = await auth()
    if (!session_auth?.user?.id) return []

    await connectDB()
    const bookings = await Booking.find({ userId: session_auth.user.id, status: 'confirmed' })
        .populate({
            path: 'sessionId',
            populate: { path: 'classTypeId' }
        })
        .lean()
        
    return JSON.parse(JSON.stringify(bookings))
}

/**
 * Gets all bookings for the admin (by date)
 */
export async function getAdminBookings(dateStr?: string) {
    await connectDB()
    const date = dateStr ? new Date(dateStr) : new Date()
    date.setHours(0, 0, 0, 0)
    
    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

    const sessions = await ClassSession.find({
        date: { $gte: date, $lte: endOfDay }
    })
    .populate('classTypeId')
    .populate('slotId')
    .lean()

    const sessionsWithBookings = await Promise.all(sessions.map(async (session: any) => {
        const bookings = await Booking.find({ sessionId: session._id })
            .populate('userId')
            .lean()
        return {
            ...JSON.parse(JSON.stringify(session)),
            bookings: JSON.parse(JSON.stringify(bookings))
        }
    }))

    return sessionsWithBookings
}

/**
 * Gets student profile statistics and next class for gamification
 */
export async function getUserProfileStats() {
    const session_auth = await auth()
    if (!session_auth?.user?.id) throw new Error('Unauthorized')

    await connectDB()
    const userId = session_auth.user.id

    // 1. Total attended classes (Lifetime)
    const attendedCount = await Booking.countDocuments({ 
        userId, 
        status: 'attended' 
    })

    // 2. Confirmed (upcoming) bookings
    const confirmedCount = await Booking.countDocuments({ 
        userId, 
        status: 'confirmed' 
    })

    // 3. This Month's Progress
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const attendedThisMonth = await Booking.countDocuments({
        userId,
        status: 'attended',
        updatedAt: { $gte: startOfMonth }
    })

    // 4. Find the NEXT class for countdown
    const nextBooking = await Booking.findOne({ 
        userId, 
        status: 'confirmed' 
    })
    .populate({
        path: 'sessionId',
        match: { date: { $gte: new Date().setHours(0,0,0,0) } }, // Only today onwards
        populate: { path: 'classTypeId' }
    })
    .sort({ 'sessionId.date': 1, 'sessionId.startTime': 1 })
    .lean() as any

    // Filter out if sessionId population failed due to date match
    const validNextBooking = nextBooking?.sessionId ? nextBooking : null

    return {
        attendedCount,
        confirmedCount,
        attendedThisMonth,
        nextClass: JSON.parse(JSON.stringify(validNextBooking?.sessionId || null)),
        planLimit: 16 // Hardcoded for now, should come from MembershipPlan
    }
}

/**
 * Toggles a booking status (confirmed -> attended)
 */
export async function toggleAttendance(bookingId: string, currentStatus: string) {
    await connectDB()
    const newStatus = currentStatus === 'attended' ? 'confirmed' : 'attended'
    await Booking.findByIdAndUpdate(bookingId, { 
        status: newStatus,
        checkedInAt: newStatus === 'attended' ? new Date() : null
    })
    revalidatePath('/admin/bookings')
    return { success: true }
}


