import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { User, UserQueryParams, UserUpdateParams } from '../models/user.model';
import { Organization } from '../models/organization.model';

/**
 * 用戶服務
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(_HttpClient);

  /**
   * 獲取用戶列表
   */
  getUsers(params?: UserQueryParams): Observable<{ data: User[]; total: number }> {
    return this.http.get('/api/users', params);
  }

  /**
   * 根據ID獲取用戶
   */
  getUser(id: string): Observable<User> {
    return this.http.get(`/api/users/${id}`);
  }

  /**
   * 創建用戶
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post('/api/users', user);
  }

  /**
   * 更新用戶
   */
  updateUser(id: string, params: UserUpdateParams): Observable<User> {
    return this.http.put(`/api/users/${id}`, params);
  }

  /**
   * 刪除用戶
   */
  deleteUser(id: string): Observable<void> {
    return this.http.delete(`/api/users/${id}`);
  }

  /**
   * 獲取用戶關注者列表
   */
  getFollowers(id: string, page = 1, pageSize = 20): Observable<{ data: User[]; total: number }> {
    return this.http.get(`/api/users/${id}/followers`, { page, pageSize });
  }

  /**
   * 獲取用戶關注列表
   */
  getFollowing(id: string, page = 1, pageSize = 20): Observable<{ data: User[]; total: number }> {
    return this.http.get(`/api/users/${id}/following`, { page, pageSize });
  }

  /**
   * 關注用戶
   */
  followUser(id: string): Observable<void> {
    return this.http.post(`/api/users/${id}/follow`);
  }

  /**
   * 取消關注用戶
   */
  unfollowUser(id: string): Observable<void> {
    return this.http.delete(`/api/users/${id}/follow`);
  }

  /**
   * 檢查是否已關注用戶
   */
  isFollowing(id: string): Observable<boolean> {
    return this.http.get(`/api/users/${id}/follow-status`);
  }

  /**
   * 獲取用戶的組織列表
   */
  getUserOrganizations(id: string): Observable<Organization[]> {
    return this.http.get(`/api/users/${id}/organizations`);
  }

  /**
   * 上傳用戶頭像
   */
  uploadAvatar(id: string, file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`/api/users/${id}/avatar`, formData);
  }
}