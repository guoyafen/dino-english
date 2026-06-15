'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Dino from '@/components/Dino'
import { getProgress, getTotalStars } from '@/lib/progress'

export default function CertificatePage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [stars, setStars] = useState(0)
  const today = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    const p = getProgress()
    if (!p.nickname) { router.push('/'); return }
    setNickname(p.nickname)
    setStars(getTotalStars(p))
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ background: 'linear-gradient(160deg, #FFF0F8 0%, #FEF9C3 50%, #E0F2FE 100%)' }}>

      <div className="max-w-lg w-full">
        {/* Back */}
        <button onClick={() => router.push('/map')} className="text-pink-400 font-bold mb-4 block">← 返回地图</button>

        {/* Certificate */}
        <div className="bg-white rounded-3xl shadow-2xl border-4 border-yellow-300 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFFBEB 0%, #FFF0F8 100%)' }}>

          {/* Top decoration */}
          <div className="bg-gradient-to-r from-pink-400 to-purple-400 p-4 text-center">
            <p className="text-white font-black text-lg tracking-wider">🦕 DINO ENGLISH ADVENTURE 🦕</p>
          </div>

          <div className="p-8 text-center">
            {/* Stars decoration */}
            <div className="flex justify-center gap-1 mb-4 text-2xl">
              ⭐⭐⭐⭐⭐
            </div>

            <h1 className="text-3xl font-black text-yellow-600 mb-1">英语启蒙证书</h1>
            <h2 className="text-lg font-bold text-gray-500 mb-6">Dino English Starter Certificate</h2>

            {/* Dino */}
            <div className="flex justify-center mb-4">
              <Dino mood="clapping" size={100} />
            </div>

            {/* Name */}
            <p className="text-gray-500 mb-1">这是颁发给</p>
            <p className="text-4xl font-black text-pink-500 mb-4">{nickname}</p>

            {/* Certificate text */}
            <div className="bg-yellow-50 rounded-2xl p-4 mb-6 border-2 border-yellow-200">
              <p className="text-gray-700 leading-relaxed">
                恭喜完成《小恐龙英语冒险岛》14 天英语启蒙之旅！<br />
                你已经能够开口说英语，认识 26 个字母，<br />
                并完成了英语自我介绍！
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-3xl font-black text-pink-500">14</p>
                <p className="text-gray-400 text-sm">天</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-yellow-500">{stars}</p>
                <p className="text-gray-400 text-sm">颗星星</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-black text-green-500">26</p>
                <p className="text-gray-400 text-sm">个字母</p>
              </div>
            </div>

            {/* Learned expressions */}
            <div className="mb-6">
              <p className="text-sm font-bold text-gray-400 mb-2">我学会说：</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {["Hello!", "My name is...", "I'm eight.", "I'm fine.", "I like dinosaurs.", "Goodbye!", "A B C D E F G..."].map((e) => (
                  <span key={e} className="bg-pink-50 border border-pink-200 text-pink-600 text-xs font-bold px-2 py-1 rounded-full">{e}</span>
                ))}
              </div>
            </div>

            {/* Date */}
            <p className="text-gray-400 text-sm">{today}</p>
            <p className="text-gray-300 text-xs mt-1">小恐龙英语冒险岛 • Dino English Adventure</p>
          </div>

          {/* Bottom decoration */}
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 text-center">
            <p className="text-white text-sm font-bold">🌟 Keep going! You are amazing! 🌟</p>
          </div>
        </div>

        {/* Print hint */}
        <p className="text-center text-gray-400 text-sm mt-4">
          可以截图保存证书 📸
        </p>

        <button
          onClick={() => router.push('/')}
          className="w-full mt-4 py-4 rounded-3xl text-xl font-black bg-pink-400 text-white shadow-lg hover:bg-pink-500 active:scale-95 transition-all"
        >
          🦕 回到首页
        </button>
      </div>
    </main>
  )
}
