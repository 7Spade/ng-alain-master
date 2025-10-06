import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { 
  Membership, 
  MemberInvitation, 
  MembershipQueryParams,
  InviteMemberParams,
  UpdateMemberRoleParams,
  MembershipStats,
  InvitationStatus 
} from '../models/membership.model';
import { MemberRole } from '../models/organization.model';

/**
 * 成員關係服務
 */
@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  private readonly http = inject(_HttpClient);

  /**
   * 獲取組織成員列表
   */
  getMembers(params: MembershipQueryParams): Observable<{ data: Membership[]; total: number }> {
    return this.http.get(`/api/organizations/${params.organizationId}/members`, {
      page: params.page,
      pageSize: params.pageSize,
      search: params.search,
      role: params.role
    });
  }

  /**
   * 獲取組織成員統計
   */
  getMembershipStats(organizationId: string): Observable<MembershipStats> {
    return this.http.get(`/api/organizations/${organizationId}/membership-stats`);
  }

  /**
   * 邀請成員
   */
  inviteMember(organizationId: string, params: InviteMemberParams): Observable<MemberInvitation> {
    return this.http.post(`/api/organizations/${organizationId}/invite`, params);
  }

  /**
   * 獲取邀請列表
   */
  getInvitations(organizationId: string): Observable<MemberInvitation[]> {
    return this.http.get(`/api/organizations/${organizationId}/invitations`);
  }

  /**
   * 接受邀請
   */
  acceptInvitation(token: string): Observable<void> {
    return this.http.post(`/api/invitations/${token}/accept`);
  }

  /**
   * 拒絕邀請
   */
  declineInvitation(token: string): Observable<void> {
    return this.http.post(`/api/invitations/${token}/decline`);
  }

  /**
   * 取消邀請
   */
  cancelInvitation(invitationId: string): Observable<void> {
    return this.http.delete(`/api/invitations/${invitationId}`);
  }

  /**
   * 更新成員角色
   */
  updateMemberRole(params: UpdateMemberRoleParams): Observable<Membership> {
    return this.http.put(`/api/memberships/${params.membershipId}/role`, {
      role: params.role
    });
  }

  /**
   * 移除成員
   */
  removeMember(membershipId: string): Observable<void> {
    return this.http.delete(`/api/memberships/${membershipId}`);
  }

  /**
   * 離開組織
   */
  leaveOrganization(organizationId: string): Observable<void> {
    return this.http.delete(`/api/organizations/${organizationId}/leave`);
  }

  /**
   * 獲取用戶在組織中的角色
   */
  getUserRole(organizationId: string, userId: string): Observable<MemberRole> {
    return this.http.get(`/api/organizations/${organizationId}/members/${userId}/role`);
  }

  /**
   * 檢查用戶是否有特定權限
   */
  hasPermission(organizationId: string, permission: string): Observable<boolean> {
    return this.http.get(`/api/organizations/${organizationId}/permissions/${permission}`);
  }
}