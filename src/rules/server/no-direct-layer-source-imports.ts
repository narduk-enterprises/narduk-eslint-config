/**
 * Ban direct filesystem imports into layers/narduk-nuxt-layer and prefer #layer aliases.
 */

import type { Rule } from 'eslint';

const LAYER_SEGMENT = 'layers/narduk-nuxt-layer/';

function getLayerAlias(importSource: string): string | null {
  const normalized = importSource.replace(/\\/g, '/');
  const index = normalized.indexOf(LAYER_SEGMENT);
  if (index === -1) return null;

  let suffix = normalized.slice(index + LAYER_SEGMENT.length);
  suffix = suffix.replace(/\.(ts|js|mjs|mts|cts|cjs)$/, '');
  suffix = suffix.replace(/\/index$/, '');

  return suffix ? `#layer/${suffix}` : null;
}

function reportIfNeeded(context: Rule.RuleContext, node: any, sourceNode: any): void {
  if (!sourceNode || sourceNode.type !== 'Literal' || typeof sourceNode.value !== 'string') {
    return;
  }

  const aliasTarget = getLayerAlias(sourceNode.value);
  if (!aliasTarget) return;

  context.report({
    node,
    messageId: 'useLayerAlias',
    data: { aliasTarget },
    fix(fixer) {
      const quote = sourceNode.raw?.startsWith('"') ? '"' : '\'';
      return fixer.replaceText(sourceNode, `${quote}${aliasTarget}${quote}`);
    },
  });
}

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'require #layer aliases instead of direct layer filesystem imports',
      recommended: true,
    },
    fixable: 'code' as const,
    schema: [],
    messages: {
      useLayerAlias:
        'Use {{ aliasTarget }} instead of importing layer source files by filesystem path.',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    return {
      ImportDeclaration(node: any) {
        reportIfNeeded(context, node, node.source);
      },
      ExportAllDeclaration(node: any) {
        reportIfNeeded(context, node, node.source);
      },
      ExportNamedDeclaration(node: any) {
        reportIfNeeded(context, node, node.source);
      },
    };
  },
} satisfies Rule.RuleModule;
