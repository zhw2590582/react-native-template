// ============ Posts Types ============
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type CreatePostInput = Omit<Post, "id">;

// ============ Users Types ============
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

// ============ Common Types ============
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
