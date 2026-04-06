'use server'

import { connectDB } from '@/lib/mongodb'
import MembershipPlan from '@/models/MembershipPlan'
import Membership from '@/models/Membership'

// TODO: Implement get plans, create plan, assign membership to user

export async function getMembershipPlans() {
    await connectDB()
    const plans = await MembershipPlan.find().lean()
    return JSON.parse(JSON.stringify(plans))
}
