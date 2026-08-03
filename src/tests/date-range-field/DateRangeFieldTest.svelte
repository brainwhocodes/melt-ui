<script lang="ts">
	import {
		createDateRangeField,
		type CreateDateRangeFieldProps,
	} from '$lib/builders/date-range-field/index.js';
	import { removeUndefined } from '../utils.js';

	interface Props {
		value?: CreateDateRangeFieldProps['value'];
		defaultValue?: CreateDateRangeFieldProps['defaultValue'];
		defaultPlaceholder?: CreateDateRangeFieldProps['defaultPlaceholder'];
		onValueChange?: CreateDateRangeFieldProps['onValueChange'];
		onPlaceholderChange?: CreateDateRangeFieldProps['onPlaceholderChange'];
		isDateUnavailable?: CreateDateRangeFieldProps['isDateUnavailable'];
		disabled?: CreateDateRangeFieldProps['disabled'];
		readonly?: CreateDateRangeFieldProps['readonly'];
		readonlySegments?: CreateDateRangeFieldProps['readonlySegments'];
		hourCycle?: CreateDateRangeFieldProps['hourCycle'];
		locale?: CreateDateRangeFieldProps['locale'];
		hideTimeZone?: CreateDateRangeFieldProps['hideTimeZone'];
		ids?: CreateDateRangeFieldProps['ids'];
		startIds?: CreateDateRangeFieldProps['startIds'];
		endIds?: CreateDateRangeFieldProps['endIds'];
		granularity?: CreateDateRangeFieldProps['granularity'];
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
		startIds = undefined,
		endIds = undefined,
		granularity = undefined
	}: Props = $props();

	const {
		elements: { field, startSegment, endSegment, label, validation },
		states: { value: insideValue, segmentContents, isInvalid },
	} = createDateRangeField(
		removeUndefined({
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
			startIds,
			endIds,
			granularity,
		})
	);
</script>

<main>
	<div class="surface-0340c5e256">
		<div class="surface-04684a15e4">
			<p class="surface-b357026307" data-testid="inside-value">{$insideValue.start} - {$insideValue.end}</p>
			<p data-testid="start-value">{$insideValue?.start}</p>
			<p data-testid="end-value">{$insideValue?.end}</p>
		</div>
		<div>
			<span {...$label} use:label data-testid="label" class="surface-2fd60da88b">Booking Dates</span>
			<div
				{...$field} use:field
				data-testid="field"
				class="{$isInvalid && 'preview-border-2 preview-border-red-600'} surface-633adce4a6"
			>
				{#each $segmentContents.start as seg, i (i)}
					<div
						{...$startSegment(seg.part)} use:startSegment
						class="segment {$isInvalid && 'preview-text-red-600'}"
						data-testid="start-{seg.part}"
					>
						{seg.value}
					</div>
				{/each}
				<div aria-hidden="true" class="surface-a1d6671556">-</div>
				{#each $segmentContents.end as seg, i (i)}
					<div
						{...$endSegment(seg.part)} use:endSegment
						class="segment {$isInvalid && 'preview-text-red-600'}"
						data-testid="end-{seg.part}"
					>
						{seg.value}
					</div>
				{/each}
			</div>
		</div>
		<span {...$validation} use:validation data-testid="validation">Validation</span>
	</div>
</main>
