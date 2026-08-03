<script lang="ts">
	let className = '';
	export { className as class };
</script>

<div {...$$restProps} class={`melt-card__content ${className}`.trim()}>
	<slot />
</div>
