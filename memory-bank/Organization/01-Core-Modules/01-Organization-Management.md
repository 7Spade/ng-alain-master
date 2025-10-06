# 1️⃣ 組織管理模組

## 📋 模組概述

組織管理模組是整個系統的核心基礎，負責組織的創建、設置、基本信息和配置管理。此模組為其他所有模組提供組織上下文和基礎架構支持。

### 🎯 功能目標
- 提供完整的組織生命週期管理
- 支持多種組織類型和設置
- 實現組織級別的配置管理
- 提供組織級別的統計和監控

## 🏗️ 功能架構

### 核心功能
```
組織管理模組
├── 組織創建與設置
│   ├── 組織基本信息設置
│   ├── 組織類型選擇
│   ├── 組織設置配置
│   └── 組織初始化流程
├── 組織信息管理
│   ├── 基本信息維護
│   ├── 組織頭像管理
│   ├── 組織描述編輯
│   └── 組織可見性設置
├── 組織設置管理
│   ├── 默認權限設置
│   ├── 組織政策配置
│   ├── 數據保留策略
│   └── 合規性設置
└── 組織統計監控
    ├── 組織使用統計
    ├── 成員活動監控
    ├── 項目數量統計
    └── 資源使用情況
```

## 📊 數據結構設計

### 組織實體 (Organization)
```typescript
interface Organization {
  id: string;                    // 組織唯一標識
  name: string;                  // 組織名稱
  slug: string;                  // URL 友好的組織標識
  description?: string;          // 組織描述
  avatar?: string;               // 組織頭像 URL
  type: OrganizationType;        // 組織類型
  visibility: OrganizationVisibility; // 組織可見性
  settings: OrganizationSettings; // 組織設置
  billing: OrganizationBilling;  // 計費信息
  statistics: OrganizationStats; // 統計數據
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum OrganizationType {
  PERSONAL = 'personal',         // 個人組織
  ENTERPRISE = 'enterprise',     // 企業組織
  OPEN_SOURCE = 'open_source'    // 開源組織
}

enum OrganizationVisibility {
  PUBLIC = 'public',            // 公開組織
  PRIVATE = 'private'           // 私有組織
}

interface OrganizationSettings {
  defaultPermissions: Permission[]; // 默認權限設置
  policies: OrganizationPolicies;   // 組織政策
  dataRetention: DataRetentionPolicy; // 數據保留策略
  compliance: ComplianceSettings;   // 合規性設置
  notifications: NotificationSettings; // 通知設置
  security: SecuritySettings;       // 安全設置
}

interface OrganizationPolicies {
  memberInvitationPolicy: MemberInvitationPolicy; // 成員邀請政策
  repositoryCreationPolicy: RepositoryCreationPolicy; // 倉庫創建政策
  teamCreationPolicy: TeamCreationPolicy; // 團隊創建政策
  apiAccessPolicy: ApiAccessPolicy; // API 訪問政策
}

interface DataRetentionPolicy {
  auditLogRetention: number;    // 審計日誌保留天數
  userDataRetention: number;    // 用戶數據保留天數
  projectDataRetention: number; // 項目數據保留天數
  autoDeleteEnabled: boolean;   // 自動刪除啟用
}

interface ComplianceSettings {
  gdprCompliant: boolean;       // GDPR 合規
  soxCompliant: boolean;        // SOX 合規
  hipaaCompliant: boolean;      // HIPAA 合規
  dataProcessingAgreement: boolean; // 數據處理協議
}

interface OrganizationStats {
  memberCount: number;          // 成員數量
  teamCount: number;            // 團隊數量
  projectCount: number;         // 項目數量
  repositoryCount: number;      // 倉庫數量
  activeUserCount: number;      // 活躍用戶數量
  lastActivityAt: Date;         // 最後活動時間
  storageUsed: number;          // 已使用存儲空間 (bytes)
  bandwidthUsed: number;        // 已使用帶寬 (bytes)
}
```

