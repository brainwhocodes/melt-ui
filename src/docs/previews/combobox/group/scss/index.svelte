<script lang="ts">
	import {
		createCombobox,
		melt,
		type ComboboxOptionProps,
	} from '$lib/index.js';
	import { Check, ChevronDown, ChevronUp } from '$icons/index.js';
	import { fly } from 'svelte/transition';

	type Manga = {
		author: string;
		title: string;
		disabled: boolean;
	};

	let mangas = {
		shonen: [
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
		],
		seinen: [
			{
				author: 'Kentaro Miura',
				title: 'Berserk',
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
		],
	};

	const toOption = (manga: Manga): ComboboxOptionProps<Manga> => ({
		value: manga,
		label: manga.title,
		disabled: manga.disabled,
	});

	const {
		elements: { menu, input, option, label, group, groupLabel },
		states: { open, inputValue, touchedInput, selected },
		helpers: { isSelected },
	} = createCombobox<Manga>({
		forceVisible: true,
	});

	$: if (!$open) {
		$inputValue = $selected?.label ?? '';
	}

	$: filteredMangas = $touchedInput
		? {
				shonen: mangas.shonen.filter(({ title, author }) => {
					const normalizedInput = $inputValue.toLowerCase();
					return (
						title.toLowerCase().includes(normalizedInput) ||
						author.toLowerCase().includes(normalizedInput)
					);
				}),
				seinen: mangas.seinen.filter(({ title, author }) => {
					const normalizedInput = $inputValue.toLowerCase();
					return (
						title.toLowerCase().includes(normalizedInput) ||
						author.toLowerCase().includes(normalizedInput)
					);
				}),
		  }
		: mangas;
</script>

<div class="surface-946773ead1">
	<!-- svelte-ignore a11y-label-has-associated-control - $label contains the 'for' attribute -->
	<label use:melt={$label}>
		<span class="surface-34ac3a4325"
			>Choose your favorite manga:</span
		>
	</label>

	<div class="surface-f488248834">
		<input
			use:melt={$input}
			class="surface-68e987f7dd"
			placeholder="Best book ever"
		/>
		<div class="surface-6b7723f0f1">
			{#if $open}
				<ChevronUp class="surface-77e5417b8c" />
			{:else}
				<ChevronDown class="surface-95c78f8780" />
			{/if}
		</div>
	</div>
</div>
{#if $open}
	<ul
		class="force-dark surface-aa5800d125"
		use:melt={$menu}
		transition:fly={{ duration: 150, y: -5 }}
	>
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class="surface-35659cfd73"
			tabindex="0"
		>
			{#each Object.entries(filteredMangas) as [key, arr]}
				<div use:melt={$group(key)}>
					<div
						class="surface-06f377b70a"
						use:melt={$groupLabel(key)}
					>
						{key}
					</div>
					{#each arr as manga, index (index)}
						<li
							use:melt={$option(toOption(manga))}
							class="surface-0d6f81a5ca"
						>
							{#if $isSelected(manga)}
								<div class="check surface-64ba54dabb">
									<Check class="surface-d74fe03e0b" />
								</div>
							{/if}
							<div class="surface-aad4c055cf">
								<span class="surface-ad9a97266c">{manga.title}</span>
								<span class="surface-7b9023dd41">{manga.author}</span>
							</div>
						</li>
					{:else}
						<li class="surface-6d523c71e8">
							No results found
						</li>
					{/each}
				</div>
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
