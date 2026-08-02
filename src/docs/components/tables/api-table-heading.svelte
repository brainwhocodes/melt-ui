<script lang="ts">
	import { h4 as H4 } from '$docs/components/markdown/index.js';
	import { InfoPopover } from '$docs/components/index.js';
</script>

<div class="surface-ce86cd1b68">
	<H4 class="surface-779c1bc69b">
		<slot />
	</H4>
	{#if $$slots.info}
		<InfoPopover>
			<slot name="info" />
		</InfoPopover>
	{/if}
</div>
