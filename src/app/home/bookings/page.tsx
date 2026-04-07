import { getAvailableSessions, getUserBookings } from '@/actions/bookings'
import BookingsClient from '@/components/student/BookingsClient'

export default async function BookingsPage() {
    const sessions = await getAvailableSessions()
    const bookings = await getUserBookings()

    return (
        <BookingsClient sessions={sessions} bookings={bookings} />
    )
}
