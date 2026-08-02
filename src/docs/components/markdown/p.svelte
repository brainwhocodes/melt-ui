<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p class={cn('surface-4c5858f03d', className)} {...$$restProps}>
	<slot />
</p>
