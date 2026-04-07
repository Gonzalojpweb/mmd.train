import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { connectDB } from '@/lib/mongodb'
import BodyRecord from '@/models/BodyRecord'

export async function GET(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')

        if (!userId) {
            return NextResponse.json({ error: 'UserId is required' }, { status: 400 })
        }

        await connectDB()
        
        // Filter by userId and gymId for security
        const records = await BodyRecord.find({ 
            userId, 
            gymId: (session.user as any).gymId 
        }).sort({ date: -1 })

        return NextResponse.json(records)
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { userId, date, weight, height, age, sex } = body

        if (!userId || !weight || !height || !age || !sex) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        await connectDB()

        const newRecord = await BodyRecord.create({
            gymId: (session.user as any).gymId,
            userId,
            date: date ? new Date(date) : new Date(),
            weight,
            height,
            age,
            sex
        })

        return NextResponse.json(newRecord, { status: 201 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
