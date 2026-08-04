<script lang="ts">
	import { createCalendar } from '$lib/builders/calendar/create.js';
	import { melt } from '$lib/internal/actions/index.js';
	import type { DateValue } from '@internationalized/date';
	import { untrack } from 'svelte';

	interface Props {
		value?: DateValue;
		placeholder?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		class?: string;
		onValueChange?: (value: DateValue | undefined) => void;
		[key: string]: any;
	}

	let {
		value = $bindable(),
		placeholder = $bindable(),
		disabled = false,
		readonly = false,
		class: className = '',
		onValueChange,
		...rest
	}: Props = $props();

	const {
		elements: { calendar, heading, grid, prevButton, nextButton, cell },
		states: { months, headingValue, weekdays },
		helpers: { isDateDisabled, isDateSelected },
	} = untrack(() =>
		createCalendar({
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

<div {...$calendar} use:calendar class={`melt-calendar ${className}`.trim()} {...rest}>
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
