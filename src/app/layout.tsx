import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '小恐龙英语冒险岛',
  description: '每天30分钟，和小恐龙一起开口说英语！',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  )
}
