import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|ts|svelte)'],
	staticDirs: ['../static'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-a11y',
	],
	framework: '@storybook/sveltekit',
	docs: {
		autodocs: 'tag',
	},
};
export default config;
