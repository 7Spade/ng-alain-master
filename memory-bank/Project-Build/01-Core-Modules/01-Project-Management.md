# 1️⃣ 專案管理模組

## 📋 模組概述

專案管理模組是整個 Project-Build 系統的核心基礎，類似 GitHub 儲存庫的概念，但專注於建築工程專案管理。此模組提供專案的完整生命週期管理，包括創建、設置、成員管理、權限控制等功能。

### 🎯 功能目標
- 提供完整的專案生命週期管理
- 支持多種專案類型和設置
- 實現專案級別的權限和成員管理
- 提供專案級別的統計和監控
- 支持個人用戶和組織用戶創建專案

## 🏗️ 功能架構

### 核心功能
```
專案管理模組
├── 專案創建與設置
│   ├── 專案基本信息設置
│   ├── 專案類型選擇
│   ├── 專案設置配置
│   └── 專案初始化流程
├── 專案信息管理
│   ├── 基本信息維護
│   ├── 專案頭像管理
│   ├── 專案描述編輯
│   └── 專案可見性設置
├── 專案設置管理
│   ├── BIM 設置配置
│   ├── 成本管理設置
│   ├── 工作流設置
│   └── 通知設置
├── 專案成員管理
│   ├── 成員邀請系統
│   ├── 角色權限分配
│   ├── 成員活動監控
│   └── 外部協作者管理
└── 專案統計監控
    ├── 專案進度統計
    ├── 成本使用情況
    ├── 團隊活動監控
    └── 資源使用情況
```

## 📊 數據結構設計

### 專案實體 (Project)
```typescript
interface Project {
  id: string;                    // 專案唯一標識
  name: string;                  // 專案名稱
  slug: string;                  // URL 友好的專案標識
  description?: string;          // 專案描述
  avatar?: string;               // 專案頭像 URL
  type: ProjectType;            // 專案類型
  status: ProjectStatus;        // 專案狀態
  visibility: ProjectVisibility; // 專案可見性
  settings: ProjectSettings;     // 專案設置
  statistics: ProjectStats;      // 統計數據
  timeline: ProjectTimeline;     // 時程信息
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
  organizationId?: string;      // 所屬組織 ID
}

enum ProjectType {
  CONSTRUCTION = 'construction',     // 建築工程
  INFRASTRUCTURE = 'infrastructure', // 基礎設施
  MANUFACTURING = 'manufacturing',   // 製造業
  RENOVATION = 'renovation',         // 翻新工程
  MAINTENANCE = 'maintenance'         // 維護工程
}

enum ProjectStatus {
  PLANNING = 'planning',         // 規劃中
  ACTIVE = 'active',            // 進行中
  ON_HOLD = 'on_hold',          // 暫停
  COMPLETED = 'completed',       // 已完成
  CANCELLED = 'cancelled'        // 已取消
}

enum ProjectVisibility {
  PUBLIC = 'public',            // 公開專案
  PRIVATE = 'private',          // 私有專案
  ORGANIZATION = 'organization' // 組織內可見
}

interface ProjectSettings {
  bim: BIMSettings;             // BIM 設置
  cost: CostSettings;           // 成本設置
  workflow: WorkflowSettings;   // 工作流設置
  notifications: NotificationSettings; // 通知設置
  security: SecuritySettings;   // 安全設置
  integrations: IntegrationSettings; // 整合設置
}

interface BIMSettings {
  enabled: boolean;             // 啟用 BIM
  defaultModelFormat: string;   // 默認模型格式
  maxFileSize: number;          // 最大檔案大小
  supportedFormats: string[];   // 支援格式
  viewerSettings: ViewerSettings; // 查看器設置
}

interface CostSettings {
  enabled: boolean;             // 啟用成本管理
  currency: string;             // 貨幣單位
  budgetTracking: boolean;      // 預算追蹤
  costCategories: CostCategory[]; // 成本分類
  approvalWorkflow: boolean;    // 審批工作流
}

interface WorkflowSettings {
  taskManagement: boolean;      // 任務管理
  approvalRequired: boolean;    // 需要審批
  autoAssignment: boolean;      // 自動分配
  notificationRules: NotificationRule[]; // 通知規則
}

interface ProjectStats {
  memberCount: number;          // 成員數量
  taskCount: number;            // 任務數量
  completedTasks: number;       // 已完成任務
  bimModelCount: number;        // BIM 模型數量
  documentCount: number;        // 文檔數量
  totalCost: number;            // 總成本
  budgetUsed: number;           // 已使用預算
  progressPercentage: number;   // 進度百分比
  lastActivityAt: Date;         // 最後活動時間
}

interface ProjectTimeline {
  startDate: Date;             // 開始日期
  endDate: Date;               // 結束日期
  milestones: Milestone[];      // 里程碑
  phases: ProjectPhase[];      // 專案階段
}
```

