<script lang="ts">
	let className = '';
	export { className as class };
</script>

<footer {...$$restProps} class={`melt-card__footer ${className}`.trim()}>
	<slot />
</footer>
