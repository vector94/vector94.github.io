import { useState, useEffect } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*'

export function useScramble(text, { duration = 1000, delay = 300 } = {}) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    let raf
    const timeout = setTimeout(() => {
      const start = performance.now()
      function tick(now) {
        const p = Math.min((now - start) / duration, 1)
        const settled = Math.floor(p * text.length)
        let result = ''
        for (let i = 0; i < text.length; i++) {
          if (i < settled) {
            result += text[i]
          } else {
            result += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)]
          }
        }
        setDisplay(result)
        if (p < 1) raf = requestAnimationFrame(tick)
        else setDisplay(text)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => { clearTimeout(timeout); cancelAnimationFrame(raf) }
  }, [text, duration, delay])

  return display
}
