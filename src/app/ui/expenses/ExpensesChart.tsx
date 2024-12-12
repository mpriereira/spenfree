import { getUserExpenses } from '@/app/lib/actions'
import { getCategoryColor } from '@/app/lib/utils'
import { Chart } from '@/app/ui/charts/Chart'
import styles from './ExpensesChart.module.css'

export async function ExpensesChart() {
  const expenses = await getUserExpenses()

  const cData = expenses.reduce<
    Record<number, { name: string; color: string; value: number }>
  >((acc, item) => {
    if (!acc[item.categoryId]) {
      acc[item.categoryId] = {
        color: getCategoryColor(item.categoryId),
        value: 0,
        name: item.category.name,
      }
    }
    acc[item.categoryId].value += item.amount
    return acc
  }, {})

  const chartData = Object.values(cData)

  return (
    <>
      <>
        <h2 className={styles.chartTitle}>Expenses by category</h2>
        <Chart data={chartData} />
      </>
    </>
  )
}
