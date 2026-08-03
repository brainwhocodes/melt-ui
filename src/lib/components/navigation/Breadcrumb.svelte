<script lang="ts">
	export let label = 'Breadcrumb';
	let className = '';
	export { className as class };
</script>

<nav {...$$restProps} class={`melt-breadcrumb ${className}`.trim()} aria-label={label}>
	<ol class="melt-breadcrumb__list">
		<slot />
	</ol>
</nav>
