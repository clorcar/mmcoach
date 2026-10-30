<script setup lang="ts">
usePageSeo({
  title: 'Coach de autoexigencia y gestión emocional',
  description:
    'Coaching personal para exigirte menos y vivirte mejor: talleres, artículos y acompañamiento en autoexigencia y gestión emocional.',
})
</script>

<template>
  <div class="home">
    <div class="home__banner">
      <img
        src="/images/hero.webp"
        alt="Un excursionista contempla las montañas entre la bruma al amanecer"
        width="2000"
        height="1286"
        fetchpriority="high"
        class="home__banner-image"
      />
    </div>
    <HomeIntro />
    <TalleresSection />
    <ArticlesSection />
    <TestimoniosSection />
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-bottom: $space-10;
}

.home__banner {
  position: relative;
  height: $site-banner-height;
  background-color: $color-primary-soft;

  // Sand, terracotta and brown wash that softens the photo to match the page palette
  &::after {
    position: absolute;
    inset: 0;
    content: '';
    background: linear-gradient(
      to bottom,
      color-mix(in srgb, $sand10 70%, transparent),
      color-mix(in srgb, $terracotta10 45%, transparent),
      color-mix(in srgb, $brown30 25%, transparent)
    );
  }
}

.home__banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right bottom;
}
</style>
