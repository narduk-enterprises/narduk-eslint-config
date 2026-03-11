// @ts-check
// Full shared ESLint configuration with community plugins.
// Usage:
//   import withNuxt from './.nuxt/eslint.config.mjs'
//   import { sharedConfigs } from '@narduk-enterprises/eslint-config/config'
//   export default withNuxt(...sharedConfigs)

import vueParser from 'vue-eslint-parser';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import narduk from './dist/index.js';
import importX from 'eslint-plugin-import-x';
import unicorn from 'eslint-plugin-unicorn';
import security from 'eslint-plugin-security';
import regexp from 'eslint-plugin-regexp';
import vitest from 'eslint-plugin-vitest';
import promise from 'eslint-plugin-promise';
import eslintComments from 'eslint-plugin-eslint-comments';
import noOnlyTests from 'eslint-plugin-no-only-tests';

// Re-export the plugin for direct usage
export { default as nardukPlugin } from './dist/index.js';

export const sharedConfigs = [
  // ─── Parser: Vue files ────────────────────────────────────────────────
  // Use vue-eslint-parser with TypeScript parser for script blocks
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },

  // ─── Parser: TypeScript files ─────────────────────────────────────────
  {
    files: ['**/*.ts', '**/*.mts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },

  // ─── Prettier ─────────────────────────────────────────────────────────
  // Disable all stylistic/formatting rules — Prettier handles formatting
  eslintConfigPrettier,

  // ─── Narduk custom rules ──────────────────────────────────────────────
  ...narduk.configs.all,

  // ─── Global ignores ───────────────────────────────────────────────────
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**', '**/*.d.ts', 'scripts/**'],
  },

  // ─── TypeScript overrides ─────────────────────────────────────────────
  // Disable base no-unused-vars for interfaces
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },

  // ─── Vue rules ────────────────────────────────────────────────────────
  // Override or extend @nuxt/eslint defaults
  {
    files: ['**/*.vue'],
    rules: {
      'vue/component-name-in-template-casing': [
        'warn',
        'PascalCase',
        { registeredComponentsOnly: false },
      ],
      'vue/prefer-define-options': 'warn',
      'vue/prefer-import-from-vue': 'warn',
      'vue/block-order': ['warn', { order: ['script', 'template', 'style'] }],
      'vue/attributes-order': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-for-template-key': 'off',
      'vue/no-v-html': 'warn',
    },
  },

  // ─── Project-level TypeScript rules ───────────────────────────────────
  {
    rules: {
      'no-unused-vars': 'off',
      'no-debugger': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  // ─── Composable helpers bypass ────────────────────────────────────────
  // Internal utilities, not public composables
  {
    files: ['app/composables/helpers/**/*.ts'],
    rules: {
      'narduk/require-use-prefix-for-composables': 'off',
    },
  },

  // ─── Import ordering & correctness ────────────────────────────────────
  // NOTE: import-x/no-unresolved is intentionally NOT enabled.
  // Nuxt auto-imports and aliases (#imports, ~, @) produce false positives
  // with that rule. Nuxt's own TypeScript integration handles resolution.
  {
    files: ['**/*.ts', '**/*.mts', '**/*.vue'],
    plugins: {
      'import-x': importX,
    },
    rules: {
      // Ordering & hygiene
      'import-x/no-duplicates': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-mutable-exports': 'error',

      // Correctness — catch broken imports early
      'import-x/named': 'error',
      'import-x/default': 'error',
      'import-x/export': 'error',
      'import-x/no-cycle': 'warn',
    },
  },

  // ─── Modern JS best practices (unicorn) ───────────────────────────────
  // NOTE: unicorn/prefer-node-protocol is NOT here — it is scoped to
  // Node-only files below to avoid false positives in edge environments.
  {
    files: ['**/*.ts', '**/*.mts', '**/*.vue'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/no-array-for-each': 'warn',
      'unicorn/prefer-at': 'warn',
      'unicorn/no-useless-undefined': 'warn',
      'unicorn/prefer-string-replace-all': 'warn',
      'unicorn/prefer-number-properties': 'warn',
      'unicorn/no-lonely-if': 'warn',
      'unicorn/prefer-array-find': 'warn',
      'unicorn/prefer-includes': 'warn',
      'unicorn/no-instanceof-array': 'error',
      'unicorn/throw-new-error': 'error',
    },
  },

  // ─── Node-only files: prefer node: protocol ──────────────────────────
  // These files run in Node.js, not Cloudflare edge. It is safe to
  // require the node: protocol prefix here.
  {
    files: ['scripts/**/*.ts', '*.config.{js,ts,mjs}', 'server/**/*.ts'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/prefer-node-protocol': 'error',
    },
  },

  // ─── Cloudflare Edge Runtime Safety ───────────────────────────────────
  // Server API/route handlers run on Cloudflare Workers (edge runtime).
  // Node-only built-in modules are not available and will fail at runtime.
  {
    files: ['server/api/**/*.ts', 'server/routes/**/*.ts', 'server/functions/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            { name: 'fs', message: 'fs is not available in Cloudflare Workers.' },
            { name: 'net', message: 'net is not available in Cloudflare Workers.' },
            { name: 'tls', message: 'tls is not available in Cloudflare Workers.' },
            { name: 'child_process', message: 'child_process is not available in Cloudflare Workers.' },
            { name: 'cluster', message: 'cluster is not available in Cloudflare Workers.' },
            { name: 'worker_threads', message: 'worker_threads is not available in Cloudflare Workers.' },
          ],
        },
      ],
    },
  },

  // ─── Promise safety ───────────────────────────────────────────────────
  {
    files: ['**/*.ts', '**/*.mts', '**/*.vue'],
    plugins: {
      promise,
    },
    rules: {
      'promise/always-return': 'warn',
      'promise/no-return-wrap': 'error',
      'promise/catch-or-return': 'warn',
    },
  },

  // ─── ESLint directive hygiene ─────────────────────────────────────────
  // Prevent stale disable comments and encourage documenting suppressions
  {
    plugins: {
      'eslint-comments': eslintComments,
    },
    rules: {
      'eslint-comments/no-unused-disable': 'error',
      'eslint-comments/require-description': 'warn',
    },
  },

  // ─── Vitest test linting ──────────────────────────────────────────────
  {
    files: ['**/*.test.ts', '**/*.spec.ts', 'tests/**/*.ts'],
    plugins: {
      vitest,
      'no-only-tests': noOnlyTests,
    },
    languageOptions: {
      globals: {
        describe: 'readonly',
        it: 'readonly',
        test: 'readonly',
        expect: 'readonly',
      },
    },
    rules: {
      // Vitest best practices
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/expect-expect': 'warn',

      // Prevent accidental .only commits
      'no-only-tests/no-only-tests': 'error',
    },
  },

  // ─── Security: lightweight server-side safeguard ──────────────────────
  // Limited to server code only. We keep this minimal to avoid excessive
  // false positives. detect-object-injection is intentionally disabled
  // as it flags nearly all bracket notation with false positives.
  {
    files: ['server/**/*.ts'],
    plugins: {
      security,
    },
    rules: {
      'security/detect-non-literal-fs-filename': 'warn',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-object-injection': 'off',
    },
  },

  // ─── Regex validation ─────────────────────────────────────────────────
  regexp.configs['flat/recommended'],
];
