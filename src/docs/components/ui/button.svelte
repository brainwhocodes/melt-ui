<script module lang="ts">
	export type ButtonVariant = 'default' | 'ghost' | 'link' | 'outline' | 'faded';
	export type ButtonSize = 'default' | 'sm';
</script>

<script lang="ts">
	import { noop } from '$lib/internal/helpers/index.js';
	import type { Action } from 'svelte/action';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	interface Props {
		class?: string | undefined | null;
		href?: HTMLAnchorAttributes['href'];
		type?: HTMLButtonAttributes['type'];
		variant?: ButtonVariant;
		size?: ButtonSize;
		action?: Action<HTMLElement>;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = undefined,
		href = undefined,
		type = undefined,
		variant = 'default',
		size = 'default',
		action = noop,
		children,
		...rest
	}: Props = $props();

</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	{href}
	class={`docs-button docs-button--${variant} docs-button--size-${size} ${className ?? ''}`}
	data-variant={variant}
	data-size={size}
	{...rest}
	role="button"
	tabindex="0"
	use:action
>
	{@render children?.()}
</svelte:element>

<style lang="scss">
	.docs-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		font-weight: 600;
		transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease, transform 150ms ease;

		&:disabled {
			pointer-events: none;
			opacity: 0.5;
		}

		&:active { transform: translateY(0.125rem); }
		&--size-default {
			height: 2.75rem;
			border-radius: 0.375rem;
			padding: 0.75rem 1.25rem;
		}
		&--size-sm {
			height: 2.25rem;
			padding: 0 0.75rem;
		}
		&--default {
			background: rgb(var(--color-magnum-700));
			color: rgb(var(--color-white));
			&:hover { background: rgb(var(--color-magnum-700) / 0.75); }
		}
		&--ghost {
			border: 1px solid transparent;
			&:hover,
			&[data-active='true'] {
				border-color: rgb(var(--color-magnum-600));
				background: rgb(var(--color-magnum-600) / 0.25);
				color: rgb(var(--color-white));
			}
		}
		&--link {
			color: rgb(var(--color-magnum-700));
			text-underline-offset: 0.25rem;
			&:hover { text-decoration: underline; }
		}
		&--outline {
			border: 1px solid rgb(var(--color-magnum-600) / 0.6);
			&:hover {
				background: rgb(var(--color-magnum-600) / 0.2);
				color: rgb(var(--color-white));
			}
		}
		&--faded {
			background: rgb(var(--color-magnum-900) / 0.5);
			color: rgb(var(--color-white));
			&:hover { background: rgb(var(--color-magnum-900)); }
		}
	}
</style>
