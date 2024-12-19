import { ReactNode, Suspense } from 'react'
import { getUserExpenses } from '@/app/lib/actions'
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
  chart,
}: {
  children: ReactNode
  chart: ReactNode
}) {
  const expenses = await getUserExpenses()

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.list}>
          <Suspense fallback={<ExpensesListSkeleton />}>
            <ExpensesList expenses={expenses} />
          </Suspense>
        </div>
        <Suspense fallback={<PieChartSkeleton />}>{chart}</Suspense>
      </section>
      <section>{children}</section>
    </main>
  )
}
