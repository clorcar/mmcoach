<template>
  <div class="layout">
    <a href="#main-content" class="layout__skip-link">Saltar al contenido principal</a>
    <main id="main-content" tabindex="-1" class="layout__main">
      <slot />
    </main>
  </div>
</template>

<style lang="scss" scoped>
.layout__skip-link {
  @include visually-hidden;

  &:focus-visible {
    position: fixed;
    top: $space-4;
    left: $space-4;
    z-index: $z-skip-link;
    width: auto;
    height: auto;
    margin: 0;
    padding: $space-2 $space-4;
    clip: auto;
    color: $color-on-primary;
    background-color: $color-primary;
    border-radius: $radius-md;
  }
}

.layout__main:focus {
  outline: none;
}
</style>
