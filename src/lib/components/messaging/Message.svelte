<script lang="ts">
	import Bubble from './Bubble.svelte';

	type MessageVariant = 'incoming' | 'outgoing' | 'system';

	interface Props {
		id?: string | undefined;
		variant?: MessageVariant;
		sender?: string | undefined;
		timestamp?: string | undefined;
		datetime?: string | undefined;
		avatarSrc?: string | undefined;
		avatarAlt?: string | undefined;
		status?: string | undefined;
		actionsLabel?: string;
		class?: string;
		avatar?: import('svelte').Snippet;
		header?: import('svelte').Snippet;
		body?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		footer?: import('svelte').Snippet;
		actions?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		id = undefined,
		variant = 'incoming',
		sender = undefined,
		timestamp = undefined,
		datetime = undefined,
		avatarSrc = undefined,
		avatarAlt = undefined,
		status = undefined,
		actionsLabel = 'Message actions',
		class: className = '',
		avatar,
		header,
		body,
		children,
		footer,
		actions,
		...rest
	}: Props = $props();


	let resolvedAvatarAlt = $derived(avatarAlt ?? (sender ? `${sender} avatar` : ''));
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
	{...rest}
>
	{#if variant !== 'system' && (avatar || avatarSrc)}
		<div class="melt-message-avatar">
			{#if avatar}{@render avatar()}{:else}
				{#if avatarSrc}
					<img src={avatarSrc} alt={resolvedAvatarAlt} />
				{/if}
			{/if}
		</div>
	{/if}

	<div class="melt-message-content">
		{#if header || sender || timestamp}
			<header class="melt-message-header">
				{#if header}{@render header()}{:else}
					{#if sender}<strong class="melt-message-sender">{sender}</strong>{/if}
					{#if timestamp}<time {datetime}>{timestamp}</time>{/if}
				{/if}
			</header>
		{/if}

		<Bubble {variant} class="melt-message-bubble">
			{#if body}{@render body()}{:else}{@render children?.()}{/if}
		</Bubble>

		{#if footer || status}
			<footer class="melt-message-footer">
				{#if footer}{@render footer()}{:else}{status}{/if}
			</footer>
		{/if}
	</div>

	{#if actions}
		<div class="melt-message-actions" role="group" aria-label={actionsLabel}>
			{@render actions?.()}
		</div>
	{/if}
</article>