### 專案成員關係 (ProjectMember)
```typescript
interface ProjectMember {
  id: string;                   // 成員關係 ID
  projectId: string;             // 專案 ID
  userId: string;                // 用戶 ID
  role: ProjectRole;             // 專案角色
  permissions: ProjectPermission[]; // 具體權限
  status: MemberStatus;          // 成員狀態
  joinedAt: Date;               // 加入時間
  invitedBy: string;             // 邀請者 ID
  lastActiveAt: Date;            // 最後活躍時間
  settings: MemberSettings;      // 成員設置
}

enum ProjectRole {
  OWNER = 'owner',             // 專案所有者
  ADMIN = 'admin',             // 專案管理員
  MANAGER = 'manager',         // 專案經理
  ENGINEER = 'engineer',       // 工程師
  CONTRACTOR = 'contractor',   // 承包商
  VIEWER = 'viewer',           // 查看者
  OUTSIDE_COLLABORATOR = 'outside_collaborator' // 外部協作者
}

enum MemberStatus {
  ACTIVE = 'active',           // 活躍
  PENDING = 'pending',         // 待審核
  SUSPENDED = 'suspended',     // 暫停
  BLOCKED = 'blocked'          // 封鎖
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 專案管理主組件 - 使用 Angular 20 現代化語法
@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTabsModule,
    ProjectListComponent,
    MyProjectsComponent,
    OrganizationProjectsComponent
  ],
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>專案管理</nz-card-title>
        <nz-card-extra>
          <button nz-button nzType="primary" (click)="createProject()">
            <i nz-icon nzType="plus"></i>
            創建專案
          </button>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="專案列表">
            <app-project-list></app-project-list>
          </nz-tab>
          <nz-tab nzTitle="我的專案">
            <app-my-projects></app-my-projects>
          </nz-tab>
          <nz-tab nzTitle="組織專案">
            <app-organization-projects></app-organization-projects>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectManagementComponent implements OnInit {
  private projectService = inject(ProjectService);
  private modal = inject(NzModalService);
  
  ngOnInit() {
    this.projectService.loadUserProjects();
  }
  
  createProject() {
    this.modal.create({
      nzTitle: '創建專案',
      nzContent: AppCreateProjectModalComponent,
      nzFooter: null,
      nzWidth: 800
    });
  }
}

// 專案列表組件
@Component({
  selector: 'app-project-list',
  template: `
    <nz-table 
      [nzData]="projects$ | async" 
      [nzLoading]="loading$ | async"
      [nzPageSize]="20"
      [nzShowPagination]="true">
      
      <thead>
        <tr>
          <th>專案</th>
          <th>類型</th>
          <th>狀態</th>
          <th>進度</th>
          <th>成員</th>
          <th>最後更新</th>
          <th>操作</th>
        </tr>
      </thead>
      
      <tbody>
        <tr *ngFor="let project of projects$ | async">
          <td>
            <div class="project-info">
              <nz-avatar [nzSrc]="project.avatar" [nzSize]="32"></nz-avatar>
              <div class="project-details">
                <div class="project-name">{{ project.name }}</div>
                <div class="project-description">{{ project.description }}</div>
              </div>
            </div>
          </td>
          <td>
            <nz-tag [nzColor]="getProjectTypeColor(project.type)">
              {{ project.type | projectTypeLabel }}
            </nz-tag>
          </td>
          <td>
            <nz-badge 
              [nzStatus]="getStatusType(project.status)" 
              [nzText]="project.status | statusLabel">
            </nz-badge>
          </td>
          <td>
            <nz-progress 
              [nzPercent]="project.statistics.progressPercentage" 
              [nzSize]="'small'">
            </nz-progress>
          </td>
          <td>{{ project.statistics.memberCount }}</td>
          <td>{{ project.updatedAt | date:'short' }}</td>
          <td>
            <nz-button-group>
              <button nz-button nzSize="small" (click)="viewProject(project)">
                查看
              </button>
              <button nz-button nzSize="small" (click)="editProject(project)">
                編輯
              </button>
              <button nz-button nzSize="small" nzDanger (click)="deleteProject(project)">
                刪除
              </button>
            </nz-button-group>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [`
    .project-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .project-details {
      display: flex;
      flex-direction: column;
    }
    
    .project-name {
      font-weight: 500;
    }
    
    .project-description {
      color: #666;
      font-size: 12px;
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects$ = this.projectService.projects$;
  loading$ = this.projectService.loading$;
  
  constructor(
    private projectService: ProjectService,
    private modal: NzModalService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.projectService.loadProjects();
  }
  
  viewProject(project: Project) {
    this.router.navigate(['/project-build', project.slug]);
  }
  
  editProject(project: Project) {
    this.modal.create({
      nzTitle: '編輯專案',
      nzContent: AppEditProjectModalComponent,
      nzComponentParams: { project },
      nzFooter: null,
      nzWidth: 800
    });
  }
  
  deleteProject(project: Project) {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除專案 ${project.name} 嗎？`,
      nzOkText: '刪除',
      nzOkType: 'danger',
      nzCancelText: '取消',
      nzOnOk: () => this.projectService.deleteProject(project.id)
    });
  }
  
  getProjectTypeColor(type: ProjectType): string {
    const colors = {
      [ProjectType.CONSTRUCTION]: 'blue',
      [ProjectType.INFRASTRUCTURE]: 'green',
      [ProjectType.MANUFACTURING]: 'orange',
      [ProjectType.RENOVATION]: 'purple',
      [ProjectType.MAINTENANCE]: 'cyan'
    };
    return colors[type] || 'default';
  }
  
  getStatusType(status: ProjectStatus): 'success' | 'warning' | 'error' | 'default' {
    const types = {
      [ProjectStatus.ACTIVE]: 'success',
      [ProjectStatus.PLANNING]: 'warning',
      [ProjectStatus.ON_HOLD]: 'error',
      [ProjectStatus.COMPLETED]: 'success',
      [ProjectStatus.CANCELLED]: 'error'
    };
    return types[status] || 'default';
  }
}
```

### 專案卡片組件實現
```typescript
// 專案卡片組件 - 使用 Angular 20 現代化語法
@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzAvatarModule,
    NzToolTipModule,
    NzDropdownModule,
    NzProgressModule,
    ProjectStatusPipe,
    ProjectDatePipe
  ],
  template: `
    <nz-card 
      [nzHoverable]="true" 
      [nzLoading]="loading"
      class="project-card"
      (click)="onCardClick()">
      <nz-card-header>
        <nz-card-title>
          <nz-avatar 
            [nzSrc]="project.avatar" 
            [nzText]="project.name.charAt(0)"
            nzSize="small">
          </nz-avatar>
          <span class="project-name">{{ project.name }}</span>
        </nz-card-title>
        <nz-card-extra>
          <nz-dropdown [nzTrigger]="'click'">
            <button nz-button nzType="text" nzSize="small">
              <i nz-icon nzType="more"></i>
            </button>
            <ul nz-menu>
              <li nz-menu-item (click)="editProject()">
                <i nz-icon nzType="edit"></i>
                編輯專案
              </li>
              <li nz-menu-item (click)="duplicateProject()">
                <i nz-icon nzType="copy"></i>
                複製專案
              </li>
              <li nz-menu-item nzDanger (click)="deleteProject()">
                <i nz-icon nzType="delete"></i>
                刪除專案
              </li>
            </ul>
          </nz-dropdown>
        </nz-card-extra>
      </nz-card-header>
      
      <nz-card-content>
        <div class="project-description">
          {{ project.description || '暫無描述' }}
        </div>
        
        <div class="project-meta">
          <div class="meta-item">
            <i nz-icon nzType="team"></i>
            <span>{{ project.memberCount || 0 }} 成員</span>
          </div>
          <div class="meta-item">
            <i nz-icon nzType="calendar"></i>
            <span>{{ project.createdAt | projectDate }}</span>
          </div>
        </div>
        
        <div class="project-status">
          <nz-tag [nzColor]="getStatusColor(project.status)">
            {{ project.status | projectStatus }}
          </nz-tag>
          <nz-tag [nzColor]="getTypeColor(project.type)">
            {{ project.type }}
          </nz-tag>
        </div>
        
        <div class="project-progress" *ngIf="project.progress">
          <div class="progress-label">
            <span>進度</span>
            <span>{{ project.progress }}%</span>
          </div>
          <nz-progress 
            [nzPercent]="project.progress" 
            [nzSize]="'small'"
            [nzStatus]="getProgressStatus(project.progress)">
          </nz-progress>
        </div>
      </nz-card-content>
      
      <nz-card-actions>
        <button nz-button nzType="primary" nzSize="small" (click)="openProject()">
          <i nz-icon nzType="eye"></i>
          查看
        </button>
        <button nz-button nzSize="small" (click)="shareProject()">
          <i nz-icon nzType="share-alt"></i>
          分享
        </button>
      </nz-card-actions>
    </nz-card>
  `,
  styles: [`
    .project-card {
      margin-bottom: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .project-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .project-name {
      margin-left: 8px;
      font-weight: 500;
    }
    
    .project-description {
      color: #666;
      font-size: 14px;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .project-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 12px;
    }
    
    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #999;
      font-size: 12px;
    }
    
    .project-status {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .project-progress {
      margin-bottom: 12px;
    }
    
    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;
      font-size: 12px;
      color: #666;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCardComponent implements OnInit {
  @Input() project!: Project;
  @Input() loading = false;
  @Output() cardClick = new EventEmitter<Project>();
  @Output() editClick = new EventEmitter<Project>();
  @Output() deleteClick = new EventEmitter<Project>();
  @Output() duplicateClick = new EventEmitter<Project>();
  @Output() shareClick = new EventEmitter<Project>();
  
  private modal = inject(NzModalService);
  private message = inject(NzMessageService);
  
  ngOnInit() {
    // 組件初始化
  }
  
  onCardClick() {
    this.cardClick.emit(this.project);
  }
  
  editProject() {
    this.editClick.emit(this.project);
  }
  
  deleteProject() {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除專案「${this.project.name}」嗎？此操作無法撤銷。`,
      nzOkText: '刪除',
      nzOkType: 'danger',
      nzCancelText: '取消',
      nzOnOk: () => {
        this.deleteClick.emit(this.project);
        this.message.success('專案已刪除');
      }
    });
  }
  
  duplicateProject() {
    this.duplicateClick.emit(this.project);
    this.message.success('專案已複製');
  }
  
  shareProject() {
    this.shareClick.emit(this.project);
  }
  
  openProject() {
    this.cardClick.emit(this.project);
  }
  
  getStatusColor(status: ProjectStatus): string {
    const colorMap: Record<ProjectStatus, string> = {
      [ProjectStatus.PLANNING]: 'blue',
      [ProjectStatus.ACTIVE]: 'green',
      [ProjectStatus.ON_HOLD]: 'orange',
      [ProjectStatus.COMPLETED]: 'purple',
      [ProjectStatus.CANCELLED]: 'red'
    };
    return colorMap[status] || 'default';
  }
  
  getTypeColor(type: ProjectType): string {
    const colorMap: Record<ProjectType, string> = {
      [ProjectType.CONSTRUCTION]: 'blue',
      [ProjectType.RENOVATION]: 'green',
      [ProjectType.DESIGN]: 'purple',
      [ProjectType.MAINTENANCE]: 'orange'
    };
    return colorMap[type] || 'default';
  }
  
  getProgressStatus(progress: number): 'success' | 'exception' | 'active' | 'normal' {
    if (progress >= 100) return 'success';
    if (progress >= 80) return 'active';
    if (progress >= 50) return 'normal';
    return 'exception';
  }
}
```

### 專案表單組件實現
```typescript
// 專案表單組件 - 使用 Angular 20 響應式表單
@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzUploadModule,
    NzButtonModule,
    NzIconModule,
    NzCardModule,
    NzDividerModule,
    NzCheckboxModule
  ],
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>
          {{ isEdit ? '編輯專案' : '創建專案' }}
        </nz-card-title>
      </nz-card-header>
      
      <nz-card-content>
        <form nz-form 
              [formGroup]="projectForm" 
              (ngSubmit)="onSubmit()"
              nzLayout="vertical">
          
          <!-- 基本信息 -->
          <div class="form-section">
            <h4>基本信息</h4>
            <nz-form-item>
              <nz-form-label nzRequired>專案名稱</nz-form-label>
              <nz-form-control nzErrorTip="請輸入專案名稱">
                <input nz-input 
                       formControlName="name" 
                       placeholder="請輸入專案名稱"
                       maxlength="100">
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>專案描述</nz-form-label>
              <nz-form-control>
                <textarea nz-input 
                          formControlName="description" 
                          placeholder="請輸入專案描述"
                          [nzAutosize]="{ minRows: 3, maxRows: 6 }">
                </textarea>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label nzRequired>專案類型</nz-form-label>
              <nz-form-control nzErrorTip="請選擇專案類型">
                <nz-select formControlName="type" placeholder="請選擇專案類型">
                  <nz-option 
                    *ngFor="let type of projectTypes" 
                    [nzValue]="type.value" 
                    [nzLabel]="type.label">
                  </nz-option>
                </nz-select>
              </nz-form-control>
            </nz-form-item>
          </div>
          
          <nz-divider></nz-divider>
          
          <!-- 專案設置 -->
          <div class="form-section">
            <h4>專案設置</h4>
            
            <nz-form-item>
              <nz-form-label>專案頭像</nz-form-label>
              <nz-form-control>
                <nz-upload
                  nzAction="/api/upload/avatar"
                  nzListType="picture-card"
                  [nzShowUploadList]="false"
                  (nzChange)="onAvatarChange($event)">
                  <div class="upload-area">
                    <i nz-icon nzType="plus"></i>
                    <div class="upload-text">上傳頭像</div>
                  </div>
                </nz-upload>
                <div class="avatar-preview" *ngIf="avatarUrl">
                  <img [src]="avatarUrl" alt="專案頭像">
                </div>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>專案可見性</nz-form-label>
              <nz-form-control>
                <nz-select formControlName="visibility" placeholder="請選擇可見性">
                  <nz-option 
                    *ngFor="let visibility of visibilityOptions" 
                    [nzValue]="visibility.value" 
                    [nzLabel]="visibility.label">
                  </nz-option>
                </nz-select>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>開始日期</nz-form-label>
              <nz-form-control>
                <nz-date-picker 
                  formControlName="startDate" 
                  placeholder="請選擇開始日期"
                  [nzFormat]="'YYYY-MM-DD'">
                </nz-date-picker>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>結束日期</nz-form-label>
              <nz-form-control>
                <nz-date-picker 
                  formControlName="endDate" 
                  placeholder="請選擇結束日期"
                  [nzFormat]="'YYYY-MM-DD'">
                </nz-date-picker>
              </nz-form-control>
            </nz-form-item>
          </div>
          
          <nz-divider></nz-divider>
          
          <!-- 高級設置 -->
          <div class="form-section">
            <h4>高級設置</h4>
            
            <nz-form-item>
              <nz-form-label>專案設置</nz-form-label>
              <nz-form-control>
                <div class="settings-group">
                  <label nz-checkbox formControlName="enableNotifications">
                    啟用通知
                  </label>
                  <label nz-checkbox formControlName="enableTimeTracking">
                    啟用時間追蹤
                  </label>
                  <label nz-checkbox formControlName="enableBudgetTracking">
                    啟用預算追蹤
                  </label>
                </div>
              </nz-form-control>
            </nz-form-item>
          </div>
        </form>
      </nz-card-content>
      
      <nz-card-actions>
        <button nz-button nzType="primary" 
                [nzLoading]="submitting"
                (click)="onSubmit()"
                [disabled]="!projectForm.valid">
          {{ isEdit ? '更新專案' : '創建專案' }}
        </button>
        <button nz-button (click)="onCancel()">
          取消
        </button>
      </nz-card-actions>
    </nz-card>
  `,
  styles: [`
    .form-section {
      margin-bottom: 24px;
    }
    
    .form-section h4 {
      margin-bottom: 16px;
      color: #1890ff;
      font-weight: 500;
    }
    
    .upload-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100px;
      height: 100px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      transition: border-color 0.3s;
    }
    
    .upload-area:hover {
      border-color: #1890ff;
    }
    
    .upload-text {
      margin-top: 8px;
      color: #666;
      font-size: 12px;
    }
    
    .avatar-preview {
      margin-top: 8px;
    }
    
    .avatar-preview img {
      width: 100px;
      height: 100px;
      border-radius: 6px;
      object-fit: cover;
    }
    
    .settings-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectFormComponent implements OnInit {
  @Input() project?: Project;
  @Input() isEdit = false;
  @Output() formSubmit = new EventEmitter<ProjectFormData>();
  @Output() formCancel = new EventEmitter<void>();
  
  projectForm!: FormGroup;
  submitting = false;
  avatarUrl = '';
  
  projectTypes = [
    { value: ProjectType.CONSTRUCTION, label: '建築工程' },
    { value: ProjectType.RENOVATION, label: '裝修工程' },
    { value: ProjectType.DESIGN, label: '設計專案' },
    { value: ProjectType.MAINTENANCE, label: '維護專案' }
  ];
  
  visibilityOptions = [
    { value: ProjectVisibility.PRIVATE, label: '私有' },
    { value: ProjectVisibility.TEAM, label: '團隊' },
    { value: ProjectVisibility.ORGANIZATION, label: '組織' },
    { value: ProjectVisibility.PUBLIC, label: '公開' }
  ];
  
  private fb = inject(FormBuilder);
  private projectService = inject(ProjectService);
  
  ngOnInit() {
    this.initForm();
    if (this.project) {
      this.populateForm();
    }
  }
  
  private initForm() {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.maxLength(500)]],
      type: ['', [Validators.required]],
      avatar: [''],
      visibility: [ProjectVisibility.PRIVATE],
      startDate: [null],
      endDate: [null],
      enableNotifications: [true],
      enableTimeTracking: [false],
      enableBudgetTracking: [false]
    });
  }
  
  private populateForm() {
    if (this.project) {
      this.projectForm.patchValue({
        name: this.project.name,
        description: this.project.description,
        type: this.project.type,
        avatar: this.project.avatar,
        visibility: this.project.visibility,
        startDate: this.project.startDate ? new Date(this.project.startDate) : null,
        endDate: this.project.endDate ? new Date(this.project.endDate) : null,
        enableNotifications: this.project.settings?.enableNotifications ?? true,
        enableTimeTracking: this.project.settings?.enableTimeTracking ?? false,
        enableBudgetTracking: this.project.settings?.enableBudgetTracking ?? false
      });
      this.avatarUrl = this.project.avatar || '';
    }
  }
  
  onAvatarChange(info: NzUploadChangeParam) {
    if (info.file.status === 'done') {
      this.avatarUrl = info.file.response.url;
      this.projectForm.patchValue({ avatar: this.avatarUrl });
    }
  }
  
  onSubmit() {
    if (this.projectForm.valid) {
      this.submitting = true;
      const formData: ProjectFormData = {
        ...this.projectForm.value,
        startDate: this.projectForm.value.startDate?.toISOString(),
        endDate: this.projectForm.value.endDate?.toISOString(),
        settings: {
          enableNotifications: this.projectForm.value.enableNotifications,
          enableTimeTracking: this.projectForm.value.enableTimeTracking,
          enableBudgetTracking: this.projectForm.value.enableBudgetTracking
        }
      };
      
      this.formSubmit.emit(formData);
    } else {
      this.markFormGroupTouched();
    }
  }
  
  onCancel() {
    this.formCancel.emit();
  }
  
  private markFormGroupTouched() {
    Object.keys(this.projectForm.controls).forEach(key => {
      const control = this.projectForm.get(key);
      control?.markAsTouched();
    });
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly apiUrl = '/api/projects';
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private currentProjectSubject = new BehaviorSubject<Project | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  projects$ = this.projectsSubject.asObservable();
  currentProject$ = this.currentProjectSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  // 創建專案 - 使用 Firebase Firestore
  createProject(projectData: CreateProjectRequest): Observable<Project> {
    const projectRef = collection(this.firestore, 'projects');
    const newProject: Project = {
      id: '',
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this.authService.getCurrentUser()?.uid || ''
    };
    
    return from(addDoc(projectRef, newProject)).pipe(
      map(docRef => ({ ...newProject, id: docRef.id })),
      tap(project => {
        const currentProjects = this.projectsSubject.value;
        this.projectsSubject.next([...currentProjects, project]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 獲取專案列表 - 使用 Firestore 實時查詢
  loadProjects(): void {
    this.loadingSubject.next(true);
    const projectsRef = collection(this.firestore, 'projects');
    const q = query(projectsRef, orderBy('updatedAt', 'desc'));
    
    onSnapshot(q, (snapshot) => {
      const projects = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Project));
      this.projectsSubject.next(projects);
      this.loadingSubject.next(false);
    }, (error) => {
      console.error('Error loading projects:', error);
      this.loadingSubject.next(false);
    });
  }
  
  // 獲取專案詳情
  getProject(projectId: string): Observable<Project> {
    const projectRef = doc(this.firestore, 'projects', projectId);
    return from(getDoc(projectRef)).pipe(
      map(doc => ({ id: doc.id, ...doc.data() } as Project)),
      tap(project => this.currentProjectSubject.next(project)),
      catchError(this.handleError)
    );
  }
  
  // 更新專案
  updateProject(projectId: string, updates: Partial<Project>): Observable<Project> {
    const projectRef = doc(this.firestore, 'projects', projectId);
    const updateData = { ...updates, updatedAt: new Date() };
    
    return from(updateDoc(projectRef, updateData)).pipe(
      map(() => ({ id: projectId, ...updates } as Project)),
      tap(updatedProject => {
        const projects = this.projectsSubject.value;
        const index = projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
          projects[index] = { ...projects[index], ...updatedProject };
          this.projectsSubject.next([...projects]);
        }
        this.currentProjectSubject.next(updatedProject);
      }),
      catchError(this.handleError)
    );
  }
  
  // 刪除專案
  deleteProject(projectId: string): Observable<void> {
    const projectRef = doc(this.firestore, 'projects', projectId);
    return from(deleteDoc(projectRef)).pipe(
      tap(() => {
        const projects = this.projectsSubject.value;
        const filteredProjects = projects.filter(p => p.id !== projectId);
        this.projectsSubject.next(filteredProjects);
      }),
      catchError(this.handleError)
    );
  }
  
  // 獲取專案成員
  getProjectMembers(projectId: string): Observable<ProjectMember[]> {
    const membersRef = collection(this.firestore, 'projects', projectId, 'members');
    return from(getDocs(membersRef)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ProjectMember))),
      catchError(this.handleError)
    );
  }
  
  // 邀請成員
  inviteMember(projectId: string, invitationData: InviteMemberRequest): Observable<ProjectMember> {
    const membersRef = collection(this.firestore, 'projects', projectId, 'members');
    const newMember: ProjectMember = {
      id: '',
      projectId,
      ...invitationData,
      status: MemberStatus.PENDING,
      joinedAt: new Date(),
      invitedBy: this.authService.getCurrentUser()?.uid || ''
    };
    
    return from(addDoc(membersRef, newMember)).pipe(
      map(docRef => ({ ...newMember, id: docRef.id })),
      catchError(this.handleError)
    );
  }
  
  // 獲取專案統計
  getProjectStats(projectId: string): Observable<ProjectStats> {
    const statsRef = doc(this.firestore, 'projects', projectId, 'stats', 'main');
    return from(getDoc(statsRef)).pipe(
      map(doc => doc.data() as ProjectStats),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Project service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 專案權限定義
```typescript
enum ProjectPermission {
  // 專案管理權限
  MANAGE_PROJECT = 'manage_project',
  VIEW_PROJECT = 'view_project',
  DELETE_PROJECT = 'delete_project',
  
  // 成員管理權限
  MANAGE_MEMBERS = 'manage_members',
  INVITE_MEMBERS = 'invite_members',
  REMOVE_MEMBERS = 'remove_members',
  
  // BIM 管理權限
  MANAGE_BIM_MODELS = 'manage_bim_models',
  VIEW_BIM_MODELS = 'view_bim_models',
  UPLOAD_BIM_MODELS = 'upload_bim_models',
  
  // 成本管理權限
  MANAGE_COSTS = 'manage_costs',
  VIEW_COSTS = 'view_costs',
  APPROVE_COSTS = 'approve_costs',
  
  // 任務管理權限
  MANAGE_TASKS = 'manage_tasks',
  VIEW_TASKS = 'view_tasks',
  ASSIGN_TASKS = 'assign_tasks',
  
  // 文檔管理權限
  MANAGE_DOCUMENTS = 'manage_documents',
  VIEW_DOCUMENTS = 'view_documents',
  UPLOAD_DOCUMENTS = 'upload_documents'
}

// 角色權限映射
const ROLE_PERMISSIONS: Record<ProjectRole, ProjectPermission[]> = {
  [ProjectRole.OWNER]: [
    ProjectPermission.MANAGE_PROJECT,
    ProjectPermission.DELETE_PROJECT,
    ProjectPermission.MANAGE_MEMBERS,
    ProjectPermission.MANAGE_BIM_MODELS,
    ProjectPermission.MANAGE_COSTS,
    ProjectPermission.MANAGE_TASKS,
    ProjectPermission.MANAGE_DOCUMENTS
  ],
  [ProjectRole.ADMIN]: [
    ProjectPermission.VIEW_PROJECT,
    ProjectPermission.MANAGE_MEMBERS,
    ProjectPermission.MANAGE_BIM_MODELS,
    ProjectPermission.MANAGE_COSTS,
    ProjectPermission.MANAGE_TASKS,
    ProjectPermission.MANAGE_DOCUMENTS
  ],
  [ProjectRole.MANAGER]: [
    ProjectPermission.VIEW_PROJECT,
    ProjectPermission.INVITE_MEMBERS,
    ProjectPermission.VIEW_BIM_MODELS,
    ProjectPermission.MANAGE_COSTS,
    ProjectPermission.MANAGE_TASKS,
    ProjectPermission.MANAGE_DOCUMENTS
  ],
  [ProjectRole.ENGINEER]: [
    ProjectPermission.VIEW_PROJECT,
    ProjectPermission.VIEW_BIM_MODELS,
    ProjectPermission.UPLOAD_BIM_MODELS,
    ProjectPermission.VIEW_COSTS,
    ProjectPermission.VIEW_TASKS,
    ProjectPermission.ASSIGN_TASKS,
    ProjectPermission.VIEW_DOCUMENTS,
    ProjectPermission.UPLOAD_DOCUMENTS
  ],
  [ProjectRole.CONTRACTOR]: [
    ProjectPermission.VIEW_PROJECT,
    ProjectPermission.VIEW_BIM_MODELS,
    ProjectPermission.VIEW_COSTS,
    ProjectPermission.VIEW_TASKS,
    ProjectPermission.VIEW_DOCUMENTS
  ],
  [ProjectRole.VIEWER]: [
    ProjectPermission.VIEW_PROJECT,
    ProjectPermission.VIEW_BIM_MODELS,
    ProjectPermission.VIEW_COSTS,
    ProjectPermission.VIEW_TASKS,
    ProjectPermission.VIEW_DOCUMENTS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    ProjectPermission.VIEW_PROJECT,
    ProjectPermission.VIEW_BIM_MODELS,
    ProjectPermission.VIEW_TASKS,
    ProjectPermission.VIEW_DOCUMENTS
  ]
};
```

## 📱 UI/UX 設計

### 專案創建流程
```typescript
@Component({
  selector: 'app-create-project-modal',
  template: `
    <nz-steps [nzCurrent]="currentStep" [nzSize]="'small'">
      <nz-step nzTitle="基本信息"></nz-step>
      <nz-step nzTitle="專案設置"></nz-step>
      <nz-step nzTitle="團隊設置"></nz-step>
      <nz-step nzTitle="完成"></nz-step>
    </nz-steps>
    
    <div class="step-content">
      <ng-container [ngSwitch]="currentStep">
        <!-- 步驟 1: 基本信息 -->
        <div *ngSwitchCase="0">
          <nz-form [formGroup]="basicInfoForm" nzLayout="vertical">
            <nz-form-item>
              <nz-form-label>專案名稱</nz-form-label>
              <nz-form-control nzErrorTip="請輸入專案名稱">
                <input nz-input formControlName="name" placeholder="輸入專案名稱">
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>專案描述</nz-form-label>
              <nz-form-control>
                <textarea nz-input formControlName="description" 
                         placeholder="輸入專案描述" rows="4"></textarea>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>專案類型</nz-form-label>
              <nz-form-control>
                <nz-select formControlName="type">
                  <nz-option nzValue="construction" nzLabel="建築工程"></nz-option>
                  <nz-option nzValue="infrastructure" nzLabel="基礎設施"></nz-option>
                  <nz-option nzValue="manufacturing" nzLabel="製造業"></nz-option>
                  <nz-option nzValue="renovation" nzLabel="翻新工程"></nz-option>
                  <nz-option nzValue="maintenance" nzLabel="維護工程"></nz-option>
                </nz-select>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>專案可見性</nz-form-label>
              <nz-form-control>
                <nz-radio-group formControlName="visibility">
                  <label nz-radio nzValue="public">公開</label>
                  <label nz-radio nzValue="private">私有</label>
                  <label nz-radio nzValue="organization">組織內可見</label>
                </nz-radio-group>
              </nz-form-control>
            </nz-form-item>
          </nz-form>
        </div>
        
        <!-- 步驟 2: 專案設置 -->
        <div *ngSwitchCase="1">
          <nz-form [formGroup]="settingsForm" nzLayout="vertical">
            <nz-form-item>
              <nz-form-label>BIM 設置</nz-form-label>
              <nz-form-control>
                <nz-switch formControlName="bimEnabled" nzCheckedChildren="啟用" nzUnCheckedChildren="禁用"></nz-switch>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>成本管理</nz-form-label>
              <nz-form-control>
                <nz-switch formControlName="costEnabled" nzCheckedChildren="啟用" nzUnCheckedChildren="禁用"></nz-switch>
              </nz-form-control>
            </nz-form-item>
            
            <nz-form-item>
              <nz-form-label>任務管理</nz-form-label>
              <nz-form-control>
                <nz-switch formControlName="taskEnabled" nzCheckedChildren="啟用" nzUnCheckedChildren="禁用"></nz-switch>
              </nz-form-control>
            </nz-form-item>
          </nz-form>
        </div>
        
        <!-- 步驟 3: 團隊設置 -->
        <div *ngSwitchCase="2">
          <nz-form [formGroup]="teamForm" nzLayout="vertical">
            <nz-form-item>
              <nz-form-label>邀請團隊成員</nz-form-label>
              <nz-form-control>
                <nz-select 
                  formControlName="members" 
                  nzMode="tags" 
                  nzPlaceHolder="輸入郵箱地址">
                </nz-select>
              </nz-form-control>
            </nz-form-item>
          </nz-form>
        </div>
        
        <!-- 步驟 4: 完成 -->
        <div *ngSwitchCase="3">
          <div class="completion-content">
            <nz-result
              nzStatus="success"
              nzTitle="專案創建成功！"
              nzSubTitle="您的專案已經創建完成，可以開始協作了。">
              <div nz-result-extra>
                <button nz-button nzType="primary" (click)="goToProject()">
                  進入專案
                </button>
                <button nz-button (click)="createAnother()">
                  創建另一個專案
                </button>
              </div>
            </nz-result>
          </div>
        </div>
      </ng-container>
    </div>
    
    <div class="modal-footer">
      <button nz-button (click)="cancel()">取消</button>
      <button nz-button nzType="primary" 
             (click)="nextStep()" 
             [disabled]="!isCurrentStepValid()"
             *ngIf="currentStep < 3">
        下一步
      </button>
      <button nz-button nzType="primary" 
             (click)="createProject()" 
             [nzLoading]="creating"
             *ngIf="currentStep === 3">
        創建專案
      </button>
    </div>
  `,
  styles: [`
    .step-content {
      min-height: 400px;
      padding: 24px 0;
    }
    
    .completion-content {
      text-align: center;
      padding: 40px 0;
    }
    
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 16px;
      border-top: 1px solid #f0f0f0;
    }
  `]
})
export class AppCreateProjectModalComponent implements OnInit {
  currentStep = 0;
  creating = false;
  
  basicInfoForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    type: ['construction', Validators.required],
    visibility: ['private', Validators.required]
  });
  
  settingsForm = this.fb.group({
    bimEnabled: [true],
    costEnabled: [true],
    taskEnabled: [true]
  });
  
  teamForm = this.fb.group({
    members: [[]]
  });
  
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private modal: NzModalRef,
    private message: NzMessageService
  ) {}
  
  ngOnInit() {}
  
  nextStep() {
    if (this.isCurrentStepValid()) {
      this.currentStep++;
    }
  }
  
  isCurrentStepValid(): boolean {
    switch (this.currentStep) {
      case 0:
        return this.basicInfoForm.valid;
      case 1:
        return this.settingsForm.valid;
      case 2:
        return this.teamForm.valid;
      default:
        return true;
    }
  }
  
  createProject() {
    if (this.isAllStepsValid()) {
      this.creating = true;
      const projectData = {
        ...this.basicInfoForm.value,
        settings: this.settingsForm.value,
        members: this.teamForm.value.members
      };
      
      this.projectService.createProject(projectData).subscribe({
        next: (project) => {
          this.message.success('專案創建成功');
          this.modal.close(project);
        },
        error: (error) => {
          this.message.error('創建失敗: ' + error.message);
          this.creating = false;
        }
      });
    }
  }
  
  isAllStepsValid(): boolean {
    return this.basicInfoForm.valid && 
           this.settingsForm.valid && 
           this.teamForm.valid;
  }
  
  goToProject() {
    // 導航到專案頁面
  }
  
  createAnother() {
    this.currentStep = 0;
    this.basicInfoForm.reset();
    this.settingsForm.reset();
    this.teamForm.reset();
  }
  
  cancel() {
    this.modal.close();
  }
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService]
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create project', () => {
    const projectData = {
      name: 'Test Project',
      type: ProjectType.CONSTRUCTION,
      visibility: ProjectVisibility.PRIVATE
    };
    
    service.createProject(projectData).subscribe(project => {
      expect(project.name).toBe('Test Project');
      expect(project.type).toBe(ProjectType.CONSTRUCTION);
    });
    
    const req = httpMock.expectOne('/api/projects');
    expect(req.request.method).toBe('POST');
    req.flush({ id: '1', ...projectData });
  });
  
  it('should load projects', () => {
    const mockProjects = [
      { id: '1', name: 'Project 1', type: ProjectType.CONSTRUCTION },
      { id: '2', name: 'Project 2', type: ProjectType.INFRASTRUCTURE }
    ];
    
    service.loadProjects();
    
    const req = httpMock.expectOne('/api/projects');
    expect(req.request.method).toBe('GET');
    req.flush(mockProjects);
    
    service.projects$.subscribe(projects => {
      expect(projects.length).toBe(2);
      expect(projects[0].name).toBe('Project 1');
    });
  });
});
```

## 📈 性能優化

### 數據緩存策略
```typescript
@Injectable()
export class ProjectCacheService {
  private cache = new Map<string, CachedProject>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 分鐘
  
  getCachedProject(projectId: string): Project | null {
    const cached = this.cache.get(projectId);
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }
    return null;
  }
  
  setCachedProject(projectId: string, project: Project): void {
    this.cache.set(projectId, {
      data: project,
      timestamp: Date.now()
    });
  }
  
  private isCacheValid(cached: CachedProject): boolean {
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }
}

interface CachedProject {
  data: Project;
  timestamp: number;
}
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface ProjectManagementApi {
  // 專案管理
  POST /api/projects                    // 創建專案
  GET /api/projects                     // 獲取專案列表
  GET /api/projects/{projectId}         // 獲取專案詳情
  PATCH /api/projects/{projectId}       // 更新專案
  DELETE /api/projects/{projectId}      // 刪除專案
  
  // 專案成員
  GET /api/projects/{projectId}/members // 獲取專案成員
  POST /api/projects/{projectId}/members // 邀請成員
  PATCH /api/projects/{projectId}/members/{memberId} // 更新成員
  DELETE /api/projects/{projectId}/members/{memberId} // 移除成員
  
  // 專案統計
  GET /api/projects/{projectId}/stats   // 獲取專案統計
  GET /api/projects/{projectId}/activity // 獲取專案活動
}

// 請求/響應類型
interface CreateProjectRequest {
  name: string;
  description?: string;
  type: ProjectType;
  visibility: ProjectVisibility;
  settings: Partial<ProjectSettings>;
  members?: string[];
}

interface UpdateProjectRequest {
  name?: string;
  description?: string;
  avatar?: string;
  settings?: Partial<ProjectSettings>;
}

interface InviteMemberRequest {
  email: string;
  role: ProjectRole;
  message?: string;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const projectConfig = {
  maxProjectsPerUser: parseInt(process.env.MAX_PROJECTS_PER_USER || '50'),
  maxMembersPerProject: parseInt(process.env.MAX_MEMBERS_PER_PROJECT || '100'),
  projectNameMaxLength: parseInt(process.env.PROJECT_NAME_MAX_LENGTH || '100'),
  enableProjectDeletion: process.env.ENABLE_PROJECT_DELETION === 'true',
  defaultProjectType: process.env.DEFAULT_PROJECT_TYPE || 'construction',
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '100') * 1024 * 1024, // MB
  supportedFileFormats: process.env.SUPPORTED_FILE_FORMATS?.split(',') || ['ifc', 'dwg', 'rvt']
};
```

### 數據庫索引
```sql
-- 專案表索引
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_type ON projects(type);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_projects_organization_id ON projects(organization_id);

-- 專案成員表索引
CREATE INDEX idx_project_members_project_id ON project_members(project_id);
CREATE INDEX idx_project_members_user_id ON project_members(user_id);
CREATE INDEX idx_project_members_role ON project_members(role);
CREATE INDEX idx_project_members_status ON project_members(status);
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] API 接口定義完成
- [ ] Angular 組件開發
- [ ] 服務層實現
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 集成測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成