import './globals.css'
import { Inter } from 'next/font/google'

export const metadata = {
  title: 'グリッドシステムルーター',
  description: '本当の住所のようにファイルの場所を表したい',
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
