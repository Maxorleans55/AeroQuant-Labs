import { Manrope } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/app/components/Layout/Header'
import Footer from '@/app/components/Layout/Footer'
import ScrollToTop from '@/app/components/ScrollToTop'
import Aoscompo from '@/utils/aos'
const font = Manrope({ subsets: ['latin'] })

// Strict, explicit viewport: device width at scale 1. This matches the
// Next.js default but pins it deliberately — no mobile zoom heuristics,
// which together with `touch-action: manipulation` (globals.css) keeps
// taps instant on every device.
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

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
