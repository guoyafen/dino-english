'use client'

export interface DayProgress {
  completed: boolean
  stars: number
  completedAt?: string
}

export interface AppProgress {
  nickname: string
  days: Record<number, DayProgress>
  badges: string[]
  certificateUnlocked: boolean
}

const KEY = 'dino-english-progress'

export function getProgress(): AppProgress {
  if (typeof window === 'undefined') return defaultProgress()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultProgress()
    return JSON.parse(raw)
  } catch {
    return defaultProgress()
  }
}

export function saveProgress(p: AppProgress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function completeDay(day: number, stars: number) {
  const p = getProgress()
  p.days[day] = { completed: true, stars, completedAt: new Date().toISOString() }
  if (day === 7 && !p.badges.includes('Hello Star Badge')) p.badges.push('Hello Star Badge')
  if (day === 11 && !p.badges.includes('ABC Egg Badge')) p.badges.push('ABC Egg Badge')
  if (day === 14) p.certificateUnlocked = true
  saveProgress(p)
  return p
}

export function setNickname(name: string) {
  const p = getProgress()
  p.nickname = name
  saveProgress(p)
}

export function getTotalStars(p: AppProgress): number {
  return Object.values(p.days).reduce((sum, d) => sum + (d.stars || 0), 0)
}

export function getCompletedDays(p: AppProgress): number {
  return Object.values(p.days).filter((d) => d.completed).length
}

function defaultProgress(): AppProgress {
  return { nickname: '', days: {}, badges: [], certificateUnlocked: false }
}
