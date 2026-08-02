<script lang="ts">
	import { createLinkPreview, melt } from '$lib/index.js';
	import { fly } from 'svelte/transition';

	const {
		elements: { trigger, content, arrow },
		states: { open },
	} = createLinkPreview({
		forceVisible: true,
	});
</script>

<a
	class="trigger"
	href="https://github.com/melt-ui/melt-ui"
	target="_blank"
	rel="noopener noreferrer"
	use:melt={$trigger}
>
	<img
		src="/logo_mark.svg"
		alt="Melt UI Logo"
		class="surface-a691a72e44"
	/>
	<span class="surface-88b9ceb8a6">Open Melt UI Details</span>
</a>

{#if $open}
	<div
		use:melt={$content}
		transition:fly={{ y: -5, duration: 100 }}
		class="force-dark surface-342363b8cb"
	>
		<div class="surface-49d98ce1c8">
			<div class="surface-592f882060">
				<img
					src="/logo_mark.svg"
					alt="Melt UI Logo"
					class="object-fit surface-b5b3832637"
				/>
				<div class="surface-8edb6f03eb">
					<div>
						<div class="surface-5405f3f52a">Melt UI</div>
						<div class="surface-aef92ba151">melt-ui/melt-ui</div>
					</div>
				</div>
				<div class="surface-d92ac4dc92">
					A set of accessible, unstyled component builders for Svelte &
					SvelteKit. Open source.
				</div>
				<div class="surface-52c7313821">
					<div class="surface-8b22ba4f4e">
						<div class="surface-0cf98131a7">2k</div>
						<div class="surface-e2d5374bac">Stars</div>
					</div>
					<div class="surface-6936150f30">
						<div class="surface-2ef16288fd">103</div>
						<div class="surface-709d182b0b">Forks</div>
					</div>
				</div>
			</div>
		</div>
		<div use:melt={$arrow} />
	</div>
{/if}

<style lang="scss">
	.trigger {
    display: flex;
    height: 3rem;
    width: 3rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    
    background-color: rgb(var(--color-white) / 1);
    padding: 0px;
    font-size: 0.875rem;
    line-height: 1.25rem;
    font-weight: 500;
    
    color: rgb(var(--color-magnum-900) / 1);
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms
}
	.trigger:hover {
    background-color: rgb(var(--color-white) / 0.9)
}
	.trigger:focus-visible {
    
    
    box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000;
    
    
    }
</style>
