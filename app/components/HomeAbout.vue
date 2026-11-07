<script setup lang="ts">
const { coachFullName } = useRuntimeConfig().public
</script>

<template>
  <section class="about" aria-labelledby="about-title">
    <div class="about__portrait">
      <img
        src="/images/coach.webp"
        :alt="`Retrato de ${coachFullName}`"
        width="928"
        height="1164"
        loading="lazy"
        class="about__photo"
      />
    </div>

    <div class="about__text">
      <h2 id="about-title" class="about__title">{{ coachFullName }}</h2>
      <p class="about__summary">
        Juntas exploramos de dónde viene esa exigencia, aprendemos a escuchar lo que sienten tus
        emociones y construimos un ritmo más amable contigo.
      </p>
      <BaseLink to="/servicios">Conoce mis servicios</BaseLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.about {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-7;
  padding-block: $space-8;

  @include bp(tablet-portrait) {
    flex-direction: row;
    gap: $space-8;
    align-items: center;
  }

  @include bp(tablet-landscape) {
    gap: $space-10;
    padding-block: $space-10;
  }
}

// The blush rectangle peeks out behind the photo, down and to the right
.about__portrait {
  position: relative;
  flex: none;
  width: 100%;
  padding: 0 $space-4 $space-4 0;

  @include bp(tablet-portrait) {
    width: $about-portrait-width;
  }

  @include bp(tablet-landscape) {
    width: $about-portrait-width-wide;
    padding: 0 $space-5 $space-5 0;
  }

  &::before {
    position: absolute;
    inset: $space-4 0 0 $space-4;
    content: '';
    background-color: $color-surface-blush;
    border-radius: $radius-sm;

    @include bp(tablet-landscape) {
      inset: $space-5 0 0 $space-5;
    }
  }
}

.about__photo {
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  border-radius: $radius-sm;
}

.about__text {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: $space-5;
  align-items: flex-start;
  min-width: 0;
}

.about__title {
  @include f-32-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-38-400;
  }

  @include bp(tablet-landscape) {
    @include f-42-400;
  }
}

.about__summary {
  max-width: $text-measure;
  color: $color-text-muted;
}
</style>
