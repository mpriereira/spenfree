import { ReactNode, Suspense } from 'react'
import { ExpenseSkeleton, PieChartSkeleton } from '@/app/ui/common/Skeletons'
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

export default function ExpensesLayout({
  children,
  chart,
  navigator,
  table,
}: {
  children: ReactNode
  chart: ReactNode
  navigator: ReactNode
  table: ReactNode
}) {
  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <div className={styles.list}>
          {navigator}
          <Suspense fallback={<ExpensesListSkeleton />}>{table}</Suspense>
        </div>
        <Suspense fallback={<PieChartSkeleton />}>{chart}</Suspense>
      </section>
      <section>{children}</section>
    </main>
  )
}
