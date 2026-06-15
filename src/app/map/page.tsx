'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dino from '@/components/Dino'
import { getProgress, getCompletedDays, getTotalStars, AppProgress } from '@/lib/progress'
import { DAYS } from '@/data/days'

const MAP_COLORS = [
  'bg-pink-300', 'bg-purple-300', 'bg-blue-300', 'bg-yellow-300',
  'bg-green-300', 'bg-orange-300', 'bg-red-300', 'bg-pink-400',
  'bg-indigo-300', 'bg-teal-300', 'bg-cyan-300', 'bg-lime-300',
  'bg-amber-300', 'bg-rose-400',
]

export default function MapPage() {
  const router = useRouter()
  const [progress, setProgress] = useState<AppProgress | null>(null)

  useEffect(() => {
    const p = getProgress()
    if (!p.nickname) { router.push('/'); return }
    setProgress(p)
  }, [router])

  if (!progress) return null

  const completedDays = getCompletedDays(progress)
  const totalStars = getTotalStars(progress)
  const nextDay = completedDays + 1

  const handleDayClick = (day: number) => {
    if (day > nextDay) return
    router.push(`/day/${day}`)
  }

  return (
    <main className="min-h-screen px-4 py-6"
      style={{ background: 'linear-gradient(180deg, #FFF0F8 0%, #E0F2FE 100%)' }}>

      {/* Header */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => router.push('/')} className="text-pink-400 font-bold text-lg">← 首页</button>
          <div className="text-center">
            <h1 className="text-2xl font-black text-pink-500">冒险地图 🗺️</h1>
            <p className="text-sm text-gray-500">你好，{progress.nickname}！</p>
          </div>
          <div className="text-right">
            <p className="text-yellow-500 font-bold">⭐ {totalStars}</p>
            <p className="text-gray-500 text-xs">{completedDays}/14天</p>
          </div>
        </div>

        {/* Badges */}
        {progress.badges.length > 0 && (
          <div className="bg-white rounded-3xl p-4 mb-6 shadow-md border-2 border-yellow-100">
            <p className="text-sm font-bold text-yellow-600 mb-2">🏅 我的徽章</p>
            <div className="flex flex-wrap gap-2">
              {progress.badges.map((b) => (
                <span key={b} className="bg-yellow-100 text-yellow-700 text-sm px-3 py-1 rounded-full font-semibold">{b}</span>
              ))}
              {progress.certificateUnlocked && (
                <button
                  onClick={() => router.push('/certificate')}
                  className="bg-pink-100 text-pink-700 text-sm px-3 py-1 rounded-full font-semibold hover:bg-pink-200 transition-colors"
                >
                  🎓 查看证书
                </button>
              )}
            </div>
          </div>
        )}

        {/* Map grid */}
        <div className="grid grid-cols-2 gap-4">
          {DAYS.map((day, idx) => {
            const dayNum = day.day
            const isDone = progress.days[dayNum]?.completed
            const isCurrent = dayNum === nextDay
            const isLocked = dayNum > nextDay

            return (
              <button
                key={dayNum}
                onClick={() => handleDayClick(dayNum)}
                disabled={isLocked}
                className={`
                  relative rounded-3xl p-5 text-left transition-all duration-150
                  ${isDone ? MAP_COLORS[idx] + ' opacity-90 shadow-md' : ''}
                  ${isCurrent ? 'bg-white border-4 border-pink-400 shadow-xl scale-105' : ''}
                  ${isLocked ? 'bg-gray-100 opacity-50 cursor-not-allowed' : 'active:scale-95 cursor-pointer'}
                `}
              >
                {/* Day number */}
                <div className={`text-xs font-bold mb-1 ${isDone ? 'text-white opacity-80' : isCurrent ? 'text-pink-500' : 'text-gray-400'}`}>
                  Day {dayNum}
                </div>

                {/* Map name */}
                <div className={`font-black text-sm leading-tight ${isDone ? 'text-white' : isCurrent ? 'text-gray-800' : 'text-gray-400'}`}>
                  {day.mapName}
                </div>

                {/* Status */}
                <div className="mt-2">
                  {isDone && (
                    <span className="text-lg">
                      {'⭐'.repeat(progress.days[dayNum]?.stars || 1)}
                    </span>
                  )}
                  {isCurrent && (
                    <span className="text-pink-400 text-sm font-bold animate-pulse">▶ 今天学这里！</span>
                  )}
                  {isLocked && <span className="text-2xl">🔒</span>}
                </div>

                {/* Dino on current */}
                {isCurrent && (
                  <div className="absolute -top-4 -right-4">
                    <Dino mood="excited" size={50} />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* All done */}
        {completedDays === 14 && (
          <div className="mt-6 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl p-6 text-center text-white shadow-xl">
            <div className="text-4xl mb-2">🎓✨</div>
            <h2 className="text-2xl font-black mb-1">太厉害啦！全部完成！</h2>
            <p className="mb-4 opacity-90">14天冒险全部解锁，你是真正的英语小勇士！</p>
            <button
              onClick={() => router.push('/certificate')}
              className="bg-white text-pink-500 font-black px-8 py-3 rounded-2xl hover:bg-pink-50 transition-colors"
            >
              🎓 查看毕业证书
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
