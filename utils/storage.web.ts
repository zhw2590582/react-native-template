/**
 * Web 端存储工具类
 * 使用 localStorage 作为 MMKV 的替代
 */

// Web 端不需要加密存储，使用普通 localStorage
export const storage = {
  getString: (key: string) => localStorage.getItem(key) ?? undefined,
  set: (key: string, value: string | number | boolean) =>
    localStorage.setItem(key, String(value)),
  getNumber: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? Number(value) : undefined;
  },
  getBoolean: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? value === "true" : undefined;
  },
  remove: (key: string) => localStorage.removeItem(key),
  contains: (key: string) => localStorage.getItem(key) !== null,
  getAllKeys: () => Object.keys(localStorage),
  clearAll: () => localStorage.clear(),
};

export const secureStorage = storage;

export const mmkvStorage = {
  setString: (key: string, value: string) => localStorage.setItem(key, value),
  getString: (key: string) => localStorage.getItem(key) ?? undefined,
  setNumber: (key: string, value: number) =>
    localStorage.setItem(key, String(value)),
  getNumber: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? Number(value) : undefined;
  },
  setBoolean: (key: string, value: boolean) =>
    localStorage.setItem(key, String(value)),
  getBoolean: (key: string) => {
    const value = localStorage.getItem(key);
    return value ? value === "true" : undefined;
  },
  setObject: <T>(key: string, value: T) =>
    localStorage.setItem(key, JSON.stringify(value)),
  getObject: <T>(key: string): T | undefined => {
    const value = localStorage.getItem(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return undefined;
      }
    }
    return undefined;
  },
  delete: (key: string) => localStorage.removeItem(key),
  contains: (key: string) => localStorage.getItem(key) !== null,
  getAllKeys: () => Object.keys(localStorage),
  clearAll: () => localStorage.clear(),
};

export const StorageKeys = {
  USER_TOKEN: "user_token",
  USER_INFO: "user_info",
  THEME_MODE: "theme_mode",
  LANGUAGE: "language",
  FIRST_LAUNCH: "first_launch",
  LAST_SYNC_TIME: "last_sync_time",
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export default mmkvStorage;
