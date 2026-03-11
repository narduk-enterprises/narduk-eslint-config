/**
 * Rule: nuxt-ui/no-ucard-in-umodal
 *
 * Warns against using UCard directly inside of a UModal.
 * Enforces use of the Nuxt UI 4 native slots: #header, #body, #footer.
 */

import type { AST } from 'vue-eslint-parser';
import type { Rule } from 'eslint';

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'disallow nesting UCard inside UModal in favor of direct slots',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: undefined,
    schema: [],
    messages: {
      noUCardInUModal:
        'Do not nest UCard inside UModal. Nuxt UI 4 uses a slot-based architecture directly on UModal. Use #header, #body, and #footer slots instead.',
    },
  },
  create(context: Rule.RuleContext) {
    const parserServices = context.sourceCode?.parserServices as any;
    if (!parserServices || !parserServices.defineTemplateBodyVisitor) {
      return {};
    }

    let uModalCount = 0;

    return parserServices.defineTemplateBodyVisitor({
      VElement(node: AST.Node) {
        const vElement = node as AST.VElement;
        const name = (vElement as any).rawName || vElement.name;

        if (name === 'UModal' || name === 'u-modal') {
          uModalCount++;
        }

        if (name === 'UCard' || name === 'u-card') {
          if (uModalCount > 0) {
            context.report({
              node: vElement.startTag,
              messageId: 'noUCardInUModal',
            });
          }
        }
      },
      'VElement:exit'(node: AST.Node) {
        const vElement = node as AST.VElement;
        const name = (vElement as any).rawName || vElement.name;

        if (name === 'UModal' || name === 'u-modal') {
          uModalCount--;
        }
      },
    });
  },
};
