import { useColorScheme as useSystemColorScheme } from "react-native";

import { useAppStore } from "@/store";

/**
 * 获取当前应用的颜色方案
 * 结合用户设置的 themeMode 和系统主题
 */
export function useColorScheme(): "light" | "dark" {
  const systemColorScheme = useSystemColorScheme();
  const themeMode = useAppStore((state) => state.themeMode);

  if (themeMode === "system") {
    return systemColorScheme ?? "light";
  }

  return themeMode;
}
