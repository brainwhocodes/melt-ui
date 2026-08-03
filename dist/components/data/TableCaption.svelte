<script lang="ts">
	let className = '';
	export { className as class };
</script>

<caption class={`melt-table-caption ${className}`} {...$$restProps}>
	<slot />
</caption>
