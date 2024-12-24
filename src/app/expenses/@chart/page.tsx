import { getUserExpenses } from '@/app/lib/actions'
import { CategoryChartData } from '@/app/lib/definitions'
import { CategoriesChart } from '@/app/ui/charts/CategoriesChart'
import { ChartTypeSelector } from '@/app/ui/expenses/ChartTypeSelector'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { capitalize } from '@/app/lib/utils'
import styles from './page.module.css'

dayjs.extend(customParseFormat)

export default async function Page({
  searchParams,
}: {
  searchParams: { chart: 'expense' | 'income'; period: string }
}) {
  const period = searchParams.period
    ? dayjs(capitalize(searchParams.period), 'MMM-YY')
    : dayjs()
  const expenses = await getUserExpenses(period)
  const chartType = searchParams.chart.toUpperCase()

  const chartData = Object.values(
    expenses.reduce<Record<string, CategoryChartData>>((acc, item) => {
      if (chartType !== item.category.type) return acc

      if (!acc[item.categoryId]) {
        acc[item.categoryId] = {
          color: item.category.color,
          value: 0,
          name: item.category.name,
        }
      }
      acc[item.categoryId].value += item.amount / 100
      return acc
    }, {}),
  )

  return (
    <div className={styles.chart}>
      <ChartTypeSelector />
      <CategoriesChart data={chartData} />
    </div>
  )
}
