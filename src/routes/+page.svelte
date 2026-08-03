<script lang="ts">
	import Logo from '$docs/components/logo.svelte';
	import { Check, Copy } from '$icons/index.js';
	import { fly } from 'svelte/transition';
	import Accordion from './(landing-ui)/accordion.svelte';
	import Switch from './(landing-ui)/switch.svelte';
	import Popover from './(landing-ui)/popover.svelte';
	import Slider from './(landing-ui)/slider.svelte';
	import TagsInput from './(landing-ui)/tags-input.svelte';
	import Tabs from './(landing-ui)/tabs.svelte';
	import ToggleGroup from './(landing-ui)/toggle-group.svelte';
	import PinInput from './(landing-ui)/pin-input.svelte';
	import Toolbar from './(landing-ui)/toolbar.svelte';

	let copied = $state(false);
	let copytimeout: ReturnType<typeof setTimeout>;
	function copyInstallCommand() {
		navigator.clipboard.writeText(`npx @melt-ui/cli@latest init`);
		copied = true;
		clearTimeout(copytimeout);
		copytimeout = setTimeout(() => {
			copied = false;
		}, 2500);
	}
</script>

<svelte:head>
	<title>Melt UI</title>
</svelte:head>

<div class="surface-6697eecc81">
	<div class="surface-6b6db04515">
		<h1
			class="preview-offset-top-clamp-2rem-5vh-6rem surface-fc510fd660"
		>
			<Logo class="surface-0f0c047abd" /> <b>melt</b> away<br /> complexity
		</h1>

		<p
			class="surface-9d6e4e0133"
		>
			An open-source Svelte library for building high-quality, accessible design systems and web
			apps.
		</p>
		<button
			onclick={copyInstallCommand}
			class="text-md group surface-6cb894fbe5"
			aria-label="Copy install command"
		>
			<span>npx @melt-ui/cli@latest init</span>
			{#if copied}
				<div in:fly={{ y: -4 }}>
					<Check class="surface-d70d0a51eb" />
				</div>
			{:else}
				<div in:fly={{ y: 4 }}>
					<Copy class="surface-b241a74562" />
				</div>
			{/if}
		</button>
		<a
			href="/docs"
			class="force-dark surface-1702e49a6d"
		>
			Get started
		</a>
	</div>

	<div class="force-dark dotted-bg surface-6e6bbf39f3">
		<div
			class="preview-motion-y-clamp-0px-5vh-5rem surface-041ba41863"
		>
			<Accordion class="surface-7f29a76d66" />
			<Slider class="surface-7e485ca27b" />
			<Switch class="surface-383d41d7ca" />
			<TagsInput class="surface-c5691668bf" />
			<PinInput class="surface-633b72a829" />
			<Popover
				class="surface-0f523012e4"
				contentClass="preview-content-hidden-mobile"
			/>
			<Tabs class="surface-566fbc5ea0" />
			<ToggleGroup
				class="surface-53ca7c1707"
			/>
			<Toolbar class="surface-24bc70f06b" />
		</div>
	</div>
</div>

<style lang="scss">
	.dotted-bg {
		background-image: radial-gradient(
			circle at 1px 1px,
			rgb(var(--color-magnum-200) / 1) 2px,
			transparent 0
		);
		background-size: 1.5rem 1.5rem;
		background-repeat: repeat;
		background-position: 0.5rem center;

		position: relative;
	}

		.dotted-bg::after {
			position: absolute;
			content: '';
			inset: 0;
			background: linear-gradient(to bottom, rgb(var(--color-neutral-100) / 1) 0%, transparent 25%);
		}

	:global(:root.dark) .dotted-bg {
		background-image: radial-gradient(
			circle at 1px 1px,
			rgb(var(--color-magnum-200) / 0.25) 2px,
			transparent 0
		);
	}

	:global(:root.dark) .dotted-bg::after {
			background: linear-gradient(to bottom, rgb(var(--color-neutral-900) / 1) 0%, transparent 25%);
		}
</style>
