'use server'

import { connectDB } from '@/lib/mongodb'
import ClassType from '@/models/ClassType'
import ScheduleSlot from '@/models/ScheduleSlot'
import ClassSession from '@/models/ClassSession'

// TODO: Implement get classes, create class, create slots, generate weekly sessions

export async function getClassTypes() {
    await connectDB()
    const classes = await ClassType.find().lean()
    return JSON.parse(JSON.stringify(classes))
}

export async function getScheduleSlots() {
    await connectDB()
    const slots = await ScheduleSlot.find().populate('classTypeId').lean()
    return JSON.parse(JSON.stringify(slots))
}
