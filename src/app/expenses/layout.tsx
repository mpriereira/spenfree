import { ReactNode, Suspense } from 'react'
import { ExpensesList } from '@/components/ExpensesList'
import { Loader } from '@/components/Loader'
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
      <section className={styles.footer}>{children}</section>
    </main>
  )
}
