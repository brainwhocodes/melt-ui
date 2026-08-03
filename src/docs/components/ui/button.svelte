<script context="module" lang="ts">
	export type ButtonVariant = 'default' | 'ghost' | 'link' | 'outline' | 'faded';
	export type ButtonSize = 'default' | 'sm';
</script>

<script lang="ts">
	import { noop } from '$lib/internal/helpers/index.js';
	import type { Action } from 'svelte/action';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';


	let className: string | undefined | null = undefined;
	export { className as class };
	export let href: HTMLAnchorAttributes['href'] = undefined;
	export let type: HTMLButtonAttributes['type'] = undefined;
	export let variant: ButtonVariant = 'default';
	export let size: ButtonSize = 'default';
	export let action: Action<HTMLElement> = noop;

	type Props = {
		class?: string | null;
		variant?: ButtonVariant;
		size?: ButtonSize;
		action?: Action<HTMLElement> | (() => void);
	};

	type AnchorElement = Props &
		Omit<HTMLAnchorAttributes, keyof Props | 'type'> & {
			href?: HTMLAnchorAttributes['href'];
			type?: never;
		};

	type ButtonElement = Props &
		Omit<HTMLButtonAttributes, keyof Props | 'href'> & {
			type?: HTMLButtonAttributes['type'];
			href?: never;
		};

	type $$Props = AnchorElement | ButtonElement;
</script>

<svelte:element
	this={href ? 'a' : 'button'}
	type={href ? undefined : type}
	{href}
	class={`docs-button docs-button--${variant} docs-button--size-${size} ${className ?? ''}`}
	data-variant={variant}
	data-size={size}
	{...$$restProps}
	role="button"
	tabindex="0"
	on:click
	on:change
	on:keydown
	on:keyup
	on:mouseenter
	on:mouseleave
	use:action
>
	<slot />
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
