<script lang="ts">
	export let density: 'comfortable' | 'compact' = 'comfortable';

	let className = '';
	export { className as class };
</script>

<article
	{...$$restProps}
	class={`melt-typeset ${className}`}
	data-density={density}
>
	<slot />
</article>
