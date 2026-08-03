<script lang="ts">
	type SkeletonShape = 'rectangle' | 'circle' | 'text';
	type CssSize = number | string;

	export let shape: SkeletonShape = 'rectangle';
	export let width: CssSize | undefined = undefined;
	export let height: CssSize | undefined = undefined;
	export let animated = true;
	export let ariaHidden = true;

	let className = '';
	export { className as class };

	const toCssSize = (value: CssSize | undefined) =>
		typeof value === 'number' ? `${value}px` : value;

	$: widthValue = toCssSize(width);
	$: heightValue = toCssSize(height);
	$: inlineStyle = [
		$$restProps.style,
		widthValue ? `--melt-skeleton-width: ${widthValue}` : '',
		heightValue ? `--melt-skeleton-height: ${heightValue}` : '',
	]
		.filter(Boolean)
		.join('; ');
</script>

<span
	{...$$restProps}
	class={`melt-skeleton ${className}`}
	style={inlineStyle}
	data-shape={shape}
	data-animated={animated ? '' : undefined}
	aria-hidden={ariaHidden}
>
	<slot />
</span>
