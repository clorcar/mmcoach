/**
 * Workshops that have not ended yet, soonest first.
 *
 * The site is static, so the HTML only knows the build date. It is rendered with the build time
 * (the same on the server and on hydration) and, once mounted, workshops that ended since the
 * build are dropped on the client.
 *
 * @param key Fixed payload key: the query depends on the build date.
 * @param limit Maximum number of workshops requested from Contentful.
 */
export async function useUpcomingWorkshops(key: string, limit?: number) {
  // Registered before the first await, while the component instance is still available
  const now = useState(`${key}-build-time`, () => Date.now())
  onMounted(() => {
    now.value = Date.now()
  })

  const today = new Date().toISOString().slice(0, 10)
  const { workshops } = await useWorkshops(
    { limit, order: 'fecha_ASC', where: { fecha_gte: today } },
    key,
  )

  return {
    workshops: computed(() =>
      workshops.value.filter(
        ({ date, durationMinutes }) => !hasEnded(date, durationMinutes, now.value),
      ),
    ),
  }
}
