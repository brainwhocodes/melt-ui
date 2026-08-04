<script lang="ts">
	import { createDatePicker } from '$lib/builders/date-picker/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import type { DateValue } from '@internationalized/date';
	import { untrack } from 'svelte';

	interface Props {
		value?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		class?: string;
		onValueChange?: (value: DateValue | undefined) => void;
		[key: string]: any;
	}

	let {
		value = $bindable(),
		disabled = false,
		readonly = false,
		class: className = '',
		onValueChange,
		...rest
	}: Props = $props();

	const {
		elements: {
			calendar,
			cell,
			content,
			field,
			grid,
			heading,
			nextButton,
			prevButton,
			segment,
			trigger,
		},
		states: { months, headingValue, weekdays, segmentContents, open },
		helpers: { isDateDisabled, isDateSelected },
	} = untrack(() =>
		createDatePicker({
			disabled,
			readonly,
			onValueChange: (next) => {
				value = next.next as any;
				onValueChange?.(next.next as any);
				return next.next;
			},
		})
	);
</script>

<div class={`melt-date-picker ${className}`.trim()} {...rest}>
	<div {...$field} use:field class="melt-date-picker-field">
		{#each $segmentContents as seg}
			<div {...$segment(seg.part)} use:segment class="melt-date-picker-segment">
				{seg.value}
			</div>
		{/each}
		<button {...$trigger} use:trigger class="melt-date-picker-trigger" aria-label="Open date picker">
			📅
		</button>
	</div>
	{#if $open}
		<div {...$content} use:content class="melt-date-picker-content">
			<div {...$calendar} use:calendar class="melt-calendar">
				<header class="melt-calendar-header">
					<button {...$prevButton} use:prevButton class="melt-calendar-prev" aria-label="Previous Month">
						&larr;
					</button>
					<div {...$heading} use:heading class="melt-calendar-heading">
						{$headingValue}
					</div>
					<button {...$nextButton} use:nextButton class="melt-calendar-next" aria-label="Next Month">
						&rarr;
					</button>
				</header>
				{#each $months as month}
					<table {...$grid} use:grid class="melt-calendar-grid">
						<thead class="melt-calendar-thead">
							<tr>
								{#each $weekdays as day}
									<th scope="col" class="melt-calendar-th">{day}</th>
								{/each}
							</tr>
						</thead>
						<tbody class="melt-calendar-tbody">
							{#each month.weeks as weekDates}
								<tr>
									{#each weekDates as date}
										<td
											{...$cell(date, month.value)}
											use:cell
											class="melt-calendar-cell"
											data-selected={$isDateSelected(date) ? '' : undefined}
											data-disabled={$isDateDisabled(date) ? '' : undefined}
										>
											{date.day}
										</td>
									{/each}
								</tr>
							{/each}
						</tbody>
					</table>
				{/each}
			</div>
		</div>
	{/if}
</div>