### 組織成員關係 (OrganizationMember)
```typescript
interface OrganizationMember {
  id: string;                   // 成員關係 ID
  organizationId: string;       // 組織 ID
  userId: string;               // 用戶 ID
  role: OrganizationRole;       // 組織角色
  permissions: Permission[];    // 具體權限
  status: MemberStatus;         // 成員狀態
  joinedAt: Date;              // 加入時間
  invitedBy: string;           // 邀請者 ID
  lastActiveAt: Date;          // 最後活躍時間
  settings: MemberSettings;    // 成員設置
}

enum OrganizationRole {
  OWNER = 'owner',             // 所有者
  ADMIN = 'admin',             // 管理員
  MEMBER = 'member',           // 成員
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
// 組織管理組件
@Component({
  selector: 'app-organization-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>組織管理</nz-card-title>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="基本信息">
            <app-organization-basic-info></app-organization-basic-info>
          </nz-tab>
          <nz-tab nzTitle="設置">
            <app-organization-settings></app-organization-settings>
          </nz-tab>
          <nz-tab nzTitle="統計">
            <app-organization-statistics></app-organization-statistics>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class OrganizationManagementComponent implements OnInit {
  organization$ = this.organizationService.currentOrganization$;
  
  constructor(
    private organizationService: OrganizationService,
    private router: Router
  ) {}
  
  ngOnInit() {
    this.organizationService.loadCurrentOrganization();
  }
}

// 組織基本信息組件
@Component({
  selector: 'app-organization-basic-info',
  template: `
    <nz-form [formGroup]="organizationForm">
      <nz-form-item>
        <nz-form-label>組織名稱</nz-form-label>
        <nz-form-control>
          <input nz-input formControlName="name" placeholder="輸入組織名稱">
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label>組織描述</nz-form-label>
        <nz-form-control>
          <textarea nz-input formControlName="description" 
                   placeholder="輸入組織描述" rows="4"></textarea>
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label>組織類型</nz-form-label>
        <nz-form-control>
          <nz-select formControlName="type">
            <nz-option nzValue="personal" nzLabel="個人組織"></nz-option>
            <nz-option nzValue="enterprise" nzLabel="企業組織"></nz-option>
            <nz-option nzValue="open_source" nzLabel="開源組織"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-control>
          <button nz-button nzType="primary" (click)="updateOrganization()">
            保存更改
          </button>
        </nz-form-control>
      </nz-form-item>
    </nz-form>
  `
})
export class OrganizationBasicInfoComponent implements OnInit {
  organizationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
    type: ['personal', Validators.required]
  });
  
  constructor(
    private fb: FormBuilder,
    private organizationService: OrganizationService
  ) {}
  
  ngOnInit() {
    this.organization$.subscribe(org => {
      if (org) {
        this.organizationForm.patchValue(org);
      }
    });
  }
  
  updateOrganization() {
    if (this.organizationForm.valid) {
      const formValue = this.organizationForm.value;
      this.organizationService.updateOrganization(formValue).subscribe({
        next: () => this.message.success('組織信息更新成功'),
        error: (error) => this.message.error('更新失敗: ' + error.message)
      });
    }
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private readonly apiUrl = '/api/organizations';
  
  private currentOrganizationSubject = new BehaviorSubject<Organization | null>(null);
  currentOrganization$ = this.currentOrganizationSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建組織
  createOrganization(organizationData: CreateOrganizationRequest): Observable<Organization> {
    return this.http.post<Organization>(this.apiUrl, organizationData).pipe(
      tap(org => this.currentOrganizationSubject.next(org)),
      catchError(this.handleError)
    );
  }
  
  // 獲取組織信息
  getOrganization(organizationId: string): Observable<Organization> {
    return this.http.get<Organization>(`${this.apiUrl}/${organizationId}`).pipe(
      tap(org => this.currentOrganizationSubject.next(org)),
      catchError(this.handleError)
    );
  }
  
  // 更新組織信息
  updateOrganization(organizationId: string, updates: Partial<Organization>): Observable<Organization> {
    return this.http.patch<Organization>(`${this.apiUrl}/${organizationId}`, updates).pipe(
      tap(org => this.currentOrganizationSubject.next(org)),
      catchError(this.handleError)
    );
  }
  
  // 獲取組織統計
  getOrganizationStats(organizationId: string): Observable<OrganizationStats> {
    return this.http.get<OrganizationStats>(`${this.apiUrl}/${organizationId}/stats`);
  }
  
  // 獲取組織成員列表
  getOrganizationMembers(organizationId: string): Observable<OrganizationMember[]> {
    return this.http.get<OrganizationMember[]>(`${this.apiUrl}/${organizationId}/members`);
  }
  
  // 加載當前組織
  loadCurrentOrganization(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser?.currentOrganizationId) {
      this.getOrganization(currentUser.currentOrganizationId).subscribe();
    }
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Organization service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 權限定義
```typescript
enum OrganizationPermission {
  // 組織管理權限
  MANAGE_ORGANIZATION = 'manage_organization',
  VIEW_ORGANIZATION = 'view_organization',
  DELETE_ORGANIZATION = 'delete_organization',
  
  // 成員管理權限
  MANAGE_MEMBERS = 'manage_members',
  INVITE_MEMBERS = 'invite_members',
  REMOVE_MEMBERS = 'remove_members',
  
