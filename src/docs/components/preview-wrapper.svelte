<script context="module" lang="ts">
	export type PreviewVariant = 'default' | 'dark';
	export type PreviewSize = 'default' | 'sm' | 'md' | 'lg' | 'auto';
	export type PreviewPosition = 'default' | 'static';
	export type PreviewVariants = {
		variant?: PreviewVariant;
		size?: PreviewSize;
		position?: PreviewPosition;
	};
</script>

<script lang="ts">
	export let variant: PreviewVariant = 'default';
	export let size: PreviewSize = 'default';
	export let position: PreviewPosition = 'default';
	export let id: string | undefined = undefined;
</script>

<div
	class="docs-preview-wrapper"
	class:force-dark={variant === 'default'}
	data-variant={variant}
	data-size={size}
	data-position={position}
	{id}
>
	<div class="docs-preview-content">
		<slot />
	</div>
</div>

<style lang="scss">
	.docs-preview-wrapper {
		position: relative;
		display: flex;
		align-items: center;
		overflow-x: auto;
		border-radius: 0.75rem;

		@media (min-width: 768px) {
			padding-right: 3rem;
			padding-left: 3rem;
		}

		@media (min-width: 1024px) {
			overflow-x: hidden;
		}

		&[data-position='static'] { position: static; }
		&[data-size='default'] { height: 20rem; }
		&[data-size='sm'] { height: 12rem; }
		&[data-size='md'] { height: 16rem; }
		&[data-size='lg'] { height: 24rem; }
		&[data-size='auto'] {
			height: auto;
			padding-top: 1.5rem;
			padding-bottom: 1.5rem;
		}

		&[data-variant='default'] {
			background: rgb(var(--color-magnum-400));

			&::before {
				position: absolute;
				inset: 0;
				background-image: radial-gradient(
					circle at 1px 1px,
					rgb(var(--color-magnum-700) / 0.25) 1px,
					transparent 0
				);
				background-repeat: repeat;
				background-position: 0.5rem center;
				background-size: 1rem 1rem;
				content: '';
			}
		}

		&[data-variant='dark'] {
			background: rgb(var(--color-neutral-950) / 0.25);

			&::before {
				position: absolute;
				inset: 0;
				background-image: radial-gradient(
					circle at 1px 1px,
					rgb(var(--color-neutral-800) / 0.5) 1px,
					transparent 0
				);
				background-repeat: repeat;
				background-position: 0.5rem center;
				background-size: 1rem 1rem;
				content: '';
			}
		}

		@media (min-width: 640px) {
			&[data-size='sm'] { height: 20rem; }
			&[data-size='md'] { height: 24rem; }
			&[data-size='lg'] { height: 32rem; }
		}

		@media (min-width: 1024px) {
			&[data-size='default'] { height: 28rem; }
			&[data-size='auto'] {
				padding-top: 3rem;
				padding-bottom: 3rem;
			}
		}
	}

	.docs-preview-content {
		position: relative;
		z-index: 1;
	}
</style>
