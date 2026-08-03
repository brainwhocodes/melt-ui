<script lang="ts">
	import { createPopover } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	import { Settings2, X } from '$icons/index.js';

	const {
		elements: { trigger, content, arrow, close },
		states: { open },
	} = createPopover();

	const {
		elements: {
			trigger: triggerA,
			content: contentA,
			arrow: arrowA,
			close: closeA,
		},
		states: { open: openA },
	} = createPopover({
		positioning: {
			placement: 'left',
		},
	});
</script>

<button
	type="button"
	class="trigger"
	{...$trigger} use:trigger
	aria-label="Update dimensions"
>
	<Settings2 class="surface-f3c1120cc5" />
	<span class="surface-4922f0581d">Open Popover</span>
</button>

{#if $open}
	<div
		{...$content} use:content
		transition:fade={{ duration: 100 }}
		class="force-dark surface-be21b14b20"
	>
		<div {...$arrow} use:arrow></div>
		<div class="surface-6ffbde4527">
			<button
				type="button"
				class="surface-7759b9ce65"
				{...$triggerA} use:triggerA
				aria-label="Change settings"
			>
				Open Nested
			</button>

			{#if $openA}
				<div
					{...$contentA} use:contentA
					transition:fade={{ duration: 100 }}
					class="force-dark surface-7e76baa7eb"
				>
					<div {...$arrowA} use:arrowA></div>
					<div class="surface-b70f9324c6">
						<p class="surface-c624461e9f">Dimensions</p>
						<fieldset>
							<label for="width" class="surface-bceb4e1b32"
								>Width</label
							>
							<input
								type="number"
								id="width"
								class="input"
								placeholder="Width"
							/>
						</fieldset>
						<fieldset>
							<label for="height" class="surface-11d154173e"
								>Height</label
							>
							<input
								type="number"
								id="height"
								class="input"
								placeholder="Height"
							/>
						</fieldset>
						<fieldset>
							<label for="depth" class="surface-d8a6137d85"
								>Depth</label
							>
							<input
								type="number"
								id="depth"
								class="input"
								placeholder="Depth"
							/>
						</fieldset>
						<fieldset>
							<label for="weight" class="surface-2863ef4743"
								>Weight</label
							>
							<input
								type="number"
								id="weight"
								class="input"
								placeholder="Weight"
							/>
						</fieldset>
					</div>
					<button class="close" {...$closeA} use:closeA>
						<X class="surface-a5546ffb70" />
					</button>
				</div>
			{/if}
		</div>
		<button class="close" {...$close} use:close>
			<X class="surface-2b1234aebe" />
		</button>
	</div>
{/if}

<style lang="scss">
	fieldset {

    display: flex;

    align-items: center;

    gap: 1.25rem
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

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;

    

    

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

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;

    

    

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

    

    

    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;

    

    

    }

	.close {

    

    background-color: rgb(var(--color-white) / 1);

    padding: 0px;

    font-size: 0.875rem;

    line-height: 1.25rem;

    font-weight: 500
}
</style>
