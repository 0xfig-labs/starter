import { createContext, useContext } from "react";
import { createT, defaultLocale, type Locale } from "./translations";

export interface I18nContextValue {
	locale: Locale;
	t: (path: string) => string;
}

const I18nCtx = createContext<I18nContextValue>({
	locale: defaultLocale,
	t: createT(defaultLocale),
});

const SetLocaleCtx = createContext<(locale: Locale) => void>(() => {});

export function I18nProvider({
	children,
	locale,
	t,
	setLocale,
}: {
	children: React.ReactNode;
	locale: Locale;
	t: (path: string) => string;
	setLocale: (locale: Locale) => void;
}) {
	return (
		<SetLocaleCtx.Provider value={setLocale}>
			<I18nCtx.Provider value={{ locale, t }}>{children}</I18nCtx.Provider>
		</SetLocaleCtx.Provider>
	);
}

/**
 * Read the current locale and `t` function.
 * Must be used inside <I18nProvider>.
 */
export function useTranslation() {
	return useContext(I18nCtx);
}

/** Switch locale from any component. */
export function useSetLocale() {
	return useContext(SetLocaleCtx);
}
