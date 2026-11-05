<script setup lang="ts">
const { coachFirstName } = useRuntimeConfig().public
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <img
      src="/images/hero.webp"
      alt=""
      width="1584"
      height="672"
      fetchpriority="high"
      class="hero__image"
    />

    <div class="hero__content">
      <p class="hero__eyebrow">Coach personal · Autoexigencia y gestión emocional</p>
      <h1 id="hero-title" class="hero__title">
        Hola, soy {{ coachFirstName }}. Te acompaño a exigirte menos y vivirte mejor.
      </h1>
      <p class="hero__summary">
        Trabajo con personas que sienten que nada es suficiente: que se cuidan poco, descansan con
        culpa y cargan con una voz crítica que no se apaga.
      </p>
      <NuxtLink :to="contactLink()" class="hero__button">
        Escríbeme
        <BaseArrow direction="up-right" />
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.hero {
  position: relative;
  display: flex;
  align-items: flex-start;
  min-height: $hero-min-height;
  overflow: hidden;

  // Cream veil that keeps the text readable over the photo: from the top on phones, from the left on wider screens
  &::after {
    position: absolute;
    inset: 0;
    content: '';
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, $color-background 98%, transparent) 0%,
      color-mix(in srgb, $color-background 91%, transparent) 56%,
      color-mix(in srgb, $color-background 27%, transparent) 82%,
      color-mix(in srgb, $color-background 52%, transparent) 100%
    );

    @include bp(tablet-portrait) {
      background: linear-gradient(
        to right,
        color-mix(in srgb, $color-background 95%, transparent) 0%,
        color-mix(in srgb, $color-background 78%, transparent) 43%,
        color-mix(in srgb, $color-background 12%, transparent) 73%,
        transparent 100%
      );
    }
  }
}

.hero__image {
  position: absolute;
  right: 0;
  bottom: 0;
  width: auto;
  max-width: none;
  height: 45%;
  object-fit: cover;

  @include bp(tablet-portrait) {
    width: 100%;
    height: 100%;
    object-position: right center;
  }
}

.hero__content {
  @include container;
  position: relative;
  z-index: $z-raised;
  display: flex;
  flex-direction: column;
  gap: $space-5;
  align-items: flex-start;
  width: 100%;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    padding-block: $space-10;
  }
}

.hero__eyebrow {
  @include eyebrow;
}

.hero__title {
  @include f-44-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-56-400;
    max-width: $hero-title-measure-narrow;
  }

  @include bp(laptop) {
    @include f-64-400;
    max-width: $hero-title-measure;
  }
}

.hero__summary {
  max-width: $hero-summary-measure;
  color: $color-text-muted;
}

.hero__button {
  @include button(primary);
}
</style>
