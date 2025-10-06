import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SettingsService, User } from '@delon/theme';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Organization } from '../../../routes/pro/organization/models/organization.model';
import { OrganizationService } from '../../../routes/pro/organization/services/organization.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'organization-switcher',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    NzAvatarModule,
    NzButtonModule,
    NzDropDownModule,
    NzIconModule,
    NzMenuModule,
    NzSpinModule,
    NzDividerModule
  ],
  template: `
    <div class="organization-switcher">
      <!-- 當前選擇的組織/用戶 -->
      <div 
        class="current-entity" 
        nz-dropdown 
        nzTrigger="click" 
        [nzDropdownMenu]="entityMenu"
        nzPlacement="bottomLeft"
      >
        <div class="entity-info">
          <nz-avatar 
            [nzSrc]="currentEntity?.avatarUrl" 
            [nzText]="currentEntity?.displayName || currentEntity?.name || user.name"
            nzSize="small"
            class="entity-avatar"
          />
          <div class="entity-details">
            <div class="entity-name">{{ currentEntity?.displayName || currentEntity?.name || user.name }}</div>
            <div class="entity-type">{{ getEntityType() }}</div>
          </div>
          <i nz-icon nzType="down" class="dropdown-icon"></i>
        </div>
      </div>

      <!-- 下拉選單 -->
      <nz-dropdown-menu #entityMenu="nzDropdownMenu">
        <div class="organization-dropdown">
          <!-- 用戶個人檔案 -->
          <div class="dropdown-section">
            <div class="section-title">個人檔案</div>
            <div 
              class="entity-item" 
              [class.active]="!currentEntity"
              (click)="selectEntity(null)"
            >
              <nz-avatar 
                [nzSrc]="user.avatar" 
                [nzText]="user.name"
                nzSize="small"
                class="item-avatar"
              />
              <div class="item-info">
                <div class="item-name">{{ user.name }}</div>
                <div class="item-desc">個人檔案</div>
              </div>
              <i nz-icon nzType="check" class="check-icon" *ngIf="!currentEntity"></i>
            </div>
          </div>

          <!-- 組織列表 -->
          <div class="dropdown-section" *ngIf="organizations.length > 0">
            <div class="section-title">組織</div>
            @if (loading) {
              <div class="loading-item">
                <nz-spin nzSize="small" />
                <span class="ml-sm">載入中...</span>
              </div>
            } @else {
              @for (org of organizations; track org.id) {
                <div 
                  class="entity-item" 
                  [class.active]="currentEntity?.id === org.id"
                  (click)="selectEntity(org)"
                >
                  <nz-avatar 
                    [nzSrc]="org.avatarUrl" 
                    [nzText]="org.displayName || org.name"
                    nzSize="small"
                    class="item-avatar"
                  />
                  <div class="item-info">
                    <div class="item-name">{{ org.displayName || org.name }}</div>
                    <div class="item-desc">{{ org.description || '暫無描述' }}</div>
                  </div>
                  <i nz-icon nzType="check" class="check-icon" *ngIf="currentEntity?.id === org.id"></i>
                </div>
              }
            }
          </div>

          <!-- 操作按鈕 -->
          <nz-divider class="dropdown-divider"></nz-divider>
          <div class="dropdown-actions">
            <button 
              nz-button 
              nzType="text" 
              nzBlock 
              class="action-button"
              routerLink="/pro/organization"
            >
              <i nz-icon nzType="apartment" class="mr-sm"></i>
              管理組織
            </button>
            <button 
              nz-button 
              nzType="primary" 
              nzBlock 
              class="action-button"
              routerLink="/pro/organization/create"
            >
              <i nz-icon nzType="plus" class="mr-sm"></i>
              建立組織
            </button>
          </div>
        </div>
      </nz-dropdown-menu>
    </div>
  `,
  styles: [`
    .organization-switcher {
      width: 100%;
    }

    .current-entity {
      width: 100%;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .current-entity:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    .entity-info {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      gap: 12px;
    }

    .entity-avatar {
      flex-shrink: 0;
    }

    .entity-details {
      flex: 1;
      min-width: 0;
    }

    .entity-name {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .entity-type {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.7);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown-icon {
      color: rgba(255, 255, 255, 0.7);
      font-size: 12px;
      transition: transform 0.3s ease;
    }

    .organization-dropdown {
      width: 280px;
      max-height: 400px;
      overflow-y: auto;
    }

    .dropdown-section {
      padding: 8px 0;
    }

    .section-title {
      font-size: 12px;
      font-weight: 600;
      color: #8c8c8c;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 8px 16px 4px;
    }

    .entity-item {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      cursor: pointer;
      transition: background-color 0.3s ease;
      gap: 12px;
      position: relative;
    }

    .entity-item:hover {
      background-color: #f5f5f5;
    }

    .entity-item.active {
      background-color: #e6f7ff;
    }

    .item-avatar {
      flex-shrink: 0;
    }

    .item-info {
      flex: 1;
      min-width: 0;
    }

    .item-name {
      font-size: 14px;
      font-weight: 500;
      color: #262626;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item-desc {
      font-size: 12px;
      color: #8c8c8c;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .check-icon {
      color: #1890ff;
      font-size: 14px;
    }

    .loading-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      color: #8c8c8c;
      font-size: 14px;
    }

    .dropdown-divider {
      margin: 8px 0;
    }

    .dropdown-actions {
      padding: 8px 16px 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .action-button {
      height: 36px;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .action-button i {
      font-size: 14px;
    }

    /* 響應式設計 */
    @media (max-width: 768px) {
      .entity-name,
      .entity-type {
        display: none;
      }

      .entity-info {
        justify-content: center;
        padding: 12px 8px;
      }

      .dropdown-icon {
        display: none;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationSwitcherComponent implements OnInit {
  private readonly settings = inject(SettingsService);
  private readonly router = inject(Router);
  private readonly organizationService = inject(OrganizationService);

  organizations: Organization[] = [];
  currentEntity: Organization | null = null;
  loading = false;

  get user(): User {
    return this.settings.user;
  }

  ngOnInit(): void {
    this.loadOrganizations();
    this.loadCurrentEntity();
  }

  loadOrganizations(): void {
    this.loading = true;
    this.organizationService.getOrganizations({ pageSize: 20 }).subscribe({
      next: (result) => {
        this.organizations = result.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('載入組織列表失敗:', error);
        this.loading = false;
      }
    });
  }

  loadCurrentEntity(): void {
    // 從 URL 或本地存儲中獲取當前選擇的組織
    const currentUrl = this.router.url;
    const orgMatch = currentUrl.match(/\/pro\/organization\/([^\/]+)/);
    
    if (orgMatch) {
      const orgId = orgMatch[1];
      if (orgId !== 'create' && orgId !== 'list') {
        this.organizationService.getOrganization(orgId).subscribe({
          next: (org) => {
            this.currentEntity = org;
          },
          error: (error) => {
            console.error('載入組織信息失敗:', error);
            this.currentEntity = null;
          }
        });
      }
    }
  }

  selectEntity(entity: Organization | null): void {
    this.currentEntity = entity;
    
    if (entity) {
      // 導航到組織頁面
      this.router.navigate(['/pro/organization', entity.id]);
    } else {
      // 導航到個人檔案或首頁
      this.router.navigate(['/pro/account/center']);
    }
  }

  getEntityType(): string {
    if (this.currentEntity) {
      return '組織';
    }
    return '個人';
  }
}