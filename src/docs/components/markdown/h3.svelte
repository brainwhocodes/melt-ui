<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<h3
	class={cn('surface-f764b01ebe', className)}
	data-toc=""
	{...rest}
>
	{@render children?.()}
</h3>
