---
title: Introduction
description:
  An open-source Svelte component library with accessible defaults, shared design tokens, and
  lower-level behavior builders.
---

<script lang="ts">
    import { Construction, Contributors } from '$docs/components'
</script>

Melt UI provides accessible, production-ready Svelte components with a restrained default design.
Components preserve native platform behavior, share one token-driven stylesheet, and avoid runtime
style injection. Lower-level builders remain available when an application needs full markup control.

<Construction>
    Melt UI is in its early stages. Expect breaking changes in minor releases until 1.0 is ready! And lots of new stuff! 🚀
</Construction>

## Features

### Component API

Import the shared stylesheet once, then use components directly.

```svelte
<script lang="ts">
	import { Button, Field, Input } from '@melt-ui/svelte';
	import '@melt-ui/svelte/styles.css';
</script>

<Field id="profile-email" label="Email" description="Used for account notifications." required>
	<Input type="email" placeholder="you@example.com" />
</Field>

<Button>Save profile</Button>
```

Components expose native attributes and events, ordinary class names, and consistent variants.
Family subpath exports let applications keep import graphs focused.

### Builder API

Builders remain available for advanced composition. They generate state, attributes, and event
handlers that can be attached to custom elements or components without replacing the styled API.

### Accessible by Design

Melt UI puts accessibility front and center so interfaces are inclusive and predictable. We follow
[WAI-ARIA design patterns](https://www.w3.org/WAI/ARIA/apg/) and handle details such as ARIA
relationships, role management, focus return, keyboard navigation, and live-region behavior.

### Token-driven Styles

The shared stylesheet uses documented custom properties and ordinary component classes. Override
tokens globally, add application-specific classes locally, or import a component-family subpath
without paying for a runtime styling engine.

### Open and Extensible

Components expose native attributes, events, slots, and class hooks. For deeper control, the builder
architecture remains open and flexible enough to support custom markup and interaction composition.

### Simplified DX

We want to simplify your development workflow. By default, Melt UI components are uncontrolled,
freeing you from the burden of managing local states. However, if you prefer greater control, you
can switch to controlled components. We handle the behind-the-scenes complexity, ensuring a smooth
developer experience.

### TypeScript and SvelteKit Support

Melt UI offers a fully typed API, safeguarding your code while providing autocompletion superpowers
in your preferred code editor. All our components share a consistent API, promoting familiarity and
minimizing surprises. The components are also build with SSR in mind, making them a perfect fit for
SvelteKit.

## Built by the community

Melt UI is an open-source project built by the community for the community. It wouldn't be possible
if it wasn't for the amazing work of some amazing people.

<Contributors />

## Inspiration and Credits

We're big fans of open source and love working collaboratively. Over time, we've taken cues and
inspiration from some really amazing projects and people that have motivated us to continuously
improve our ideas.

Some of the projects we've been inspired by in no particular order:

- Zag - [https://zagjs.com](https://zagjs.com)
- Radix UI - [https://radix-ui.com](https://radix-ui.com)
- Skeleton - [https://skeleton.dev](https://skeleton.dev)
