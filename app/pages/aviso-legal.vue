<script setup lang="ts">
const site = useSiteConfig()
const owner = useLegalOwner()

usePageSeo({
  title: 'Aviso legal',
  description: `Aviso legal de ${site.name}: titular del sitio web, condiciones de uso, propiedad intelectual y legislación aplicable.`,
})

useSchemaOrg([
  defineWebPage(),
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Aviso legal' }],
  }),
])
</script>

<template>
  <LegalPage
    title="Aviso legal"
    summary="Quién está detrás de este sitio web y las condiciones para usarlo."
    updated="2026-10-31"
  >
    <h2>Titular del sitio web</h2>
    <p>
      En cumplimiento de la Ley 34/2002 de Servicios de la Sociedad de la Información y de Comercio
      Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de:
    </p>
    <ul>
      <li><strong>Titular:</strong> {{ owner.name }}</li>
      <li v-if="owner.taxId"><strong>NIF:</strong> {{ owner.taxId }}</li>
      <li v-if="owner.address"><strong>Domicilio:</strong> {{ owner.address }}</li>
      <li v-if="owner.email">
        <strong>Correo electrónico:</strong>
        <a :href="`mailto:${owner.email}`">{{ owner.email }}</a>
      </li>
      <li>
        <strong>Formulario de contacto:</strong>
        <NuxtLink :to="contactLink()">página de contacto</NuxtLink>
      </li>
    </ul>

    <h2>Objeto y condiciones de uso</h2>
    <p>
      Este sitio web ofrece información sobre los servicios de coaching, los talleres y los
      artículos de {{ site.name }}. Acceder a él implica aceptar estas condiciones y usarlo de forma
      lícita, sin dañar su funcionamiento ni los derechos de terceros.
    </p>
    <p>
      Los contenidos tienen carácter informativo y divulgativo. El coaching no sustituye a la
      atención médica o psicológica: si atraviesas un problema de salud, consulta con un profesional
      sanitario.
    </p>

    <h2>Propiedad intelectual</h2>
    <p>
      Los textos, imágenes, logotipos y demás contenidos de este sitio web son propiedad de su
      titular o se usan con la debida autorización. Queda prohibida su reproducción, distribución o
      transformación sin permiso expreso, salvo para uso personal o para citar fragmentos indicando
      la fuente y enlazando a la página original.
    </p>

    <h2>Responsabilidad</h2>
    <p>
      Me esfuerzo por mantener la información correcta y actualizada, pero no puedo garantizar que
      esté libre de errores ni que el sitio funcione sin interrupciones. No me hago responsable de
      los contenidos de los sitios web de terceros a los que se enlaza.
    </p>

    <h2>Protección de datos y cookies</h2>
    <p>
      El tratamiento de tus datos personales se explica en la
      <NuxtLink to="/politica-de-privacidad">política de privacidad</NuxtLink>.
    </p>

    <h2>Legislación aplicable</h2>
    <p>
      Este aviso se rige por la legislación española. Para cualquier controversia, las partes se
      someten a los juzgados y tribunales que correspondan conforme a la normativa vigente,
      incluidos los del domicilio del consumidor cuando así lo establezca la ley.
    </p>
  </LegalPage>
</template>
