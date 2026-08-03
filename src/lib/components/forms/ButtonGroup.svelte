<script module lang="ts">
	export type ButtonGroupOrientation = 'horizontal' | 'vertical';
</script>

<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';



	interface Props {
		class?: string;
		orientation?: ButtonGroupOrientation;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = '', orientation = 'horizontal', children, ...rest }: Props = $props();

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		orientation?: ButtonGroupOrientation;
	};
</script>

<div
	{...rest}
	class={`melt-button-group ${className}`.trim()}
	role="group"
	data-orientation={orientation}
>
	{@render children?.()}
</div>
