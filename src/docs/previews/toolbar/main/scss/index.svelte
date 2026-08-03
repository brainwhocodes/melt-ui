<script lang="ts">
	import { createToolbar } from '$lib/index.js';

	// Icons
	import {
		Bold,
		Italic,
		Strikethrough,
		AlignLeft,
		AlignCenter,
		AlignRight,
	} from '$icons/index.js';

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup },
	} = createToolbar();
	const {
		elements: { group: fontGroup, item: fontItem },
	} = createToolbarGroup({
		type: 'multiple',
	});
	const {
		elements: { group: alignGroup, item: alignItem },
	} = createToolbarGroup();
</script>

<div
	{...$root} use:root
	class="surface-a2ac3820b1"
>
	<div class="surface-130c68275b" {...$fontGroup} use:fontGroup>
		<button class="item" aria-label="bold" {...$fontItem('bold')} use:fontItem>
			<Bold class="surface-fd8c246bea" />
		</button>
		<button class="item" aria-label="italic" {...$fontItem('italic')} use:fontItem>
			<Italic class="surface-a96ea5419f" />
		</button>
		<button
			class="item"
			aria-label="strikethrough"
			{...$fontItem('strikethrough')} use:fontItem
		>
			<Strikethrough class="surface-bba9c7addd" />
		</button>
	</div>
	<div class="separator" {...$separator} use:separator></div>
	<div class="surface-d59ca5b9c0" {...$alignGroup} use:alignGroup>
		<button class="item" aria-label="align left" {...$alignItem('left')} use:alignItem>
			<AlignLeft class="surface-6ce7d15586" />
		</button>
		<button
			class="item"
			aria-label="align center"
			{...$alignItem('center')} use:alignItem
		>
			<AlignCenter class="surface-c40ec3180f" />
		</button>
		<button
			class="item"
			aria-label="align-right"
			{...$alignItem('right')} use:alignItem
		>
			<AlignRight class="surface-2548ba8b6b" />
		</button>
	</div>
	<div class="separator" {...$separator} use:separator></div>
	<a href="/" class="link nowrap surface-f01fda65dc" {...$link} use:link>
		Edited 2 hours ago
	</a>
	<button
		class="surface-40ca49e353"
		{...$button} use:button>Save</button
	>
</div>

<style lang="scss">
	.item {
		padding: 0.25rem;
		border-radius: 0.375rem;
	}

		.item:hover {
			background-color: rgb(var(--color-magnum-100) / 1);
		}

		.item[data-state='on'] {
			background-color: rgb(var(--color-magnum-200) / 1);
			color: rgb(var(--color-magnum-900) / 1);
		}

		.item:focus {
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;
		
		
}

	.separator {
		width: 1px;
		background-color: rgb(var(--color-neutral-300) / 1);
		align-self: stretch;
	}
</style>
