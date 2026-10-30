<script setup lang="ts">
const site = useSiteConfig()
</script>

<template>
  <header class="site-header">
    <nav aria-label="Principal" class="site-header__nav">
      <NuxtLink to="/" class="site-header__brand">
        <!-- Logo placeholder until the real logo exists (see TODO.md) -->
        <span class="site-header__logo" aria-hidden="true" />
        <span class="site-header__name">{{ site.name }}</span>
      </NuxtLink>

      <ul class="site-header__links">
        <li><NuxtLink to="/talleres" class="site-header__link">Talleres</NuxtLink></li>
        <li><NuxtLink to="/articulos" class="site-header__link">Artículos</NuxtLink></li>
        <li><NuxtLink to="/servicios" class="site-header__link">Servicios</NuxtLink></li>
        <li><a href="#contacta" class="site-header__cta">Contacta</a></li>
      </ul>
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
  justify-content: space-between;
  gap: $space-4;
  padding-block: $space-4;
}

.site-header__brand {
  display: flex;
  align-items: center;
  gap: $space-3;

  &:hover {
    text-decoration: none;
  }
}

.site-header__logo {
  width: $logo-size;
  height: $logo-size;
  border: $border-width-strong dashed $color-border-strong;
  border-radius: $radius-full;
}

.site-header__name {
  @include f-20-500;
  font-family: var(--font-family-heading);
  color: $color-text;
}

.site-header__links {
  @include f-16-500;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-2 $space-6;
  padding: 0;
  list-style: none;
}

.site-header__link {
  display: inline-block;
  padding-block: $space-3;
}

.site-header__cta {
  @include button(primary);
  @include f-16-500;
  padding: $space-3 $space-5;
}
</style>
