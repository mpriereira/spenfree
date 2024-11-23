'use client'

import { getExpense, saveExpense } from '@/app/expenses/actions'
import { useEffect, useState } from 'react'
import { Expense } from '@prisma/client'
import { ExpenseFormModal } from '@/components/ExpenseFormModal'
import { toast } from 'toaster-ts'

export default function Home({ params }: { params: { id: string } }) {
  const [expense, setExpense] = useState<Expense>()

  const [isOpenModal, setIsOpenModal] = useState(false)

  const openModal = () => {
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
  }

  useEffect(() => {
    const fetchExpense = async () => {
      const currentExpense = (await getExpense(+params.id)) ?? undefined

      setExpense(currentExpense)
      setIsOpenModal(true)
    }
    fetchExpense()
  }, [params.id])

  const handleSave = async (formData: FormData) => {
    toast.promise(saveExpense(formData, expense?.id), {
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
        expense={expense}
        onSave={handleSave}
      />
    </>
  )
}
