import { get, type Updater, writable } from 'svelte/store';
import { browser } from '$app/environment';

const USING_PREPROCESSOR_KEY = 'melt-using-preprocessor';

const { subscribe, set } = writable(true);

export function getUsingPreprocessor() {
	if (browser) {
		let parsedStored = true;
		try {
			parsedStored = JSON.parse(
				localStorage.getItem(USING_PREPROCESSOR_KEY) ?? 'true',
			);
		} catch (_e) {
			/** empty */
		}
		set(parsedStored);
	}
	return {
		subscribe,
		set(newValue: boolean) {
			localStorage.setItem(USING_PREPROCESSOR_KEY, JSON.stringify(newValue));
			set(newValue);
		},
		update(updateFunction: Updater<boolean>) {
			const oldValue = get({ subscribe });
			const newValue = updateFunction(oldValue);
			localStorage.setItem(USING_PREPROCESSOR_KEY, JSON.stringify(newValue));
			set(newValue);
		},
	};
}
