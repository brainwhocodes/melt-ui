<script lang="ts">
	let className = '';
	export { className as class };
</script>

<header class={`melt-drawer__header ${className}`.trim()} {...$$restProps}>
	<slot />
</header>
