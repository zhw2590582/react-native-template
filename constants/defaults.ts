/**
 * React Query 默认配置常量
 */
export const QUERY_CONFIG = {
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5分钟
      gcTime: 30 * 60 * 1000, // 30分钟
    },
  },
} as const;

/**
 * 存储相关常量
 */
export const STORAGE_CONFIG = {
  DEFAULT_ID: "mmkv.default",
  SECURE_ID: "secure-storage",
} as const;

/**
 * 日志相关常量
 */
export const LOG_CONFIG = {
  COLORS: {
    DEBUG: "\x1b[36m", // 青色
    INFO: "\x1b[32m", // 绿色
    WARN: "\x1b[33m", // 黄色
    ERROR: "\x1b[31m", // 红色
    RESET: "\x1b[0m",
  },
} as const;

/**
 * API 请求相关常量
 */
export const API_CONFIG = {
  STATUS: {
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  },
} as const;
