import { noop } from '../helpers/index.js';
export type PortalConfig = string | HTMLElement | undefined;
export declare const usePortal: <Node extends HTMLElement>(el: Node, target?: PortalConfig) => {
    destroy: typeof noop;
    update?: undefined;
} | {
    update: (newTarget?: PortalConfig) => Promise<void>;
    destroy: () => void;
};
