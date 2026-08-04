<script lang="ts">
	import { untrack } from 'svelte';
	import { createDialog, type CreateDialogProps } from '$lib/index.js';
	import { initLevel } from './level.js';

	interface Props {
		portal: CreateDialogProps['portal'];
		forceVisible: CreateDialogProps['forceVisible'];
		children?: import('svelte').Snippet;
	}

	let { portal, forceVisible, children }: Props = $props();

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open },
	} = createDialog(untrack(() => ({ portal, forceVisible })));

	const level = initLevel();
</script>

<button {...$trigger} use:trigger data-testid="dialog-trigger-{level}">Open</button>

{#if $open || !forceVisible}
	<div {...$portalled} use:portalled data-testid="dialog-portalled-{level}">
		<div {...$overlay} use:overlay class="overlay" data-testid="dialog-overlay-{level}"></div>
		<div {...$content} use:content class="content" data-testid="dialog-content-{level}">
			<h2 {...$title} use:title>Title</h2>
			<p {...$description} use:description>Description</p>

			<button {...$close} use:close data-testid="dialog-closer-{level}">Close</button>
			{@render children?.()}
		</div>
	</div>
{/if}
<div data-testid="dialog-outside-{level}"></div>

<style lang="scss">
	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100vw;
		height: 100vh;
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 1rem;
	}
</style>
