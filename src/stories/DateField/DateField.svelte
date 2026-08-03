<script lang="ts">
	import { createDateField, type CreateDateFieldProps } from '$lib/builders/index.js';
	import { PreviewWrapper } from '$docs/components/index.js';

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
			<span {...$label} use:label class="surface-2d133f55f1">Due Date</span>
			<div
				{...$field} use:field
				class="surface-483187858d"
			>
				{#each $segmentContents as seg, i (i)}
					<div {...$segment(seg.part)} use:segment class="segment surface-8ec0b1f4d6">
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
