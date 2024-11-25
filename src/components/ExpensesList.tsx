import { getUserExpenses } from '@/app/expenses/actions'
import { ExpenseItem } from '@/components/ExpenseItem'
import { ExpensesListFooter } from '@/components/ExpensesListFooter'

export const ExpensesList = async () => {
  const expenses = await getUserExpenses()

  return (
    <>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
      <ExpensesListFooter />
    </>
  )
}
