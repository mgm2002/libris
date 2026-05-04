<template>
  <div
    class="
      py-2
      h-full
      flex
      justify-between
      flex-col
      bg-libris-purple-deep
      relative
    "
    :class="{
      'window-drag': platform !== 'Windows',
    }"
  >
    <div>
      <!-- Logo -->
      <div
        class="px-6 flex items-center mb-4"
        :class="
          platform === 'Mac' && languageDirection === 'ltr' ? 'mt-10' : 'mt-3'
        "
      >
        <img
          src="../assets/brand/logo-light.svg"
          alt="Libris"
          class="h-8 select-none"
        />
      </div>

      <!-- Separator below logo -->
      <div class="mx-4 border-t border-white border-opacity-10 mb-2" />

      <!-- Sidebar Items -->
      <div v-for="(group, groupIndex) in groups" :key="group.label">
        <!-- Inter-group separator -->
        <div
          v-if="groupIndex > 0"
          class="mx-4 border-t border-white border-opacity-10 my-1"
        />

        <!-- Group row -->
        <div
          class="libris-nav-item relative px-4 flex items-center cursor-pointer h-10"
          :class="
            isGroupActive(group) && !group.items
              ? 'libris-nav-item--active text-white'
              : 'text-white text-opacity-70'
          "
          @click="routeToSidebarItem(group)"
        >
          <!-- Active left indicator bar -->
          <div
            v-if="isGroupActive(group) && !group.items"
            class="libris-active-bar"
          />

          <Icon
            class="flex-shrink-0"
            :name="group.icon"
            :size="group.iconSize || '18'"
            :height="group.iconHeight ?? 0"
            :active="!!isGroupActive(group)"
            :darkMode="darkMode"
          />
          <div class="ms-2 text-lg font-medium">
            {{ group.label }}
          </div>
        </div>

        <!-- Expanded sub-items -->
        <div v-if="group.items && isGroupActive(group)">
          <div
            v-for="item in group.items"
            :key="item.label"
            class="libris-nav-item relative ps-10 h-10 cursor-pointer flex items-center"
            :class="
              isItemActive(item)
                ? 'libris-nav-item--active text-white'
                : 'text-white text-opacity-70'
            "
            @click="routeToSidebarItem(item)"
          >
            <div v-if="isItemActive(item)" class="libris-active-bar" />
            <p class="text-lg font-normal">{{ item.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer: company card + utility buttons -->
    <div class="window-no-drag flex flex-col gap-2 py-2 px-4">
      <!-- Company card -->
      <div
        class="
          flex items-center gap-3
          pb-3 mb-1
          border-b border-white border-opacity-10
        "
      >
        <!-- Gradient avatar -->
        <div
          class="
            w-8 h-8 rounded-full
            bg-libris-gradient
            flex-center flex-shrink-0
            select-none
          "
        >
          <span class="text-sm font-semibold text-white">
            {{ companyName?.[0]?.toUpperCase() ?? '?' }}
          </span>
        </div>

        <!-- Company name + version -->
        <div class="flex flex-col min-w-0">
          <p
            data-testid="company-name"
            class="text-sm font-medium text-white truncate"
          >
            {{ companyName }}
          </p>
          <p class="text-xs text-white text-opacity-50 select-none">
            v{{ appVersion }}
          </p>
        </div>
      </div>

      <!-- Utility buttons -->
      <button class="libris-footer-btn" @click="openDocumentation">
        <feather-icon name="help-circle" class="h-4 w-4 flex-shrink-0" />
        <p>{{ t`Help` }}</p>
      </button>

      <button class="libris-footer-btn" @click="viewShortcuts = true">
        <feather-icon name="command" class="h-4 w-4 flex-shrink-0" />
        <p>{{ t`Shortcuts` }}</p>
      </button>

      <button
        data-testid="change-db"
        class="libris-footer-btn"
        @click="$emit('change-db-file')"
      >
        <feather-icon name="database" class="h-4 w-4 flex-shrink-0" />
        <p>{{ t`Change DB` }}</p>
      </button>

      <button class="libris-footer-btn" @click="() => reportIssue()">
        <feather-icon name="flag" class="h-4 w-4 flex-shrink-0" />
        <p>{{ t`Report Issue` }}</p>
      </button>

      <p
        v-if="showDevMode"
        class="text-xs text-white text-opacity-50 select-none cursor-pointer"
        @click="showDevMode = false"
        title="Open dev tools with Ctrl+Shift+I"
      >
        dev mode
      </p>
    </div>

    <!-- Hide Sidebar Button -->
    <button
      class="libris-hide-btn absolute bottom-0 end-0 rounded p-1 m-4 rtl-rotate-180"
      @click="() => toggleSidebar()"
    >
      <feather-icon name="chevrons-left" class="w-4 h-4" />
    </button>

    <Modal :open-modal="viewShortcuts" @closemodal="viewShortcuts = false">
      <ShortcutsHelper class="w-form" />
    </Modal>
  </div>
</template>

<script lang="ts">
import { reportIssue } from 'src/errorHandling';
import { fyo } from 'src/initFyo';
import { languageDirectionKey, shortcutsKey } from 'src/utils/injectionKeys';
import { docsPathRef } from 'src/utils/refs';
import { getSidebarConfig } from 'src/utils/sidebarConfig';
import { SidebarConfig, SidebarItem, SidebarRoot } from 'src/utils/types';
import { routeTo, toggleSidebar } from 'src/utils/ui';
import { defineComponent, inject } from 'vue';
import router from '../router';
import Icon from './Icon.vue';
import Modal from './Modal.vue';
import ShortcutsHelper from './ShortcutsHelper.vue';

const COMPONENT_NAME = 'Sidebar';

export default defineComponent({
  components: {
    Icon,
    Modal,
    ShortcutsHelper,
  },
  props: {
    darkMode: { type: Boolean, default: false },
  },
  emits: ['change-db-file', 'toggle-darkmode'],
  setup() {
    return {
      languageDirection: inject(languageDirectionKey),
      shortcuts: inject(shortcutsKey),
    };
  },
  data() {
    return {
      companyName: '',
      groups: [],
      viewShortcuts: false,
      activeGroup: null,
      showDevMode: false,
    } as {
      companyName: string;
      groups: SidebarConfig;
      viewShortcuts: boolean;
      activeGroup: null | SidebarRoot;
      showDevMode: boolean;
    };
  },
  computed: {
    appVersion() {
      return fyo.store.appVersion;
    },
  },
  async mounted() {
    const { companyName } = await fyo.doc.getDoc('AccountingSettings');
    this.companyName = companyName as string;
    this.groups = await getSidebarConfig();

    this.setActiveGroup();
    router.afterEach(() => {
      this.setActiveGroup();
    });

    this.shortcuts?.shift.set(COMPONENT_NAME, ['KeyH'], () => {
      if (document.body === document.activeElement) {
        this.toggleSidebar();
      }
    });
    this.shortcuts?.set(COMPONENT_NAME, ['F1'], () => this.openDocumentation());

    this.showDevMode = this.fyo.store.isDevelopment;
  },
  unmounted() {
    this.shortcuts?.delete(COMPONENT_NAME);
  },
  methods: {
    routeTo,
    reportIssue,
    toggleSidebar,
    openDocumentation() {
      ipc.openLink('https://docs.frappe.io/' + docsPathRef.value);
    },
    setActiveGroup() {
      const { fullPath } = this.$router.currentRoute.value;
      const fallBackGroup = this.activeGroup;
      this.activeGroup =
        this.groups.find((g) => {
          if (fullPath.startsWith(g.route) && g.route !== '/') {
            return true;
          }

          if (g.route === fullPath) {
            return true;
          }

          if (g.items) {
            let activeItem = g.items.filter(
              ({ route }) => route === fullPath || fullPath.startsWith(route)
            );

            if (activeItem.length) {
              return true;
            }
          }
        }) ??
        fallBackGroup ??
        this.groups[0];
    },
    isItemActive(item: SidebarItem) {
      const { path: currentRoute, params } = this.$route;
      const routeMatch = currentRoute === item.route;

      const schemaNameMatch =
        item.schemaName && params.schemaName === item.schemaName;

      const isMatch = routeMatch || schemaNameMatch;
      if (params.name && item.schemaName && !isMatch) {
        return currentRoute.includes(`${item.schemaName}/${params.name}`);
      }

      return isMatch;
    },
    isGroupActive(group: SidebarRoot) {
      return this.activeGroup && group.label === this.activeGroup.label;
    },
    routeToSidebarItem(item: SidebarItem | SidebarRoot) {
      routeTo(this.getPath(item));
    },
    getPath(item: SidebarItem | SidebarRoot) {
      const { route: path, filters } = item;
      if (!filters) {
        return path;
      }

      return { path, query: { filters: JSON.stringify(filters) } };
    },
  },
});
</script>

<style scoped>
/* Nav item: hover and active backgrounds use precise opacity values */
.libris-nav-item {
  transition: background-color 150ms ease;
}
.libris-nav-item:hover {
  background-color: rgba(255, 255, 255, 0.08);
}
.libris-nav-item--active {
  background-color: rgba(255, 255, 255, 0.12);
}

/* Active indicator: 3px left bar in --libris-magenta */
.libris-active-bar {
  position: absolute;
  inset-inline-start: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background-color: var(--libris-magenta);
  border-radius: 0 2px 2px 0;
}

/* Footer utility buttons */
.libris-footer-btn {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  transition: color 150ms ease;
}
.libris-footer-btn:hover {
  color: rgba(255, 255, 255, 1);
}

/* Hide sidebar button */
.libris-hide-btn {
  color: rgba(255, 255, 255, 0.5);
  transition: color 150ms ease, background-color 150ms ease;
}
.libris-hide-btn:hover {
  color: rgba(255, 255, 255, 1);
  background-color: rgba(255, 255, 255, 0.08);
}
</style>
