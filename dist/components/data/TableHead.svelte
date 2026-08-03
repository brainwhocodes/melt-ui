<script lang="ts">
	let className = '';
	export { className as class };
	export let scope: 'col' | 'row' | 'colgroup' | 'rowgroup' = 'col';
</script>

<th {scope} class={`melt-table-head ${className}`} {...$$restProps}>
	<slot />
</th>
