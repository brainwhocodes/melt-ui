<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';


	interface Props {
		class?: string;
		disabled?: boolean;
		label?: string;
		onclick?: (event: MouseEvent) => void;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = '',
		disabled = false,
		label = 'Previous slide',
		onclick = undefined,
		children,
		...rest
	}: Props = $props();

	const carousel = getCarouselContext();
	const { activeIndex, indices, orientation } = carousel;

	function handleClick(event: MouseEvent): void {
		onclick?.(event);
		if (!event.defaultPrevented) carousel.goBy(-1);
	}

	let unavailable = $derived(disabled || !carousel.canGoPrevious($activeIndex, $indices));
</script>

<button
	{...rest}
	class={`melt-carousel-previous ${className}`.trim()}
	type="button"
	disabled={unavailable}
	aria-label={label}
	data-orientation={$orientation}
	onclick={handleClick}
>
	{#if children}{@render children()}{:else}Previous{/if}
</button>
