import { getCategories } from '@/app/lib/actions'
import { CreateExpense } from '@/app/ui/expenses/CreateExpense'

export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams,
}: {
  searchParams: { create: string }
}) {
  const categories = await getCategories()
  return (
    <>
      {searchParams.create === 'true' && (
        <CreateExpense categories={categories} />
      )}
    </>
  )
}
