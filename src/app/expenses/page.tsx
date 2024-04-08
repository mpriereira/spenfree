import { ExpenseForm } from '@/components/ExpenseForm';
import { getCategories } from '@/app/expenses/actions';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const categories = await getCategories();

  return (
    <details open>
      <summary>Add expense</summary>
      <ExpenseForm categories={categories}/>
    </details>
  )
}
