<script lang="ts">
	import { createToggleGroup, melt } from '$lib/index.js';
	import { AlignCenter, AlignLeft, AlignRight } from '$icons/index.js';

	const {
		elements: { root, item },
	} = createToggleGroup({
		type: 'multiple',
	});
</script>

<div
	use:melt={$root}
	class="preview-state-orientation-layout-col-2 surface-816e9df285"
	aria-label="Text alignment"
>
	<button
		class="toggle-item"
		use:melt={$item('left')}
		aria-label="Left aligned"
	>
		<AlignLeft class="surface-6978a089f8" />
	</button>
	<button
		class="toggle-item"
		use:melt={$item('center')}
		aria-label="Center aligned"
	>
		<AlignCenter class="surface-b3a7762383" />
	</button>
	<button
		class="toggle-item"
		use:melt={$item('right')}
		aria-label="Right aligned"
	>
		<AlignRight class="surface-2b5fbfb1f0" />
	</button>
</div>

<style lang="scss">
	.toggle-item {
		display: grid;
		place-items: center;
		align-items: center;

		background-color: rgb(var(--color-white) / 1);
		color: rgb(var(--color-magnum-800) / 1);
		font-size: 1rem;
		line-height: 1rem;
		outline: none;

		height: 2.25rem;
		width: 2.25rem;
	}

		.toggle-item:hover {
			background-color: rgb(var(--color-magnum-100) / 1);
		}

		.toggle-item:focus {
			z-index: 10;
		}

	.toggle-item[data-disabled] {
		cursor: not-allowed;
}

	.toggle-item[data-orientation='horizontal'] {
		border-left-width: 1px;
		border-right-width: 1px;
		border-left-color: transparent;
		
		border-right-color: rgb(var(--color-magnum-200) / 1);
}

	.toggle-item[data-orientation='horizontal']:first-child {
		border-top-left-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
}

	.toggle-item[data-orientation='horizontal']:last-child {
		border-top-right-radius: 0.375rem;
		border-bottom-right-radius: 0.375rem;
		border-right-color: transparent;
}

	.toggle-item[data-orientation='horizontal']:dir(rtl) {
		border-left-width: 1px;
		border-right-width: 1px;
		
		border-left-color: rgb(var(--color-magnum-200) / 1);
		border-right-color: transparent;
}

	.toggle-item[data-orientation='horizontal']:dir(rtl):first-child {
		border-top-right-radius: 0.375rem;
		border-bottom-right-radius: 0.375rem;
}

	.toggle-item[data-orientation='horizontal']:dir(rtl):last-child {
		border-top-left-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
		border-left-color: transparent;
}

	.toggle-item[data-orientation='vertical'] {
		border-top-width: 1px;
		border-bottom-width: 1px;
		
		border-bottom-color: rgb(var(--color-magnum-200) / 1);
		border-top-color: transparent;
}

	.toggle-item[data-orientation='vertical']:first-child {
		border-top-left-radius: 0.375rem;
		border-top-right-radius: 0.375rem;
}

	.toggle-item[data-orientation='vertical']:last-child {
		border-bottom-right-radius: 0.375rem;
		border-bottom-left-radius: 0.375rem;
		border-bottom-color: transparent;
}

	.toggle-item[data-state='on'] {
		
		background-color: rgb(var(--color-magnum-200) / 1);
		
		color: rgb(var(--color-magnum-900) / 1);
}
</style>
