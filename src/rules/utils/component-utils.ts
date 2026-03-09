/**
 * Utilities for component name normalization and matching
 */

/**
 * Normalize component name to PascalCase
 * Handles:
 * - <UButton> -> UButton (already PascalCase)
 * - <u-button> -> UButton (kebab-case)
 * - <ubutton> -> UButton (lowercase, no dashes)
 */
export function normalizeComponentName(name: string, prefixes: string[] = ['U']): string | null {
  // If already PascalCase (starts with uppercase), check if it matches prefix
  if (name.charAt(0) === name.charAt(0).toUpperCase() && !name.includes('-')) {
    for (const prefix of prefixes) {
      if (name.startsWith(prefix)) {
        return name;
      }
    }
    return null;
  }

  // Convert to PascalCase
  let pascalCase: string;

  if (name.includes('-')) {
    // Kebab-case: u-button -> UButton
    pascalCase = name
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join('');
  } else {
    // Lowercase without dashes: ubutton -> UButton, umodal -> UModal
    const firstChar = name.charAt(0).toUpperCase();
    const rest = name.slice(1);

    if (name.length > 1 && name.charAt(0).toLowerCase() === name.charAt(0)) {
      pascalCase = firstChar + (rest.charAt(0).toUpperCase() + rest.slice(1).toLowerCase());
    } else {
      pascalCase = firstChar + rest;
    }
  }

  // Check if it starts with any of the configured prefixes
  for (const prefix of prefixes) {
    if (pascalCase.startsWith(prefix)) {
      return pascalCase;
    }
  }

  return null;
}

/**
 * Check if a component name matches any of the configured prefixes
 */
export function isNuxtUIComponent(
  name: string,
  prefixes: string[] = ['U'],
  allowedComponents?: string[]
): boolean {
  const normalized = normalizeComponentName(name, prefixes);
  if (!normalized) return false;

  // If allowlist is provided, check against it
  if (allowedComponents) {
    return allowedComponents.includes(normalized);
  }

  return true;
}

/**
 * Normalize prop name (handle kebab-case to camelCase)
 */
export function normalizePropName(name: string): string {
  if (name.includes('-')) {
    return name
      .split('-')
      .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
      .join('');
  }
  return name;
}

/**
 * Check if prop is a boolean prop (no value or just the prop name)
 */
export function isBooleanProp(value: unknown): boolean {
  return value === null || value === undefined || value === true || value === false;
}

/**
 * Extract static string value from attribute value
 */
export function getStaticStringValue(value: any): string | null {
  if (typeof value === 'string') {
    return value;
  }
  if (value?.type === 'Literal' && typeof value.value === 'string') {
    return value.value;
  }
  if (value?.type === 'VLiteral' && typeof value.value === 'string') {
    return value.value;
  }
  return null;
}
