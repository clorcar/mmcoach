<script setup lang="ts">
defineProps<{
  title: string
  summary: string
  /** Label of the button that opens the contact page */
  action: string
  /** Reason preselected in the contact form */
  reason?: ContactReason
}>()

const titleId = useId()
</script>

<template>
  <section class="page-cta" :aria-labelledby="titleId">
    <div class="page-cta__box">
      <div class="page-cta__text">
        <h2 :id="titleId" class="page-cta__title">{{ title }}</h2>
        <p class="page-cta__summary">{{ summary }}</p>
      </div>
      <NuxtLink :to="contactLink(reason)" class="page-cta__button">{{ action }}</NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.page-cta {
  @include container;
  padding-block: $space-7 0;
}

.page-cta__box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: $space-5;
  padding: $space-6;
  background-color: $color-primary-soft;
  border-radius: $radius-3xl;

  @include bp(tablet-portrait) {
    padding: $space-7;
  }
}

.page-cta__text {
  display: flex;
  flex: 999 1 $card-min-width-wide;
  flex-direction: column;
  gap: $space-2;
}

.page-cta__title {
  @include f-24-500;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-32-500;
  }
}

.page-cta__summary {
  color: $color-text-muted;
}

.page-cta__button {
  @include button(primary);
}
</style>
