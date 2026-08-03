<script lang="ts">
	import { createCombobox, type ComboboxOptionProps } from '$lib/index.js';
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
			author: 'ONE',
			title: 'Mob Psycho 100',
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
			author: 'Hiromu Arakawa',
			title: 'Fullmetal Alchemist',
			disabled: false,
		},
	];

	const toOption = (manga: Manga): ComboboxOptionProps<Manga> => ({
		value: manga,
		label: manga.title,
		disabled: manga.disabled,
	});

	const {
		elements: { menu, input, option, label },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox<Manga>({
		forceVisible: true,
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: filteredMangas = $touchedInput
		? mangas.filter(({ title, author }) => {
				const normalizedInput = $inputValue.toLowerCase();
				return (
					title.toLowerCase().includes(normalizedInput) ||
					author.toLowerCase().includes(normalizedInput)
				);
		  })
		: mangas;
</script>

<div class="surface-3a0b8a956a">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label {...$label} use:label>
		<span class="surface-c7268775fc"
			>Choose your favorite manga:</span
		>
	</label>

	<div class="surface-91b4bee35a">
		<input
			{...$input} use:input
			class="surface-0289c95293"
			placeholder="Best book ever"
		/>
		<div class="surface-cd3fd0f75d">
			{#if $open}
				<ChevronUp class="surface-7bc54a13ad" />
			{:else}
				<ChevronDown class="surface-5014cc1702" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul
		class="force-dark surface-72ebe52fe6"
		{...$menu} use:menu
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="surface-7dae47608d"
			tabindex="0"
		>
			{#each filteredMangas as manga, index (index)}
				<li
					{...$option(toOption(manga))} use:option
					class="surface-2e36ff3a53"
				>
					{#if $isSelected(manga)}
						<div class="check surface-a01da3a06c">
							<Check class="surface-82e7aced3f" />
						</div>
					{/if}
					<div class="surface-b99d11ea21">
						<span class="surface-9641d80c16">{manga.title}</span>
						<span class="surface-2a204ce8f9">{manga.author}</span>
					</div>
				</li>
			{:else}
				<li class="surface-3bf817c8ae">
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
