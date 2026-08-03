---
title: Preprocessor
description: Optional legacy builder shorthand using a custom preprocessor.
---

## What it does

Melt UI's documented syntax spreads builder attributes and applies builder actions explicitly.
Consumers who prefer the legacy builder ergonomics can optionally install `@melt-ui/pp`, which
introduces a `melt` action and transforms the `use:melt` shorthand into the explicit Svelte syntax.
This documentation site and Melt UI's own sources do not require the custom preprocessor.

## How it works

In the simplest form, the preprocessor will take the following code:

```svelte
<script lang="ts">
	import { createCollapsible, melt } from '@melt-ui/svelte'
	const { open, root, content, trigger } = createCollapsible()
</script>

<div use:melt={$root}>
	<button use:melt={$trigger}>{$open ? 'Close' : 'Open'}</button>
	<div use:melt={$content}>Obi-Wan says: Hello there!</div>
</div>
```

and transform it into this:

```svelte
<script lang="ts">
	import { createCollapsible } from '@melt-ui/svelte'
	const { open, root, content, trigger } = createCollapsible()
</script>

<div {...$root} use:root>
	<button {...$trigger} use:trigger>{$open ? 'Close' : 'Open'}</button>
	<div {...$content} use:content>Obi-Wan says: Hello there!</div>
</div>
```

It can handle more complex scenarios, such as a builder that is a call expression with dependencies:

```svelte
<script lang="ts">
	import { createBuilder, melt } from '@melt-ui/svelte'
	const { builder } = createBuilder()
</script>

{#each Array(100) as _, i}
	<!-- Just a normal call expression -->
	<div use:melt={$builder({ arg: i })} />
{/each}
```

## Installation

For installation instructions, please see the [installation](/docs/installation) page.
