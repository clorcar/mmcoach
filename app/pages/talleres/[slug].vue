<script setup lang="ts">
const route = useRoute()
const site = useSiteConfig()
const { coachFullName } = useRuntimeConfig().public
const { workshop } = await useWorkshopByUrl(route.params.slug as string)

// Unknown slugs render a 404 (and fail prerendering instead of shipping an empty page)
if (!workshop.value) {
  throw createError({ statusCode: 404, statusMessage: 'Taller no encontrado', fatal: true })
}

const timeRange = computed(() =>
  workshop.value ? formatTimeRange(workshop.value.date, workshop.value.durationMinutes) : '',
)
const calendarLink = computed(() =>
  workshop.value ? buildCalendarLink(workshop.value, `${site.url ?? ''}${route.path}`) : '',
)
const reminder = computed(() => {
  if (!workshop.value) return { when: '', where: '' }
  const { date, durationMinutes, location, price } = workshop.value

  return {
    when: `${formatLongDate(date)} · ${timeRange.value} h`,
    where: [
      location.name,
      durationMinutes ? formatDuration(durationMinutes) : '',
      formatPrice(price),
    ]
      .filter(Boolean)
      .join(' · '),
  }
})

usePageSeo(() => ({
  title: workshop.value?.title ?? 'Taller',
  description: workshop.value?.descriptionText,
  image: workshop.value?.image,
}))

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Inicio', item: '/' },
      { name: 'Talleres', item: '/talleres' },
      { name: workshop.value.title },
    ],
  }),
  defineEvent({
    name: workshop.value.title,
    description: workshop.value.descriptionText,
    startDate: workshop.value.date,
    endDate: addMinutes(workshop.value.date, workshop.value.durationMinutes),
    eventAttendanceMode: 'OfflineEventAttendanceMode',
    eventStatus: 'EventScheduled',
    organizer: { '@type': 'Person', name: coachFullName, url: site.url },
    image: workshop.value.image?.url,
    location: {
      '@type': 'Place',
      name: workshop.value.location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: workshop.value.location.street,
        addressLocality: workshop.value.location.city,
        postalCode: workshop.value.location.postalCode,
        addressCountry: workshop.value.location.country,
      },
      geo: workshop.value.location.coordinates && {
        '@type': 'GeoCoordinates',
        ...workshop.value.location.coordinates,
      },
    },
    offers:
      workshop.value.price === null
        ? undefined
        : { price: workshop.value.price, priceCurrency: 'EUR', url: route.path },
  }),
])
</script>

<template>
  <div v-if="workshop">
    <div class="workshop__opening">
      <BaseBackLink to="/talleres">Volver a talleres</BaseBackLink>

      <header class="workshop__intro">
        <p class="workshop__eyebrow">Taller</p>
        <h1 class="workshop__title">{{ workshop.title }}</h1>
        <p class="workshop__author">Con {{ coachFullName }}</p>
      </header>
    </div>

    <div class="workshop__layout">
      <aside class="booking" aria-labelledby="booking-title">
        <h2 id="booking-title" class="booking__title">Un espacio para ti</h2>

        <dl class="booking__facts">
          <div class="booking__fact">
            <dt>Fecha</dt>
            <dd>
              <time :datetime="workshop.date">{{ formatLongDate(workshop.date) }}</time>
            </dd>
          </div>
          <div class="booking__fact">
            <dt>Hora</dt>
            <dd>{{ timeRange }} h</dd>
          </div>
          <div v-if="workshop.durationMinutes" class="booking__fact">
            <dt>Duración</dt>
            <dd>{{ formatDuration(workshop.durationMinutes) }}</dd>
          </div>
          <div class="booking__fact">
            <dt>Lugar</dt>
            <dd>
              {{ workshop.location.name }}
              <address class="booking__address">{{ formatAddress(workshop.location) }}</address>
              <a
                :href="buildMapsLink(workshop.location)"
                class="booking__link"
                target="_blank"
                rel="noopener"
              >
                Ver en Google Maps<span class="booking__sr"> (se abre en una pestaña nueva)</span>
              </a>
            </dd>
          </div>
        </dl>

        <div class="booking__action">
          <p v-if="workshop.price !== null" class="booking__price">
            <span class="booking__price-label">Precio del taller</span>
            <span class="booking__price-value">{{ formatPrice(workshop.price) }}</span>
          </p>
          <NuxtLink :to="contactLink('talleres')" class="booking__cta">
            Reservar plaza
            <BaseArrow />
          </NuxtLink>
          <a :href="calendarLink" :download="`${workshop.slug}.ics`" class="booking__link">
            Añadir al calendario
          </a>
        </div>
      </aside>

      <div class="workshop__main">
        <RichText :content="workshop.description" />

        <section class="reminder" aria-labelledby="reminder-title">
          <h2 id="reminder-title" class="reminder__title">Haz un hueco para lo que importa.</h2>
          <p class="reminder__detail">{{ reminder.when }}</p>
          <p class="reminder__detail">{{ reminder.where }}</p>
          <NuxtLink :to="contactLink('talleres')" class="booking__cta reminder__cta">
            Reservar plaza
            <BaseArrow />
          </NuxtLink>
        </section>

        <BaseBackLink to="/talleres">Volver a talleres</BaseBackLink>
      </div>
    </div>

    <PageCta
      title="¿Tienes dudas sobre este taller?"
      summary="Escríbeme y te cuento todo lo que necesites para decidir si es para ti."
      action="Escríbeme"
      reason="talleres"
      flush
    />
  </div>
