<script lang="ts">
	import { h3 as H3 } from '$docs/components/markdown/index.js';
	import { createHeadingId } from '$docs/utils/index.js';
	import { Hammer, Shapes } from '$icons/index.js';
	import P from './markdown/p.svelte';
	interface Props {
		title: string;
		description: string;
		isBuilder?: boolean;
	}

	let { title, description, isBuilder = false }: Props = $props();
</script>

<div
	class="surface-cbe4151a5e"
>
	<H3 class="surface-8a1ba8da1f" id={createHeadingId(title)}>{title}</H3>
</div>
{#if isBuilder}
	<Hammer class="surface-a0a99ccb82" />
{:else}
	<Shapes class="surface-727ff98f90" />
{/if}
<P class="surface-0a32fac59a">
	{@html description}
</P>
