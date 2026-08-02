<script lang="ts">
	import { createToolbar, melt } from '$lib/index.js';

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
	use:melt={$root}
	class="surface-a2ac3820b1"
>
	<div class="surface-130c68275b" use:melt={$fontGroup}>
		<button class="item" aria-label="bold" use:melt={$fontItem('bold')}>
			<Bold class="surface-fd8c246bea" />
		</button>
		<button class="item" aria-label="italic" use:melt={$fontItem('italic')}>
			<Italic class="surface-a96ea5419f" />
		</button>
		<button
			class="item"
			aria-label="strikethrough"
			use:melt={$fontItem('strikethrough')}
		>
			<Strikethrough class="surface-bba9c7addd" />
		</button>
	</div>
	<div class="separator" use:melt={$separator} />
	<div class="surface-d59ca5b9c0" use:melt={$alignGroup}>
		<button class="item" aria-label="align left" use:melt={$alignItem('left')}>
			<AlignLeft class="surface-6ce7d15586" />
		</button>
		<button
			class="item"
			aria-label="align center"
			use:melt={$alignItem('center')}
		>
			<AlignCenter class="surface-c40ec3180f" />
		</button>
		<button
			class="item"
			aria-label="align-right"
			use:melt={$alignItem('right')}
		>
			<AlignRight class="surface-2548ba8b6b" />
		</button>
	</div>
	<div class="separator" use:melt={$separator} />
	<a href="/" class="link nowrap surface-f01fda65dc" use:melt={$link}>
		Edited 2 hours ago
	</a>
	<button
		class="surface-40ca49e353"
		use:melt={$button}>Save</button
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
