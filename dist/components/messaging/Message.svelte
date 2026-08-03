<script lang="ts">
	import Bubble from './Bubble.svelte';

	type MessageVariant = 'incoming' | 'outgoing' | 'system';

	export let id: string | undefined = undefined;
	export let variant: MessageVariant = 'incoming';
	export let sender: string | undefined = undefined;
	export let timestamp: string | undefined = undefined;
	export let datetime: string | undefined = undefined;
	export let avatarSrc: string | undefined = undefined;
	export let avatarAlt: string | undefined = undefined;
	export let status: string | undefined = undefined;
	export let actionsLabel = 'Message actions';
	let className = '';
	export { className as class };

	$: resolvedAvatarAlt = avatarAlt ?? (sender ? `${sender} avatar` : '');
</script>

<article
	class:melt-message={true}
	class:melt-message-incoming={variant === 'incoming'}
	class:melt-message-outgoing={variant === 'outgoing'}
	class:melt-message-system={variant === 'system'}
	class={className}
	{id}
	data-message-id={id}
	data-variant={variant}
	{...$$restProps}
>
	{#if variant !== 'system' && ($$slots.avatar || avatarSrc)}
		<div class="melt-message-avatar">
			<slot name="avatar">
				{#if avatarSrc}
					<img src={avatarSrc} alt={resolvedAvatarAlt} />
				{/if}
			</slot>
		</div>
	{/if}

	<div class="melt-message-content">
		{#if $$slots.header || sender || timestamp}
			<header class="melt-message-header">
				<slot name="header">
					{#if sender}<strong class="melt-message-sender">{sender}</strong>{/if}
					{#if timestamp}<time {datetime}>{timestamp}</time>{/if}
				</slot>
			</header>
		{/if}

		<Bubble {variant} class="melt-message-bubble">
			<slot name="body"><slot /></slot>
		</Bubble>

		{#if $$slots.footer || status}
			<footer class="melt-message-footer">
				<slot name="footer">{status}</slot>
			</footer>
		{/if}
	</div>

	{#if $$slots.actions}
		<div class="melt-message-actions" role="group" aria-label={actionsLabel}>
			<slot name="actions" />
		</div>
	{/if}
</article>
