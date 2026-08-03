/**
 * Creates an announcer object that can be used to make `aria-live` announcements to screen readers.
 */
export declare function getAnnouncer(): {
    announce: (value: string | null | number, kind?: "assertive" | "polite", timeout?: number) => number | undefined;
};
