<script context="module" lang="ts">
	export type ButtonGroupOrientation = 'horizontal' | 'vertical';
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';


	let className = '';
	export { className as class };
	export let orientation: ButtonGroupOrientation = 'horizontal';

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		orientation?: ButtonGroupOrientation;
	};
</script>

<div
	{...$$restProps}
	class={`melt-button-group ${className}`.trim()}
	role="group"
	data-orientation={orientation}
>
	<slot />
</div>
