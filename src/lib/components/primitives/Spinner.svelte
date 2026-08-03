<script lang="ts">
	type SpinnerSize = 'sm' | 'md' | 'lg' | number | string;

	export let size: SpinnerSize = 'md';
	export let label = 'Loading';

	let className = '';
	export { className as class };

	$: customSize = typeof size === 'number' ? `${size}px` : typeof size === 'string' && !['sm', 'md', 'lg'].includes(size)
		? size
		: undefined;
	$: inlineStyle = [$$restProps.style, customSize ? `--melt-spinner-size: ${customSize}` : '']
		.filter(Boolean)
		.join('; ');
</script>

<span
	{...$$restProps}
	class={`melt-spinner ${className}`}
	style={inlineStyle}
	data-size={customSize ? 'custom' : size}
	role="status"
	aria-live="polite"
	aria-busy="true"
	aria-label={label}
>
	<svg class="melt-spinner-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
		<circle class="melt-spinner-track" cx="12" cy="12" r="9" stroke-width="3" />
		<path class="melt-spinner-indicator" d="M12 3a9 9 0 0 1 9 9" stroke-width="3" stroke-linecap="round" />
	</svg>
</span>
