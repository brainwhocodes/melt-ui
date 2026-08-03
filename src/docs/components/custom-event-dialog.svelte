<script lang="ts">
	import { createDialog } from '$lib/builders/index.js';
	import { flyAndScale } from '$docs/utils/index.js';
	import { X } from '$icons/index.js';
	import { CodeBlock } from '$docs/components/index.js';
	import customEventDetail from '$docs/data/long-types/custom-event-detail.html?raw';

	const {
		elements: { trigger, overlay, content, title, close },
		states: { open },
	} = createDialog();
</script>

<code class="neutral"
	>(e: <button
		{...$trigger} use:trigger
		class="surface-bca2be0d04"
		>CustomEvent
	</button>) => void</code
>
{#if $open}
	<div {...$overlay} use:overlay class="surface-6697cd3522"></div>
	<div
		class="preview-limit-w-960px  preview-shape-md  surface-274bfd9bc8"
		transition:flyAndScale={{
			duration: 150,
			y: 8,
			start: 0.96,
		}}
		{...$content} use:content
	>
		<div class="surface-a698818745">
			<code class="inline-code surface-f0c41fb05d" {...$title} use:title>CustomEventDetail</code>
		</div>
		<div class="surface-285f350312">
			<CodeBlock class="surface-77528e796f" copyBtnClasses="docs-code-block-copy--inset">
				{@html customEventDetail}
			</CodeBlock>
		</div>
		<button
			{...$close} use:close
			aria-label="Close"
			class="preview-width-6  preview-text-magnum-300  surface-63a0a7dd27"
		>
			<X class="surface-794a38b8b4" />
		</button>
	</div>
{/if}
