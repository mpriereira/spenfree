'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'toaster-ts'
import { saveExpense } from '@/app/expenses/actions'
import { useSelectedExpense } from '@/hooks/useSelectedExpense'
import { ExpenseForm } from '@/components/expenses/ExpenseForm'
import { Modal } from '@/components/lib/modal/Modal'

type ExportFormModalProps = {
  isOpen: boolean
  onClose: () => void
}

export const ExpenseFormModal = ({ isOpen, onClose }: ExportFormModalProps) => {
  const router = useRouter()
  const { selectedExpense: expense, clearExpense } = useSelectedExpense()

  const handleSubmit = async (formData: FormData) => {
    toast.promise(saveExpense(formData, expense?.id), {
      loading: 'Saving expense...',
      success: () => {
        handleClose()
        return 'Expense saved'
      },
      error: (err) => {
        console.error(err)
        return 'Error while saving the expense'
      },
    })
  }

  const handleClose = () => {
    onClose()
    clearExpense()
    router.push('/expenses')
  }

  return (
    <Modal
      title={expense ? 'Edit expense' : 'Add expense'}
      isOpen={isOpen}
      hideFooter={true}
    >
      <ExpenseForm
        expense={expense}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </Modal>
  )
}
