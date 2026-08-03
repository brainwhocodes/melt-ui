<script lang="ts">
	type CalloutType = 'default' | 'info' | 'warning' | 'danger' | 'success';


	interface Props {
		class?: string | undefined | null;
		type?: CalloutType;
		children?: import('svelte').Snippet;
	}

	let { class: className = undefined, type = 'default', children }: Props = $props();
</script>

<div class={`docs-callout force-dark ${className ?? ''}`} data-callout data-type={type}>
	{@render children?.()}
</div>

<style lang="scss">
	.docs-callout {
		position: relative;
		margin: 1.5rem 0;
		border: 1px solid;
		border-radius: 0 0.75rem 0.75rem 0;
		padding: 0.75rem 1.25rem;
		color: rgb(var(--color-white));

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			width: 0.125rem;
			height: 100%;
			content: '';
		}

		&[data-type='default'] {
			border-color: rgb(var(--color-magnum-700));
			background: rgb(var(--color-magnum-700) / 0.1);
			&::before { background: rgb(var(--color-magnum-700)); }
		}

		&[data-type='info'] {
			border-color: rgb(59 130 246);
			background: rgb(59 130 246 / 0.1);
			&::before { background: rgb(59 130 246); }
		}

		&[data-type='warning'] {
			border-color: rgb(234 179 8);
			background: rgb(234 179 8 / 0.1);
			&::before { background: rgb(234 179 8); }
		}

		&[data-type='danger'] {
			border-color: rgb(239 68 68);
			background: rgb(239 68 68 / 0.1);
			&::before { background: rgb(239 68 68); }
		}

		&[data-type='success'] {
			border-color: rgb(34 197 94);
			background: rgb(34 197 94 / 0.1);
			&::before { background: rgb(34 197 94); }
		}
	}
</style>
