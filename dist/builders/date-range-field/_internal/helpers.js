import { getElementById, isBrowser } from '../../../internal/helpers/index.js';
export function removeDescriptionElement(id, rootElement) {
    if (!isBrowser)
        return;
    getElementById(id, rootElement)?.remove();
}
