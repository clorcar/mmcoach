<script setup lang="ts">
const site = useSiteConfig()
const route = useRoute()

const menuOpen = ref(false)

// Navigating (or pressing Escape) closes the mobile menu
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)
</script>

<template>
  <header class="site-header" @keydown.esc="menuOpen = false">
    <nav aria-label="Principal" class="site-header__nav">
      <NuxtLink to="/" class="site-header__brand">
        <img src="/images/logo.webp" alt="" width="42" height="56" class="site-header__logo" />
        <span class="site-header__name">{{ site.name }}</span>
      </NuxtLink>

      <ul
        id="site-menu"
        class="site-header__links"
        :class="{ 'site-header__links--open': menuOpen }"
      >
        <li><NuxtLink to="/talleres" class="site-header__link">Talleres</NuxtLink></li>
        <li><NuxtLink to="/articulos" class="site-header__link">Artículos</NuxtLink></li>
        <li><NuxtLink to="/servicios" class="site-header__link">Servicios</NuxtLink></li>
      </ul>

      <NuxtLink :to="contactLink()" class="site-header__cta">Contacta</NuxtLink>

      <button
        type="button"
        class="site-header__toggle"
        aria-controls="site-menu"
        :aria-expanded="menuOpen"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="menuOpen = !menuOpen"
      >
        <svg
          aria-hidden="true"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
        >
          <path v-if="menuOpen" d="M6 6l12 12M18 6L6 18" />
          <path v-else d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.site-header {
  background-color: $color-background;
  border-bottom: $border-width solid $color-border;
}

.site-header__nav {
  @include container;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-3;
  padding-block: $space-3;

  @include bp(tablet-portrait) {
    gap: $space-4;
    padding-block: $space-4;
  }
}

.site-header__brand {
  display: flex;
  align-items: center;
  gap: $space-3;
  margin-right: auto;

  &:hover {
    text-decoration: none;
  }
}

.site-header__logo {
  width: auto;
  height: $logo-size;
}

.site-header__name {
  @include f-20-500;
  font-family: var(--font-family-heading);
  color: $color-text;
}

// Phones: a full-width list below the bar, hidden until the menu button opens it
.site-header__links {
  @include f-16-500;
  display: none;
  flex-basis: 100%;
  flex-direction: column;
  order: 1;
  padding: 0;
  list-style: none;

  &--open {
    display: flex;
  }

  @include bp(tablet-portrait) {
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    gap: $space-6;
    order: 0;
  }
}

.site-header__link {
  display: block;
  padding-block: $space-3;

  @include bp(tablet-portrait) {
    display: inline-block;
  }
}

// Phones: flat, inverted colors so it stands out less; filled from tablet up
.site-header__cta {
  @include button(primary);
  @include f-16-500;
  padding: $space-button-compact $space-5;
  color: $color-primary;
  background-color: transparent;
  border: $border-width solid $color-primary;

  &:hover {
    color: $color-primary;
    background-color: $color-primary-soft;
  }

  @include bp(tablet-portrait) {
    padding-block: $space-3;
    color: $color-on-primary;
    background-color: $color-primary;
    border-color: transparent;

    &:hover {
      color: $color-on-primary;
      background-color: $color-primary-hover;
    }

    &[aria-current='page'] {
      background-color: $color-heading;
    }
  }
}

.site-header__toggle {
  display: inline-flex;
  padding: $space-3;
  color: $color-heading;
  background: none;
  border: 0;
  border-radius: $radius-md;
  cursor: pointer;

  @include bp(tablet-portrait) {
    display: none;
  }
}
</style>
