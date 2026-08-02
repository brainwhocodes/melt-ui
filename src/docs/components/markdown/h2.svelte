<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h2
	class={cn(
		'surface-14649bcad5',
		className
	)}
	data-toc=""
	{...$$restProps}
>
	<slot />
</h2>
