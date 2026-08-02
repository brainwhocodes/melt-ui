<script lang="ts">
	import { cn } from '$docs/utils/index.js';

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<kbd class={cn(className)}><slot /></kbd>

<style lang="scss">
	kbd {
		display: inline-block;
		padding: 0.125rem 0.375rem;
		color: rgb(var(--color-neutral-100) / 1);
		white-space: nowrap;

		margin-block: 0.25rem;

		background-color: rgb(var(--color-neutral-800) / 0.8);
		border: solid 1px rgb(var(--color-neutral-500) / 1);
		border-bottom-color: rgb(var(--color-neutral-600) / 1);
		border-radius: 0.25rem;
		box-shadow: inset 0 -1px 0 rgb(var(--color-neutral-300) / 0.5);
		font-size: 0.75rem;
	}
</style>
