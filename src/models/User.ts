import mongoose, { Schema, Document, Types } from 'mongoose'

export type UserRole = 'admin' | 'alumno'

export interface IUser extends Document {
    gymId: Types.ObjectId
    name: string
    email: string
    phone?: string
    passwordHash: string
    role: UserRole
    active: boolean
    birthDate?: Date
    weight?: number
    height?: number
    profileImageUrl?: string
    createdAt: Date
}

const UserSchema = new Schema<IUser>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['admin', 'alumno'], required: true },
    active: { type: Boolean, default: true },
    birthDate: { type: Date },
    weight: { type: Number },
    height: { type: Number },
    profileImageUrl: { type: String },
}, { timestamps: true })

UserSchema.index({ gymId: 1, email: 1 }, { unique: true })
UserSchema.index({ gymId: 1, role: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)