import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeistSans } from 'geist/font/sans'
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spenfree: Monitor your expenses',
  description: 'Keep track of your daily expenses easily',
}

const theme = createTheme({
  primaryColor: 'ocean-blue',
  colors: {
    'ocean-blue': [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885',
    ],
  },
})

const Header = () => {
  return (
    <header>
      <h2>Spenfree</h2>
    </header>
  )
}

const Footer = () => {
  return (
    <footer>
      <p className={`${inter.className}`}>
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
