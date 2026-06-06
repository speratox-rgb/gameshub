import { cn } from "@/lib/utils"

type BtnVariant = "primary" | "secondary" | "outline" | "ghost"
type BtnSize = "sm" | "md" | "lg"

const VARIANTS: Record<BtnVariant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border",
  outline: "border border-border bg-transparent text-foreground hover:bg-secondary/60",
  ghost: "bg-transparent text-foreground hover:bg-secondary/60",
}

const SIZES: Record<BtnSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5 rounded-lg",
  md: "h-11 px-5 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2 rounded-xl",
}

export function btn(opts: { variant?: BtnVariant; size?: BtnSize; className?: string } = {}) {
  const { variant = "primary", size = "md", className } = opts
  return cn(
    "inline-flex shrink-0 select-none items-center justify-center font-medium transition-all outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}
