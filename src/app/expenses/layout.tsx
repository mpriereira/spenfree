import { ReactNode, Suspense } from 'react'
import { ExpensesList } from '@/components/expenses/ExpensesList'
import { Loader } from '@/components/lib/loader/Loader'
import styles from './page.module.css'

export default function ExpensesLayout({ children }: { children: ReactNode }) {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Spenfree</h1>
      <section className={styles.expenses}>
        <Suspense fallback={<Loader />}>
          <ExpensesList />
        </Suspense>
      </section>
      <section>{children}</section>
    </main>
  )
}
