'use client'

import { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation'
import { DAYS } from '@/data/days'
import { getProgress, completeDay } from '@/lib/progress'
import { speak } from '@/lib/speech'
import Dino from '@/components/Dino'
import StarBurst from '@/components/StarBurst'

type Step = 'intro' | 'listen' | 'repeat' | 'game' | 'stage' | 'done'

export default function DayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const dayNum = parseInt(id)
  const dayData = DAYS.find((d) => d.day === dayNum)

  const [step, setStep] = useState<Step>('intro')
  const [nickname, setNickname] = useState('')
  const [showStars, setShowStars] = useState(false)

  useEffect(() => {
    const p = getProgress()
    if (!p.nickname) { router.push('/'); return }
    setNickname(p.nickname)
  }, [router])

  if (!dayData) return <div className="p-8 text-center text-gray-500">关卡不存在</div>

  const handleStepDone = () => {
    const steps: Step[] = ['intro', 'listen', 'repeat', 'game', 'stage', 'done']
    const cur = steps.indexOf(step)
    setStep(steps[cur + 1])
  }

  const handleComplete = () => {
    completeDay(dayNum, 1)
    setShowStars(true)
    setTimeout(() => {
      setShowStars(false)
      setStep('done')
    }, 2000)
  }

  const progress = [
    { label: '开场', key: 'intro' },
    { label: '听一听', key: 'listen' },
    { label: '跟我说', key: 'repeat' },
    { label: '玩一玩', key: 'game' },
    { label: '小舞台', key: 'stage' },
  ]

  return (
    <main className="min-h-screen px-4 py-4 max-w-2xl mx-auto"
      style={{ background: 'linear-gradient(160deg, #FFF0F8 0%, #E0F2FE 100%)' }}>

      <StarBurst show={showStars} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => router.push('/map')} className="text-pink-400 font-bold">← 地图</button>
        <div className="flex-1 text-center">
          <span className="text-pink-500 font-black">{dayData.title}</span>
          <span className="text-gray-500 text-sm ml-2">{dayData.subtitle}</span>
        </div>
      </div>

      {/* Progress bar */}
      {step !== 'done' && (
        <div className="flex gap-1 mb-6">
          {progress.map((s, i) => {
            const steps: Step[] = ['intro', 'listen', 'repeat', 'game', 'stage']
            const curIdx = steps.indexOf(step)
            const isDone = i < curIdx
            const isCur = steps[i] === step
            return (
              <div key={s.key} className="flex-1">
                <div className={`h-2 rounded-full transition-all duration-300
                  ${isDone ? 'bg-pink-400' : isCur ? 'bg-pink-300' : 'bg-pink-100'}`} />
                <p className={`text-center text-xs mt-1 font-semibold
                  ${isCur ? 'text-pink-500' : isDone ? 'text-pink-400' : 'text-gray-300'}`}>
                  {s.label}
                </p>
              </div>
            )
          })}
        </div>
      )}

      {/* Step content */}
      {step === 'intro' && <IntroStep dayData={dayData} nickname={nickname} onNext={handleStepDone} />}
      {step === 'listen' && <ListenStep dayData={dayData} onNext={handleStepDone} />}
      {step === 'repeat' && <RepeatStep dayData={dayData} onNext={handleStepDone} />}
      {step === 'game' && <GameStep dayData={dayData} onNext={handleStepDone} />}
      {step === 'stage' && <StageStep dayData={dayData} nickname={nickname} onComplete={handleComplete} />}
      {step === 'done' && <DoneStep dayData={dayData} onBack={() => router.push('/map')} />}
    </main>
  )
}

