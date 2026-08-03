<script lang="ts">
	import { createDialog } from '$lib/index.js';
	/** Internal helpers */
	import { flyAndScale } from '$docs/utils/index.js';
	import { X } from '$icons/index.js';

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
	} = createDialog({ forceVisible: true });

	const {
		elements: {
			trigger: triggerNested,
			overlay: overlayNested,
			content: contentNested,
			title: titleNested,
			description: descriptionNested,
			close: closeNested,
			portalled: portalledNested,
		},
		states: { open: openNested },
	} = createDialog({ forceVisible: true });
</script>

<button
	{...$trigger} use:trigger
	class="preview-space-y-2  surface-0d7fdd63e5"
>
	Open Dialog
</button>
{#if $open}
	<div class="force-dark" {...$portalled} use:portalled>
		<div {...$overlay} use:overlay class="surface-5d6ee0227c"></div>
		<div
			class="preview-width-90vw  preview-surface-white  surface-c777f1a450"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			{...$content} use:content
		>
			<h2 {...$title} use:title class="surface-c72afabe49">
				First dialog
			</h2>
			<p {...$description} use:description class="surface-bfec6cb25c">
				This is the first dialog. It contains a trigger to open a second dialog.
			</p>

			<div class="surface-ae61395724">
				<button
					{...$close} use:close
					class="preview-shape-4px  surface-461c4ddca9"
				>
					Cancel
				</button>
				<button
					{...$triggerNested} use:triggerNested
					class="preview-shape-4px  surface-5d679b39fa"
				>
					Open second
				</button>
			</div>
			{#if $openNested}
				<div class="force-dark" {...$portalledNested} use:portalledNested>
					<div {...$overlayNested} use:overlayNested
						class="surface-092872f15c"></div>
					<div
						class="preview-width-90vw  preview-surface-white  surface-e5ec7c5441"
						transition:flyAndScale={{
							duration: 150,
							y: 8,
							start: 0.96,
						}}
						{...$contentNested} use:contentNested
					>
						<h2
							{...$titleNested} use:titleNested
							class="surface-ba94748bae"
						>
							Second dialog
						</h2>
						<p
							{...$descriptionNested} use:descriptionNested
							class="surface-0ff036f1ee"
						>
							This is the second dialog.
						</p>

						<div class="surface-a03ded7e53">
							<button
								{...$closeNested} use:closeNested
								class="preview-shape-4px  surface-2ae150687c"
							>
								Close
							</button>
						</div>

						<button
							{...$closeNested} use:closeNested
							class="preview-width-6  preview-text-magnum-800  surface-1b27b54550"
						>
							<X class="surface-b5ccd6fc62" />
						</button>
					</div>
				</div>
			{/if}
		</div>
		<button
			{...$close} use:close
			class="preview-width-6  preview-text-magnum-800  surface-4802d8c9a2"
		>
			<X />
		</button>
	</div>
{/if}
