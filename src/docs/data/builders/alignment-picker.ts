import { ATTRS, SEE, TYPES } from '$docs/constants.js';
import { builderSchema, elementSchema } from '$docs/utils/index.js';
import type { BuilderData } from './index.js';

const OPTION_PROPS = [
	{
		name: 'disabled',
		type: 'boolean',
		default: 'false',
		description: 'Disables the entire picker.',
	},
	{
		name: 'loop',
		type: 'boolean',
		default: 'true',
		description: 'Wraps spatial navigation at row and column edges.',
	},
	{
		name: 'dir',
		type: TYPES.DIR,
		default: "'ltr'",
		description: 'Controls horizontal visual direction.',
	},
	{ name: 'name', type: 'string', description: 'The hidden form input name.' },
];

const builder = builderSchema('alignment-picker', {
	title: 'createAlignmentPicker',
	props: [
		...OPTION_PROPS,
		{
			name: 'defaultValue',
			type: 'AlignmentPickerValue',
			default: "'center'",
			description: 'The initially selected logical alignment.',
		},
		{
			name: 'value',
			type: 'Writable<AlignmentPickerValue>',
			description: 'Controlled selected value.',
			see: SEE.BRING_YOUR_OWN_STORE,
		},
		{
			name: 'onValueChange',
			type: 'ChangeFn<AlignmentPickerValue>',
			description: 'Called when selection changes.',
			see: SEE.CHANGE_FUNCTIONS,
		},
	],
	elements: [
		{ name: 'root', description: 'The radiogroup container.' },
		{ name: 'item', description: 'Parameterized radio item builder.' },
		{ name: 'hiddenInput', description: 'Hidden form serialization input.' },
	],
	states: [
		{
			name: 'value',
			type: 'Writable<AlignmentPickerValue>',
			description: 'The current selected value.',
		},
	],
	options: OPTION_PROPS,
});

const root = elementSchema('root', {
	description: 'The alignment picker radiogroup.',
	dataAttributes: [
		{ name: 'data-state', value: "'selected' | 'empty'" },
		{ name: 'data-value', value: 'The selected logical alignment.' },
		{ name: 'data-disabled', value: ATTRS.DISABLED('alignment picker') },
		{ name: 'data-melt-alignment-picker', value: ATTRS.MELT('root') },
	],
});
const item = elementSchema('item', {
	description: 'A logical-position radio button.',
	dataAttributes: [
		{ name: 'data-value', value: 'The fixed logical alignment value.' },
		{ name: 'data-row', value: 'The zero-based grid row.' },
		{ name: 'data-column', value: 'The zero-based grid column.' },
		{ name: 'data-state', value: "'checked' | 'unchecked'" },
	],
});
const hiddenInput = elementSchema('hiddenInput', {
	description: 'The serialized logical alignment input.',
});

export const alignmentPickerData: BuilderData = {
	schemas: [builder, root, item, hiddenInput],
	features: [
		'Fixed nine-value alignment domain',
		'Two-dimensional roving keyboard navigation',
		'RTL-aware movement and form serialization',
	],
};
