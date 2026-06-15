'use client'

export function speak(text: string, lang = 'en-US', rate = 0.85) {
  if (typeof window === 'undefined') return
  window.speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = lang
  u.rate = rate
  u.pitch = 1.1
  window.speechSynthesis.speak(u)
}

export function stopSpeaking() {
  if (typeof window !== 'undefined') window.speechSynthesis.cancel()
}
