<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h5 class={cn('surface-231aec2a85', className)} {...$$restProps}>
	<slot />
</h5>
