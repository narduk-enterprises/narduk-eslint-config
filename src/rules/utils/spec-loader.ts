/**
 * Load and parse Nuxt 4 and Nuxt UI specifications
 */

import type { Nuxt4Spec, NuxtUISpec, ComponentSpec, ApiSpec, DeprecationSpec } from '../types';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in a way that works for both ESM and CJS
function getDirname(): string {
  try {
    // ESM
    return dirname(fileURLToPath(import.meta.url));
  } catch {
    // CJS fallback
    try {
      return __dirname;
    } catch {
      return process.cwd();
    }
  }
}

const __dirname = getDirname();

// === Nuxt 4 Spec Loading ===

let cachedNuxtSpec: Nuxt4Spec | null = null;

/**
 * Load the Nuxt 4 spec from the generated JSON file
 */
export function loadSpec(specPath?: string): Nuxt4Spec {
  if (cachedNuxtSpec) {
    return cachedNuxtSpec;
  }

  const possiblePaths = [
    specPath,
    join(__dirname, '../spec/nuxt4-spec.json'),
    join(__dirname, '../../spec/nuxt4-spec.json'),
    join(__dirname, '../../src/rules/spec/nuxt4-spec.json'),
    join(process.cwd(), 'src/rules/spec/nuxt4-spec.json'),
  ].filter(Boolean) as string[];

  let path: string | null = null;
  for (const p of possiblePaths) {
    if (existsSync(p)) {
      path = p;
      break;
    }
  }

  if (!path) {
    return {
      version: '4.2.2',
      generatedAt: new Date().toISOString(),
      apis: {},
      deprecations: {},
    };
  }

  const content = readFileSync(path, 'utf-8');
  cachedNuxtSpec = JSON.parse(content) as Nuxt4Spec;

  return cachedNuxtSpec;
}

/**
 * Get spec for a specific API
 */
export function getApiSpec(apiName: string, specPath?: string): ApiSpec | null {
  const spec = loadSpec(specPath);
  return spec.apis[apiName] || null;
}

/**
 * Get deprecation info for a pattern
 */
export function getDeprecation(pattern: string, specPath?: string): DeprecationSpec | null {
  const spec = loadSpec(specPath);
  return spec.deprecations[pattern] || null;
}

// === Nuxt UI Spec Loading ===

let cachedUISpec: NuxtUISpec | null = null;

/**
 * Load the Nuxt UI spec from the generated JSON file
 */
export function loadUISpec(specPath?: string): NuxtUISpec {
  if (cachedUISpec) {
    return cachedUISpec;
  }

  const possiblePaths = [
    specPath,
    join(__dirname, '../spec/nuxt-ui-v4.json'),
    join(__dirname, '../../spec/nuxt-ui-v4.json'),
    join(__dirname, '../../src/rules/spec/nuxt-ui-v4.json'),
    join(process.cwd(), 'src/rules/spec/nuxt-ui-v4.json'),
  ].filter(Boolean) as string[];

  let path: string | null = null;
  for (const p of possiblePaths) {
    if (existsSync(p)) {
      path = p;
      break;
    }
  }

  if (!path) {
    return {
      version: '4.0.0',
      components: {},
    };
  }

  const content = readFileSync(path, 'utf-8');
  cachedUISpec = JSON.parse(content) as NuxtUISpec;

  return cachedUISpec;
}

/**
 * Get spec for a specific component
 */
export function getComponentSpec(componentName: string, specPath?: string): ComponentSpec | null {
  const spec = loadUISpec(specPath);
  if (spec.components[componentName]) {
    return spec.components[componentName];
  }

  // Try case-insensitive lookup
  const lowerName = componentName.toLowerCase();
  for (const key of Object.keys(spec.components)) {
    if (key.toLowerCase() === lowerName) {
      return spec.components[key];
    }
  }

  return null;
}
