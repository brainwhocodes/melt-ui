<script lang="ts">
	import { createPagination, melt } from '$lib/index.js';
	import { ChevronLeft, ChevronRight } from '$icons/index.js';

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, range },
	} = createPagination({
		count: 100,
		perPage: 10,
		defaultPage: 1,
		siblingCount: 1,
	});
</script>

<nav
	class="surface-f08be7a326"
	aria-label="pagination"
	use:melt={$root}
>
	<p class="surface-d3b23cb26d">
		Showing items {$range.start} - {$range.end}
	</p>
	<div class="surface-6ffd13b825">
		<button
			class="preview-elevation-sm    preview-hover-opacity-75 preview-state-selected-surface-magnum-900    preview-state-selected-text-white surface-343fa31d61"
			use:melt={$prevButton}><ChevronLeft class="surface-2f1de7faac" /></button
		>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<span>...</span>
			{:else}
				<button
					class="preview-elevation-sm      preview-hover-opacity-75 preview-state-selected-surface-magnum-900     preview-state-selected-text-white surface-6ac213b81a"
					use:melt={$pageTrigger(page)}>{page.value}</button
				>
			{/if}
		{/each}
		<button
			class="preview-elevation-sm    preview-hover-opacity-75 preview-state-selected-surface-magnum-900   preview-state-selected-text-white surface-8883a4cc53"
			use:melt={$nextButton}><ChevronRight class="surface-b8d5c58805" /></button
		>
	</div>
</nav>
