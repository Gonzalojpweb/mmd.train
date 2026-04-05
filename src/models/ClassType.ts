import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IClassType extends Document {
    gymId: Types.ObjectId
    name: string
    color: string
    active: boolean
}

const ClassTypeSchema = new Schema<IClassType>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    name: { type: String, required: true },
    color: { type: String, default: '#534AB7' },
    active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.ClassType || mongoose.model<IClassType>('ClassType', ClassTypeSchema)