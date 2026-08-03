<script lang="ts">
	import { SidebarNav } from '$docs/components/index.js';
</script>

<div class="container docs-layout surface-6b510eaf51">
	<aside
		class="preview-shrink-0 preview-layout-col surface-2a0c6e8337"
	>
		<div class="surface-9304f4fa22">
			<SidebarNav />
		</div>
	</aside>
	<div id="main" class="surface-abff33c7ec">
		<slot />
	</div>
</div>
