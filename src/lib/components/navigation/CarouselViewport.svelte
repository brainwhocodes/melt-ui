<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';


	interface Props {
		class?: string;
		label?: string;
		tabindex?: number;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = '',
		label = 'Slides',
		tabindex = 0,
		children,
		...rest
	}: Props = $props();

	const carousel = getCarouselContext();
	const { orientation } = carousel;
</script>

<!-- The labelled scroll viewport intentionally owns carousel keyboard navigation. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_no_noninteractive_element_interactions -->
<div
	{...rest}
	use:carousel.attachViewport
	class={`melt-carousel-viewport ${className}`.trim()}
	{tabindex}
	role="group"
	aria-label={label}
	data-orientation={$orientation}
	onkeydown={carousel.handleKeydown}
>
	<div class="melt-carousel-track">
		{@render children?.()}
	</div>
</div>
