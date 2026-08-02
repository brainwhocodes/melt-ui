<script lang="ts">
	import { melt } from '$lib/index.js';
	import {
		createDateRangeField,
		type CreateDateRangeFieldProps,
	} from '$lib/builders/date-range-field/index.js';
	import { removeUndefined } from '../utils.js';

	export let value: CreateDateRangeFieldProps['value'] = undefined;
	export let defaultValue: CreateDateRangeFieldProps['defaultValue'] = undefined;
	export let defaultPlaceholder: CreateDateRangeFieldProps['defaultPlaceholder'] = undefined;
	export let onValueChange: CreateDateRangeFieldProps['onValueChange'] = undefined;
	export let onPlaceholderChange: CreateDateRangeFieldProps['onPlaceholderChange'] = undefined;
	export let isDateUnavailable: CreateDateRangeFieldProps['isDateUnavailable'] = undefined;
	export let disabled: CreateDateRangeFieldProps['disabled'] = undefined;
	export let readonly: CreateDateRangeFieldProps['readonly'] = undefined;
	export let readonlySegments: CreateDateRangeFieldProps['readonlySegments'] = undefined;
	export let hourCycle: CreateDateRangeFieldProps['hourCycle'] = undefined;
	export let locale: CreateDateRangeFieldProps['locale'] = 'en';
	export let hideTimeZone: CreateDateRangeFieldProps['hideTimeZone'] = undefined;
	export let ids: CreateDateRangeFieldProps['ids'] = undefined;
	export let startIds: CreateDateRangeFieldProps['startIds'] = undefined;
	export let endIds: CreateDateRangeFieldProps['endIds'] = undefined;
	export let granularity: CreateDateRangeFieldProps['granularity'] = undefined;

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
			<span use:melt={$label} data-testid="label" class="surface-2fd60da88b">Booking Dates</span>
			<div
				use:melt={$field}
				data-testid="field"
				class="{$isInvalid && 'preview-border-2 preview-border-red-600'} surface-633adce4a6"
			>
				{#each $segmentContents.start as seg, i (i)}
					<div
						use:melt={$startSegment(seg.part)}
						class="segment {$isInvalid && 'preview-text-red-600'}"
						data-testid="start-{seg.part}"
					>
						{seg.value}
					</div>
				{/each}
				<div aria-hidden="true" class="surface-a1d6671556">-</div>
				{#each $segmentContents.end as seg, i (i)}
					<div
						use:melt={$endSegment(seg.part)}
						class="segment {$isInvalid && 'preview-text-red-600'}"
						data-testid="end-{seg.part}"
					>
						{seg.value}
					</div>
				{/each}
			</div>
		</div>
		<span use:melt={$validation} data-testid="validation">Validation</span>
	</div>
</main>
