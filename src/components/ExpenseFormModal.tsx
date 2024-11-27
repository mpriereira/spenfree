'use client'

import { useRef } from 'react'
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
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { selectedExpense: expense } = useSelectedExpense()

  const handleSubmit = async (formData: FormData) => {
    toast.promise(saveExpense(formData, expense?.id), {
      loading: 'Saving expense...',
      success: () => {
        if (!expense) {
          formRef.current?.reset()
        }
        close()
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
        ref={formRef}
        onSubmit={handleSubmit}
        onCancel={handleClose}
      />
    </Modal>
  )
}
