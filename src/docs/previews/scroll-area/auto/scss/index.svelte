<script lang="ts">
	import { createScrollArea, melt } from '$lib/index.js';
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
		use:melt={$rootA}
		class="surface-f3b901e1f9"
	>
		<div use:melt={$viewportA} class="surface-78aa6f9abd">
			<div use:melt={$contentA}>
				<div class="surface-cfbc1355a6">
					<h4 class="surface-5d8128567c">Endless Flavors</h4>
					{#each flavors as flavor (flavor)}
						<div class="surface-5b1cd374d6">
							{flavor}
						</div>
						<div role="separator" class="surface-cf3f224d44" />
					{/each}
				</div>
			</div>
		</div>
		<div
			use:melt={$scrollbarYA}
			class="surface-f3997273a0"
		>
			<div
				use:melt={$thumbYA}
				class="surface-7af380db89"
			/>
		</div>
		<div use:melt={$cornerA} />
	</div>

	<div
		use:melt={$root}
		class="surface-9870a7419a"
		style:height="{height}px"
	>
		<div use:melt={$viewport} class="surface-9f71623b7b">
			<div use:melt={$content}>
				<div class="surface-5c6388c108">
					<h4 class="surface-5825de13bd">A Few Flavors</h4>
					{#each flavors.slice(0, 5) as flavor (flavor)}
						<div class="surface-98b4ac011b">
							{flavor}
						</div>
						<div role="separator" class="surface-194b805902" />
					{/each}
				</div>
			</div>
		</div>
		<div
			use:melt={$scrollbarY}
			class="surface-ae2c1e4ad7"
		>
			<div
				use:melt={$thumbY}
				class="surface-fa0d672092"
			/>
		</div>
		<div use:melt={$corner} />
	</div>
</div>
