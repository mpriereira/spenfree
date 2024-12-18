import { ReactNode, Suspense } from 'react'
import { getUserExpenses } from '@/app/lib/actions'
import { CategoryChartData } from '@/app/lib/definitions'
import { CategoriesChart } from '@/app/ui/charts/CategoriesChart'
import { ExpenseSkeleton, PieChartSkeleton } from '@/app/ui/common/Skeletons'
import { ExpensesList } from '@/app/ui/expenses/ExpensesList'
import styles from './page.module.css'

const ExpensesListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <ExpenseSkeleton key={i} />
      ))}
    </>
  )
}

export default async function ExpensesLayout({
  children,
}: {
  children: ReactNode
}) {
  const expenses = await getUserExpenses()

  const chartData = Object.values(
    expenses.reduce<Record<string, CategoryChartData>>((acc, item) => {
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
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.list}>
          <Suspense fallback={<ExpensesListSkeleton />}>
            <ExpensesList expenses={expenses} />
          </Suspense>
        </div>
        <div className={styles.chart}>
          <Suspense fallback={<PieChartSkeleton />}>
            <CategoriesChart data={chartData} />
          </Suspense>
        </div>
      </section>
      <section>{children}</section>
    </main>
  )
}
