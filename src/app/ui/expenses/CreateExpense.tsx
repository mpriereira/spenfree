'use client'

import { Modal } from '@mantine/core'
import { ExpenseForm } from '@/app/ui/expenses/ExpenseForm'
import { useRouter } from 'next/navigation'
import { useDelayedDisclosure } from '@/app/lib/hooks'

export const CreateExpense = () => {
  const router = useRouter()
  const [opened, { close }] = useDelayedDisclosure(() => router.back())

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add expense">
        <ExpenseForm />
      </Modal>
    </>
  )
}
