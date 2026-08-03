<script lang="ts">
	import { createAvatar, createLinkPreview } from '$lib/index.js';
	import type { FullContributor } from '$routes/docs/[...slug]/+layout.server.js';
	import { fly } from 'svelte/transition';

	export let contributor: FullContributor;

	const getInitials = (name: string) => {
		const [first, last] = name.split(' ');
		if (last) {
			return `${first[0]}${last[0]}`.toUpperCase();
		}
		return first.slice(0, 2).toUpperCase();
	};

	const {
		elements: { image, fallback },
	} = createAvatar({
		src: contributor.avatar_url,
	});

	const {
		elements: { trigger, content },
		states: { open },
	} = createLinkPreview({
		forceVisible: true,
		positioning: {
			placement: 'top',
		},
		closeDelay: 100,
		openDelay: 250,
	});
</script>

<a
	class="avatar"
	href={contributor.html_url}
	target="_blank"
	rel="noopener noreferrer"
	{...$trigger} use:trigger
>
	<img {...$image} use:image alt="Avatar" class="avatar" />
	<div {...$fallback} use:fallback class="fallback">
		{getInitials(contributor.name ?? contributor.login)}
	</div>
</a>

{#if $open}
	<div
		class="surface-a987fff884"
		{...$content} use:content
		transition:fly={{ duration: 150, y: 4 }}
	>
		<div class="surface-e98d851435">
			<img
				class="surface-b86068b6e4"
				src={contributor.avatar_url}
				alt="{contributor.login}'s avatar"
			/>
			<div class="surface-8a0d44b09e">
				<h3 class="surface-def94565a3">{contributor.name ?? contributor.login}</h3>
				<p class="surface-4ea9bcdc8d">{contributor.login}</p>
				{#if contributor.bio}
					<p class="surface-a7d3552cf2">{contributor.bio}</p>
				{/if}
				<p class="surface-8fe9f24f28">
					<span class="surface-b70da0ecb9">{contributor.contributions}</span> contributions
				</p>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.avatar {
		display: block;

		--size: 4rem;
		width: var(--size);
		height: var(--size);

		background: rgb(var(--color-neutral-900) / 1);
		border-radius: 100%;
		border: 2px solid rgb(var(--color-neutral-900) / 1);

		display: grid;
		place-items: center;
	}

		.avatar img {
			border-radius: 100%;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.avatar .fallback {
			font-size: 1.25rem;
			font-weight: 600;
			background-color: rgb(var(--color-neutral-700) / 1);
			color: rgb(var(--color-magnum-300) / 1);

			width: 100%;
			height: 100%;
			border-radius: 100%;
			display: grid;
			place-items: center;
		}
</style>
