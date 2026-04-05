import mongoose, { Schema, Document, Types } from 'mongoose'

export type BookingStatus = 'confirmed' | 'attended' | 'absent' | 'cancelled'

export interface IBooking extends Document {
    gymId: Types.ObjectId
    sessionId: Types.ObjectId
    userId: Types.ObjectId
    status: BookingStatus
    bookedAt: Date
    checkedInAt?: Date
}

const BookingSchema = new Schema<IBooking>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    sessionId: { type: Schema.Types.ObjectId, ref: 'ClassSession', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['confirmed', 'attended', 'absent', 'cancelled'], default: 'confirmed' },
    bookedAt: { type: Date, default: Date.now },
    checkedInAt: { type: Date },
}, { timestamps: true })

BookingSchema.index({ sessionId: 1, userId: 1 }, { unique: true })
BookingSchema.index({ gymId: 1, userId: 1 })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)