'use client'

import { useDisclosure } from '@mantine/hooks'
import { Button, Modal } from '@mantine/core'
import { toast } from 'toaster-ts'
import { deleteExpense } from '@/app/lib/actions'
import { DeleteIcon } from '@/app/ui/common/Icons'
import styles from './DeleteExpense.module.css'

type DeleteExpenseProps = {
  expenseId: string
}

export const DeleteExpense = ({ expenseId }: DeleteExpenseProps) => {
  const [opened, { open, close }] = useDisclosure(false)

  const handleDeletion = async () => {
    toast.promise(deleteExpense(expenseId), {
      loading: 'Deleting expense...',
      success: () => 'Expense deleted',
      error: (err) => {
        console.error(err)
        return 'Error deleting expense'
      },
    })
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete expense">
        <div className={styles.modal__content}>
          <p>Are you sure that you want to delete this expense?</p>
          <div className={styles.modal__footer}>
            <Button onClick={close}>Cancel</Button>
            <Button onClick={handleDeletion}>Delete</Button>
          </div>
        </div>
      </Modal>

      <Button onClick={open} variant="light" radius="lg" color="red">
        <DeleteIcon />
      </Button>
    </>
  )
}
