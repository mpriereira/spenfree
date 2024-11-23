import { useEffect, useRef, useState } from 'react'
import { Category, Expense } from '@prisma/client'
import { toast } from 'toaster-ts'
import { getCategories } from '@/app/expenses/actions'
import { Modal } from '@/components/Modal'
import styles from '@/components/ExpenseFormModal.module.css'

type ExportFormModalProps = {
  isOpenModal: boolean
  closeModal: () => void
  expense?: Expense
  onSave: (formData: FormData) => Promise<void>
}

export const ExpenseFormModal = ({
  isOpenModal,
  closeModal,
  expense,
  onSave,
}: ExportFormModalProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const actionTitle = expense ? 'Edit expense' : 'Add expense'

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories()
      setCategories(categories)
    }
    fetchCategories()
  }, [])

  const getFormattedDate = () => {
    const date = expense?.date ?? new Date()
    return date.toISOString().split('T')[0]
  }

  const save = async (formData: FormData) => {
    onSave(formData)
      .then(() => {
        if (!expense) {
          formRef.current?.reset()
        }
      })
      .catch(() => {
        toast.error('Error while saving the expense')
      })
  }

  return (
    <Modal
      title={actionTitle}
      isOpen={isOpenModal}
      onClose={closeModal}
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
          <button onClick={closeModal}>Cancel</button>
        </footer>
      </form>
    </Modal>
  )
}
