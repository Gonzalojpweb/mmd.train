import mongoose, { Schema, Document, Types } from 'mongoose'

export type SessionStatus = 'scheduled' | 'cancelled' | 'completed'

export interface IClassSession extends Document {
    gymId: Types.ObjectId
    slotId: Types.ObjectId
    classTypeId: Types.ObjectId
    date: Date
    startTime: string
    capacity: number
    bookedCount: number
    status: SessionStatus
    notes?: string
}

const ClassSessionSchema = new Schema<IClassSession>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    slotId: { type: Schema.Types.ObjectId, ref: 'ScheduleSlot', required: true },
    classTypeId: { type: Schema.Types.ObjectId, ref: 'ClassType', required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    capacity: { type: Number, required: true },
    bookedCount: { type: Number, default: 0 },
    status: { type: String, enum: ['scheduled', 'cancelled', 'completed'], default: 'scheduled' },
    notes: { type: String },
}, { timestamps: true })

ClassSessionSchema.index({ gymId: 1, date: 1 })
ClassSessionSchema.index({ slotId: 1, date: 1 }, { unique: true })

export default mongoose.models.ClassSession || mongoose.model<IClassSession>('ClassSession', ClassSessionSchema)