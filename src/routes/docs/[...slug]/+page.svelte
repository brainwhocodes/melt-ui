<script lang="ts">
	import { TOC, Description } from '$docs/components/index.js';

	import type { SvelteComponent } from 'svelte';
	import type { PageData } from './$types.js';
	import { cn } from '$docs/utils/index.js';
	import { createSeparator } from '$lib/index.js';
	import { page } from '$app/stores';

	const {
		elements: { root: separator },
	} = createSeparator();

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	type Component = $$Generic<typeof SvelteComponent>;
	let component = $derived(data.component as unknown as Component);
	let doc = $derived(data.metadata);

	const SvelteComponent_1 = $derived(component);
</script>

<main class="surface-e882db926c">
	<div class="surface-e071a68f3c">
		<div class="surface-c87177e4d2">
			<h1 class={cn('surface-b43ae3fd2b')}>
				{doc.title}
			</h1>
			{#if doc.description}
				<Description>
					{doc.description}
				</Description>
			{/if}
		</div>
		<div class="mdsvex" id="mdsvex">
			<SvelteComponent_1 />
		</div>
		<div {...$separator} use:separator class="surface-1a7fe491c8"></div>
		<!-- <DocsPager /> -->
	</div>
	<div class="surface-e2879166ce">
		<div class="surface-9c880fee92">
			{#key $page.url.pathname}
				<TOC />
			{/key}
		</div>
	</div>
</main>
