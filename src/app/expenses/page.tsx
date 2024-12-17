import { CreateExpense } from '@/app/ui/expenses/CreateExpense'

export const dynamic = 'force-dynamic'

export default async function Page({
  searchParams,
}: {
  searchParams: { create: string }
}) {
  return <>{searchParams.create === 'true' && <CreateExpense />}</>
}
