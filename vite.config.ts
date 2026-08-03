import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { pagefind } from 'vite-plugin-pagefind';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [
		sveltekit(),
		svelteTesting(),
		...(process.env.VITEST
			? []
			: [
					pagefind({
						assetsDirectory: 'static',
						outputDirectory: 'build',
						buildScript: 'deploy',
					}),
				]),
	],
	test: {
		include: ['src/**/*.spec.{js,ts}'],
		// jest like globals
		globals: true,
		environment: 'jsdom',
		// in-source testing
		includeSource: ['src/**/*.{js,ts,svelte}'],
		// Add @testing-library/jest-dom matchers & mocks of SvelteKit modules
		setupFiles: ['./scripts/setupTest.ts'],
		// Exclude files in v8
		coverage: {
			exclude: ['setupTest.ts'],
		},
		retry: process.env.CI ? 1 : 0,
		allowOnly: !process.env.CI,
	},
});
