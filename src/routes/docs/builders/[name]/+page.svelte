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

	export let data: PageData;

	type Component = $$Generic<typeof SvelteComponent>;
	$: component = data.doc.default as unknown as Component;
	$: doc = data.doc.metadata;
	$: snippets = data.snippets;
	$: mainPreview = data.mainPreview as unknown as Component;
	$: previews = data.previews;
	$: features = data.builderData.features;
	$: keyboard = data.builderData.keyboard;
	$: schemas = data.builderData.schemas;
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
				<svelte:component this={mainPreview} />
			</Preview>
			<Features {features} />

			<svelte:component this={component} {snippets} {schemas} {previews} {keyboard} />
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
