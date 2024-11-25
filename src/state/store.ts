import { create } from 'zustand'
import { Expense } from '@prisma/client'

interface State {
  selectedExpense: Expense | null
  selectExpense: (expense: Expense) => void
  clearExpense: () => void
  isModalOpen: boolean
  toggleModal: (openState: boolean) => void
}

export const useStore = create<State>()((set) => ({
  selectedExpense: null,
  selectExpense: (expense) => set({ selectedExpense: expense }),
  clearExpense: () => set({ selectedExpense: null }),
  isModalOpen: false,
  toggleModal: (openState) => set({ isModalOpen: openState }),
}))
