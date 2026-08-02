<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	import { createPopover, melt } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { Info } from '$icons/index.js';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createPopover();

	export let iconClasses = '';
	export let contentClasses = '';
</script>

<button use:melt={$trigger} aria-label="More info">
	<Info class={cn('surface-2edca20fab', iconClasses)} />
	<span class="surface-4b7396ff96">Open popover</span>
</button>
{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class={cn(
			'mdsvex surface-3913b2c9d7',
			contentClasses
		)}
	>
		<div use:melt={$arrow} />
		<p class="surface-7ff6331d58">
			<slot />
		</p>
	</div>
{/if}

<style lang="scss">
	div:focus {
    
    
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000 !important
}
	.docs-info-popover-icon--muted {
		color: rgb(var(--color-neutral-200) / 1);
	}
</style>

