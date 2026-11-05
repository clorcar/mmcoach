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
      <NuxtLink :to="contactLink(reason)" class="page-cta__button">
        {{ action }}
        <BaseArrow direction="up-right" />
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.page-cta {
  margin-top: $space-8;
  background-color: $color-surface-blush;
}

.page-cta__box {
  @include container;
  display: flex;
  flex-wrap: wrap;
  gap: $space-6;
  align-items: center;
  justify-content: space-between;
  padding-block: $space-8;

  @include bp(tablet-landscape) {
    gap: $space-9;
    padding-block: $space-9;
  }
}

.page-cta__text {
  display: flex;
  flex: 999 1 $card-min-width-wide;
  flex-direction: column;
  gap: $space-4;
  max-width: $text-measure;
}

.page-cta__title {
  @include f-32-400;
  letter-spacing: $letter-spacing-tight;
  color: $color-heading;

  @include bp(tablet-landscape) {
    @include f-42-400;
  }
}

.page-cta__summary {
  color: $color-text-muted;
}

.page-cta__button {
  @include button(primary);
}
</style>
