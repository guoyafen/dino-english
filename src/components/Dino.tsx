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

  const bodyY = bounce ? -8 : 0
  const isOpen = mood === 'excited' || mood === 'clapping'
  const isWaving = mood === 'waving'
  const isThinking = mood === 'thinking'

  return (
    <div className={`relative inline-flex flex-col items-center ${className}`}>
      {speechBubble && (
        <div className="mb-2 bg-white rounded-2xl px-4 py-2 shadow-md text-sm font-bold text-pink-600 border-2 border-pink-200 max-w-48 text-center animate-bounce">
          {speechBubble}
        </div>
      )}
      <svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 120 150"
        style={{ transform: `translateY(${bodyY}px)`, transition: 'transform 0.2s ease' }}
      >
        {/* Shadow */}
        <ellipse cx="60" cy="145" rx="30" ry="6" fill="rgba(0,0,0,0.08)" />

        {/* Tail */}
        <path d="M 82 105 Q 108 95 105 72 Q 112 88 90 100 Z" fill="#F472B6" />
        <path d="M 82 105 Q 108 95 105 72 Q 112 88 90 100 Z" fill="#F9A8D4" opacity="0.5"/>

        {/* Body */}
        <ellipse cx="60" cy="100" rx="32" ry="36" fill="#F9A8D4" />

        {/* Belly */}
        <ellipse cx="60" cy="105" rx="20" ry="25" fill="#FDE8F5" />

        {/* Neck */}
        <ellipse cx="55" cy="72" rx="14" ry="10" fill="#F9A8D4" />

        {/* Head — bigger, rounder, more chibi */}
        <ellipse cx="58" cy="50" rx="26" ry="24" fill="#F9A8D4" />

        {/* Head crest / spikes on top of head */}
        <polygon points="44,28 48,14 52,28" fill="#F472B6" />
        <polygon points="53,25 58,10 63,25" fill="#EC4899" />
        <polygon points="62,28 67,14 71,28" fill="#F472B6" />

        {/* Cheeks blush */}
        <ellipse cx="40" cy="56" rx="7" ry="5" fill="#FCA5A5" opacity="0.4" />
        <ellipse cx="76" cy="56" rx="7" ry="5" fill="#FCA5A5" opacity="0.4" />

        {/* Eyes */}
        <circle cx="50" cy="46" r="7" fill="white" />
        <circle cx="67" cy="46" r="7" fill="white" />
        {/* Pupils */}
        <circle
          cx={isThinking ? 52 : 50}
          cy={isThinking ? 44 : 46}
          r="4"
          fill="#1F2937"
        />
        <circle
          cx={isThinking ? 69 : 67}
          cy={isThinking ? 44 : 46}
          r="4"
          fill="#1F2937"
        />
        {/* Eye shine */}
        <circle cx="52" cy="44" r="1.5" fill="white" />
        <circle cx="69" cy="44" r="1.5" fill="white" />

        {/* Thinking eyebrow */}
        {isThinking && (
          <>
            <path d="M 46 38 Q 51 35 55 38" stroke="#F472B6" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M 63 38 Q 68 35 72 38" stroke="#F472B6" strokeWidth="2" fill="none" strokeLinecap="round" />
          </>
        )}

        {/* Snout */}
        <ellipse cx="58" cy="58" rx="11" ry="8" fill="#F472B6" opacity="0.3" />

        {/* Nostrils */}
        <circle cx="54" cy="57" r="1.5" fill="#EC4899" opacity="0.6" />
        <circle cx="62" cy="57" r="1.5" fill="#EC4899" opacity="0.6" />

        {/* Mouth */}
        {isOpen ? (
          <>
            <path d="M 49 63 Q 58 72 67 63" stroke="#EC4899" strokeWidth="2" fill="#FBCFE8" strokeLinecap="round" />
            {/* Teeth */}
            <rect x="53" y="63" width="4" height="4" rx="1" fill="white" />
            <rect x="59" y="63" width="4" height="4" rx="1" fill="white" />
          </>
        ) : (
          <path d="M 50 63 Q 58 70 66 63" stroke="#EC4899" strokeWidth="2" fill="none" strokeLinecap="round" />
        )}

        {/* Left arm */}
        <path
          d={isWaving
            ? "M 30 90 Q 18 70 22 58"
            : isOpen
            ? "M 30 92 Q 18 82 20 72"
            : "M 30 95 Q 18 90 20 82"}
          stroke="#F9A8D4" strokeWidth="10" fill="none" strokeLinecap="round"
        />
        {/* Left hand */}
        <circle
          cx={isWaving ? 22 : isOpen ? 20 : 20}
          cy={isWaving ? 58 : isOpen ? 72 : 82}
          r="6" fill="#F9A8D4"
        />

        {/* Right arm */}
        <path
          d={isOpen
            ? "M 90 92 Q 102 82 100 72"
            : "M 90 95 Q 102 90 100 82"}
          stroke="#F9A8D4" strokeWidth="10" fill="none" strokeLinecap="round"
        />
        <circle
          cx={isOpen ? 100 : 100}
          cy={isOpen ? 72 : 82}
          r="6" fill="#F9A8D4"
        />

        {/* Left leg */}
        <path d="M 44 130 Q 38 138 36 144" stroke="#F9A8D4" strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="35" cy="144" rx="9" ry="5" fill="#F472B6" />

        {/* Right leg */}
        <path d="M 72 130 Q 78 138 80 144" stroke="#F9A8D4" strokeWidth="12" fill="none" strokeLinecap="round" />
        <ellipse cx="81" cy="144" rx="9" ry="5" fill="#F472B6" />
      </svg>
    </div>
  )
}
