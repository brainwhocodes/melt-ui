<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h3
	class={cn('surface-f764b01ebe', className)}
	data-toc=""
	{...$$restProps}
>
	<slot />
</h3>
