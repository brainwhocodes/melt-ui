<script lang="ts">
	type BubbleVariant = 'incoming' | 'outgoing' | 'system';

	export let variant: BubbleVariant = 'incoming';
	let className = '';
	export { className as class };

	$: role = variant === 'system' ? 'status' : undefined;
</script>

<div
	class:melt-bubble={true}
	class:melt-bubble-incoming={variant === 'incoming'}
	class:melt-bubble-outgoing={variant === 'outgoing'}
	class:melt-bubble-system={variant === 'system'}
	class={className}
	{role}
	data-variant={variant}
	{...$$restProps}
>
	<slot />
</div>
