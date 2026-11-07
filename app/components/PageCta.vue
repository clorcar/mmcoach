<script setup lang="ts">
defineProps<{
  /** Small uppercase label above the title */
  eyebrow?: string
  title: string
  summary: string
  /** Short line under the button */
  note?: string
  /** Label of the button that opens the contact page */
  action: string
  /** Reason preselected in the contact form */
  reason?: ContactReason
  /** Sits directly under a full-width section, without the usual top margin */
  flush?: boolean
}>()

const titleId = useId()
</script>

<template>
  <section class="page-cta" :class="{ 'page-cta--flush': flush }" :aria-labelledby="titleId">
    <div class="page-cta__box">
      <div class="page-cta__text">
        <p v-if="eyebrow" class="page-cta__eyebrow">{{ eyebrow }}</p>
        <h2 :id="titleId" class="page-cta__title">{{ title }}</h2>
        <p class="page-cta__summary">{{ summary }}</p>
      </div>
      <div class="page-cta__actions">
        <NuxtLink :to="contactLink(reason)" class="page-cta__button">
          {{ action }}
          <BaseArrow direction="up-right" />
        </NuxtLink>
        <p v-if="note" class="page-cta__note">{{ note }}</p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.page-cta {
  margin-top: $space-8;
  background-color: $color-surface-blush;
}

.page-cta--flush {
  margin-top: 0;
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

.page-cta__eyebrow {
  @include eyebrow;
}

.page-cta__actions {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  align-items: flex-start;
  max-width: $text-measure-sm;
}

.page-cta__button {
  @include button(primary);
}

.page-cta__note {
  @include f-14-400;
}
</style>
