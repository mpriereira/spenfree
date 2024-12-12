import { notFound } from 'next/navigation'
import { getExpense } from '@/app/lib/actions'
import { ExpenseFormModal } from '@/app/ui/expenses/ExpenseFormModal'

export default async function Page({ params }: { params: { id: string } }) {
  const expense = await getExpense(+params.id)

  if (!expense) {
    return notFound()
  }

  return <ExpenseFormModal expense={expense} />
}
