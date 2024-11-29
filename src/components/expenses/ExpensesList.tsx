import { getUserExpenses } from '@/app/expenses/actions'
import { ExpenseItem } from '@/components/expenses/ExpenseItem'
import { ExpensesListFooter } from '@/components/expenses/ExpensesListFooter'

export const ExpensesList = async () => {
  const expenses = await getUserExpenses()

  return (
    <>
      {expenses.map((expense) => (
        <ExpenseItem key={expense.id} expense={expense} />
      ))}
      <section style={{ marginTop: '15px' }}>
        <ExpensesListFooter />
      </section>
    </>
  )
}
