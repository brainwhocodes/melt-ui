<script lang="ts">
	import { page } from '$app/stores';
	import { Discord, GitHub, MobileNav } from '$docs/components/index.js';
	import { navConfig, siteConfig } from '$docs/config.js';
	import { cn } from '$docs/utils/index.js';
	import Search from '$routes/(landing-ui)/search.svelte';
	import { mode } from 'mode-watcher';
	import Logo from './logo.svelte';
	import ThemeSwitch from './nav/theme-switch/index.js';

	$: isRoot = $page.url.pathname === '/';
</script>

<div
	class={cn(
		'container docs-site-header surface-49205795f2',
		isRoot && 'docs-site-header--root surface-56732f82ec'
	)}
>
	<div class="surface-6de2eb0a86">
		<a href="/" class="surface-eb6a58f1fb">
			<Logo class="surface-4fb3e89fb7" withText textColor={$mode === 'light' ? 'black' : 'white'} />
		</a>
	</div>

	<div class="surface-79973f3af0">
		<div class="surface-864ea02bfa">
			<!-- Search/CMDK here eventually -->
		</div>
	</div>
	<nav class="surface-75aee966cd">
		<!-- Top Navbar -->
		<ul class="surface-8c5ae59952">
			{#each navConfig.mainNav as navItem}
				<li>
					<a href={navItem.href} class="surface-1f80bc631f">
						{navItem.title}
					</a>
				</li>
			{/each}
		</ul>
		<div
			class="surface-27ffc9e23f"
		>
			<a
				href={siteConfig.links.discord}
				target="_blank"
				rel="noopener noreferrer"
				class="surface-3a7d340664"
			>
				<Discord class="surface-506ec44831" />
				<span class="surface-7363caeebe">Join the Melt UI Discord</span>
			</a>
			<a
				href={siteConfig.links.github}
				target="_blank"
				rel="noopener noreferrer"
				class="surface-7992c2c2ae"
			>
				<GitHub class="surface-372ac12cd5" />
				<span class="surface-8372938382">View the Melt UI GitHub Repository</span>
			</a>
			<ThemeSwitch />
			<Search />
			<MobileNav />
		</div>
	</nav>
</div>
