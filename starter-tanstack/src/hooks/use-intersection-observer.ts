import { useCallback, useRef, useState } from "react";

interface UseIntersectionObserverReturn {
	/** Ref callback — attach to the observed element */
	ref: (node: Element | null) => void;
	isIntersecting: boolean;
	entry: IntersectionObserverEntry | null;
}

/**
 * Detects when an element enters the viewport.
 * Uses a RefCallback pattern so it works with any DOM element.
 *
 * @example
 * ```tsx
 * function LazyImage() {
 *   const { ref, isIntersecting } = useIntersectionObserver()
 *   return <div ref={ref}>{isIntersecting && <img src="..." />}</div>
 * }
 * ```
 */
export function useIntersectionObserver(
	options?: IntersectionObserverInit,
): UseIntersectionObserverReturn {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
	const observerRef = useRef<IntersectionObserver | null>(null);
	const optsRef = useRef(options);
	optsRef.current = options;

	const ref = useCallback((node: Element | null) => {
		if (observerRef.current) {
			observerRef.current.disconnect();
			observerRef.current = null;
		}

		if (!node) {
			setIsIntersecting(false);
			setEntry(null);
			return;
		}

		const obs = new IntersectionObserver(([e]) => {
			setIsIntersecting(e.isIntersecting);
			setEntry(e);
		}, optsRef.current);
		obs.observe(node);
		observerRef.current = obs;
	}, []);

	return { ref, isIntersecting, entry };
}
