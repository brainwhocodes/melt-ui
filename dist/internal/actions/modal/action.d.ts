import type { ModalConfig } from './types.js';
export declare const useModal: <Node extends HTMLElement>(node: Node, config: ModalConfig) => {
    update: (config: ModalConfig) => void;
    destroy(): void;
};
