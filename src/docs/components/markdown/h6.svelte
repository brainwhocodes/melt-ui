<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<h6
	class={cn('surface-4cee055d9d', className)}
	{...rest}
>
	{@render children?.()}
</h6>
