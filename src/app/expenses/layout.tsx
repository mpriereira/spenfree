import { ReactNode } from 'react';
import { ExpenseItem } from '@/components/ExpenseItem';
import { getUserExpenses } from '@/app/expenses/actions';
import styles from "./page.module.css";

export default async function ExpensesLayout({ children }: { children: ReactNode }) {
  const expenses = await getUserExpenses();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Spenfree</h1>
      <section className={styles.expenses}>
        {expenses.map(expense =>
          <ExpenseItem key={expense.id} expense={expense} />
        )}
      </section>
      <section className={styles.footer}>
        {children}
      </section>
    </main>
  );
}
