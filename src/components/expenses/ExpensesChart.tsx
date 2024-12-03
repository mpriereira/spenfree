import { getUserExpenses } from '@/app/expenses/actions'
import { Chart } from '@/components/lib/chart/Chart'
import { getCategoryColor } from '@/app/utils'
import styles from './ExpensesChart.module.css'

export async function ExpensesChart() {
  const expenses = await getUserExpenses()

  const cData = expenses.reduce<
    Record<number, { color: string; value: number }>
  >((acc, item) => {
    if (!acc[item.categoryId]) {
      acc[item.categoryId] = {
        color: getCategoryColor(item.categoryId),
        value: 0,
      }
    }
    acc[item.categoryId].value += item.amount
    return acc
  }, {})

  const chartData = Object.values(cData)

  return (
    <>
      <>
        <h2 className={styles.chartTitle}>Expenses Chart</h2>
        <Chart data={chartData} />
      </>
    </>
  )
}
