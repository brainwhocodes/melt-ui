<script lang="ts">
	import ThemeIcon from './theme-icon.svelte';
	import { getThemeCtx, themes } from './theme-switch.svelte';

	const {
		elements: { option },
	} = getThemeCtx();
</script>

{#each themes as { value, label }}
	<button
		{...$option({ value, label })} use:option
		class="preview-shape-md preview-space-x-2 preview-transition-colors preview-state-highlighted-surface-neutral-800 surface-f9219006a2"
	>
		<ThemeIcon theme={value} />
		<span class="surface-a4b52513de">{label}</span>
	</button>
{/each}
