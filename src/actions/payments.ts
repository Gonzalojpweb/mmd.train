'use server'

import { connectDB } from '@/lib/mongodb'
import Payment from '@/models/Payment'

// TODO: Implement get payments, record payment, link with Mercadopago

export async function getRecentPayments() {
    await connectDB()
    const payments = await Payment.find().sort({ createdAt: -1 }).limit(50).populate('userId').lean()
    return JSON.parse(JSON.stringify(payments))
}
