import { useEffect, useState } from "react";

/**
 * Reactively tracks whether a CSS media query matches.
 * SSR-safe — returns `false` during server rendering.
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery("(max-width: 640px)")
 * ```
 */
export function useMediaQuery(query: string): boolean {
	const [matches, setMatches] = useState(false);

	useEffect(() => {
		const mql = window.matchMedia(query);
		const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
		setMatches(mql.matches);
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, [query]);

	return matches;
}
