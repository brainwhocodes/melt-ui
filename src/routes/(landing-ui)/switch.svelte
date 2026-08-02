<script lang="ts">
	import { createSwitch, melt } from '$lib/index.js';

	const {
		elements: { root, input },
		states: { checked },
	} = createSwitch({
		defaultChecked: true,
	});

	let className = '';
	export { className as class };
</script>

<form class={className}>
	<div class="surface-c98d43b9e8">
		<button
			use:melt={$root}
			class="preview-surface-magnum-800 preview-transition-colors surface-182aa88743"
			id="airplane-mode"
			aria-label="Switch"
		>
			<span
				class="{$checked ? 'surface-cee3e8592e' : 'surface-33e1cf8c76'} surface-49f1ae45fc"
			/>
		</button>
		<input use:melt={$input} />
	</div>
</form>
