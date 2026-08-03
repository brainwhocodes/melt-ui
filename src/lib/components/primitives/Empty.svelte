<script lang="ts">
	interface Props {
		compact?: boolean;
		class?: string;
		icon?: import('svelte').Snippet;
		title?: import('svelte').Snippet;
		description?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		action?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		compact = false,
		class: className = '',
		icon,
		title,
		description,
		children,
		action,
		...rest
	}: Props = $props();

</script>

<div
	{...rest}
	class={`melt-empty ${className}`.trim()}
	data-compact={compact ? '' : undefined}
>
	{#if icon}
		<div class="melt-empty__icon">{@render icon?.()}</div>
	{/if}
	{#if title}
		<h3 class="melt-empty__title">{@render title?.()}</h3>
	{/if}
	{#if description}
		<div class="melt-empty__description">{@render description?.()}</div>
	{:else if children}
		<div class="melt-empty__description">{@render children?.()}</div>
	{/if}
	{#if action}
		<div class="melt-empty__action">{@render action?.()}</div>
	{/if}
</div>
