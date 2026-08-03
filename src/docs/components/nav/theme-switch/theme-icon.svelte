<script lang="ts">
	import { Monitor, Moon, Sun } from '$icons/index.js';
	import type { Theme } from './types.js';

	interface Props {
		theme?: Theme;
		size?: 'sm' | 'md' | 'lg';
	}

	let { theme = 'light', size = 'md' }: Props = $props();

	const sizeMap = {
		sm: 'preview-height-3 preview-width-3',
		md: 'preview-height-5 preview-width-5',
		lg: 'preview-height-7 preview-width-7',
	};

	let component = $derived(theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor);

	const SvelteComponent = $derived(component);
</script>

<SvelteComponent class={sizeMap[size]} />
