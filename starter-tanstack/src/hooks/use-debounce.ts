import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Debounces a value by the given delay (ms).
 * Returns the latest value only after `delay` ms of inactivity.
 */
export function useDebounce<T>(value: T, delay: number): T {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const id = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);

	return debounced;
}

/**
 * Returns a debounced version of the callback.
 * The callback is called at most once every `delay` ms.
 */
// ponytail: generic Function — typed wrap is 3× the code for no runtime win
export function useDebounceCallback<T extends (...args: never[]) => void>(
	callback: T,
	delay: number,
): (...args: Parameters<T>) => void {
	const cbRef = useRef(callback);
	cbRef.current = callback;

	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	return useCallback(
		(...args: Parameters<T>) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			timerRef.current = setTimeout(() => {
				cbRef.current(...args);
			}, delay);
		},
		[delay],
	);
}
