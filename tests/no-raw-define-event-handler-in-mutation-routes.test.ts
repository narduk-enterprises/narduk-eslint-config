/**
 * Tests for no-raw-define-event-handler-in-mutation-routes rule
 */

import { RuleTester } from 'eslint'
import rule from '../src/rules/server/no-raw-define-event-handler-in-mutation-routes'

import { afterAll, describe, it } from 'vitest'
RuleTester.describe = describe
RuleTester.it = it
RuleTester.afterAll = afterAll

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
  },
})

ruleTester.run('no-raw-define-event-handler-in-mutation-routes', rule, {
  valid: [
    {
      filename: 'server/api/users.post.ts',
      options: [{ testMode: true }],
      code: `export default defineUserMutation(async (event) => ({ ok: true }))`,
    },
    {
      filename: 'server/api/webhooks/stripe.post.ts',
      options: [{ testMode: true }],
      code: `export default defineWebhookMutation(async (event) => ({ ok: true }))`,
    },
    {
      filename: 'server/api/users.get.ts',
      code: `export default defineEventHandler(() => ({ ok: true }))`,
    },
  ],
  invalid: [
    {
      filename: 'server/api/users.post.ts',
      options: [{ testMode: true }],
      code: `export default defineEventHandler(async (event) => ({ ok: true }))`,
      errors: [{ messageId: 'useMutationWrapper' }],
    },
    {
      filename: 'server/api/admin/users.put.ts',
      options: [{ testMode: true }],
      code: `
        const handler = defineEventHandler(async () => ({ ok: true }))
        export default handler
      `,
      errors: [{ messageId: 'useMutationWrapper' }],
    },
  ],
})
