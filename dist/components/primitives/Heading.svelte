<script lang="ts">
	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
	type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

	export let level: HeadingLevel = 2;
	export let size: HeadingSize | undefined = undefined;

	let className = '';
	export { className as class };

	$: tag = `h${level}` as const;
</script>

<svelte:element
	this={tag}
	{...$$restProps}
	class={`melt-heading ${className}`}
	data-level={level}
	data-size={size ?? `h${level}`}
>
	<slot />
</svelte:element>
