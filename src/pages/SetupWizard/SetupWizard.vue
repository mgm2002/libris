<template>
  <div
    class="flex h-full"
    :class="{ 'window-drag': platform !== 'Windows' }"
  >
    <!-- ══ LEFT PANEL 40% — brand + motivation ══ -->
    <div class="libris-left flex flex-col bg-libris-gradient window-drag">
      <!-- Logo -->
      <div class="px-10 pt-10">
        <img
          src="../../assets/brand/logo-light.svg"
          alt="Libris"
          style="height: 80px"
          class="select-none"
        />
      </div>

      <!-- Motivational copy -->
      <div class="flex-1 flex flex-col justify-center px-10">
        <h2
          class="font-semibold text-white mb-4 leading-tight"
          style="font-size: 26px"
        >
          Bienvenido a Libris
        </h2>
        <p class="text-white mb-3 leading-relaxed" style="opacity: 0.85; font-size: 15px">
          Configura tu empresa en menos de 5 minutos.
        </p>
        <p class="text-white leading-relaxed" style="opacity: 0.7; font-size: 14px">
          Diseñado para micro y pequeñas empresas en México.
        </p>
      </div>

      <!-- Step indicator dots -->
      <div class="px-10 pb-10 flex flex-col gap-4">
        <div class="libris-step">
          <div class="libris-step-dot libris-step-dot--active" />
          <span class="text-sm text-white" style="opacity: 0.9">Empresa</span>
        </div>
        <div class="libris-step">
          <div class="libris-step-dot libris-step-dot--active" />
          <span class="text-sm text-white" style="opacity: 0.9">Localización</span>
        </div>
        <div class="libris-step">
          <div class="libris-step-dot libris-step-dot--active" />
          <span class="text-sm text-white" style="opacity: 0.9">Contabilidad</span>
        </div>
      </div>
    </div>

    <!-- ══ RIGHT PANEL 60% — form ══ -->
    <div class="libris-right flex flex-col bg-white overflow-hidden window-no-drag">
      <!-- Form header -->
      <div
        class="
          flex-shrink-0 sticky top-0 bg-white
          border-b border-libris-neutral-200
          px-8 py-5
        "
      >
        <h1 class="text-xl font-semibold text-libris-neutral-900 select-none">
          Configura tu empresa
        </h1>
      </div>

      <!-- Form sections -->
      <div
        v-if="hasDoc"
        class="flex-1 overflow-auto custom-scroll custom-scroll-thumb1 p-8"
      >
        <CommonFormSection
          v-for="([name, fields], idx) in activeGroup.entries()"
          :key="name + idx"
          ref="section"
          :class="
            idx !== 0 && activeGroup.size > 1
              ? 'border-t border-libris-neutral-200 pt-6 mt-6'
              : ''
          "
          :show-title="activeGroup.size > 1 && name !== t`Default`"
          :title="name"
          :fields="fields"
          :doc="doc"
          :errors="errors"
          :collapsible="false"
          @value-change="onValueChange"
        />
      </div>

      <!-- Button bar -->
      <div
        class="
          flex-shrink-0 sticky bottom-0 bg-white
          border-t border-libris-neutral-200
          px-8 py-4
          flex items-center
        "
      >
        <p
          v-if="loading"
          class="text-base text-libris-neutral-500"
        >
          {{ t`Loading instance...` }}
        </p>

        <button
          v-if="!loading"
          class="libris-btn-ghost"
          @click="cancel"
        >
          Cancelar
        </button>

        <div class="flex gap-3 ms-auto">
          <button
            v-if="fyo.store.isDevelopment && !loading"
            class="libris-btn-ghost"
            :disabled="loading"
            @click="fill"
          >
            {{ t`Fill` }}
          </button>

          <button
            class="libris-btn-primary"
            data-testid="submit-button"
            :disabled="!areAllValuesFilled || loading"
            @click="submit"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { DocValue } from 'fyo/core/types';
import { Doc } from 'fyo/model/doc';
import { Verb } from 'fyo/telemetry/types';
import { TranslationString } from 'fyo/utils/translation';
import { ModelNameEnum } from 'models/types';
import { Field } from 'schemas/types';
import { getErrorMessage } from 'src/utils';
import { showDialog } from 'src/utils/interactive';
import { getSetupWizardDoc } from 'src/utils/misc';
import { getFieldsGroupedByTabAndSection } from 'src/utils/ui';
import { computed, defineComponent } from 'vue';
import CommonFormSection from '../CommonForm/CommonFormSection.vue';

