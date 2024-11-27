'use client'

import { Expense } from '@prisma/client'
import { useCategories } from '@/hooks/useCategories'
import styles from './ExpenseForm.module.css'

type ExpenseFormProps = {
  expense: Expense | null
  onSubmit: (formData: FormData) => Promise<void>
  onCancel: () => void
}

export const ExpenseForm = ({
  expense,
  onSubmit,
  onCancel,
}: ExpenseFormProps) => {
  const { categories } = useCategories()

  const getFormattedDate = () => {
    const date = expense?.date ?? new Date()
    return date.toISOString().split('T')[0]
  }

  return (
    <form action={onSubmit} className={styles.form}>
      {categories.length > 0 && (
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
      )}
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
      <div className={styles.form__footer}>
        <button type="submit">
          {expense ? 'Edit expense' : 'Add expense'}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
