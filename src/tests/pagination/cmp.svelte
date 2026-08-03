<script lang="ts">
	import { createPagination } from '$lib/index.js';
	import { ChevronLeft, ChevronRight } from '$icons/index.js';

	const {
		elements: { prevButton, nextButton, pageTrigger, root },
		states: { range, pages },
	} = createPagination({
		count: 100,
		perPage: 10,
		defaultPage: 1,
		siblingCount: 1,
	});
</script>

<nav aria-label="pagination" {...$root} use:root data-testid="root">
	<p>
		Showing items {$range.start} - {$range.end}
	</p>
	<div>
		<button {...$prevButton} use:prevButton data-testid="prev"><ChevronLeft class="surface-e38d2ef7dc" /></button>
		{#each $pages as page (page.key)}
			{#if page.type === 'ellipsis'}
				<span>...</span>
			{:else}
				<button {...$pageTrigger(page)} use:pageTrigger>{page.value}</button>
			{/if}
		{/each}
		<button {...$nextButton} use:nextButton data-testid="next"><ChevronRight class="surface-5f8b80607d" /></button>
	</div>
</nav>