export default defineComponent({
  name: 'SetupWizard',
  components: {
    CommonFormSection,
  },
  provide() {
    return {
      doc: computed(() => this.docOrNull),
    };
  },
  emits: ['setup-complete', 'setup-canceled'],
  data() {
    return {
      docOrNull: null,
      errors: {},
      loading: false,
    } as {
      errors: Record<string, string>;
      docOrNull: null | Doc;
      loading: boolean;
    };
  },
  computed: {
    hasDoc(): boolean {
      return this.docOrNull instanceof Doc;
    },
    doc(): Doc {
      if (this.docOrNull instanceof Doc) {
        return this.docOrNull;
      }

      throw new Error(`Doc is null`);
    },
    areAllValuesFilled(): boolean {
      if (!this.hasDoc) {
        return false;
      }

      const values = this.doc.schema.fields
        .filter((f) => f.required)
        .map((f) => this.doc[f.fieldname]);

      return values.every(Boolean);
    },
    activeGroup(): Map<string, Field[]> {
      if (!this.hasDoc) {
        return new Map();
      }

      const groupedFields = getFieldsGroupedByTabAndSection(
        this.doc.schema,
        this.doc
      );

      return [...groupedFields.values()][0];
    },
  },
  async mounted() {
    const languageMap = TranslationString.prototype.languageMap;
    this.docOrNull = getSetupWizardDoc(languageMap);
    if (!this.fyo.db.isConnected) {
      await this.fyo.db.init();
    }

    if (this.fyo.store.isDevelopment) {
      // @ts-ignore
      window.sw = this;
    }
    this.fyo.telemetry.log(Verb.Started, ModelNameEnum.SetupWizard);
  },
  methods: {
    async fill() {
      if (!this.hasDoc) {
        return;
      }

      await this.doc.set('companyName', "Lin's Things");
      await this.doc.set('email', 'lin@lthings.com');
      await this.doc.set('fullname', 'Lin Slovenly');
      await this.doc.set('bankName', 'Max Finance');
      await this.doc.set('country', 'India');
    },
    async onValueChange(field: Field, value: DocValue) {
      if (!this.hasDoc) {
        return;
      }

      const { fieldname } = field;
      delete this.errors[fieldname];

      try {
        await this.doc.set(fieldname, value);
      } catch (err) {
        if (!(err instanceof Error)) {
          return;
        }

        this.errors[fieldname] = getErrorMessage(err, this.doc);
      }
    },
    async submit() {
      if (!this.hasDoc) {
        return;
      }

      if (!this.areAllValuesFilled) {
        return await showDialog({
          title: this.t`Mandatory Error`,
          detail: this.t`Please fill all values.`,
          type: 'error',
        });
      }

      this.loading = true;
      this.fyo.telemetry.log(Verb.Completed, ModelNameEnum.SetupWizard);
      this.$emit('setup-complete', this.doc.getValidDict());
    },
    cancel() {
      this.fyo.telemetry.log(Verb.Cancelled, ModelNameEnum.SetupWizard);
      this.$emit('setup-canceled');
    },
  },
});
</script>
<style scoped>
/* ── Layout panels ── */
.libris-left {
  width: 40%;
  flex-shrink: 0;
}
.libris-right {
  width: 60%;
  flex: 1;
}

/* ── Step indicator ── */
.libris-step {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.libris-step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.35);
  flex-shrink: 0;
  transition: background 200ms ease;
}
.libris-step-dot--active {
  background: rgba(255, 255, 255, 1);
  width: 10px;
  height: 10px;
}

/* ── Primary button: gradient bg ── */
.libris-btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.5rem;
  border-radius: 0.375rem;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background: var(--libris-gradient);
  transition: opacity 150ms ease;
  border: none;
}
.libris-btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Ghost button: purple border + text ── */
.libris-btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  border-radius: 0.375rem;
  font-size: 14px;
  font-weight: 500;
  color: var(--libris-purple-deep);
  border: 1.5px solid var(--libris-purple-deep);
  background: transparent;
  transition: background-color 150ms ease;
}
.libris-btn-ghost:hover {
  background-color: var(--libris-neutral-100);
}
.libris-btn-ghost:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

/* ── Form labels: weight 500 via :deep ── */
.libris-right :deep(.text-gray-600.text-sm.mb-1) {
  font-weight: 500;
  color: var(--libris-neutral-700);
}

/* ── Input focus ring: magenta glow via :deep ── */
.libris-right :deep(.rounded:focus-within) {
  box-shadow: 0 0 0 2px rgba(177, 33, 102, 0.2);
}
</style>
