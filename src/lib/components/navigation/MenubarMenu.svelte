<script lang="ts">
	import { melt } from '$lib/internal/actions/index.js';
	import { untrack } from 'svelte';

	interface Props {
		instance: any;
		label: string;
		items: Array<{ value: string; label: string; disabled?: boolean }>;
		onSelect?: (value: string) => void;
	}

	let { instance, label, items, onSelect }: Props = $props();

	const {
		elements: { trigger, menu, item },
		states: { open },
	} = untrack(() => instance);
</script>

<div class="melt-menubar-menu" role="none">
	<button
		{...$trigger}
		use:trigger
		class="melt-menubar-trigger"
	>
		{label}
	</button>
	{#if $open}
		<div
			{...$menu}
			use:menu
			class="melt-menubar-content"
		>
			{#each items as it (it.value)}
				<div
					{...$item}
					use:item
					class="melt-menubar-item"
					aria-disabled={it.disabled}
					onclick={() => onSelect?.(it.value)}
				>
					{it.label}
				</div>
			{/each}
		</div>
	{/if}
</div>
