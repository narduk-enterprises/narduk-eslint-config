/**
 * Forbid raw defineEventHandler() usage in mutation route files.
 *
 * Mutation routes should be declared with one of the approved wrapper helpers:
 * defineAdminMutation(), defineUserMutation(), defineWebhookMutation(), or
 * defineCronMutation().
 */

import type { Rule } from 'eslint'
import { isMutationRouteFile } from './mutation-route-utils'

const RAW_HANDLER_NAME = 'defineEventHandler'

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description:
        'require approved mutation wrapper helpers instead of raw defineEventHandler() in mutation route files',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          testMode: { type: 'boolean', default: false },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      useMutationWrapper:
        'Mutation routes must use defineAdminMutation(), defineUserMutation(), defineWebhookMutation(), or defineCronMutation() instead of raw defineEventHandler().',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options[0] as { testMode?: boolean } | undefined
    const filename = context.filename ?? (context as any).getFilename?.() ?? ''
    const normalized = filename.replace(/\\/g, '/')

    if (!options?.testMode && !isMutationRouteFile(normalized)) {
      return {}
    }

    return {
      CallExpression(node: any) {
        const callee = node.callee
        if (callee?.type !== 'Identifier') return

        if (callee.name === RAW_HANDLER_NAME) {
          context.report({
            node: callee,
            messageId: 'useMutationWrapper',
          })
        }
      },
    }
  },
} satisfies Rule.RuleModule
