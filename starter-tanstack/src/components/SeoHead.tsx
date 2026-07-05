import { generateMetaTags } from "#/lib/seo";

interface SeoHeadProps {
	title: string;
	description: string;
	ogImage?: string;
	ogType?: "website" | "article" | "profile";
	canonical?: string;
	noIndex?: boolean;
}

/**
 * Component wrapper around `generateMetaTags`.
 * Use inside a route's `head` callback when you prefer JSX-like syntax.
 *
 * @example
 * ```tsx
 * export const Route = createFileRoute("/about")({
 *   head: () => <SeoHead title="About" description="..." />,
 * })
 * ```
 */
export function SeoHead(props: SeoHeadProps) {
	// This is a fake component — it only works inside TanStack Router's
	// `head` callback which accepts React elements as config.
	// The return value is spread as route head config.
	return generateMetaTags(props) as unknown as React.ReactElement;
}
