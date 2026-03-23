import { RuleTester } from 'eslint';
import rule from '../src/rules/server/no-relative-server-imports';

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

ruleTester.run('no-relative-server-imports', rule, {
  valid: [
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `import { helper } from './helper'`,
    },
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `import { z } from 'zod'`,
    },
    {
      filename: '/repo/layers/narduk-nuxt-layer/server/api/foo.get.ts',
      code: `import { helper } from '../utils/helper'`,
    },
  ],
  invalid: [
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `import { helper } from '../shared/helper'`,
      output: `import { helper } from '#server/shared/helper'`,
      errors: [{ messageId: 'useServerAlias' }],
    },
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `import { users } from '../database/schema'`,
      output: `import { users } from '#server/database/schema'`,
      errors: [{ messageId: 'useServerAlias' }],
    },
    {
      filename: '/repo/apps/web/server/api/foo.get.ts',
      code: `export * from '../utils/database'`,
      output: `export * from '#server/utils/database'`,
      errors: [{ messageId: 'useServerAlias' }],
    },
  ],
});
