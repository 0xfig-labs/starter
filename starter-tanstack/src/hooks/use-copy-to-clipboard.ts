import { useCallback, useRef, useState } from "react";

interface UseCopyToClipboardReturn {
	copy: (text: string) => Promise<void>;
	copied: boolean;
	error: Error | null;
}

/**
 * Copies text to the clipboard and tracks the copied state.
 *
 * @param resetAfter - ms after which `copied` resets (default 2000)
 *
 * @example
 * ```tsx
 * const { copy, copied } = useCopyToClipboard()
 * <button onClick={() => copy("hello")}>{copied ? "Copied!" : "Copy"}</button>
 * ```
 */
export function useCopyToClipboard(
	resetAfter = 2000,
): UseCopyToClipboardReturn {
	const [copied, setCopied] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const copy = useCallback(
		async (text: string) => {
			if (timerRef.current) clearTimeout(timerRef.current);
			try {
				await navigator.clipboard.writeText(text);
				setCopied(true);
				setError(null);
			} catch (err) {
				setError(err instanceof Error ? err : new Error(String(err)));
				setCopied(false);
			}
			timerRef.current = setTimeout(() => setCopied(false), resetAfter);
		},
		[resetAfter],
	);

	return { copy, copied, error };
}
