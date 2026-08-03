<script lang="ts">
	type TextElement = 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';
	type TextVariant = 'body' | 'lead' | 'muted' | 'small';
	type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

	export let as: TextElement = 'p';
	export let variant: TextVariant = 'body';
	export let weight: TextWeight = 'regular';

	let className = '';
	export { className as class };
</script>

<svelte:element
	this={as}
	{...$$restProps}
	class={`melt-text ${className}`}
	data-variant={variant}
	data-weight={weight}
>
	<slot />
</svelte:element>
