/**
 * @narduk-enterprises/eslint-config
 *
 * Consolidated ESLint plugin for Nuxt 4, Vue 3, Tailwind v4, and Nuxt UI v4 projects.
 * 75 custom rules organized into 8 categories with capability packs and legacy presets.
 *
 * Usage:
 *   import narduk from '@narduk-enterprises/eslint-config'
 *   export default withNuxt(...narduk.configs.all)
 */

// === Design System rules (14) ===
// @ts-ignore — plain .mjs rule modules
import noNativeButton from './rules/design-system/no-native-button.mjs';
// @ts-ignore
import noNativeInput from './rules/design-system/no-native-input.mjs';
// @ts-ignore
import noNativeForm from './rules/design-system/no-native-form.mjs';
// @ts-ignore
import noNativeTable from './rules/design-system/no-native-table.mjs';
// @ts-ignore
import noNativeDetails from './rules/design-system/no-native-details.mjs';
// @ts-ignore
import noNativeHr from './rules/design-system/no-native-hr.mjs';
// @ts-ignore
import noNativeProgress from './rules/design-system/no-native-progress.mjs';
// @ts-ignore
import noNativeDialog from './rules/design-system/no-native-dialog.mjs';
// @ts-ignore
import noNativeKbd from './rules/design-system/no-native-kbd.mjs';
// @ts-ignore
import noNativeLayout from './rules/design-system/no-native-layout.mjs';
// @ts-ignore
import noInlineSvg from './rules/design-system/no-inline-svg.mjs';
// @ts-ignore
import preferULink from './rules/design-system/prefer-ulink.mjs';
// @ts-ignore
import noSelectEmptyValue from './rules/design-system/no-select-empty-value.mjs';
// @ts-ignore
import noFetchInComponent from './rules/design-system/no-fetch-in-component.mjs';

// === Styling rules (7) ===
// @ts-ignore
import noRawTailwindColors from './rules/styling/no-raw-tailwind-colors.mjs';
// @ts-ignore
import noTailwindV3Deprecated from './rules/styling/no-tailwind-v3-deprecated.mjs';
// @ts-ignore
import noInvalidNuxtUiToken from './rules/styling/no-invalid-nuxt-ui-token.mjs';
// @ts-ignore
import noInlineHex from './rules/styling/no-inline-hex.mjs';
// @ts-ignore
import noStyleBlockLayout from './rules/styling/no-style-block-layout.mjs';
// @ts-ignore
import noApplyInScopedStyle from './rules/styling/no-apply-in-scoped-style.mjs';
// @ts-ignore
import lucideIconsOnly from './rules/styling/lucide-icons-only.mjs';

// === Hydration safety rules (5) ===
// @ts-ignore
import requireClientOnlySwitch from './rules/hydration/require-client-only-switch.mjs';
// @ts-ignore
import noAttrsOnFragment from './rules/hydration/no-attrs-on-fragment.mjs';
// @ts-ignore
import requireClientOnlyHydrationSensitive from './rules/hydration/require-client-only-hydration-sensitive.mjs';
import noSsrDomAccess from './rules/hydration/no-ssr-dom-access';
import noComposableDomAccessWithoutClientGuard from './rules/hydration/no-composable-dom-access-without-client-guard';

// === Nuxt framework rules (14) ===
import noLegacyHead from './rules/nuxt/no-legacy-head';
import noLegacyFetchHook from './rules/nuxt/no-legacy-fetch-hook';
import noRawFetch from './rules/nuxt/no-raw-fetch';
import noRawFetchInStores from './rules/nuxt/no-raw-fetch-in-stores';
import noFetchCreateBypass from './rules/nuxt/no-fetch-create-bypass';
import preferImportMetaClient from './rules/nuxt/prefer-import-meta-client';
import preferImportMetaDev from './rules/nuxt/prefer-import-meta-dev';
import validUseAsyncData from './rules/nuxt/valid-useAsyncData';
import validUseFetch from './rules/nuxt/valid-useFetch';
import appStructureConsistency from './rules/nuxt/app-structure-consistency';
import requireUseSeoOnPages from './rules/nuxt/require-use-seo-on-pages';
import preferUseSeoOverBareMeta from './rules/nuxt/prefer-use-seo-over-bare-meta';
import requireSchemaOnPages from './rules/nuxt/require-schema-on-pages';
import noMapAsyncInServer from './rules/nuxt/no-map-async-in-server';

