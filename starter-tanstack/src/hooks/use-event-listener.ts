import { useEffect, useRef } from "react";

/**
 * Typed event listener bound to a target element.
 * Defaults to `window` when no element is passed.
 *
 * @example
 * ```tsx
 * useEventListener("keydown", (e) => { if (e.key === "Escape") close() })
 * ```
 */
export function useEventListener<K extends keyof WindowEventMap>(
	eventName: K,
	handler: (e: WindowEventMap[K]) => void,
	element?: EventTarget | null,
): void {
	const handlerRef = useRef(handler);
	handlerRef.current = handler;

	useEffect(() => {
		const target = element ?? window;
		if (!target) return;

		const listener = (e: Event) => handlerRef.current(e as WindowEventMap[K]);
		target.addEventListener(eventName, listener);
		return () => target.removeEventListener(eventName, listener);
	}, [eventName, element]);
}
