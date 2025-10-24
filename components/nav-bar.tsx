"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, TrendingUp, Building2, CreditCard, AlertCircle, Lightbulb } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorPaletteSelector } from "@/components/color-palette-selector"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/income", label: "Income", icon: TrendingUp },
  { href: "/assets", label: "Assets", icon: Building2 },
  { href: "/liabilities", label: "Liabilities", icon: AlertCircle },
  { href: "/credit-cards", label: "Credit Cards", icon: CreditCard },
  { href: "/recommendations", label: "Recommendations", icon: Lightbulb },
]

export function NavBar() {
  const pathname = usePathname()

  return (
    <nav className="border-b-2 bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-md sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              WealthTrack
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                        : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:scale-105",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ColorPaletteSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  )
}
