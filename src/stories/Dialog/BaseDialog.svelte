<script lang="ts">
	import { createDialog } from '$lib/index.js';

	const {
		elements: { overlay, content, title, description, close, portalled, trigger },
	} = createDialog({
		portal: '#preview',
	});
</script>

<div {...$portalled} use:portalled>
	<div {...$overlay} use:overlay class="surface-0538d9877a"></div>
	<div
		class="preview-limit-w-450px preview-motion-x-1-2 preview-space-6 preview-elevation-lg surface-59b875ab88"
		{...$content} use:content
	>
		<slot title={$title} description={$description} close={$close} name="content" />
	</div>
</div>
<slot trigger={$trigger} />
