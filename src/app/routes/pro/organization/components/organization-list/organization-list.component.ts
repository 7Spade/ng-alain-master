import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { Organization } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzCardModule,
    NzInputModule,
    NzIconModule,
    NzSpinModule,
    NzEmptyModule,
    NzPaginationModule,
    NzTagModule,
    NzAvatarModule,
    NzTooltipModule
  ],
  template: `
    <div class="organization-list">
      <!-- 頁面標題和操作區 -->
      <div class="list-header">
        <div class="header-content">
          <h2>組織管理</h2>
          <p class="description">管理和查看您參與的組織</p>
        </div>
        <button nz-button nzType="primary" (click)="createOrganization()">
          <i nz-icon nzType="plus"></i>
          創建組織
        </button>
      </div>

      <!-- 搜索和篩選 -->
      <div class="search-section">
        <nz-input-group [nzPrefix]="searchIcon" nzSize="large">
          <input
            nz-input
            [(ngModel)]="searchKeyword"
            placeholder="搜索組織名稱或描述..."
            (input)="onSearch()"
          />
          <ng-template #searchIcon>
            <i nz-icon nzType="search"></i>
          </ng-template>
        </nz-input-group>
      </div>

      <!-- 組織列表 -->
      <div class="list-content">
        @if (loading) {
          <div class="loading-container">
            <nz-spin nzSize="large" />
          </div>
        } @else if (organizations.length === 0) {
          <nz-empty
            nzNotFoundContent="暫無組織"
            nzNotFoundDescription="您還沒有創建或加入任何組織"
          >
            <button nz-button nzType="primary" (click)="createOrganization()">
              創建第一個組織
            </button>
          </nz-empty>
        } @else {
          <div class="organization-grid">
            @for (org of organizations; track org.id) {
              <nz-card
                class="organization-card"
                [nzHoverable]="true"
                (click)="viewOrganization(org.id)"
              >
                <div class="card-content">
                  <div class="org-header">
                    <nz-avatar
                      [nzSrc]="org.avatarUrl"
                      [nzText]="org.displayName || org.name"
                      nzSize="large"
                      class="org-avatar"
                    />
                    <div class="org-info">
                      <h3 class="org-name">{{ org.displayName || org.name }}</h3>
                      <p class="org-description">{{ org.description || '暫無描述' }}</p>
                    </div>
                    @if (org.isPublic) {
                      <nz-tag nzColor="green" class="public-tag">
                        <i nz-icon nzType="global"></i>
                        公開
                      </nz-tag>
                    } @else {
                      <nz-tag nzColor="orange" class="private-tag">
                        <i nz-icon nzType="lock"></i>
                        私有
                      </nz-tag>
                    }
                  </div>
                  
                  <div class="org-stats">
                    <div class="stat-item">
                      <span class="stat-number">{{ org.membersCount }}</span>
                      <span class="stat-label">成員</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-number">{{ org.repositoriesCount }}</span>
                      <span class="stat-label">倉庫</span>
                    </div>
                    <div class="stat-item">
                      <span class="stat-label">創建於</span>
                      <span class="stat-date">{{ org.createdAt | date:'yyyy-MM-dd' }}</span>
                    </div>
                  </div>
                </div>
              </nz-card>
            }
          </div>

          <!-- 分頁 -->
          @if (total > pageSize) {
            <div class="pagination-container">
              <nz-pagination
                [(nzPageIndex)]="currentPage"
                [nzTotal]="total"
                [nzPageSize]="pageSize"
                [nzShowSizeChanger]="true"
                [nzPageSizeOptions]="[10, 20, 50, 100]"
                (nzPageIndexChange)="onPageChange()"
                (nzPageSizeChange)="onPageSizeChange()"
              />
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    .organization-list {
      padding: 24px;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;
    }

    .header-content h2 {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
    }

    .description {
      margin: 0;
      color: #666;
      font-size: 14px;
    }

    .search-section {
      margin-bottom: 24px;
    }

    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }

    .organization-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .organization-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .organization-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .card-content {
      padding: 16px;
    }

    .org-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
    }

    .org-avatar {
      margin-right: 12px;
    }

    .org-info {
      flex: 1;
    }

    .org-name {
      margin: 0 0 4px 0;
      font-size: 16px;
      font-weight: 600;
    }

    .org-description {
      margin: 0;
      color: #666;
      font-size: 14px;
      line-height: 1.4;
    }

    .public-tag, .private-tag {
      margin-left: auto;
    }

    .org-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .stat-number {
      font-size: 18px;
      font-weight: 600;
      color: #1890ff;
    }

    .stat-label {
      font-size: 12px;
      color: #666;
      margin-top: 2px;
    }

    .stat-date {
      font-size: 12px;
      color: #999;
    }

    .pagination-container {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }

    @media (max-width: 768px) {
      .organization-grid {
        grid-template-columns: 1fr;
      }
      
      .list-header {
        flex-direction: column;
        gap: 16px;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationListComponent implements OnInit {
  private readonly http = inject(_HttpClient);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly organizationService = inject(OrganizationService);

  organizations: Organization[] = [];
  loading = false;
  searchKeyword = '';
  currentPage = 1;
  pageSize = 20;
  total = 0;

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.loading = true;
    this.cdr.detectChanges();

    this.organizationService.getOrganizations({
      page: this.currentPage,
      pageSize: this.pageSize,
      search: this.searchKeyword || undefined
    }).subscribe({
      next: (result) => {
        this.organizations = result.data;
        this.total = result.total;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('載入組織列表失敗:', error);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadOrganizations();
  }

  onPageChange(): void {
    this.loadOrganizations();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.loadOrganizations();
  }

  createOrganization(): void {
    this.router.navigate(['/pro/organization/create']);
  }

  viewOrganization(id: string): void {
    this.router.navigate(['/pro/organization', id]);
  }
}