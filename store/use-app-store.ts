import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { storage } from "@/utils/storage";

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

// MMKV 存储适配器
const mmkvStorage = {
  getItem: (name: string) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    storage.set(name, value);
  },
  removeItem: (name: string) => {
    storage.remove(name);
  },
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // 主题
      themeMode: "system",
      setThemeMode: (mode) => set({ themeMode: mode }),

      // 首次启动
      isFirstLaunch: true,
      setFirstLaunch: (value) => set({ isFirstLaunch: value }),

      // loading
      isLoading: false,
      setLoading: (value) => set({ isLoading: value }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => mmkvStorage),
      // 只持久化需要的字段
      partialize: (state) => ({
        themeMode: state.themeMode,
        isFirstLaunch: state.isFirstLaunch,
      }),
    },
  ),
);
