<script lang="ts">
	type TextElement = 'p' | 'span' | 'div' | 'small' | 'strong' | 'em';
	type TextVariant = 'body' | 'lead' | 'muted' | 'small';
	type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';


	interface Props {
		as?: TextElement;
		variant?: TextVariant;
		weight?: TextWeight;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		as = 'p',
		variant = 'body',
		weight = 'regular',
		class: className = '',
		children,
		...rest
	}: Props = $props();

</script>

<svelte:element
	this={as}
	{...rest}
	class={`melt-text ${className}`}
	data-variant={variant}
	data-weight={weight}
>
	{@render children?.()}
</svelte:element>
