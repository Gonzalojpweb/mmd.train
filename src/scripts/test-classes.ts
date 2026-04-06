import { connectDB } from '../src/lib/mongodb'
import { createClassType, getClassTypes, createScheduleSlot, getScheduleSlots } from '../src/actions/classes'

async function testActions() {
    try {
        console.log('Testing Class Actions...')
        
        // 1. Get initial types
        const initialTypes = await getClassTypes()
        console.log('Initial Types:', initialTypes.length)

        // 2. Create a test type
        const newType = await createClassType({ name: 'Test Type', color: '#ff0000' })
        console.log('Created Type:', newType.name)

        // 3. Create a test slot
        const newSlot = await createScheduleSlot({
            classTypeId: newType._id,
            dayOfWeek: 1,
            startTime: '07:00',
            endTime: '08:00',
            capacity: 10
        })
        console.log('Created Slot for Day:', newSlot.dayOfWeek)

        // 4. Verify slots
        const slots = await getScheduleSlots()
        console.log('Total Slots:', slots.length)

        console.log('Test Passed!')
        process.exit(0)
    } catch (error) {
        console.error('Test Failed:', error)
        process.exit(1)
    }
}

testActions()
