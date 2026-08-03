<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';

	let className = '';
	export { className as class };
	export let label = 'Slides';
	export let tabindex = 0;

	const carousel = getCarouselContext();
	const { orientation } = carousel;
</script>

<!-- The labelled scroll viewport intentionally owns carousel keyboard navigation. -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex a11y-no-noninteractive-element-interactions -->
<div
	{...$$restProps}
	use:carousel.attachViewport
	class={`melt-carousel-viewport ${className}`.trim()}
	{tabindex}
	role="group"
	aria-label={label}
	data-orientation={$orientation}
	on:keydown={carousel.handleKeydown}
>
	<div class="melt-carousel-track">
		<slot />
	</div>
</div>
