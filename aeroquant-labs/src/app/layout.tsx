import { Manrope } from 'next/font/google'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
const font = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://aeroquant-labs.vercel.app'),
  title: {
    default: 'AeroQuant Labs — Software Development Team',
    template: '%s | AeroQuant Labs',
  },
  description:
    'AeroQuant Labs is a team of young software developers building tools and products that solve real problems in society.',
  keywords: [
    'software development',
    'web applications',
    'product studio',
    'Ghana',
    'AeroQuant Labs',
  ],
  authors: [{ name: 'AeroQuant Labs' }],
  openGraph: {
    title: 'AeroQuant Labs',
    description:
      'A team of young software developers building tools and products that solve real problems in society.',
    siteName: 'AeroQuant Labs',
    type: 'website',
    locale: 'en_GB',
    images: [
      {
        url: '/images/logo/aeroquant-labs.jpg',
        width: 1200,
        height: 1200,
        alt: 'AeroQuant Labs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AeroQuant Labs',
    description:
      'A team of young software developers building tools and products that solve real problems in society.',
    images: ['/images/logo/aeroquant-labs.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${font.className}`}>
        <Aoscompo>
          <Header />
          {children}
          <Footer />
        </Aoscompo>
        <ScrollToTop />
      </body>
    </html>
  )
}
