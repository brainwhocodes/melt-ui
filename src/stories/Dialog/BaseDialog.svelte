<script lang="ts">
	import { createDialog, type DialogElements } from '$lib/index.js';
	import type { Snippet } from 'svelte';
	import type { Readable } from 'svelte/store';

	type ElementValue<T> = T extends Readable<infer V> ? V : never;

	const {
		elements: { overlay, content, title, description, close, portalled, trigger },
	} = createDialog({
		portal: '#preview',
	});

	interface Props {
		content?: Snippet<
			[
				{
					title: ElementValue<DialogElements['title']>;
					description: ElementValue<DialogElements['description']>;
					close: ElementValue<DialogElements['close']>;
				},
			]
		>;
		children?: Snippet<[{ trigger: ElementValue<DialogElements['trigger']> }]>;
	}

	let { content: contentSnippet, children }: Props = $props();
</script>

<div {...$portalled} use:portalled>
	<div {...$overlay} use:overlay class="surface-0538d9877a"></div>
	<div
		class="preview-limit-w-450px preview-motion-x-1-2 preview-space-6 preview-elevation-lg surface-59b875ab88"
		{...$content} use:content
	>
		{@render contentSnippet?.({ title: $title, description: $description, close: $close })}
	</div>
</div>
{@render children?.({ trigger: $trigger })}
