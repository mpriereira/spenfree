import { ReactNode, Suspense } from 'react'
import { ExpensesChart } from '@/components/expenses/ExpensesChart'
import { ExpensesList } from '@/components/expenses/ExpensesList'
import { ExpenseSkeleton } from '@/components/lib/skeleton/ExpenseSkeleton'
import { PieChartSkeleton } from '@/components/lib/skeleton/PieChartSkeleton'
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

export default function ExpensesLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.list}>
          <Suspense fallback={<ExpensesListSkeleton />}>
            <ExpensesList />
          </Suspense>
        </div>
        <div className={styles.chart}>
          <Suspense fallback={<PieChartSkeleton />}>
            <ExpensesChart />
          </Suspense>
        </div>
      </section>
      <section>{children}</section>
    </main>
  )
}
