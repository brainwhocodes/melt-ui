import type { Root as HastRoot } from 'hast';
import { toHtml } from 'hast-util-to-html';
import type { InlineCode, Root as MdastRoot } from 'mdast';
import type { MdsvexOptions } from 'mdsvex';
import { escapeSvelte } from 'mdsvex';
import { resolve } from 'path';
import type { Options as RehypePrettyCodeOptions } from 'rehype-pretty-code';
import rehypePrettyCode from 'rehype-pretty-code';
import { codeImport } from 'remark-code-import';
import remarkGfm from 'remark-gfm';
import { getHighlighter } from 'shiki';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import { fileURLToPath } from 'url';

type HastTransformer = Transformer<HastRoot, HastRoot>;
type MdastTransformer = Transformer<MdastRoot, MdastRoot>;

const __dirname = fileURLToPath(new URL('.', import.meta.url));
let prettyCodeHighlighterPromise: ReturnType<typeof getHighlighter> | undefined;

const prettyCodeOptions: RehypePrettyCodeOptions = {
	theme: 'github-dark',
	keepBackground: false,
	onVisitLine(node) {
		if (node.children.length === 0) {
			// we're modifying the node type
			node.children = {
				type: 'text',
				value: ' ',
			} as unknown as typeof node.children;
		}
	},
	onVisitHighlightedLine(node) {
		node.properties.className = ['line--highlighted'];
	},
	onVisitHighlightedChars(node) {
		node.properties.className = ['chars--highlighted'];
	},
	getHighlighter: (options) =>
		(prettyCodeHighlighterPromise ??= getHighlighter({
			...options,
			langs: [
				'plaintext',
				import('shiki/langs/svelte.mjs'),
				import('shiki/langs/typescript.mjs'),
				import('shiki/langs/css.mjs'),
				import('shiki/langs/javascript.mjs'),
				import('shiki/langs/json.mjs'),
				import('shiki/langs/shellscript.mjs'),
			],
			themes: [import('shiki/themes/github-dark.mjs')],
		})),
};

export const mdsvexOptions: MdsvexOptions = {
	highlight: false,
	extensions: ['.md'],
	layout: resolve(__dirname, './src/docs/components/markdown/layout.svelte'),
	layoutPropForwarding: 'runes',
	smartypants: {
		quotes: false,
		ellipses: false,
		backticks: false,
		dashes: false,
	},
	// unified's `Plugin`/`Transformer`/`Settings` types default to the generic unist
	// `Node`, which is contravariant-incompatible with hast/mdast-specific transformers
	// (and `Settings` is a weak type). The plugins below are standard rehype/remark
	// plugins; cast the arrays to mdsvex's plugin-list types at this boundary.
	remarkPlugins: [
		remarkGfm,
		remarkEscapeSvelte,
		codeImport,
	] as MdsvexOptions['remarkPlugins'],
	rehypePlugins: [
		rehypeComponentPreToPre,
		[rehypePrettyCode, prettyCodeOptions],
		rehypeHandleMetadata,
		rehypeRenderCode,
		rehypePreToComponentPre,
	] as MdsvexOptions['rehypePlugins'],
};

function rehypeComponentPreToPre(): HastTransformer {
	return async (tree) => {
		// Replace `Component.pre` tags with regular `pre` tags.
		// This enables us to use rehype-pretty-code with our custom `pre` component.
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'Components.pre') {
				node.tagName = 'pre';
			}
		});
	};
}

const entities: Array<[RegExp, string]> = [
	[/</g, '&lt;'],
	[/>/g, '&gt;'],
	[/{/g, '&#123;'],
	[/}/g, '&#125;'],
];

function remarkEscapeSvelte(): MdastTransformer {
	return async (tree) => {
		visit(tree, 'inlineCode', escape);

		function escape(node: InlineCode) {
			for (let i = 0; i < entities.length; i += 1) {
				node.value = node.value.replace(entities[i][0], entities[i][1]);
			}
		}
	};
}

function rehypePreToComponentPre(): HastTransformer {
	return async (tree) => {
		// Replace `pre` tags with our custom `Component.pre` tags.
		// This enables us to use rehype-pretty-code with our custom `pre` component.
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'pre') {
				node.tagName = 'Components.pre';
			}
		});
	};
}

function rehypeHandleMetadata(): HastTransformer {
	return async (tree) => {
		visit(tree, (node) => {
			if (node?.type === 'element' && node?.tagName === 'figure') {
				if (!('data-rehype-pretty-code-figure' in node.properties)) {
					return;
				}

				const preElement = node.children.at(-1);
				if (
					preElement &&
					'tagName' in preElement &&
					preElement.tagName !== 'pre'
				) {
					return;
				}

				const firstChild = node.children.at(0);
				if (
					firstChild &&
					'tagName' in firstChild &&
					firstChild.tagName === 'figcaption'
				) {
					node.properties['data-metadata'] = '';
					const lastChild = node.children.at(-1);
					if (lastChild && 'properties' in lastChild) {
						lastChild.properties['data-metadata'] = '';
					}
				}
			}
		});
	};
}

function rehypeRenderCode(): HastTransformer {
	return async (tree) => {
		visit(tree, (node) => {
			if (
				node?.type === 'element' &&
				(node?.tagName === 'Components.pre' || node?.tagName === 'pre')
			) {
				const codeEl = node.children[0];
				if (codeEl?.type === 'element' && codeEl.tagName !== 'code') {
					return;
				}

				if (codeEl?.type === 'element') {
					const meltString = tabsToSpaces(
						toHtml(codeEl, {
							allowDangerousCharacters: true,
							allowDangerousHtml: true,
						}),
					);

					// we're modifying the node type to a raw node, which has a value property
					const rawNode = codeEl as unknown as { type: string; value: string };
					rawNode.type = 'raw';
					rawNode.value = `{@html \`${escapeSvelte(meltString)}\`}`;
				}
			}
		});
	};
}

function tabsToSpaces(code: string) {
	return code.replaceAll('    ', '  ').replaceAll('\t', '  ');
}
