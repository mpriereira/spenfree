import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spenfree: Monitor your expenses',
  description: 'Keep track of your daily expenses easily',
}

const Header = () => {
  return (
    <header>
      <h1>Spenfree</h1>
    </header>
  )
}

const Footer = () => {
  return (
    <footer>
      <p className={`${inter.className} antialiased`}>
        © 2025 Spenfree. Made with ❤️ by{' '}
        <a href="https://github.com/mpriereira" target="_blank">
          Mario
        </a>
      </p>
    </footer>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased`}>
        <Header />
        {children}
        <Footer />
        <section
          id="toaster-wrapper"
          data-position="bottom-left"
          data-rich-colors="true"
        />
      </body>
    </html>
  )
}
