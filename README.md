# @narduk-enterprises/eslint-config

Consolidated ESLint plugin & shared config for **Nuxt 4**, **Vue 3**, **Tailwind v4**, and **Nuxt UI v4** projects.

75 custom rules, plus 4 official Vue rules, organized into capability packs and legacy presets.

## Installation

```bash
pnpm add -D @narduk-enterprises/eslint-config
```

## Quick Start

```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import narduk from '@narduk-enterprises/eslint-config';

export default withNuxt(...narduk.configs.all);
```

## Capability Packs

The package now exposes capability-based flat config packs so apps can opt into
only the policy they actually want, without forking the whole monolithic
surface.

| Pack | Enabled rules | Purpose |
| --- | --- | --- |
| `core` | 31 | Reusable Nuxt, Vue, hydration, Pinia, and app-architecture guardrails |
| `designSystem` | 21 | Design-system and Tailwind/token enforcement for Vue files |
| `nuxtUi` | 10 | Nuxt UI v4 component, prop, slot, and event validation |
| `seo` | 3 | Page SEO/schema guardrails |
| `server` | 7 | Server validation and runtime-safety rules that are not auth-specific |
| `auth` | 3 | CSRF, mutation, and rate-limit safety rules |
| `template` | 4 | Starter-managed and layer-aware rules that are not universal |

### Opt-In Usage

```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import { composeSharedConfigs } from '@narduk-enterprises/eslint-config/config';

export default withNuxt(...composeSharedConfigs('core', 'designSystem', 'nuxtUi'));
```

You can also import a single packaged entrypoint when the app only needs one
capability area:

```js
import withNuxt from './.nuxt/eslint.config.mjs';
import seoConfigs from '@narduk-enterprises/eslint-config/config/seo';

export default withNuxt(...seoConfigs);
```

## Config Presets

Legacy presets remain available for backwards compatibility.

| Preset | Enabled rules | Description |
| --- | --- | --- |
| `recommended` | 27 | Design system + styling + hydration for Vue files |
| `nuxt` | 14 | Nuxt framework guardrails plus SEO and starter-aware rules |
| `nuxt-ui` | 10 | Nuxt UI v4 component validation |
| `vue` | 13 | Vue 3 Composition API + Pinia best practices |
| `vue-strict` | 13 | Same as `vue` but all rules set to `error` |
| `server` | 10 | Server validation, auth, and runtime safety |
| `app` | 4 | Architecture rules for composables/stores |
| `all` | 79 | Full drop-in surface: 75 custom rules + 4 official Vue rules |

### Cherry-picking

```js
import narduk from '@narduk-enterprises/eslint-config';

export default withNuxt(
  ...narduk.configs.recommended, // design system + styling + hydration
  ...narduk.configs.vue, // Vue composition API best practices
  ...narduk.configs.server // server-side validation
);
```

### Full Shared Config

For a batteries-included config that also wires up community plugins (unicorn, import-x, security, regexp, prettier):

```js
import withNuxt from './.nuxt/eslint.config.mjs';
import { sharedConfigs } from '@narduk-enterprises/eslint-config/config';

export default withNuxt(...sharedConfigs);
```

`sharedConfigs` is the compatibility path. It composes the default capability
order internally:

1. `core`
2. `designSystem`
3. `nuxtUi`
4. `seo`
5. `server`
6. `auth`
7. `template`

### Migration Path

1. Keep existing consumers on `sharedConfigs` or `narduk.configs.all` if they need the full current policy surface.
2. For new or actively maintained apps, switch to `composeSharedConfigs(...)` and select only the capability packs the app actually needs.
3. Remove `template`, `seo`, `auth`, or `nuxtUi` first in apps that do not use those capabilities.
4. Leave legacy preset names in place until downstream apps have moved to capability packs; only then consider slimming the compatibility layer.

### Recommended Packaging Direction

Proceed with **multiple named flat config entrypoints inside one package**, not
separate npm packages yet.

Why this is the safest next slice:

- it preserves the current install and publish flow
- it avoids peer-dependency churn across many tiny packages
- it gives downstream apps real opt-in boundaries immediately
- it keeps room for later package splits if specific packs need different release cadence

### Compatibility and Versioning Notes

