import { ReactNode, Suspense } from 'react'
import { ExpensesChart } from '@/components/expenses/ExpensesChart'
import { ExpensesList } from '@/components/expenses/ExpensesList'
import { Loader } from '@/components/lib/loader/Loader'
import styles from './page.module.css'

export default function ExpensesLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.list}>
          <Suspense fallback={<Loader />}>
            <ExpensesList />
          </Suspense>
        </div>
        <div className={styles.chart}>
          <Suspense fallback={<Loader />}>
            <ExpensesChart />
          </Suspense>
        </div>
      </section>
      <section>{children}</section>
    </main>
  )
}
