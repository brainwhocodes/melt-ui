<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<blockquote class={cn('surface-cff4027b76', className)} {...$$restProps}>
	<slot />
</blockquote>
