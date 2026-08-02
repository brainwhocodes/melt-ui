<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';
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
	use:melt={$trigger}
	class="preview-space-y-2  surface-0d7fdd63e5"
>
	Open Dialog
</button>
{#if $open}
	<div class="force-dark" use:melt={$portalled}>
		<div use:melt={$overlay} class="surface-5d6ee0227c" />
		<div
			class="preview-width-90vw  preview-surface-white  surface-c777f1a450"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="surface-c72afabe49">
				First dialog
			</h2>
			<p use:melt={$description} class="surface-bfec6cb25c">
				This is the first dialog. It contains a trigger to open a second dialog.
			</p>

			<div class="surface-ae61395724">
				<button
					use:melt={$close}
					class="preview-shape-4px  surface-461c4ddca9"
				>
					Cancel
				</button>
				<button
					use:melt={$triggerNested}
					class="preview-shape-4px  surface-5d679b39fa"
				>
					Open second
				</button>
			</div>
			{#if $openNested}
				<div class="force-dark" use:melt={$portalledNested}>
					<div
						use:melt={$overlayNested}
						class="surface-092872f15c"
					/>
					<div
						class="preview-width-90vw  preview-surface-white  surface-e5ec7c5441"
						transition:flyAndScale={{
							duration: 150,
							y: 8,
							start: 0.96,
						}}
						use:melt={$contentNested}
					>
						<h2
							use:melt={$titleNested}
							class="surface-ba94748bae"
						>
							Second dialog
						</h2>
						<p
							use:melt={$descriptionNested}
							class="surface-0ff036f1ee"
						>
							This is the second dialog.
						</p>

						<div class="surface-a03ded7e53">
							<button
								use:melt={$closeNested}
								class="preview-shape-4px  surface-2ae150687c"
							>
								Close
							</button>
						</div>

						<button
							use:melt={$closeNested}
							class="preview-width-6  preview-text-magnum-800  surface-1b27b54550"
						>
							<X class="surface-b5ccd6fc62" />
						</button>
					</div>
				</div>
			{/if}
		</div>
		<button
			use:melt={$close}
			class="preview-width-6  preview-text-magnum-800  surface-4802d8c9a2"
		>
			<X />
		</button>
	</div>
{/if}
