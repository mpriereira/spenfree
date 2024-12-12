import { Expense } from '@prisma/client'
import { getCategoryColor } from '@/app/lib/utils'
import { DeleteExpenseButton } from '@/app/ui/expenses/DeleteExpenseButton'
import { Button } from '@/app/ui/common/Button'
import { PencilIcon } from '@/app/ui/common/Icons'
import styles from './ExpenseItem.module.css'

export const ExpenseItem = ({ expense }: { expense: Expense }) => {
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
          <Button icon={<PencilIcon />} href={`/expenses/${expense.id}`} />
          <DeleteExpenseButton expenseId={expense.id} />
        </div>
      </header>
      <div className={styles.body}>
        <div>{expense.title}</div>
        <div className={styles.amount}>-{expense.amount}€</div>
      </div>
    </article>
  )
}
