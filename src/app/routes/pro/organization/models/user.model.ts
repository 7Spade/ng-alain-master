/**
 * 用戶模型
 */
export interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  stats?: {
    followers: number;
    following: number;
    repositories: number;
  };
  isActive: boolean;
}

/**
 * 用戶列表查詢參數
 */
export interface UserQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isActive?: boolean;
}

/**
 * 用戶統計信息
 */
export interface UserStats {
  followers: number;
  following: number;
  repositories: number;
  organizations: number;
}

/**
 * 用戶更新參數
 */
export interface UserUpdateParams {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
}