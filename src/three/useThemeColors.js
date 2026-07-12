import { useEffect, useState } from 'react'

/*
 * Theme palettes for WebGL scenes. Additive blending reads well on the
 * dark night bg; the day theme needs normal blending + deeper colors
 * or everything washes out on #fafafa.
 */
const THEMES = {
  night: {
    isDay: false,
    accent1: '#e11d48',
    accent2: '#f97316',
    line: '#fb7185',
    dim: '#7f1d1d',
  },
  day: {
    isDay: true,
    accent1: '#9f1239',
    accent2: '#1e3a5f',
    line: '#9f1239',
    dim: '#cbd5e1',
  },
}

export function useThemeColors() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'night'
  )

  useEffect(() => {
    const el = document.documentElement
    const mo = new MutationObserver(() =>
      setTheme(el.getAttribute('data-theme') || 'night')
    )
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme'] })
    return () => mo.disconnect()
  }, [])

  return THEMES[theme] || THEMES.night
}

// woff copied into dist by the build script; troika can't parse woff2
export const LABEL_FONT = '/assets/Inter-Medium.woff'

export function isSmallScreen() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

export function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}
