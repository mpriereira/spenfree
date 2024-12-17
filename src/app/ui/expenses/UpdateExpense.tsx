'use client'

import { Modal } from '@mantine/core'
import { ExpenseForm } from '@/app/ui/expenses/ExpenseForm'
import { useRouter } from 'next/navigation'
import { Expense } from '@prisma/client'
import { useDelayedDisclosure } from '@/app/lib/hooks'

type UpdateExpenseProps = {
  expense?: Expense
}

export const UpdateExpense = ({ expense }: UpdateExpenseProps) => {
  const router = useRouter()
  const [opened, { close }] = useDelayedDisclosure(() =>
    router.push('/expenses'),
  )

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit expense">
        <ExpenseForm expense={expense} />
      </Modal>
    </>
  )
}
