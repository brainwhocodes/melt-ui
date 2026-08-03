<script lang="ts">

	interface Props {
		selected?: boolean;
		disabled?: boolean;
		class?: string;
		media?: import('svelte').Snippet;
		content?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		selected = false,
		disabled = false,
		class: className = '',
		media,
		content,
		children,
		actions,
		...rest
	}: Props = $props();

</script>

<div
	{...rest}
	class={`melt-item ${className}`}
	data-state={selected ? 'selected' : 'default'}
	data-selected={selected ? '' : undefined}
	data-disabled={disabled ? '' : undefined}
	aria-disabled={disabled || undefined}
>
	{#if media}
		<div class="melt-item-media">{@render media?.()}</div>
	{/if}
	<div class="melt-item-content">
		{#if content}{@render content()}{:else}{@render children?.()}{/if}
	</div>
	{#if actions}
		<div class="melt-item-actions">{@render actions?.()}</div>
	{/if}
</div>
