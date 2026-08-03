<script lang="ts">
	import { createCombobox } from '$lib/index.js';
	import { Check, ChevronDown, ChevronUp } from '$icons/index.js';
	import { fly } from 'svelte/transition';

	type Manga = {
		author: string;
		title: string;
		disabled: boolean;
	};

	let mangas: Manga[] = [
		{
			author: 'Kentaro Miura',
			title: 'Berserk',
			disabled: false,
		},
		{
			author: 'Hajime Isayama',
			title: 'Attack on Titan',
			disabled: false,
		},
		{
			author: 'Junji Ito',
			title: 'Uzumaki',
			disabled: false,
		},
		{
			author: 'Yomi Sarachi',
			title: 'Steins Gate',
			disabled: false,
		},
		{
			author: 'Tite Kubo',
			title: 'Bleach',
			disabled: false,
		},
		{
			author: 'Masashi Kishimoto',
			title: 'Naruto',
			disabled: true,
		},
		{
			author: 'Katsura Hoshino',
			title: 'D.Gray Man',
			disabled: false,
		},
		{
			author: 'Tsugumi Ohba',
			title: 'Death Note',
			disabled: false,
		},
		{
			author: 'ONE',
			title: 'Mob Psycho 100',
			disabled: false,
		},
		{
			author: 'Hiromu Arakawa',
			title: 'Fullmetal Alchemist',
			disabled: false,
		},
	];

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput },
		helpers: { isSelected },
	} = createCombobox({
		forceVisible: true,
	});

	let debounceTimer: ReturnType<typeof setTimeout>;

	const debounce = (callback: () => void) => {
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(callback, 450);
	};

	let filteredMangas = mangas;

	$: {
		if ($touchedInput) {
			debounce(() => {
				filteredMangas = mangas.filter(({ title, author }) => {
					const normalizedInput = $inputValue.toLowerCase();
					return (
						title.toLowerCase().includes(normalizedInput) ||
						author.toLowerCase().includes(normalizedInput)
					);
				});
			});
		} else {
			filteredMangas = mangas;
		}
	}
</script>

<div class="surface-c854410cf3">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label {...$label} use:label>
		<span class="surface-b1d8e1adfc"
			>Choose your favorite manga:</span
		>
	</label>

	<div class="surface-390ca83d37">
		<input
			{...$input} use:input
			class="surface-2ddbf05898"
			placeholder="Best book ever"
		/>
		<div class="surface-c9677d88f7">
			{#if $open}
				<ChevronUp class="surface-32f5ee2484" />
			{:else}
				<ChevronDown class="surface-62fcb823c1" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul
		class="force-dark surface-e6eb2445f0"
		{...$menu} use:menu
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="surface-5e1ab10600"
			tabindex="0"
		>
			{#each filteredMangas as book, index (index)}
				<li
					{...$option({
						value: book,
						label: book.title,
						disabled: book.disabled,
					})} use:option
					class="surface-78065e17c6"
				>
					{#if $isSelected(book)}
						<div class="check surface-4514187d36">
							<Check class="surface-7238f2ab98" />
						</div>
					{/if}
					<div class="surface-0e5cc96061">
						<span class="surface-a138273823">{book.title}</span>
						<span class="surface-f8af3abf19">{book.author}</span>
					</div>
				</li>
			{:else}
				<li
					class="surface-a97b76b739"
				>
					No results found
				</li>
			{/each}
		</div>
	</ul>
{/if}

<style lang="scss">
	.check {
		position: absolute;
		left: 0.5rem;
		top: 50%;
		
		color: rgb(var(--color-magnum-500) / 1);
		translate: 0 calc(-50% + 1px)
}
</style>
