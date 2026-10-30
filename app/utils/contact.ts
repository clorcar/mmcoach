export const CONTACT_REASONS = [
  { value: 'servicios', label: 'Servicios' },
  { value: 'talleres', label: 'Talleres' },
  { value: 'otras', label: 'Otras consultas' },
] as const

export type ContactReason = (typeof CONTACT_REASONS)[number]['value']

/**
 * Link to the contact page, optionally preselecting the reason (`?motivo=`).
 */
export function contactLink(reason?: ContactReason): string {
  return reason ? `/contacto?motivo=${reason}` : '/contacto'
}

/**
 * Reads a `motivo` query value; anything that is not a known reason is ignored.
 */
export function parseContactReason(value: unknown): ContactReason | '' {
  const reason = CONTACT_REASONS.find((option) => option.value === value)
  return reason ? reason.value : ''
}