- This change is additive: `sharedConfigs`, `narduk.configs.all`, and the legacy preset names continue to work.
- New opt-in entrypoints live under `@narduk-enterprises/eslint-config/config/*`.
- If a future release removes legacy presets or moves capability packs into separate npm packages, that should be a semver-major change.

## Rule Categories

### Design System (14 rules)

Enforce Nuxt UI component usage over native HTML elements.

| Rule                           | Description                               |
| ------------------------------ | ----------------------------------------- |
| `narduk/no-native-button`      | Use `<UButton>` instead of `<button>`     |
| `narduk/no-native-input`       | Use `<UInput>` instead of `<input>`       |
| `narduk/no-native-form`        | Use `<UForm>` instead of `<form>`         |
| `narduk/no-native-table`       | Use `<UTable>` instead of `<table>`       |
| `narduk/no-native-details`     | Use `<UAccordion>` instead of `<details>` |
| `narduk/no-native-hr`          | Use `<USeparator>` instead of `<hr>`      |
| `narduk/no-native-progress`    | Use `<UProgress>` instead of `<progress>` |
| `narduk/no-native-dialog`      | Use `<UModal>` instead of `<dialog>`      |
| `narduk/no-native-kbd`         | Use `<UKbd>` instead of `<kbd>`           |
| `narduk/no-native-layout`      | Use Nuxt UI layout components             |
| `narduk/no-inline-svg`         | Use icon components instead of inline SVG |
| `narduk/prefer-ulink`          | Use `<ULink>` instead of `<a>`            |
| `narduk/no-select-empty-value` | Prevent empty value in `<USelect>`        |
| `narduk/no-fetch-in-component` | Use composables for data fetching         |

### Styling (7 rules)

Enforce Tailwind v4 best practices and design token usage.

### Hydration (5 rules)

Prevent SSR/hydration mismatches.

### Nuxt (14 rules)

Enforce Nuxt 4 framework best practices, SEO patterns, and prevent legacy Nuxt 2/3 patterns.

### Nuxt UI (10 rules)

Validate Nuxt UI v4 component props, slots, events, and deprecations.

### Vue (9 custom + 4 official rules)

Vue 3 Composition API + Pinia best practices. 3 rules delegate to `eslint-plugin-vue` built-ins.

### Server (11 rules)

Server-side input validation, Drizzle ORM patterns, and CSRF protection.

### Architecture (5 rules)

Code organization rules for composables, stores, and utilities.

## Nuxt Integration

This config is designed to be used with Nuxt's ESLint module via `withNuxt(...)`:

```js
// eslint.config.mjs
import withNuxt from './.nuxt/eslint.config.mjs';
import { sharedConfigs } from '@narduk-enterprises/eslint-config/config';

export default withNuxt(...sharedConfigs);
```

`withNuxt()` provides Vue/Nuxt parser setup, auto-import awareness, and TypeScript integration. The shared config layers on top of it with community plugins and custom rules.

> **Note:** `import-x/no-unresolved` is intentionally disabled. Nuxt aliases (`#imports`, `~`, `@`) are not resolvable by the plugin and would produce false positives.

## Cloudflare Edge Compatibility

Node-only rules are scoped to files that actually run in Node.js:

| Rule | Applies to |
| --- | --- |
| `unicorn/prefer-node-protocol` | `scripts/**`, `*.config.*`, `server/**` |
| `no-restricted-imports` (fs, net, etc.) | `server/api/**`, `server/routes/**`, `server/functions/**` |

Edge runtime files (API routes, server routes) are protected by `no-restricted-imports` which disallows Node-only built-in modules (`fs`, `net`, `tls`, `child_process`, `cluster`, `worker_threads`) that are unavailable in Cloudflare Workers.

## Vitest Support

Test files matching `**/*.test.ts`, `**/*.spec.ts`, or `tests/**/*.ts` get:

- **Globals** — `describe`, `it`, `test`, `expect` are available without imports
- **`vitest/no-focused-tests`** — errors on `.only` tests to prevent accidental commits
- **`vitest/no-disabled-tests`** — warns on skipped tests
- **`vitest/expect-expect`** — warns on tests with no assertions
- **`no-only-tests/no-only-tests`** — additional `.only` guard as a safety net

## License

MIT
