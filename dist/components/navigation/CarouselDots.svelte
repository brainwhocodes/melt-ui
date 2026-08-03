<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';

	let className = '';
	export { className as class };
	export let count: number | undefined = undefined;
	export let disabled = false;
	export let label = 'Choose slide';
	export let getLabel: (index: number) => string = (index) => `Go to slide ${index + 1}`;

	const carousel = getCarouselContext();
	const { activeIndex, indices } = carousel;

	$: dotIndices = count === undefined
		? $indices
		: Array.from({ length: Math.max(0, Math.trunc(count)) }, (_, index) => index);
</script>

<div
	{...$$restProps}
	class={`melt-carousel-dots ${className}`.trim()}
	role="group"
	aria-label={label}
>
	{#each dotIndices as index (index)}
		<button
			class="melt-carousel-dot"
			type="button"
			{disabled}
			aria-label={getLabel(index)}
			aria-current={$activeIndex === index ? 'true' : undefined}
			data-active={$activeIndex === index ? '' : undefined}
			on:click={() => carousel.scrollTo(index)}
		>
			<slot {index} active={$activeIndex === index}>
				<span class="melt-carousel-dot-indicator" aria-hidden="true"></span>
			</slot>
		</button>
	{/each}
</div>
