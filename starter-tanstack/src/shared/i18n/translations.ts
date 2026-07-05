import enUS from "./locales/en-US.json";
import zhCN from "./locales/zh-CN.json";

export type Locale = keyof typeof translations;
export type RawTranslations = (typeof translations)[Locale];

export const translations = { "en-US": enUS, "zh-CN": zhCN } as const;
export const defaultLocale: Locale = "en-US";
export const locales: Locale[] = ["en-US", "zh-CN"];

/** Guard: is the unknown value one of our known locale codes. */
export function isValidLocale(s: unknown): s is Locale {
	return s === "en-US" || s === "zh-CN";
}

/**
 * Walk a dot-separated path into the translations object.
 * Returns the raw string or the input path as fallback.
 */
function lookup(obj: RawTranslations, path: string): string {
	let current: unknown = obj;
	for (const key of path.split(".")) {
		if (typeof current !== "object" || current === null) return path;
		current = (current as Record<string, unknown>)[key];
	}
	return typeof current === "string" ? current : path;
}

/**
 * Create a `t(path)` function bound to a locale.
 * Pure function — no state, no dependencies.
 */
export function createT(locale: Locale) {
	const data = translations[locale];
	return (path: string): string => lookup(data, path);
}
