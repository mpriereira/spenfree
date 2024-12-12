import { ReactNode, Suspense } from 'react'
import { ExpensesChart } from '@/app/ui/expenses/ExpensesChart'
import { ExpensesList } from '@/app/ui/expenses/ExpensesList'
import { ExpenseSkeleton } from '@/app/ui/common/ExpenseSkeleton'
import { PieChartSkeleton } from '@/app/ui/common/PieChartSkeleton'
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
