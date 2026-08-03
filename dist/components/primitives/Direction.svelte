<script context="module" lang="ts">
	export type DirectionValue = 'auto' | 'ltr' | 'rtl';
</script>

<script lang="ts">
	export let dir: DirectionValue = 'auto';
	let className = '';
	export { className as class };
</script>

<div
	{...$$restProps}
	class={`melt-direction ${className}`.trim()}
	{dir}
	data-direction={dir}
>
	<slot />
</div>
