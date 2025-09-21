// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Study Buddy AI',
  description: 'An AI-powered study assistant that adapts to your learning style',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>Study Buddy AI ✨</header>
        <main>{children}</main>
      </body>
    </html>
  )
}
