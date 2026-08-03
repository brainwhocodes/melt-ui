import { noop } from '../../helpers/index.js';
import type { PopperArgs } from './types.js';
export declare const usePopper: <Node extends HTMLElement>(popperElement: Node, args: PopperArgs) => {
    destroy: typeof noop;
};
