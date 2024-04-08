import { redirect } from 'next/navigation';
import prisma from '../../../../lib/prisma';
import { ExpenseForm } from '@/components/ExpenseForm';
import { getCategories } from '@/app/expenses/actions';

export default async function Home({ params }: { params: { id: string } }) {
  const categories = await getCategories();

  const expense = await prisma.expense.findUnique({
    where: {
      id: +params.id
    }
  }) ?? undefined;

  if (!expense) {
    redirect('/expenses');
  }

  return (
    <details open>
      <summary>Edit expense</summary>
      <ExpenseForm expense={expense} categories={categories}/>
    </details>
  );
}
