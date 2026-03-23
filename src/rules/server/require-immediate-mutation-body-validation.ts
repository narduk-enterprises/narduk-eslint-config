/**
 * Require immediate validation of readBody() in mutation route files.
 *
 * readBody() is only allowed when it feeds directly into an approved parse
 * pattern such as schema.parse(await readBody(event)) or
 * schema.safeParse(await readBody(event)).
 */

import type { Rule } from 'eslint'
import {
  APPROVED_BODY_PARSE_METHODS,
  isMutationRouteFile,
  getIdentifierName,
} from './mutation-route-utils'

const EXEMPT_MUTATION_ROUTE_PATTERN = /\/server\/api\/(?:webhooks|cron|callbacks)\//

function isApprovedParseCall(node: any): boolean {
  if (node?.type !== 'CallExpression') return false
  if (node.arguments.length === 0) return false

  const callee = node.callee
  if (callee?.type !== 'MemberExpression') return false

  const methodName = getIdentifierName(callee.property)
  if (!methodName || !APPROVED_BODY_PARSE_METHODS.has(methodName)) return false

  const firstArg = node.arguments[0]
  if (!firstArg) return false

  return true
}

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description:
        'require readBody() to be immediately validated with an approved parse pattern in mutation route files',
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
      requireImmediateValidation:
        'Mutation routes must validate readBody() inline with schema.parse()/safeParse() (or async variants) before using the value.',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options[0] as { testMode?: boolean } | undefined
    const filename = context.filename ?? (context as any).getFilename?.() ?? ''
    const normalized = filename.replace(/\\/g, '/')

    if (!options?.testMode && !isMutationRouteFile(normalized)) {
      return {}
    }

    if (!options?.testMode && EXEMPT_MUTATION_ROUTE_PATTERN.test(normalized)) {
      return {}
    }

    return {
      CallExpression(node: any) {
        const callee = node.callee
        if (callee?.type !== 'Identifier' || callee.name !== 'readBody') return

        const expression = node.parent?.type === 'AwaitExpression' ? node.parent : node
        const parent = expression.parent

        if (isApprovedParseCall(parent) && parent.arguments[0] === expression) {
          return
        }

        context.report({
          node: callee,
          messageId: 'requireImmediateValidation',
        })
      },
    }
  },
} satisfies Rule.RuleModule
