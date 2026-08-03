<script lang="ts">
	import { getContext, setContext } from 'svelte';
	import { readable, writable, type Readable } from 'svelte/store';
	import type { HTMLAttributes } from 'svelte/elements';

	type FieldContextValue = {
		controlId?: string;
		describedBy?: string;
		errorId?: string;
		invalid: boolean;
		disabled: boolean;
		required: boolean;
	};

	let className = '';
	export { className as class };
	export let invalid: boolean | undefined = undefined;
	export let disabled: boolean | undefined = undefined;

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		invalid?: boolean;
		disabled?: boolean;
	};

	const parentField = getContext<Readable<FieldContextValue | null>>('melt-field') ?? readable(null);
	const groupContext = writable<FieldContextValue>({ invalid: false, disabled: false, required: false });
	setContext('melt-field', groupContext);

	$: isInvalid = invalid ?? $parentField?.invalid ?? false;
	$: isDisabled = disabled ?? $parentField?.disabled ?? false;
	$: groupContext.set({
		controlId: $parentField?.controlId,
		describedBy: $parentField?.describedBy,
		errorId: $parentField?.errorId,
		invalid: isInvalid,
		disabled: isDisabled,
		required: $parentField?.required ?? false
	});
</script>

<div
	{...$$restProps}
	class={`melt-input-group ${className}`.trim()}
	data-invalid={isInvalid || undefined}
	data-disabled={isDisabled || undefined}
>
	{#if $$slots.prefix}
		<span class="melt-input-group__prefix"><slot name="prefix" /></span>
	{/if}
	<div class="melt-input-group__control"><slot /></div>
	{#if $$slots.suffix}
		<span class="melt-input-group__suffix"><slot name="suffix" /></span>
	{/if}
</div>
