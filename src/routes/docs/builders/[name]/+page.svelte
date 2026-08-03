<script lang="ts">
	import { TOC, Description, Preview, Features } from '$docs/components/index.js';
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
	let component = $derived(data.doc.default as unknown as Component);
	let doc = $derived(data.doc.metadata);
	let snippets = $derived(data.snippets);
	let mainPreview = $derived(data.mainPreview as unknown as Component);
	let previews = $derived(data.previews);
	let features = $derived(data.builderData.features);
	let keyboard = $derived(data.builderData.keyboard);
	let schemas = $derived(data.builderData.schemas);

	const SvelteComponent_2 = $derived(component);
</script>

<main class="surface-d02747668d">
	<div class="surface-94daa81d14">
		<div class="surface-afb0f8cbdb">
			<h1 class={cn('surface-f0ba3454be')}>
				{doc.title}
			</h1>
			{#if doc.description}
				<Description>
					{doc.description}
				</Description>
			{/if}
		</div>
		<div {...$separator} use:separator class="surface-cf84d1beba"></div>
		<div class="mdsvex" id="mdsvex">
			<Preview code={snippets.main} viewCode={false} variant="default">
				{@const SvelteComponent_1 = mainPreview}
				<SvelteComponent_1 />
			</Preview>
			<Features {features} />

			<SvelteComponent_2 {snippets} {schemas} {previews} {keyboard} />
		</div>
		<div {...$separator} use:separator class="surface-e423b90bef"></div>
		<!-- <DocsPager /> -->
	</div>
	<div class="surface-f91ac6edbd">
		<div class="surface-16879ba6f0">
			{#key $page.url.pathname}
				<TOC />
			{/key}
		</div>
	</div>
</main>
