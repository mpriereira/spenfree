'use client'

import { toast } from 'toaster-ts'
import { deleteExpense } from '@/app/lib/actions'
import { Button } from '@/app/ui/common/Button'
import { DeleteIcon } from '@/app/ui/common/Icons'

export const DeleteExpenseButton = ({ expenseId }: { expenseId: number }) => {
  const handleDeletion = async () => {
    if (confirm('Are you sure that you want to delete this expense?')) {
      toast.promise(deleteExpense(expenseId), {
        loading: 'Deleting expense...',
        success: () => 'Expense deleted',
        error: (err) => {
          console.error(err)
          return 'Error deleting expense'
        },
      })
    }
  }

  return (
    <form action={handleDeletion}>
      <Button icon={<DeleteIcon />} />
    </form>
  )
}
