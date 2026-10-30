<script setup lang="ts">
const site = useSiteConfig()
const socialLinks = useSocialLinks()

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__content">
      <div class="site-footer__about">
        <p class="site-footer__name">{{ site.name }}</p>
        <p class="site-footer__description">{{ site.description }}</p>
      </div>

      <nav aria-labelledby="footer-explore" class="site-footer__group site-footer__group--narrow">
        <p id="footer-explore" class="site-footer__title">Explora</p>
        <NuxtLink to="/talleres" class="site-footer__link">Talleres</NuxtLink>
        <NuxtLink to="/articulos" class="site-footer__link">Artículos</NuxtLink>
        <NuxtLink to="/servicios" class="site-footer__link">Servicios</NuxtLink>
        <NuxtLink to="/testimonios" class="site-footer__link">Testimonios</NuxtLink>
        <NuxtLink :to="contactLink()" class="site-footer__link">Contacta</NuxtLink>
      </nav>

      <div v-if="socialLinks.length" class="site-footer__group">
        <p class="site-footer__title">Sígueme</p>
        <a
          v-for="social in socialLinks"
          :key="social.name"
          :href="social.url"
          class="site-footer__link site-footer__link--social"
          rel="me noopener"
        >
          <SocialIcon :name="social.icon" />
          {{ social.name }}
        </a>
      </div>
    </div>

    <div class="site-footer__bottom">
      <p class="site-footer__copyright">
        © {{ year }} {{ site.name }} · Todos los derechos reservados
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  color: $color-inverse-text;
  background-color: $color-inverse-surface;
}

.site-footer__content {
  @include container;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: $space-7;
  padding-block: $space-8 $space-6;
}

.site-footer__about {
  display: flex;
  flex: 1 1 $card-min-width;
  flex-direction: column;
  gap: $space-3;
}

.site-footer__name {
  @include f-22-400;
  font-family: var(--font-family-heading);
  color: $color-inverse-heading;
}

.site-footer__description {
  max-width: $text-measure-sm;
  color: $color-inverse-text-muted;
}

.site-footer__group {
  display: flex;
  flex: 0 1 $footer-column-width;
  flex-direction: column;
  gap: $space-1;
}

.site-footer__group--narrow {
  flex-basis: $footer-column-width-narrow;
}

.site-footer__title {
  @include eyebrow($color-inverse-accent);
  @include f-13-600;
  margin-bottom: $space-2;
}

.site-footer__link {
  padding-block: $space-2;
  color: $color-inverse-text;

  &:hover {
    color: $color-inverse-heading;
  }
}

.site-footer__link--social {
  display: flex;
  align-items: center;
  gap: $space-3;
}

.site-footer__bottom {
  border-top: $border-width solid $color-inverse-border;
}

.site-footer__copyright {
  @include container;
  @include f-14-400;
  padding-block: $space-5;
  color: $color-inverse-text-muted;
}
</style>
