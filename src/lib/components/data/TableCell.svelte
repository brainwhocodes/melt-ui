<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<td class={`melt-table-cell ${className}`} {...rest}>
	{@render children?.()}
</td>
