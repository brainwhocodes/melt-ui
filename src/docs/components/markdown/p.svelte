<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<p class={cn('surface-4c5858f03d', className)} {...rest}>
	{@render children?.()}
</p>
