import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Pozpátku - Otočení textu pozpátku',
  description:
    'Online generátor pro převracení českého textu pozpátku. Každé slovo se otočí, slovosled zůstane. Ideální pro táborové hry a šifrovačky.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs" className="dark">
      <body className="bg-zinc-950 text-zinc-100 antialiased font-sans">
        {children}
      </body>
    </html>
  )
}
