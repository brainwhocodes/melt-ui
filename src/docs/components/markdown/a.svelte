<script lang="ts">
	import { ExternalLink } from '$icons/index.js';

	export let href: string;
	export let rel: string | undefined = undefined;

	$: internal = href.startsWith('/') || href.startsWith('#');

	$: rel = !internal ? 'noopener noreferrer' : undefined;
	$: target = !internal ? '_blank' : undefined;
</script>

<a
	class="surface-3e98888f3b"
	{href}
	{target}
	{rel}
>
	<slot />
	{#if !internal}
		<ExternalLink class="surface-0ea1a882f3" />
	{/if}
</a>
