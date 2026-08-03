<script lang="ts">
	let className = '';
	export { className as class };
</script>

<footer class={`melt-sheet__footer ${className}`.trim()} {...$$restProps}>
	<slot />
</footer>
