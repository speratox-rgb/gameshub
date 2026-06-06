import Link from "next/link"
import { Logo } from "@/components/logo"
import { CATEGORIES } from "@/lib/games"

const PLATFORMS = [
  { href: "/games?platform=PC", label: "PC" },
  { href: "/games?platform=PS5", label: "PlayStation" },
  { href: "/games?platform=Xbox", label: "Xbox" },
  { href: "/games?platform=Switch", label: "Nintendo Switch" },
  { href: "/mobile", label: "Mobile" },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A premium gaming platform to discover, explore, and download the games everyone is playing — across PC,
              console, and mobile.
            </p>
          </div>

          <nav aria-label="Browse">
            <h3 className="mb-3 text-sm font-semibold">Browse</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/games" className="transition-colors hover:text-foreground">All Games</Link></li>
              <li><Link href="/games?sort=trending" className="transition-colors hover:text-foreground">Trending</Link></li>
              <li><Link href="/games?sort=new" className="transition-colors hover:text-foreground">Recently Added</Link></li>
              <li><Link href="/mobile" className="transition-colors hover:text-foreground">Mobile Games</Link></li>
              <li><Link href="/community" className="transition-colors hover:text-foreground">Community</Link></li>
            </ul>
          </nav>

          <nav aria-label="Categories">
            <h3 className="mb-3 text-sm font-semibold">Categories</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.name}>
                  <Link href={`/categories/${c.name.toLowerCase()}`} className="transition-colors hover:text-foreground">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Platforms">
            <h3 className="mb-3 text-sm font-semibold">Platforms</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {PLATFORMS.map((p) => (
                <li key={p.label}>
                  <Link href={p.href} className="transition-colors hover:text-foreground">{p.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} GameHub Pro. All trademarks belong to their respective owners.</p>
          <p>Built for gamers, by gamers.</p>
        </div>
      </div>
    </footer>
  )
}
