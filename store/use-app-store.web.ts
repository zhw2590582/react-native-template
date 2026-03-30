import { create } from "zustand";

type ThemeMode = "light" | "dark" | "system";

interface AppState {
  // 主题设置
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;

  // 首次启动
  isFirstLaunch: boolean;
  setFirstLaunch: (value: boolean) => void;

  // 全局 loading
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

// Web 端简化版本（不持久化）
export const useAppStore = create<AppState>((set) => ({
  // 主题
  themeMode: "system",
  setThemeMode: (mode) => set({ themeMode: mode }),

  // 首次启动
  isFirstLaunch: true,
  setFirstLaunch: (value) => set({ isFirstLaunch: value }),

  // loading
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));
