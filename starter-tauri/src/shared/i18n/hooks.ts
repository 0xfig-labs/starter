import { useTranslation as useReactI18nextTranslation } from "react-i18next";

/**
 * Typed `useTranslation` helper.
 * Returns a `t` function scoped to the default namespace.
 */
export function useTranslation() {
  return useReactI18nextTranslation();
}
