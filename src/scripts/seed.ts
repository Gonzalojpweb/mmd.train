import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import Gym from '../models/Gym'
import User from '../models/User'

dotenv.config({ path: '.env.local' })

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://usuario:password@cluster0.xwqa5ic.mongodb.net/mmd'

async function seed() {
    await mongoose.connect(MONGODB_URI, { dbName: 'mmd' })
    console.log('Conectado a MongoDB')

    const gym = await Gym.findOneAndUpdate(
        { slug: 'mmd' },
        {
            name: 'MMD Entrenamiento',
            slug: 'mmd',
            address: 'Dardo Rocha 1268, Martínez',
            active: true,
        },
        { upsert: true, new: true }
    )
    console.log('Gym creado:', gym._id)

    const emailAdmin = process.env.ADMIN_EMAIL || 'pgonzalojose@gmail.com' // <-- Cambia esto por tu correo real de Google

    const admin = await User.findOneAndUpdate(
        {
            email: emailAdmin
        },
        {
            gymId: gym._id,
            name: 'Gonzalo Palomo',
            email: emailAdmin,
            passwordHash: 'google-oauth',
            role: 'admin',
            active: true,
        },
        { upsert: true, new: true }
    )
    console.log('Admin creado:', admin._id)

    await mongoose.disconnect()
    console.log('Listo')
}

seed().catch(console.error)