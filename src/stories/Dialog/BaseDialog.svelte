<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';

	const {
		elements: { overlay, content, title, description, close, portalled, trigger },
	} = createDialog({
		portal: '#preview',
	});
</script>

<div use:melt={$portalled}>
	<div use:melt={$overlay} class="surface-0538d9877a" />
	<div
		class="preview-limit-w-450px preview-motion-x-1-2 preview-space-6 preview-elevation-lg surface-59b875ab88"
		use:melt={$content}
	>
		<slot title={$title} description={$description} close={$close} name="content" />
	</div>
</div>
<slot trigger={$trigger} />
