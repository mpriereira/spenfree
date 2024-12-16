import { notFound } from 'next/navigation'
import { getCategories, getExpense } from '@/app/lib/actions'
import { UpdateExpense } from '@/app/ui/expenses/UpdateExpense'

export default async function Page({ params }: { params: { id: string } }) {
  const [expense, categories] = await Promise.all([
    getExpense(+params.id),
    getCategories(),
  ])

  if (!expense) {
    return notFound()
  }

  return <UpdateExpense categories={categories} expense={expense} />
}
