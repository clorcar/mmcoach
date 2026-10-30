import type { Address } from '~/types/content'

const LOCALE = 'es-ES'

// Pages are rendered at build time on a UTC machine; dates must show Spanish local time
const TIME_ZONE = 'Europe/Madrid'

/**
 * Formats an ISO date for display, e.g. "Sábado, 14 de noviembre de 2026".
 */
export function formatDate(
  isoDate: string,
  options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' },
): string {
  const date = new Date(isoDate)
  if (Number.isNaN(date.getTime())) return isoDate

  const formatted = new Intl.DateTimeFormat(LOCALE, { ...options, timeZone: TIME_ZONE }).format(
    date,
  )
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}

export function formatLongDate(isoDate: string): string {
  return formatDate(isoDate, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatDateTime(isoDate: string): string {
  return formatDate(isoDate, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Formats a price in euros. A missing price returns an empty string so callers can hide it.
 */
export function formatPrice(price: number | null): string {
  if (price === null) return ''
  if (price === 0) return 'Gratuito'
  return new Intl.NumberFormat(LOCALE, { style: 'currency', currency: 'EUR' }).format(price)
}

/**
 * Whether a date is less than `days` days before `now` (a future date counts as recent).
 */
export function isRecent(isoDate: string, now: number, days: number): boolean {
  const published = new Date(isoDate).getTime()
  if (Number.isNaN(published)) return false

  return now - published < days * 24 * 60 * 60 * 1000
}

/**
 * ISO 8601 date-time `minutes` after `isoDate`, or undefined when the length is unknown.
 */
export function addMinutes(isoDate: string, minutes: number | null): string | undefined {
  if (!minutes) return undefined
  return new Date(new Date(isoDate).getTime() + minutes * 60 * 1000).toISOString()
}

export function formatDuration(minutes: number | null): string {
  if (!minutes) return 'Duración personalizada'
  if (minutes < 60) return `${minutes} min`

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours} h ${remainingMinutes} min` : `${hours} h`
}

/**
 * Shortens text to a maximum length on a word boundary, e.g. for meta descriptions.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text

  const cut = text.slice(0, maxLength - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')) || cut}…`
}

/**
 * Single-line postal address, e.g. "Calle Mayor 1, 28013 Madrid, España".
 */
export function formatAddress(address: Address): string {
  return `${address.street}, ${address.postalCode} ${address.city}, ${address.country}`
}

export function buildMapsLink(address: Address): string {
  const query = encodeURIComponent(`${address.name}, ${formatAddress(address)}`)
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}
