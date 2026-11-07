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

      <nav aria-label="Explora" class="site-footer__links">
        <NuxtLink to="/servicios" class="site-footer__link">Servicios</NuxtLink>
        <NuxtLink to="/talleres" class="site-footer__link">Talleres</NuxtLink>
        <NuxtLink to="/articulos" class="site-footer__link">Artículos</NuxtLink>
        <NuxtLink to="/testimonios" class="site-footer__link">Testimonios</NuxtLink>
        <NuxtLink :to="contactLink()" class="site-footer__link">Contacta</NuxtLink>
      </nav>
    </div>

    <div class="site-footer__bottom">
      <p class="site-footer__copyright">
        © {{ year }} {{ site.name }} · Todos los derechos reservados
      </p>

      <div class="site-footer__extra">
        <nav aria-label="Información legal" class="site-footer__group">
          <NuxtLink to="/aviso-legal" class="site-footer__small-link">Aviso legal</NuxtLink>
          <NuxtLink to="/politica-de-privacidad" class="site-footer__small-link">
            Política de privacidad
          </NuxtLink>
        </nav>

        <ul v-if="socialLinks.length" aria-label="Sígueme" class="site-footer__group">
          <li v-for="social in socialLinks" :key="social.name">
            <a :href="social.url" class="site-footer__small-link" rel="me noopener">
              {{ social.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-5-5;
  // The layout is a flex column and the auto side margins would shrink the footer to its content
  width: 100%;
  padding-block: $space-7 $space-5;

  @include bp(tablet-landscape) {
    gap: $space-section-sm;
    padding-block: $space-section $space-5;
  }
}

.site-footer__content {
  display: flex;
  flex-direction: column;
  gap: $space-5;

  @include bp(tablet-landscape) {
    flex-direction: row;
    gap: $space-7;
    align-items: center;
    justify-content: space-between;
  }
}

.site-footer__about {
  display: flex;
  flex-direction: column;
  gap: $space-2;
  max-width: $footer-about-width;

  @include bp(tablet-landscape) {
    max-width: none;
  }
}

.site-footer__name {
  @include f-22-400;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.site-footer__description {
  @include f-14-400;
  color: $color-text-muted;
}

.site-footer__links {
  display: flex;
  flex-wrap: wrap;
  gap: $space-1 $space-5;

  @include bp(tablet-portrait) {
    column-gap: $space-6;
  }
}

.site-footer__link {
  @include f-16-500;
  display: inline-block;
  padding-block: $space-1;
  color: $color-text;

  &:hover {
    color: $color-primary;
  }
}

.site-footer__bottom {
  @include f-14-400;
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding-top: $space-5;
  color: $color-text-muted;
  border-top: $border-width solid $color-border;

  @include bp(tablet-landscape) {
    flex-direction: row;
    gap: $space-5;
    align-items: flex-start;
    justify-content: space-between;
  }
}

.site-footer__extra {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3 $space-5;
}

.site-footer__group {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3 $space-5;
  padding: 0;
  margin: 0;
  list-style: none;
}

.site-footer__small-link {
  color: $color-text-muted;

  &:hover {
    color: $color-primary;
  }
}
</style>
