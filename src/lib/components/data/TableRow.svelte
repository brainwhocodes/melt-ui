<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<tr class={`melt-table-row ${className}`} {...rest}>
	{@render children?.()}
</tr>
