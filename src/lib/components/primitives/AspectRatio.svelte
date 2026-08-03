<script lang="ts">
	interface Props {
		ratio?: number;
		class?: string;
		children?: import('svelte').Snippet;
		[key: string]: any
	}

	let { ratio = 1, class: className = '', children, ...rest }: Props = $props();


	function validateRatio(value: number): number {
		if (!Number.isFinite(value) || value <= 0) {
			throw new TypeError('AspectRatio: `ratio` must be a finite number greater than 0.');
		}
		return value;
	}

	let validRatio = $derived(validateRatio(ratio));
</script>

<div
	{...rest}
	class={`melt-aspect-ratio ${className}`.trim()}
	style:--melt-aspect-ratio={validRatio}
	data-ratio={validRatio}
>
	{@render children?.()}
</div>
