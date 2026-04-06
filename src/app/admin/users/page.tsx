import { getUsers } from '@/actions/users'

export default async function UsersPage() {
    const users = await getUsers()

    return (
        <div style={{ padding: '24px' }}>
            <h1>Gestión de Alumnos</h1>
            <p>Total de alumnos: {users.length}</p>
            <ul>
                {users.map((user: any) => (
                    <li key={user._id}>{user.name} - {user.email}</li>
                ))}
            </ul>
        </div>
    )
}
