<script setup lang="ts">
const site = useSiteConfig()
const route = useRoute()

const menuOpen = ref(false)
const toggle = useTemplateRef<HTMLButtonElement>('toggle')
const closeButton = useTemplateRef<HTMLButtonElement>('closeButton')

// Navigating (or pressing Escape) closes the mobile menu
watch(
  () => route.fullPath,
  () => (menuOpen.value = false),
)

// Keyboard focus follows the panel: into it when it opens, back to the burger when it closes
watch(menuOpen, async (open) => {
  await nextTick()
  if (open) closeButton.value?.focus()
  else if (document.activeElement === document.body) toggle.value?.focus()
})
</script>

<template>
  <header class="site-header" @keydown.esc="menuOpen = false">
    <nav aria-label="Principal" class="site-header__nav">
      <NuxtLink to="/" class="site-header__brand">
        <img src="/images/logo.webp" alt="" width="42" height="56" class="site-header__logo" />
        <span class="site-header__name">{{ site.name }}</span>
      </NuxtLink>

      <div
        id="site-menu"
        class="site-header__panel"
        :class="{ 'site-header__panel--open': menuOpen }"
      >
        <div class="site-header__panel-bar">
          <NuxtLink to="/" class="site-header__brand">
            <img src="/images/logo.webp" alt="" width="42" height="56" class="site-header__logo" />
            <span class="site-header__name">{{ site.name }}</span>
          </NuxtLink>

          <button
            ref="closeButton"
            type="button"
            class="site-header__toggle"
            aria-label="Cerrar menú"
            @click="menuOpen = false"
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
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul class="site-header__links">
          <li><NuxtLink to="/talleres" class="site-header__link">Talleres</NuxtLink></li>
          <li><NuxtLink to="/articulos" class="site-header__link">Artículos</NuxtLink></li>
          <li><NuxtLink to="/servicios" class="site-header__link">Servicios</NuxtLink></li>
        </ul>

        <NuxtLink :to="contactLink()" class="site-header__panel-cta">Contacto</NuxtLink>
      </div>

      <NuxtLink :to="contactLink()" class="site-header__cta">Contacta</NuxtLink>

      <button
        ref="toggle"
        type="button"
        class="site-header__toggle"
        aria-controls="site-menu"
        :aria-expanded="menuOpen"
        aria-label="Abrir menú"
        @click="menuOpen = true"
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
          <path d="M4 7h16M4 12h16M4 17h16" />
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
  gap: $space-2;
  padding-block: $space-3;

  @include bp(tablet-portrait) {
    gap: $space-4;
    padding-block: $space-4;
  }
}

.site-header__brand {
  display: flex;
  align-items: center;
  gap: $space-2;
  margin-right: auto;

  @include bp(tablet-portrait) {
    gap: $space-3;
  }

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

// Phones: a full-screen panel (brand + close button, then the links), hidden until the burger opens it
.site-header__panel {
  position: fixed;
  inset: 0;
  z-index: $z-modal;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overscroll-behavior: contain;
  visibility: hidden;
  background-color: $color-background;
  transform: translateX(100%);

  @include motion-safe {
    // Visibility switches at the end of the slide-out so the panel is not focusable while hidden
    transition:
      transform $duration-slow ease,
      visibility 0s linear $duration-slow;
  }

  &--open {
    visibility: visible;
    transform: none;

    @include motion-safe {
      transition:
        transform $duration-slow ease,
        visibility 0s;
    }
  }

  @include bp(tablet-portrait) {
    display: contents;
    visibility: visible;
  }
}

.site-header__panel-cta {
  @include button(primary);
  @include f-16-500;
  margin: $space-3 $space-4 $space-4;

  @include bp(tablet-portrait) {
    display: none;
  }
}

.site-header__panel-bar {
  display: flex;
  align-items: center;
  padding: $space-3 $space-4;
  border-bottom: $border-width solid $color-border;

  @include bp(tablet-portrait) {
    display: none;
  }
}

.site-header__links {
  @include f-20-500;
  display: flex;
  flex-direction: column;
  padding: $space-4;
  margin: 0;
  list-style: none;

  @include bp(tablet-portrait) {
    @include f-16-500;
    flex-direction: row;
    gap: $space-6;
    padding: 0;
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
