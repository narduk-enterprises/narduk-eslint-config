/**
 * Rule: nuxt-ui/no-unknown-nuxt-ui-component
 *
 * Disallow usage of U-prefixed component names that are not in the official Nuxt UI v4 catalog.
 * Catches typos, removed components, and references to non-existent components.
 *
 * Source: https://ui.nuxt.com/llms.txt
 */

import type { AST } from 'vue-eslint-parser';
import { normalizeComponentName } from '../utils/component-utils';
import type { Rule } from 'eslint';

/**
 * Complete set of valid Nuxt UI v4 component names (U-prefixed PascalCase).
 * Generated from https://ui.nuxt.com/llms.txt
 */
const VALID_NUXT_UI_COMPONENTS = new Set([
  'UAccordion',
  'UAlert',
  'UApp',
  'UAuthForm',
  'UAvatar',
  'UAvatarGroup',
  'UBadge',
  'UBanner',
  'UBlogPost',
  'UBlogPosts',
  'UBreadcrumb',
  'UButton',
  'UCalendar',
  'UCard',
  'UCarousel',
  'UChangelogVersion',
  'UChangelogVersions',
  'UChatMessage',
  'UChatMessages',
  'UChatPalette',
  'UChatPrompt',
  'UChatPromptSubmit',
  'UCheckbox',
  'UCheckboxGroup',
  'UChip',
  'UCollapsible',
  'UColorModeAvatar',
  'UColorModeButton',
  'UColorModeImage',
  'UColorModeSelect',
  'UColorModeSwitch',
  'UColorPicker',
  'UCommandPalette',
  'UContainer',
  'UContentNavigation',
  'UContentSearch',
  'UContentSearchButton',
  'UContentSurround',
  'UContentToc',
  'UContextMenu',
  'UDashboardGroup',
  'UDashboardNavbar',
  'UDashboardPanel',
  'UDashboardResizeHandle',
  'UDashboardSearch',
  'UDashboardSearchButton',
  'UDashboardSidebar',
  'UDashboardSidebarCollapse',
  'UDashboardSidebarToggle',
  'UDashboardToolbar',
  'UDrawer',
  'UDropdownMenu',
  'UEditor',
  'UEditorDragHandle',
  'UEditorEmojiMenu',
  'UEditorMentionMenu',
  'UEditorSuggestionMenu',
  'UEditorToolbar',
  'UEmpty',
  'UError',
  'UFieldGroup',
  'UFileUpload',
  'UFooter',
  'UFooterColumns',
  'UForm',
  'UFormField',
  'UHeader',
  'UIcon',
  'UInput',
  'UInputDate',
  'UInputMenu',
  'UInputNumber',
  'UInputTags',
  'UInputTime',
  'UKbd',
  'ULink',
  'ULocaleSelect',
  'UMain',
  'UMarquee',
  'UModal',
  'UNavigationMenu',
  'UPage',
  'UPageAnchors',
  'UPageAside',
  'UPageBody',
  'UPageCard',
  'UPageColumns',
  'UPageCTA',
  'UPageFeature',
  'UPageGrid',
  'UPageHeader',
  'UPageHero',
  'UPageLinks',
  'UPageList',
  'UPageLogos',
  'UPageSection',
  'UPagination',
  'UPinInput',
  'UPopover',
  'UPricingPlan',
  'UPricingPlans',
  'UPricingTable',
  'UProgress',
  'URadioGroup',
  'UScrollArea',
  'USelect',
  'USelectMenu',
  'USeparator',
  'USidebar',
  'USkeleton',
  'USlideover',
  'USlider',
  'UStepper',
  'USwitch',
  'UTable',
  'UTabs',
  'UTextarea',
  'UTheme',
  'UTimeline',
  'UToast',
  'UTooltip',
  'UTree',
  'UUser',
]);

export default {
  meta: {
    type: 'problem' as const,
    docs: {
      description: 'disallow U-prefixed component names not in the Nuxt UI v4 catalog',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [
      {
        type: 'object',
        properties: {
          prefixes: { type: 'array', items: { type: 'string' }, default: ['U'] },
          additionalComponents: {
            type: 'array',
            items: { type: 'string' },
            default: [],
            description:
              'Additional U-prefixed component names to allow (e.g. project-specific custom components)',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      unknownComponent:
        'Component "{{name}}" is not a known Nuxt UI v4 component. Check for typos or remove the U prefix if this is a custom component.',
    },
  },
  create(context: Rule.RuleContext) {
    const options = context.options[0] || {};
    const prefixes = (options as { prefixes?: string[] }).prefixes || ['U'];
    const additionalComponents =
      (options as { additionalComponents?: string[] }).additionalComponents || [];

    // Build the full valid set including user-configured additions
    const validComponents = new Set(VALID_NUXT_UI_COMPONENTS);
    for (const comp of additionalComponents) {
      validComponents.add(comp);
    }

    const parserServices = context.sourceCode?.parserServices ?? (context as any).parserServices;
    if (!parserServices?.defineTemplateBodyVisitor) return {};

    return parserServices.defineTemplateBodyVisitor({
      VElement(node: AST.Node) {
        const vElement = node as AST.VElement;
        const startTag = vElement.startTag as any;
        if (!startTag?.range) return;

        // Extract the original tag name from source to preserve PascalCase casing.
        // The vue-eslint-parser lowercases tag names (e.g. UDashboardSidebar → udashboardsidebar),
        // making multi-segment PascalCase recovery impossible via string manipulation.
        const sourceCode = context.sourceCode ?? (context as any).getSourceCode();
        const startText = sourceCode.getText(startTag);
        const originalTagName = startText.slice(1).split(/[\s/>]/)[0];
        if (!originalTagName) return;

        const normalized = normalizeComponentName(originalTagName, prefixes);
        if (!normalized) return;

        // Check if this normalized name is in the valid set
        if (!validComponents.has(normalized)) {
          context.report({
            node: vElement as any,
            messageId: 'unknownComponent',
            data: { name: normalized },
          });
        }
      },
    });
  },
};
