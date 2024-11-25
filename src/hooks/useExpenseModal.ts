import { useStore } from '@/state/store'

export const useExpenseModal = () => {
  const { isModalOpen, toggleModal } = useStore()

  return {
    isOpenModal: isModalOpen,
    openModal: () => toggleModal(true),
    closeModal: () => toggleModal(false),
  }
}
