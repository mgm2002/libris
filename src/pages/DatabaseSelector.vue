<template>
  <div
    class="
      flex-1 flex flex-col items-center justify-center
      bg-libris-neutral-50
    "
    :class="{
      'pointer-events-none': loadingDatabase,
      'window-drag': platform !== 'Windows',
    }"
  >
    <!-- Content column -->
    <div class="ds-column flex flex-col w-full">

      <!-- ── Header ── -->
      <div class="flex flex-col items-center gap-3 mb-10 select-none">
        <img
          src="../assets/brand/logo.svg"
          alt="Libris"
          style="height: 56px"
          class="select-none"
        />
        <h1
          class="font-semibold text-libris-neutral-900"
          style="font-size: 32px; line-height: 1.1"
        >
          Libris
        </h1>
        <p class="text-sm text-libris-neutral-500 text-center">
          {{ t`Elige una empresa para continuar o crea una nueva` }}
        </p>
      </div>

      <!-- ── Company cards + action cards ── -->
      <div class="flex flex-col gap-3 overflow-y-auto ds-list">

        <!-- Existing companies -->
        <div
          v-for="(file, i) in files"
          :key="file.dbPath"
          class="libris-card window-no-drag"
          :class="creatingDemo ? 'opacity-60' : 'cursor-pointer'"
          :title="t`${file.companyName} stored at ${file.dbPath}`"
          @click="selectFile(file)"
        >
          <!-- Gradient avatar with company initial -->
          <div
            class="
              w-10 h-10 rounded-full
              bg-libris-gradient
              flex-center flex-shrink-0
              select-none
            "
          >
            <span class="text-sm font-semibold text-white">
              {{ file.companyName?.[0]?.toUpperCase() ?? '?' }}
            </span>
          </div>

          <!-- Company name + meta -->
          <div class="flex-1 min-w-0">
            <p class="font-medium text-libris-neutral-900 truncate">
              {{ file.companyName }}
            </p>
            <p class="text-sm text-libris-neutral-500">
              {{ formatDate(file.modified) }}
            </p>
          </div>

          <!-- Delete -->
          <button
            class="libris-delete-btn flex-shrink-0 window-no-drag"
            @click.stop="() => deleteDb(i)"
          >
            <feather-icon name="x" class="w-4 h-4" />
          </button>
        </div>

        <!-- ── Nueva empresa (dashed, gradient on hover) ── -->
        <div
          data-testid="create-new-file"
          class="libris-card-new window-no-drag"
          :class="creatingDemo ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
          @click="newDatabase"
        >
          <div
            class="
              w-10 h-10 rounded-full
              border-2 border-dashed border-current
              flex-center flex-shrink-0
            "
          >
            <feather-icon name="plus" class="w-4 h-4" />
          </div>
          <div>
            <p class="font-medium">{{ t`Nueva empresa` }}</p>
            <p class="text-sm" style="opacity: 0.7">
              {{ t`Crear y guardar una nueva empresa en tu equipo` }}
            </p>
          </div>
        </div>

        <!-- ── Cargar empresa existente ── -->
        <div
          class="libris-card-secondary window-no-drag"
          :class="creatingDemo ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
          @click="existingDatabase"
        >
          <div
            class="
              w-10 h-10 rounded-full
              bg-libris-neutral-100
              flex-center flex-shrink-0
            "
          >
            <feather-icon
              name="upload"
              class="w-4 h-4 text-libris-neutral-700"
            />
          </div>
          <div>
            <p class="font-medium text-libris-neutral-900">
              {{ t`Cargar empresa existente` }}
            </p>
            <p class="text-sm text-libris-neutral-500">
              {{ t`Abrir un archivo de empresa desde tu equipo` }}
            </p>
          </div>
        </div>

        <!-- ── Crear demo (solo cuando no hay empresas) ── -->
        <div
          v-if="!files?.length"
          class="libris-card-secondary window-no-drag"
          :class="creatingDemo ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'"
          @click="createDemo"
        >
          <div
            class="
              w-10 h-10 rounded-full
              bg-libris-neutral-100
              flex-center flex-shrink-0
            "
          >
            <feather-icon
              name="monitor"
              class="w-4 h-4 text-libris-neutral-700"
            />
          </div>
          <div>
            <p class="font-medium text-libris-neutral-900">
              {{ t`Crear demo` }}
            </p>
            <p class="text-sm text-libris-neutral-500">
              {{ t`Crear una empresa demo para explorar Libris` }}
            </p>
          </div>
        </div>
      </div>

      <!-- ── Bottom row: language + demo shortcut ── -->
      <div class="flex items-center justify-between mt-6 window-no-drag">
        <LanguageSelector v-show="!creatingDemo" class="text-sm w-28" />
        <button
          v-if="files?.length"
          class="text-sm text-libris-neutral-500 hover:text-libris-neutral-700 px-3 py-1"
          :disabled="creatingDemo"
          @click="createDemo"
        >
          {{ creatingDemo ? t`Please Wait` : t`Crear demo` }}
        </button>
      </div>

      <!-- ── Footer ── -->
      <p
        class="text-xs text-libris-neutral-500 text-center mt-8 select-none"
        style="opacity: 0.5"
      >
        Libris v{{ version }} · Hecho en México
      </p>
    </div>

    <!-- Loading overlay (creatingDemo) -->
    <Loading
      v-if="creatingDemo"
      :open="creatingDemo"
      :show-x="false"
      :full-width="true"
      :percent="creationPercent"
      :message="creationMessage"
    />

    <!-- Dev: base count modal -->
    <Modal :open-modal="openModal" @closemodal="openModal = false">
      <div class="p-4 text-gray-900 dark:text-gray-100 w-form">
        <h2 class="text-xl font-semibold select-none">Set Base Count</h2>
        <p class="text-base mt-2">
          Base Count is a lower bound on the number of entries made when
          creating the dummy instance.
        </p>
        <div class="flex my-12 justify-center items-baseline gap-4 text-base">
          <label for="basecount" class="text-gray-600 dark:text-gray-400"
            >Base Count</label
          >
          <input
            v-model="baseCount"
            type="number"
            name="basecount"
            class="
              bg-gray-100
              dark:bg-gray-875
              focus:bg-gray-200
              dark:focus:bg-gray-890
              rounded-md
              px-2
              py-1
              outline-none
            "
          />
        </div>
        <div class="flex justify-between">
          <Button @click="openModal = false">Cancel</Button>
          <Button
            type="primary"
            @click="
              () => {
                openModal = false;
                startDummyInstanceSetup();
              }
            "
            >Create</Button
          >
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import { setupDummyInstance } from 'dummy';
import { t } from 'fyo';
import { Verb } from 'fyo/telemetry/types';
import { DateTime } from 'luxon';
import Button from 'src/components/Button.vue';
import LanguageSelector from 'src/components/Controls/LanguageSelector.vue';
import FeatherIcon from 'src/components/FeatherIcon.vue';
import Loading from 'src/components/Loading.vue';
import Modal from 'src/components/Modal.vue';
import { fyo } from 'src/initFyo';
import { showDialog } from 'src/utils/interactive';
import { updateConfigFiles } from 'src/utils/misc';
import { deleteDb, getSavePath, getSelectedFilePath } from 'src/utils/ui';
import type { ConfigFilesWithModified } from 'utils/types';
import { defineComponent } from 'vue';
import { version } from '../../package.json';

