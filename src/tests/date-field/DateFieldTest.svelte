<script lang="ts">
	import { untrack } from 'svelte';
	import { createDateField, type CreateDateFieldProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	interface Props {
		value?: CreateDateFieldProps['value'];
		defaultValue?: CreateDateFieldProps['defaultValue'];
		defaultPlaceholder?: CreateDateFieldProps['defaultPlaceholder'];
		onValueChange?: CreateDateFieldProps['onValueChange'];
		onPlaceholderChange?: CreateDateFieldProps['onPlaceholderChange'];
		isDateUnavailable?: CreateDateFieldProps['isDateUnavailable'];
		disabled?: CreateDateFieldProps['disabled'];
		readonly?: CreateDateFieldProps['readonly'];
		readonlySegments?: CreateDateFieldProps['readonlySegments'];
		hourCycle?: CreateDateFieldProps['hourCycle'];
		locale?: CreateDateFieldProps['locale'];
		hideTimeZone?: CreateDateFieldProps['hideTimeZone'];
		ids?: CreateDateFieldProps['ids'];
		granularity?: CreateDateFieldProps['granularity'];
	}

	let {
		value = undefined,
		defaultValue = undefined,
		defaultPlaceholder = undefined,
		onValueChange = undefined,
		onPlaceholderChange = undefined,
		isDateUnavailable = undefined,
		disabled = undefined,
		readonly = undefined,
		readonlySegments = undefined,
		hourCycle = undefined,
		locale = 'en',
		hideTimeZone = undefined,
		ids = undefined,
		granularity = undefined
	}: Props = $props();

	const {
		elements: { field, segment, label, validation },
		states: { value: insideValue, segmentContents },
		options: { hourCycle: hourCycleOption, locale: localeOption },
	} = createDateField(
		removeUndefined(
			untrack(() => ({
				value,
				defaultValue,
				defaultPlaceholder,
				onValueChange,
				onPlaceholderChange,
				isDateUnavailable,
				disabled,
				readonly,
				readonlySegments,
				hourCycle,
				locale,
				hideTimeZone,
				ids,
				granularity,
			}))
		)
	);
</script>

<main>
	<div class="surface-593199ae65">
		<div class="surface-da85031cc6">
			<p class="surface-e3678618e9" data-testid="inside-value">{$insideValue}</p>
		</div>
		<div>
			<span {...$label} use:label class="surface-07ddc06ea2" data-testid="label">Date</span>
			<div
				{...$field} use:field
				class="surface-b963add057"
				data-testid="field"
			>
				{#each $segmentContents as seg, i (i)}
					<div
						{...$segment(seg.part)} use:segment
						class="segment surface-aa97e97ecb"
						data-testid={seg.part === 'literal' ? undefined : seg.part}
					>
						{seg.value}
					</div>
				{/each}
			</div>
			<span {...$validation} use:validation data-testid="validation">Validation</span>
		</div>
	</div>
</main>

<button data-testid="set-locale-en-gb" onclick={() => ($localeOption = 'en-GB')}>
	Use en-GB
</button>
<button data-testid="set-locale-en-us" onclick={() => ($localeOption = 'en-US')}>
	Use en-US
</button>
<button data-testid="set-hour-cycle-12" onclick={() => ($hourCycleOption = 12)}>
	Use 12-hour cycle
</button>
<button data-testid="set-hour-cycle-24" onclick={() => ($hourCycleOption = 24)}>
	Use 24-hour cycle
</button>
<button data-testid="clear-hour-cycle" onclick={() => ($hourCycleOption = undefined)}>
	Use locale hour cycle
</button>
