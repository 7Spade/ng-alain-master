# 5️⃣ 項目管理模組

## 📋 模組概述

項目管理模組負責組織內項目的創建、配置、協作和生命週期管理，提供完整的項目管理功能，包括項目設置、成員管理、權限控制等。

### 🎯 功能目標
- 提供完整的項目生命週期管理
- 支持項目協作和團隊管理
- 實現項目級權限控制
- 提供項目統計和分析功能

## 🏗️ 功能架構

### 核心功能
```
項目管理模組
├── 項目創建與設置
│   ├── 項目基本信息設置
│   ├── 項目類型選擇
│   ├── 項目可見性配置
│   └── 項目初始化設置
├── 項目協作管理
│   ├── 項目成員管理
│   ├── 項目權限分配
│   ├── 項目角色管理
│   └── 項目通知設置
├── 項目內容管理
│   ├── 項目文檔管理
│   ├── 項目資源管理
│   ├── 項目里程碑管理
│   └── 項目任務管理
└── 項目監控分析
    ├── 項目進度監控
    ├── 項目統計分析
    ├── 項目績效評估
    └── 項目報告生成
```

## 📊 數據結構設計

### 項目實體 (Project)
```typescript
interface Project {
  id: string;                           // 項目唯一標識
  name: string;                         // 項目名稱
  slug: string;                         // URL 友好的項目標識
  description?: string;                 // 項目描述
  type: ProjectType;                    // 項目類型
  visibility: ProjectVisibility;        // 項目可見性
  status: ProjectStatus;                // 項目狀態
  organizationId: string;               // 所屬組織
  teamId?: string;                      // 所屬團隊
  ownerId: string;                      // 項目擁有者
  settings: ProjectSettings;            // 項目設置
  statistics: ProjectStatistics;        // 項目統計
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum ProjectType {
  SOFTWARE = 'software',                // 軟件開發
  DESIGN = 'design',                    // 設計項目
  MARKETING = 'marketing',              // 營銷項目
  RESEARCH = 'research',                // 研究項目
  BUSINESS = 'business'                 // 商業項目
}

enum ProjectVisibility {
  PUBLIC = 'public',                    // 公開
  PRIVATE = 'private',                  // 私有
  INTERNAL = 'internal'                 // 內部
}

enum ProjectStatus {
  PLANNING = 'planning',                // 規劃中
  ACTIVE = 'active',                    // 進行中
  ON_HOLD = 'on_hold',                  // 暫停
  COMPLETED = 'completed',              // 已完成
  CANCELLED = 'cancelled'               // 已取消
}

interface ProjectSettings {
  allowMemberInvite: boolean;           // 允許成員邀請
  allowPublicAccess: boolean;           // 允許公開訪問
  enableNotifications: boolean;         // 啟用通知
  enableTimeTracking: boolean;          // 啟用時間追蹤
  enableFileSharing: boolean;           // 啟用文件共享
  maxMembers: number;                   // 最大成員數
  defaultBranch: string;                // 默認分支
  protectedBranches: string[];          // 保護分支
}

interface ProjectStatistics {
  totalMembers: number;                 // 總成員數
  totalTasks: number;                   // 總任務數
  completedTasks: number;               // 已完成任務數
  totalCommits: number;                 // 總提交數
  totalIssues: number;                  // 總問題數
  openIssues: number;                   // 開放問題數
  totalPullRequests: number;            // 總拉取請求數
  openPullRequests: number;             // 開放拉取請求數
  lastActivity: Date;                   // 最後活動時間
}
```

### 項目成員實體 (ProjectMember)
```typescript
interface ProjectMember {
  id: string;                           // 成員唯一標識
  projectId: string;                    // 項目ID
  userId: string;                       // 用戶ID
  role: ProjectRole;                    // 項目角色
  permissions: ProjectPermission[];     // 項目權限
  joinedAt: Date;                       // 加入時間
  invitedBy: string;                    // 邀請者
  status: MemberStatus;                 // 成員狀態
}

enum ProjectRole {
  OWNER = 'owner',                      // 擁有者
  MAINTAINER = 'maintainer',            // 維護者
  DEVELOPER = 'developer',              // 開發者
  CONTRIBUTOR = 'contributor',          // 貢獻者
  VIEWER = 'viewer'                     // 查看者
}

enum ProjectPermission {
  READ = 'read',                        // 讀取
  WRITE = 'write',                      // 寫入
  ADMIN = 'admin',                      // 管理
  PUSH = 'push',                        // 推送
  PULL = 'pull'                         // 拉取
}

enum MemberStatus {
  ACTIVE = 'active',                    // 活躍
  INACTIVE = 'inactive',                // 非活躍
  PENDING = 'pending',                  // 待審核
  SUSPENDED = 'suspended'               // 暫停
}
```

