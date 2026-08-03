<script lang="ts">
	import { ExternalLink } from '$icons/index.js';

	interface Props {
		href: string;
		rel?: string | undefined;
		children?: import('svelte').Snippet;
	}

	let { href, rel = $bindable(undefined), children }: Props = $props();

	let internal = $derived(href.startsWith('/') || href.startsWith('#'));

	$effect(() => {
		rel = !internal ? 'noopener noreferrer' : undefined;
	});
	let target = $derived(!internal ? '_blank' : undefined);
</script>

<a
	class="surface-3e98888f3b"
	{href}
	{target}
	{rel}
>
	{@render children?.()}
	{#if !internal}
		<ExternalLink class="surface-0ea1a882f3" />
	{/if}
</a>
