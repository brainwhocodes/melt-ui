![](static/banner.png)

[Melt UI](https://www.melt-ui.com/) is an accessible, styled component library for Svelte.

[![](https://img.shields.io/npm/v/@melt-ui/svelte?style=flat)](https://www.npmjs.com/package/@melt-ui/svelte)
![npm](https://img.shields.io/npm/dw/%40melt-ui%2Fsvelte?style=flat&color=orange)

[![](https://img.shields.io/github/actions/workflow/status/melt-ui/melt-ui/ci.yaml?style=flat)](https://github.com/melt-ui/melt-ui/actions/workflows/ci.yaml)
![](https://img.shields.io/github/license/melt-ui/melt-ui?style=flat)
[![](https://dcbadge.vercel.app/api/server/2QDjZkYunf?style=flat)](https://melt-ui.com/discord)

## About

Melt UI provides production-ready components for application interfaces:

- Styled Svelte components with a shared, token-driven CSS layer
- Native platform semantics and strict adherence to [WAI-ARIA guidelines](https://www.w3.org/WAI/ARIA/apg/)
- TypeScript and [SvelteKit](https://kit.svelte.dev/) support out of the box
- Tree-shakeable component and family exports with no runtime styling engine
- Lower-level behavior builders for advanced composition

## Getting started

Melt UI requires Svelte 5 and uses runes APIs.

Install the package:

```sh
pnpm add @melt-ui/svelte
```

Import the shared stylesheet once, then use components directly:

```svelte
<script lang="ts">
	import { Button, Field, Input } from '@melt-ui/svelte';
	import '@melt-ui/svelte/styles.css';
</script>

<Field
	id="account-email"
	label="Email"
	description="Used for account notifications."
	required
>
	<Input type="email" placeholder="you@example.com" />
</Field>

<Button>Save account</Button>
```

Behavior builders remain available from the same package when a design needs lower-level control.

## Contributing

**Contributions are welcome and encouraged!**

Melt UI is under active development. Currently planned features can be found in the
[issues tab](https://github.com/melt-ui/melt-ui/issues), alongside bug reports.

We work on this project on a volunteer basis in our free time. If you notice something that hasn't
been implemented yet or could be improved, do consider contributing to the project! The goal is to
enhance the experience of building with Svelte and improve the ecosystem for everyone.

Check out our [Contributing guide](./CONTRIBUTING.md) to learn more.

## Sponsors

<p align="center">
  <a href="https://github.com/sponsors/tglide">
    <img src='https://github.com/tglide/sponsors/blob/main/sponsors.svg?raw=true' alt="Logos from Sponsors" />
  </a>
</p>

## Community

Melt UI is an open-source project built by the community for the community. It wouldn't be possible
if it wasn't for the work of some amazing people.

[![Contributors](https://contrib.rocks/image?repo=melt-ui/melt-ui)](<[https://github.com/codemaniac-sahil/news-webapp-api](https://github.com/melt-ui/melt-ui)https://github.com/melt-ui/melt-ui/graphs/contributors>)

### Discord

Got any questions? Want to talk to the maintainers?

Our [Discord community](https://melt-ui.com/discord) is a great place to get in touch with us, and
we'd love to have you there.

<a href="https://melt-ui.com/discord" alt="Melt UI Discord community">
<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://invidget.switchblade.xyz/2QDjZkYunf">
  <img alt="Melt UI Discord community" src="https://invidget.switchblade.xyz/2QDjZkYunf?theme=light">
</picture>
</a>

## Similar projects

Looking for more? Check out the
[other component library projects available for Svelte](https://sveltesociety.dev/components#design-systems).
