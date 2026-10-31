/**
 * Data of the site owner for the legal pages, from the public runtime config.
 * Tax ID, address and email are optional: the legal pages leave out what is not set.
 */
export function useLegalOwner() {
  const { coachFullName, legalTaxId, legalAddress, contactEmail } = useRuntimeConfig().public

  return {
    name: coachFullName,
    taxId: legalTaxId,
    address: legalAddress,
    email: contactEmail,
  }
}
