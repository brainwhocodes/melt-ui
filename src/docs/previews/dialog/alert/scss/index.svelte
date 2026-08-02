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
	} = createDialog({
		role: 'alertdialog',
		forceVisible: true,
	});
</script>

<button
	use:melt={$trigger}
	class="preview-space-y-2  surface-2c55ef58a9"
>
	Delete Item
</button>

{#if $open}
	<div class="force-dark" use:melt={$portalled}>
		<div use:melt={$overlay} class="surface-7d84d46c1d" />
		<div
			class="preview-width-90vw  preview-surface-white  surface-8710a8c54f"
			transition:flyAndScale={{
				duration: 150,
				y: 8,
				start: 0.96,
			}}
			use:melt={$content}
		>
			<h2 use:melt={$title} class="surface-98a3a3c01f">
				Are you sure you want to delete this?
			</h2>
			<p use:melt={$description} class="surface-04a6d60390">
				This action cannot be undone. This will permanently delete the item and
				remove it from our servers.
			</p>

			<div class="surface-159fb8447e">
				<button
					use:melt={$close}
					class="preview-shape-4px  surface-da11152ac5"
				>
					Cancel
				</button>
				<button
					use:melt={$close}
					class="preview-shape-4px  surface-467b8b2eec"
				>
					Continue
				</button>
			</div>

			<button
				use:melt={$close}
				aria-label="Close"
				class="preview-width-6  preview-text-magnum-800  surface-5afd79389d"
			>
				<X class="surface-0423941971" />
			</button>
		</div>
	</div>
{/if}
