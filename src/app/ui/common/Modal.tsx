'use client'

import { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

type ModalProps = {
  children: ReactNode
  title: string
}

export const Modal = ({ children, title }: ModalProps) => {
  return createPortal(
    <div className={styles['modal-backdrop']}>
      <div className={styles.modal}>
        <section className={styles['modal-header']}>
          <h3>{title}</h3>
        </section>
        <section className={styles['modal-content']}>{children}</section>
      </div>
    </div>,
    document.body,
  )
}
