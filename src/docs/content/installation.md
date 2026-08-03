---
title: Installation
description: Install Melt UI, an accessible component library for Svelte.
---

<script lang="ts">
    import { Callout, InstallTabs } from '$docs/components';
</script>

## Automatic Installation

Melt UI provides a CLI to help you get started quickly. To use it, run the following command in your
terminal.

```bash
npx @melt-ui/cli@latest init
```

It will automatically add `@melt-ui/svelte` to your dependencies. You may optionally choose to
install our [preprocessor](/docs/preprocessor) as well.

## Manual Installation

Install Melt UI with your package manager of choice.

<InstallTabs>
<span slot="npm">

```bash
npm install @melt-ui/svelte
```

</span>

<span slot="yarn">

```bash
yarn add @melt-ui/svelte
```

</span>

<span slot="pnpm">

```bash
pnpm add @melt-ui/svelte
```

</span>
</InstallTabs>

Import the shared stylesheet once in your application layout:

```svelte
<script lang="ts">
	import '@melt-ui/svelte/styles.css';
</script>
```

<Callout>
P.S. These tabs were built using Melt! Try using them with the arrow keys.
</Callout>

## Optional Preprocessor Installation

The documented Melt UI syntax spreads each builder's attributes and applies its action explicitly.
For example: `{...$trigger} use:trigger`. If you prefer the legacy `use:melt={$trigger}`
shorthand, you can optionally install the
[@melt-ui/pp preprocessor](https://github.com/melt-ui/preprocessor). Read the
[preprocessor guide](/docs/preprocessor) before enabling it.

<InstallTabs>
<span slot="npm">

```bash
npm install -D @melt-ui/pp
```

</span>

<span slot="yarn">

```bash
yarn add -D @melt-ui/pp
```

</span>

<span slot="pnpm">

```bash
pnpm add -D @melt-ui/pp
```

</span>

</InstallTabs>

Next, append the Melt preprocessor to Svelte's native `preprocess` array in `svelte.config.ts`.
Keep it after any preprocessors that produce Svelte markup.

```ts
// svelte.config.ts

import { preprocessMeltUI } from '@melt-ui/pp'

const config = {
	// ... other svelte config options
	preprocess: [
		// ... other preprocessors
		preprocessMeltUI()
	]
}

export default config
```
