import * as tsParser from '@typescript-eslint/parser';
/**
 * Tests for no-ucard-in-umodal rule
 */

import { RuleTester } from '@typescript-eslint/rule-tester';
import rule from '../src/rules/nuxt-ui/no-ucard-in-umodal';
import vueParser from 'vue-eslint-parser';

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

ruleTester.run('no-ucard-in-umodal', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><UModal><template #header>Header</template><template #body>Content</template></UModal></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><UModal>Content here directly</UModal></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><UCard>My Card</UCard></template>',
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><UModal><UCard>Content</UCard></UModal></template>',
      errors: [
        {
          messageId: 'noUCardInUModal',
        },
      ],
    },
  ],
});
