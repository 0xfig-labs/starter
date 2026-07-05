import { setCurrentLocale } from "./current-locale";
import { defaultLocale, isValidLocale, type Locale } from "./translations";

/**
 * Strip locale prefix from URL pathname AND persist the locale for route context.
 * `/zh-CN/about` → `/about`, locale set to `zh-CN`.
 * `/about` → `/about`, locale set to default.
 */
export function deLocalizeUrl(url: URL): URL {
	const match = /^\/([a-z]{2}(?:-[A-Z]{2})?)(\/|$)/.exec(url.pathname);
	const candidate = match?.[1];

	if (candidate && isValidLocale(candidate)) {
		setCurrentLocale(candidate as Locale);
		const newUrl = new URL(url);
		newUrl.pathname = stripLocalePrefix(url.pathname);
		return newUrl;
	}

	setCurrentLocale(defaultLocale);
	return url;
}

/**
 * Add locale prefix to URL pathname.
 * `/about` → `/zh-CN/about` when locale is non-default.
 */
export function localizeUrl(url: URL, locale: Locale): URL {
	if (locale === defaultLocale) return url;

	const newUrl = new URL(url);
	// Guard: strip any existing locale prefix so we never double-prefix
	newUrl.pathname = stripLocalePrefix(url.pathname);
	newUrl.pathname =
		newUrl.pathname === "/" ? `/${locale}` : `/${locale}${newUrl.pathname}`;
	return newUrl;
}

/** Extract locale from raw pathname. */
export function extractLocaleFromPath(pathname: string): Locale | null {
	const match = /^\/([a-z]{2}(?:-[A-Z]{2})?)(\/|$)/.exec(pathname);
	if (match?.[1] && isValidLocale(match[1])) return match[1] as Locale;
	return null;
}

/** Strip ALL locale prefixes from pathname (handles recovery from doubled prefixes). */
export function stripLocalePrefix(pathname: string): string {
	let prev: string;
	let result = pathname;
	do {
		prev = result;
		const locale = extractLocaleFromPath(result);
		if (locale) result = result.replace(`/${locale}`, "") || "/";
	} while (result !== prev);
	return result;
}
