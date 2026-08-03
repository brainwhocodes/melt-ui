<script lang="ts">
	import { createDateRangeField } from '$lib/index.js';
	import { CalendarDate } from '@internationalized/date';
	import { onMount } from 'svelte';

	const firstHost = document.createElement('div');
	firstHost.dataset.testid = 'first-range-shadow-host';
	const firstRoot = firstHost.attachShadow({ mode: 'open' });
	const secondHost = document.createElement('div');
	secondHost.dataset.testid = 'second-range-shadow-host';
	const secondRoot = secondHost.attachShadow({ mode: 'open' });

	const {
		elements: { field, startSegment, endSegment, label, validation },
		states: { segmentContents },
		options: { rootElement },
	} = createDateRangeField({
		defaultValue: {
			start: new CalendarDate(2024, 1, 20),
			end: new CalendarDate(2024, 1, 25),
		},
		rootElement: firstRoot,
	});

	let hostMount: HTMLDivElement | undefined = $state();
	let fieldContainer: HTMLDivElement | undefined = $state();

	onMount(() => {
		if (!hostMount || !fieldContainer) return;
		hostMount.append(firstHost, secondHost);
		firstRoot.append(fieldContainer);
		rootElement.set(document);
		rootElement.set(firstRoot);
	});

	function moveToSecondRoot() {
		if (!fieldContainer) return;
		secondRoot.append(fieldContainer);
		rootElement.set(secondRoot);
	}
</script>

<div bind:this={hostMount}></div>
<div bind:this={fieldContainer}>
	<span {...$label} use:label>Booking Dates</span>
	<div {...$field} use:field data-testid="field">
		{#each $segmentContents.start as seg, i (i)}
			<div {...$startSegment(seg.part)} use:startSegment>{seg.value}</div>
		{/each}
		<span aria-hidden="true">-</span>
		{#each $segmentContents.end as seg, i (i)}
			<div {...$endSegment(seg.part)} use:endSegment>{seg.value}</div>
		{/each}
	</div>
	<span {...$validation} use:validation>Validation</span>
</div>
<button data-testid="move-date-range-field-root" onclick={moveToSecondRoot}>
	Move date range field root
</button>
