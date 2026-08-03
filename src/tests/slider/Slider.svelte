<script lang="ts">
	import { createSlider, type CreateSliderProps } from '$lib/index.js';

	export let value = [30];
	export let max = 100;
	export let min = 0;
	export let step = 1;
	export let onValueChange: CreateSliderProps['onValueChange'] = undefined;
	export let resetMin: number | undefined = undefined;
	export let resetMax: number | undefined = undefined;
	export let resetStep: number | undefined = undefined;

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

	$: if (resetMin) {
		$optionsMin = resetMin;
	}
	$: if (resetMax) {
		$optionsMax = resetMax;
	}
	$: if (resetStep) {
		$optionsStep = resetStep;
	}
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
