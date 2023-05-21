import Chat from './components/chat'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Ask AI',
  description: 'The Best Platform for Coding Interviews!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Chat />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
