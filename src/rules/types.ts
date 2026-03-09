/**
 * Type definitions — merged from nuxt-guardrails and nuxt-ui plugins
 */

// === Nuxt Guardrails types ===

export interface Nuxt4Spec {
  version: string;
  generatedAt: string;
  apis: Record<string, ApiSpec>;
  deprecations: Record<string, DeprecationSpec>;
}

export interface ApiSpec {
  name: string;
  deprecated?: boolean;
  replacedBy?: string;
  docUrl: string;
  usage?: string[];
  options?: Record<string, OptionSpec>;
}

export interface OptionSpec {
  enum?: string[];
  description?: string;
  deprecated?: boolean;
  replacedBy?: string;
}

export interface DeprecationSpec {
  message: string;
  replacement: string;
  docUrl: string;
}

export interface PluginOptions {
  strictness?: 'low' | 'medium' | 'high';
  projectStyle?: 'app-dir' | 'mixed' | 'legacy' | 'auto';
  allowProcessClientServer?: boolean;
  requireStableAsyncDataKeys?: boolean;
  // Nuxt UI options
  prefixes?: string[];
  components?: string[];
  specPath?: string;
  severity?: 'error' | 'warn' | 'off';
}

// === Nuxt UI types ===

export interface ComponentProp {
  name: string;
  type: string;
  required?: boolean;
  default?: string;
  description?: string;
  enum?: string[];
  deprecated?: boolean;
  replacedBy?: string;
}

export interface ComponentSlot {
  name: string;
  description?: string;
  deprecated?: boolean;
  replacedBy?: string;
}

export interface ComponentEvent {
  name: string;
  description?: string;
  deprecated?: boolean;
  replacedBy?: string;
}

export interface ComponentSpec {
  name: string;
  props: ComponentProp[];
  slots: ComponentSlot[];
  events: ComponentEvent[];
  requiresAppWrapper?: boolean;
}

export interface NuxtUISpec {
  version: string;
  components: Record<string, ComponentSpec>;
}
