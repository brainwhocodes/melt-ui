import { ATTRS, SEE, TYPES } from '$docs/constants.js';
import { builderSchema, elementSchema } from '$docs/utils/index.js';
import type { BuilderData } from './index.js';

const OPTION_PROPS = [
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disables value editing and form submission.',
	},
	{
		name: 'readonly',
		type: 'boolean',
		default: 'false',
		description:
			'Keeps range controls focusable while blocking value mutation.',
	},
	{
		name: 'dir',
		type: TYPES.DIR,
		default: "'ltr'",
		description: 'Controls horizontal geometry and keyboard direction.',
	},
	{
		name: 'orientation',
		type: "'horizontal' | 'vertical'",
		default: "'horizontal'",
		description:
			'Shared hue/alpha track orientation. Vertical tracks map pointer values bottom-to-top.',
	},
	{ name: 'name', type: 'string', description: 'The hidden form input name.' },
];

const builder = builderSchema('color-picker', {
	title: 'createColorPicker',
	props: [
		...OPTION_PROPS,
		{
			name: 'defaultValue',
			type: 'ColorPickerValue',
			default: '{ hue: 0, saturation: 0, value: 0, alpha: 1 }',
			description: 'The initial canonical HSVA color.',
		},
		{
			name: 'value',
			type: 'Writable<ColorPickerValue>',
			description: 'Controlled canonical HSVA color.',
			see: SEE.BRING_YOUR_OWN_STORE,
		},
		{
			name: 'onValueChange',
			type: 'ChangeFn<ColorPickerValue>',
			description: 'Called when the color changes.',
			see: SEE.CHANGE_FUNCTIONS,
		},
		{
			name: 'onValueCommitted',
			type: '(value: ColorPickerValue) => void',
			description: 'Called once after a pointer or field interaction commits.',
		},
		{
			name: 'previousValue',
			type: 'Writable<ColorPickerValue>',
			description:
				'Controlled comparison color shown by previousSwatch. Defaults to a snapshot of the initial value; reset it when opening the picker.',
			see: SEE.BRING_YOUR_OWN_STORE,
		},
		{
			name: 'defaultFormat',
			type: 'ColorPickerFormat',
			default: "'hex'",
			description: 'The initial display format.',
		},
		{
			name: 'format',
			type: 'Writable<ColorPickerFormat>',
			description: 'Controlled display format.',
			see: SEE.BRING_YOUR_OWN_STORE,
		},
		{
			name: 'onFormatChange',
			type: 'ChangeFn<ColorPickerFormat>',
			description: 'Called when the display format changes.',
			see: SEE.CHANGE_FUNCTIONS,
		},
	],
	elements: [
		{
			name: 'root',
			description: 'The color picker state owner and CSS variable source.',
		},
		{ name: 'area', description: 'Consumer-labelled saturation/value group.' },
		{ name: 'areaThumb', description: 'Presentation-only area thumb.' },
		{ name: 'areaXInput', description: 'Native saturation range input.' },
		{ name: 'areaYInput', description: 'Native value range input.' },
		{ name: 'hueTrack', description: 'Hue track container.' },
		{ name: 'hueThumb', description: 'Presentation-only hue thumb.' },
		{ name: 'hueInput', description: 'Native hue range input.' },
		{ name: 'alphaTrack', description: 'Alpha track container.' },
		{ name: 'alphaThumb', description: 'Presentation-only alpha thumb.' },
		{ name: 'alphaInput', description: 'Native alpha range input.' },
		{
			name: 'channelInput',
			description:
				'Parameterized HEX, RGB, HSL, HSV, or OKLCH channel input. Accepts an optional format override for simultaneous rows.',
		},
		{
			name: 'colorInput',
			description:
				'Combined editable color string input. Click to edit; parses HEX, rgb(), hsl(), hsv(), and oklch() text.',
		},
		{ name: 'formatSelect', description: 'Native display-format select.' },
		{ name: 'swatch', description: 'Current color preview swatch.' },
		{
			name: 'previousSwatch',
			description:
				'Comparison color swatch. Clicking restores the previous color.',
		},
		{
			name: 'copyButton',
			description:
				'Copies the serialized color to the clipboard. Accepts an optional format parameter.',
		},
		{
			name: 'eyedropperButton',
			description:
				'Opens the native EyeDropper API when available and applies the picked color.',
		},
		{
			name: 'hiddenInput',
			description: 'Stable uppercase #RRGGBBAA form value.',
		},
	],
	states: [
		{
			name: 'value',
			type: 'Writable<ColorPickerValue>',
			description: 'Canonical normalized HSVA value.',
		},
		{
			name: 'format',
			type: 'Writable<ColorPickerFormat>',
			description: 'Current display format.',
		},
		{
			name: 'previousValue',
			type: 'Writable<ColorPickerValue>',
			description: 'Comparison color used by previousSwatch.',
		},
		{
			name: 'channels',
			type: 'Readable<readonly ColorPickerChannel[]>',
			description: 'Visible channels for the current format.',
		},
		{
			name: 'cssColor',
			type: 'Readable<string>',
			description: 'CSS Color 4 rgb() value.',
		},
		{
			name: 'active',
			type: "Readable<'area' | 'hue' | 'alpha' | null>",
			description: 'Currently active interaction region.',
		},
	],
	options: OPTION_PROPS,
});

const root = elementSchema('root', {
	description: 'The color picker state owner.',
	dataAttributes: [
		{ name: 'data-format', value: 'The active display format.' },
		{ name: 'data-disabled', value: ATTRS.DISABLED('color picker') },
		{ name: 'data-readonly', value: 'Present when the picker is readonly.' },
		{ name: 'data-melt-color-picker', value: ATTRS.MELT('root') },
	],
});
const area = elementSchema('area', {
	description:
		'The saturation/value area. Provide the accessible Color area label.',
});
const input = elementSchema('areaXInput', {
	description: 'A native range input with an aria-valuetext percentage.',
});
const hue = elementSchema('hueInput', {
	description: 'A native 0–360 degree hue range input.',
});
const alpha = elementSchema('alphaInput', {
	description: 'A native 0–100 percentage alpha range input.',
});
const channel = elementSchema('channelInput', {
	description: 'An editable channel input. Provide the channel parameter.',
});
const colorInput = elementSchema('colorInput', {
	description:
		'The combined color string field. Edits parse live; blur, Enter, or Escape normalizes the text.',
});
const previousSwatch = elementSchema('previousSwatch', {
	description: 'Restore-on-click comparison swatch.',
	dataAttributes: [{ name: 'data-color', value: 'Previous #RRGGBBAA color.' }],
});
const copyButton = elementSchema('copyButton', {
	description: 'Clipboard copy button with an optional format parameter.',
});
const eyedropperButton = elementSchema('eyedropperButton', {
	description: 'Native EyeDropper API trigger with graceful no-op fallback.',
});
const hiddenInput = elementSchema('hiddenInput', {
	description: 'A stable uppercase #RRGGBBAA hidden form input.',
});

export const colorPickerData: BuilderData = {
	schemas: [
		builder,
		root,
		area,
		input,
		hue,
		alpha,
		channel,
		colorInput,
		previousSwatch,
		copyButton,
		eyedropperButton,
		hiddenInput,
	],
	features: [
		'Canonical HSVA state with lossless HEX/RGB/HSL/HSV/OKLCH views',
		'Pointer and keyboard saturation/value, hue, and alpha controls with horizontal or vertical tracks',
		'Simultaneous multi-format channel rows, previous/new comparison, clipboard copy, and eyedropper support',
	],
};
