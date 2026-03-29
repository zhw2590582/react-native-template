import { Platform } from "react-native";
import { createMMKV } from "react-native-mmkv";

// 创建默认 MMKV 实例
export const storage = createMMKV();

// 创建加密实例（用于敏感数据，Web 不支持加密）
export const secureStorage = createMMKV({
  id: "secure-storage",
  ...(Platform.OS !== "web" && {
    encryptionKey: "your-encryption-key", // 生产环境应使用安全生成的密钥
  }),
});

/**
 * 存储工具类
 * 基于 MMKV 封装，提供类型安全的存储方法
 */
export const mmkvStorage = {
  // ============ 字符串 ============
  setString: (key: string, value: string) => {
    storage.set(key, value);
  },

  getString: (key: string): string | undefined => {
    return storage.getString(key);
  },

  // ============ 数字 ============
  setNumber: (key: string, value: number) => {
    storage.set(key, value);
  },

  getNumber: (key: string): number | undefined => {
    return storage.getNumber(key);
  },

  // ============ 布尔值 ============
  setBoolean: (key: string, value: boolean) => {
    storage.set(key, value);
  },

  getBoolean: (key: string): boolean | undefined => {
    return storage.getBoolean(key);
  },

  // ============ 对象/数组 (JSON) ============
  setObject: <T>(key: string, value: T) => {
    storage.set(key, JSON.stringify(value));
  },

  getObject: <T>(key: string): T | undefined => {
    const value = storage.getString(key);
    if (value) {
      try {
        return JSON.parse(value) as T;
      } catch {
        return undefined;
      }
    }
    return undefined;
  },

  // ============ 通用方法 ============
  delete: (key: string) => {
    storage.remove(key);
  },

  contains: (key: string): boolean => {
    return storage.contains(key);
  },

  getAllKeys: (): string[] => {
    return storage.getAllKeys();
  },

  clearAll: () => {
    storage.clearAll();
  },
};

// 存储 Keys 常量（集中管理）
export const StorageKeys = {
  // 用户相关
  USER_TOKEN: "user_token",
  USER_INFO: "user_info",

  // 设置相关
  THEME_MODE: "theme_mode",
  LANGUAGE: "language",
  FIRST_LAUNCH: "first_launch",

  // 缓存相关
  LAST_SYNC_TIME: "last_sync_time",
} as const;

export type StorageKey = (typeof StorageKeys)[keyof typeof StorageKeys];

export default mmkvStorage;
