import { defaultLocale, type Locale } from "./translations";

// ponytail: module-level global. Safe in CF Workers (per-isolate) and browser (single-threaded).
// In Node.js multi-request SSR this would need AsyncLocalStorage.
let _current: Locale = defaultLocale;

export function setCurrentLocale(locale: Locale) {
	_current = locale;
}

export function getCurrentLocale(): Locale {
	return _current;
}