export default defineComponent({
  name: 'DatabaseSelector',
  components: {
    LanguageSelector,
    Loading,
    FeatherIcon,
    Modal,
    Button,
  },
  emits: ['file-selected', 'new-database'],
  data() {
    return {
      version,
      openModal: false,
      baseCount: 100,
      creationMessage: '',
      creationPercent: 0,
      creatingDemo: false,
      loadingDatabase: false,
      files: [],
    } as {
      version: string;
      openModal: boolean;
      baseCount: number;
      creationMessage: string;
      creationPercent: number;
      creatingDemo: boolean;
      loadingDatabase: boolean;
      files: ConfigFilesWithModified[];
    };
  },
  async mounted() {
    await this.setFiles();

    if (fyo.store.isDevelopment) {
      // @ts-ignore
      window.ds = this;
    }
  },
  methods: {
    truncate(value: string) {
      if (value.length < 72) {
        return value;
      }

      return '...' + value.slice(value.length - 72);
    },
    formatDate(isoDate: string) {
      return DateTime.fromISO(isoDate).toRelative();
    },
    async deleteDb(i: number) {
      const file = this.files[i];
      const setFiles = this.setFiles.bind(this);

      await showDialog({
        title: t`Delete ${file.companyName}?`,
        detail: t`Database file: ${file.dbPath}`,
        type: 'warning',
        buttons: [
          {
            label: this.t`Yes`,
            async action() {
              await deleteDb(file.dbPath);
              await setFiles();
            },
            isPrimary: true,
          },
          {
            label: this.t`No`,
            action() {
              return null;
            },
            isEscape: true,
          },
        ],
      });
    },
    async createDemo() {
      if (!fyo.store.isDevelopment) {
        await this.startDummyInstanceSetup();
      } else {
        this.openModal = true;
      }
    },
    async startDummyInstanceSetup() {
      const { filePath, canceled } = await getSavePath('demo', 'db');
      if (canceled || !filePath) {
        return;
      }

      this.creatingDemo = true;
      await setupDummyInstance(
        filePath,
        fyo,
        1,
        this.baseCount,
        (message, percent) => {
          this.creationMessage = message;
          this.creationPercent = percent;
        }
      );

      updateConfigFiles(fyo);
      await fyo.purgeCache();
      await this.setFiles();
      this.fyo.telemetry.log(Verb.Created, 'dummy-instance');
      this.creatingDemo = false;
      this.$emit('file-selected', filePath);
    },
    async setFiles() {
      const dbList = await ipc.getDbList();
      this.files = dbList?.sort(
        (a, b) => Date.parse(b.modified) - Date.parse(a.modified)
      );
    },
    newDatabase() {
      if (this.creatingDemo) {
        return;
      }

      this.$emit('new-database');
    },
    async existingDatabase() {
      if (this.creatingDemo) {
        return;
      }

      const filePath = (await getSelectedFilePath())?.filePaths?.[0];
      this.emitFileSelected(filePath);
    },
    selectFile(file: ConfigFilesWithModified) {
      if (this.creatingDemo) {
        return;
      }

      this.emitFileSelected(file.dbPath);
    },
    emitFileSelected(filePath: string) {
      if (!filePath) {
        return;
      }

      this.$emit('file-selected', filePath);
    },
  },
});
</script>

