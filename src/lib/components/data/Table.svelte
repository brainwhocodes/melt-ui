<script lang="ts">
	let className = '';
	export { className as class };
</script>

<table class={`melt-table ${className}`} {...$$restProps}>
	<slot />
</table>
