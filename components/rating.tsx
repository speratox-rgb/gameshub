import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export function Rating({
  value,
  reviews,
  size = "sm",
  className,
}: {
  value: number
  reviews?: number
  size?: "sm" | "md"
  className?: string
}) {
  const iconSize = size === "md" ? "size-4" : "size-3.5"
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <Star className={cn(iconSize, "fill-amber-400 text-amber-400")} aria-hidden="true" />
      <span className={cn("font-medium", size === "md" ? "text-sm" : "text-xs")}>{value.toFixed(1)}</span>
      {reviews !== undefined && (
        <span className={cn("text-muted-foreground", size === "md" ? "text-sm" : "text-xs")}>
          ({reviews >= 1000 ? `${(reviews / 1000).toFixed(0)}k` : reviews})
        </span>
      )}
    </div>
  )
}
