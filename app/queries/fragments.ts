// Field selections shared by the queries. Only fields the mappers use are requested.

export const IMAGE_FIELDS = `
  url
  description
  width
  height
`

export const RICH_TEXT_IMAGE_LINKS = `
  links {
    assets {
      block {
        sys {
          id
        }
        contentType
        ${IMAGE_FIELDS}
      }
    }
  }
`