// === Nuxt UI v4 rules (10) ===
import noUnknownComponentProp from './rules/nuxt-ui/no-unknown-component-prop';
import noUnknownNuxtUiComponent from './rules/nuxt-ui/no-unknown-nuxt-ui-component';
import noDeprecatedComponent from './rules/nuxt-ui/no-deprecated-component';
import noDeprecatedProp from './rules/nuxt-ui/no-deprecated-prop';
import noDeprecatedSlot from './rules/nuxt-ui/no-deprecated-slot';
import noDeprecatedEvent from './rules/nuxt-ui/no-deprecated-event';
import requireValidVariantValues from './rules/nuxt-ui/require-valid-variant-values';
import preferUform from './rules/nuxt-ui/prefer-uform';
import preferLoadingAuto from './rules/nuxt-ui/prefer-loading-auto';
import noUCardInUModal from './rules/nuxt-ui/no-ucard-in-umodal';
import vuePlugin from 'eslint-plugin-vue';

// === Vue 3 best practices rules (9) ===
// NOTE: 3 rules removed — use eslint-plugin-vue built-ins instead:
//   require-script-setup           → vue/component-api-style
//   no-async-computed-getter       → vue/no-async-in-computed-properties
//   consistent-defineprops-emits   → vue/define-props-declaration + vue/define-emits-declaration
import noSetupTopLevelSideEffects from './rules/vue/no-setup-top-level-side-effects';
import preferShallowWatch from './rules/vue/prefer-shallow-watch';
import noTemplateComplexExpressions from './rules/vue/no-template-complex-expressions';
import preferTypedDefineprops from './rules/vue/prefer-typed-defineprops';
import requireUsePrefixForComposables from './rules/vue/require-use-prefix-for-composables';
import noComposableConditionalHooks from './rules/vue/no-composable-conditional-hooks';
import piniaRequireDefineStoreId from './rules/vue/pinia-require-defineStore-id';
import piniaNoDirectStateMutationOutsideActions from './rules/vue/pinia-no-direct-state-mutation-outside-actions';
import piniaPreferStoreToRefsDestructure from './rules/vue/pinia-prefer-storeToRefs-destructure';

// === Server-side rules (11) ===
// @ts-ignore
import requireValidatedBody from './rules/server/require-validated-body.mjs';
// @ts-ignore
import requireValidatedQuery from './rules/server/require-validated-query.mjs';
// @ts-ignore
import preferDrizzleOperators from './rules/server/prefer-drizzle-operators.mjs';
import requireCsrfHeaderOnMutations from './rules/server/require-csrf-header-on-mutations';
import noCsrfExemptRouteMisuse from './rules/server/no-csrf-exempt-route-misuse';
import requireEnforceRateLimitOnMutations from './rules/server/require-enforce-rate-limit-on-mutations';
import noRawDefineEventHandlerInMutationRoutes from './rules/server/no-raw-define-event-handler-in-mutation-routes';
import requireImmediateMutationBodyValidation from './rules/server/require-immediate-mutation-body-validation';
import noProcessEnvInWorkerRuntime from './rules/server/no-process-env-in-worker-runtime';
import noRelativeServerImports from './rules/server/no-relative-server-imports';
import noDirectLayerSourceImports from './rules/server/no-direct-layer-source-imports';

// === Architecture rules (5) ===
// @ts-ignore
import noModuleScopeRef from './rules/architecture/no-module-scope-ref.mjs';
// @ts-ignore
import noInlineTypesInStores from './rules/architecture/no-inline-types-in-stores.mjs';
// @ts-ignore
import noMultiStatementInlineHandler from './rules/architecture/no-multi-statement-inline-handler.mjs';
import pluginSuffixForBrowserApis from './rules/architecture/plugin-suffix-for-browser-apis';
import noNonSerializableStoreState from './rules/architecture/no-non-serializable-store-state';

