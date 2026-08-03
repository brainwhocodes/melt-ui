<script module lang="ts">
	let nextFieldId = 0;
</script>

<script lang="ts">
	import { onMount, setContext, type Snippet } from 'svelte';
	import { writable } from 'svelte/store';
	import type { HTMLAttributes } from 'svelte/elements';

	type FieldContextValue = {
		controlId?: string;
		describedBy?: string;
		errorId?: string;
		invalid: boolean;
		disabled: boolean;
		required: boolean;
	};

	interface Props extends HTMLAttributes<HTMLDivElement> {
		class?: string;
		label?: string | Snippet;
		description?: string | Snippet;
		error?: string | Snippet;
		required?: boolean;
		invalid?: boolean;
		disabled?: boolean;
		children?: Snippet;
	}

	let {
		class: className = '',
		id = undefined,
		label = undefined,
		description = undefined,
		error = undefined,
		required = false,
		invalid = false,
		disabled = false,
		children,
		...rest
	}: Props = $props();

	let generatedId: string | undefined = $state();

	onMount(() => {
		generatedId = `melt-field-${++nextFieldId}`;
	});

	let fieldId = $derived(id ?? generatedId);
	let controlId = $derived(fieldId ? `${fieldId}-control` : undefined);
	let descriptionId = $derived(fieldId ? `${fieldId}-description` : undefined);
	let errorId = $derived(fieldId ? `${fieldId}-error` : undefined);
	let hasDescription = $derived(Boolean(description));
	let hasError = $derived(Boolean(error));
	let isInvalid = $derived(invalid || hasError);
	let describedBy = $derived(
		[hasDescription ? descriptionId : undefined, hasError ? errorId : undefined]
			.filter(Boolean)
			.join(' ') || undefined
	);

	// Initialize synchronously (legacy `$:` semantics) so SSR/first paint is wired,
	// then keep the store in sync with an effect.
	const fieldContext = writable<FieldContextValue>({
		controlId,
		describedBy,
		errorId: hasError ? errorId : undefined,
		invalid: isInvalid,
		disabled,
		required
	});
	setContext('melt-field', fieldContext);

	$effect(() => {
		fieldContext.set({
			controlId,
			describedBy,
			errorId: hasError ? errorId : undefined,
			invalid: isInvalid,
			disabled,
			required
		});
	});
</script>

<div
	{...rest}
	id={fieldId}
	class={`melt-field ${className}`.trim()}
	data-invalid={isInvalid || undefined}
	data-disabled={disabled || undefined}
	data-required={required || undefined}
>
	{#if label}
		<label class="melt-field__label" for={controlId}>
			{#if typeof label === 'string'}{label}{:else}{@render label()}{/if}
			{#if required}<span class="melt-field__required" aria-hidden="true">*</span>{/if}
		</label>
	{/if}

	<div class="melt-field__control">{@render children?.()}</div>

	{#if hasDescription}
		<div class="melt-field__description" id={descriptionId}>
			{#if typeof description === 'string'}{description}{:else}{@render description?.()}{/if}
		</div>
	{/if}

	{#if hasError}
		<div class="melt-field__error" id={errorId}>
			{#if typeof error === 'string'}{error}{:else}{@render error?.()}{/if}
		</div>
	{/if}
</div>
