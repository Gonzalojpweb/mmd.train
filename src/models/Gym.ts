import mongoose, { Schema, Document } from 'mongoose'

export interface Igym extends Document {
    name: string
    slug: string
    address?: string
    mpToken?: string
    active: boolean
    createdAt: Date
}

const GymSchema = new Schema<Igym>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    address: { type: String },
    mpToken: { type: String },
    active: { type: Boolean, default: true },
}, { timestamps: true })

export default mongoose.models.Gym || mongoose.model<Igym>('Gym', GymSchema)