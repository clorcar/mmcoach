const LLMS_WORKSHOPS_QUERY = `
  query LlmsWorkshops {
    talleresCollection(limit: 100, order: [fecha_ASC]) {
      items {
        titulo
        url
        fecha
        localizacion
      }
    }
  }
`

interface LlmsWorkshopsResponse {
  data?: {
    talleresCollection: {
      items: { titulo: string; url: string; fecha: string; localizacion: string }[]
    } | null
  }
  errors?: { message: string }[]
}

/**
 * llms.txt (https://llmstxt.org), prerendered at build time: key pages with one-line descriptions.
 */
export default defineEventHandler(async (event) => {
  const { url, name, description } = getSiteConfig(event)

  const response = await fetchContentful(event, { query: LLMS_WORKSHOPS_QUERY })
  const body = response._data as LlmsWorkshopsResponse | undefined
  if (!response.ok || body?.errors?.length) {
    throw createError({
      statusCode: 502,
      statusMessage: `Contentful query failed: ${body?.errors?.map((e) => e.message).join('; ') ?? response.status}`,
    })
  }

  const dateFormatter = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
    timeZone: 'Europe/Madrid',
  })
  const workshops = (body?.data?.talleresCollection?.items ?? []).map(
    (w) =>
      `- [${w.titulo}](${url}/talleres/${w.url}): ${dateFormatter.format(new Date(w.fecha))}, ${w.localizacion}`,
  )

  const lines = [
    `# ${name}`,
    '',
    `> ${description}`,
    '',
    '## Páginas',
    '',
    `- [Talleres](${url}/talleres): próximos talleres y actividades de formación`,
    `- [Artículos](${url}/articulos): artículos sobre autoexigencia y gestión emocional`,
    `- [Servicios](${url}/servicios): servicios de coaching personal`,
    `- [Testimonios](${url}/testimonios): opiniones de personas que han trabajado conmigo`,
    '',
    '## Talleres',
    '',
    ...(workshops.length ? workshops : ['- No hay talleres programados.']),
  ]

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return lines.join('\n') + '\n'
})
