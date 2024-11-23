import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spenfree: Monitor your expenses',
  description: 'Keep track of your daily expenses easily',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <section
          id="toaster-wrapper"
          data-position="bottom-left"
          data-rich-colors="true"
        />
      </body>
    </html>
  )
}
