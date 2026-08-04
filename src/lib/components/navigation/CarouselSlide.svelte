<script lang="ts">
	import { onDestroy, untrack } from 'svelte';
	import { getCarouselContext } from './Carousel.svelte';


	interface Props {
		class?: string;
		index: number;
		label?: string;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let {
		class: className = '',
		index,
		label = '',
		children,
		...rest
	}: Props = $props();

	const carousel = getCarouselContext();
	const { activeIndex } = carousel;
	let registeredIndex = $state(untrack(() => Math.max(0, Math.trunc(index))));
	let unregister = untrack(() => carousel.registerSlide(registeredIndex));

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

	let normalizedIndex = $derived(Number.isFinite(index) ? Math.max(0, Math.trunc(index)) : 0);
	$effect(() => {
		if (normalizedIndex !== registeredIndex) {
			unregister();
			registeredIndex = normalizedIndex;
			unregister = carousel.registerSlide(registeredIndex);
		}
	});

	onDestroy(() => unregister());
</script>

<div
	{...rest}
	use:attach={normalizedIndex}
	class={`melt-carousel-slide ${className}`.trim()}
	role="group"
	aria-roledescription="slide"
	aria-label={label || `Slide ${normalizedIndex + 1}`}
	aria-current={$activeIndex === normalizedIndex ? 'true' : undefined}
	data-active={$activeIndex === normalizedIndex ? '' : undefined}
	data-index={normalizedIndex}
>
	{@render children?.({ active: $activeIndex === normalizedIndex, })}
</div>