## 🧩 Angular 組件設計

### 項目管理主組件
```typescript
@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, STModule, SEModule],
  template: `
    <div class="project-management">
      <se-container>
        <se label="項目名稱">
          <input nz-input [(ngModel)]="searchForm.name" placeholder="搜索項目名稱" />
        </se>
        <se label="項目類型">
          <nz-select [(ngModel)]="searchForm.type" nzAllowClear>
            <nz-option *ngFor="let type of projectTypes" [nzValue]="type.value" [nzLabel]="type.label"></nz-option>
          </nz-select>
        </se>
        <se label="狀態">
          <nz-select [(ngModel)]="searchForm.status" nzAllowClear>
            <nz-option *ngFor="let status of projectStatuses" [nzValue]="status.value" [nzLabel]="status.label"></nz-option>
          </nz-select>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="search()">搜索</button>
          <button nz-button (click)="reset()">重置</button>
          <button nz-button nzType="primary" (click)="createProject()">創建項目</button>
        </se>
      </se-container>
      
      <st
        [data]="projects"
        [columns]="columns"
        [page]="{ front: false, show: true, showSize: true }"
        (change)="onTableChange($event)"
        (refresh)="loadProjects()">
      </st>
    </div>
  `
})
export class ProjectManagementComponent implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  searchForm = {
    name: '',
    type: null,
    status: null
  };
  
  projects: Project[] = [];
  projectTypes = [
    { value: ProjectType.SOFTWARE, label: '軟件開發' },
    { value: ProjectType.DESIGN, label: '設計項目' },
    { value: ProjectType.MARKETING, label: '營銷項目' },
    { value: ProjectType.RESEARCH, label: '研究項目' },
    { value: ProjectType.BUSINESS, label: '商業項目' }
  ];
  
  projectStatuses = [
    { value: ProjectStatus.PLANNING, label: '規劃中' },
    { value: ProjectStatus.ACTIVE, label: '進行中' },
    { value: ProjectStatus.ON_HOLD, label: '暫停' },
    { value: ProjectStatus.COMPLETED, label: '已完成' },
    { value: ProjectStatus.CANCELLED, label: '已取消' }
  ];
  
  columns: STColumn[] = [
    { title: '項目名稱', index: 'name', width: 200 },
    { title: '類型', index: 'type', width: 100, type: 'tag' },
    { title: '狀態', index: 'status', width: 100, type: 'tag' },
    { title: '可見性', index: 'visibility', width: 100, type: 'tag' },
    { title: '成員數', index: 'statistics.totalMembers', width: 100 },
    { title: '創建時間', index: 'createdAt', width: 150, type: 'date' },
    { title: '最後活動', index: 'statistics.lastActivity', width: 150, type: 'date' },
    {
      title: '操作',
      width: 250,
      buttons: [
        {
          text: '查看',
          click: (record: Project) => this.viewProject(record)
        },
        {
          text: '編輯',
          click: (record: Project) => this.editProject(record)
        },
        {
          text: '設置',
          click: (record: Project) => this.projectSettings(record)
        },
        {
          text: '刪除',
          pop: true,
          popTitle: '確定要刪除這個項目嗎？',
          click: (record: Project) => this.deleteProject(record)
        }
      ]
    }
  ];
  
  ngOnInit() {
    this.loadProjects();
  }
  
  loadProjects() {
    this.projectService.getProjects(this.searchForm).subscribe({
      next: (projects) => this.projects = projects,
      error: (error) => this.message.error('載入項目失敗')
    });
  }
  
  createProject() {
    this.modal.create({
      nzTitle: '創建項目',
      nzContent: AppCreateProjectModalComponent,
      nzFooter: null,
      nzWidth: 600,
      nzOnOk: () => {
        this.loadProjects();
        return true;
      }
    });
  }
  
  editProject(project: Project) {
    this.modal.create({
      nzTitle: '編輯項目',
      nzContent: AppEditProjectModalComponent,
      nzComponentParams: { project },
      nzFooter: null,
      nzWidth: 600,
      nzOnOk: () => {
        this.loadProjects();
        return true;
      }
    });
  }
  
  viewProject(project: Project) {
    // 導航到項目詳情頁面
    this.router.navigate(['/project', project.slug]);
  }
  
  projectSettings(project: Project) {
    this.modal.create({
      nzTitle: `項目設置 - ${project.name}`,
      nzContent: AppProjectSettingsModalComponent,
      nzComponentParams: { project },
      nzFooter: null,
      nzWidth: 800,
      nzOnOk: () => {
        this.loadProjects();
        return true;
      }
    });
  }
  
  deleteProject(project: Project) {
    this.projectService.deleteProject(project.id).subscribe({
      next: () => {
        this.message.success('項目刪除成功');
        this.loadProjects();
      },
      error: (error) => this.message.error('項目刪除失敗')
    });
  }
  
  search() {
    this.loadProjects();
  }
  
  reset() {
    this.searchForm = { name: '', type: null, status: null };
    this.loadProjects();
  }
  
  onTableChange(event: STChange) {
    // 處理表格變化
  }
}
```

