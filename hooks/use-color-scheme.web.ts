import { useEffect, useState } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

import { useAppStore } from "@/store";

/**
 * Web 版本的颜色方案 hook
 * 支持静态渲染，需要在客户端重新计算
 */
export function useColorScheme(): "light" | "dark" {
  const [hasHydrated, setHasHydrated] = useState(false);
  const systemColorScheme = useSystemColorScheme();
  const themeMode = useAppStore((state) => state.themeMode);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  if (!hasHydrated) {
    return "light";
  }

  if (themeMode === "system") {
    return systemColorScheme ?? "light";
  }

  return themeMode;
}
