import { error } from '@sveltejs/kit';
import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';
import { highlightCode } from '$docs/highlighter.js';
import { isBrowser } from '$lib/internal/helpers/index.js';
import {
	type Builder,
	builderMap,
	isBuilderName,
} from '../data/builders/index.js';
import type { DocResolver, PreviewFile, PreviewResolver } from '../types.js';

function slugFromPath(path: string) {
	return path.replace('/src/docs/content/', '').replace('.md', '');
}

function previewPathMatcher(path: string, builder: string) {
	const strippedPath = path.replace('/src/docs/previews/', '');
	const builderPath = strippedPath.split('/')[0];
	return builderPath === builder;
}

interface PreviewObj {
	[cmpName: string]: {
		scss: {
			[fileName: `${string}.svelte`]: string | undefined;
		};
	};
}

type SvelteFile = `${string}.svelte`;

const isSvelteFile = (file: string): file is SvelteFile => {
	return file.endsWith('.svelte');
};

type CreatePreviewsObjectArgs = {
	component: string;
	objArr: { path: string; content: string }[];
	fetcher?: typeof fetch;
};
async function createPreviewsObject({
	component,
	objArr,
}: CreatePreviewsObjectArgs): Promise<PreviewObj> {
	const returnedObj: PreviewObj = {};

	// The documentation exposes one authored style path: SCSS.
	const regex = new RegExp(`${component}/(.+?)/scss/(.*?\\.svelte)$`);

	const promises = objArr.map(async (obj) => {
		const match = regex.exec(obj.path);
		if (!match) return;

		const [, groupKey, fileKey] = match;
		if (!isSvelteFile(fileKey)) return;

		const content = obj.content
			.replace(/\n\t\t\tclass="force-dark"|\bforce-dark\b/g, '')
			.replace(/class="force-dark /g, 'class="');

		if (!returnedObj[groupKey]) {
			returnedObj[groupKey] = { scss: {} };
		}

		const highlightedCode = await highlightCode({
			code: content,
			lang: 'svelte',
		});
		returnedObj[groupKey].scss[fileKey] = highlightedCode ?? content;
	});

	await Promise.all(promises);
	return returnedObj;
}

const regexMap = new Map<string, RegExp>();

function isMainPreviewComponent(builder: string, path: string): boolean {
	if (!regexMap.has(builder)) {
		const regexPattern = `${builder}/main/scss/index\\.svelte$`;
		regexMap.set(builder, new RegExp(regexPattern));
	}

	return !!regexMap.get(builder)?.test(path);
}

export async function getDocData(slug: string) {
	const modules = import.meta.glob('/src/docs/content/builders/**/*.md');

	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		const strippedPath = slugFromPath(path).split('/')[1];
		if (strippedPath === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	const doc = await match?.resolver?.();

	if (!doc || !doc.metadata) {
		error(404);
	}
	return doc;
}

function replaceLibEntries(code: string) {
	// avoid executing the regex if it doesn't have $lib in the code for performance
	if (!code.includes('$lib/index.js')) return code;
	return code.replace(/\$lib\/index\.js/g, '@melt-ui/svelte');
}

export async function getAllPreviewSnippets(slug: string) {
	const previewsCode = import.meta.glob<string>(
		`/src/docs/previews/**/*.svelte`,
		{
			query: '?raw',
			import: 'default',
			eager: true,
		},
	);

	const previewCodeMatches: { path: string; content: string }[] = [];
	for (const [path, resolver] of Object.entries(previewsCode)) {
		const isMatch = previewPathMatcher(path, slug);
		if (isMatch) {
			const prev = { path, content: replaceLibEntries(resolver) };
			previewCodeMatches.push(prev);
		}
	}

	const previews = await createPreviewsObject({
		component: slug,
		objArr: previewCodeMatches,
	});

	return previews;
}

const getPreviewName = (path: string, slug: string) => {
	return path.replaceAll(`/src/docs/previews/${slug}/`, '').split('/')[0];
};

export async function getAllPreviewComponents(slug: string) {
	const previewComponents = import.meta.glob(
		'/src/docs/previews/**/scss/index.svelte',
	);

	const previewCodeMatches: { [key: string]: SvelteComponent } = {};

	const promises = Object.entries(previewComponents).map(
		async ([path, resolver]) => {
			const isMatch = previewPathMatcher(path, slug);
			if (!isMatch) return;
			const previewName = getPreviewName(path, slug);

			const previewComp = (await resolver?.()) as PreviewFile;
			if (!previewComp) return;
			previewCodeMatches[previewName] = previewComp.default;
		},
	);
	await Promise.all(promises);

	return previewCodeMatches;
}

export async function getMainPreviewComponent(slug: string) {
	if (!isBuilderName(slug)) {
		error(500);
	}

	const previewComponents = import.meta.glob('/src/docs/previews/**/*.svelte');
	let mainPreviewObj: { path?: string; resolver?: PreviewResolver } = {};
	for (const [path, resolver] of Object.entries(previewComponents)) {
		if (isMainPreviewComponent(slug, path)) {
			mainPreviewObj = {
				path,
				resolver: resolver as unknown as PreviewResolver,
			};
			break;
		}
	}

	const mainPreview = await mainPreviewObj.resolver?.();
	if (!mainPreview) {
		error(500);
	}

	return mainPreview.default;
}

export async function getBuilderData(slug: Builder) {
	const builderData = builderMap[slug];
	const schemas = builderData['schemas'];
	if (!schemas) return builderData;

	const promises = schemas.map(async (key) => {
		if (Object.prototype.hasOwnProperty.call(key, 'props')) {
			const props = key['props'];
			if (!props) return;
			const highlightPromises = props.map((prop) => {
				if (!prop['longType']) return;
				const longType = prop['longType'];
				return highlightCode({
					code: longType.rawCode,
					lang: 'typescript',
					classes: {
						pre: '!mt-0 !mb-0',
					},
				}).then((highlightedCode) => {
					if (prop.longType) {
						prop.longType.highlightedCode = highlightedCode;
					}
				});
			});

			return highlightPromises;
		}
	});
	await Promise.all(promises);

	builderData.schemas = schemas;
	return builderData;
}

export function transformAPIString(
	text: string | string[],
	defaultCodeColor = false,
) {
	if (Array.isArray(text)) {
		text = text.join(' | ');
	}
	text = text.replaceAll('"', "'");
	const regex = /`(.+?)`/g;
	return text.replace(
		regex,
		`<code class="${defaultCodeColor ? '' : 'neutral'}">$1</code>`,
	);
}

export async function getDoc(slug: string) {
	const modules = import.meta.glob('/src/docs/content/**/*.md');

	let match: { path?: string; resolver?: DocResolver } = {};

	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}

	const doc = await match?.resolver?.();

	if (!doc || !doc.metadata) {
		error(404);
	}
	return doc;
}

export function createHeadingId(text: string) {
	return text
		.replaceAll(/[^a-zA-Z0-9 ]/g, '')
		.replaceAll(' ', '-')
		.toLowerCase();
}

export function createCopyCodeButton() {
	let codeString = '';
	const copied = writable(false);
	let copyTimeout = 0;

	function copyCode() {
		if (!isBrowser) return;
		navigator.clipboard.writeText(codeString);
		copied.set(true);
		clearTimeout(copyTimeout);
		copyTimeout = window.setTimeout(() => {
			copied.set(false);
		}, 2500);
	}

	function setCodeString(node: HTMLElement) {
		const updateCodeString = () => {
			codeString = node.textContent?.trim() ?? '';
		};
		const observer = new MutationObserver(updateCodeString);
		const frame = requestAnimationFrame(updateCodeString);
		updateCodeString();
		observer.observe(node, {
			childList: true,
			subtree: true,
			characterData: true,
		});

		return {
			destroy() {
				observer.disconnect();
				cancelAnimationFrame(frame);
			},
		};
	}

	return {
		copied: copied,
		copyCode: copyCode,
		setCodeString: setCodeString,
	};
}
