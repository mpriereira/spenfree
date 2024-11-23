'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Expense, Category } from '@prisma/client'
import { toast } from 'toaster-ts'
import { getCategories } from '@/app/expenses/actions'
import styles from './ExpenseForm.module.css'

export const ExpenseForm = ({
  expense,
  onSave,
}: {
  expense?: Expense
  onSave: (formData: FormData) => Promise<void>
}) => {
  const formRef = useRef<HTMLFormElement>(null)
  const [categories, setCategories] = useState<Category[]>([])

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
        formRef.current?.reset()
      })
      .catch(() => {
        toast.error('Error while saving the expense')
      })
  }

  return (
    <form ref={formRef} action={save} className={styles.form}>
      <select required name="category" defaultValue={expense?.categoryId ?? ''}>
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
      <button type="submit">{expense ? 'Edit expense' : 'Add expense'}</button>
      {expense && <Link href={`/expenses`}>Cancel</Link>}
    </form>
  )
}
