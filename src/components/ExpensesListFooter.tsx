'use client'

import { ExpenseFormModal } from '@/components/ExpenseFormModal'
import { useModal } from '@/hooks/useModal'

export const ExpensesListFooter = () => {
  const { isOpenModal, openModal, closeModal } = useModal()

  return (
    <>
      <button onClick={openModal}>Create expense</button>
      <ExpenseFormModal isOpen={isOpenModal} close={closeModal} />
    </>
  )
}
