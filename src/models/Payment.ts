import mongoose, { Schema, Document, Types } from 'mongoose'

export type PaymentMethod = 'cash' | 'transfer' | 'mercadopago'
export type PaymentStatus = 'pending' | 'approved' | 'rejected'

export interface IPayment extends Document {
    gymId: Types.ObjectId
    userId: Types.ObjectId
    membershipId: Types.ObjectId
    amount: number
    method: PaymentMethod
    status: PaymentStatus
    mpPaymentId?: string
    paidAt?: Date
}

const PaymentSchema = new Schema<IPayment>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    membershipId: { type: Schema.Types.ObjectId, ref: 'Membership', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['cash', 'transfer', 'mercadopago'], required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    mpPaymentId: { type: String },
    paidAt: { type: Date },
}, { timestamps: true })

PaymentSchema.index({ gymId: 1, status: 1 })
PaymentSchema.index({ gymId: 1, userId: 1 })

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema)