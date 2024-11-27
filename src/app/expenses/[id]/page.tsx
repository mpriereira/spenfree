'use client'

import { useEffect } from 'react'
import { getExpense } from '@/app/expenses/actions'
import { useModal } from '@/hooks/useModal'
import { useSelectedExpense } from '@/hooks/useSelectedExpense'
import { ExpenseFormModal } from '@/components/ExpenseFormModal'

export default function Home({ params }: { params: { id: string } }) {
  const { isOpenModal, openModal, closeModal } = useModal()
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

  return <ExpenseFormModal isOpen={isOpenModal} close={closeModal} />
}
