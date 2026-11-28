/**
 * Whether this visit is an editor preview (see plugins/preview.client.ts).
 */
export function useIsPreview() {
  return useState('is-preview', () => false)
}
