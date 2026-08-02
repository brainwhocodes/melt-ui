<script lang="ts">
	import { createDateField, melt } from '$lib/index.js';
	import { CalendarDate } from '@internationalized/date';
	import { onMount } from 'svelte';

	const firstHost = document.createElement('div');
	firstHost.dataset.testid = 'first-shadow-host';
	const firstRoot = firstHost.attachShadow({ mode: 'open' });
	const secondHost = document.createElement('div');
	secondHost.dataset.testid = 'second-shadow-host';
	const secondRoot = secondHost.attachShadow({ mode: 'open' });

	const {
		elements: { field, segment, label, validation },
		states: { segmentContents },
		options: { rootElement },
	} = createDateField({
		defaultValue: new CalendarDate(2024, 1, 20),
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
	<span use:melt={$label}>Date</span>
	<div use:melt={$field} data-testid="field">
		{#each $segmentContents as seg, i (i)}
			<div use:melt={$segment(seg.part)}>{seg.value}</div>
		{/each}
	</div>
	<span use:melt={$validation}>Validation</span>
</div>
<button data-testid="move-date-field-root" on:click={moveToSecondRoot}>Move date field root</button>
