import { getRecentPayments } from '@/actions/payments'

export default async function FinancesPage() {
    const payments = await getRecentPayments()

    return (
        <div style={{ padding: '24px' }}>
            <h1>Finanzas y Pagos</h1>
            <p>Total pagos registrados: {payments.length}</p>
        </div>
    )
}
