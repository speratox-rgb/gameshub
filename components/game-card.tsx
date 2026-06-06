"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Info } from "lucide-react"
import type { Game } from "@/lib/games"
import { PlatformBadges } from "@/components/platform-badges"
import { Rating } from "@/components/rating"
import { DownloadButton } from "@/components/download-button"

export function GameCard({ game, index = 0 }: { game: Game; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.3) }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border bg-card"
    >
      <Link href={`/games/${game.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={game.art || "/placeholder.svg"}
            alt={`${game.title} cover art`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
          <span className="absolute left-3 top-3 rounded-md bg-background/70 px-2 py-0.5 text-[11px] font-medium backdrop-blur">
            {game.category}
          </span>
          <div className="absolute right-3 top-3 rounded-md bg-background/70 px-2 py-1 backdrop-blur">
            <Rating value={game.rating} />
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <Link href={`/games/${game.slug}`}>
            <h3 className="truncate font-heading text-base font-semibold transition-colors group-hover:text-primary">
              {game.title}
            </h3>
          </Link>
          <p className="truncate text-xs text-muted-foreground">{game.developer}</p>
        </div>

        <PlatformBadges platforms={game.platforms.slice(0, 4)} />

        <div className="flex items-center gap-2 pt-1">
          <DownloadButton size="sm" className="flex-1" aria-label={`Download ${game.title}`} />
          <Link
            href={`/games/${game.slug}`}
            className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={`View details for ${game.title}`}
          >
            <Info className="size-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
