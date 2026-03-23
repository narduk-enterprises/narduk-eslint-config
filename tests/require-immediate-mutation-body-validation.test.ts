/**
 * Tests for require-immediate-mutation-body-validation rule
 */

import { RuleTester } from 'eslint'
import rule from '../src/rules/server/require-immediate-mutation-body-validation'

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

ruleTester.run('require-immediate-mutation-body-validation', rule, {
  valid: [
    {
      filename: 'server/api/users.post.ts',
      options: [{ testMode: true }],
      code: `
        const result = schema.safeParse(await readBody(event))
        if (!result.success) throw createError({ statusCode: 400 })
      `,
    },
    {
      filename: 'server/api/admin/users.put.ts',
      options: [{ testMode: true }],
      code: `
        const body = schema.parse(await readBody(event))
        body
      `,
    },
    {
      filename: 'server/api/webhooks/stripe.post.ts',
      code: `const body = await readBody(event)`,
    },
    {
      filename: 'server/api/users.get.ts',
      code: `const body = await readBody(event)`,
    },
  ],
  invalid: [
    {
      filename: 'server/api/users.post.ts',
      options: [{ testMode: true }],
      code: `const body = await readBody(event)`,
      errors: [{ messageId: 'requireImmediateValidation' }],
    },
    {
      filename: 'server/api/users.patch.ts',
      options: [{ testMode: true }],
      code: `
        const body = await readBody(event)
        const parsed = schema.safeParse(body)
      `,
      errors: [{ messageId: 'requireImmediateValidation' }],
    },
    {
      filename: 'server/api/admin/users.delete.ts',
      options: [{ testMode: true }],
      code: `
        const body = await readBody(event)
        schema.parse({ body })
      `,
      errors: [{ messageId: 'requireImmediateValidation' }],
    },
  ],
})
