<script lang="ts">

	interface Props {
		class?: string;
		scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', scope = 'col', children, ...rest }: Props = $props();
</script>

<th {scope} class={`melt-table-head ${className}`} {...rest}>
	{@render children?.()}
</th>