</template>

<style lang="scss" scoped>
.workshop__opening {
  @include container;
  display: flex;
  flex-direction: column;
  gap: $space-6;
  padding-block: $space-5 $space-5-5;

  @include bp(tablet-portrait) {
    gap: $space-section;
    padding-block: $space-7 $space-section;
  }
}

.workshop__intro {
  display: flex;
  flex-direction: column;
  gap: $space-4-5;
  max-width: 56.25rem;
}

.workshop__eyebrow {
  @include eyebrow;
}

.workshop__title {
  @include f-38-400;
  letter-spacing: $letter-spacing-tight;

  @include bp(tablet-portrait) {
    @include f-46-400;
  }

  @include bp(laptop) {
    @include f-56-400;
  }
}

.workshop__author {
  @include f-16-500;
  color: $color-primary;
}

.workshop__layout {
  @include container;
  display: grid;
  grid-template-areas:
    'booking'
    'main';
  gap: $space-7;
  padding-bottom: $space-8;

  @include bp(tablet-portrait) {
    gap: $space-section;
    padding-bottom: $space-10;
  }

  @include bp(tablet-landscape) {
    grid-template-areas: 'main booking';
    grid-template-columns: minmax(0, $article-body-width) minmax(0, 1fr);
    gap: $space-9;
    align-items: start;
  }
}

.workshop__main {
  display: flex;
  flex-direction: column;
  grid-area: main;
  gap: $space-section-sm;
  max-width: $article-body-width;

  @include bp(tablet-portrait) {
    gap: $space-section;
  }
}

.booking {
  display: grid;
  grid-area: booking;
  gap: $space-5;
  padding: $space-5;
  background-color: $color-surface-sage;

  @include bp(tablet-portrait) {
    grid-template-columns: 20rem minmax(0, 1fr);
    gap: $space-5 $space-7;
    align-items: end;
    padding: $space-6;
  }

  @include bp(tablet-landscape) {
    grid-template-columns: minmax(0, 1fr);
    align-items: stretch;
    max-width: 25rem;
  }
}

.booking__title {
  @include f-28-400;
  grid-column: 1 / -1;
  letter-spacing: $letter-spacing-tight;
}

.booking__facts {
  display: flex;
  flex-direction: column;

  @include bp(tablet-portrait) {
    gap: $space-3;
  }

  @include bp(tablet-landscape) {
    gap: 0;
  }
}

.booking__fact {
  display: flex;
  flex-direction: column;
  gap: $space-1;
  padding-block: $space-3;
  border-top: $border-width solid $color-primary;

  dt {
    @include f-14-400;
    color: $color-primary;
  }

  dd {
    @include f-16-500;
    margin: 0;
  }

  @include bp(tablet-portrait) {
    padding-block: 0;
    border-top: 0;
  }

  @include bp(tablet-landscape) {
    padding-block: $space-3;
    border-top: $border-width solid $color-primary;
  }
}

.booking__address {
  @include f-14-400;
  font-style: normal;
  color: $color-text-muted;
}

.booking__action {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.booking__price {
  display: flex;
  flex-direction: column;
  gap: $space-4-5;

  @include bp(tablet-landscape) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.booking__price-label {
  @include f-14-400;
  color: $color-primary;

  @include bp(tablet-landscape) {
    @include f-16-500;
  }
}

.booking__price-value {
  @include f-32-400;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.booking__cta {
  @include button(primary);
  width: 100%;
}

.booking__link {
  @include f-14-400;
  align-self: flex-start;
  color: $color-primary;
  text-decoration: underline;
}

.booking__sr {
  @include visually-hidden;
}

.reminder {
  display: flex;
  flex-direction: column;
  gap: $space-4-5;
  align-items: flex-start;
  padding-block: $space-5-5;
  border-block: $border-width solid $color-border;
}

.reminder__title {
  @include f-26-400;

  @include bp(tablet-portrait) {
    @include f-28-400;
  }
}

.reminder__detail {
  @include f-16-500;
  color: $color-primary;
}

.reminder__cta {
  width: auto;
}
</style>
