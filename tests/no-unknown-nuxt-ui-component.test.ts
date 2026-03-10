/**
 * Tests for no-unknown-nuxt-ui-component rule
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../src/rules/nuxt-ui/no-unknown-nuxt-ui-component';
import vueParser from 'vue-eslint-parser';
import * as tsParser from '@typescript-eslint/parser';

import { describe, it, afterAll } from 'vitest';
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.afterAll = afterAll;

const ruleTester = new RuleTester({
  languageOptions: {
    parser: vueParser,
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: tsParser,
    },
  },
});

ruleTester.run('no-unknown-nuxt-ui-component', rule, {
  valid: [
    // Known Nuxt UI components — PascalCase
    {
      filename: 'test.vue',
      code: '<template><UButton>Click</UButton></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><UModal /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><USlider v-model="val" :min="1" :max="100" /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><UDashboardSidebar /></template>',
    },
    // Known Nuxt UI components — kebab-case
    {
      filename: 'test.vue',
      code: '<template><u-button>Click</u-button></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><u-modal /></template>',
    },
    // Non-U-prefixed components — ignored entirely
    {
      filename: 'test.vue',
      code: '<template><MyCustomComponent /></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><NuxtPage /></template>',
    },
    // Native HTML elements — ignored
    {
      filename: 'test.vue',
      code: '<template><div>hello</div></template>',
    },
    // additionalComponents option allows custom U-prefixed components
    {
      filename: 'test.vue',
      code: '<template><UFoo /></template>',
      options: [{ additionalComponents: ['UFoo'] }],
    },
  ],
  invalid: [
    // Completely made up component — PascalCase
    {
      filename: 'test.vue',
      code: '<template><UFancyThing /></template>',
      errors: [{ messageId: 'unknownComponent', data: { name: 'UFancyThing' } }],
    },
    // Completely made up component — kebab-case
    {
      filename: 'test.vue',
      code: '<template><u-fancy-thing /></template>',
      errors: [{ messageId: 'unknownComponent', data: { name: 'UFancyThing' } }],
    },
    // Removed v3 component that does not exist in v4
    {
      filename: 'test.vue',
      code: '<template><URange v-model="val" /></template>',
      errors: [{ messageId: 'unknownComponent', data: { name: 'URange' } }],
    },
    // Removed v3 component — kebab-case
    {
      filename: 'test.vue',
      code: '<template><u-range v-model="val" /></template>',
      errors: [{ messageId: 'unknownComponent', data: { name: 'URange' } }],
    },
    // Typo in known component
    {
      filename: 'test.vue',
      code: '<template><UButon /></template>',
      errors: [{ messageId: 'unknownComponent', data: { name: 'UButon' } }],
    },
    // additionalComponents does NOT allowlist components not explicitly listed
    {
      filename: 'test.vue',
      code: '<template><UBar /></template>',
      options: [{ additionalComponents: ['UFoo'] }],
      errors: [{ messageId: 'unknownComponent', data: { name: 'UBar' } }],
    },
  ],
});
