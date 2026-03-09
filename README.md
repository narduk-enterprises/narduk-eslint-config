# @narduk-enterprises/eslint-config

Consolidated ESLint plugin & shared config for **Nuxt 4**, **Vue 3**, **Tailwind v4**, and **Nuxt UI v4** projects.

67 custom rules organized into 8 categories with multiple config presets.

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

## Config Presets

| Preset        | Rules | Description                                     |
| ------------- | ----- | ----------------------------------------------- |
| `recommended` | 27    | Design system + styling + hydration (Vue files) |
| `nuxt`        | 14    | Nuxt framework guardrails                       |
| `nuxt-ui`     | 8     | Nuxt UI v4 component validation                 |
| `vue`         | 13    | Vue 3 Composition API + Pinia best practices    |
| `vue-strict`  | 13    | Same as `vue` but all rules set to `error`      |
| `server`      | 5     | Server-side validation & security               |
| `app`         | 4     | Architecture rules for composables/stores       |
| `all`         | All   | Everything combined                             |

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

### Nuxt UI (8 rules)

Validate Nuxt UI v4 component props, slots, events, and deprecations.

### Vue (9 custom + 4 official rules)

Vue 3 Composition API + Pinia best practices. 3 rules delegate to `eslint-plugin-vue` built-ins.

### Server (5 rules)

Server-side input validation, Drizzle ORM patterns, and CSRF protection.

### Architecture (5 rules)

Code organization rules for composables, stores, and utilities.

## License

MIT
