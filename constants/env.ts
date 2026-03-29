import Constants from "expo-constants";

/**
 * 环境类型
 */
type Environment = "development" | "staging" | "production";

/**
 * 环境变量配置接口
 */
interface EnvConfig {
  // 应用信息
  APP_NAME: string;
  APP_VERSION: string;

  // API 配置
  API_BASE_URL: string;
  API_TIMEOUT: number;

  // 存储加密密钥（生产环境应从安全源获取）
  STORAGE_ENCRYPTION_KEY: string;

  // 第三方服务
  SENTRY_DSN?: string;
  ANALYTICS_KEY?: string;

  // 功能开关
  ENABLE_LOGGING: boolean;
  ENABLE_MOCK_DATA: boolean;
}

/**
 * 不同环境的配置
 */
const envConfigs: Record<Environment, EnvConfig> = {
  development: {
    APP_NAME: "RN Template (Dev)",
    APP_VERSION: Constants.expoConfig?.version ?? "1.0.0",
    API_BASE_URL: "https://jsonplaceholder.typicode.com",
    API_TIMEOUT: 30000,
    STORAGE_ENCRYPTION_KEY: "dev-encryption-key-change-in-production",
    SENTRY_DSN: undefined,
    ANALYTICS_KEY: undefined,
    ENABLE_LOGGING: true,
    ENABLE_MOCK_DATA: false,
  },
  staging: {
    APP_NAME: "RN Template (Staging)",
    APP_VERSION: Constants.expoConfig?.version ?? "1.0.0",
    API_BASE_URL: "https://staging-api.example.com",
    API_TIMEOUT: 20000,
    STORAGE_ENCRYPTION_KEY: "staging-encryption-key-change-in-production",
    SENTRY_DSN: undefined,
    ANALYTICS_KEY: undefined,
    ENABLE_LOGGING: true,
    ENABLE_MOCK_DATA: false,
  },
  production: {
    APP_NAME: "RN Template",
    APP_VERSION: Constants.expoConfig?.version ?? "1.0.0",
    API_BASE_URL: "https://api.example.com",
    API_TIMEOUT: 15000,
    STORAGE_ENCRYPTION_KEY: "REPLACE_WITH_SECURE_KEY_FROM_KEYCHAIN",
    SENTRY_DSN: undefined,
    ANALYTICS_KEY: undefined,
    ENABLE_LOGGING: false,
    ENABLE_MOCK_DATA: false,
  },
};

/**
 * 获取当前环境
 * 可通过 EAS Build 的 APP_ENV 环境变量或 __DEV__ 判断
 */
const getCurrentEnvironment = (): Environment => {
  // 从 expo-constants extra 获取（通过 app.config.js 设置）
  const appEnv = Constants.expoConfig?.extra?.APP_ENV as
    | Environment
    | undefined;

  if (appEnv && envConfigs[appEnv]) {
    return appEnv;
  }

  // 默认根据 __DEV__ 判断
  if (__DEV__) {
    return "development";
  }

  return "production";
};

/**
 * 当前环境
 */
export const ENV = getCurrentEnvironment();

/**
 * 当前环境配置
 */
export const Config: EnvConfig = envConfigs[ENV];

/**
 * 是否为开发环境
 */
export const isDev = ENV === "development";

/**
 * 是否为生产环境
 */
export const isProd = ENV === "production";

/**
 * 快捷访问常用配置
 */
export const API_BASE_URL = Config.API_BASE_URL;
export const API_TIMEOUT = Config.API_TIMEOUT;

export default Config;
