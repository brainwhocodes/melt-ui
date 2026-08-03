<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<ol class={cn('surface-d252eaf835', className)} {...rest}>
	{@render children?.()}
</ol>
