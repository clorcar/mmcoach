<script setup lang="ts">
const site = useSiteConfig()
const owner = useLegalOwner()

usePageSeo({
  title: 'Política de privacidad',
  description: `Cómo trata ${site.name} tus datos personales: qué datos recoge el formulario de contacto, para qué se usan, durante cuánto tiempo y cuáles son tus derechos.`,
})

useSchemaOrg([
  defineWebPage(),
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Política de privacidad' }],
  }),
])
</script>

<template>
  <LegalPage
    title="Política de privacidad"
    summary="Qué datos recojo, para qué los uso y qué derechos tienes sobre ellos."
    updated="2026-10-31"
  >
    <h2>Responsable del tratamiento</h2>
    <ul>
      <li><strong>Responsable:</strong> {{ owner.name }}</li>
      <li v-if="owner.taxId"><strong>NIF:</strong> {{ owner.taxId }}</li>
      <li v-if="owner.address"><strong>Domicilio:</strong> {{ owner.address }}</li>
      <li v-if="owner.email">
        <strong>Correo electrónico:</strong>
        <a :href="`mailto:${owner.email}`">{{ owner.email }}</a>
      </li>
    </ul>

    <h2>Qué datos recojo y para qué</h2>
    <p>
      Si me escribes desde el
      <NuxtLink :to="contactLink()">formulario de contacto</NuxtLink>, recojo tu nombre, apellidos,
      correo electrónico, motivo del mensaje y comentario. Los uso exclusivamente para responder a
      tu consulta. No los utilizo para enviarte publicidad ni los cedo a terceros con fines
      comerciales.
    </p>

    <h2>Testimonios</h2>
    <p>
      Si has compartido una opinión sobre mi trabajo, la
      <NuxtLink to="/testimonios">publico</NuxtLink> en este sitio web junto con tu nombre, el
      contexto en el que me conociste y, si me la has facilitado, tu fotografía. Lo hago solo con tu
      consentimiento, que puedes retirar en cualquier momento escribiéndome: retiraré tu testimonio
      del sitio web.
    </p>

    <h2>Base legal</h2>
    <p>
      Trato tus datos con tu consentimiento (artículo 6.1.a del Reglamento General de Protección de
      Datos), que das al marcar la casilla del formulario antes de enviarlo. Puedes retirarlo en
      cualquier momento escribiéndome, sin que ello afecte a lo ya tratado.
    </p>

    <h2>Cuánto tiempo los conservo</h2>
    <p>
      Conservo tu mensaje el tiempo necesario para atender tu consulta y, después, solo durante los
      plazos en los que pudieran derivarse responsabilidades legales. Pasado ese tiempo, lo elimino.
    </p>

    <h2>Quién más tiene acceso a tus datos</h2>
    <p>
      Para poder ofrecerte este sitio web me apoyo en proveedores que actúan como encargados del
      tratamiento:
    </p>
    <ul>
      <li>
        <strong>Web3Forms</strong>, que recibe lo que escribes en el formulario y me lo hace llegar
        por correo electrónico.
      </li>
      <li>
        <strong>Netlify</strong>, que aloja el sitio web y, como cualquier servidor, registra datos
        técnicos de la conexión, como la dirección IP.
      </li>
      <li>
        <strong>Contentful</strong>, donde se almacenan y gestionan los contenidos del sitio web,
        incluidos los testimonios, y desde cuyos servidores se cargan las imágenes de las páginas.
      </li>
    </ul>
    <p>
      Alguno de estos proveedores puede estar ubicado fuera del Espacio Económico Europeo. En ese
      caso, las transferencias se amparan en las garantías que prevé el Reglamento General de
      Protección de Datos.
    </p>

    <h2>Cookies</h2>
    <p>
      Este sitio web no utiliza cookies propias ni de terceros, ni herramientas de seguimiento o
      analítica que requieran tu consentimiento.
    </p>

    <h2>Tus derechos</h2>
    <p>
      Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación del
      tratamiento y portabilidad escribiéndome desde la
      <NuxtLink :to="contactLink()">página de contacto</NuxtLink>
      <template v-if="owner.email">
        o a <a :href="`mailto:${owner.email}`">{{ owner.email }}</a></template
      >. Si consideras que no se han respetado tus derechos, puedes presentar una reclamación ante
      la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" rel="noopener"
        >www.aepd.es</a
      >).
    </p>
  </LegalPage>
</template>
