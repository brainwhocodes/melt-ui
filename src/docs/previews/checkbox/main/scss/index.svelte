<script lang="ts">
	import { createCheckbox, melt } from '$lib/index.js';
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
			use:melt={$root}
			class="preview-layout-center  surface-2748f7279e"
			id="checkbox"
		>
			{#if $isIndeterminate}
				<Minus class="surface-e59e07a74d" />
			{:else if $isChecked}
				<Check class="surface-aaaaf7a5f0" />
			{/if}
			<input use:melt={$input} />
		</button>
		<label class="surface-bbde895004" for="checkbox">
			Accept terms and conditions.
		</label>
	</div>
</form>
