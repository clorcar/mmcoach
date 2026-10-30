<script setup lang="ts">
const site = useSiteConfig()
const { instagramUrl, facebookUrl } = useRuntimeConfig().public

// A profile without a URL in the environment is not shown
const socialLinks = [
  { name: 'Instagram', url: instagramUrl, icon: 'instagram' },
  { name: 'Facebook', url: facebookUrl, icon: 'facebook' },
].filter((social) => social.url)

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contacta" class="site-footer">
    <div class="site-footer__content">
      <div class="site-footer__about">
        <p class="site-footer__name">{{ site.name }}</p>
        <p class="site-footer__description">{{ site.description }}</p>
      </div>

      <nav aria-labelledby="footer-explore" class="site-footer__group site-footer__group--narrow">
        <p id="footer-explore" class="site-footer__title">Explora</p>
        <NuxtLink to="/talleres" class="site-footer__link">Talleres</NuxtLink>
        <NuxtLink to="/articulos" class="site-footer__link">Artículos</NuxtLink>
        <NuxtLink to="/#servicios" class="site-footer__link">Servicios</NuxtLink>
        <a href="#contacta" class="site-footer__link">Contacta</a>
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
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <template v-if="social.icon === 'instagram'">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </template>
            <path
              v-else
              d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V10H6.5v3.5H9V21h3.5v-7.5H15l.5-3.5h-3V7a1 1 0 0 1 1-1H15z"
            />
          </svg>
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
