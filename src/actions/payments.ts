'use server'

import { connectDB } from '@/lib/mongodb'
import Payment from '@/models/Payment'

// TODO: Implement get payments, record payment, link with Mercadopago

export async function getRecentPayments() {
    await connectDB()
    const payments = await Payment.find().sort({ createdAt: -1 }).limit(50).populate('userId').lean()
    return JSON.parse(JSON.stringify(payments))
}

/**
 * Calculates total revenue for the current month
 */
export async function getMonthlyRevenue() {
    await connectDB()
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const result = await Payment.aggregate([
        { $match: { createdAt: { $gte: startOfMonth }, status: 'completed' } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
    ])

    return result[0]?.total || 0
}

