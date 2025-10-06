/**
 * 組織模型
 */
export interface Organization {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  avatarUrl?: string;
  website?: string;
  location?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  membersCount: number;
  repositoriesCount: number;
  settings?: OrganizationSettings;
}

/**
 * 組織設定
 */
export interface OrganizationSettings {
  allowMemberInvitations: boolean;
  requireTwoFactorAuth: boolean;
  defaultMemberRole: MemberRole;
  billingEmail?: string;
  notifications: {
    memberInvitations: boolean;
    memberRemovals: boolean;
    roleChanges: boolean;
  };
}

/**
 * 組織成員角色
 */
export enum MemberRole {
  OWNER = 'owner',
  ADMIN = 'admin',
  MEMBER = 'member',
  VIEWER = 'viewer'
}

/**
 * 組織查詢參數
 */
export interface OrganizationQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  isPublic?: boolean;
}

/**
 * 組織更新參數
 */
export interface OrganizationUpdateParams {
  displayName?: string;
  description?: string;
  website?: string;
  location?: string;
  email?: string;
  isPublic?: boolean;
  settings?: Partial<OrganizationSettings>;
}

/**
 * 組織統計信息
 */
export interface OrganizationStats {
  membersCount: number;
  repositoriesCount: number;
  projectsCount: number;
  teamsCount: number;
}