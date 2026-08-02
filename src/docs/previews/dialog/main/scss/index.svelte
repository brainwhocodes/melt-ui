<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';
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
	use:melt={$trigger}
	class="preview-space-y-3  preview-type-medium surface-47790e83b4"
>
	Open Dialog
</button>

{#if $open}
	<div class="force-dark" use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="surface-4e71bb1a87"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="preview-width-90vw  preview-surface-white  surface-beeea33af6"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="surface-faea41b343">
				Edit profile
			</h2>
			<p use:melt={$description} class="surface-0dbc85f30d">
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
					use:melt={$close}
					class="preview-shape-sm  surface-670c6c1119"
				>
					Cancel
				</button>
				<button
					use:melt={$close}
					class="preview-shape-sm  surface-07fce601a4"
				>
					Save changes
				</button>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="preview-control-none  preview-text-magnum-800  surface-09eddce863"
			>
				<X class="surface-7de33badc6" />
			</button>
		</div>
	</div>
{/if}
