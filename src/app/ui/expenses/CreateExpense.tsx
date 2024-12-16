'use client'

import { Modal } from '@mantine/core'
import { ExpenseForm } from '@/app/ui/expenses/ExpenseForm'
import { Category } from '@/app/lib/definitions'
import { useRouter } from 'next/navigation'
import { useDelayedDisclosure } from '@/app/lib/hooks'

export const CreateExpense = ({ categories }: { categories: Category[] }) => {
  const router = useRouter()
  const [opened, { close }] = useDelayedDisclosure(() =>
    router.push('/expenses'),
  )

  return (
    <>
      <Modal opened={opened} onClose={close} title="Create expense">
        <ExpenseForm categories={categories} />
      </Modal>
    </>
  )
}
