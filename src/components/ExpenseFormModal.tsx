'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'toaster-ts'
import { saveExpense } from '@/app/expenses/actions'
import { useSelectedExpense } from '@/hooks/useSelectedExpense'
import { Modal } from '@/components/Modal'
import { ExpenseForm } from '@/components/ExpenseForm'

type ExportFormModalProps = {
  isOpen: boolean
  close: () => void
}

export const ExpenseFormModal = ({ isOpen, close }: ExportFormModalProps) => {
  const router = useRouter()
  const { selectedExpense: expense, clearExpense } = useSelectedExpense()

  const handleSubmit = async (formData: FormData) => {
    toast.promise(saveExpense(formData, expense?.id), {
      loading: 'Saving expense...',
      success: () => {
        close()
        clearExpense()
        return 'Expense saved'
      },
      error: (err) => {
        console.error(err)
        return 'Error while saving the expense'
      },
    })
  }

  const handleClose = () => {
    close()
    clearExpense()
    router.push('/expenses')
  }

  return (
    <Modal
      title={expense ? 'Edit expense' : 'Add expense'}
      isOpen={isOpen}
      onClose={close}
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
