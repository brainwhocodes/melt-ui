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


	interface Props {
		class?: string;
		invalid?: boolean | undefined;
		disabled?: boolean | undefined;
		prefix?: import('svelte').Snippet;
		children?: import('svelte').Snippet;
		suffix?: import('svelte').Snippet;
		[key: string]: any
	}

	let {
		class: className = '',
		invalid = undefined,
		disabled = undefined,
		prefix,
		children,
		suffix,
		...rest
	}: Props = $props();

	type $$Props = HTMLAttributes<HTMLDivElement> & {
		class?: string;
		invalid?: boolean;
		disabled?: boolean;
	};

	const parentField = getContext<Readable<FieldContextValue | null>>('melt-field') ?? readable(null);
	const groupContext = writable<FieldContextValue>({ invalid: false, disabled: false, required: false });
	setContext('melt-field', groupContext);

	let isInvalid = $derived(invalid ?? $parentField?.invalid ?? false);
	let isDisabled = $derived(disabled ?? $parentField?.disabled ?? false);
	$effect(() => {
		groupContext.set({
			controlId: $parentField?.controlId,
			describedBy: $parentField?.describedBy,
			errorId: $parentField?.errorId,
			invalid: isInvalid,
			disabled: isDisabled,
			required: $parentField?.required ?? false
		});
	});
</script>

<div
	{...rest}
	class={`melt-input-group ${className}`.trim()}
	data-invalid={isInvalid || undefined}
	data-disabled={isDisabled || undefined}
>
	{#if prefix}
		<span class="melt-input-group__prefix">{@render prefix?.()}</span>
	{/if}
	<div class="melt-input-group__control">{@render children?.()}</div>
	{#if suffix}
		<span class="melt-input-group__suffix">{@render suffix?.()}</span>
	{/if}
</div>
