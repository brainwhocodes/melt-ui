<script lang="ts">
	let className = '';
	export { className as class };
</script>

<article {...$$restProps} class={`melt-card ${className}`.trim()}>
	<slot />
</article>
