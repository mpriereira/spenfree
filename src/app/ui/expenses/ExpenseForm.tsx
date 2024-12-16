'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'toaster-ts'
import { Expense } from '@prisma/client'
import { saveExpense } from '@/app/lib/actions'
import { Category } from '@/app/lib/definitions'
import { Button } from '@/app/ui/common/Button'
import { ExpenseCategoriesSelector } from '@/app/ui/expenses/ExpenseCategoriesSelector'
import styles from './ExpenseForm.module.css'

type ExpenseFormProps = {
  expense?: Expense
  categories: Category[]
}

export const ExpenseForm = ({ expense, categories }: ExpenseFormProps) => {
  const router = useRouter()
  const categoryId = expense?.categoryId.toString() ?? ''

  const getFormattedDate = () => {
    const date = expense?.date ?? new Date()
    return date.toISOString().split('T')[0]
  }

  const handleSubmit = async (formData: FormData) => {
    toast.promise(
      saveExpense(formData, expense?.id).then(() => router.push('/expenses')),
      {
        loading: 'Saving expense...',
        success: () => 'Expense saved',
        error: (err) => {
          console.error(err)
          return 'Error while saving the expense'
        },
      },
    )
  }

  return (
    <form action={handleSubmit} className={styles.form}>
      <ExpenseCategoriesSelector
        categories={categories}
        defaultValue={categoryId}
      />
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
        <Button text="Confirm" type="submit" />
      </div>
    </form>
  )
}
