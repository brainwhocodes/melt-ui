<script lang="ts">
	let className = '';
	export { className as class };
</script>

<header class={`melt-sheet__header ${className}`.trim()} {...$$restProps}>
	<slot />
</header>
