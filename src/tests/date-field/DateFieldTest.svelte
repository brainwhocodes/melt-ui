<script lang="ts">
	import {
		createDateField,
		melt,
		type CreateDateFieldProps,
	} from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	export let value: CreateDateFieldProps['value'] = undefined;
	export let defaultValue: CreateDateFieldProps['defaultValue'] = undefined;
	export let defaultPlaceholder: CreateDateFieldProps['defaultPlaceholder'] = undefined;
	export let onValueChange: CreateDateFieldProps['onValueChange'] = undefined;
	export let onPlaceholderChange: CreateDateFieldProps['onPlaceholderChange'] = undefined;
	export let isDateUnavailable: CreateDateFieldProps['isDateUnavailable'] = undefined;
	export let disabled: CreateDateFieldProps['disabled'] = undefined;
	export let readonly: CreateDateFieldProps['readonly'] = undefined;
	export let readonlySegments: CreateDateFieldProps['readonlySegments'] = undefined;
	export let hourCycle: CreateDateFieldProps['hourCycle'] = undefined;
	export let locale: CreateDateFieldProps['locale'] = 'en';
	export let hideTimeZone: CreateDateFieldProps['hideTimeZone'] = undefined;
	export let ids: CreateDateFieldProps['ids'] = undefined;
	export let granularity: CreateDateFieldProps['granularity'] = undefined;

	const {
		elements: { field, segment, label, validation },
		states: { value: insideValue, segmentContents },
		options: { hourCycle: hourCycleOption, locale: localeOption },
	} = createDateField(
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
			granularity,
		})
	);
</script>

<main>
	<div class="surface-593199ae65">
		<div class="surface-da85031cc6">
			<p class="surface-e3678618e9" data-testid="inside-value">{$insideValue}</p>
		</div>
		<div>
			<span use:melt={$label} class="surface-07ddc06ea2" data-testid="label">Date</span>
			<div
				use:melt={$field}
				class="surface-b963add057"
				data-testid="field"
			>
				{#each $segmentContents as seg, i (i)}
					<div
						use:melt={$segment(seg.part)}
						class="segment surface-aa97e97ecb"
						data-testid={seg.part === 'literal' ? undefined : seg.part}
					>
						{seg.value}
					</div>
				{/each}
			</div>
			<span use:melt={$validation} data-testid="validation">Validation</span>
		</div>
	</div>
</main>

<button data-testid="set-locale-en-gb" on:click={() => ($localeOption = 'en-GB')}>
	Use en-GB
</button>
<button data-testid="set-locale-en-us" on:click={() => ($localeOption = 'en-US')}>
	Use en-US
</button>
<button data-testid="set-hour-cycle-12" on:click={() => ($hourCycleOption = 12)}>
	Use 12-hour cycle
</button>
<button data-testid="set-hour-cycle-24" on:click={() => ($hourCycleOption = 24)}>
	Use 24-hour cycle
</button>
<button data-testid="clear-hour-cycle" on:click={() => ($hourCycleOption = undefined)}>
	Use locale hour cycle
</button>
