<script lang="ts">
	import { createColorPicker, type CreateColorPickerProps } from '$lib/index.js';
	import { removeUndefined } from '../utils.js';

	type $$Props = CreateColorPickerProps;

	export let value: CreateColorPickerProps['value'] = undefined;
	export let defaultValue: CreateColorPickerProps['defaultValue'] = undefined;
	export let defaultFormat: CreateColorPickerProps['defaultFormat'] = undefined;
	export let format: CreateColorPickerProps['format'] = undefined;
	export let disabled: CreateColorPickerProps['disabled'] = undefined;
	export let readonly: CreateColorPickerProps['readonly'] = undefined;
	export let dir: CreateColorPickerProps['dir'] = undefined;
	export let orientation: CreateColorPickerProps['orientation'] = undefined;
	export let name: CreateColorPickerProps['name'] = undefined;
	export let previousValue: CreateColorPickerProps['previousValue'] = undefined;
	export let onValueChange: CreateColorPickerProps['onValueChange'] = undefined;
	export let onValueCommitted: CreateColorPickerProps['onValueCommitted'] = undefined;
	export let onFormatChange: CreateColorPickerProps['onFormatChange'] = undefined;

	const {
		elements: {
			root,
			area,
			areaThumb,
			areaXInput,
			areaYInput,
			hueTrack,
			hueThumb,
			hueInput,
			alphaTrack,
			alphaThumb,
			alphaInput,
			channelInput,
			colorInput,
			formatSelect,
			swatch,
			previousSwatch,
			copyButton,
			eyedropperButton,
			hiddenInput,
		},
		states: {
			value: localValue,
			format: localFormat,
			previousValue: localPrevious,
			channels,
			cssColor,
			active,
		},
	} = createColorPicker({
		value,
		defaultValue,
		defaultFormat,
		format,
		disabled,
		readonly,
		dir,
		orientation,
		name,
		previousValue,
		onValueChange,
		onValueCommitted,
		onFormatChange,
		...removeUndefined($$restProps),
	});
</script>

<main>
	<div data-testid="value">{$localValue.hue},{$localValue.saturation},{$localValue.value},{$localValue.alpha}</div>
	<div data-testid="previous">{$localPrevious.hue},{$localPrevious.saturation},{$localPrevious.value},{$localPrevious.alpha}</div>
	<div data-testid="format">{$localFormat}</div>
	<div data-testid="css">{$cssColor}</div>
	<div data-testid="active">{$active}</div>
	<form>
		<div {...$root} use:root aria-label="Color picker" data-testid="root">
			<div {...$area} use:area aria-label="Color area" data-testid="area">
				<span {...$areaThumb} use:areaThumb data-testid="area-thumb"></span>
				<input {...$areaXInput} use:areaXInput data-testid="area-x" />
				<input {...$areaYInput} use:areaYInput data-testid="area-y" />
			</div>
			<div {...$hueTrack} use:hueTrack aria-label="Hue" data-testid="hue-track">
				<span {...$hueThumb} use:hueThumb data-testid="hue-thumb"></span>
				<input {...$hueInput} use:hueInput data-testid="hue" />
			</div>
			<div {...$alphaTrack} use:alphaTrack aria-label="Alpha" data-testid="alpha-track">
				<span {...$alphaThumb} use:alphaThumb data-testid="alpha-thumb"></span>
				<input {...$alphaInput} use:alphaInput data-testid="alpha" />
			</div>
			<select {...$formatSelect} use:formatSelect data-testid="format-select">
				<option value="hex">HEX</option>
				<option value="rgb">RGB</option>
				<option value="hsl">HSL</option>
				<option value="hsv">HSV</option>
				<option value="oklch">OKLCH</option>
			</select>
			{#each $channels as channel}
				<input {...$channelInput({ channel })} use:channelInput data-testid={`channel-${channel}`} />
			{/each}
			<input {...$channelInput({ channel: 'lightness', format: 'oklch' })} use:channelInput data-testid="override-oklch-lightness" />
			<input {...$channelInput({ channel: 'lightness', format: 'hsl' })} use:channelInput data-testid="override-hsl-lightness" />
			<input {...$colorInput} use:colorInput data-testid="color-input" />
			<span {...$swatch} use:swatch data-testid="swatch"></span>
			<button {...$previousSwatch} use:previousSwatch data-testid="previous-swatch"></button>
			<button {...$copyButton({ format: 'rgb' })} use:copyButton data-testid="copy-rgb"></button>
			<button {...$copyButton()} use:copyButton data-testid="copy-active"></button>
			<button {...$eyedropperButton} use:eyedropperButton data-testid="eyedropper"></button>
		</div>
		<input {...$hiddenInput} use:hiddenInput data-testid="hidden" />
	</form>
</main>
