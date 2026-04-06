'use server'

import { connectDB } from '@/lib/mongodb'
import User from '@/models/User'

// TODO: Implement get users, create user, update user, delete user

export async function getUsers() {
    await connectDB()
    const users = await User.find({ role: 'alumno' }).sort({ createdAt: -1 }).lean()
    // Need to convert ObjectIds to strings for plain objects in Server Actions
    return JSON.parse(JSON.stringify(users))
}
