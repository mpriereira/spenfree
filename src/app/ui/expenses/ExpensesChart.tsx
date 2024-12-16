import { getUserExpenses } from '@/app/lib/actions'
import { CategoryChartData } from '@/app/lib/definitions'
import { getCategoryColor } from '@/app/lib/utils'
import { CategoriesChart } from '@/app/ui/charts/CategoriesChart'
import styles from './ExpensesChart.module.css'

export async function ExpensesChart() {
  const expenses = await getUserExpenses()

  const chartData = Object.values(
    expenses.reduce<Record<number, CategoryChartData>>((acc, item) => {
      if (!acc[item.categoryId]) {
        acc[item.categoryId] = {
          color: getCategoryColor(item.categoryId),
          value: 0,
          name: item.category.name,
        }
      }
      acc[item.categoryId].value += item.amount
      return acc
    }, {}),
  )

  return (
    <>
      <h2 className={styles.chartTitle}>Expenses by category</h2>
      <CategoriesChart data={chartData} />
    </>
  )
}
