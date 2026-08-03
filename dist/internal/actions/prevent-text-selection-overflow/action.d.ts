import type { PreventTextSelectionOverflowConfig } from './types.js';
export declare const usePreventTextSelectionOverflow: <Node extends HTMLElement>(node: Node, config?: PreventTextSelectionOverflowConfig) => {
    destroy(): void;
    update: (config: PreventTextSelectionOverflowConfig) => void;
};
