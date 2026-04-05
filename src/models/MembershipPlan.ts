import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IMembershipPlan extends Document {
    gymId: Types.ObjectId
    name: string
    classesPerMonth: number
    price: number
    durationDays: number
    active: boolean
}

const MembershipPlanSchema = new Schema<IMembershipPlan>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    name: { type: String, required: true },
    classesPerMonth: { type: Number, required: true },
    price: { type: Number, required: true },
    durationDays: { type: Number, default: 30 },
    active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.MembershipPlan || mongoose.model<IMembershipPlan>('MembershipPlan', MembershipPlanSchema)