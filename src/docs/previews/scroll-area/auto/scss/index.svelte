<script lang="ts">
	import { createScrollArea } from '$lib/index.js';
	import { flavors } from './flavors.js';

	const {
		elements: { root, content, viewport, corner, scrollbarY, thumbY },
	} = createScrollArea({
		type: 'auto',
		dir: 'ltr',
	});

	const {
		elements: {
			root: rootA,
			content: contentA,
			viewport: viewportA,
			corner: cornerA,
			scrollbarY: scrollbarYA,
			thumbY: thumbYA,
		},
	} = createScrollArea({
		type: 'auto',
		dir: 'ltr',
	});

	let height = 288;
</script>

<div class="surface-84cb6b905f">
	<div
		{...$rootA} use:rootA
		class="surface-f3b901e1f9"
	>
		<div {...$viewportA} use:viewportA class="surface-78aa6f9abd">
			<div {...$contentA} use:contentA>
				<div class="surface-cfbc1355a6">
					<h4 class="surface-5d8128567c">Endless Flavors</h4>
					{#each flavors as flavor (flavor)}
						<div class="surface-5b1cd374d6">
							{flavor}
						</div>
						<div role="separator" class="surface-cf3f224d44"></div>
					{/each}
				</div>
			</div>
		</div>
		<div
			{...$scrollbarYA} use:scrollbarYA
			class="surface-f3997273a0"
		>
			<div {...$thumbYA} use:thumbYA
				class="surface-7af380db89"></div>
		</div>
		<div {...$cornerA} use:cornerA></div>
	</div>

	<div
		{...$root} use:root
		class="surface-9870a7419a"
		style:height="{height}px"
	>
		<div {...$viewport} use:viewport class="surface-9f71623b7b">
			<div {...$content} use:content>
				<div class="surface-5c6388c108">
					<h4 class="surface-5825de13bd">A Few Flavors</h4>
					{#each flavors.slice(0, 5) as flavor (flavor)}
						<div class="surface-98b4ac011b">
							{flavor}
						</div>
						<div role="separator" class="surface-194b805902"></div>
					{/each}
				</div>
			</div>
		</div>
		<div
			{...$scrollbarY} use:scrollbarY
			class="surface-ae2c1e4ad7"
		>
			<div {...$thumbY} use:thumbY
				class="surface-fa0d672092"></div>
		</div>
		<div {...$corner} use:corner></div>
	</div>
</div>
