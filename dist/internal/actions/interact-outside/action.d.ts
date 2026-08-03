import type { InteractOutsideConfig } from './types.js';
export declare const useInteractOutside: <Node extends HTMLElement>(node: Node, config?: InteractOutsideConfig) => {
    update: (config: InteractOutsideConfig) => void;
    destroy(): void;
};
