<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<h1 class={cn('surface-778300e8e5', className)} {...rest}>{@render children?.()}</h1>
