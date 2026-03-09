/**
 * Rule: nuxt-ui/prefer-uform
 *
 * Warns when using native <form> element instead of <UForm>
 * UForm provides validation, loading-auto, and better integration
 */

import type { AST } from 'vue-eslint-parser';
import type { Rule } from 'eslint';

export default {
  meta: {
    type: 'suggestion' as const,
    docs: {
      description: 'prefer UForm over native form element for better Nuxt UI integration',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: 'code' as const,
    schema: [],
    messages: {
      preferUForm:
        'Use <UForm> instead of native <form> for validation and loading-auto support. See: https://ui.nuxt.com/components/form',
    },
  },
  create(context: Rule.RuleContext) {
    const parserServices = context.sourceCode?.parserServices as any;
    if (!parserServices || !parserServices.defineTemplateBodyVisitor) {
      return {};
    }

    return parserServices.defineTemplateBodyVisitor({
      VElement(node: AST.Node) {
        const vElement = node as AST.VElement;

        // Check if it's a native form element
        if (vElement.name === 'form') {
          context.report({
            node: vElement.startTag,
            messageId: 'preferUForm',
          });
        }
      },
    });
  },
};
