import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IBodyRecord extends Document {
    gymId: Types.ObjectId
    userId: Types.ObjectId
    date: Date
    weight: number // kg
    height: number // cm
    age: number
    sex: 'male' | 'female'
    createdAt: Date
    updatedAt: Date
}

const BodyRecordSchema = new Schema<IBodyRecord>({
    gymId: { type: Schema.Types.ObjectId, ref: 'Gym', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true, default: Date.now },
    weight: { type: Number, required: true },
    height: { type: Number, required: true },
    age: { type: Number, required: true },
    sex: { type: String, enum: ['male', 'female'], required: true },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
})

// Virtual for IMC (BMI)
BodyRecordSchema.virtual('imc').get(function() {
    if (!this.weight || !this.height) return 0
    // Normalize: if height is < 3, it's likely meters, convert to cm
    const normalizedHeight = this.height < 3 ? this.height * 100 : this.height
    const heightInMeters = normalizedHeight / 100
    return parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(2))
})

// Virtual for IMC Classification
BodyRecordSchema.virtual('imcClassification').get(function() {
    const imc = (this as any).imc
    if (!imc) return '—'
    if (imc < 18.5) return 'Bajo Peso'
    if (imc < 25) return 'Normal'
    if (imc < 30) return 'Sobrepeso'
    return 'Obesidad'
})

// Virtual for Ideal Weight (Devine Formula)
BodyRecordSchema.virtual('idealWeight').get(function() {
    if (!this.height || !this.sex) return 0
    const normalizedHeight = this.height < 3 ? this.height * 100 : this.height
    const heightInInches = normalizedHeight / 2.54
    const baseWeight = this.sex === 'male' ? 50 : 45.5
    const weightAddon = 2.3 * (heightInInches - 60)
    const result = baseWeight + weightAddon
    return parseFloat(result.toFixed(2))
})

BodyRecordSchema.index({ gymId: 1, userId: 1 })
BodyRecordSchema.index({ gymId: 1, userId: 1, date: -1 })

export default mongoose.models.BodyRecord || mongoose.model<IBodyRecord>('BodyRecord', BodyRecordSchema)
