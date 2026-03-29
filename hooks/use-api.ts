import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";

import { API_BASE_URL, API_CONFIG, API_TIMEOUT } from "@/constants";
import { createLogger } from "@/utils";

const logger = createLogger("API");
const STATUS = API_CONFIG.STATUS;

// 创建 axios 实例
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    logger.logApiRequest(
      config.method?.toUpperCase() || "GET",
      config.url || "",
      config.data,
    );
    // 可以在这里添加 token
    // const token = await getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    logger.error("Request setup failed", error);
    return Promise.reject(error);
  },
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    logger.logApiResponse(
      response.config.method?.toUpperCase() || "GET",
      response.config.url || "",
      response.status,
      response.data,
    );
    return response;
  },
  (error) => {
    // 统一错误处理
    if (error.response) {
      const { status, config } = error.response;
      logger.logApiError(
        config.method?.toUpperCase() || "GET",
        config.url || "",
        error,
      );

      switch (status) {
        case STATUS.UNAUTHORIZED:
          logger.warn("Unauthorized: token may be expired");
          break;
        case STATUS.FORBIDDEN:
          logger.warn("Forbidden: access denied");
          break;
        case STATUS.NOT_FOUND:
          logger.warn("Not Found: resource not found");
          break;
        case STATUS.SERVER_ERROR:
          logger.error("Server Error: internal server error");
          break;
        default:
          logger.error(`Request Error: ${status}`);
      }
    } else {
      logger.error("Network Error", error);
    }
    return Promise.reject(error);
  },
);

// 封装请求方法
export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.get<T>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.post<T>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.put<T>(url, data, config).then((res) => res.data),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    apiClient.patch<T>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    apiClient.delete<T>(url, config).then((res) => res.data),
};

export default apiClient;