<style scoped>
/* Column: max-width centered, comfortable padding */
.ds-column {
  max-width: 520px;
  padding: 2rem 1rem;
}

/* Company list: scrollable when many entries */
.ds-list {
  max-height: 420px;
}

/* ── Existing company card ── */
.libris-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  background: var(--libris-neutral-0);
  border: 1px solid var(--libris-neutral-200);
  transition: background-color 150ms ease, border-color 150ms ease;
}
.libris-card:hover {
  background-color: var(--libris-neutral-100);
  border-color: var(--libris-purple-deep);
}

/* ── Nueva empresa card (dashed → gradient on hover) ── */
.libris-card-new {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  background: transparent;
  border: 1.5px dashed var(--libris-neutral-200);
  color: var(--libris-neutral-700);
  transition: background 200ms ease, border-color 200ms ease, color 200ms ease;
}
.libris-card-new:hover {
  background: var(--libris-gradient);
  border-color: transparent;
  color: white;
}

/* ── Secondary action cards ── */
.libris-card-secondary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  border-radius: 0.5rem;
  background: var(--libris-neutral-0);
  border: 1px solid var(--libris-neutral-200);
  transition: background-color 150ms ease;
}
.libris-card-secondary:hover {
  background-color: var(--libris-neutral-100);
}

/* ── Delete button inside company card ── */
.libris-delete-btn {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--libris-neutral-500);
  transition: background-color 150ms ease, color 150ms ease;
}
.libris-delete-btn:hover {
  background-color: rgba(239, 68, 68, 0.1);
  color: var(--libris-error);
}
</style>
