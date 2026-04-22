import { useState, useEffect } from 'react'

export function useTyped(strings, typeSpeed = 65, backSpeed = 35, backDelay = 1800) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = strings[idx]

    if (!deleting && display === current) {
      const t = setTimeout(() => setDeleting(true), backDelay)
      return () => clearTimeout(t)
    }

    if (deleting && display === '') {
      setDeleting(false)
      setIdx(i => (i + 1) % strings.length)
      return
    }

    const t = setTimeout(() => {
      setDisplay(d =>
        deleting ? d.slice(0, -1) : current.slice(0, d.length + 1)
      )
    }, deleting ? backSpeed : typeSpeed)

    return () => clearTimeout(t)
  }, [display, deleting, idx, strings, typeSpeed, backSpeed, backDelay])

  return display
}
