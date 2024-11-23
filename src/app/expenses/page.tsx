'use client'

import { useState } from 'react'
import { toast } from 'toaster-ts'
import { saveExpense } from '@/app/expenses/actions'
import { ExpenseFormModal } from '@/components/ExpenseFormModal'

export const dynamic = 'force-dynamic'

export default function Page() {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  const handleSave = async (formData: FormData) => {
    toast.promise(saveExpense(formData), {
      loading: 'Saving expense...',
      success: () => {
        setIsOpenModal(false)
        return 'Expense saved'
      },
      error: (err) => {
        console.error(err)
        return 'Error saving expense'
      },
    })
  }

  return (
    <>
      <button onClick={openModal}>Create expense</button>
      <ExpenseFormModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        onSave={handleSave}
      />
    </>
  )
}
