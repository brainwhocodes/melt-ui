<script lang="ts">
	type BubbleVariant = 'incoming' | 'outgoing' | 'system';

	interface Props {
		variant?: BubbleVariant;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { variant = 'incoming', class: className = '', children, ...rest }: Props = $props();


	let role = $derived(variant === 'system' ? 'status' : undefined);
</script>

<div
	class:melt-bubble={true}
	class:melt-bubble-incoming={variant === 'incoming'}
	class:melt-bubble-outgoing={variant === 'outgoing'}
	class:melt-bubble-system={variant === 'system'}
	class={className}
	{role}
	data-variant={variant}
	{...rest}
>
	{@render children?.()}
</div>
