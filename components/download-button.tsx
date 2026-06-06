import { Download } from "lucide-react"
import { DOWNLOAD_URL } from "@/lib/config"
import { btn } from "@/lib/btn"
import { cn } from "@/lib/utils"

type DownloadButtonProps = {
  label?: string
  size?: "sm" | "md" | "lg"
  variant?: "primary" | "secondary" | "outline"
  className?: string
  showIcon?: boolean
  glow?: boolean
  "aria-label"?: string
}

/**
 * Centralized download button. Every download CTA across the site uses this,
 * which always points to the single DOWNLOAD_URL constant.
 */
export function DownloadButton({
  label = "Download",
  size = "md",
  variant = "primary",
  className,
  showIcon = true,
  glow = false,
  ...props
}: DownloadButtonProps) {
  return (
    <a
      href={DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={props["aria-label"] ?? `${label} game`}
      className={cn(btn({ variant, size }), glow && variant === "primary" && "glow-primary", className)}
    >
      {showIcon && <Download className="size-4" aria-hidden="true" />}
      {label}
    </a>
  )
}
