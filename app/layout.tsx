import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Treasure quest',
  description: 'Generated by Ryota',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className='bg-[#F5F6F8]'>{children}</body>
    </html>
  )
}
