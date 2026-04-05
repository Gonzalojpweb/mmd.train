import mongoose, { Schema, Document, Types } from 'mongoose'

export type MembershipStatus = 'active' | 'expired' | 'cancelled'

export interface IMembership extends Document {
    gymId: Types.ObjectId
    userId: Types.ObjectId
    planId: Types.ObjectId
    startDate: Date
    endDate: Date
    classesUsed: number
    status: MembershipStatus
}

const MembershipSchema = new Schema<IMembership>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: Schema.Types.ObjectId, ref: 'MembershipPlan', required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    classesUsed: { type: Number, default: 0 },
    status: { type: String, enum: ['active', 'expired', 'cancelled'], default: 'active' },
}, { timestamps: true })

MembershipSchema.index({ gymId: 1, userId: 1 })
MembershipSchema.index({ gymId: 1, status: 1, endDate: 1 })

export default mongoose.models.Membership || mongoose.model<IMembership>('Membership', MembershipSchema)