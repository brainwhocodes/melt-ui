<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p class={cn('surface-d7fec73ca2', className)}>
	<slot />
</p>
