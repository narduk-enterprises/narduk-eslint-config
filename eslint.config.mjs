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

// Re-export the plugin for direct usage
export { default as nardukPlugin } from './dist/index.js';

export const sharedConfigs = [
  // Vue files: use vue-eslint-parser with TypeScript parser for script blocks
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

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.mts'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },

  // Disable all stylistic/formatting rules - Prettier handles formatting
  eslintConfigPrettier,

  // All narduk rules
  ...narduk.configs.all,

  // Global ignores
  {
    ignores: ['.nuxt/**', '.output/**', 'dist/**', 'node_modules/**', '**/*.d.ts', 'scripts/**'],
  },

  // TypeScript files - disable base no-unused-vars for interfaces
  {
    files: ['**/*.ts', '**/*.vue'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },

  // Vue rules that override or extend @nuxt/eslint defaults
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

  // Project-specific rules
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

  // Composable helpers are internal utilities, not public composables
  {
    files: ['app/composables/helpers/**/*.ts'],
    rules: {
      'narduk/require-use-prefix-for-composables': 'off',
    },
  },

  // Import ordering & hygiene
  {
    files: ['**/*.ts', '**/*.mts', '**/*.vue'],
    plugins: {
      'import-x': importX,
    },
    rules: {
      'import-x/no-duplicates': 'error',
      'import-x/no-self-import': 'error',
      'import-x/no-useless-path-segments': 'warn',
      'import-x/first': 'warn',
      'import-x/newline-after-import': 'warn',
      'import-x/no-mutable-exports': 'error',
    },
  },

  // Modern JS best practices (cherry-picked from unicorn)
  {
    files: ['**/*.ts', '**/*.mts', '**/*.vue'],
    plugins: {
      unicorn,
    },
    rules: {
      'unicorn/prefer-node-protocol': 'error',
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

  // Security rules for server-side code
  {
    files: ['server/**/*.ts'],
    plugins: {
      security,
    },
    rules: {
      'security/detect-object-injection': 'off',
      'security/detect-non-literal-regexp': 'warn',
      'security/detect-unsafe-regex': 'error',
      'security/detect-buffer-noassert': 'error',
      'security/detect-eval-with-expression': 'error',
      'security/detect-no-csrf-before-method-override': 'error',
      'security/detect-possible-timing-attacks': 'warn',
    },
  },

  // Regex validation
  regexp.configs['flat/recommended'],
];
