import { type ClassValue, clsx } from 'clsx';

/**
 * Appends class values and ignores falsy inputs.
 */
export function cn(...inputs: ClassValue[]): string {
	return clsx(inputs);
}
