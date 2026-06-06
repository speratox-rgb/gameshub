"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { btn } from "@/lib/btn"
import { GAMES } from "@/lib/games"
import { cn } from "@/lib/utils"

const NAV = [
  { href: "/", label: "Home" },
  { href: "/games", label: "Browse" },
  { href: "/categories", label: "Categories" },
  { href: "/mobile", label: "Mobile" },
  { href: "/community", label: "Community" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const results = query.trim()
    ? GAMES.filter((g) => g.title.toLowerCase().includes(query.trim().toLowerCase())).slice(0, 6)
    : []

  function submitSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/games?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
    }
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6">
        <Logo />

        <nav className="ml-4 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div ref={searchRef} className="relative hidden sm:block">
            <form onSubmit={submitSearch} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
                placeholder="Search games..."
                aria-label="Search games"
                className="h-10 w-44 rounded-lg border border-border bg-secondary/60 pl-9 pr-3 text-sm outline-none transition-all placeholder:text-muted-foreground focus:w-64 focus:border-primary/60 focus:bg-secondary"
              />
            </form>
            <AnimatePresence>
              {searchOpen && results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="glass absolute right-0 top-12 w-72 overflow-hidden rounded-xl p-1.5 shadow-2xl"
                >
                  {results.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/games/${g.slug}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
                    >
                      <Image
                        src={g.art || "/placeholder.svg"}
                        alt=""
                        width={44}
                        height={44}
                        className="size-11 rounded-md object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{g.title}</span>
                        <span className="block text-xs text-muted-foreground">{g.category}</span>
                      </span>
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/games" className={cn(btn({ size: "sm" }), "hidden glow-primary sm:inline-flex")}>
            Browse All
          </Link>

          <button
            className="inline-flex size-10 items-center justify-center rounded-lg text-foreground lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass overflow-hidden border-t lg:hidden"
          >
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
              <form onSubmit={submitSearch} className="relative mb-3">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search games..."
                  aria-label="Search games"
                  className="h-11 w-full rounded-lg border border-border bg-secondary/60 pl-9 pr-3 text-sm outline-none focus:border-primary/60"
                />
              </form>
              {NAV.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium",
                      active ? "bg-secondary text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
