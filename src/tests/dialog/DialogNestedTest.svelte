<script lang="ts">
	import { createDialog } from '$lib/index.js';
	import { fade } from 'svelte/transition';

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open },
	} = createDialog({});
	const {
		elements: {
			trigger: triggerA,
			overlay: overlayA,
			content: contentA,
			title: titleA,
			description: descriptionA,
			close: closeA,
			portalled: portalledA,
		},
		states: { open: openA },
	} = createDialog({});
</script>

<main>
	<button {...$trigger} use:trigger data-testid="trigger">Open</button>
	{#if $open}
		<div {...$portalled} use:portalled data-testid="portalled">
			<div {...$overlay} use:overlay data-testid="overlay" transition:fade></div>
			<div {...$content} use:content data-testid="content">
				<h2 {...$title} use:title>Title</h2>
				<p {...$description} use:description>Description</p>

				<button {...$close} use:close data-testid="closer">Close</button>
				<button {...$triggerA} use:triggerA data-testid="triggerA">Close2</button>
				{#if $openA}
					<div {...$portalledA} use:portalledA data-testid="portalledA">
						<div {...$overlayA} use:overlayA data-testid="overlayA"></div>
						<div {...$contentA} use:contentA data-testid="contentA" transition:fade>
							<h2 {...$titleA} use:titleA>Title</h2>
							<p {...$descriptionA} use:descriptionA>Description</p>

							<button {...$closeA} use:closeA data-testid="closerA">Close</button>
							<button {...$closeA} use:closeA data-testid="lastA">Close2</button>
						</div>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</main>

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
