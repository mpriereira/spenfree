'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'toaster-ts'
import { Button } from '@mantine/core'
import { Expense } from '@prisma/client'
import { saveExpense } from '@/app/lib/actions'
import { CategorySelector } from '@/app/ui/expenses/CategorySelector'
import styles from './ExpenseForm.module.css'

type ExpenseFormProps = {
  expense?: Expense
}

export const ExpenseForm = ({ expense }: ExpenseFormProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryId = expense?.categoryId.toString()
  const [selectedCategory, setSelectedCategory] = useState(categoryId)
  const [hasCategoryError, setHasCategoryError] = useState(false)

  const getFormattedDate = () => {
    const date = expense?.date ?? new Date()
    return date.toISOString().split('T')[0]
  }

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setHasCategoryError(false)
  }

  const handleSubmit = async (formData: FormData) => {
    if (!selectedCategory) {
      console.error('No category selected')
      setHasCategoryError(true)
      return
    }
    formData.set('category', selectedCategory)
    toast.promise(
      saveExpense(formData, expense?.id).then(() => {
        const params = new URLSearchParams(searchParams)
        params.delete('create')
        router.push(`/expenses?${params.toString()}`)
      }),
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
      <CategorySelector
        defaultCategory={categoryId}
        hasError={hasCategoryError}
        onChange={handleCategoryChange}
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
        defaultValue={expense?.amount ? expense.amount / 100 : undefined}
      />
      <div className={styles.form__footer}>
        <Button type="submit">Save</Button>
      </div>
    </form>
  )
}
