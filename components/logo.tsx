import Link from "next/link"
import { cn } from "@/lib/utils"

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 font-heading", className)} aria-label="GameHub Pro home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-primary">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none" aria-hidden="true">
          <path
            d="M6 9h12a3 3 0 0 1 3 3v0a4 4 0 0 1-7.2 2.4L13 14h-2l-.8.4A4 4 0 0 1 3 12v0a3 3 0 0 1 3-3Z"
            fill="currentColor"
          />
          <circle cx="8" cy="12" r="1.1" fill="var(--primary)" />
          <circle cx="16.2" cy="11" r="0.9" fill="var(--primary)" />
          <circle cx="17.6" cy="12.6" r="0.9" fill="var(--primary)" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight">
        GameHub<span className="text-primary"> Pro</span>
      </span>
    </Link>
  )
}
