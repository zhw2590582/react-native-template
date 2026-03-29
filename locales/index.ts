import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enUS from "./en-US.json";
import zhCN from "./zh-CN.json";

// 支持的语言列表
export const supportedLanguages = {
  "zh-CN": { name: "简体中文", nativeName: "简体中文" },
  "en-US": { name: "English", nativeName: "English" },
} as const;

export type LanguageCode = keyof typeof supportedLanguages;

// 资源
const resources = {
  "zh-CN": { translation: zhCN },
  "en-US": { translation: enUS },
};

// 获取设备语言
const getDeviceLanguage = (): LanguageCode => {
  const locale = Localization.getLocales()[0]?.languageTag ?? "en-US";

  // 检查是否直接匹配
  if (locale in supportedLanguages) {
    return locale as LanguageCode;
  }

  // 尝试匹配语言代码前缀
  const langPrefix = locale.split("-")[0];
  if (langPrefix === "zh") return "zh-CN";
  if (langPrefix === "en") return "en-US";

  // 默认返回英文
  return "en-US";
};

// 初始化 i18n
i18n.use(initReactI18next).init({
  resources,
  lng: getDeviceLanguage(),
  fallbackLng: "en-US",
  interpolation: {
    escapeValue: false, // React 已经默认转义
  },
  react: {
    useSuspense: false, // 在 RN 中禁用 Suspense
  },
});

// 切换语言
export const changeLanguage = (lang: LanguageCode) => {
  i18n.changeLanguage(lang);
};

// 获取当前语言
export const getCurrentLanguage = (): LanguageCode => {
  return i18n.language as LanguageCode;
};

export default i18n;
