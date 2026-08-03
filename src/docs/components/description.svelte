<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
	}

	let { class: className = undefined, children }: Props = $props();

</script>

<p class={cn('surface-d7fec73ca2', className)}>
	{@render children?.()}
</p>
