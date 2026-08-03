<script lang="ts">
	let className = '';
	export { className as class };
</script>

<p {...$$restProps} class={`melt-card__description ${className}`.trim()}>
	<slot />
</p>
