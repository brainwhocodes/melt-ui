<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h6
	class={cn('surface-4cee055d9d', className)}
	{...$$restProps}
>
	<slot />
</h6>
