import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IScheduleSlot extends Document {
    gymId: Types.ObjectId
    classTypeId: Types.ObjectId
    dayOfWeek: number        // 0=Dom, 1=Lun, ..., 6=Sab
    startTime: string        // "08:00"
    endTime: string          // "09:00"
    capacity: number
    instructor?: string
    active: boolean
}

const ScheduleSlotSchema = new Schema<IScheduleSlot>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    classTypeId: { type: Schema.Types.ObjectId, ref: 'ClassType', required: true },
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    capacity: { type: Number, required: true },
    instructor: { type: String },
    active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.ScheduleSlot || mongoose.model<IScheduleSlot>('ScheduleSlot', ScheduleSlotSchema)