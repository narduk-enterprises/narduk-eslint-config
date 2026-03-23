/**
 * Shared mutation-route guardrail helpers.
 *
 * These helpers keep the mutation-rule surface consistent across wrapper,
 * rate-limit, CSRF, and body-validation checks.
 */

export const MUTATION_ROUTE_PATTERN =
  /\/server\/api\/.+\.(post|put|patch|delete)\.(ts|js|mjs|mts|cts)$/

export const APPROVED_MUTATION_WRAPPERS = new Set([
  'defineAdminMutation',
  'definePublicMutation',
  'defineUserMutation',
  'defineCallbackMutation',
  'defineWebhookMutation',
  'defineCronMutation',
])

export const APPROVED_BODY_PARSE_METHODS = new Set([
  'parse',
  'parseAsync',
  'safeParse',
  'safeParseAsync',
])

export function normalizePath(filename: string): string {
  return filename.replace(/\\/g, '/')
}

export function isMutationRouteFile(filename: string): boolean {
  return MUTATION_ROUTE_PATTERN.test(normalizePath(filename))
}

export function getIdentifierName(node: any): string | null {
  if (!node) return null
  if (node.type === 'Identifier') return node.name
  if (node.type === 'Literal' && typeof node.value === 'string') return node.value
  return null
}
