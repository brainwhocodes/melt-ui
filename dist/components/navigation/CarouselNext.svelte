<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { getCarouselContext } from './Carousel.svelte';

	let className = '';
	export { className as class };
	export let disabled = false;
	export let label = 'Next slide';

	const carousel = getCarouselContext();
	const { activeIndex, indices, orientation } = carousel;
	const dispatch = createEventDispatcher<{ click: MouseEvent }>();

	function handleClick(event: MouseEvent): void {
		const allowed = dispatch('click', event, { cancelable: true });
		if (allowed && !event.defaultPrevented) carousel.goBy(1);
	}

	$: unavailable = disabled || !carousel.canGoNext($activeIndex, $indices);
</script>

<button
	{...$$restProps}
	class={`melt-carousel-next ${className}`.trim()}
	type="button"
	disabled={unavailable}
	aria-label={label}
	data-orientation={$orientation}
	on:click={handleClick}
>
	<slot>Next</slot>
</button>
