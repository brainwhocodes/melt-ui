import { noop } from '../../helpers/callbacks.js';
import type { FocusTrapConfig } from './types.js';
export declare const useFocusTrap: <Node extends HTMLElement>(node: Node, config?: FocusTrapConfig) => {
    destroy: typeof noop;
    update: (config: FocusTrapConfig) => void;
};
