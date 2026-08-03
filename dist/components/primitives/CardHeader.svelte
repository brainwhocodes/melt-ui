<script lang="ts">
	let className = '';
	export { className as class };
</script>

<header {...$$restProps} class={`melt-card__header ${className}`.trim()}>
	<slot />
</header>
