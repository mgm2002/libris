<template>
  <Transition name="about-fade">
    <div
      v-if="open"
      class="backdrop z-30 flex justify-center items-center"
      @click="$emit('close')"
    >
      <div class="about-panel bg-white flex flex-col items-center" @click.stop>
        <!-- Logo -->
        <img
          src="../assets/brand/logo-dark.svg"
          alt="Libris"
          class="h-16 mb-5 select-none"
        />

        <!-- App name -->
        <h2 class="text-3xl font-semibold text-libris-neutral-900">
          Libris
        </h2>

        <!-- Version -->
        <p class="text-lg text-libris-neutral-500 mt-1 select-none">
          v{{ appVersion }}
        </p>

        <!-- Tagline -->
        <p class="text-base text-libris-neutral-700 text-center mt-3">
          Facturación electrónica y administración para México
        </p>

        <!-- Separator -->
        <div class="w-full border-t border-libris-neutral-200 my-6" />

        <!-- Credit -->
        <p class="text-base font-medium text-libris-neutral-700 text-center leading-relaxed">
          Construido sobre
          <a
            href="#"
            class="text-libris-magenta hover:underline"
            @click.prevent="openFrappeBooks"
          >Frappe Books</a>
          — proyecto open source bajo licencia AGPL-3.0.
        </p>

        <!-- Close button -->
        <div class="w-full flex justify-end mt-8">
          <button class="about-close-btn" @click="$emit('close')">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script lang="ts">
import { fyo } from 'src/initFyo';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutDialog',
  props: {
    open: { type: Boolean, default: false },
  },
  emits: ['close'],
  computed: {
    appVersion() {
      return fyo.store.appVersion ?? '—';
    },
  },
  methods: {
    openFrappeBooks() {
      ipc.openLink('https://github.com/frappe/books');
    },
  },
});
</script>

<style scoped>
.about-panel {
  width: 480px;
  padding: 2rem; /* 32px */
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.about-close-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid var(--libris-neutral-200);
  font-size: 13px;
  font-weight: 500;
  color: var(--libris-neutral-700);
  background: transparent;
  transition: background-color 150ms ease, border-color 150ms ease;
}
.about-close-btn:hover {
  background-color: var(--libris-neutral-50);
  border-color: var(--libris-neutral-500);
}

/* Backdrop fade */
.about-fade-enter-active,
.about-fade-leave-active {
  transition: opacity 200ms ease;
}
.about-fade-enter-from,
.about-fade-leave-to {
  opacity: 0;
}
</style>
