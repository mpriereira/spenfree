import { ExpenseItem } from '@/components/ExpenseItem'
import { getUserExpenses } from '@/app/expenses/actions'

export const ExpensesList = async () => {
  const expenses = await getUserExpenses()

  return (
    <>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
    </>
  )
}
