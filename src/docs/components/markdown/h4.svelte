<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h4 class={cn('surface-977a49d594', className)} {...$$restProps}>
	<slot />
</h4>
