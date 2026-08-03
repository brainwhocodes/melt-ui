<script lang="ts">
	import '@fontsource/inter/100.css';
	import INTER_100 from '@fontsource/inter/files/inter-latin-100-normal.woff2';
	import '@fontsource/inter/200.css';
	import INTER_200 from '@fontsource/inter/files/inter-latin-200-normal.woff2';
	import '@fontsource/inter/300.css';
	import INTER_300 from '@fontsource/inter/files/inter-latin-300-normal.woff2';
	import '@fontsource/inter/400.css';
	import INTER_400 from '@fontsource/inter/files/inter-latin-400-normal.woff2';
	import '@fontsource/inter/500.css';
	import INTER_500 from '@fontsource/inter/files/inter-latin-500-normal.woff2';
	import '@fontsource/inter/600.css';
	import INTER_600 from '@fontsource/inter/files/inter-latin-600-normal.woff2';
	import '@fontsource/inter/700.css';
	import INTER_700 from '@fontsource/inter/files/inter-latin-700-normal.woff2';
	import '@fontsource/inter/800.css';
	import INTER_800 from '@fontsource/inter/files/inter-latin-800-normal.woff2';
	import '@fontsource/inter/900.css';
	import INTER_900 from '@fontsource/inter/files/inter-latin-900-normal.woff2';

	import '$styles/app.scss';
	import '$lib/styles.css';

	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import { JsIndicator, SiteHeader } from '$docs/components/index.js';
	import { cn } from '$docs/utils/index.js';

	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';

	let mounted = false;

	onMount(() => {
		mounted = true;
	});

	$: isRoot = $page.url.pathname === '/';
</script>

<svelte:head>
	<link rel="preload" as="font" href={INTER_100} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_200} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_300} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_400} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_500} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_600} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_700} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_800} type="font/woff2" crossorigin="anonymous" />
	<link rel="preload" as="font" href={INTER_900} type="font/woff2" crossorigin="anonymous" />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<a
	href="#main"
	class="force-dark surface-f89ebd55c9"
	tabindex="0"
>
	Skip to main content
</a>
<div
	class="surface-126436ebcd"
	id="page"
	data-browser={mounted ? '' : undefined}
>
	<div class="surface-be15640c06">
		<slot />
	</div>
	<header
		class={cn(
			'surface-6e5eb57b48',
			!isRoot && 'surface-6cbd3303e8'
		)}
	>
		<div
			class="container surface-e150b7c93e"
		>
			<a
				class="new-version-link surface-5bbd64ba7b"
				href="https://next.melt-ui.com"
			>
				Check out the new version, with Runes!
			</a>
		</div>
		<SiteHeader />
	</header>

	{#if dev}
		<JsIndicator />
	{/if}
</div>

<style>
	.new-version-link {
		color: rgb(var(--color-magnum-900));
	}
</style>
