import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core'
import { theme } from '@/app/lib/theme'
import { Header } from '@/app/ui/common/Header'
import { Footer } from '@/app/ui/common/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spenfree — Monitor your expenses',
  description: 'Keep track of your daily expenses easily',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${GeistSans.className} antialiased`}>
        <MantineProvider theme={theme}>
          <Header />
          {children}
          <Footer />
          <section
            id="toaster-wrapper"
            data-position="bottom-right"
            data-rich-colors="true"
          />
        </MantineProvider>
      </body>
    </html>
  )
}
