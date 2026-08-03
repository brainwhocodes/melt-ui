<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createToggleGroup } from '$lib/index.js';
	import { AlignCenter, AlignLeft, AlignRight } from '$icons/index.js';

	const {
		elements: { root, item },
	} = createToggleGroup({
		type: 'single',
		defaultValue: 'right',
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
		"preview-state-orientation-layout-col-2 surface-92922a8ebd",
		className
	)}
	aria-label="Text alignment"
>
	<button class="toggle-item" {...$item('left')} use:item aria-label="Left aligned">
		<AlignLeft class="surface-6d7c12cc54" />
	</button>
	<button class="toggle-item" {...$item('center')} use:item aria-label="Center aligned">
		<AlignCenter class="surface-896575d199" />
	</button>
	<button class="toggle-item" {...$item('right')} use:item aria-label="Right aligned">
		<AlignRight class="surface-39c14cad45" />
	</button>
</div>

<style lang="scss">
	.toggle-item {
		display: grid;
		place-items: center;
		align-items: center;

		background-color: rgb(var(--color-neutral-100) / 1);
		color: rgb(var(--color-neutral-400) / 1);
		line-height: 1rem;
		outline: none;

		height: 3rem;
		width: 3rem;

		position: relative;

		transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;

		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		transition-duration: 150ms;
	}

		.toggle-item::after {
			position: absolute;
			left: 50%;
			bottom: 0.25rem;
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

		.toggle-item:focus::after {
			opacity: 1;
		}

	.toggle-item[data-disabled] {
		cursor: not-allowed;
}

	.toggle-item[data-orientation='horizontal']:first-child {
		border-top-left-radius: 0.75rem;
		border-bottom-left-radius: 0.75rem;
}

	.toggle-item[data-orientation='horizontal']:last-child {
		border-top-right-radius: 0.75rem;
		border-bottom-right-radius: 0.75rem;
}

	.toggle-item[data-state='on'] {
		background-color: rgb(var(--color-white) / 1);
		color: rgb(var(--color-magnum-800) / 1);
	}
</style>
