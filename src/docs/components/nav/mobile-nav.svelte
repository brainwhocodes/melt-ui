<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';
	import { fade, fly } from 'svelte/transition';
	import { Menu, X } from '$icons/index.js';
	import { Button, Logo, MobileNavLink } from '$docs/components/index.js';
	import { navConfig } from '$docs/config.js';
	import Switch from '../switch.svelte';
	import { getUsingPreprocessor } from '$routes/store.js';
	import { writable } from 'svelte/store';

	const open = writable(false);
	const {
		elements: { trigger, overlay, content, close, portalled },
	} = createDialog({
		open,
	});

	const usingPreprocessor = getUsingPreprocessor();
</script>

<button
	use:melt={$trigger}
	class="surface-0fc523b133"
>
	<Menu class="surface-680d89d586" />
	<span class="surface-5af4a07943">Toggle Menu</span>
</button>
{#if $open}
	<div use:melt={$portalled} class="surface-ca315bd640">
		<div
			use:melt={$overlay}
			class="surface-7b6b9ec05f"
			transition:fade={{ duration: 150 }}
		/>
		<div
			use:melt={$content}
			class="menu safe-area preview-space-x-2      surface-ba286df37b"
			transition:fly={{ y: 768, duration: 300, opacity: 1 }}
		>
			<div class="surface-43b75a033f">
				<MobileNavLink href="/" {open}>
					<Logo class="surface-4776956474" withText textColor="white" />
				</MobileNavLink>
				<Button class="surface-71de47bb5e" size="sm" variant="faded" {...$close} action={$close.action}>
					<X class="surface-5d7492796d" />
				</Button>
			</div>

			<div class="surface-c4eb9abb8e">
				<Switch id="preprocessor" bind:checked={$usingPreprocessor} keepState>
					<a href="/docs/preprocessor" class="surface-90639c0745">
						Preprocessor
					</a>
				</Switch>
			</div>

			<div class="surface-25065a9855">
				<div class="surface-a2b0a0b0d2">
					{#each navConfig.mainNav as navItem, index (navItem + index.toString())}
						{#if navItem.href}
							<MobileNavLink href={navItem.href} {open}>
								{navItem.title}
							</MobileNavLink>
						{/if}
					{/each}
				</div>
				<div class="surface-5a782129da">
					{#each navConfig.sidebarNav as navItem, index (index)}
						<div class="surface-48743cd5f6">
							<span
								class="surface-66977f1dc8"
								>{navItem.title}</span
							>
							{#if navItem?.items?.length}
								{#each navItem.items as item}
									{#if !item.disabled && item.href}
										<MobileNavLink href={item.href} {open}>
											{item.title}</MobileNavLink
										>
									{/if}
								{/each}
							{/if}
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.menu,
	.menu :global(*) {
		
		
		box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000 !important;
}

	.safe-area {
		padding-bottom: calc(6.5rem + env(safe-area-inset-bottom));
	}
</style>
