import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      © 2025 Spenfree. Made with ❤️ by{' '}
      <a href="https://github.com/mpriereira" target="_blank">
        Mario
      </a>
    </footer>
  )
}
