<script lang="ts">
	export let keys: readonly string[] | undefined = undefined;
	export let separator = '+';
	export let label: string | undefined = undefined;

	let className = '';
	export { className as class };

	$: accessibleLabel = label ?? (keys?.length ? keys.join(' plus ') : undefined);
</script>

<kbd
	{...$$restProps}
	class={`melt-kbd ${className}`}
	aria-label={accessibleLabel}
>
	{#if keys?.length}
		{#each keys as key, index}
			{#if index > 0}<span class="melt-kbd-separator" aria-hidden="true">{separator}</span>{/if}
			<span class="melt-kbd-key">{key}</span>
		{/each}
	{:else}
		<slot />
	{/if}
</kbd>
