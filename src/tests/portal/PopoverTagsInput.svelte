<script lang="ts">
	import { untrack } from 'svelte';
	import { createPopover, createTagsInput, type CreatePopoverProps } from '$lib/index.js';
	import { Settings2 } from '$icons/index.js';

	interface Props {
		portal: CreatePopoverProps['portal'];
		defaultTags?: any;
	}

	let { portal, defaultTags = ['Svelte', 'Typescript'] }: Props = $props();

	const {
		elements: { trigger, content, arrow, close },
	} = createPopover(untrack(() => ({ portal })));

	const {
		elements: { root, input, tag, deleteTrigger, edit },
		states: { tags },
	} = createTagsInput(untrack(() => ({ defaultTags })));
</script>

<button
	type="button"
	class="trigger"
	{...$trigger} use:trigger
	aria-label="Update dimensions"
	data-testid="popover-trigger"
>
	<Settings2 class="surface-31b1b10796" />
	<span class="surface-416c8df3fd">Open Popover</span>
</button>

<div {...$content} use:content data-testid="popover-content">
	<div {...$arrow} use:arrow data-testid="popover-arrow"></div>
	<div {...$root} use:root>
		{#each $tags as t, i}
			<div data-testid="tag-{i}" {...$tag(t)} use:tag>
				<span>{t.value}</span>
				<button data-testid="delete-tag-{i}" {...$deleteTrigger(t)} use:deleteTrigger> Delete </button>
			</div>
			<div data-testid="edit-tag-{i}" {...$edit(t)} use:edit></div>
		{/each}

		<input {...$input} use:input type="text" placeholder="Enter tags..." />
	</div>

	<button {...$close} use:close data-testid="popover-close"> Close </button>
</div>
<div class="surface-fc74aedafd"></div>
<div data-testid="outside" class="surface-a67ec0e521"></div>
