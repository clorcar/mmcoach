/**
 * Social profiles from the public runtime config. A profile without a URL is left out.
 */
export function useSocialLinks() {
  const { instagramUrl, facebookUrl } = useRuntimeConfig().public

  return [
    { name: 'Instagram', url: instagramUrl, icon: 'instagram' },
    { name: 'Facebook', url: facebookUrl, icon: 'facebook' },
  ].filter((social) => social.url)
}
