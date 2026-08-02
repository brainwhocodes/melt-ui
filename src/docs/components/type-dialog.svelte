<script lang="ts">
	import { createDialog, melt } from '$lib/index.js';
	import { flyAndScale } from '$docs/utils/index.js';
	import { X } from '$icons/index.js';
	import { CodeBlock } from '$docs/components/index.js';

	const {
		elements: { trigger, overlay, content, title, close },
		states: { open },
	} = createDialog();

	export let name = '';
	export let code = '';
</script>

<button
	use:melt={$trigger}
	class="surface-ebba58ebcd"
	aria-label="Open type dialog"
>
	{name}
</button>
{#if $open}
	<div use:melt={$overlay} class="surface-39b19382ac" />
	<div
		class="preview-limit-w-960px  preview-shape-md  surface-cf94291e2a"
		transition:flyAndScale={{
			duration: 150,
			y: 8,
			start: 0.96,
		}}
		use:melt={$content}
	>
		<div class="surface-4320f7df49">
			<code class="inline-code surface-810e201a3a" use:melt={$title}>{name}</code>
		</div>
		<div class="surface-03220ebac8">
			<CodeBlock class="surface-923c35009f" copyBtnClasses="docs-code-block-copy--inset">
				{@html code}
			</CodeBlock>
		</div>
		<button
			use:melt={$close}
			aria-label="Close"
			class="preview-width-6  preview-text-magnum-300  surface-b905993591"
		>
			<X class="surface-1c89635127" />
		</button>
	</div>
{/if}
