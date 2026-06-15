'use client'

import { useEffect, useState } from 'react'

export default function StarBurst({ show }: { show: boolean }) {
  const [stars, setStars] = useState<{ x: number; y: number; delay: number; size: number }[]>([])

  useEffect(() => {
    if (show) {
      setStars(
        Array.from({ length: 12 }, (_, i) => ({
          x: Math.random() * 80 + 10,
          y: Math.random() * 60 + 10,
          delay: i * 0.08,
          size: Math.random() * 20 + 16,
        }))
      )
    }
  }, [show])

  if (!show) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute animate-ping"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
            animationDuration: '0.8s',
            fontSize: s.size,
          }}
        >
          ⭐
        </div>
      ))}
    </div>
  )
}
