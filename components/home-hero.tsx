"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Particles } from "@/components/particles"
import { CATEGORIES } from "@/lib/games"
import { btn } from "@/lib/btn"

export function HomeHero() {
  const router = useRouter()
  const [query, setQuery] = useState("")

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    router.push(query.trim() ? `/games?q=${encodeURIComponent(query.trim())}` : "/games")
  }

  return (
    <section className="relative overflow-hidden border-b">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)]" />
      <Particles count={20} />
      <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="size-1.5 rounded-full bg-emerald-400" />
            16 titles available across PC, console & mobile
          </span>
          <h1 className="text-balance font-heading text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Your next <span className="text-gradient">favorite game</span> starts here
          </h1>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Discover trending titles, explore by category, read real reviews, and download the games everyone is
            playing — all in one premium hub.
          </p>

          <form onSubmit={onSubmit} className="mx-auto flex max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a game..."
                aria-label="Search for a game"
                className="h-12 w-full rounded-xl border border-border bg-card/70 pl-11 pr-4 text-sm outline-none backdrop-blur transition-colors placeholder:text-muted-foreground focus:border-primary/60"
              />
            </div>
            <button type="submit" className={btn({ size: "lg" })}>
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((c) => (
              <Link
                key={c.name}
                href={`/categories/${c.name.toLowerCase()}`}
                className="rounded-full border bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-foreground"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
