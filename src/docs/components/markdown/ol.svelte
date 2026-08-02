<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<ol class={cn('surface-d252eaf835', className)} {...$$restProps}>
	<slot />
</ol>
