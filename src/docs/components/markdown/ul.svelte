<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	interface Props {
		class?: string | undefined | null;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { class: className = undefined, children, ...rest }: Props = $props();

</script>

<ul class={cn(className)} {...rest}>
	{@render children?.()}
</ul>

<style lang="scss">
	ul {
		list-style-type: disc;
		margin-block: 1.5rem;
		margin-left: 1.5rem;
	}

		ul :global(ul) {
			list-style-type: circle;

			margin-block: 0.5rem;
			margin-left: 1.5rem;
		}
</style>
