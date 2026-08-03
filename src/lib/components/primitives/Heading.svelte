<script lang="ts">
	type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
	type HeadingSize = 'display' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';


	interface Props {
		level?: HeadingLevel;
		size?: HeadingSize | undefined;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		level = 2,
		size = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	let tag = $derived(`h${level}` as const);
</script>

<svelte:element
	this={tag}
	{...rest}
	class={`melt-heading ${className}`}
	data-level={level}
	data-size={size ?? `h${level}`}
>
	{@render children?.()}
</svelte:element>
