<script lang="ts">
	import { getCarouselContext } from './Carousel.svelte';


	interface Props {
		class?: string;
		count?: number | undefined;
		disabled?: boolean;
		label?: string;
		getLabel?: (index: number) => string;
		children?: import('svelte').Snippet<[any]>;
		[key: string]: any
	}

	let {
		class: className = '',
		count = undefined,
		disabled = false,
		label = 'Choose slide',
		getLabel = (index) => `Go to slide ${index + 1}`,
		children,
		...rest
	}: Props = $props();

	const carousel = getCarouselContext();
	const { activeIndex, indices } = carousel;

	let dotIndices = $derived(count === undefined
		? $indices
		: Array.from({ length: Math.max(0, Math.trunc(count)) }, (_, index) => index));
</script>

<div
	{...rest}
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
			onclick={() => carousel.scrollTo(index)}
		>
			{#if children}{@render children({ index, active: $activeIndex === index, })}{:else}
				<span class="melt-carousel-dot-indicator" aria-hidden="true"></span>
			{/if}
		</button>
	{/each}
</div>
