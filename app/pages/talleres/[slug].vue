<script setup lang="ts">
const OTHER_WORKSHOPS = 3

const route = useRoute()
const site = useSiteConfig()
const { workshop } = await useWorkshopByUrl(route.params.slug as string)

// Unknown slugs render a 404 (and fail prerendering instead of shipping an empty page)
if (!workshop.value) {
  throw createError({ statusCode: 404, statusMessage: 'Taller no encontrado', fatal: true })
}

// Upcoming at build time; a fixed key per workshop keeps the prerendered payload valid
const today = new Date().toISOString().slice(0, 10)
const { workshops: otherWorkshops } = await useWorkshops(
  {
    limit: OTHER_WORKSHOPS,
    order: 'fecha_ASC',
    where: { fecha_gte: today, url_not: route.params.slug },
  },
  `other-workshops-${route.params.slug}`,
)

const startTime = computed(() =>
  workshop.value ? formatDate(workshop.value.date, { hour: '2-digit', minute: '2-digit' }) : '',
)
const calendarLink = computed(() =>
  workshop.value ? buildCalendarLink(workshop.value, `${site.url ?? ''}${route.path}`) : '',
)

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
    image: workshop.value.image?.url,
    location: { '@type': 'Place', name: workshop.value.location },
    offers:
      workshop.value.price === null
        ? undefined
        : { price: workshop.value.price, priceCurrency: 'EUR', url: route.path },
  }),
])
</script>

<template>
  <div v-if="workshop" class="workshop">
    <header class="workshop__header">
      <nav aria-label="Ruta de navegación">
        <ol class="workshop__breadcrumb">
          <li><NuxtLink to="/">Inicio</NuxtLink></li>
          <li><NuxtLink to="/talleres">Talleres</NuxtLink></li>
          <li aria-current="page">{{ workshop.title }}</li>
        </ol>
      </nav>
    </header>

    <div class="workshop__content">
      <div class="workshop__main">
        <header class="workshop__intro">
          <p class="workshop__eyebrow">Taller</p>
          <h1 class="workshop__title">{{ workshop.title }}</h1>

          <p class="workshop__chips">
            <span class="workshop__chip workshop__chip--date">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              <time :datetime="workshop.date">
                {{ formatLongDate(workshop.date) }} · {{ startTime }} h
              </time>
            </span>
            <span class="workshop__chip workshop__chip--location">
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              {{ workshop.location }}
            </span>
          </p>
        </header>

        <RichText :content="workshop.description" />
      </div>

      <aside class="workshop__booking" aria-label="Reserva">
        <div class="workshop__image">
          <ContentImage
            placeholder="workshop"
            :image="workshop.image"
            sizes="100vw tablet-portrait:50vw laptop:380px"
          />
        </div>

        <div class="workshop__booking-body">
          <p v-if="workshop.price !== null" class="workshop__price">
            {{ formatPrice(workshop.price) }}
          </p>

          <dl class="workshop__facts">
            <div class="workshop__fact">
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              <div>
                <dt>Fecha</dt>
                <dd>{{ formatLongDate(workshop.date) }}</dd>
              </div>
            </div>
            <div class="workshop__fact">
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              <div>
                <dt>Hora de inicio</dt>
                <dd>{{ startTime }} h</dd>
              </div>
            </div>
            <div class="workshop__fact">
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <div>
                <dt>Lugar</dt>
                <dd>{{ workshop.location }}</dd>
              </div>
            </div>
          </dl>

          <NuxtLink :to="contactLink('talleres')" class="workshop__cta">Reservar plaza</NuxtLink>
          <a :href="calendarLink" :download="`${workshop.slug}.ics`" class="workshop__calendar">
            <svg
              aria-hidden="true"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M12 13v5M9.5 15.5h5" />
            </svg>
            Añadir al calendario
          </a>
          <p class="workshop__help">
            ¿Tienes dudas? <NuxtLink :to="contactLink('talleres')">Escríbeme</NuxtLink> y te
            respondo.
          </p>
        </div>
      </aside>
    </div>

    <section v-if="otherWorkshops.length" class="workshop__others" aria-labelledby="others-title">
      <SectionHeader
        title-id="others-title"
        title="Otros talleres"
        :link="{ to: '/talleres', label: 'Ver todos' }"
      />
      <div class="workshop__others-grid">
        <WorkshopCard v-for="other in otherWorkshops" :key="other.id" :workshop="other" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.workshop {
  padding-bottom: $space-10;
}

.workshop__header {
  @include container;
  padding-top: $space-6;
}

.workshop__breadcrumb {
  @include f-14-400;
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
  padding: 0;
  color: $color-text-subtle;
  list-style: none;

  li + li::before {
    margin-right: $space-2;
    content: '/';
  }
}

.workshop__intro {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.workshop__eyebrow {
  @include eyebrow;
}

.workshop__title {
  @include f-32-500;
  max-width: $text-measure;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-40-500;
  }
}

.workshop__chips {
  display: flex;
  flex-wrap: wrap;
  gap: $space-2;
}

.workshop__chip--date {
  @include chip(soft);
}

.workshop__chip--location {
  @include chip(outline);
}

.workshop__image {
  height: $card-image-height;
  background-color: $color-primary-soft;
}

.workshop__content {
  @include container;
  display: flex;
  flex-wrap: wrap;
  gap: $space-8;
  align-items: flex-start;
  padding-block: $space-6 $space-5;
}

.workshop__main {
  display: flex;
  flex: 999 1 $workshop-main-basis;
  flex-direction: column;
  gap: $space-6;
  min-width: 0;
  max-width: $content-measure;
}

.workshop__booking {
  @include card;
  display: flex;
  flex: 1 1 $workshop-aside-basis;
  flex-direction: column;
  min-width: 0;
}

.workshop__booking-body {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  padding: $space-5;
}

.workshop__price {
  @include f-32-500;
  font-family: var(--font-family-heading);
  color: $color-heading;
}

.workshop__facts {
  display: flex;
  flex-direction: column;
  gap: $space-4;
}

.workshop__fact {
  @include f-16-400;
  display: flex;
  gap: $space-3;

  svg {
    flex: none;
    margin-top: $space-1;
    color: $color-primary;
  }

  dt {
    font-weight: 600;
    color: $color-heading;
  }

  dd {
    margin: 0;
    color: $color-text-muted;
  }
}

.workshop__cta {
  @include button(primary);
}

.workshop__calendar {
  @include button(outline);
  gap: $space-2;
}

.workshop__help {
  @include f-14-400;
  color: $color-text-subtle;

  a {
    text-decoration: underline;
  }
}

.workshop__others {
  @include container;
  padding-block: $space-7 0;
}

.workshop__others-grid {
  @include auto-grid;
}
</style>
