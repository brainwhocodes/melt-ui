<script lang="ts">
	let className = '';
	export { className as class };
</script>

<td class={`melt-table-cell ${className}`} {...$$restProps}>
	<slot />
</td>
