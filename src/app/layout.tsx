import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Recolección datos trabajadores :: UNESI SAS',
  description: 'Recolección datos trabajadores :: UNESI SAS'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  )
}
