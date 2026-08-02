<script lang="ts">
	import { createDateField, type CreateDateFieldProps } from '$lib/builders/index.js';
	import { melt } from '$lib/index.js';
	import { PreviewWrapper } from '$docs/components/index.js';

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
		elements: { field, segment, label },
		states: { value: insideValue, segmentContents },
	} = createDateField({
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
	});
</script>

<PreviewWrapper>
	<div class="surface-9dd628d74a">
		<div>
			<span use:melt={$label} class="surface-2d133f55f1">Due Date</span>
			<div
				use:melt={$field}
				class="surface-483187858d"
			>
				{#each $segmentContents as seg, i (i)}
					<div use:melt={$segment(seg.part)} class="segment surface-8ec0b1f4d6">
						{seg.value}
					</div>
				{/each}
			</div>
		</div>
		<div class="surface-cb34ab7bf2">
			<p class="surface-61ba043aa0">
				<span> Selected Date: </span>
				{#if $insideValue}
					{$insideValue}
				{/if}
			</p>
		</div>
	</div>
</PreviewWrapper>

<style lang="scss">
	.segment:not([data-segment='literal']) {
    padding-left: 0.125rem;
    padding-right: 0.125rem
}
	.segment[data-segment="dayPeriod"] {
    padding-left: 0.125rem
}
	.segment[data-segment="hour"] {
    padding-left: 0.25rem
}
	.segment[data-segment="timeZoneName"] {
    padding-left: 0.25rem
}

	.btn {
    border-radius: 0.25rem;
    
    background-color: rgb(var(--color-magnum-600) / 1);
    padding: 0.25rem;
    font-size: 0.75rem;
    line-height: 1rem;
    
    color: rgb(var(--color-white) / 1)
}
</style>
