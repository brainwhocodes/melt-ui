<script lang="ts">
	import { Monitor, Moon, Sun } from '$icons/index.js';
	import type { Theme } from './types.js';

	export let theme: Theme = 'light';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeMap = {
		sm: 'preview-height-3 preview-width-3',
		md: 'preview-height-5 preview-width-5',
		lg: 'preview-height-7 preview-width-7',
	};

	$: component = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
</script>

<svelte:component this={component} class={sizeMap[size]} />