  // 設置管理權限
  MANAGE_SETTINGS = 'manage_settings',
  VIEW_SETTINGS = 'view_settings',
  
  // 統計查看權限
  VIEW_STATISTICS = 'view_statistics',
  VIEW_BILLING = 'view_billing'
}

// 角色權限映射
const ROLE_PERMISSIONS: Record<OrganizationRole, OrganizationPermission[]> = {
  [OrganizationRole.OWNER]: [
    OrganizationPermission.MANAGE_ORGANIZATION,
    OrganizationPermission.DELETE_ORGANIZATION,
    OrganizationPermission.MANAGE_MEMBERS,
    OrganizationPermission.MANAGE_SETTINGS,
    OrganizationPermission.VIEW_STATISTICS,
    OrganizationPermission.VIEW_BILLING
  ],
  [OrganizationRole.ADMIN]: [
    OrganizationPermission.VIEW_ORGANIZATION,
    OrganizationPermission.MANAGE_MEMBERS,
    OrganizationPermission.MANAGE_SETTINGS,
    OrganizationPermission.VIEW_STATISTICS
  ],
  [OrganizationRole.MEMBER]: [
    OrganizationPermission.VIEW_ORGANIZATION,
    OrganizationPermission.VIEW_SETTINGS
  ],
  [OrganizationRole.OUTSIDE_COLLABORATOR]: [
    OrganizationPermission.VIEW_ORGANIZATION
  ]
};
```

### 權限守衛
```typescript
@Injectable()
export class OrganizationPermissionGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private organizationService: OrganizationService
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const requiredPermission = route.data['permission'] as OrganizationPermission;
    const organizationId = route.params['orgSlug'];
    
    return this.organizationService.getOrganization(organizationId).pipe(
      switchMap(org => {
        const currentUser = this.authService.getCurrentUser();
        const member = org.members.find(m => m.userId === currentUser.id);
        
        if (!member) {
          return of(false);
        }
        
        const hasPermission = member.permissions.includes(requiredPermission);
        return of(hasPermission);
      }),
      catchError(() => of(false))
    );
  }
}
```

## 📱 UI/UX 設計

### 組織選擇器組件
```typescript
@Component({
  selector: 'app-organization-selector',
  template: `
    <nz-select 
      [(ngModel)]="selectedOrganization" 
      (ngModelChange)="onOrganizationChange($event)"
      placeholder="選擇組織"
      nzShowSearch
      nzAllowClear>
      <nz-option 
        *ngFor="let org of organizations$ | async" 
        [nzValue]="org.id" 
        [nzLabel]="org.name">
        <div class="org-option">
          <img [src]="org.avatar || defaultAvatar" class="org-avatar">
          <span class="org-name">{{ org.name }}</span>
          <span class="org-type">{{ org.type | organizationTypeLabel }}</span>
        </div>
      </nz-option>
    </nz-select>
  `,
  styles: [`
    .org-option {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .org-avatar {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
    
    .org-name {
      font-weight: 500;
    }
    
    .org-type {
      color: #666;
      font-size: 12px;
    }
  `]
})
export class OrganizationSelectorComponent {
  @Input() selectedOrganization: string | null = null;
  @Output() organizationChange = new EventEmitter<string>();
  
  organizations$ = this.organizationService.getUserOrganizations();
  defaultAvatar = '/assets/images/default-org-avatar.png';
  
  constructor(private organizationService: OrganizationService) {}
  
  onOrganizationChange(organizationId: string) {
    this.organizationChange.emit(organizationId);
    this.organizationService.setCurrentOrganization(organizationId);
  }
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('OrganizationService', () => {
  let service: OrganizationService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationService]
    });
    service = TestBed.inject(OrganizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create organization', () => {
    const orgData = {
      name: 'Test Org',
      type: OrganizationType.ENTERPRISE
    };
    
    service.createOrganization(orgData).subscribe(org => {
      expect(org.name).toBe('Test Org');
      expect(org.type).toBe(OrganizationType.ENTERPRISE);
    });
    
    const req = httpMock.expectOne('/api/organizations');
    expect(req.request.method).toBe('POST');
    req.flush({ id: '1', ...orgData });
  });
  
  it('should load organization members', () => {
    const orgId = 'test-org';
    const mockMembers = [
      { id: '1', userId: 'user1', role: OrganizationRole.ADMIN },
      { id: '2', userId: 'user2', role: OrganizationRole.MEMBER }
    ];
    
    service.getOrganizationMembers(orgId).subscribe(members => {
      expect(members.length).toBe(2);
      expect(members[0].role).toBe(OrganizationRole.ADMIN);
    });
    
    const req = httpMock.expectOne(`/api/organizations/${orgId}/members`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMembers);
  });
});
```

### 集成測試
```typescript
describe('Organization Management Integration', () => {
  let component: OrganizationManagementComponent;
  let fixture: ComponentFixture<OrganizationManagementComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationManagementComponent],
      imports: [ReactiveFormsModule, NzCardModule, NzTabsModule],
      providers: [
        { provide: OrganizationService, useClass: MockOrganizationService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(OrganizationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should display organization information', () => {
    const mockOrg = {
      id: '1',
      name: 'Test Organization',
      description: 'Test Description',
      type: OrganizationType.ENTERPRISE
    };
    
    component.organization$ = of(mockOrg);
    fixture.detectChanges();
    
    expect(fixture.debugElement.nativeElement.textContent).toContain('Test Organization');
  });
});
```

## 📈 性能優化

### 數據緩存策略
```typescript
@Injectable()
export class OrganizationCacheService {
  private cache = new Map<string, CachedOrganization>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 分鐘
  
