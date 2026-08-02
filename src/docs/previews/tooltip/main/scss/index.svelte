<script lang="ts">
	import { createTooltip, melt } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { Plus } from '$icons/index.js';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createTooltip({
		positioning: {
			placement: 'top',
		},
		openDelay: 0,
		closeDelay: 0,
		closeOnPointerDown: false,
		forceVisible: true,
	});
</script>

<button type="button" class="trigger" use:melt={$trigger} aria-label="Add">
	<Plus class="surface-b8e60f35b8" aria-label="plus" />
</button>

{#if $open}
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="force-dark surface-e226f73506"
	>
		<div use:melt={$arrow} />
		<p class="surface-76b448fcab">Add item to library</p>
	</div>
{/if}

<style lang="scss">
	.trigger {
    display: inline-flex;
    height: 2.25rem;
    width: 2.25rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    
    background-color: rgb(var(--color-white) / 1);
    
    color: rgb(var(--color-magnum-900) / 1);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms
}
	.trigger:hover {
    background-color: rgb(var(--color-white) / 0.9)
}
	.trigger:focus-visible {
    
    
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;
    
    
    }
	.trigger {
    padding: 0px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500
}
</style>
