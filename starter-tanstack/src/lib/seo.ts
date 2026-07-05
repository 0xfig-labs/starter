import type { HeadMeta } from "@tanstack/react-router";

/**
 * Shape returned by the SEO helpers below.
 */
interface SeoMeta {
	title?: string;
	meta: HeadMeta[];
	links?: { rel: string; href: string }[];
}

interface SeoOptions {
	title: string;
	description: string;
	/** Full URL to the OG image */
	ogImage?: string;
	ogType?: "website" | "article" | "profile";
	canonical?: string;
	noIndex?: boolean;
}

/**
 * Generate standard meta tags for a page.
 * Returns an object that can be spread into a route's `head` callback.
 *
 * @example
 * ```tsx
 * export const Route = createFileRoute("/about")({
 *   head: () => generateMetaTags({ title: "About", description: "..." }),
 * })
 * ```
 */
export function generateMetaTags({
	title,
	description,
	ogImage,
	ogType = "website",
	canonical,
	noIndex,
}: SeoOptions): SeoMeta {
	const meta: HeadMeta[] = [
		{ name: "description", content: description },
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		{ property: "og:type", content: ogType },
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },
	];

	if (ogImage) {
		meta.push({ property: "og:image", content: ogImage });
		meta.push({ name: "twitter:image", content: ogImage });
	}

	if (noIndex) {
		meta.push({ name: "robots", content: "noindex" });
	}

	const links: SeoMeta["links"] = [];
	if (canonical) {
		links.push({ rel: "canonical", href: canonical });
	}

	return { title, meta, links };
}
