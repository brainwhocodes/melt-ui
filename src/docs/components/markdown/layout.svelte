<!-- MDsveX Layout Component -->
<script module lang="ts">
	import '$styles/markdown.scss';
	import {
		a,
		blockquote,
		h1,
		h2,
		h3,
		h4,
		h5,
		h6,
		hr,
		img,
		li,
		ol,
		p,
		pre,
		ul,
	} from '$docs/components/markdown/index.js';
	export { a, blockquote, h1, h2, h3, h4, h5, h6, hr, img, li, ol, p, pre, ul };
</script>

<script lang="ts">
	// this gets rid of warnings in the console that the layout was created with unknown props

	interface Props {
		// feels weird but we can't use TS in this mdsvex layout component (from my understanding)
		snippets?: string;
		schemas?: string;
		previews?: string;
		keyboard?: string;
		title?: string;
		description?: string;
		children?: import('svelte').Snippet<[any]>;
	}

	let {
		snippets = '',
		schemas = '',
		previews = '',
		keyboard = '',
		title = '',
		description = '',
		children
	}: Props = $props();
</script>

{@render children?.({ snippets, schemas, previews, keyboard, title, description, })}
