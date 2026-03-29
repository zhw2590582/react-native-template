import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./client";

// 类型定义
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// Query Keys - 集中管理
export const queryKeys = {
  posts: ["posts"] as const,
  post: (id: number) => ["posts", id] as const,
  users: ["users"] as const,
  user: (id: number) => ["users", id] as const,
};

// ============ Posts API ============

// 获取文章列表
export const usePosts = (limit = 5) => {
  return useQuery({
    queryKey: [...queryKeys.posts, { limit }],
    queryFn: () => api.get<Post[]>(`/posts?_limit=${limit}`),
  });
};

// 获取单篇文章
export const usePost = (id: number) => {
  return useQuery({
    queryKey: queryKeys.post(id),
    queryFn: () => api.get<Post>(`/posts/${id}`),
    enabled: !!id,
  });
};

// 创建文章
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: Omit<Post, "id">) =>
      api.post<Post>("/posts", newPost),
    onSuccess: () => {
      // 创建成功后刷新列表
      queryClient.invalidateQueries({ queryKey: queryKeys.posts });
    },
  });
};

// ============ Users API ============

// 获取用户列表
export const useUsers = (limit = 5) => {
  return useQuery({
    queryKey: [...queryKeys.users, { limit }],
    queryFn: () => api.get<User[]>(`/users?_limit=${limit}`),
  });
};

// 获取单个用户
export const useUser = (id: number) => {
  return useQuery({
    queryKey: queryKeys.user(id),
    queryFn: () => api.get<User>(`/users/${id}`),
    enabled: !!id,
  });
};
