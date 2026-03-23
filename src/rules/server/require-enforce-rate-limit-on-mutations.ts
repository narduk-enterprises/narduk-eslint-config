/**
 * Require mutation API routes to call enforceRateLimit() or enforceRateLimitPolicy().
 *
 * Cloudflare per-isolate limiting is a baseline defense for all user-facing
 * mutation routes. Webhooks, cron routes, and callbacks are excluded because
 * they are protected through other mechanisms.
 */

import type { Rule } from 'eslint';

const MUTATION_ROUTE_PATTERN =
  /\/server\/api\/.+\.(post|put|patch|delete)\.(ts|js|mjs|mts|cts)$/;
const EXEMPT_ROUTE_PATTERN = /\/server\/api\/(?:webhooks|cron|callbacks)\//;
const RATE_LIMIT_CALLS = new Set(['enforceRateLimit', 'enforceRateLimitPolicy']);

function shouldCheckFile(filename: string): boolean {
  const normalized = filename.replace(/\\/g, '/');
  return MUTATION_ROUTE_PATTERN.test(normalized) && !EXEMPT_ROUTE_PATTERN.test(normalized);
}

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description:
        'require enforceRateLimit() or enforceRateLimitPolicy() in mutation API routes',
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
      missingRateLimit:
        'Mutation API routes must call enforceRateLimit() or enforceRateLimitPolicy() near the top of the handler.',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options[0] as { testMode?: boolean } | undefined;
    const filename = context.filename ?? (context as any).getFilename?.() ?? '';
    const normalized = filename.replace(/\\/g, '/');

    if (!options?.testMode && !shouldCheckFile(normalized)) {
      return {};
    }

    let hasRateLimit = false;

    return {
      CallExpression(node: any) {
        const callee = node.callee;
        if (callee?.type === 'Identifier' && RATE_LIMIT_CALLS.has(callee.name)) {
          hasRateLimit = true;
        }
      },

      'Program:exit'(node: any) {
        if (!hasRateLimit) {
          context.report({
            node,
            messageId: 'missingRateLimit',
          });
        }
      },
    };
  },
} satisfies Rule.RuleModule;
