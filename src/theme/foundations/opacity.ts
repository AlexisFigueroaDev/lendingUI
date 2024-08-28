type KeyEmphasis = 'translucent' | 'low' | 'medium' | 'high' | 'pure'

const Emphasis: Record<KeyEmphasis, number> = {
  translucent: 0.1,
  low: 0.25,
  medium: 0.5,
  high: 0.75,
  pure: 1,
}

export const hexToRgba = (hex: string, opacity: KeyEmphasis): string => {
  const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex,
  ) as string[]

  return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
    b,
    16,
  )}, ${Emphasis[opacity]})`
}