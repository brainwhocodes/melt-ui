<script lang="ts">
	import { cn } from '$docs/utils/index.js';
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<h1 class={cn('surface-778300e8e5', className)} {...$$restProps}><slot /></h1>
