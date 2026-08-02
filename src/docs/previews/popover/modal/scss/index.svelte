<script lang="ts">
	import { createPopover, melt } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { Settings2, X } from '$icons/index.js';

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open },
	} = createPopover({
		forceVisible: true,
		preventScroll: true,
	});
</script>

<button
	type="button"
	class="trigger"
	use:melt={$trigger}
	aria-label="Update dimensions"
>
	<Settings2 class="surface-a38d397ce6" />
	<span class="surface-d65833c84f">Open Popover</span>
</button>

{#if $open}
	<div use:melt={$overlay} class="surface-502278e58a" />
	<div
		use:melt={$content}
		transition:fade={{ duration: 100 }}
		class="force-dark content"
	>
		<div use:melt={$arrow} />
		<div class="surface-7f0ac0422b">
			<p>Dimensions</p>
			<fieldset>
				<label for="width">Width</label>
				<input type="number" id="width" class="input" placeholder="Width" />
			</fieldset>
			<fieldset>
				<label for="height">Height</label>
				<input type="number" id="height" class="input" placeholder="Height" />
			</fieldset>
			<fieldset>
				<label for="depth">Depth</label>
				<input type="number" id="depth" class="input" placeholder="Depth" />
			</fieldset>
			<fieldset>
				<label for="weight">Weight</label>
				<input type="number" id="weight" class="input" placeholder="Weight" />
			</fieldset>
		</div>
		<button class="close" use:melt={$close}>
			<X class="surface-62e519e25d" />
		</button>
	</div>
{/if}

<style lang="scss">
	fieldset {

    display: flex;

    align-items: center;

    gap: 1.25rem
}

	label {

    width: 75px;

    font-size: 0.875rem;

    line-height: 1.25rem;

    

    color: rgb(var(--color-neutral-700) / 1)
}

	p {

    margin-bottom: 0.5rem;

    font-weight: 500;

    

    color: rgb(var(--color-neutral-900) / 1)
}

	.input {

    display: flex;

    height: 2rem;

    width: 100%;

    border-radius: 0.375rem;

    border-width: 1px;

    

    border-color: rgb(var(--color-magnum-800) / 1);

    background-color: transparent;

    padding-left: 0.625rem;

    padding-right: 0.625rem;

    font-size: 0.875rem;

    line-height: 1.25rem;

    }

	.input:focus-visible {

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    

    

    }

	.input {

    flex: 1 1 0%;

    align-items: center;

    justify-content: center;

    padding-left: 0.625rem;

    padding-right: 0.625rem;

    font-size: 0.875rem;

    line-height: 1.25rem;

    line-height: 1;

    

    color: rgb(var(--color-magnum-700) / 1)
}

	.trigger {

    display: inline-flex;

    height: 2.25rem;

    width: 2.25rem;

    align-items: center;

    justify-content: center;

    border-radius: 9999px;

    

    background-color: rgb(var(--color-white) / 1);

    padding: 0px;

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 500;

    

    color: rgb(var(--color-magnum-900) / 1);

    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	.trigger:hover {

    background-color: rgb(var(--color-white) / 0.9)
}

	.trigger:focus-visible {

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    

    

    }

	.close {

    position: absolute;

    right: 0.375rem;

    top: 0.375rem;

    display: flex;

    height: 1.75rem;

    width: 1.75rem;

    align-items: center;

    justify-content: center;

    border-radius: 9999px;

    

    color: rgb(var(--color-magnum-900) / 1);

    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;

    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

    transition-duration: 150ms
}

	.close:hover {

    background-color: rgb(var(--color-magnum-500) / 0.1)
}

	.close:focus-visible {

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05);

    

    

    }

	.close {

    

    background-color: rgb(var(--color-white) / 1);

    padding: 0px;

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 500
}

	.content {

    z-index: 40;

    width: 15rem;

    border-radius: 4px;

    

    background-color: rgb(var(--color-white) / 1);

    padding: 1.25rem;

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)
}
</style>
