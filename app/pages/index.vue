<script setup lang="ts">
usePageSeo({
  title: 'Coach de autoexigencia y gestión emocional',
  description:
    'Coaching personal para exigirte menos y vivirte mejor: talleres, artículos y acompañamiento en autoexigencia y gestión emocional.',
})
</script>

<template>
  <div class="home">
    <img
      src="/images/hero.svg"
      alt="Una persona camina por un sendero hacia la cima de una montaña al amanecer"
      width="1440"
      height="240"
      fetchpriority="high"
      class="home__banner"
    />
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
  width: 100%;
  height: $site-banner-height;
  object-fit: cover;
  background-color: $color-primary-soft;
}
</style>
