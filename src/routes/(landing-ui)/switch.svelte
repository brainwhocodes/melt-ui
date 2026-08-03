<script lang="ts">
	import { createSwitch } from '$lib/index.js';

	const {
		elements: { root, input },
		states: { checked },
	} = createSwitch({
		defaultChecked: true,
	});

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

</script>

<form class={className}>
	<div class="surface-c98d43b9e8">
		<button
			{...$root} use:root
			class="preview-surface-magnum-800 preview-transition-colors surface-182aa88743"
			id="airplane-mode"
			aria-label="Switch"
		>
			<span class="{$checked ? 'surface-cee3e8592e' : 'surface-33e1cf8c76'} surface-49f1ae45fc"></span>
		</button>
		<input {...$input} use:input />
	</div>
</form>