  getCachedOrganization(orgId: string): Organization | null {
    const cached = this.cache.get(orgId);
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }
    return null;
  }
  
  setCachedOrganization(orgId: string, organization: Organization): void {
    this.cache.set(orgId, {
      data: organization,
      timestamp: Date.now()
    });
  }
  
  private isCacheValid(cached: CachedOrganization): boolean {
    return Date.now() - cached.timestamp < this.CACHE_DURATION;
  }
}

interface CachedOrganization {
  data: Organization;
  timestamp: number;
}
```

### 懶加載策略
```typescript
const organizationRoutes: Routes = [
  {
    path: 'org/:orgSlug',
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)
  }
];
```

## 🔄 狀態管理

### NgRx 狀態結構
```typescript
export interface OrganizationState {
  currentOrganization: Organization | null;
  userOrganizations: Organization[];
  loading: boolean;
  error: string | null;
}

export const initialState: OrganizationState = {
  currentOrganization: null,
  userOrganizations: [],
  loading: false,
  error: null
};

export const organizationReducer = createReducer(
  initialState,
  on(OrganizationActions.loadOrganization, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(OrganizationActions.loadOrganizationSuccess, (state, { organization }) => ({
    ...state,
    currentOrganization: organization,
    loading: false,
    error: null
  })),
  on(OrganizationActions.loadOrganizationFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
// 組織管理 API
interface OrganizationApi {
  // 創建組織
  POST /api/organizations
  // 獲取組織列表
  GET /api/organizations
  // 獲取組織詳情
  GET /api/organizations/{orgId}
  // 更新組織
  PATCH /api/organizations/{orgId}
  // 刪除組織
  DELETE /api/organizations/{orgId}
  // 獲取組織統計
  GET /api/organizations/{orgId}/stats
  // 獲取組織成員
  GET /api/organizations/{orgId}/members
  // 邀請成員
  POST /api/organizations/{orgId}/invitations
  // 更新成員角色
  PATCH /api/organizations/{orgId}/members/{memberId}
  // 移除成員
  DELETE /api/organizations/{orgId}/members/{memberId}
}

// 請求/響應類型
interface CreateOrganizationRequest {
  name: string;
  description?: string;
  type: OrganizationType;
  visibility: OrganizationVisibility;
}

interface UpdateOrganizationRequest {
  name?: string;
  description?: string;
  avatar?: string;
  settings?: Partial<OrganizationSettings>;
}

interface InviteMemberRequest {
  email: string;
  role: OrganizationRole;
  message?: string;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const organizationConfig = {
  maxOrganizationsPerUser: parseInt(process.env.MAX_ORGS_PER_USER || '10'),
  maxMembersPerOrganization: parseInt(process.env.MAX_MEMBERS_PER_ORG || '1000'),
  organizationNameMaxLength: parseInt(process.env.ORG_NAME_MAX_LENGTH || '50'),
  enableOrganizationDeletion: process.env.ENABLE_ORG_DELETION === 'true',
  defaultOrganizationType: process.env.DEFAULT_ORG_TYPE || 'personal'
};
```

### 數據庫索引
```sql
-- 組織表索引
CREATE INDEX idx_organizations_slug ON organizations(slug);
CREATE INDEX idx_organizations_type ON organizations(type);
CREATE INDEX idx_organizations_created_at ON organizations(created_at);

-- 組織成員表索引
CREATE INDEX idx_organization_members_org_id ON organization_members(organization_id);
CREATE INDEX idx_organization_members_user_id ON organization_members(user_id);
CREATE INDEX idx_organization_members_role ON organization_members(role);
CREATE INDEX idx_organization_members_status ON organization_members(status);
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