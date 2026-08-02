<script lang="ts">
	import { SidebarNav } from '$docs/components/index.js';
	import Switch from '$docs/components/switch.svelte';
	import { getUsingPreprocessor } from '$routes/store.js';

	const usingPreprocessor = getUsingPreprocessor();
</script>

<div class="container docs-layout surface-6b510eaf51">
	<aside
		class="preview-shrink-0 preview-layout-col surface-2a0c6e8337"
	>
		<div class="surface-9304f4fa22">
			<SidebarNav />
		</div>
		<div class="surface-13e7afffb3">
			<Switch id="preprocessor" bind:checked={$usingPreprocessor} keepState>
				<a href="/docs/preprocessor" class="surface-6380dfe238">
					Preprocessor
				</a>
			</Switch>
		</div>
	</aside>
	<div id="main" class="surface-abff33c7ec">
		<slot />
	</div>
</div>
