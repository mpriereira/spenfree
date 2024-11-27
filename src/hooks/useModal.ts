import { useState } from 'react'

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpenModal: isOpen,
    openModal: () => setIsOpen(true),
    closeModal: () => setIsOpen(false),
  }
}
