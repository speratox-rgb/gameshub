import type { Platform } from "@/lib/games"
import { cn } from "@/lib/utils"

const STYLES: Record<Platform, string> = {
  PC: "bg-accent/15 text-accent border-accent/30",
  PS5: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  PS4: "bg-blue-500/15 text-blue-300 border-blue-400/30",
  Xbox: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30",
  Switch: "bg-red-500/15 text-red-300 border-red-400/30",
  iOS: "bg-foreground/10 text-foreground border-foreground/20",
  Android: "bg-green-500/15 text-green-300 border-green-400/30",
}

export function PlatformBadges({ platforms, className }: { platforms: Platform[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {platforms.map((p) => (
        <span
          key={p}
          className={cn(
            "rounded-md border px-2 py-0.5 text-[11px] font-medium leading-tight",
            STYLES[p],
          )}
        >
          {p}
        </span>
      ))}
    </div>
  )
}
