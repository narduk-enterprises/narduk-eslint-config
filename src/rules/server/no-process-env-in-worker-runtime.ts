/**
 * Disallow process.env access in Cloudflare Worker runtime code.
 *
 * Server files in Nuxt-on-Workers should read runtimeConfig / bindings instead
 * of relying on Node process globals.
 */

import type { Rule } from 'eslint';

function isServerRuntimeFile(filename: string): boolean {
  const normalized = filename.replace(/\\/g, '/');
  if (!normalized.includes('/server/')) return false;
  if (normalized.includes('.test.') || normalized.includes('.spec.')) return false;
  return true;
}

function isProcessEnv(node: any): boolean {
  return (
    node?.type === 'MemberExpression' &&
    node.object?.type === 'Identifier' &&
    node.object.name === 'process' &&
    ((node.property?.type === 'Identifier' && node.property.name === 'env') ||
      (node.property?.type === 'Literal' && node.property.value === 'env'))
  );
}

function startsWithProcessEnv(node: any): boolean {
  let current = node;
  while (current?.type === 'MemberExpression') {
    if (isProcessEnv(current.object)) {
      return true;
    }
    current = current.object;
  }
  return isProcessEnv(current);
}

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'disallow process.env in Cloudflare Worker runtime files',
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
      noProcessEnv:
        'Use useRuntimeConfig(), runtime bindings, or a server env helper instead of process.env in Worker runtime code.',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const options = context.options[0] as { testMode?: boolean } | undefined;
    const filename = context.filename ?? (context as any).getFilename?.() ?? '';

    if (!options?.testMode && !isServerRuntimeFile(filename)) {
      return {};
    }

    return {
      MemberExpression(node: any) {
        if (!startsWithProcessEnv(node)) return;

        const parent = node.parent;
        if (parent?.type === 'MemberExpression' && parent.object === node) {
          return;
        }

        context.report({
          node,
          messageId: 'noProcessEnv',
        });
      },
    };
  },
} satisfies Rule.RuleModule;
