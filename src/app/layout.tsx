import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import {
  ColorSchemeScript,
  createTheme,
  mantineHtmlProps,
  MantineProvider,
} from '@mantine/core'
import { Header } from '@/app/ui/common/Header'
import { Footer } from '@/app/ui/common/Footer'
import './globals.css'

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
