<script lang="ts">
	import { untrack } from 'svelte';
	import { createLinkPreview, type CreateLinkPreviewProps } from '$lib/index.js';
	interface Props {
		[key: string]: any
	}

	let { ...rest }: Props = $props();

	type $$Props = CreateLinkPreviewProps;

	const {
		elements: { trigger, content, arrow },
	} = createLinkPreview(
		untrack(() => ({
			openDelay: 0,
			...rest,
		}))
	);
</script>

<a
	data-testid="trigger"
	class="trigger"
	href="https://github.com/melt-ui/melt-ui"
	target="_blank"
	rel="noopener noreferrer"
	{...$trigger} use:trigger
>
	<img
		src="/logo-mark.svg"
		alt="Melt UI Logo"
		class="surface-4b189cb6db"
	/>
	<span class="surface-43a79b87d9">Open Melt UI Details</span>
</a>

<div {...$content} use:content class="surface-449da680da" data-testid="content">
	<div class="surface-51c6b063e4">
		<div class="surface-5bc74db062">
			<img
				src="/logo-mark.svg"
				alt="Melt UI Logo"
				class="object-fit surface-4a9c89cb4b"
			/>
			<div class="surface-d99abd330b">
				<div>
					<div class="surface-60de120929">Melt UI</div>
					<div class="surface-af4e7e3abf">melt-ui/melt-ui</div>
				</div>
			</div>
			<div class="surface-32d3fac7b4" data-testid="highlight">
				A set of accessible, unstyled component builders for Svelte & SvelteKit. Open source.
			</div>
			<div class="surface-44942b1b68">
				<div class="surface-04016a7754">
					<div class="surface-06569e738e">618</div>
					<div class="surface-9c802f88cd">Stars</div>
				</div>
				<div class="surface-a876bcbc0e">
					<div class="surface-e072aace73">37</div>
					<div class="surface-d9f7bc65db">Forks</div>
				</div>
			</div>
		</div>
	</div>
	<div {...$arrow} use:arrow data-testid="arrow"></div>
</div>
<div data-testid="start"></div>

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
