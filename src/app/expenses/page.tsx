import { ExpenseFormModal } from '@/app/ui/expenses/ExpenseFormModal'

export const dynamic = 'force-dynamic'

export default function Page({
  searchParams,
}: {
  searchParams: { create: string }
}) {
  const create = searchParams.create === 'true'
  return <>{create && <ExpenseFormModal />}</>
}
