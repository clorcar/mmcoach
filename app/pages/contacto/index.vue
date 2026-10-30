<script setup lang="ts">
const socialLinks = useSocialLinks()

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
  <div class="contact">
    <section class="contact__intro" aria-labelledby="contact-title">
      <p class="contact__eyebrow">Contacta</p>
      <h1 id="contact-title" class="contact__title">Hablemos con calma</h1>
      <p class="contact__summary">
        Cuéntame qué te trae por aquí: si quieres información sobre un servicio o un taller, o
        simplemente tienes una pregunta. Leo cada mensaje con atención y te responderé lo antes
        posible.
      </p>

      <div v-if="socialLinks.length" class="contact__social">
        <p class="contact__social-title">También puedes encontrarme en</p>
        <p class="contact__social-links">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            class="contact__social-link"
            rel="me noopener"
          >
            <SocialIcon :name="social.icon" :size="18" />
            {{ social.name }}
          </a>
        </p>
      </div>
    </section>

    <section class="contact__form" aria-label="Formulario de contacto">
      <ContactForm />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.contact {
  @include container;
  display: flex;
  flex-wrap: wrap;
  gap: $space-8;
  align-items: flex-start;
  padding-block: $space-8 $space-10;

  @include bp(tablet-portrait) {
    padding-top: $space-9;
  }
}

.contact__intro {
  display: flex;
  flex: 1 1 $contact-intro-basis;
  flex-direction: column;
  gap: $space-4;
  min-width: 0;
}

.contact__eyebrow {
  @include eyebrow;
}

.contact__title {
  @include f-32-500;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.contact__summary {
  color: $color-text-muted;
}

.contact__social {
  display: flex;
  flex-direction: column;
  gap: $space-3;
  padding: $space-5;
  margin-top: $space-2;
  background-color: $color-primary-soft;
  border-radius: $radius-2xl;
}

.contact__social-title {
  @include f-17-600;
  color: $color-heading;
}

.contact__social-links {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
}

.contact__social-link {
  display: inline-flex;
  gap: $space-2;
  align-items: center;
  padding: $space-3 $space-4;
  color: $color-text;
  background-color: $color-surface;
  border-radius: $radius-full;
}

.contact__form {
  @include card;
  flex: 999 1 $contact-form-basis;
  min-width: 0;
  padding: $space-5;
  border-radius: $radius-3xl;

  @include bp(tablet-portrait) {
    padding: $space-7;
  }
}
</style>
