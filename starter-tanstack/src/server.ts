import handler from "@tanstack/react-start/server-entry";
import { extractLocaleFromPath } from "#/shared/i18n/rewrite";
import { defaultLocale, isValidLocale } from "#/shared/i18n/translations";

const LOCALE_COOKIE = "starter_locale";

export default {
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const pathname = url.pathname;

		// Skip non-page routes
		if (pathname.startsWith("/api/") || pathname.startsWith("/_")) {
			return handler.fetch(request);
		}

		// Redirect /en-US/about → /about (default locale shouldn't have prefix)
		if (
			pathname === `/${defaultLocale}` ||
			pathname.startsWith(`/${defaultLocale}/`)
		) {
			url.pathname = pathname.replace(`/${defaultLocale}`, "") || "/";
			return Response.redirect(url.toString(), 301);
		}

		const response = await handler.fetch(request);

		// Sync cookie when URL has an explicit non-default locale
		const urlLocale = extractLocaleFromPath(pathname);
		const cookieHeader = request.headers.get("cookie") ?? "";
		const existingCookie = cookieHeader
			.split(";")
			.find((c) => c.trim().startsWith(`${LOCALE_COOKIE}=`));

		if (urlLocale && !existingCookie) {
			response.headers.append(
				"Set-Cookie",
				`${LOCALE_COOKIE}=${urlLocale}; Path=/; Max-Age=31536000; SameSite=Lax`,
			);
		}

		return response;
	},
};
