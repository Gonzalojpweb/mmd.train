import { getClassTypes, getScheduleSlots } from '@/actions/classes'

export default async function ClassesPage() {
    const classTypes = await getClassTypes()
    const slots = await getScheduleSlots()

    return (
        <div style={{ padding: '24px' }}>
            <h1>Grilla de Clases</h1>
            <section>
                <h2>Tipos de Clases</h2>
                <ul>
                    {classTypes.map((ct: any) => (
                        <li key={ct._id}>{ct.name}</li>
                    ))}
                </ul>
            </section>
            
            <section>
                <h2>Horarios Recurrentes</h2>
                <p>Total slots: {slots.length}</p>
            </section>
        </div>
    )
}
