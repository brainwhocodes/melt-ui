<script lang="ts">
	import { createPopover, type CreatePopoverProps } from '$lib/index.js';
	import { Settings2, X } from '$icons/index.js';
	import { kbd } from '$lib/internal/helpers/keyboard.js';
	import { onMount } from 'svelte';

	interface Props {
		openFocus?: CreatePopoverProps['openFocus'];
		closeFocus?: CreatePopoverProps['closeFocus'];
		[key: string]: any
	}

	let { openFocus = undefined, closeFocus = undefined, ...rest }: Props = $props();
	type $$Props = CreatePopoverProps;

	let showSelfRemovingButton = $state(true);
	let shadowHost: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!shadowHost) return;
		const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
		const button = document.createElement('button');
		button.textContent = 'Shadow outside';
		shadowRoot.append(button);
	});

	const {
		elements: { trigger, content, arrow, close, overlay },
		states: { open },
	} = createPopover({
		openFocus,
		closeFocus,
		...rest,
	});

	const {
		elements: { trigger: triggerB, content: contentB },
	} = createPopover();
</script>

<button data-testid="closeFocus" id="closeFocus"> focus me on close </button>

<button
	type="button"
	class="trigger"
	{...$trigger} use:trigger
	aria-label="Update dimensions"
	data-testid="trigger"
>
	<Settings2 class="surface-3792ff8cab" />
	<span class="surface-d9f6dc7cd1">Open Popover</span>
</button>

<div {...$content} use:content class="content" data-testid="content">
	<div {...$arrow} use:arrow data-testid="arrow"></div>
	<div class="surface-07a37995d4">
		<p>Dimensions</p>
		<fieldset>
			<label for="width">Width</label>
			<input type="number" id="width" class="input" placeholder="Width" data-testid="input1" />
		</fieldset>
		<fieldset>
			<label for="height">Height</label>
			<input type="number" id="height" class="input" placeholder="Height" data-testid="input2" />
		</fieldset>
		<fieldset>
			<label for="depth">Depth</label>
			<input type="number" id="depth" class="input" placeholder="Depth" data-testid="input3" />
		</fieldset>
		<fieldset>
			<label for="weight">Weight</label>
			<input type="number" id="weight" class="input" placeholder="Weight" data-testid="input4" />
		</fieldset>
		<button
			onkeydown={(e) => e.key === kbd.ESCAPE && e.stopPropagation()}
			data-testid="escape-interceptor"
		>
			escape interceptor
		</button>
		<button onclick={() => open.update((p) => !p)} data-testid="toggle-open">toggle open</button>
	</div>
	<button class="close" {...$close} use:close data-testid="close">
		<X class="surface-06b5214a49" />
	</button>
	<button data-testid="openFocus" id="openFocus"> focus me on open </button>
</div>
<div {...$overlay} use:overlay data-testid="overlay"></div>
<button data-testid="outside">Outside</button>
<button onclick={(e) => e.stopPropagation()} data-testid="click-interceptor">click interceptor</button>
{#if showSelfRemovingButton}
	<button onclick={() => (showSelfRemovingButton = false)}>Remove me</button>
{/if}
<canvas aria-hidden="true" data-testid="outside-canvas">Outside interaction target</canvas>
<div bind:this={shadowHost} data-testid="shadow-host"></div>

<button type="button" class="trigger" {...$triggerB} use:triggerB data-testid="trigger-2">
	<span>Open Popover</span>
</button>
<div {...$contentB} use:contentB class="content" data-testid="content-2">
	<div class="surface-2dfc7ef11d">
		<p>Dimensions</p>
	</div>
</div>

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

    z-index: 10;

    width: 15rem;

    border-radius: 4px;



    background-color: rgb(var(--color-white) / 1);

    padding: 1.25rem;





    box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 2px 0 rgb(0 0 0 / 0.05)
}
</style>
