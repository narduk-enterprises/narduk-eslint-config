import { RuleTester } from 'eslint';
import rule from '../src/rules/server/no-direct-layer-source-imports';

import { afterAll, describe, it } from 'vitest';
RuleTester.describe = describe;
RuleTester.it = it;
RuleTester.afterAll = afterAll;

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
});

ruleTester.run('no-direct-layer-source-imports', rule, {
  valid: [
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `import { useR2 } from '#layer/server/utils/r2'`,
    },
  ],
  invalid: [
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `import { useR2 } from '../../../../../../layers/narduk-nuxt-layer/server/utils/r2'`,
      output: `import { useR2 } from '#layer/server/utils/r2'`,
      errors: [{ messageId: 'useLayerAlias' }],
    },
  ],
});
