<script lang="ts">
	let className = '';
	export { className as class };
</script>

<tr class={`melt-table-row ${className}`} {...$$restProps}>
	<slot />
</tr>
