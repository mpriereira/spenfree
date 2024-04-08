"use client"

import { useRef } from 'react';
import Link from 'next/link';
import { Expense, Category } from '@prisma/client';
import { saveExpense } from '@/app/expenses/actions';
import styles from './ExpenseForm.module.css';

export const ExpenseForm = ({ expense, categories }: { expense?: Expense, categories: Category[] }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const getFormattedDate = () => {
    const date = expense?.date ?? new Date();
    return date.toISOString().split('T')[0];
  }

  const save = async (formData: FormData) => {
    await saveExpense(formData, expense?.id);
    formRef.current?.reset();
  }

  return (
    <form ref={formRef} action={save} className={styles.form}>
      <select required name="category" defaultValue={expense?.categoryId ?? ''}>
        <option value="" disabled>Select category</option>
        {categories.map(category =>
          <option key={category.id} value={category.id}>{category.name}</option>
        )}
      </select>
      <input required type="text" name="title" placeholder="Title" defaultValue={expense?.title ?? ''}/>
      <input required type="date" name="date" placeholder="Date" defaultValue={getFormattedDate()}/>
      <input required type="number" name="amount" placeholder="Amount" defaultValue={expense?.amount}/>
      <button type="submit">{expense ? 'Edit expense' : 'Add expense'}</button>
      {expense &&
        <Link href={`/expenses`}>Cancel</Link>
      }
    </form>
  )
}
