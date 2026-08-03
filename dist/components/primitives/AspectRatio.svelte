<script lang="ts">
	export let ratio = 1;
	let className = '';
	export { className as class };

	function validateRatio(value: number): number {
		if (!Number.isFinite(value) || value <= 0) {
			throw new TypeError('AspectRatio: `ratio` must be a finite number greater than 0.');
		}
		return value;
	}

	$: validRatio = validateRatio(ratio);
</script>

<div
	{...$$restProps}
	class={`melt-aspect-ratio ${className}`.trim()}
	style:--melt-aspect-ratio={validRatio}
	data-ratio={validRatio}
>
	<slot />
</div>
