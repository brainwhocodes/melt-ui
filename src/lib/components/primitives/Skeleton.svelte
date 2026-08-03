<script lang="ts">
	type SkeletonShape = 'rectangle' | 'circle' | 'text';
	type CssSize = number | string;


	interface Props {
		shape?: SkeletonShape;
		width?: CssSize | undefined;
		height?: CssSize | undefined;
		animated?: boolean;
		ariaHidden?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		shape = 'rectangle',
		width = undefined,
		height = undefined,
		animated = true,
		ariaHidden = true,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	const toCssSize = (value: CssSize | undefined) =>
		typeof value === 'number' ? `${value}px` : value;

	let widthValue = $derived(toCssSize(width));
	let heightValue = $derived(toCssSize(height));
	let inlineStyle = $derived([
		rest.style,
		widthValue ? `--melt-skeleton-width: ${widthValue}` : '',
		heightValue ? `--melt-skeleton-height: ${heightValue}` : '',
	]
		.filter(Boolean)
		.join('; '));
</script>

<span
	{...rest}
	class={`melt-skeleton ${className}`}
	style={inlineStyle}
	data-shape={shape}
	data-animated={animated ? '' : undefined}
	aria-hidden={ariaHidden}
>
	{@render children?.()}
</span>
