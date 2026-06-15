'use client'

import { useEffect, useState } from 'react'

type Mood = 'happy' | 'excited' | 'waving' | 'clapping' | 'thinking'

interface DinoProps {
  mood?: Mood
  size?: number
  className?: string
  speechBubble?: string
}

export default function Dino({ mood = 'happy', size = 120, className = '', speechBubble }: DinoProps) {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (mood === 'excited' || mood === 'clapping') {
      const t = setInterval(() => setBounce((b) => !b), 400)
      return () => clearInterval(t)
    }
  }, [mood])

  const bodyY = bounce ? -6 : 0

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {speechBubble && (
        <div className="mb-2 bg-white rounded-2xl px-4 py-2 shadow-md text-sm font-bold text-pink-600 border-2 border-pink-200 max-w-48 text-center animate-bounce">
          {speechBubble}
        </div>
      )}
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 120"
        style={{ transform: `translateY(${bodyY}px)`, transition: 'transform 0.2s' }}
      >
        {/* Shadow */}
        <ellipse cx="50" cy="115" rx="25" ry="5" fill="rgba(0,0,0,0.1)" />

        {/* Tail */}
        <path d="M 72 80 Q 90 75 85 60 Q 88 70 75 72" fill="#F9A8D4" />

        {/* Body */}
        <ellipse cx="50" cy="78" rx="28" ry="32" fill="#F9A8D4" />

        {/* Belly */}
        <ellipse cx="50" cy="82" rx="18" ry="22" fill="#FEF9C3" />

        {/* Back spikes */}
        {[0, 1, 2, 3].map((i) => (
          <polygon
            key={i}
            points={`${38 - i * 3},${52 - i * 6} ${43 - i * 3},${44 - i * 6} ${48 - i * 3},${52 - i * 6}`}
            fill="#FAFAFA"
            stroke="#F9A8D4"
            strokeWidth="1"
          />
        ))}

        {/* Head */}
        <ellipse cx="50" cy="44" rx="22" ry="20" fill="#F9A8D4" />

        {/* Eyes */}
        <circle cx="43" cy="40" r="5" fill="white" />
        <circle cx="57" cy="40" r="5" fill="white" />
        <circle cx={mood === 'thinking' ? 44 : 43} cy={mood === 'thinking' ? 39 : 40} r="3" fill="#1F2937" />
        <circle cx={mood === 'thinking' ? 58 : 57} cy={mood === 'thinking' ? 39 : 40} r="3" fill="#1F2937" />
        {/* Eye shine */}
        <circle cx="44" cy="39" r="1" fill="white" />
        <circle cx="58" cy="39" r="1" fill="white" />

        {/* Smile / expression */}
        {mood === 'happy' || mood === 'waving' ? (
          <path d="M 43 51 Q 50 57 57 51" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mood === 'excited' || mood === 'clapping' ? (
          <path d="M 42 50 Q 50 58 58 50" stroke="#EC4899" strokeWidth="2.5" fill="#FBCFE8" strokeLinecap="round" />
        ) : (
          <path d="M 44 52 Q 50 55 56 52" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Teeth */}
        {(mood === 'excited' || mood === 'clapping') && (
          <>
            <rect x="46" y="51" width="4" height="4" rx="1" fill="white" />
            <rect x="51" y="51" width="4" height="4" rx="1" fill="white" />
          </>
        )}

        {/* Nostrils */}
        <circle cx="48" cy="47" r="1.5" fill="#EC4899" opacity="0.5" />
        <circle cx="52" cy="47" r="1.5" fill="#EC4899" opacity="0.5" />

        {/* Left arm */}
        <ellipse
          cx="25"
          cy="75"
          rx="7"
          ry="5"
          fill="#F9A8D4"
          transform={mood === 'waving' ? 'rotate(-40, 25, 75)' : mood === 'clapping' ? 'rotate(20, 25, 75)' : ''}
        />

        {/* Right arm */}
        <ellipse
          cx="75"
          cy="75"
          rx="7"
          ry="5"
          fill="#F9A8D4"
          transform={mood === 'waving' ? 'rotate(-60, 75, 75) translate(0,-10)' : mood === 'clapping' ? 'rotate(-20, 75, 75)' : ''}
        />

        {/* Legs */}
        <ellipse cx="40" cy="108" rx="8" ry="6" fill="#F9A8D4" />
        <ellipse cx="60" cy="108" rx="8" ry="6" fill="#F9A8D4" />
      </svg>
    </div>
  )
}
