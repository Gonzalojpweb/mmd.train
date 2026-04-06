'use server'

import { connectDB } from '@/lib/mongodb'
import ClassType from '@/models/ClassType'
import ScheduleSlot from '@/models/ScheduleSlot'
import ClassSession from '@/models/ClassSession'
import Gym from '@/models/Gym'
import { revalidatePath } from 'next/cache'

// --- CLASS TYPES ---

export async function getClassTypes() {
    await connectDB()
    const classes = await ClassType.find().sort({ name: 1 }).lean()
    return JSON.parse(JSON.stringify(classes))
}

export async function createClassType(data: { name: string, color?: string }) {
    await connectDB()
    const gym = await Gym.findOne({ slug: 'mmd' })
    if (!gym) throw new Error('Gym not found')

    const newType = await ClassType.create({
        ...data,
        gymId: gym._id,
        active: true
    })
    revalidatePath('/admin/classes')
    return JSON.parse(JSON.stringify(newType))
}

export async function updateClassType(id: string, data: any) {
    await connectDB()
    const updated = await ClassType.findByIdAndUpdate(id, data, { new: true })
    revalidatePath('/admin/classes')
    return JSON.parse(JSON.stringify(updated))
}

export async function deleteClassType(id: string) {
    await connectDB()
    await ClassType.findByIdAndDelete(id)
    // Deberíamos también borrar slots asociados? 
    // Por ahora solo el tipo.
    revalidatePath('/admin/classes')
    return { success: true }
}

// --- SCHEDULE SLOTS ---

export async function getScheduleSlots() {
    await connectDB()
    const slots = await ScheduleSlot.find()
        .populate('classTypeId')
        .sort({ dayOfWeek: 1, startTime: 1 })
        .lean()
    return JSON.parse(JSON.stringify(slots))
}

export async function createScheduleSlot(data: {
    classTypeId: string,
    dayOfWeek: number,
    startTime: string,
    endTime: string,
    capacity: number,
    instructor?: string
}) {
    await connectDB()
    const gym = await Gym.findOne({ slug: 'mmd' })
    if (!gym) throw new Error('Gym not found')

    const newSlot = await ScheduleSlot.create({
        ...data,
        gymId: gym._id,
        active: true
    })
    revalidatePath('/admin/classes')
    return JSON.parse(JSON.stringify(newSlot))
}

export async function updateScheduleSlot(id: string, data: any) {
    await connectDB()
    const updated = await ScheduleSlot.findByIdAndUpdate(id, data, { new: true })
    revalidatePath('/admin/classes')
    return JSON.parse(JSON.stringify(updated))
}

export async function deleteScheduleSlot(id: string) {
    await connectDB()
    await ScheduleSlot.findByIdAndDelete(id)
    revalidatePath('/admin/classes')
    return { success: true }
}

