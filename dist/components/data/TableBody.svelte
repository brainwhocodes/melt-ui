<script lang="ts">
	let className = '';
	export { className as class };
</script>

<tbody class={`melt-table-body ${className}`} {...$$restProps}>
	<slot />
</tbody>
