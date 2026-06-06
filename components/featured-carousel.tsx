"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Info } from "lucide-react"
import type { Game } from "@/lib/games"
import { PlatformBadges } from "@/components/platform-badges"
import { Rating } from "@/components/rating"
import { DownloadButton } from "@/components/download-button"
import { btn } from "@/lib/btn"
import { cn } from "@/lib/utils"

export function FeaturedCarousel({ games }: { games: Game[] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = games.length

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + count) % count), [count])

  useEffect(() => {
    if (paused) return
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 6000)
    return () => clearInterval(t)
  }, [paused, count])

  const game = games[index]

  return (
    <div
      className="relative overflow-hidden rounded-3xl border"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/9]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={game.slug}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={game.art || "/placeholder.svg"}
              alt={`${game.title} artwork`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 flex items-end sm:items-center">
          <div className="w-full max-w-2xl space-y-4 p-5 sm:p-8 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={game.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
                    Featured
                  </span>
                  <Rating value={game.rating} reviews={game.reviews} size="md" />
                </div>
                <h2 className="text-balance font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
                  {game.title}
                </h2>
                <p className="max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {game.description}
                </p>
                <PlatformBadges platforms={game.platforms} />
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <DownloadButton size="lg" glow label="Download Now" aria-label={`Download ${game.title}`} />
                  <Link href={`/games/${game.slug}`} className={btn({ variant: "secondary", size: "lg" })}>
                    <Info className="size-4" />
                    Details
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={() => go(-1)}
          aria-label="Previous featured game"
          className="absolute left-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full glass text-foreground transition-transform hover:scale-105 sm:flex"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next featured game"
          className="absolute right-3 top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full glass text-foreground transition-transform hover:scale-105 sm:flex"
        >
          <ChevronRight className="size-5" />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {games.map((g, i) => (
            <button
              key={g.slug}
              onClick={() => setIndex(i)}
              aria-label={`Show ${g.title}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index ? "w-7 bg-primary" : "w-2.5 bg-foreground/30 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
