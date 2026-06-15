'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dino from '@/components/Dino'
import { getProgress, setNickname, getCompletedDays, getTotalStars } from '@/lib/progress'

export default function WelcomePage() {
  const router = useRouter()
  const [progress, setProgress] = useState<ReturnType<typeof getProgress> | null>(null)
  const [nameInput, setNameInput] = useState('')
  const [showNameForm, setShowNameForm] = useState(false)

  useEffect(() => {
    const p = getProgress()
    setProgress(p)
    if (!p.nickname) setShowNameForm(true)
    else setNameInput(p.nickname)
  }, [])

  const handleStart = () => {
    if (!nameInput.trim()) { setShowNameForm(true); return }
    setNickname(nameInput.trim())
    router.push('/map')
  }

  const completedDays = progress ? getCompletedDays(progress) : 0
  const totalStars = progress ? getTotalStars(progress) : 0

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF0F8 0%, #E0F2FE 50%, #F0FDF4 100%)' }}>

      <div className="absolute top-8 left-8 text-5xl opacity-30 float">☁️</div>
      <div className="absolute top-16 right-12 text-4xl opacity-20 float" style={{ animationDelay: '1s' }}>☁️</div>
      <div className="absolute bottom-20 left-16 text-3xl opacity-20 float" style={{ animationDelay: '0.5s' }}>🌿</div>
      <div className="absolute bottom-16 right-10 text-4xl opacity-25 float" style={{ animationDelay: '1.5s' }}>🌺</div>

      <div className="text-center mb-4">
        <h1 className="text-4xl md:text-5xl font-black text-pink-500 mb-1">
          小恐龙英语冒险岛
        </h1>
        <p className="text-lg text-pink-400 font-semibold">Dino English Adventure 🦕</p>
      </div>

      <div className="my-4 float">
        <Dino mood="waving" size={150} speechBubble="Hello! Let's go! 🎉" />
      </div>

      <p className="text-center text-gray-600 text-lg mb-6 max-w-sm">
        每天 30 分钟，和小恐龙一起<br />
        <span className="text-pink-500 font-bold">开口说英语！</span>
      </p>

      <div className="w-full max-w-sm mb-6">
        {showNameForm || !nameInput ? (
          <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-pink-100">
            <p className="text-center text-gray-600 mb-3 font-semibold">请输入你的小名或英文名 👇</p>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleStart()}
              placeholder="例如：小明 / Lily"
              maxLength={12}
              className="w-full border-2 border-pink-200 rounded-2xl px-4 py-3 text-center text-xl font-bold text-pink-600 outline-none focus:border-pink-400 bg-pink-50"
            />
            <p className="text-center text-xs text-gray-400 mt-2">昵称只保存在这台电脑上 🔒</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-pink-100 text-center">
            <p className="text-gray-500 text-sm">欢迎回来！</p>
            <p className="text-2xl font-black text-pink-500">{nameInput} 👋</p>
            <div className="flex justify-center gap-6 mt-2 text-sm text-gray-500">
              <span>已学 <b className="text-pink-500">{completedDays}</b> / 14 天</span>
              <span>⭐ <b className="text-yellow-500">{totalStars}</b> 颗星</span>
            </div>
            <button onClick={() => setShowNameForm(true)} className="text-xs text-gray-400 underline mt-1">
              换个名字
            </button>
          </div>
        )}
      </div>

      <button
        onClick={handleStart}
        className="px-12 py-5 rounded-3xl text-2xl font-black bg-pink-400 text-white shadow-lg hover:bg-pink-500 active:scale-95 transition-all duration-150"
      >
        🦕 开始冒险！
      </button>

      <p className="mt-4 text-xs text-gray-400 text-center">学习进度会自动保存在这台电脑上</p>
    </main>
  )
}
