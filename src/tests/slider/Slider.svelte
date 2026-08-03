<script lang="ts">
	import { createSlider, type CreateSliderProps } from '$lib/index.js';

	interface Props {
		value?: any;
		max?: number;
		min?: number;
		step?: number;
		onValueChange?: CreateSliderProps['onValueChange'];
		resetMin?: number | undefined;
		resetMax?: number | undefined;
		resetStep?: number | undefined;
	}

	let {
		value = [30],
		max = 100,
		min = 0,
		step = 1,
		onValueChange = undefined,
		resetMin = undefined,
		resetMax = undefined,
		resetStep = undefined
	}: Props = $props();

	const {
		elements: { root, range, thumbs, ticks },
		options: { min: optionsMin, max: optionsMax, step: optionsStep },
	} = createSlider({
		defaultValue: value,
		max,
		min,
		step,
		onValueChange,
	});

	$effect(() => {
		if (resetMin) {
			$optionsMin = resetMin;
		}
	});
	$effect(() => {
		if (resetMax) {
			$optionsMax = resetMax;
		}
	});
	$effect(() => {
		if (resetStep) {
			$optionsStep = resetStep;
		}
	});
</script>

<main>
	<span data-testid="slider" {...$root} use:root class="surface-3e356aa96f">
		<span class="surface-6a02132cd8">
			<span data-testid="range" {...$range} use:range class="surface-78f2f031a1"></span>
		</span>

		{#each $ticks as tick}
			<span {...tick} use:tick.action data-testid="tick"></span>
		{/each}

		<span aria-label="Volume"
			data-testid="thumb"
			{...$thumbs[0]} use:thumbs
			class="surface-94875c31b1"></span>
	</span>
</main>