const designSystemRules = {
  'narduk/no-native-button': 'error',
  'narduk/no-native-input': 'error',
  'narduk/no-native-form': 'error',
  'narduk/no-native-table': 'error',
  'narduk/no-native-details': 'error',
  'narduk/no-native-hr': 'error',
  'narduk/no-native-progress': 'error',
  'narduk/no-native-dialog': 'error',
  'narduk/no-native-kbd': 'error',
  'narduk/no-native-layout': 'error',
  'narduk/no-inline-svg': 'error',
  'narduk/prefer-ulink': 'error',
  'narduk/no-select-empty-value': 'error',
  'narduk/no-fetch-in-component': 'error',
} as const;

const stylingRules = {
  'narduk/no-raw-tailwind-colors': 'error',
  'narduk/no-tailwind-v3-deprecated': 'error',
  'narduk/no-invalid-nuxt-ui-token': 'error',
  'narduk/no-inline-hex': 'error',
  'narduk/no-style-block-layout': ['error', { max: 50 }],
  'narduk/no-apply-in-scoped-style': 'error',
  'narduk/lucide-icons-only': 'error',
} as const;

const hydrationRules = {
  'narduk/require-client-only-switch': 'error',
  'narduk/no-attrs-on-fragment': 'error',
  'narduk/require-client-only-hydration-sensitive': 'warn',
  'narduk/no-ssr-dom-access': 'error',
  'narduk/no-composable-dom-access-without-client-guard': 'error',
} as const;

const templateVueRules = {
  'narduk/no-multi-statement-inline-handler': 'error',
} as const;

const nuxtCoreRules = {
  'narduk/no-legacy-head': 'warn',
  'narduk/no-legacy-fetch-hook': 'error',
  'narduk/no-raw-fetch': 'error',
  'narduk/no-raw-fetch-in-stores': 'error',
  'narduk/prefer-import-meta-client': 'warn',
  'narduk/prefer-import-meta-dev': 'warn',
  'narduk/valid-useAsyncData': 'warn',
  'narduk/valid-useFetch': 'warn',
  'narduk/no-map-async-in-server': 'warn',
} as const;

const seoRules = {
  'narduk/require-use-seo-on-pages': 'warn',
  'narduk/prefer-use-seo-over-bare-meta': 'warn',
  'narduk/require-schema-on-pages': 'warn',
} as const;

const templateProjectRules = {
  'narduk/no-fetch-create-bypass': 'error',
  'narduk/app-structure-consistency': 'warn',
} as const;

const nuxtUiRules = {
  'narduk/no-unknown-component-prop': 'error',
  'narduk/no-unknown-nuxt-ui-component': 'error',
  'narduk/no-deprecated-component': 'error',
  'narduk/no-deprecated-prop': 'error',
  'narduk/no-deprecated-slot': 'error',
  'narduk/no-deprecated-event': 'error',
  'narduk/require-valid-variant-values': 'error',
  'narduk/prefer-uform': 'warn',
  'narduk/prefer-loading-auto': 'warn',
  'narduk/no-ucard-in-umodal': 'error',
} as const;

const vueOfficialRules = {
  'vue/component-api-style': ['warn', ['script-setup']],
  'vue/no-async-in-computed-properties': 'error',
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/define-emits-declaration': ['error', 'type-based'],
} as const;

const vueCoreRules = {
  'narduk/no-setup-top-level-side-effects': 'error',
  'narduk/prefer-shallow-watch': 'warn',
  'narduk/no-template-complex-expressions': 'warn',
  'narduk/prefer-typed-defineprops': 'warn',
  'narduk/require-use-prefix-for-composables': 'warn',
  'narduk/no-composable-conditional-hooks': 'warn',
} as const;

const piniaRules = {
  'narduk/pinia-require-defineStore-id': 'error',
  'narduk/pinia-no-direct-state-mutation-outside-actions': 'warn',
  'narduk/pinia-prefer-storeToRefs-destructure': 'warn',
} as const;

const vueStrictOfficialRules = {
  'vue/component-api-style': ['error', ['script-setup']],
  'vue/no-async-in-computed-properties': 'error',
  'vue/define-props-declaration': ['error', 'type-based'],
  'vue/define-emits-declaration': ['error', 'type-based'],
} as const;

