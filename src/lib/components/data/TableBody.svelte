<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', children, ...rest }: Props = $props();

</script>

<tbody class={`melt-table-body ${className}`} {...rest}>
	{@render children?.()}
</tbody>
