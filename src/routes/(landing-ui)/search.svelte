<script lang="ts">
	import { goto } from '$app/navigation';
	import { Tooltip } from '$docs/components/index.js';
	import { createCombobox, createDialog } from '$lib/index.js';
	import { CornerDownRight, LoaderIcon, Search as SearchIcon } from '$icons/index.js';
	import { onMount } from 'svelte';
	import type { Pagefind, PagefindSearchFragment, PagefindSubResult } from '../../pagefind.js';

	let pagefind: Pagefind | null = null;

	onMount(async () => {
		// @ts-expect-error - Pagefind will be present at runtime
		pagefind = (await import('/pagefind/pagefind.js')) as Pagefind;
		if (!pagefind) return;
		await pagefind.init();
	});

	const sanitizeLink = (url: string) => {
		return url.replace('.html', '').replace('src/', '');
	};

	const gotoLink = (url: string) => {
		open.set(false);
		cbOpen.set(false);
		goto(sanitizeLink(url));
	};

	const {
		elements: { input, menu, option },
		states: { open: cbOpen, inputValue },
	} = createCombobox<PagefindSearchFragment | PagefindSubResult>({
		onSelectedChange({ next }) {
			if (next) {
				gotoLink(next.value.url);
			}
			return undefined;
		},
		preventScroll: false,
		highlightOnHover: false,
	});

	let comboboxInput: HTMLInputElement | null = $state(null);

	const {
		elements: { trigger, portalled, content, overlay },
		states: { open },
	} = createDialog({
		onOpenChange({ next }) {
			if (!next) {
				inputValue.set('');
				search = new Promise((resolve) => resolve([]));
			}
			return next;
		},
		openFocus: () => comboboxInput,
	});

	let search: Promise<PagefindSearchFragment[]> | null = $state(null);

	async function getResultsFromSearch(query: string) {
		if (!pagefind || !query) {
			return [];
		}
		const s = await pagefind.debouncedSearch(query, undefined, 450);
		return await Promise.all(
			s.results.map(async (result) => {
				return await result.data();
			})
		);
	}

	$effect(() => {
		search = getResultsFromSearch($inputValue);
	});
</script>

<svelte:window
	onkeydown={(e) => {
		const isCtrl = e.ctrlKey || e.metaKey;
		if (e.key === '/' || (e.key === 'k' && isCtrl)) {
			e.preventDefault();
			open.set(true);
		}
	}}
/>

<Tooltip text="Search">
	<button
		class="surface-1f07b58ff2"
		aria-label="Search documentation"
		{...$trigger} use:trigger
	>
		<SearchIcon class="surface-df1bc37795" />
	</button>
</Tooltip>

<div {...$portalled} use:portalled class="surface-f4b2afd98c">
	<div {...$overlay} use:overlay class="surface-7ef270ecc5"></div>
	<div
		{...$content} use:content
		class="surface-4aa8c6d24e"
	>
		<div class="surface-9143f75033">
			<div class="surface-de57919a1f">
				<input
					bind:this={comboboxInput}
					{...$input} use:input
					class="surface-6d7884f481"
					placeholder="Search..."
					onkeydown={(e) => {
						if (e.key === 'Escape') {
							cbOpen.set(false);
							open.set(false);
						}
					}}
				/>
				<SearchIcon class="surface-9b566a0be7" />
				{#if search}
					{#await search}
						<div class="surface-368f86308a">
							<LoaderIcon class="surface-468304606b" />
						</div>
					{/await}
				{/if}
			</div>
		</div>

		<div
			class="preview-limit-h-min-600px-50vh surface-849326f3f2"
			{...$menu} use:menu
			class:preview-hidden={!$inputValue}
		>
			{#if search}
				{#await search then results}
					<div
						class="surface-1fb1ece7fd"
					>
						<p aria-live="polite" class="surface-3af95bbfc1">
							{results.length === 0 ? 'No results' : `Found ${results.length} results`}
						</p>
						{#each results as data, index (index)}
							{@const isLast = index === results.length - 1}

							<div
								{...$option({ value: data, label: data.meta.title })} use:option
								class="surface-ae2c8b782e"
							>
								<a
									class="title surface-b08ac68b8d"
									href={sanitizeLink(data.url)}>{data.meta.title}</a
								>
								<p class="surface-c3e8f3c0ff">
									{@html data.excerpt}
								</p>
							</div>
							{#each data.sub_results.filter(({ title }) => title !== data.meta.title) as subresult}
								<div
									class="subresult surface-e73dd998e6"
									{...$option({ value: subresult, label: subresult.title })} use:option
								>
									<div class="surface-3c2d90a018">
										<CornerDownRight class="surface-e5d26165c8" />
										<a
											class="surface-fc304e40e4"
											href={sanitizeLink(subresult.url)}
										>
											{subresult.title}
										</a>
									</div>
									<p class="surface-3bcedf56c8">
										{@html subresult.excerpt}
									</p>
								</div>
							{/each}
							{#if !isLast}
								<hr class="surface-464b00330d" />
							{/if}
						{/each}
					</div>
				{/await}
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	[data-melt-combobox-menu] :global(mark) {
		background-color: rgb(var(--color-magnum-400) / 0.5);
		color: rgb(var(--color-white) / 1);
		border-radius: 0.125rem;
		padding-inline: 1px;
		font-weight: 500;
	}

	.subresult :global(mark) {
		background-color: rgb(var(--color-magnum-400) / 0.5);
		color: rgb(var(--color-white) / 1);
		font-weight: 300;
	}

	[data-highlighted] {
		background-color: rgb(var(--color-magnum-400) / 0.25);
		color: rgb(var(--color-white) / 1);

	}
</style>
