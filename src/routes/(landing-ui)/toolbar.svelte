<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createToolbar } from '$lib/index.js';

	// Icons
	import { Bold, Italic, Strikethrough, AlignLeft, AlignCenter, AlignRight } from '$icons/index.js';

	const {
		elements: { root, button, link, separator },
		builders: { createToolbarGroup },
	} = createToolbar();
	const {
		elements: { group: fontGroup, item: fontItem },
	} = createToolbarGroup({
		type: 'multiple',
		defaultValue: ['bold', 'italic'],
	});
	const {
		elements: { group: alignGroup, item: alignItem },
	} = createToolbarGroup({
		defaultValue: 'left',
		onValueChange: ({ curr, next }) => {
			if (next === undefined) {
				return curr;
			}
			return next;
		},
	});

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

</script>

<div
	{...$root} use:root
	class={cn(
		'surface-bef8511d80',
		className
	)}
>
	<div class="surface-e9cf8f9a56" {...$fontGroup} use:fontGroup>
		<button class="item" {...$fontItem('bold')} use:fontItem>
			<Bold class="surface-bcb0e128e4" />
		</button>
		<button class="item" {...$fontItem('italic')} use:fontItem>
			<Italic class="surface-cca93d5dd6" />
		</button>
		<button class="item" {...$fontItem('strikethrough')} use:fontItem>
			<Strikethrough class="surface-ba1e19b6ef" />
		</button>
	</div>
	<div class="separator" {...$separator} use:separator></div>
	<div class="surface-4c199fdd03" {...$alignGroup} use:alignGroup>
		<button class="item" {...$alignItem('left')} use:alignItem>
			<AlignLeft class="surface-ddd135a5ed" />
		</button>
		<button class="item" {...$alignItem('center')} use:alignItem>
			<AlignCenter class="surface-07b464d72c" />
		</button>
		<button class="item" {...$alignItem('right')} use:alignItem>
			<AlignRight class="surface-cdcb74f681" />
		</button>
	</div>
	<div class="separator" {...$separator} use:separator></div>
	<a href="/" class="link nowrap surface-a0320fd187" {...$link} use:link> Edited 2 hours ago </a>
	<button
		class="preview-text-magnum-900  surface-58b5431f81"
		{...$button} use:button>Save</button
	>
</div>

<style lang="scss">
	.item {
		padding: 0.25rem;
		border-radius: 0.375rem;
		color: rgb(var(--color-neutral-400) / 1);
		position: relative;
		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		transition-duration: 150ms;
	}

		.item:hover {
			opacity: 0.75;
		}

		.item[data-state='on'] {
			color: rgb(var(--color-magnum-800) / 1);
		}

		.item::after {
			position: absolute;
			left: 50%;
			bottom: -0.25rem;
			transform: translateX(-50%);
			content: '';
			width: 0.25rem;
			height: 0.25rem;
			border-radius: 9999px;
			background-color: rgb(var(--color-magnum-400) / 1);
			opacity: 0;
			transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
			transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
			transition-duration: 150ms;
		}

		.item:focus::after {
			opacity: 1;
		}

	.separator {
		width: 1px;
		background-color: rgb(var(--color-neutral-300) / 1);
		align-self: stretch;
	}
</style>
