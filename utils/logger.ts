import { Config, LOG_CONFIG } from "@/constants";

/**
 * 日志级别
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

/**
 * 日志级别的字符串表示
 */
const LogLevelName = {
  [LogLevel.DEBUG]: "DEBUG",
  [LogLevel.INFO]: "INFO",
  [LogLevel.WARN]: "WARN",
  [LogLevel.ERROR]: "ERROR",
} as const;

/**
 * 日志级别的颜色（用于开发环境）
 */
const LogLevelColor = {
  [LogLevel.DEBUG]: LOG_CONFIG.COLORS.DEBUG,
  [LogLevel.INFO]: LOG_CONFIG.COLORS.INFO,
  [LogLevel.WARN]: LOG_CONFIG.COLORS.WARN,
  [LogLevel.ERROR]: LOG_CONFIG.COLORS.ERROR,
} as const;

const { RESET: ColorReset } = LOG_CONFIG.COLORS;

/**
 * Logger 类
 * 提供结构化日志输出，支持多个日志级别
 */
class Logger {
  private moduleName: string;

  constructor(moduleName: string = "App") {
    this.moduleName = moduleName;
  }

  /**
   * 获取当前时间戳（格式：YYYY-MM-DD HH:mm:ss.SSS）
   */
  private getTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const date = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ms = String(now.getMilliseconds()).padStart(3, "0");

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}.${ms}`;
  }

  /**
   * 格式化日志消息
   */
  private formatMessage(
    level: LogLevel,
    message: string,
    data?: unknown,
  ): string {
    const timestamp = this.getTimestamp();
    const levelName = LogLevelName[level];
    const prefix = `[${timestamp}] [${levelName}] [${this.moduleName}]`;

    if (data !== undefined) {
      try {
        const dataStr =
          typeof data === "string" ? data : JSON.stringify(data, null, 2);
        return `${prefix} ${message}\n${dataStr}`;
      } catch {
        return `${prefix} ${message} ${String(data)}`;
      }
    }

    return `${prefix} ${message}`;
  }

  /**
   * 判断是否应该输出该级别的日志
   */
  private shouldLog(level: LogLevel): boolean {
    // 如果禁用日志，只输出 ERROR
    if (!Config.ENABLE_LOGGING) {
      return level >= LogLevel.ERROR;
    }

    // 生产环境只输出 WARN 及以上
    if (!__DEV__) {
      return level >= LogLevel.WARN;
    }

    // 开发环境输出所有日志
    return true;
  }

  /**
   * 内部日志方法
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    if (!this.shouldLog(level)) {
      return;
    }

    const formattedMessage = this.formatMessage(level, message, data);
    const colorCode = LogLevelColor[level];

    // 在不同环境使用不同的日志方法
    if (__DEV__) {
      // 开发环境：带颜色输出
      console.log(`${colorCode}${formattedMessage}${ColorReset}`);
    } else {
      // 生产环境：纯文本输出
      if (level === LogLevel.ERROR) {
        console.error(formattedMessage);
      } else if (level === LogLevel.WARN) {
        console.warn(formattedMessage);
      } else {
        console.log(formattedMessage);
      }
    }
  }

  /**
   * DEBUG 级别日志
   */
  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * INFO 级别日志
   */
  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * WARN 级别日志
   */
  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * ERROR 级别日志
   */
  error(message: string, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data);
  }

  /**
   * 记录 API 请求
   */
  logApiRequest(method: string, url: string, data?: unknown): void {
    this.debug(`API Request: ${method} ${url}`, data);
  }

  /**
   * 记录 API 响应
   */
  logApiResponse(
    method: string,
    url: string,
    status: number,
    data?: unknown,
  ): void {
    this.debug(`API Response: ${method} ${url} (${status})`, data);
  }

  /**
   * 记录 API 错误
   */
  logApiError(method: string, url: string, error: unknown): void {
    this.error(`API Error: ${method} ${url}`, error);
  }

  /**
   * 记录性能指标
   */
  logPerformance(metric: string, duration: number, unit: string = "ms"): void {
    this.info(`Performance: ${metric} took ${duration}${unit}`);
  }
}

/**
 * 创建 Logger 实例
 */
export const createLogger = (moduleName: string): Logger => {
  return new Logger(moduleName);
};

/**
 * 全局默认 Logger
 */
export const logger = createLogger("App");

export default logger;
