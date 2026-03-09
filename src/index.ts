/**
 * @narduk-enterprises/eslint-config
 *
 * Consolidated ESLint plugin for Nuxt 4, Vue 3, Tailwind v4, and Nuxt UI v4 projects.
 * 67 custom rules organized into 8 categories with multiple config presets.
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

// === Nuxt UI v4 rules (8) ===
import noUnknownComponentProp from './rules/nuxt-ui/no-unknown-component-prop';
import noDeprecatedComponent from './rules/nuxt-ui/no-deprecated-component';
import noDeprecatedProp from './rules/nuxt-ui/no-deprecated-prop';
import noDeprecatedSlot from './rules/nuxt-ui/no-deprecated-slot';
import noDeprecatedEvent from './rules/nuxt-ui/no-deprecated-event';
import requireValidVariantValues from './rules/nuxt-ui/require-valid-variant-values';
import preferUform from './rules/nuxt-ui/prefer-uform';
import preferLoadingAuto from './rules/nuxt-ui/prefer-loading-auto';

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

// === Server-side rules (5) ===
// @ts-ignore
import requireValidatedBody from './rules/server/require-validated-body.mjs';
// @ts-ignore
import requireValidatedQuery from './rules/server/require-validated-query.mjs';
// @ts-ignore
import preferDrizzleOperators from './rules/server/prefer-drizzle-operators.mjs';
import requireCsrfHeaderOnMutations from './rules/server/require-csrf-header-on-mutations';
import noCsrfExemptRouteMisuse from './rules/server/no-csrf-exempt-route-misuse';

// === Architecture rules (5) ===
// @ts-ignore
import noModuleScopeRef from './rules/architecture/no-module-scope-ref.mjs';
// @ts-ignore
import noInlineTypesInStores from './rules/architecture/no-inline-types-in-stores.mjs';
// @ts-ignore
import noMultiStatementInlineHandler from './rules/architecture/no-multi-statement-inline-handler.mjs';
import pluginSuffixForBrowserApis from './rules/architecture/plugin-suffix-for-browser-apis';
import noNonSerializableStoreState from './rules/architecture/no-non-serializable-store-state';

// ─── Plugin Definition ──────────────────────────────────────────────────────

const plugin = {
  meta: {
    name: '@narduk-enterprises/eslint-config',
    version: '1.0.0',
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
    'no-deprecated-component': noDeprecatedComponent,
    'no-deprecated-prop': noDeprecatedProp,
    'no-deprecated-slot': noDeprecatedSlot,
    'no-deprecated-event': noDeprecatedEvent,
    'require-valid-variant-values': requireValidVariantValues,
    'prefer-uform': preferUform,
    'prefer-loading-auto': preferLoadingAuto,

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
     * Design system + styling + hydration rules for Vue files
     */
    recommended: [
      {
        name: 'narduk/recommended',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: {
          // Design System
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
          // Styling
          'narduk/no-raw-tailwind-colors': 'error',
          'narduk/no-tailwind-v3-deprecated': 'error',
          'narduk/no-invalid-nuxt-ui-token': 'error',
          'narduk/no-inline-hex': 'error',
          'narduk/no-style-block-layout': ['error', { max: 50 }],
          'narduk/no-apply-in-scoped-style': 'error',
          'narduk/lucide-icons-only': 'error',
          // Hydration
          'narduk/require-client-only-switch': 'error',
          'narduk/no-attrs-on-fragment': 'error',
          'narduk/require-client-only-hydration-sensitive': 'warn',
          'narduk/no-ssr-dom-access': 'error',
          'narduk/no-composable-dom-access-without-client-guard': 'error',
          // Template
          'narduk/no-multi-statement-inline-handler': 'error',
        },
      },
    ],

    /**
     * Nuxt framework guardrails
     */
    nuxt: [
      {
        name: 'narduk/nuxt',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: {
          'narduk/no-legacy-head': 'warn',
          'narduk/no-legacy-fetch-hook': 'error',
          'narduk/no-raw-fetch': 'error',
          'narduk/no-raw-fetch-in-stores': 'error',
          'narduk/no-fetch-create-bypass': 'error',
          'narduk/prefer-import-meta-client': 'warn',
          'narduk/prefer-import-meta-dev': 'warn',
          'narduk/valid-useAsyncData': 'warn',
          'narduk/valid-useFetch': 'warn',
          'narduk/app-structure-consistency': 'warn',
          'narduk/require-use-seo-on-pages': 'warn',
          'narduk/prefer-use-seo-over-bare-meta': 'warn',
          'narduk/require-schema-on-pages': 'warn',
          'narduk/no-map-async-in-server': 'warn',
        },
      },
    ],

    /**
     * Nuxt UI v4 component validation
     */
    'nuxt-ui': [
      {
        name: 'narduk/nuxt-ui',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['**/*.vue'],
        rules: {
          'narduk/no-unknown-component-prop': 'error',
          'narduk/no-deprecated-component': 'error',
          'narduk/no-deprecated-prop': 'error',
          'narduk/no-deprecated-slot': 'error',
          'narduk/no-deprecated-event': 'error',
          'narduk/require-valid-variant-values': 'error',
          'narduk/prefer-uform': 'warn',
          'narduk/prefer-loading-auto': 'warn',
        },
      },
    ],

    /**
     * Vue 3 Composition API + Pinia best practices
     */
    vue: [
      {
        name: 'narduk/vue',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: {
          // Official vue/ equivalents for removed duplicates
          'vue/component-api-style': ['warn', ['script-setup']],
          'vue/no-async-in-computed-properties': 'error',
          'vue/define-props-declaration': ['error', 'type-based'],
          'vue/define-emits-declaration': ['error', 'type-based'],
          // Custom narduk rules
          'narduk/no-setup-top-level-side-effects': 'error',
          'narduk/prefer-shallow-watch': 'warn',
          'narduk/no-template-complex-expressions': 'warn',
          'narduk/prefer-typed-defineprops': 'warn',
          'narduk/require-use-prefix-for-composables': 'warn',
          'narduk/no-composable-conditional-hooks': 'warn',
          'narduk/pinia-require-defineStore-id': 'error',
          'narduk/pinia-no-direct-state-mutation-outside-actions': 'warn',
          'narduk/pinia-prefer-storeToRefs-destructure': 'warn',
        },
      },
    ],

    /**
     * Vue strict mode — all rules set to error
     */
    'vue-strict': [
      {
        name: 'narduk/vue-strict',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        rules: {
          // Official vue/ equivalents — strict
          'vue/component-api-style': ['error', ['script-setup']],
          'vue/no-async-in-computed-properties': 'error',
          'vue/define-props-declaration': ['error', 'type-based'],
          'vue/define-emits-declaration': ['error', 'type-based'],
          // Custom narduk rules — all error
          'narduk/no-setup-top-level-side-effects': 'error',
          'narduk/prefer-shallow-watch': 'error',
          'narduk/no-template-complex-expressions': 'error',
          'narduk/prefer-typed-defineprops': 'error',
          'narduk/require-use-prefix-for-composables': 'error',
          'narduk/no-composable-conditional-hooks': 'error',
          'narduk/pinia-require-defineStore-id': 'error',
          'narduk/pinia-no-direct-state-mutation-outside-actions': 'error',
          'narduk/pinia-prefer-storeToRefs-destructure': 'error',
        },
      },
    ],

    /**
     * Server-side validation & security rules
     */
    server: [
      {
        name: 'narduk/server',
        plugins: {
          get narduk() {
            return plugin;
          },
        },
        files: ['server/**/*.ts'],
        rules: {
          'narduk/require-validated-body': 'error',
          'narduk/require-validated-query': 'error',
          'narduk/prefer-drizzle-operators': 'error',
          'narduk/require-csrf-header-on-mutations': 'error',
          'narduk/no-csrf-exempt-route-misuse': 'warn',
        },
      },
    ],

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
        rules: {
          'narduk/no-module-scope-ref': 'warn',
          'narduk/no-inline-types-in-stores': 'warn',
          'narduk/plugin-suffix-for-browser-apis': 'error',
          'narduk/no-non-serializable-store-state': 'warn',
        },
      },
    ],

    /**
     * Everything combined — drop-in for full-stack Nuxt 4 projects
     */
    get all() {
      return [
        ...plugin.configs.recommended,
        ...plugin.configs.nuxt,
        ...plugin.configs['nuxt-ui'],
        ...plugin.configs.vue,
        ...plugin.configs.server,
        ...plugin.configs.app,
      ];
    },
  },
} as const;

export default plugin;

// Named exports for convenience
export const { configs, rules } = plugin;
