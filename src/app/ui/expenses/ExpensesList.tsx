import { getUserExpenses } from '@/app/lib/actions'
import { ExpenseItem } from '@/app/ui/expenses/ExpenseItem'
import { Button } from '@/app/ui/common/Button'
import styles from './ExpensesList.module.css'

export const ExpensesList = async () => {
  const expenses = await getUserExpenses()

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
      <Button text="Create expense" href={'/?create=true'} />
    </div>
  )
}
