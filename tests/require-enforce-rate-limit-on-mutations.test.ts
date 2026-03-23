import { RuleTester } from 'eslint';
import rule from '../src/rules/server/require-enforce-rate-limit-on-mutations';

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

ruleTester.run('require-enforce-rate-limit-on-mutations', rule, {
  valid: [
    {
      filename: 'server/api/demo.post.ts',
      options: [{ testMode: true }],
      code: `
        export default defineEventHandler(async (event) => {
          await enforceRateLimit(event, 'api', 60, 60_000)
          return { ok: true }
        })
      `,
    },
    {
      filename: 'server/api/demo.delete.ts',
      options: [{ testMode: true }],
      code: `
        export default defineEventHandler(async (event) => {
          await enforceRateLimitPolicy(event, RATE_LIMIT_POLICIES.adminMutation)
          return { ok: true }
        })
      `,
    },
    {
      filename: 'server/api/demo.post.ts',
      options: [{ testMode: true }],
      code: `
        export default defineUserMutation(
          { rateLimit: { namespace: 'demo', maxRequests: 30, windowMs: 60_000 } },
          async ({ event, user }) => {
            return { ok: true, userId: user.id }
          },
        )
      `,
    },
    {
      filename: 'server/api/public.post.ts',
      options: [{ testMode: true }],
      code: `
        export default definePublicMutation(
          { rateLimit: { namespace: 'demo', maxRequests: 30, windowMs: 60_000 } },
          async ({ event }) => ({ ok: true }),
        )
      `,
    },
    {
      filename: 'server/api/webhooks/stripe.post.ts',
      code: `export default defineEventHandler(() => ({ ok: true }))`,
    },
  ],
  invalid: [
    {
      filename: 'server/api/demo.patch.ts',
      options: [{ testMode: true }],
      code: `export default defineEventHandler(async (event) => ({ ok: true }))`,
      errors: [{ messageId: 'missingRateLimit' }],
    },
  ],
});
