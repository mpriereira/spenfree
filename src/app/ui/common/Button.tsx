import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonProps = {
  text?: string
  href?: string
  type?: 'submit' | 'button' | 'reset'
  icon?: ReactNode
  onClick?: () => void
}

const BasicButton = ({ text, type, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} type={type} onClick={onClick}>
      {text}
    </button>
  )
}

const LinkButton = ({ text, href, icon }: ButtonProps) => {
  if (icon) {
    return (
      <Link href={href as string} className={styles.iconButton}>
        {icon}
      </Link>
    )
  }

  return (
    <Link href={href as string} className={styles.linkButton}>
      {text}
    </Link>
  )
}

const IconButton = ({ icon, onClick }: ButtonProps) => {
  return (
    <button className={styles.iconButton} onClick={onClick}>
      {icon}
    </button>
  )
}

export const Button = ({ text, type, icon, href, onClick }: ButtonProps) => {
  if (href) {
    return <LinkButton text={text} href={href} icon={icon} onClick={onClick} />
  }

  if (icon) {
    return <IconButton icon={icon} onClick={onClick} />
  }

  return <BasicButton text={text} type={type} onClick={onClick} />
}
