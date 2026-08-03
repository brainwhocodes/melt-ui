<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<h2
	class={cn(
		'surface-14649bcad5',
		className
	)}
	data-toc=""
	{...rest}
>
	{@render children?.()}
</h2>
