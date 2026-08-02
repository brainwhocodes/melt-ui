<script lang="ts">
	import { createCombobox, melt } from '$lib/index.js';
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
		multiple: true,
	});

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

<div class="surface-26a3c3a082">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label}>
		<span class="surface-eeb5e9b216"
			>Choose your favorite manga:</span
		>
	</label>

	<div class="surface-f70d442bb4">
		<input
			use:melt={$input}
			class="surface-43bcb6e579"
			placeholder="Best book ever"
		/>
		<div class="surface-3089c0601e">
			{#if $open}
				<ChevronUp class="surface-d1e4599940" />
			{:else}
				<ChevronDown class="surface-2a0099d79d" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul
		class="force-dark surface-125f92ac2e"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="surface-de27e28cd9"
			tabindex="0"
		>
			{#each filteredMangas as book, index (index)}
				<li
					use:melt={$option({
						value: book,
						label: book.title,
						disabled: book.disabled,
					})}
					class="surface-333552bb13"
				>
					{#if $isSelected(book)}
						<div class="check surface-f80d6cd18b">
							<Check class="surface-e448456c78" />
						</div>
					{/if}
					<div class="surface-dd40231a2e">
						<span class="surface-0155f6d494">{book.title}</span>
						<span class="surface-79ce9d8a35">{book.author}</span>
					</div>
				</li>
			{:else}
				<li
					class="surface-8a43c80e72"
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
