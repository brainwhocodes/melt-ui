<script lang="ts">
	interface Props {
		side?: 'top' | 'right' | 'bottom' | 'left';
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { side = 'right', class: className = '', children, ...rest }: Props = $props();

</script>

<div
	class={`melt-sheet__content ${className}`.trim()}
	data-melt-sheet-content
	data-side={side}
	{...rest}
>
	{@render children?.()}
</div>
