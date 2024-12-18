import { notFound } from 'next/navigation'
import { getExpense } from '@/app/lib/actions'
import { UpdateExpense } from '@/app/ui/expenses/UpdateExpense'

export default async function Page({ params }: { params: { id: string } }) {
  const expense = await getExpense(params.id)

  if (!expense) {
    return notFound()
  }

  return <UpdateExpense expense={expense} />
}
