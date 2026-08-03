import { mdsvex } from 'mdsvex';
import adapterStatic from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import type { Config } from '@sveltejs/kit';
import type { PreprocessorGroup } from 'svelte/compiler';
import { mdsvexOptions } from './mdsvex.config.ts';

const vite = vitePreprocess();
const viteTypescriptAndScss: PreprocessorGroup = {
	...vite,
	style: (options) => (options.attributes.lang === 'scss' ? vite.style?.(options) : undefined),
};

const config: Config = {
	extensions: ['.svelte', '.md'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [mdsvex(mdsvexOptions), viteTypescriptAndScss],

	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapterStatic(),
		prerender: {
			handleMissingId: 'ignore',
		},
		alias: {
			$routes: 'src/routes',
			'$routes/*': 'src/routes/*',
			'$test-helpers': 'src/test-helpers',
			$constants: 'src/constants',
			$docs: 'src/docs',
			'$docs/*': 'src/docs/*',
			$components: 'src/docs/components',
			'$components/*': 'src/docs/components/*',
			$icons: 'src/docs/components/icons',
			'$icons/*': 'src/docs/components/icons/*',
			$styles: 'src/styles',
			'$styles/*': 'src/styles/*',
		},
		typescript: {
			config: (config) => {
				return {
					compilerOptions: {
						...config.compilerOptions,
						baseUrl: '.',
						paths: {
							...config.compilerOptions.paths,
							'$test-helpers': ['../src/test-helpers/'],
							'$test-helpers/*': ['../src/test-helpers/*'],
						},
					},
					include: [...config.include, '**/*.test.ts'],
				};
			},
		},
	},
};

export default config;
