import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { _HttpClient } from '@delon/theme';
import { 
  Organization, 
  OrganizationQueryParams, 
  OrganizationUpdateParams,
  OrganizationStats 
} from '../models/organization.model';

/**
 * 組織服務
 */
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private readonly http = inject(_HttpClient);

  /**
   * 獲取組織列表
   */
  getOrganizations(params?: OrganizationQueryParams): Observable<{ data: Organization[]; total: number }> {
    return this.http.get('/api/organizations', params);
  }

  /**
   * 根據ID獲取組織
   */
  getOrganization(id: string): Observable<Organization> {
    return this.http.get(`/api/organizations/${id}`);
  }

  /**
   * 創建組織
   */
  createOrganization(org: Partial<Organization>): Observable<Organization> {
    return this.http.post('/api/organizations', org);
  }

  /**
   * 更新組織
   */
  updateOrganization(id: string, params: OrganizationUpdateParams): Observable<Organization> {
    return this.http.put(`/api/organizations/${id}`, params);
  }

  /**
   * 刪除組織
   */
  deleteOrganization(id: string): Observable<void> {
    return this.http.delete(`/api/organizations/${id}`);
  }

  /**
   * 獲取組織統計信息
   */
  getOrganizationStats(id: string): Observable<OrganizationStats> {
    return this.http.get(`/api/organizations/${id}/stats`);
  }

  /**
   * 上傳組織頭像
   */
  uploadAvatar(id: string, file: File): Observable<{ avatarUrl: string }> {
    const formData = new FormData();
    formData.append('avatar', file);
    return this.http.post(`/api/organizations/${id}/avatar`, formData);
  }

  /**
   * 檢查組織名稱是否可用
   */
  checkNameAvailability(name: string): Observable<{ available: boolean }> {
    return this.http.get(`/api/organizations/check-name`, { name });
  }

  /**
   * 獲取組織的公開信息
   */
  getPublicOrganization(name: string): Observable<Organization> {
    return this.http.get(`/api/organizations/public/${name}`);
  }
}