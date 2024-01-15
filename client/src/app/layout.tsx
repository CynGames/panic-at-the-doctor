import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {WebsocketInitializer} from "../components/websocket-initializer";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CHUGI DA',
  description: 'tooli',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <WebsocketInitializer />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
