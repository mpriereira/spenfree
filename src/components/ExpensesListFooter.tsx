'use client'

import { ExpenseFormModal } from '@/components/ExpenseFormModal'
import { useExpenseModal } from '@/hooks/useExpenseModal'
import { useSelectedExpense } from '@/hooks/useSelectedExpense'

export const ExpensesListFooter = () => {
  const { isOpenModal, openModal, closeModal } = useExpenseModal()
  const { clearExpense } = useSelectedExpense()

  const handleCreate = () => {
    clearExpense()
    openModal()
  }

  return (
    <>
      <button onClick={handleCreate}>Create expense</button>
      <ExpenseFormModal isOpen={isOpenModal} close={closeModal} />
    </>
  )
}
