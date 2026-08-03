<script lang="ts">
	let className = '';
	export { className as class };
</script>

<h3 {...$$restProps} class={`melt-card__title ${className}`.trim()}>
	<slot />
</h3>
