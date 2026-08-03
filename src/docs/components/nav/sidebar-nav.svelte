<script lang="ts">
	import { page } from '$app/stores';
	import { cn } from '$docs/utils/index.js';
	import { navConfig } from '$docs/config.js';
</script>

<nav class="surface-f4c35668da">
	{#each navConfig.sidebarNav as navItem, index (index)}
		<div>
			<span
				class="docs-sidebar-heading surface-985baacfce"
			>
				{navItem.title}
			</span>
			<div class="surface-6e54d2a472">
				{#if navItem?.items?.length}
					{#each navItem.items as item}
						{#if !item.disabled && item.href}
							<div class="surface-e8809b62ed">
								<a
									href={item.href}
									class={cn(
										'surface-32d77c5be9',
										'preview-hover-surface-magnum-900-25 surface-90e3ce4f3c',
										'preview-state-active-surface-magnum-900-50 surface-0f181d56f4'
									)}
									data-active={$page.url.pathname === item.href}
								>
									{item.title}
								</a>
							</div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	{/each}
</nav>

<style>
	.docs-sidebar-heading {
		text-align: left;
	}
</style>