// ===================== INTRO STEP =====================
function IntroStep({ dayData, nickname, onNext }: { dayData: typeof DAYS[0]; nickname: string; onNext: () => void }) {
  useEffect(() => {
    setTimeout(() => speak(`Hello ${nickname}! Today we will learn: ${dayData.coreExpressions[0]}`), 600)
  }, [])

  return (
    <div className="flex flex-col items-center text-center py-6 gap-6">
      <Dino mood="waving" size={140} speechBubble={`Hello, ${nickname}! 🎉`} />
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-pink-100 w-full">
        <h2 className="text-2xl font-black text-pink-500 mb-2">{dayData.subtitle}</h2>
        <p className="text-gray-600 mb-4">今天的目标：<span className="text-pink-500 font-semibold">{dayData.goal}</span></p>
        <div className="bg-pink-50 rounded-2xl p-4">
          <p className="text-sm text-gray-500 mb-2 font-semibold">今天要学的表达：</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {dayData.coreExpressions.map((expr) => (
              <span key={expr} className="bg-white border-2 border-pink-200 text-pink-600 font-bold px-3 py-1 rounded-full text-sm">
                {expr}
              </span>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        className="px-10 py-4 rounded-3xl text-xl font-black bg-pink-400 text-white shadow-lg hover:bg-pink-500 active:scale-95 transition-all"
      >
        开始今天的冒险！🚀
      </button>
      <p className="text-sm text-gray-400">今天和小恐龙一起开始英语冒险吧！</p>
    </div>
  )
}

// ===================== LISTEN STEP =====================
function ListenStep({ dayData, onNext }: { dayData: typeof DAYS[0]; onNext: () => void }) {
  const [current, setCurrent] = useState(0)
  const [played, setPlayed] = useState<Set<number>>(new Set())
  const total = dayData.listenCards.length

  const playCard = (idx: number) => {
    speak(dayData.listenCards[idx].english)
    setPlayed((p) => new Set([...p, idx]))
  }

  const canNext = played.size >= 1

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-2">
        <p className="text-2xl font-black text-pink-500">听一听 🎧</p>
        <p className="text-gray-500 text-sm">点击卡片，听小恐龙说英语！</p>
      </div>

      <div className="grid gap-4">
        {dayData.listenCards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => { setCurrent(idx); playCard(idx) }}
            className={`bg-white rounded-3xl p-5 shadow-md border-2 transition-all active:scale-95
              ${played.has(idx) ? 'border-green-300 bg-green-50' : 'border-pink-100 hover:border-pink-300'}`}
          >
            <div className="flex items-center gap-4">
              <span className="text-4xl">{card.emoji}</span>
              <div className="flex-1 text-left">
                <p className="text-xl font-black text-gray-800">{card.english}</p>
                <p className="text-gray-400 text-sm">{card.chinese}</p>
              </div>
              <span className="text-2xl">{played.has(idx) ? '✅' : '🔊'}</span>
            </div>
          </button>
        ))}
      </div>

      {canNext && (
        <button
          onClick={onNext}
          className="mt-4 px-10 py-4 rounded-3xl text-xl font-black bg-green-400 text-white shadow-lg hover:bg-green-500 active:scale-95 transition-all pop"
        >
          我听完了！下一步 →
        </button>
      )}
    </div>
  )
}

