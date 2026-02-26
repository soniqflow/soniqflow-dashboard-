import type { Metadata } from 'next'
import { Geist, Geist_Mono, Oxanium } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { FirebaseAuthProvider } from '@/components/auth/auth-provider'
import { Toaster } from 'sonner'
import './globals.css'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });
const oxanium = Oxanium({ subsets: ["latin"], weight: ["200", "400", "700", "800"] });

export const metadata: Metadata = {
  title: 'SoniqFlow - Audio Processing Command Center',
  description: 'Professional audio processing platform powered by NVIDIA Maxine. Real-time denoising, dereverb, and audio enhancement.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geist.className} antialiased`} style={{
        '--font-oxanium': oxanium.style.fontFamily,
      } as React.CSSProperties}>
        <FirebaseAuthProvider>
          {children}
          <Toaster theme="dark" position="top-right" closeButton />
        </FirebaseAuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
