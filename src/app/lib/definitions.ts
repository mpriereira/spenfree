import { Expense } from '@prisma/client'

export type Category = {
  id: number
  name: string
}

export type CategoryChartData = {
  color: string
  value: number
  name: string
}

export type ExtendedExpense = Expense & {
  category: { name: string }
  user: { name: string | null }
}
