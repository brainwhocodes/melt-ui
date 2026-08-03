<script lang="ts">
	import { createDialog } from '$lib/index.js';
	/** Internal helpers */
	import { flyAndScale } from '$docs/utils/index.js';
	import { X } from '$icons/index.js';
	import { writable } from 'svelte/store';

	const customOpen = writable(false);

	const {
		elements: {
			trigger,
			overlay,
			content,
			title,
			description,
			close,
			portalled,
		},
		states: { open },
	} = createDialog({
		open: customOpen,
		forceVisible: true,
	});
</script>

<button
	{...$trigger} use:trigger
	class="preview-space-y-2  surface-99b29a0836"
>
	Open Dialog
</button>
{#if $open}
	<div class="force-dark" {...$portalled} use:portalled>
		<div {...$overlay} use:overlay class="surface-890b993a6f"></div>
		<div
			class="preview-width-90vw  preview-surface-white  surface-7a9f76b775"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			{...$content} use:content
		>
			<h2 {...$title} use:title class="surface-aee068755c">
				Edit profile
			</h2>
			<p {...$description} use:description class="surface-cb7f88c293">
				Make changes to your profile here. Click save when you're done.
			</p>

			<fieldset class="surface-0a15852a03">
				<label class="surface-7a5b571f49" for="name">
					Name
				</label>
				<input
					class="preview-layout-center  surface-46fbcc9989"
					id="name"
					value="Thomas G. Lopes"
				/>
			</fieldset>
			<fieldset class="surface-933a760f1e">
				<label class="surface-3273ca52cd" for="username">
					Username
				</label>
				<input
					class="preview-layout-center  surface-a77deb4e8a"
					id="username"
					value="@thomasglopes"
				/>
			</fieldset>
			<div class="surface-0da5693fbe">
				<button
					{...$close} use:close
					class="preview-shape-4px  surface-4a71dffb04"
				>
					Cancel
				</button>
				<button
					{...$close} use:close
					class="preview-shape-4px  surface-489032f9de"
				>
					Save changes
				</button>
			</div>

			<button
				{...$close} use:close
				aria-label="close"
				class="preview-width-6  preview-text-magnum-800  surface-e995da33b4"
			>
				<X class="surface-41f7d542c0" />
			</button>
		</div>
	</div>
{/if}
