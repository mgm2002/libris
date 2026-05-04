<template>
  <div
    class="
      fixed inset-0
      flex flex-col items-center justify-center
      bg-libris-gradient
      window-drag
    "
  >
    <!-- Center content — entry animation applied here -->
    <div class="splash-content flex flex-col items-center gap-5 window-no-drag">
      <img
        src="../../assets/brand/logo-light.svg"
        alt="Libris"
        style="height: 120px"
      />
      <h1
        class="text-white font-semibold"
        style="font-size: 48px; line-height: 1.1"
      >
        Libris
      </h1>
      <p class="text-base font-normal text-white" style="opacity: 0.7">
        Facturación electrónica para México
      </p>
    </div>

    <!-- Version badge — bottom-right corner -->
    <div
      class="absolute bottom-4 right-6 text-xs text-white select-none window-no-drag"
      style="opacity: 0.5"
    >
      v{{ version }} · Libris
    </div>

    <!-- Shimmer loading bar — 2px at bottom -->
    <div class="absolute bottom-0 left-0 right-0 overflow-hidden" style="height: 2px">
      <div class="splash-shimmer absolute inset-0" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { version } from '../../../package.json';

export default defineComponent({
  name: 'Splash',
  setup() {
    return { version };
  },
});
</script>

<style scoped>
/* Entry animation: scale 0.95 → 1.0 + opacity 0 → 1 over 600ms */
.splash-content {
  animation: splash-enter 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes splash-enter {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Shimmer: white highlight sweeping left-to-right */
.splash-shimmer {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 200% 100%;
  animation: splash-shimmer-sweep 1.6s ease-in-out infinite;
}

@keyframes splash-shimmer-sweep {
  from {
    background-position: 200% center;
  }
  to {
    background-position: -200% center;
  }
}
</style>
