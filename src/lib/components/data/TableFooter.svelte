<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<tfoot class={`melt-table-footer ${className}`} {...rest}>
	{@render children?.()}
</tfoot>
