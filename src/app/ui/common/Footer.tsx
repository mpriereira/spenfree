import styles from './Footer.module.css'

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      Made to learn and play around by{' '}
      <a href="https://github.com/mpriereira" target="_blank">
        mpriereira
      </a>
    </footer>
  )
}
