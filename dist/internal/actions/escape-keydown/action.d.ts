import type { EscapeKeydownConfig } from './types.js';
export declare const useEscapeKeydown: <Node extends HTMLElement>(node: Node, config?: EscapeKeydownConfig) => {
    update: (config?: EscapeKeydownConfig) => void;
    destroy(): void;
};
