import type { VirtualElement } from '@floating-ui/core';
import { noop } from '../../helpers/index.js';
import type { FloatingConfig } from './types.js';
export declare function isVirtualElement(element: unknown): element is VirtualElement;
export declare function useFloating(reference: HTMLElement | VirtualElement | undefined, floating: HTMLElement | undefined, opts?: FloatingConfig): {
    destroy: typeof noop;
};
