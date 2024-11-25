'use client'

import { useEffect } from 'react'
import { getExpense } from '@/app/expenses/actions'
import { useExpenseModal } from '@/hooks/useExpenseModal'
import { useSelectedExpense } from '@/hooks/useSelectedExpense'

export default function Home({ params }: { params: { id: string } }) {
  const { openModal } = useExpenseModal()
  const { selectExpense } = useSelectedExpense()

  useEffect(() => {
    const fetchExpense = async () => {
      const expense = await getExpense(+params.id)
      if (!expense) {
        throw new Error('Expense not found')
      }

      selectExpense(expense)
      openModal()
    }
    fetchExpense()
  }, [params.id])

  return null
}
