<script lang="ts">
	import { createPagination } from '$lib/builders/pagination/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

	interface Props {
		count?: number;
		perPage?: number;
		page?: number;
		siblingCount?: number;
		class?: string;
		onPageChange?: (page: number) => void;
		[key: string]: any;
	}

	let {
		count = 100,
		perPage = 10,
		page = $bindable(1),
		siblingCount = 1,
		class: className = '',
		onPageChange,
		...rest
	}: Props = $props();

	const {
		elements: { root, pageTrigger, prevButton, nextButton },
		states: { pages, page: currentPage },
	} = untrack(() =>
		createPagination({
			count,
			perPage,
			siblingCount,
			onPageChange: (next) => {
				page = next.next;
				onPageChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<nav {...$root} use:root class={`melt-pagination ${className}`.trim()} aria-label="Pagination" {...rest}>
	<button {...$prevButton} use:prevButton class="melt-pagination-prev" aria-label="Previous page">
		&larr;
	</button>
	{#each $pages as pageItem}
		{#if pageItem.type === 'page'}
			<button
				{...$pageTrigger(pageItem)}
				use:pageTrigger
				class="melt-pagination-page"
				data-selected={$currentPage === pageItem.value ? '' : undefined}
			>
				{pageItem.value}
			</button>
		{:else}
			<span class="melt-pagination-ellipsis">...</span>
		{/if}
	{/each}
	<button {...$nextButton} use:nextButton class="melt-pagination-next" aria-label="Next page">
		&rarr;
	</button>
</nav>
