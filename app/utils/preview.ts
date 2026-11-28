const PREVIEW_STORAGE_KEY = 'contentful-preview-token'

/**
 * Contentful Preview API token of the current editor session. Browser only: it lives in
 * sessionStorage, never in the bundle or the generated HTML.
 */
export function getPreviewToken(): string | null {
  if (!import.meta.client) return null
  return sessionStorage.getItem(PREVIEW_STORAGE_KEY)
}

export function setPreviewToken(token: string): void {
  sessionStorage.setItem(PREVIEW_STORAGE_KEY, token)
}
