import Link from "next/link"
import { HomeHero } from "@/components/home-hero"
import { FeaturedCarousel } from "@/components/featured-carousel"
import { GameCard } from "@/components/game-card"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { CategoryStrip } from "@/components/category-strip"
import { featuredGames, trendingGames, mobileGames, GAMES } from "@/lib/games"

export default function HomePage() {
  const newGames = [...GAMES].sort((a, b) => b.releaseYear - a.releaseYear).slice(0, 4)

  return (
    <div>
      <HomeHero />

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-6 sm:py-16">
        <Reveal>
          <FeaturedCarousel games={featuredGames} />
        </Reveal>

        <section className="space-y-6">
          <Reveal>
            <SectionHeading
              title="Trending Now"
              subtitle="The most-played games on GameHub Pro right now"
              href="/games?sort=trending"
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {trendingGames.map((game, i) => (
              <GameCard key={game.slug} game={game} index={i} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <Reveal>
            <SectionHeading title="Browse by Category" subtitle="Find exactly what you want to play" href="/categories" />
          </Reveal>
          <CategoryStrip />
        </section>

        <section className="space-y-6">
          <Reveal>
            <SectionHeading
              title="Recently Added"
              subtitle="Fresh arrivals to the platform"
              href="/games?sort=new"
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {newGames.map((game, i) => (
              <GameCard key={game.slug} game={game} index={i} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <Reveal>
            <SectionHeading title="Top Mobile Games" subtitle="Play anywhere on iOS & Android" href="/mobile" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {mobileGames.slice(0, 4).map((game, i) => (
              <GameCard key={game.slug} game={game} index={i} />
            ))}
          </div>
        </section>

        <Reveal>
          <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/15 via-card to-card p-8 text-center sm:p-14">
            <h2 className="text-balance font-heading text-2xl font-bold sm:text-3xl">
              Join a community of players
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
              Read honest reviews, see what is trending, and discover the games your friends are downloading.
            </p>
            <Link
              href="/community"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground glow-primary transition-colors hover:bg-primary/90"
            >
              Explore the Community
            </Link>
          </section>
        </Reveal>
      </div>
    </div>
  )
}
