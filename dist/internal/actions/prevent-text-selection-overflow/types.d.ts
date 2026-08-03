import type { Readable } from 'svelte/store';
import type { WithGet } from '../../helpers/withGet.js';
export type PreventTextSelectionOverflowConfig = {
    /**
     * Whether should prevent text selection overflowing the element when the element is the top layer.
     *
     * @defaultValue `true`
     */
    enabled?: boolean | WithGet<Readable<boolean>>;
};
