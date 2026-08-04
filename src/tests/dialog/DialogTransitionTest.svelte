<script lang="ts">
	import { untrack } from 'svelte';
	import { createDialog, type CreateDialogProps } from '$lib/index.js';
	import { fade } from 'svelte/transition';
	interface Props {
		[key: string]: any
	}

	let { ...rest }: Props = $props();

	type $$Props = CreateDialogProps;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open },
	} = createDialog(
		untrack(() => ({ ...rest }))
	);
</script>

<main data-testid="main">
	<button {...$trigger} use:trigger data-testid="trigger">Open</button>
	{#if $open}
		<div {...$portalled} use:portalled data-testid="portalled">
			<div {...$overlay} use:overlay data-testid="overlay" transition:fade></div>
			<div {...$content} use:content data-testid="content" transition:fade>
				<h2 {...$title} use:title>Title</h2>
				<p {...$description} use:description>Description</p>

				<button {...$close} use:close data-testid="closer">Close</button>
				<button {...$close} use:close data-testid="last">Close2</button>
			</div>
		</div>
	{/if}
</main>
<div id="portal-target" data-testid="portal-target"></div>

<style lang="scss">
	[data-testid='overlay'] {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100vw;
		height: 100vh;
	}

	[data-testid='content'] {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: white;
		padding: 1rem;
	}
</style>
