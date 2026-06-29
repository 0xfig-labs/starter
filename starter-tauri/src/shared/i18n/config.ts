import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./locales/en-US.json";
import zhCN from "./locales/zh-CN.json";

export const defaultNS = "translation";
export const fallbackLng = "en-US";

export const resources = {
  "en-US": { translation: enUS },
  "zh-CN": { translation: zhCN },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  fallbackLng,
  defaultNS,
  interpolation: {
    escapeValue: false, // React already escapes
  },
});

export default i18n;
