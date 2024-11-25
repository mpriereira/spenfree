import { useStore } from '@/state/store'

export const useSelectedExpense = () => {
  const { selectedExpense, selectExpense, clearExpense } = useStore()

  return {
    selectedExpense,
    selectExpense,
    clearExpense,
  }
}
