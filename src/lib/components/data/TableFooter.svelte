<script lang="ts">
	let className = '';
	export { className as class };
</script>

<tfoot class={`melt-table-footer ${className}`} {...$$restProps}>
	<slot />
</tfoot>