const vueStrictCoreRules = {
  'narduk/no-setup-top-level-side-effects': 'error',
  'narduk/prefer-shallow-watch': 'error',
  'narduk/no-template-complex-expressions': 'error',
  'narduk/prefer-typed-defineprops': 'error',
  'narduk/require-use-prefix-for-composables': 'error',
  'narduk/no-composable-conditional-hooks': 'error',
} as const;

const piniaStrictRules = {
  'narduk/pinia-require-defineStore-id': 'error',
  'narduk/pinia-no-direct-state-mutation-outside-actions': 'error',
  'narduk/pinia-prefer-storeToRefs-destructure': 'error',
} as const;

const serverDataRules = {
  'narduk/require-validated-body': 'error',
  'narduk/require-validated-query': 'error',
  'narduk/prefer-drizzle-operators': 'error',
  'narduk/no-raw-define-event-handler-in-mutation-routes': 'error',
  'narduk/require-immediate-mutation-body-validation': 'error',
} as const;

const authRules = {
  'narduk/require-csrf-header-on-mutations': 'error',
  'narduk/no-csrf-exempt-route-misuse': 'warn',
  'narduk/require-enforce-rate-limit-on-mutations': 'error',
} as const;

const serverRuntimeRules = {
  'narduk/no-process-env-in-worker-runtime': 'error',
  'narduk/no-relative-server-imports': 'error',
} as const;

const templateServerRules = {
  'narduk/no-direct-layer-source-imports': 'error',
} as const;

const appArchitectureRules = {
  'narduk/no-module-scope-ref': 'warn',
  'narduk/no-inline-types-in-stores': 'warn',
  'narduk/plugin-suffix-for-browser-apis': 'error',
  'narduk/no-non-serializable-store-state': 'warn',
} as const;

// ─── Plugin Definition ──────────────────────────────────────────────────────

