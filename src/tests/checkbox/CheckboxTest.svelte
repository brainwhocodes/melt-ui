<script lang="ts">
	import { createCheckbox, type CreateCheckboxProps } from '$lib/index.js';

	interface Props {
		defaultChecked?: CreateCheckboxProps['defaultChecked'];
	}

	let { defaultChecked = 'indeterminate' }: Props = $props();

	const {
		elements: { root },
		helpers: { isChecked },
	} = createCheckbox({
		defaultChecked,
	});
</script>

<main>
	<button {...$root} use:root data-testid="checkbox">
		{#if $isChecked}
			checked
		{:else}
			not-checked
		{/if}
	</button>
</main>
