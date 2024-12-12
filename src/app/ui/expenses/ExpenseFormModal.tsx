import { Expense } from '@prisma/client'
import { getCategories } from '@/app/lib/actions'
import { ExpenseForm } from '@/app/ui/expenses/ExpenseForm'
import { Modal } from '@/app/ui/common/Modal'

type ExportFormModalProps = {
  expense?: Expense
}

export async function ExpenseFormModal({ expense }: ExportFormModalProps) {
  const categories = await getCategories()

  return (
    <Modal title={expense ? 'Edit expense' : 'Add expense'}>
      <ExpenseForm expense={expense} categories={categories} />
    </Modal>
  )
}
