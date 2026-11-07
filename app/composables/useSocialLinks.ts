/**
 * Social profiles and messaging links from the public runtime config. One without a value is left out.
 */
export function useSocialLinks() {
  const { instagramUrl, whatsappNumber } = useRuntimeConfig().public
  const whatsappDigits = whatsappNumber.replace(/\D/g, '')

  return [
    { name: 'Instagram', url: instagramUrl, icon: 'instagram' },
    {
      name: 'WhatsApp',
      url: whatsappDigits && `https://wa.me/${whatsappDigits}`,
      icon: 'whatsapp',
    },
  ].filter((social) => social.url)
}
