import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ThemeProvider } from "next-themes";
import { useState, useEffect, useMemo } from "react";
import { I18nProvider } from "#/shared/i18n/context";
import { getCurrentLocale } from "#/shared/i18n/current-locale";
import { createT } from "#/shared/i18n/translations";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "../components/ui/sonner";
import { TooltipProvider } from "../components/ui/tooltip";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import type { RouterContext } from "../router";
import appCss from "../styles.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='system')?stored:'system';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='system'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='system'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: () => {
		const locale = getCurrentLocale();
		return { locale };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const ctx = Route.useRouteContext();

	return (
		<html lang={ctx.locale} suppressHydrationWarning>
			<head>
				<script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
				<HeadContent />
			</head>
			<body className="font-sans antialiased [overflow-wrap:anywhere] selection:bg-[rgba(79,184,178,0.24)]">
				<ThemeProvider
					attribute="class"
					storageKey="theme"
					enableSystem
					disableTransitionOnChange
				>
					<TooltipProvider>
						<I18nWrapper>
							<Header />
							{children}
						</I18nWrapper>
					</TooltipProvider>
					<Footer />
					<Toaster />
				</ThemeProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function I18nWrapper({ children }: { children: React.ReactNode }) {
	const ctx = Route.useRouteContext();
	const [locale, setLocale] = useState(ctx.locale);
	const t = useMemo(() => createT(locale), [locale]);

	// Sync when route context changes (SSR hydration / full navigation)
	useEffect(() => setLocale(ctx.locale), [ctx.locale]);

	return (
		<I18nProvider locale={locale} t={t} setLocale={setLocale}>
			{children}
		</I18nProvider>
	);
}
