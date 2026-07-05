import { useCallback, useState } from "react";

/**
 * SSR-safe persisted state in localStorage.
 *
 * @param key - localStorage key
 * @param initialValue - fallback when nothing is stored or on SSR
 *
 * @example
 * ```tsx
 * const [name, setName] = useLocalStorage("name", "")
 * ```
 */
export function useLocalStorage<T>(
	key: string,
	initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void] {
	const [stored, setStored] = useState<T>(() => {
		if (typeof window === "undefined") return initialValue;
		try {
			const item = window.localStorage.getItem(key);
			return item !== null ? (JSON.parse(item) as T) : initialValue;
		} catch {
			return initialValue;
		}
	});

	const setValue = useCallback(
		(value: T | ((prev: T) => T)) => {
			setStored((prev) => {
				const next = value instanceof Function ? value(prev) : value;
				try {
					window.localStorage.setItem(key, JSON.stringify(next));
				} catch {
					// quota exceeded or private browsing — silently degrade
				}
				return next;
			});
		},
		[key],
	);

	return [stored, setValue];
}
