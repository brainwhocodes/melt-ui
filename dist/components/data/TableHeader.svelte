<script lang="ts">
	let className = '';
	export { className as class };
</script>

<thead class={`melt-table-header ${className}`} {...$$restProps}>
	<slot />
</thead>
