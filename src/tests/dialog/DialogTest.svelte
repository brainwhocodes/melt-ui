<script lang="ts">
	import { untrack } from 'svelte';
	import { createDialog, type CreateDialogProps } from '$lib/index.js';
	import { kbd } from '$lib/internal/helpers/keyboard.js';
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
	<button id="closeFocus" data-testid="closeFocus">Focus Me</button>
	<button {...$trigger} use:trigger data-testid="trigger">Open</button>
	<div {...$portalled} use:portalled data-testid="portalled">
		<div {...$overlay} use:overlay data-testid="overlay"></div>
		<div {...$content} use:content data-testid="content">
			<h2 {...$title} use:title data-testid="title">Title</h2>
			<p {...$description} use:description data-testid="description">Description</p>
			<button onclick={() => open.update((p) => !p)} data-testid="toggle-open">toggle open</button>
			<button
				data-testid="escape-interceptor"
				onkeydown={(e) => e.key === kbd.ESCAPE && e.stopPropagation()}
			>
				escape interceptor
			</button>

			<button {...$close} use:close data-testid="closer">Close</button>
			<button {...$close} use:close data-testid="last">Close</button>
			<div tabindex="-1" role="button" id="openFocus" data-testid="openFocus">hello world</div>
		</div>
	</div>
</main>
<div id="portal-target" data-testid="portal-target"></div>

<button onclick={(e) => e.stopPropagation()} data-testid="click-interceptor">click interceptor</button>
<button onpointerdown={(e) => e.stopPropagation()} data-testid="pointerdown-interceptor">
	pointerdown interceptor
</button>
<button onpointerup={(e) => e.stopPropagation()} data-testid="pointerup-interceptor">
	pointerup interceptor
</button>
<button onmousedown={(e) => e.stopPropagation()} data-testid="mousedown-interceptor">
	mousedown interceptor
</button>
<button onmouseup={(e) => e.stopPropagation()} data-testid="mouseup-interceptor">mouseup interceptor</button>
<button ontouchstart={(e) => e.stopPropagation()} data-testid="touchstart-interceptor">
	touchstart interceptor
</button>
<button ontouchend={(e) => e.stopPropagation()} data-testid="touchend-interceptor">
	touchend interceptor
</button>
<button
	ontouchend={(e) => {
		e.preventDefault();
		e.stopPropagation();
	}}
	data-testid="touchend-prevent-default-interceptor"
>
	touchend prevent default interceptor
</button>

{#if $open}
	<!-- Floating close -->
	<button {...$close} use:close data-testid="floating-closer">Close</button>
{/if}

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

	[data-testid='floating-closer'] {
		position: absolute;
		top: 0;
		right: 0;
		z-index: 999;
	}
</style>
