import { ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalProps = {
  children: ReactNode
  title: string
  isOpen: boolean
  onClose: () => void
  hideFooter?: boolean
}

export const Modal = ({
  children,
  title,
  isOpen,
  onClose,
  hideFooter,
}: ModalProps) => {
  if (!isOpen) return null

  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles.modal}>
        <section className={styles['modal-header']}>
          <h3>{title}</h3>
        </section>
        <section className={styles['modal-content']}>{children}</section>
        {!hideFooter && (
          <section className={styles['modal-footer']}>
            <button>Save</button>
            <button onClick={onClose}>Close</button>
          </section>
        )}
      </div>
    </div>
  )
}
