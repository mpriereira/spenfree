import { ExpensesList } from '@/app/ui/expenses/ExpensesList'
import { getUserExpenses } from '@/app/lib/actions'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { capitalize } from '@/app/lib/utils'

dayjs.extend(customParseFormat)

export default async function Page({
  searchParams,
}: {
  searchParams: { period: string }
}) {
  const period = searchParams.period
    ? dayjs(capitalize(searchParams.period), 'MMM-YY')
    : dayjs()
  const expenses = await getUserExpenses(period)
  return <ExpensesList expenses={expenses} />
}
