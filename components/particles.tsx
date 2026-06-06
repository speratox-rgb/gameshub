"use client"

import { useMemo } from "react"

/** Soft floating particles used as a subtle ambient background accent. */
export function Particles({ count = 18 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 2 + Math.random() * 5,
        delay: Math.random() * 14,
        duration: 14 + Math.random() * 16,
      })),
    [count],
  )

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-primary/40"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
