'use client'

import { Modal } from '@mantine/core'
import { ExpenseForm } from '@/app/ui/expenses/ExpenseForm'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDelayedDisclosure } from '@/app/lib/hooks'

export const CreateExpense = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  const handleClose = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('create')
    replace(`${pathname}?${params.toString()}`)
  }

  const [opened, { close }] = useDelayedDisclosure(handleClose)

  return (
    <>
      <Modal opened={opened} onClose={close} title="Add expense">
        <ExpenseForm />
      </Modal>
    </>
  )
}
