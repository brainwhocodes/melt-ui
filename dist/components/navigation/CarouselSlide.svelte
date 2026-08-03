<script lang="ts">
	import { onDestroy } from 'svelte';
	import { getCarouselContext } from './Carousel.svelte';

	let className = '';
	export { className as class };
	export let index: number;
	export let label = '';

	const carousel = getCarouselContext();
	const { activeIndex } = carousel;
	let registeredIndex = Math.max(0, Math.trunc(index));
	let unregister = carousel.registerSlide(registeredIndex);

	function attach(node: HTMLElement, slideIndex: number) {
		let registration = carousel.attachSlide(node, slideIndex);
		return {
			update(nextIndex: number) {
				registration.destroy();
				registration = carousel.attachSlide(node, nextIndex);
			},
			destroy() {
				registration.destroy();
			},
		};
	}

	$: normalizedIndex = Number.isFinite(index) ? Math.max(0, Math.trunc(index)) : 0;
	$: if (normalizedIndex !== registeredIndex) {
		unregister();
		registeredIndex = normalizedIndex;
		unregister = carousel.registerSlide(registeredIndex);
	}

	onDestroy(() => unregister());
</script>

<div
	{...$$restProps}
	use:attach={normalizedIndex}
	class={`melt-carousel-slide ${className}`.trim()}
	role="group"
	aria-roledescription="slide"
	aria-label={label || `Slide ${normalizedIndex + 1}`}
	aria-current={$activeIndex === normalizedIndex ? 'true' : undefined}
	data-active={$activeIndex === normalizedIndex ? '' : undefined}
	data-index={normalizedIndex}
>
	<slot active={$activeIndex === normalizedIndex} />
</div>