## 🔧 服務層設計

### 項目服務 (ProjectService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/projects';
  
  // 獲取項目列表
  getProjects(params?: any): Observable<Project[]> {
    const cacheKey = `projects_${JSON.stringify(params)}`;
    return this.cache.get(cacheKey, () =>
      this.http.get<Project[]>(this.API_BASE, { params })
    );
  }
  
  // 獲取項目詳情
  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.API_BASE}/${id}`);
  }
  
  // 創建項目
  createProject(project: Partial<Project>): Observable<Project> {
    return this.http.post<Project>(this.API_BASE, project).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新項目
  updateProject(id: string, project: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.API_BASE}/${id}`, project).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 刪除項目
  deleteProject(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 獲取項目成員
  getProjectMembers(projectId: string): Observable<ProjectMember[]> {
    return this.http.get<ProjectMember[]>(`${this.API_BASE}/${projectId}/members`);
  }
  
  // 添加項目成員
  addProjectMember(projectId: string, member: Partial<ProjectMember>): Observable<ProjectMember> {
    return this.http.post<ProjectMember>(`${this.API_BASE}/${projectId}/members`, member).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 移除項目成員
  removeProjectMember(projectId: string, memberId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${projectId}/members/${memberId}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 獲取項目統計
  getProjectStatistics(projectId: string): Observable<ProjectStatistics> {
    return this.http.get<ProjectStatistics>(`${this.API_BASE}/${projectId}/statistics`);
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
  
  it('should create project successfully', () => {
    const newProject: Partial<Project> = {
      name: 'Test Project',
      type: ProjectType.SOFTWARE,
      visibility: ProjectVisibility.PRIVATE
    };
    
    service.createProject(newProject).subscribe(project => {
      expect(project.name).toBe('Test Project');
    });
    
    const req = httpMock.expectOne('/api/projects');
    expect(req.request.method).toBe('POST');
    req.flush({ ...newProject, id: '1' });
  });
});
```

## ⚡ 性能優化

### 項目緩存策略
```typescript
@Injectable({
  providedIn: 'root'
})
export class ProjectCacheService {
  private readonly cache = inject(DelonCacheService);
  private readonly CACHE_KEY = 'project_cache';
  private readonly CACHE_EXPIRE = 15 * 60 * 1000; // 15分鐘
  
  // 緩存項目列表
  cacheProjects(params: any, projects: Project[]): void {
    const key = this.generateCacheKey(params);
    this.cache.set(key, projects, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的項目列表
  getCachedProjects(params: any): Project[] | null {
    const key = this.generateCacheKey(params);
    return this.cache.get(key);
  }
  
  // 清除項目緩存
  clearProjectCache(): void {
    this.cache.remove(this.CACHE_KEY);
  }
  
  private generateCacheKey(params: any): string {
    return `${this.CACHE_KEY}_${JSON.stringify(params)}`;
  }
}
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// 項目管理 API
GET    /api/projects                     // 獲取項目列表
GET    /api/projects/:id                // 獲取項目詳情
POST   /api/projects                    // 創建項目
PUT    /api/projects/:id                // 更新項目
DELETE /api/projects/:id                // 刪除項目
GET    /api/projects/:id/members        // 獲取項目成員
POST   /api/projects/:id/members        // 添加項目成員
DELETE /api/projects/:id/members/:memberId // 移除項目成員
GET    /api/projects/:id/statistics     // 獲取項目統計
```

## 📊 成功指標

### 功能指標
- [ ] 支持 1000+ 並發項目
- [ ] 項目創建響應時間 < 2 秒
- [ ] 支持 5 種項目類型
- [ ] 支持 3 種可見性級別
- [ ] 100% 項目權限控制

### 性能指標
- [ ] 項目列表載入時間 < 1 秒
- [ ] 項目緩存命中率 > 85%
- [ ] 支持項目批量操作
- [ ] 支持水平擴展

### 安全指標
- [ ] 項目權限驗證
- [ ] 項目數據加密
- [ ] 項目訪問審計
- [ ] 項目成員管理安全

---

**📝 注意**: 本模組需要與權限控制模組深度集成，確保項目級別的安全性和協作功能。