<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createPopover } from '$lib/index.js';
	import { Plus } from '$icons/index.js';
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createPopover({
		positioning: {
			placement: 'top',
			gutter: 8,
		},
		forceVisible: true,
		defaultOpen: true,
		closeOnOutsideClick: false,
		escapeBehavior: 'ignore',
		disableFocusTrap: true,
	});



	interface Props {
		class?: string;
		contentClass?: string;
	}

	let { class: className = '', contentClass = '' }: Props = $props();

	let popoverButton: HTMLButtonElement | undefined = $state();

	onMount(() => {
		open.set(true);
		setTimeout(() => {
			popoverButton?.blur();
		}, 100);
	});
</script>

<button
	type="button"
	class={cn(
		'surface-951129bb15',
		'surface-e01deefbd7',
		className
	)}
	{...$trigger} use:trigger
	bind:this={popoverButton}
	aria-label="Add"
>
	<Plus class="surface-6a2624a9d9" aria-label="plus" />
</button>

{#if $open}
	<div
		{...$content} use:content
		transition:fly={{ duration: 250, y: 4 }}
		class={cn('force-dark surface-131640e895', contentClass)}
	>
		<div {...$arrow} use:arrow></div>
		<p class="surface-95a442d548">Add item to library</p>
	</div>
{/if}
