import { type BundledLanguage, getHighlighter, type Highlighter } from 'shiki';

type ShikiOptions = NonNullable<Parameters<typeof getHighlighter>[0]>;

const shikiOptions: ShikiOptions = {
	themes: [import('shiki/themes/github-dark.mjs')],
	langs: [
		import('shiki/langs/svelte.mjs'),
		import('shiki/langs/typescript.mjs'),
		import('shiki/langs/css.mjs'),
		import('shiki/langs/javascript.mjs'),
		import('shiki/langs/json.mjs'),
		import('shiki/langs/shellscript.mjs'),
		'plaintext',
	],
};

let highlighterPromise: Promise<Highlighter> | undefined;

export function getStoredHighlighter() {
	return (highlighterPromise ??= getHighlighter(shikiOptions));
}

type HighlightClasses = {
	pre?: string;
	code?: string;
	line?: string;
};

type HighlightCodeArgs = {
	code: string;
	lang: BundledLanguage;
	classes?: HighlightClasses;
};

const highlightedCodeCache = new Map<string, string>();

export async function highlightCode({
	code,
	lang,
	classes = {},
}: HighlightCodeArgs) {
	let cached = highlightedCodeCache.get(code);

	if (!cached) {
		const highlighter = await getStoredHighlighter();
		cached = highlighter.codeToHtml(tabsToSpaces(code), {
			lang,
			theme: 'github-dark',
			transformers: [
				{
					pre(node) {
						this.addClassToHast(node, classes.pre ? classes.pre : '!mt-0');
					},
					code(node) {
						if (classes.code) {
							this.addClassToHast(node, classes.code);
						}
					},
					line(node) {
						if (!node.children && classes.line) {
							this.addClassToHast(node, classes.line);
						}
					},
				},
			],
		});
		highlightedCodeCache.set(code, cached);
	}

	return cached;
}

function tabsToSpaces(code: string) {
	return code.replace(/\t/g, '  ');
}
