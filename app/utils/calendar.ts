import type { Workshop } from '~/types/content'

const MAX_LINE_LENGTH = 73

// iCalendar text values escape backslashes, semicolons, commas and line breaks
function escapeText(text: string): string {
  return text.replace(/\\/g, '\\\\').replace(/[;,]/g, '\\$&').replace(/\r?\n/g, '\\n')
}

// Long lines continue on the next line, which starts with a space
function foldLine(line: string): string {
  const parts: string[] = []
  for (let i = 0; i < line.length; i += MAX_LINE_LENGTH) {
    parts.push(line.slice(i, i + MAX_LINE_LENGTH))
  }
  return parts.join('\r\n ')
}

function toUtcStamp(isoDate: string): string {
  return new Date(isoDate).toISOString().replace(/[-:]|\.\d{3}/g, '')
}

/**
 * Builds a `data:` link to an .ics file for a workshop, so "add to calendar" works in the static
 * HTML without JavaScript. The event has an end only when the workshop has a duration.
 *
 * @param workshop The workshop to add.
 * @param pageUrl Absolute URL of the workshop page (omitted from the file when empty).
 */
export function buildCalendarLink(workshop: Workshop, pageUrl: string): string {
  const start = toUtcStamp(workshop.date)
  const end = addMinutes(workshop.date, workshop.durationMinutes)

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//mmcoach//ES',
    'BEGIN:VEVENT',
    `UID:${workshop.id}`,
    // Same value as the start so the link is identical in the static HTML and after hydration
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    ...(end ? [`DTEND:${toUtcStamp(end)}`] : []),
    `SUMMARY:${escapeText(workshop.title)}`,
    `LOCATION:${escapeText(`${workshop.location.name}, ${formatAddress(workshop.location)}`)}`,
    ...(pageUrl ? [`URL:${pageUrl}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  const ics = lines.map(foldLine).join('\r\n') + '\r\n'
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}
