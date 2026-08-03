<script lang="ts">

	interface Props {
		keys?: readonly string[] | undefined;
		separator?: string;
		label?: string | undefined;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		keys = undefined,
		separator = '+',
		label = undefined,
		class: className = '',
		children,
		...rest
	}: Props = $props();


	let accessibleLabel = $derived(label ?? (keys?.length ? keys.join(' plus ') : undefined));
</script>

<kbd
	{...rest}
	class={`melt-kbd ${className}`}
	aria-label={accessibleLabel}
>
	{#if keys?.length}
		{#each keys as key, index}
			{#if index > 0}<span class="melt-kbd-separator" aria-hidden="true">{separator}</span>{/if}
			<span class="melt-kbd-key">{key}</span>
		{/each}
	{:else}
		{@render children?.()}
	{/if}
</kbd>
