<script lang="ts">
	export let side: 'top' | 'right' | 'bottom' | 'left' = 'right';
	let className = '';
	export { className as class };
</script>

<div
	class={`melt-sheet__content ${className}`.trim()}
	data-melt-sheet-content
	data-side={side}
	{...$$restProps}
>
	<slot />
</div>
