import { create } from 'zustand'
import { Expense } from '@prisma/client'

interface State {
  selectedExpense: Expense | null
  selectExpense: (expense: Expense) => void
  clearExpense: () => void
}

export const useStore = create<State>()((set) => ({
  selectedExpense: null,
  selectExpense: (expense) => set({ selectedExpense: expense }),
  clearExpense: () => set({ selectedExpense: null }),
}))
