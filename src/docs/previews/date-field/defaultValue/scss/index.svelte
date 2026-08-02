<script lang="ts">
	import { createDateField, melt } from '$lib/index.js';

	const {
		elements: { field, segment, label },
		states: { value, segmentContents },
	} = createDateField();
</script>

<div class="surface-c6daf439d7">
	<div>
		<span use:melt={$label} class="surface-622cda8052">Due Date</span>
		<div
			use:melt={$field}
			class="surface-59f703d8ef"
		>
			{#each $segmentContents as seg, i (i)}
				<div use:melt={$segment(seg.part)} class="segment surface-1973f4dcf5">
					{seg.value}
				</div>
			{/each}
		</div>
	</div>
	<div class="surface-5ec84f508f">
		<p class="surface-3fdff6f647">
			<span> Selected Date: </span>
			{#if $value}
				{$value}
			{/if}
		</p>
	</div>
</div>

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
