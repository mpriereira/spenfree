import { Expense, Category, User } from '@prisma/client'

export type CategoryChartData = {
  color: string
  value: number
  name: string
}

export type ExtendedExpense = Expense & {
  category: Pick<Category, 'name' | 'color' | 'type'>
  user: Pick<User, 'name'>
}
