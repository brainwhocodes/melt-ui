<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<li class={cn('surface-0629ef9252', className)} {...$$restProps}>
	<slot />
</li>
