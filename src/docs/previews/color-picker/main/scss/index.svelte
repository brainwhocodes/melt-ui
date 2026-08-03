<script lang="ts">
	import { createColorPicker, createPopover, createSync, type ColorPickerChannel, type ColorPickerFormat } from '$lib/index.js';
	import { Copy, Pipette } from '$icons/index.js';

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
		states: { value, serialized },
	} = createColorPicker({ name: 'color', orientation: 'vertical' });

	const {
		elements: { trigger, content, arrow },
		states: popoverStates,
		options: popoverOptions,
	} = createPopover({ forceVisible: true });

	const sync = createSync(popoverStates);
	let open = $state(false);
	$effect(() => {
		sync.open(open, (v) => (open = v));
	});

	type Direction = 'top' | 'right' | 'bottom' | 'left';
	const directions: readonly Direction[] = ['top', 'right', 'bottom', 'left'];
	const opposite: Record<Direction, Direction> = {
		top: 'bottom',
		right: 'left',
		bottom: 'top',
		left: 'right',
	};
	let direction: Direction = $state('right');
	$effect(() => {
		popoverOptions.positioning.update((config) => ({
			...config,
			placement: direction,
			flip: {
				fallbackPlacements: (
					[opposite[direction], 'bottom', 'top'] as Direction[]
				).filter((placement) => placement !== direction),
			},
		}));
	});

	const rows: ReadonlyArray<{
		label: string;
		format: ColorPickerFormat;
		channels: readonly ColorPickerChannel[];
	}> = [
		{ label: 'LCH', format: 'oklch', channels: ['lightness', 'chroma', 'hue'] },
		{
			label: 'HSL',
			format: 'hsl',
			channels: ['hue', 'saturation', 'lightness'],
		},
		{ label: 'RGB', format: 'rgb', channels: ['red', 'green', 'blue'] },
	];
</script>

<div class="color-demo">
	<div class="color-demo__directions" role="group" aria-label="Popover direction">
		{#each directions as side}
			<button
				type="button"
				class:active={direction === side}
				aria-pressed={direction === side}
				title={side}
				onclick={() => (direction = side)}
			>
				{side === 'top' ? '\u2191' : side === 'right' ? '\u2192' : side === 'bottom' ? '\u2193' : '\u2190'}
			</button>
		{/each}
	</div>
	<button
		type="button"
		{...$trigger} use:trigger
		class="color-field"
		aria-label="Open color picker"
	>
		<span {...$swatch} use:swatch class="color-field__swatch" aria-hidden="true"></span>
		<span class="color-field__value">{$serialized}</span>
		<span class="color-field__alpha">{Math.round($value.alpha * 100)}%</span>
	</button>
</div>

{#if open}
	<div {...$content} use:content class="color-panel">
		<div {...$arrow} use:arrow></div>
		<div {...$root} use:root class="color-panel__body" aria-label="Color picker">
			<header class="color-panel__header">
				<select {...$formatSelect} use:formatSelect aria-label="Color format">
					<option value="hex">HEX</option>
					<option value="rgb">RGB</option>
					<option value="hsl">HSL</option>
					<option value="hsv">HSV</option>
					<option value="oklch">OKLCH</option>
				</select>
				<button {...$eyedropperButton} use:eyedropperButton aria-label="Pick color from screen">
					<Pipette size="14" />
				</button>
			</header>
			<div class="color-panel__main">
				<div {...$area} use:area class="color-panel__area" aria-label="Color area">
					<span {...$areaThumb} use:areaThumb class="color-panel__area-thumb"></span>
					<input {...$areaXInput} use:areaXInput aria-label="Saturation" />
					<input {...$areaYInput} use:areaYInput aria-label="Value" />
				</div>
				<div {...$hueTrack} use:hueTrack class="color-panel__track" aria-label="Hue">
					<span {...$hueThumb} use:hueThumb class="color-panel__thumb"></span>
					<input {...$hueInput} use:hueInput aria-label="Hue" />
				</div>
				<div
					{...$alphaTrack} use:alphaTrack
					class="color-panel__track color-panel__track--alpha"
					aria-label="Alpha"
				>
					<span {...$alphaThumb} use:alphaThumb class="color-panel__thumb"></span>
					<input {...$alphaInput} use:alphaInput aria-label="Alpha" />
				</div>
			</div>
			<div class="color-panel__compare">
				<button
					{...$previousSwatch} use:previousSwatch
					class="color-panel__compare-half"
					aria-label="Restore previous color"
				>
					<span>Previous</span>
				</button>
				<span {...$swatch} use:swatch class="color-panel__compare-half">
					<span>New</span>
				</span>
			</div>
			{#each rows as row}
				<div class="color-panel__row">
					{#each row.channels as channel}
						<label>
							<input
								{...$channelInput({ channel, format: row.format })} use:channelInput
								aria-label="{row.label} {channel}"
							/>
							<span>{channel === 'saturation' ? 'S' : channel[0].toUpperCase()}</span>
						</label>
					{/each}
					<button
						{...$copyButton({ format: row.format })} use:copyButton
						aria-label="Copy {row.label} color"
					>
						<Copy size="13" />
					</button>
				</div>
			{/each}
			<div class="color-panel__footer">
				<input {...$colorInput} use:colorInput aria-label="Color value" />
				<label class="color-panel__alpha-field">
					<input {...$channelInput({ channel: 'alpha' })} use:channelInput aria-label="Alpha" />
					<span>%</span>
				</label>
			</div>
			<input {...$hiddenInput} use:hiddenInput />
		</div>
	</div>
{/if}
