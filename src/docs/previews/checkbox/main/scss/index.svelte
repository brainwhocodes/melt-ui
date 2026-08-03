<script lang="ts">
	import { createCheckbox } from '$lib/index.js';
	import { Check, Minus } from '$icons/index.js';

	const {
		elements: { root, input },
		helpers: { isChecked, isIndeterminate },
	} = createCheckbox({
		defaultChecked: 'indeterminate',
	});
</script>

<form>
	<div class="surface-f933776c6c">
		<button
			{...$root} use:root
			class="preview-layout-center  surface-2748f7279e"
			id="checkbox"
		>
			{#if $isIndeterminate}
				<Minus class="surface-e59e07a74d" />
			{:else if $isChecked}
				<Check class="surface-aaaaf7a5f0" />
			{/if}
			<input {...$input} use:input />
		</button>
		<label class="surface-bbde895004" for="checkbox">
			Accept terms and conditions.
		</label>
	</div>
</form>
