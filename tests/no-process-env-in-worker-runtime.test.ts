import { RuleTester } from 'eslint';
import rule from '../src/rules/server/no-process-env-in-worker-runtime';

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

ruleTester.run('no-process-env-in-worker-runtime', rule, {
  valid: [
    {
      filename: 'server/utils/config.ts',
      options: [{ testMode: true }],
      code: `const config = useRuntimeConfig(); const key = config.secretKey;`,
    },
    {
      filename: 'server/utils/config.test.ts',
      code: `const debug = process.env.NODE_ENV`,
    },
  ],
  invalid: [
    {
      filename: 'server/utils/config.ts',
      options: [{ testMode: true }],
      code: `const debug = process.env.NODE_ENV`,
      errors: [{ messageId: 'noProcessEnv' }],
    },
    {
      filename: 'server/api/foo.get.ts',
      options: [{ testMode: true }],
      code: `const debug = process.env.RUNTIME_FLAG?.trim()`,
      errors: [{ messageId: 'noProcessEnv' }],
    },
  ],
});
