<script lang="ts">
	import { createCombobox, type CreateComboboxProps } from '$lib/index.js';

	type $$Props = CreateComboboxProps & { setRootEscapeBehaviorIgnore: () => void };
	interface Props {
		setRootEscapeBehaviorIgnore: () => void;
		[key: string]: any
	}

	let { setRootEscapeBehaviorIgnore, ...rest }: Props = $props();

	const {
		elements: { input, menu },
		states: { open },
	} = createCombobox({ ...rest, forceVisible: true });
</script>

<input {...$input} use:input data-testid="combobox-trigger" />
{#if $open}
	<div {...$menu} use:menu data-testid="combobox-content">
		<button
			data-testid="combobox-set-parent-escape-behavior-ignore"
			onclick={setRootEscapeBehaviorIgnore}
		>
			set root escapeBehavior: ignore
		</button>
	</div>
{/if}
