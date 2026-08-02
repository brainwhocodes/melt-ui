<script lang="ts">
	import { createDateRangeField, melt } from '$lib/index.js';
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

	let hostMount: HTMLDivElement;
	let fieldContainer: HTMLDivElement;

	onMount(() => {
		hostMount.append(firstHost, secondHost);
		firstRoot.append(fieldContainer);
		rootElement.set(document);
		rootElement.set(firstRoot);
	});

	function moveToSecondRoot() {
		secondRoot.append(fieldContainer);
		rootElement.set(secondRoot);
	}
</script>

<div bind:this={hostMount}></div>
<div bind:this={fieldContainer}>
	<span use:melt={$label}>Booking Dates</span>
	<div use:melt={$field} data-testid="field">
		{#each $segmentContents.start as seg, i (i)}
			<div use:melt={$startSegment(seg.part)}>{seg.value}</div>
		{/each}
		<span aria-hidden="true">-</span>
		{#each $segmentContents.end as seg, i (i)}
			<div use:melt={$endSegment(seg.part)}>{seg.value}</div>
		{/each}
	</div>
	<span use:melt={$validation}>Validation</span>
</div>
<button data-testid="move-date-range-field-root" on:click={moveToSecondRoot}>
	Move date range field root
</button>
