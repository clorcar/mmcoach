<script setup lang="ts">
const socialLinks = useSocialLinks()

const socialNames = computed(() => socialLinks.map((social) => social.name).join(' o '))

usePageSeo({
  title: 'Contacto',
  description:
    'Escríbeme para pedir información sobre un servicio o un taller, o para resolver cualquier duda. Leo cada mensaje con atención.',
})

useSchemaOrg([
  defineWebPage({ '@type': 'ContactPage' }),
  defineBreadcrumb({
    itemListElement: [{ name: 'Inicio', item: '/' }, { name: 'Contacto' }],
  }),
])
</script>

<template>
  <div class="contact-page">
    <PageHeader
      eyebrow="Contacta"
      title="Hablemos con calma"
      summary="Cuéntame qué te trae por aquí: si quieres información sobre un servicio o un taller, o simplemente tienes una pregunta. Leo cada mensaje con atención y te responderé lo antes posible."
    />

    <div class="contact">
      <section class="contact__form" aria-label="Formulario de contacto">
        <ContactForm />
      </section>

      <aside v-if="socialLinks.length" class="social" aria-labelledby="social-title">
        <p class="social__eyebrow">Redes sociales</p>
        <h2 id="social-title" class="social__title">Otra forma de conectar.</h2>
        <p class="social__summary">
          Si lo prefieres, también puedes escribirme por {{ socialNames }}.
        </p>

        <ul class="social__list">
          <li v-for="social in socialLinks" :key="social.name">
            <a :href="social.url" class="social__link" rel="me noopener">
              <SocialIcon :name="social.icon" :size="20" />
              <span class="social__name">{{ social.name }}</span>
              <BaseArrow direction="up-right" />
            </a>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-page {
  border-bottom: $border-width solid $color-border;
}

.contact {
  @include container;
  display: grid;
  gap: $space-8;
  padding-bottom: $space-8;

  @include bp(tablet-portrait) {
    padding-bottom: $space-10;
  }

  @include bp(tablet-landscape) {
    grid-template-columns: minmax(0, 46.25rem) minmax(0, 1fr);
    gap: $space-9;
    align-items: start;
  }
}

.social {
  display: flex;
  flex-direction: column;
  gap: $space-4-5;
  padding: $space-6;
  background-color: $color-surface-sage;
  border-radius: $radius-sm;
}

.social__eyebrow {
  @include eyebrow;
}

.social__title {
  @include f-30-400;
  letter-spacing: $letter-spacing-tight;
}

.social__summary {
  color: $color-text-muted;
}

.social__list {
  padding: 0;
  margin: 0;
  list-style: none;
  border-top: $border-width solid $color-border-strong;
}

.social__link {
  @include f-16-500;
  display: flex;
  gap: $space-3;
  align-items: center;
  padding-block: $space-4-5;
  color: $color-primary;
  border-bottom: $border-width solid $color-border-strong;

  &:hover {
    color: $color-primary-hover;
    text-decoration: none;
  }
}

.social__name {
  flex: 1;
}
</style>
