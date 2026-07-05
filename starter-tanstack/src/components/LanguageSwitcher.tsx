import { useNavigate, useRouterState } from "@tanstack/react-router";
import { LanguagesIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { setCurrentLocale } from "#/shared/i18n/current-locale";
import { useSetLocale, useTranslation } from "#/shared/i18n/hooks";
import { stripLocalePrefix } from "#/shared/i18n/rewrite";
import type { Locale } from "#/shared/i18n/translations";

const languages = [
	{ value: "en-US" as const, short: "EN", labelKey: "language.en-US" },
	{ value: "zh-CN" as const, short: "中文", labelKey: "language.zh-CN" },
] as const;

/** Segmented-button style — for Settings page or sidebars. */
export function LanguageSwitcher() {
	const { t, locale } = useTranslation();
	const setLocale = useSetLocale();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	const switchTo = (newLocale: string) => {
		setLocale(newLocale as Locale);
		setCurrentLocale(newLocale as Locale);
		const cleanPath = stripLocalePrefix(pathname) || "/";
		navigate({ to: cleanPath, replace: true });
	};

	return (
		<div
			className="inline-flex items-center gap-1 rounded-lg border p-0.5"
			aria-label={t("language.label")}
		>
			{languages.map((lang) => (
				<Button
					key={lang.value}
					variant={locale === lang.value ? "default" : "ghost"}
					size="sm"
					className="h-7 px-2 text-xs"
					onClick={() => switchTo(lang.value)}
				>
					{lang.short}
				</Button>
			))}
		</div>
	);
}

/** Icon-button dropdown — for header/toolbar. */
export function LanguageMenu() {
	const { t, locale } = useTranslation();
	const setLocale = useSetLocale();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });

	const switchTo = (newLocale: string) => {
		setLocale(newLocale as Locale);
		setCurrentLocale(newLocale as Locale);
		const cleanPath = stripLocalePrefix(pathname) || "/";
		navigate({ to: cleanPath, replace: true });
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						aria-label={t("language.label")}
					/>
				}
			>
				<LanguagesIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={locale} onValueChange={switchTo}>
					{languages.map((lang) => (
						<DropdownMenuRadioItem key={lang.value} value={lang.value}>
							<span className="mr-2 w-5 text-xs text-muted-foreground">
								{lang.short}
							</span>
							{t(lang.labelKey)}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
