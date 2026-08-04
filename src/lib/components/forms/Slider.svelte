<script lang="ts">
	import { createSlider } from '$lib/builders/slider/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';
	import { writable } from 'svelte/store';

	interface Props {
		value?: number[];
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		orientation?: 'horizontal' | 'vertical';
		class?: string;
		onValueChange?: (value: number[]) => void;
		[key: string]: any;
	}

	let {
		value = $bindable([0]),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		orientation = 'horizontal',
		class: className = '',
		onValueChange,
		...rest
	}: Props = $props();

	const valueStore = writable(untrack(() => value));

	$effect(() => {
		if (value !== undefined) {
			valueStore.set(value);
		}
	});

	const {
		elements: { root, range, thumbs },
		states: { value: sliderValue },
	} = untrack(() =>
		createSlider({
			value: valueStore,
			min,
			max,
			step,
			disabled,
			orientation,
			onValueChange: (next) => {
				value = next.next;
				onValueChange?.(next.next);
				return next.next;
			},
		})
	);
</script>

<span
	{...$root}
	use:root
	class={`melt-slider ${className}`.trim()}
	data-orientation={orientation}
	{...rest}
>
	<span class="melt-slider-track">
		<span {...$range} use:range class="melt-slider-range"></span>
	</span>
	{#each $sliderValue as _, i}
		{@const thumbItem = $thumbs[i]}
		<span {...thumbItem} use:thumbs aria-label="Slider" class="melt-slider-thumb"></span>
	{/each}
</span>
