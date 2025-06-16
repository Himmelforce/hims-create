// Types
import type { Metadata } from "next"

// Styles
import "./globals.css"

export const metadata: Metadata = {
  title: "HiMS x Next.js",
  description: "Welcome to the HiMS x Next.js example app"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
