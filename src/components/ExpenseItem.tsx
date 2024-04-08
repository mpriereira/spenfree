"use client"

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Expense } from '@prisma/client';
import { deleteExpense } from '@/app/expenses/actions';
import PencilIcon from '../../public/pencil.svg';
import TrashIcon from '../../public/trash.svg';
import styles from './ExpenseItem.module.css';

export const ExpenseItem = ({ expense }: { expense: Expense }) => {

  const router = useRouter();

  const getCategoryColor = () => {
    switch (expense.categoryId) {
      case 1:
        return '#0cc';
      case 2:
        return '#c60';
      case 3:
        return '#f0f';
      case 4:
        return '#0c0';
      case 5:
        return '#00c';
    }
  }

  const confirmDeletion = async () => {
    if (confirm('Are you sure that you want to delete this expense?')) {
      deleteExpense(expense.id).then(
        () => router.push('/expenses')
      );
    }
  }

  return (
    <article key={expense.id} className={styles.expense} style={{ borderLeft: `10px solid ${getCategoryColor()}` }}>
      <header>
        <time>{expense.date.toLocaleDateString()}</time>
        <div className={styles.actions}>
          <Link href={`/expenses/${expense.id}`}>
            <Image src={PencilIcon} alt="Edit icon" className={styles.edit}/>
          </Link>
          <button onClick={() => confirmDeletion()}>
            <Image src={TrashIcon} alt="Remove icon" className={styles.remove}/>
          </button>
        </div>
      </header>
      <div className={styles.body}>
        <div>{expense.title}</div>
        <div className={styles.amount}>-{expense.amount}€</div>
      </div>
    </article>
  )
}
