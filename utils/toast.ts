import { toast as sonnerToast } from "sonner-native";

interface ToastOptions {
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Toast 工具类
 * 基于 sonner-native 封装
 */
export const toast = {
  /**
   * 成功提示
   */
  success: (message: string, options?: ToastOptions) => {
    sonnerToast.success(message, {
      description: options?.description,
      duration: options?.duration ?? 3000,
      action: options?.action,
    });
  },

  /**
   * 错误提示
   */
  error: (message: string, options?: ToastOptions) => {
    sonnerToast.error(message, {
      description: options?.description,
      duration: options?.duration ?? 4000,
      action: options?.action,
    });
  },

  /**
   * 警告提示
   */
  warning: (message: string, options?: ToastOptions) => {
    sonnerToast.warning(message, {
      description: options?.description,
      duration: options?.duration ?? 3000,
      action: options?.action,
    });
  },

  /**
   * 普通提示
   */
  info: (message: string, options?: ToastOptions) => {
    sonnerToast.info(message, {
      description: options?.description,
      duration: options?.duration ?? 3000,
      action: options?.action,
    });
  },

  /**
   * 普通消息
   */
  message: (message: string, options?: ToastOptions) => {
    sonnerToast(message, {
      description: options?.description,
      duration: options?.duration ?? 3000,
      action: options?.action,
    });
  },

  /**
   * Promise 提示（加载中 -> 成功/失败）
   */
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) => {
    return sonnerToast.promise(promise, {
      loading: messages.loading,
      success: () => messages.success,
      error: () => messages.error,
    });
  },

  /**
   * 关闭所有提示
   */
  dismiss: (toastId?: string | number) => {
    sonnerToast.dismiss(toastId);
  },
};

export default toast;
