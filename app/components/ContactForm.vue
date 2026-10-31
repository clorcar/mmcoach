<script setup lang="ts">
type Status = 'idle' | 'sending' | 'sent' | 'error'

const route = useRoute()
const site = useSiteConfig()
const { web3formsUrl, web3formsAccessKey } = useRuntimeConfig().public

const reason = ref<ContactReason | ''>('')
const status = ref<Status>('idle')

// The static page is built without a query, so the reason from the link is applied in the browser
function applyReason() {
  reason.value = parseContactReason(route.query.motivo)
}

onMounted(applyReason)
watch(() => route.query.motivo, applyReason)

async function submit(event: SubmitEvent) {
  const data = new FormData(event.target as HTMLFormElement)
  const field = (name: string) => String(data.get(name) ?? '')
  const reasonLabel = CONTACT_REASONS.find((option) => option.value === reason.value)?.label

  status.value = 'sending'
  try {
    const response = await $fetch<{ success: boolean }>(web3formsUrl, {
      method: 'POST',
      body: {
        access_key: web3formsAccessKey,
        subject: `Nuevo mensaje desde la web: ${reasonLabel}`,
        from_name: site.name,
        name: `${field('nombre')} ${field('apellidos')}`,
        email: field('email'),
        motivo: reasonLabel,
        message: field('comentario'),
        botcheck: data.has('botcheck'),
      },
    })
    status.value = response.success ? 'sent' : 'error'
  } catch {
    status.value = 'error'
  }
}

function reset() {
  status.value = 'idle'
  applyReason()
}
</script>

<template>
  <div v-if="status === 'sent'" class="contact-form__sent" role="status">
    <span class="contact-form__sent-icon">
      <svg
        aria-hidden="true"
        width="34"
        height="34"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
    <h2 class="contact-form__sent-title">¡Gracias por escribirme!</h2>
    <p class="contact-form__sent-text">He recibido tu mensaje y te responderé lo antes posible.</p>
    <button type="button" class="contact-form__again" @click="reset">Enviar otro mensaje</button>
  </div>

  <!-- Without JavaScript the browser posts the form straight to Web3Forms -->
  <form v-else class="contact-form" :action="web3formsUrl" method="POST" @submit.prevent="submit">
    <input type="hidden" name="access_key" :value="web3formsAccessKey" />
    <!-- Honeypot: people never tick it, spam bots do -->
    <input type="checkbox" name="botcheck" class="contact-form__trap" tabindex="-1" />

    <div class="contact-form__names">
      <div class="contact-form__field">
        <label for="nombre" class="contact-form__label">Nombre</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          autocomplete="given-name"
          required
          placeholder="Tu nombre"
          class="contact-form__control"
        />
      </div>
      <div class="contact-form__field">
        <label for="apellidos" class="contact-form__label">Apellidos</label>
        <input
          id="apellidos"
          name="apellidos"
          type="text"
          autocomplete="family-name"
          required
          placeholder="Tus apellidos"
          class="contact-form__control"
        />
      </div>
    </div>

    <div class="contact-form__field">
      <label for="email" class="contact-form__label">Correo electrónico</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        placeholder="tu@correo.com"
        class="contact-form__control"
      />
    </div>

    <div class="contact-form__field">
      <label for="motivo" class="contact-form__label">Motivo</label>
      <div class="contact-form__select">
        <select
          id="motivo"
          v-model="reason"
          name="motivo"
          required
          class="contact-form__control contact-form__control--select"
        >
          <option value="" disabled>Elige una opción</option>
          <option v-for="option in CONTACT_REASONS" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
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
          class="contact-form__chevron"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>

    <div class="contact-form__field">
      <label for="comentario" class="contact-form__label">Comentario</label>
      <textarea
        id="comentario"
        name="comentario"
        rows="6"
        required
        placeholder="Cuéntame en qué puedo ayudarte"
        class="contact-form__control contact-form__control--textarea"
      />
    </div>

    <div class="contact-form__consent">
      <input id="privacidad" name="privacidad" type="checkbox" required />
      <label for="privacidad">
        He leído y acepto la
        <NuxtLink to="/politica-de-privacidad" target="_blank">política de privacidad</NuxtLink>
      </label>
    </div>

    <p v-if="status === 'error'" class="contact-form__error" role="alert">
      No se ha podido enviar tu mensaje. Inténtalo de nuevo en unos minutos.
    </p>

    <button type="submit" class="contact-form__submit" :disabled="status === 'sending'">
      {{ status === 'sending' ? 'Enviando…' : 'Enviar mensaje' }}
    </button>
  </form>
</template>

<style lang="scss" scoped>
.contact-form {
  display: flex;
  flex-direction: column;
  gap: $space-5;
}

.contact-form__trap {
  display: none;
}

.contact-form__names {
  @include auto-grid($form-field-min-width);
}

.contact-form__field {
  display: flex;
  flex-direction: column;
  gap: $space-2;
}

.contact-form__label {
  @include f-17-600;
  color: $color-heading;
}

.contact-form__control {
  width: 100%;
  height: $input-height;
  padding-inline: $space-4;
  color: $color-heading;
  background-color: $white;
  border: $border-width-strong solid $color-border-strong;
  border-radius: $radius-lg;

  &::placeholder {
    color: $color-text-subtle;
  }
}

.contact-form__control--select {
  appearance: none;
  padding-right: $space-8;
  cursor: pointer;
}

.contact-form__control--textarea {
  height: auto;
  padding-block: $space-3;
  resize: vertical;
}

.contact-form__select {
  position: relative;
}

.contact-form__chevron {
  position: absolute;
  top: 50%;
  right: $space-4;
  color: $color-primary;
  pointer-events: none;
  transform: translateY(-50%);
}

.contact-form__consent {
  display: flex;
  gap: $space-3;
  align-items: flex-start;
  color: $color-text-muted;

  input {
    flex-shrink: 0;
    width: $space-5;
    height: $space-5;
    accent-color: $color-primary;
    cursor: pointer;
  }

  a {
    text-decoration: underline;
  }
}

.contact-form__error {
  padding: $space-3 $space-4;
  color: $color-danger;
  background-color: $color-danger-soft;
  border-radius: $radius-lg;
}

.contact-form__submit {
  @include button(primary);
  align-self: flex-start;
  min-height: $input-height;
  padding-inline: $space-6;
  cursor: pointer;
  border: 0;

  &:disabled {
    cursor: progress;
    opacity: 0.7;
  }
}

.contact-form__sent {
  display: flex;
  flex-direction: column;
  gap: $space-4;
  align-items: center;
  padding-block: $space-9;
  text-align: center;
}

.contact-form__sent-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: $avatar-size-md;
  height: $avatar-size-md;
  color: $color-primary;
  background-color: $color-primary-soft;
  border-radius: $radius-full;
}

.contact-form__sent-title {
  @include f-24-500;
  color: $color-heading;

  @include bp(tablet-portrait) {
    @include f-32-500;
  }
}

.contact-form__sent-text {
  max-width: $text-measure-sm;
  color: $color-text-muted;
}

.contact-form__again {
  @include button(outline);
  cursor: pointer;
  background: none;
}
</style>