const plugin = {
  meta: {
    name: '@narduk-enterprises/eslint-config',
    version: '1.0.18',
  },

  rules: {
    // Design System
    'no-native-button': noNativeButton,
    'no-native-input': noNativeInput,
    'no-native-form': noNativeForm,
    'no-native-table': noNativeTable,
    'no-native-details': noNativeDetails,
    'no-native-hr': noNativeHr,
    'no-native-progress': noNativeProgress,
    'no-native-dialog': noNativeDialog,
    'no-native-kbd': noNativeKbd,
    'no-native-layout': noNativeLayout,
    'no-inline-svg': noInlineSvg,
    'prefer-ulink': preferULink,
    'no-select-empty-value': noSelectEmptyValue,
    'no-fetch-in-component': noFetchInComponent,

    // Styling
    'no-raw-tailwind-colors': noRawTailwindColors,
    'no-tailwind-v3-deprecated': noTailwindV3Deprecated,
    'no-invalid-nuxt-ui-token': noInvalidNuxtUiToken,
    'no-inline-hex': noInlineHex,
    'no-style-block-layout': noStyleBlockLayout,
    'no-apply-in-scoped-style': noApplyInScopedStyle,
    'lucide-icons-only': lucideIconsOnly,

    // Hydration
    'require-client-only-switch': requireClientOnlySwitch,
    'no-attrs-on-fragment': noAttrsOnFragment,
    'require-client-only-hydration-sensitive': requireClientOnlyHydrationSensitive,
    'no-ssr-dom-access': noSsrDomAccess,
    'no-composable-dom-access-without-client-guard': noComposableDomAccessWithoutClientGuard,

    // Nuxt
    'no-legacy-head': noLegacyHead,
    'no-legacy-fetch-hook': noLegacyFetchHook,
    'no-raw-fetch': noRawFetch,
    'no-raw-fetch-in-stores': noRawFetchInStores,
    'no-fetch-create-bypass': noFetchCreateBypass,
    'prefer-import-meta-client': preferImportMetaClient,
    'prefer-import-meta-dev': preferImportMetaDev,
    'valid-useAsyncData': validUseAsyncData,
    'valid-useFetch': validUseFetch,
    'app-structure-consistency': appStructureConsistency,
    'require-use-seo-on-pages': requireUseSeoOnPages,
    'prefer-use-seo-over-bare-meta': preferUseSeoOverBareMeta,
    'require-schema-on-pages': requireSchemaOnPages,
    'no-map-async-in-server': noMapAsyncInServer,

    // Nuxt UI
    'no-unknown-component-prop': noUnknownComponentProp,
    'no-unknown-nuxt-ui-component': noUnknownNuxtUiComponent,
    'no-deprecated-component': noDeprecatedComponent,
    'no-deprecated-prop': noDeprecatedProp,
    'no-deprecated-slot': noDeprecatedSlot,
    'no-deprecated-event': noDeprecatedEvent,
    'require-valid-variant-values': requireValidVariantValues,
    'prefer-uform': preferUform,
    'prefer-loading-auto': preferLoadingAuto,
    'no-ucard-in-umodal': noUCardInUModal,

    // Vue (9 custom rules — 3 duplicates deferred to eslint-plugin-vue)
    'no-setup-top-level-side-effects': noSetupTopLevelSideEffects,
    'prefer-shallow-watch': preferShallowWatch,
    'no-template-complex-expressions': noTemplateComplexExpressions,
    'prefer-typed-defineprops': preferTypedDefineprops,
    'require-use-prefix-for-composables': requireUsePrefixForComposables,
    'no-composable-conditional-hooks': noComposableConditionalHooks,
    'pinia-require-defineStore-id': piniaRequireDefineStoreId,
    'pinia-no-direct-state-mutation-outside-actions': piniaNoDirectStateMutationOutsideActions,
    'pinia-prefer-storeToRefs-destructure': piniaPreferStoreToRefsDestructure,

    // Server
    'require-validated-body': requireValidatedBody,
    'require-validated-query': requireValidatedQuery,
    'prefer-drizzle-operators': preferDrizzleOperators,
    'require-csrf-header-on-mutations': requireCsrfHeaderOnMutations,
    'no-csrf-exempt-route-misuse': noCsrfExemptRouteMisuse,
    'require-enforce-rate-limit-on-mutations': requireEnforceRateLimitOnMutations,
    'no-raw-define-event-handler-in-mutation-routes':
      noRawDefineEventHandlerInMutationRoutes,
    'require-immediate-mutation-body-validation':
      requireImmediateMutationBodyValidation,
    'no-process-env-in-worker-runtime': noProcessEnvInWorkerRuntime,
    'no-relative-server-imports': noRelativeServerImports,
    'no-direct-layer-source-imports': noDirectLayerSourceImports,

    // Architecture
    'no-module-scope-ref': noModuleScopeRef,
    'no-inline-types-in-stores': noInlineTypesInStores,
    'no-multi-statement-inline-handler': noMultiStatementInlineHandler,
    'plugin-suffix-for-browser-apis': pluginSuffixForBrowserApis,
    'no-non-serializable-store-state': noNonSerializableStoreState,
  },

  // ─── Config Presets ─────────────────────────────────────────────────────

  configs: {
    /**
     * Design system rules for Vue files
     */
    designSystem: [
      {
        name: 'narduk/design-system',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: {
          ...designSystemRules,
          ...stylingRules,
        },
      },
    ],

    /**
     * Styling-only rules for Vue files
     */
    styling: [
      {
        name: 'narduk/styling',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: stylingRules,
      },
    ],

    /**
     * Hydration safety rules for Vue files
     */
    hydration: [
      {
        name: 'narduk/hydration',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: hydrationRules,
      },
    ],

    /**
     * Starter and template-facing Vue rules
     */
    templateVue: [
      {
        name: 'narduk/template-vue',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: templateVueRules,
      },
    ],

    /**
     * Design system + styling + hydration rules for Vue files
     */
    get recommended() {
      return [
        ...plugin.configs.designSystem,
        ...plugin.configs.hydration,
        ...plugin.configs.templateVue,
      ];
    },

    /**
     * Nuxt framework guardrails that are broadly reusable
     */
    nuxtCore: [
      {
        name: 'narduk/nuxt-core',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: nuxtCoreRules,
      },
    ],

    /**
     * SEO and schema guardrails for page-level usage
     */
    seo: [
      {
        name: 'narduk/seo',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: seoRules,
      },
    ],

    /**
     * Starter and template-facing project rules
     */
    templateProject: [
      {
        name: 'narduk/template-project',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: templateProjectRules,
      },
    ],

    /**
     * Nuxt framework guardrails
     */
    get nuxt() {
      return [
        ...plugin.configs.nuxtCore,
        ...plugin.configs.seo,
        ...plugin.configs.templateProject,
      ];
    },

    /**
     * Core reusable rules for Nuxt/Vue app code that avoid starter-specific policy
     */
    get core() {
      return [
        ...plugin.configs.hydration,
        ...plugin.configs.nuxtCore,
        ...plugin.configs.vue,
        ...plugin.configs.app,
      ];
    },

    /**
     * Nuxt UI v4 component validation
     */
    nuxtUi: [
      {
        name: 'narduk/nuxt-ui',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: nuxtUiRules,
      },
    ],

    /**
     * Nuxt UI v4 component validation
     */
    get 'nuxt-ui'() {
      return plugin.configs.nuxtUi;
    },

    /**
     * Vue 3 Composition API best practices
     */
    vueCore: [
      {
        name: 'narduk/vue-core',
        plugins: {
          vue: vuePlugin,
          get narduk() {
            return plugin;
          },
        },
        rules: {
          ...vueOfficialRules,
          ...vueCoreRules,
        },
      },
    ],

    /**
     * Pinia-specific best practices
     */
    pinia: [
      {
        name: 'narduk/pinia',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: piniaRules,
      },
    ],

    /**
     * Vue 3 Composition API + Pinia best practices
     */
    get vue() {
      return [...plugin.configs.vueCore, ...plugin.configs.pinia];
    },

    /**
     * Vue strict mode — all rules set to error
     */
    'vue-strict': [
      {
        name: 'narduk/vue-strict',
        plugins: {
          vue: vuePlugin,
          get narduk() {
            return plugin;
          },
        },
        rules: {
          ...vueStrictOfficialRules,
          ...vueStrictCoreRules,
          ...piniaStrictRules,
        },
      },
    ],

    /**
     * Server-side data validation and handler structure
     */
    serverData: [
      {
        name: 'narduk/server-data',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['server/**/*.ts'],
        rules: serverDataRules,
      },
    ],

    /**
     * Auth and mutation safety rules for server handlers
     */
    auth: [
      {
        name: 'narduk/auth',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['server/**/*.ts'],
        rules: authRules,
      },
    ],

    /**
     * Runtime-safe server rules that apply outside auth concerns
     */
    serverRuntime: [
      {
        name: 'narduk/server-runtime',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['server/**/*.ts'],
        rules: serverRuntimeRules,
      },
    ],

    /**
     * Server-side validation & security rules
     */
    get server() {
      return [
        ...plugin.configs.serverData,
        ...plugin.configs.auth,
        ...plugin.configs.serverRuntime,
      ];
    },

    /**
     * Starter and layer-specific server rules
     */
    templateServer: [
      {
        name: 'narduk/template-server',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['server/**/*.ts'],
        rules: templateServerRules,
      },
    ],

    /**
     * Template-facing rules grouped for starter consumers
     */
    get template() {
      return [
        ...plugin.configs.templateProject,
        ...plugin.configs.templateVue,
        ...plugin.configs.templateServer,
      ];
    },

    /**
     * Architecture rules for composables, stores, and utils
     */
    app: [
      {
        name: 'narduk/app',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['app/composables/**/*.ts', 'app/utils/**/*.ts', 'app/stores/**/*.ts'],
        rules: appArchitectureRules,
      },
    ],

    /**
     * Everything combined — drop-in for full-stack Nuxt 4 projects
     */
    get all() {
      return [
        ...plugin.configs.core,
        ...plugin.configs.designSystem,
        ...plugin.configs.nuxtUi,
        ...plugin.configs.seo,
        ...plugin.configs.server,
        ...plugin.configs.template,
      ];
    },
  },
} as const;

export default plugin;

// Named exports for convenience
export const { configs, rules } = plugin;
