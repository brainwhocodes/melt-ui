<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';
	import { fade, fly } from 'svelte/transition';
	// Internal helpers
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
		forceVisible: true,
	});
</script>

<button
	use:melt={$trigger}
	class="preview-type-medium  preview-focus-ring  surface-0ede2f4cbf"
>
	View Notifications
</button>
{#if $open}
	<div class="force-dark" use:melt={$portalled}>
		<div
			use:melt={$overlay}
			class="surface-17b7c335bb"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="preview-space-6  surface-bed45c66cb"
			transition:fly={{
				x: -350,
				duration: 300,
				opacity: 1,
			}}
		>
			<button
				use:melt={$close}
				aria-label="Close"
				class="preview-width-6  preview-text-magnum-800  preview-focus-ring-2  surface-31505c22d4"
			>
				<X class="surface-c910dd7715" />
			</button>
			<h2 use:melt={$title} class="surface-25558b1da8">
				Notifications
			</h2>
			<p use:melt={$description} class="surface-2b537ef33e">
				Check out your latest updates.
			</p>
			<section>
				<div class="surface-5563122b60">
					<h3 class="surface-94fa01e059">New invitation</h3>
					<p class="surface-9aaabcf807">
						You have been invited to join the <strong>Designers</strong> team.
					</p>
					<div class="surface-5a1861934b">
						<button
							class="preview-layout-center  preview-leading-none  preview-focus-ring-2  surface-c1b7343dea"
						>
							Reject
						</button>
						<button
							class="preview-layout-center  preview-leading-none  preview-focus-ring-2  surface-6f7fe26426"
						>
							Accept
						</button>
					</div>
				</div>
			</section>
		</div>
	</div>
{/if}
