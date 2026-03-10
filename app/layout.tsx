import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pomodoro Timer App',
  description: 'A productivity timer app with custom design tokens',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-secondary-50">
        {children}
      </body>
    </html>
  )
}