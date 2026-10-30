<script setup lang="ts">
const { coachFirstName } = useRuntimeConfig().public
const site = useSiteConfig()
</script>

<template>
  <section class="intro" aria-labelledby="intro-title">
    <div class="intro__card">
      <img
        src="/images/coach.webp"
        :alt="`Retrato de ${site.name}`"
        width="540"
        height="540"
        class="intro__photo"
      />

      <div class="intro__text">
        <p class="intro__eyebrow">Coach personal · Autoexigencia y gestión emocional</p>
        <h1 id="intro-title" class="intro__title">
          Hola, soy {{ coachFirstName }}. Te acompaño a exigirte menos y vivirte mejor.
        </h1>
        <p class="intro__summary">
          Trabajo con personas que sienten que nada es suficiente: que se cuidan poco, descansan con
          culpa y cargan con una voz crítica que no se apaga. Juntas exploramos de dónde viene esa
          exigencia, aprendemos a escuchar lo que sienten tus emociones y construimos un ritmo más
          amable contigo.
        </p>
        <div class="intro__actions">
          <NuxtLink to="/servicios" class="intro__button intro__button--primary"
            >Conoce mis servicios</NuxtLink
          >
          <NuxtLink :to="contactLink()" class="intro__button intro__button--outline"
            >Escríbeme</NuxtLink
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.intro {
  @include container;
  padding-block: $space-6 $space-5;

  @include bp(tablet-portrait) {
    padding-top: $space-9;
  }
}

.intro__card {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: $space-7;
  padding: $space-5;
  background-color: $color-surface;
  border: $border-width solid $color-border;
  border-radius: $radius-3xl;

  @include bp(tablet-portrait) {
    padding: $space-7;
  }
}

.intro__photo {
  flex: 0 0 auto;
  width: $avatar-size-lg;
  height: $avatar-size-lg;
  object-fit: cover;
  background-color: $color-surface-alt;
  border-radius: $radius-full;
}

.intro__text {
  display: flex;
  flex: 999 1 $card-min-width;
  flex-direction: column;
  gap: $space-3;
  min-width: 0;
}

.intro__eyebrow {
  @include eyebrow;
}

.intro__title {
  @include f-32-500;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.intro__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}

.intro__actions {
  display: flex;
  flex-wrap: wrap;
  gap: $space-3;
  margin-top: $space-2;
}

.intro__button--primary {
  @include button(primary);
}

.intro__button--outline {
  @include button(outline);
}
</style>
