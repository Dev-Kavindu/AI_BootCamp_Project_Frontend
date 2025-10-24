import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/nav-bar"
import { FinancialProvider } from "@/lib/financial-context"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "WealthTrack - Personal Wealth Management",
  description: "Track your income, assets, liabilities, and get AI-powered financial recommendations",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <FinancialProvider>
          <NavBar />
          <main className="container mx-auto px-4 py-8">{children}</main>
        </FinancialProvider>
      </body>
    </html>
  )
}
