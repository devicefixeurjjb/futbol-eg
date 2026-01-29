import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { SocketProvider } from '@/lib/socket'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fútbol EG - Resultados en Tiempo Real',
  description: 'Plataforma oficial de resultados de fútbol de Guinea Ecuatorial',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SocketProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </SocketProvider>
      </body>
    </html>
  )
}