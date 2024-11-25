'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'toaster-ts'
import { saveExpense } from '@/app/expenses/actions'
import { useCategories } from '@/hooks/useCategories'
import { useSelectedExpense } from '@/hooks/useSelectedExpense'
import { Modal } from '@/components/Modal'
import styles from '@/components/ExpenseFormModal.module.css'

type ExportFormModalProps = {
  isOpen: boolean
  close: () => void
}

export const ExpenseFormModal = ({ isOpen, close }: ExportFormModalProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()
  const { categories } = useCategories()
  const { selectedExpense: expense } = useSelectedExpense()
  const actionTitle = expense ? 'Edit expense' : 'Add expense'

  const getFormattedDate = () => {
    const date = expense?.date ?? new Date()
    return date.toISOString().split('T')[0]
  }

  const save = async (formData: FormData) => {
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
      title={actionTitle}
      isOpen={isOpen}
      onClose={close}
      hideFooter={true}
    >
      <form ref={formRef} action={save} className={styles.form}>
        <select
          required
          name="category"
          defaultValue={expense?.categoryId ?? ''}
        >
          <option value="" disabled>
            Select category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          required
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={expense?.title ?? ''}
        />
        <input
          required
          type="date"
          name="date"
          placeholder="Date"
          defaultValue={getFormattedDate()}
        />
        <input
          required
          type="number"
          name="amount"
          placeholder="Amount"
          defaultValue={expense?.amount}
        />
        <footer>
          <button type="submit">{actionTitle}</button>
          <button onClick={handleClose}>Cancel</button>
        </footer>
      </form>
    </Modal>
  )
}
