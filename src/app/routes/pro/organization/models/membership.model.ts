import { User } from './user.model';
import { Organization, MemberRole } from './organization.model';

/**
 * 成員關係模型
 */
export interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: MemberRole;
  joinedAt: Date;
  invitedBy?: string;
  user?: User;
  organization?: Organization;
}

/**
 * 成員邀請模型
 */
export interface MemberInvitation {
  id: string;
  email: string;
  organizationId: string;
  role: MemberRole;
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: InvitationStatus;
  token: string;
}

/**
 * 邀請狀態
 */
export enum InvitationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
  EXPIRED = 'expired'
}

/**
 * 成員列表查詢參數
 */
export interface MembershipQueryParams {
  organizationId: string;
  page?: number;
  pageSize?: number;
  search?: string;
  role?: MemberRole;
}

/**
 * 邀請成員參數
 */
export interface InviteMemberParams {
  email: string;
  role: MemberRole;
  message?: string;
}

/**
 * 更新成員角色參數
 */
export interface UpdateMemberRoleParams {
  membershipId: string;
  role: MemberRole;
}

/**
 * 成員統計信息
 */
export interface MembershipStats {
  totalMembers: number;
  owners: number;
  admins: number;
  members: number;
  viewers: number;
  pendingInvitations: number;
}