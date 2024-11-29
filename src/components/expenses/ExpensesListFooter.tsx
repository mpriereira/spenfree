'use client'

import { useModal } from '@/hooks/useModal'
import { ExpenseFormModal } from '@/components/expenses/ExpenseFormModal'

export const ExpensesListFooter = () => {
  const { isOpenModal, openModal, closeModal } = useModal()

  return (
    <>
      <button onClick={openModal}>Create expense</button>
      <ExpenseFormModal isOpen={isOpenModal} onClose={closeModal} />
    </>
  )
}
