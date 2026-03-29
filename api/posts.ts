import { api } from "@/hooks/use-api";
import type { CreatePostInput, Post } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Query Keys
export const postKeys = {
  all: ["posts"] as const,
  lists: () => [...postKeys.all, "list"] as const,
  list: (limit: number) => [...postKeys.lists(), { limit }] as const,
  details: () => [...postKeys.all, "detail"] as const,
  detail: (id: number) => [...postKeys.details(), id] as const,
};

// 获取文章列表
export const usePosts = (limit = 5) => {
  return useQuery({
    queryKey: postKeys.list(limit),
    queryFn: () => api.get<Post[]>(`/posts?_limit=${limit}`),
  });
};

// 获取单篇文章
export const usePost = (id: number) => {
  return useQuery({
    queryKey: postKeys.detail(id),
    queryFn: () => api.get<Post>(`/posts/${id}`),
    enabled: !!id,
  });
};

// 创建文章
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newPost: CreatePostInput) => api.post<Post>("/posts", newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

// 更新文章
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: Partial<Post> & { id: number }) =>
      api.patch<Post>(`/posts/${id}`, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: postKeys.detail(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};

// 删除文章
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => api.delete(`/posts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.lists() });
    },
  });
};
