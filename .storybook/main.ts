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
	viteFinal: (config) => ({
		...config,
		build: {
			...config.build,
			// Storybook intentionally bundles its preview and a11y vendor chunks.
			chunkSizeWarningLimit: 1024,
			rolldownOptions: {
				...config.build?.rolldownOptions,
				checks: {
					...config.build?.rolldownOptions?.checks,
					pluginTimings: false,
				},
			},
		},
	}),
};
export default config;
