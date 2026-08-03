<script lang="ts">
	interface Props {
		href?: string | undefined;
		current?: boolean;
		separator?: string | import('svelte').Snippet;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any;
	}

	let {
		href = undefined,
		current = false,
		separator = '/',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<li
	{...rest}
	class={`melt-breadcrumb__item ${className}`.trim()}
	data-current={current ? '' : undefined}
>
	{#if href}
		<a class="melt-breadcrumb__link" {href} aria-current={current ? 'page' : undefined}>
			{@render children?.()}
		</a>
	{:else}
		<span class="melt-breadcrumb__label" aria-current={current ? 'page' : undefined}>
			{@render children?.()}
		</span>
	{/if}
	<span class="melt-breadcrumb__separator" aria-hidden="true">
		{#if typeof separator === 'string'}
			{separator}
		{:else}
			{@render separator()}
		{/if}
	</span>
</li>
