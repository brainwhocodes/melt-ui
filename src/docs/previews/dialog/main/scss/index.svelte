<script lang="ts">
	import { createDialog } from '$lib/index.js';
	/** Internal helpers */
	import { flyAndScale } from '$docs/utils/index.js';
	import { X } from '$icons/index.js';
	import { fade } from 'svelte/transition';

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
		forceVisible: true,
	});
</script>

<button
	{...$trigger} use:trigger
	class="preview-space-y-3  preview-type-medium surface-47790e83b4"
>
	Open Dialog
</button>

{#if $open}
	<div class="force-dark" {...$portalled} use:portalled>
		<div {...$overlay} use:overlay
			class="surface-4e71bb1a87"
			transition:fade={{ duration: 150 }}></div>
		<div
			class="preview-width-90vw  preview-surface-white  surface-beeea33af6"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			{...$content} use:content
		>
			<h2 {...$title} use:title class="surface-faea41b343">
				Edit profile
			</h2>
			<p {...$description} use:description class="surface-0dbc85f30d">
				Make changes to your profile here. Click save when you're done.
			</p>

			<fieldset class="surface-f96e3dbb44">
				<label class="surface-6f13de77e2" for="name"> Name </label>
				<input
					class="preview-layout-center  surface-53fafe60c2"
					id="name"
					value="Thomas G. Lopes"
				/>
			</fieldset>
			<fieldset class="surface-afe7f80379">
				<label class="surface-ebae6f9c9d" for="username">
					Username
				</label>
				<input
					class="preview-layout-center  surface-e7d5f98c08"
					id="username"
					value="@thomasglopes"
				/>
			</fieldset>
			<div class="surface-8742e0703f">
				<button
					{...$close} use:close
					class="preview-shape-sm  surface-670c6c1119"
				>
					Cancel
				</button>
				<button
					{...$close} use:close
					class="preview-shape-sm  surface-07fce601a4"
				>
					Save changes
				</button>
			</div>
			<button
				{...$close} use:close
				aria-label="close"
				class="preview-control-none  preview-text-magnum-800  surface-09eddce863"
			>
				<X class="surface-7de33badc6" />
			</button>
		</div>
	</div>
{/if}
