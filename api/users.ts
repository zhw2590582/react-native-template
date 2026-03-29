import { api } from "@/hooks/use-api";
import type { User } from "@/types";
import { useQuery } from "@tanstack/react-query";

// Query Keys
export const userKeys = {
  all: ["users"] as const,
  lists: () => [...userKeys.all, "list"] as const,
  list: (limit: number) => [...userKeys.lists(), { limit }] as const,
  details: () => [...userKeys.all, "detail"] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// 获取用户列表
export const useUsers = (limit = 5) => {
  return useQuery({
    queryKey: userKeys.list(limit),
    queryFn: () => api.get<User[]>(`/users?_limit=${limit}`),
  });
};

// 获取单个用户
export const useUser = (id: number) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => api.get<User>(`/users/${id}`),
    enabled: !!id,
  });
};
