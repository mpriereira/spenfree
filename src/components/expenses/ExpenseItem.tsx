'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Expense } from '@prisma/client'
import { toast } from 'toaster-ts'
import { deleteExpense } from '@/app/expenses/actions'
import { getCategoryColor } from '@/app/utils'
import PencilIcon from '../../../public/pencil.svg'
import TrashIcon from '../../../public/trash.svg'
import styles from './ExpenseItem.module.css'

export const ExpenseItem = ({ expense }: { expense: Expense }) => {
  const router = useRouter()

  const confirmDeletion = async () => {
    if (confirm('Are you sure that you want to delete this expense?')) {
      toast.promise(deleteExpense(expense.id), {
        loading: 'Deleting expense...',
        success: () => {
          router.push('/expenses')
          return 'Expense deleted'
        },
        error: (err) => {
          console.error(err)
          return 'Error deleting expense'
        },
      })
    }
  }

  return (
    <article
      key={expense.id}
      className={styles.expense}
      style={{
        borderLeft: `10px solid ${getCategoryColor(expense.categoryId)}`,
      }}
    >
      <header>
        <time>{expense.date.toLocaleDateString()}</time>
        <div className={styles.actions}>
          <Link href={`/expenses/${expense.id}`}>
            <Image
              src={PencilIcon}
              alt="Edit icon"
              className={`icon ${styles.edit}`}
            />
          </Link>
          <button onClick={() => confirmDeletion()}>
            <Image
              src={TrashIcon}
              alt="Remove icon"
              className={`icon ${styles.remove}`}
            />
          </button>
        </div>
      </header>
      <div className={styles.body}>
        <div>{expense.title}</div>
        <div className={styles.amount}>-{expense.amount}€</div>
      </div>
    </article>
  )
}
