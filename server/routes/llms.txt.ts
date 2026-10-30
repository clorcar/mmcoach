const LLMS_QUERY = `
  query Llms {
    talleresCollection(limit: 100, order: [fecha_ASC]) {
      items {
        titulo
        url
        fecha
        localizacion
      }
    }
    articulosCollection(limit: 100, order: [fechaPublicacion_DESC]) {
      items {
        titulo
        url
        fechaPublicacion
        resumen
      }
    }
  }
`

interface LlmsResponse {
  data?: {
    talleresCollection: {
      items: { titulo: string; url: string; fecha: string; localizacion: string }[]
    } | null
    articulosCollection: {
      items: { titulo: string; url: string; fechaPublicacion: string; resumen: string }[]
    } | null
  }
  errors?: { message: string }[]
}

/**
 * llms.txt (https://llmstxt.org), prerendered at build time: key pages with one-line descriptions.
 */
export default defineEventHandler(async (event) => {
  const { url, name, description } = getSiteConfig(event)

  const response = await fetchContentful(event, { query: LLMS_QUERY })
  const body = response._data as LlmsResponse | undefined
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

  const articles = (body?.data?.articulosCollection?.items ?? []).map(
    (a) =>
      `- [${a.titulo}](${url}/articulos/${a.url}): ${dateFormatter.format(new Date(a.fechaPublicacion))}. ${a.resumen}`,
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
    '',
    '## Artículos',
    '',
    ...(articles.length ? articles : ['- No hay artículos publicados.']),
  ]

  setResponseHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return lines.join('\n') + '\n'
})
