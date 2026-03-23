/**
 * Require #server aliases for imports that resolve back into server/.
 */

import { dirname, resolve } from 'path';
import type { Rule } from 'eslint';

const SERVER_SEGMENT = '/server/';

function normalizePath(value: string): string {
  return value.replace(/\\/g, '/');
}

function getAliasTarget(filename: string, importSource: string): string | null {
  if (!importSource.startsWith('../')) return null;

  const absolute = normalizePath(resolve(dirname(filename), importSource));
  const serverIndex = absolute.lastIndexOf(SERVER_SEGMENT);
  if (serverIndex === -1) return null;

  let suffix = absolute.slice(serverIndex + SERVER_SEGMENT.length);
  suffix = suffix.replace(/\.(ts|js|mjs|mts|cts|cjs)$/, '');
  suffix = suffix.replace(/\/index$/, '');

  return suffix ? `#server/${suffix}` : null;
}

function maybeFix(fixer: Rule.RuleFixer, sourceNode: any, aliasTarget: string): Rule.Fix {
  const quote = sourceNode.raw?.startsWith('"') ? '"' : '\'';
  return fixer.replaceText(sourceNode, `${quote}${aliasTarget}${quote}`);
}

function checkSource(
  context: Rule.RuleContext,
  sourceNode: any,
  ruleNode: any,
): void {
  if (!sourceNode || sourceNode.type !== 'Literal' || typeof sourceNode.value !== 'string') {
    return;
  }

  const filename = context.filename ?? (context as any).getFilename?.() ?? '';
  const aliasTarget = getAliasTarget(filename, sourceNode.value);
  if (!aliasTarget) return;

  context.report({
    node: ruleNode,
    messageId: 'useServerAlias',
    data: { aliasTarget },
    fix(fixer) {
      return maybeFix(fixer, sourceNode, aliasTarget);
    },
  });
}

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'require #server aliases for imports that resolve into server/',
      recommended: true,
    },
    fixable: 'code' as const,
    schema: [],
    messages: {
      useServerAlias:
        'Use {{ aliasTarget }} instead of a relative import when importing code that resolves into server/.',
    },
  },

  create(context: Rule.RuleContext): Rule.RuleListener {
    const filename = context.filename ?? (context as any).getFilename?.() ?? '';
    if (!normalizePath(filename).includes(SERVER_SEGMENT)) {
      return {};
    }

    return {
      ImportDeclaration(node: any) {
        checkSource(context, node.source, node);
      },
      ExportAllDeclaration(node: any) {
        checkSource(context, node.source, node);
      },
      ExportNamedDeclaration(node: any) {
        checkSource(context, node.source, node);
      },
    };
  },
} satisfies Rule.RuleModule;
