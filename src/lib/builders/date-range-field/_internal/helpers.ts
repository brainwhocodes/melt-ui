import { getElementById, isBrowser } from '$lib/internal/helpers/index.js';

export function removeDescriptionElement(id: string, rootElement?: ParentNode) {
	if (!isBrowser) return;
	getElementById(id, rootElement)?.remove();
}
