<script lang="ts">
	export let href: string | undefined = undefined;
	export let current = false;
	export let separator = '/';
	let className = '';
	export { className as class };
</script>

<li
	{...$$restProps}
	class={`melt-breadcrumb__item ${className}`.trim()}
	data-current={current ? '' : undefined}
>
	{#if href}
		<a class="melt-breadcrumb__link" {href} aria-current={current ? 'page' : undefined}>
			<slot />
		</a>
	{:else}
		<span class="melt-breadcrumb__label" aria-current={current ? 'page' : undefined}>
			<slot />
		</span>
	{/if}
	<span class="melt-breadcrumb__separator" aria-hidden="true">
		<slot name="separator">{separator}</slot>
	</span>
</li>