// ===================== REPEAT STEP =====================
function RepeatStep({ dayData, onNext }: { dayData: typeof DAYS[0]; onNext: () => void }) {
  const [current, setCurrent] = useState(0)
  const [recorded, setRecorded] = useState<Set<number>>(new Set())
  const [isRecording, setIsRecording] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const sentence = dayData.repeatSentences[current]
  const total = dayData.repeatSentences.length

  const feedbacks = ['Great job! 🌟', 'You did it! 🎉', 'Awesome! 💪', 'Super! ⭐', 'High five! 🙌']

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      const chunks: BlobPart[] = []
      mr.ondataavailable = (e) => chunks.push(e.data)
      mr.onstop = () => {
        stream.getTracks().forEach((t) => t.stop())
        setRecorded((r) => new Set([...r, current]))
        setFeedback(feedbacks[Math.floor(Math.random() * feedbacks.length)])
        setTimeout(() => {
          setFeedback('')
          setCurrent((c) => Math.min(c + 1, total - 1))
        }, 1200)
      }
      mr.start()
      setMediaRecorder(mr)
      setIsRecording(true)
    } catch {
      setRecorded((r) => new Set([...r, current]))
      setFeedback(feedbacks[0])
      setTimeout(() => {
        setFeedback('')
        setCurrent((c) => Math.min(c + 1, total - 1))
      }, 1200)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder) { mediaRecorder.stop(); setMediaRecorder(null) }
    setIsRecording(false)
  }

  const canNext = recorded.size >= 1

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center mb-2">
        <p className="text-2xl font-black text-pink-500">跟我说 🎤</p>
        <p className="text-gray-500 text-sm">听一句，说一句，很棒的！</p>
      </div>

      {/* Sentence counter */}
      <div className="flex gap-2">
        {dayData.repeatSentences.map((_, i) => (
          <div key={i} className={`w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-all
            ${recorded.has(i) ? 'bg-green-400 text-white' : i === current ? 'bg-pink-400 text-white' : 'bg-gray-200 text-gray-400'}`}>
            {recorded.has(i) ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Current sentence card */}
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-pink-100 w-full text-center">
        <Dino mood={isRecording ? 'excited' : 'happy'} size={80} />
        <p className="text-2xl font-black text-gray-800 mt-3">{sentence.english}</p>
        <p className="text-gray-400 text-sm mt-1">{sentence.chinese}</p>

        {feedback && (
          <div className="mt-3 text-xl font-black text-green-500 pop">{feedback}</div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => speak(sentence.english)}
          className="px-6 py-3 rounded-2xl text-lg font-bold bg-blue-100 text-blue-600 hover:bg-blue-200 active:scale-95 transition-all border-2 border-blue-200"
        >
          🔊 听一遍
        </button>

        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-6 py-3 rounded-2xl text-lg font-bold bg-pink-400 text-white hover:bg-pink-500 active:scale-95 transition-all shadow-md"
          >
            🎤 我来说！
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-6 py-3 rounded-2xl text-lg font-bold bg-red-400 text-white hover:bg-red-500 active:scale-95 transition-all shadow-md animate-pulse"
          >
            ⏹ 说完了！
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-4 w-full">
        {current > 0 && (
          <button onClick={() => setCurrent((c) => c - 1)} className="flex-1 py-3 rounded-2xl bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 transition-all">
            ← 上一句
          </button>
        )}
        {current < total - 1 && recorded.has(current) && (
          <button onClick={() => setCurrent((c) => c + 1)} className="flex-1 py-3 rounded-2xl bg-yellow-300 text-yellow-900 font-bold hover:bg-yellow-400 transition-all">
            下一句 →
          </button>
        )}
      </div>

      {canNext && (
        <button
          onClick={onNext}
          className="w-full py-4 rounded-3xl text-xl font-black bg-green-400 text-white shadow-lg hover:bg-green-500 active:scale-95 transition-all pop"
        >
          说完啦！去玩游戏！🎮
        </button>
      )}
    </div>
  )
}

// ===================== GAME STEP =====================
function GameStep({ dayData, onNext }: { dayData: typeof DAYS[0]; onNext: () => void }) {
  const { game } = dayData

  if (game.type === 'listen-select') return <ListenSelectGame game={game} onNext={onNext} />
  if (game.type === 'letter-match') return <LetterMatchGame game={game} onNext={onNext} />
  if (game.type === 'word-image') return <WordImageGame game={game} onNext={onNext} />
  if (game.type === 'response-choice') return <ResponseChoiceGame game={game} onNext={onNext} />
  return null
}

function ListenSelectGame({ game, onNext }: { game: typeof DAYS[0]['game']; onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [correct, setCorrect] = useState(false)
  const correctOpt = (game.options ?? []).find((o) => o.isCorrect)

  const handleSelect = (id: string) => {
    setSelected(id)
    if (id === correctOpt?.id) setCorrect(true)
    else speak('Try again!', 'en-US', 1)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-2xl font-black text-pink-500 text-center">玩一玩 🎮</p>
      <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-pink-100 w-full text-center">
        <p className="text-gray-600 mb-3 font-semibold">{game.instruction}</p>
        <button
          onClick={() => game.audioPrompt && speak(game.audioPrompt)}
          className="px-6 py-3 rounded-2xl bg-blue-100 text-blue-600 font-bold text-lg hover:bg-blue-200 transition-all active:scale-95"
        >
          🔊 听一听！
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 w-full">
        {(game.options ?? []).map((opt) => {
          const isSelected = selected === opt.id
          const isCorrectOpt = opt.isCorrect
          return (
            <button
              key={opt.id}
              onClick={() => !correct && handleSelect(opt.id)}
              className={`py-5 px-6 rounded-3xl text-xl font-black transition-all active:scale-95 border-2
                ${isSelected && isCorrectOpt ? 'bg-green-100 border-green-400 text-green-700' : ''}
                ${isSelected && !isCorrectOpt ? 'bg-red-100 border-red-300 text-red-500' : ''}
                ${!isSelected ? 'bg-white border-pink-200 text-gray-700 hover:border-pink-400' : ''}`}
            >
              {opt.text} {isSelected && (isCorrectOpt ? '✅' : '❌')}
            </button>
          )
        })}
      </div>
      {correct && (
        <div className="text-center pop">
          <p className="text-2xl font-black text-green-500">Great job! 🌟</p>
          <button onClick={onNext} className="mt-3 px-10 py-4 rounded-3xl text-xl font-black bg-green-400 text-white shadow-lg hover:bg-green-500 active:scale-95 transition-all">
            去小舞台！🎭
          </button>
        </div>
      )}
    </div>
  )
}

function LetterMatchGame({ game, onNext }: { game: typeof DAYS[0]['game']; onNext: () => void }) {
  const pairs = game.pairs || []
  const [leftSelected, setLeftSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrong, setWrong] = useState<string | null>(null)

  const rights = [...pairs].sort(() => Math.random() - 0.5).map((p) => p.right)
  const [shuffledRights] = useState(rights)

  const handleLeft = (left: string) => {
    if (matched.has(left)) return
    setLeftSelected(left)
  }

  const handleRight = (right: string) => {
    if (!leftSelected) return
    const pair = pairs.find((p) => p.left === leftSelected)
    if (pair?.right === right) {
      setMatched((m) => new Set([...m, leftSelected]))
      setLeftSelected(null)
      speak('Great!', 'en-US', 1)
    } else {
      setWrong(right)
      setTimeout(() => setWrong(null), 600)
    }
  }

  const allDone = matched.size === pairs.length

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-2xl font-black text-pink-500 text-center">玩一玩 🎮</p>
      <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-pink-100 w-full text-center">
        <p className="text-gray-600 font-semibold">{game.instruction}</p>
      </div>
      <div className="flex gap-6 w-full justify-center">
        {/* Left column */}
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-center text-xs font-bold text-gray-400 mb-1">大写</p>
          {pairs.map((p) => (
            <button
              key={p.left}
              onClick={() => handleLeft(p.left)}
              className={`py-4 rounded-2xl text-2xl font-black transition-all active:scale-95 border-2
                ${matched.has(p.left) ? 'bg-green-100 border-green-400 text-green-600' : ''}
                ${leftSelected === p.left ? 'bg-pink-200 border-pink-400 text-pink-700 scale-105' : ''}
                ${!matched.has(p.left) && leftSelected !== p.left ? 'bg-white border-pink-200 text-gray-700 hover:border-pink-400' : ''}`}
            >
              {matched.has(p.left) ? '✓' : p.left}
            </button>
          ))}
        </div>
        {/* Right column */}
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-center text-xs font-bold text-gray-400 mb-1">小写</p>
          {shuffledRights.map((r) => {
            const isMatchedRight = [...matched].some((l) => pairs.find((p) => p.left === l)?.right === r)
            return (
              <button
                key={r}
                onClick={() => handleRight(r)}
                className={`py-4 rounded-2xl text-2xl font-black transition-all active:scale-95 border-2
                  ${isMatchedRight ? 'bg-green-100 border-green-400 text-green-600' : ''}
                  ${wrong === r ? 'bg-red-100 border-red-300 text-red-500' : ''}
                  ${!isMatchedRight && wrong !== r ? 'bg-white border-blue-200 text-gray-700 hover:border-blue-400' : ''}`}
              >
                {isMatchedRight ? '✓' : r}
              </button>
            )
          })}
        </div>
      </div>
      {allDone && (
        <div className="text-center pop">
          <p className="text-2xl font-black text-green-500">全部配对成功！🎉</p>
          <button onClick={onNext} className="mt-3 px-10 py-4 rounded-3xl text-xl font-black bg-green-400 text-white shadow-lg hover:bg-green-500 active:scale-95 transition-all">
            去小舞台！🎭
          </button>
        </div>
      )}
    </div>
  )
}

function WordImageGame({ game, onNext }: { game: typeof DAYS[0]['game']; onNext: () => void }) {
  const pairs = game.pairs || []
  const [selected, setSelected] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [shuffledRights] = useState([...pairs].sort(() => Math.random() - 0.5).map((p) => p.right))

  const handleLeft = (left: string) => {
    if (matched.has(left)) return
    setSelected(left)
  }

  const handleRight = (right: string) => {
    if (!selected) return
    const pair = pairs.find((p) => p.left === selected)
    if (pair?.right === right) {
      setMatched((m) => new Set([...m, selected]))
      setSelected(null)
      speak('Great!', 'en-US', 1)
    }
  }

  const allDone = matched.size === pairs.length

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-2xl font-black text-pink-500 text-center">玩一玩 🎮</p>
      <div className="bg-white rounded-3xl p-4 shadow-md border-2 border-pink-100 w-full">
        <p className="text-gray-600 font-semibold text-center">{game.instruction}</p>
      </div>
      <div className="flex gap-4 w-full">
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-center text-xs font-bold text-gray-400">英文</p>
          {pairs.map((p) => (
            <button key={p.left} onClick={() => handleLeft(p.left)}
              className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all active:scale-95 border-2 text-left
                ${matched.has(p.left) ? 'bg-green-100 border-green-400 text-green-700' : selected === p.left ? 'bg-pink-200 border-pink-400 text-pink-700' : 'bg-white border-pink-200 text-gray-700 hover:border-pink-400'}`}>
              {matched.has(p.left) ? '✓ ' : ''}{p.left}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 flex-1">
          <p className="text-center text-xs font-bold text-gray-400">中文</p>
          {shuffledRights.map((r) => {
            const isMatched = [...matched].some((l) => pairs.find((p) => p.left === l)?.right === r)
            return (
              <button key={r} onClick={() => handleRight(r)}
                className={`py-3 px-4 rounded-2xl text-sm font-bold transition-all active:scale-95 border-2
                  ${isMatched ? 'bg-green-100 border-green-400 text-green-700' : 'bg-white border-blue-200 text-gray-700 hover:border-blue-400'}`}>
                {isMatched ? '✓ ' : ''}{r}
              </button>
            )
          })}
        </div>
      </div>
      {allDone && (
        <div className="text-center pop">
          <p className="text-2xl font-black text-green-500">全对了！🎉</p>
          <button onClick={onNext} className="mt-3 px-10 py-4 rounded-3xl text-xl font-black bg-green-400 text-white shadow-lg hover:bg-green-500 active:scale-95 transition-all">
            去小舞台！🎭
          </button>
        </div>
      )}
    </div>
  )
}

function ResponseChoiceGame({ game, onNext }: { game: typeof DAYS[0]['game']; onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const correct = (game.options ?? []).find((o) => o.isCorrect)

  const handleSelect = (id: string) => {
    setSelected(id)
    if (id === correct?.id) speak('Great job!', 'en-US', 1)
    else speak('Try again!', 'en-US', 1)
  }

  const isCorrect = selected === correct?.id

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-2xl font-black text-pink-500 text-center">玩一玩 🎮</p>
      <div className="bg-white rounded-3xl p-5 shadow-md border-2 border-pink-100 w-full text-center">
        <p className="text-gray-600 mb-3 font-semibold">{game.instruction}</p>
        {game.audioPrompt && (
          <button onClick={() => speak(game.audioPrompt!)} className="px-6 py-2 rounded-2xl bg-blue-100 text-blue-600 font-bold hover:bg-blue-200 active:scale-95 transition-all">
            🔊 再听一遍
          </button>
        )}
      </div>
      <div className="grid gap-3 w-full">
        {(game.options ?? []).map((opt) => {
          const isSel = selected === opt.id
          return (
            <button key={opt.id} onClick={() => !isCorrect && handleSelect(opt.id)}
              className={`py-5 px-6 rounded-3xl text-xl font-black transition-all active:scale-95 border-2
                ${isSel && opt.isCorrect ? 'bg-green-100 border-green-400 text-green-700' : ''}
                ${isSel && !opt.isCorrect ? 'bg-red-100 border-red-300 text-red-500' : ''}
                ${!isSel ? 'bg-white border-pink-200 text-gray-700 hover:border-pink-400' : ''}`}>
              {opt.text} {isSel && (opt.isCorrect ? '✅' : '❌')}
            </button>
          )
        })}
      </div>
      {isCorrect && (
        <div className="text-center pop">
          <p className="text-2xl font-black text-green-500">Great job! 🌟</p>
          <button onClick={onNext} className="mt-3 px-10 py-4 rounded-3xl text-xl font-black bg-green-400 text-white shadow-lg hover:bg-green-500 active:scale-95 transition-all">
            去小舞台！🎭
          </button>
        </div>
      )}
    </div>
  )
}

// ===================== STAGE STEP =====================
function StageStep({ dayData, nickname, onComplete }: { dayData: typeof DAYS[0]; nickname: string; onComplete: () => void }) {
  const [current, setCurrent] = useState(0)
  const [recorded, setRecorded] = useState<Set<number>>(new Set())
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const lines = dayData.stageLines
  const total = lines.length
  const allDone = recorded.size >= 1

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      mr.ondataavailable = () => {}
      mr.onstop = () => { stream.getTracks().forEach((t) => t.stop()) }
      mr.start()
      setMediaRecorder(mr)
    } catch {}
    setIsRecording(true)
  }

  const stopRecording = () => {
    if (mediaRecorder) { mediaRecorder.stop(); setMediaRecorder(null) }
    setIsRecording(false)
    setRecorded((r) => new Set([...r, current]))
    if (current < total - 1) setTimeout(() => setCurrent((c) => c + 1), 500)
  }

  const displayLine = lines[current].replace('____', nickname || '____')

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <p className="text-2xl font-black text-pink-500">小舞台 🎭</p>
      <p className="text-gray-500 text-sm text-center">把今天学的说出来吧！</p>

      {/* Stage background */}
      <div className="w-full bg-gradient-to-b from-purple-100 to-pink-100 rounded-3xl p-6 border-2 border-purple-200 shadow-md">
        <div className="flex justify-center mb-4">
          <Dino mood={isRecording ? 'excited' : 'happy'} size={90} />
        </div>

        {/* Line dots */}
        <div className="flex justify-center gap-2 mb-4">
          {lines.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all
              ${recorded.has(i) ? 'bg-green-400' : i === current ? 'bg-pink-400 scale-125' : 'bg-gray-300'}`} />
          ))}
        </div>

        {/* Current line */}
        <div className="bg-white rounded-2xl p-4 text-center mb-4">
          <p className="text-2xl font-black text-gray-800">{displayLine}</p>
          <p className="text-gray-400 text-sm mt-1">{dayData.stageChinese[current]}</p>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={() => speak(displayLine)} className="px-5 py-2 rounded-2xl bg-blue-100 text-blue-600 font-bold text-sm hover:bg-blue-200 active:scale-95 transition-all">
            🔊 听示范
          </button>
          {!isRecording ? (
            <button onClick={startRecording} className="px-5 py-2 rounded-2xl bg-pink-400 text-white font-bold text-sm hover:bg-pink-500 active:scale-95 transition-all shadow">
              🎤 说！
            </button>
          ) : (
            <button onClick={stopRecording} className="px-5 py-2 rounded-2xl bg-red-400 text-white font-bold text-sm hover:bg-red-500 active:scale-95 transition-all animate-pulse">
              ⏹ 说完了
            </button>
          )}
        </div>
      </div>

      {allDone && (
        <div className="text-center pop w-full">
          <p className="text-2xl font-black text-green-500 mb-3">🎉 超级棒！See you tomorrow!</p>
          <button onClick={onComplete} className="w-full py-4 rounded-3xl text-xl font-black bg-yellow-400 text-white shadow-lg hover:bg-yellow-500 active:scale-95 transition-all">
            获得今日星星！⭐
          </button>
        </div>
      )}
    </div>
  )
}

// ===================== DONE STEP =====================
function DoneStep({ dayData, onBack }: { dayData: typeof DAYS[0]; onBack: () => void }) {
  useEffect(() => { speak('Great job! See you tomorrow!') }, [])
  return (
    <div className="flex flex-col items-center gap-6 py-8 text-center">
      <Dino mood="clapping" size={150} />
      <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-yellow-200 w-full">
        <p className="text-4xl mb-2">⭐</p>
        <h2 className="text-2xl font-black text-pink-500 mb-2">今天完成啦！</h2>
        <p className="text-gray-600 mb-3">今天学会了：</p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {dayData.coreExpressions.map((e) => (
            <span key={e} className="bg-pink-50 border border-pink-200 text-pink-600 font-bold px-3 py-1 rounded-full text-sm">{e}</span>
          ))}
        </div>
        <p className="text-lg font-black text-yellow-500">{dayData.reward}</p>
      </div>
      <button onClick={onBack} className="px-10 py-4 rounded-3xl text-xl font-black bg-pink-400 text-white shadow-lg hover:bg-pink-500 active:scale-95 transition-all">
        返回冒险地图 🗺️
      </button>
    </div>
  )
}
