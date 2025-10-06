# 4️⃣ 權限控制模組

## 📋 模組概述

權限控制模組是整個組織管理系統的安全核心，負責實現基於角色和屬性的細粒度權限控制。此模組為所有其他模組提供統一的權限管理基礎，確保系統安全性和合規性。

### 🎯 功能目標
- 實現基於角色的訪問控制（RBAC）
- 支持基於屬性的訪問控制（ABAC）
- 提供細粒度的資源級權限管理
- 實現權限繼承和委派機制
- 支持動態權限調整和審計

## 🏗️ 功能架構

### 核心功能
```
權限控制模組
├── 角色管理
│   ├── 角色定義與創建
│   ├── 角色層級結構
│   ├── 角色權限分配
│   └── 角色繼承關係
├── 權限管理
│   ├── 資源權限定義
│   ├── 操作權限配置
│   ├── 條件權限設置
│   └── 權限組合規則
├── 訪問控制
│   ├── 身份驗證
│   ├── 授權檢查
│   ├── 權限驗證
│   └── 訪問決策
└── 權限審計
    ├── 權限變更記錄
    ├── 訪問日誌追蹤
    ├── 異常訪問檢測
    └── 合規性報告
```

## 📊 數據結構設計

### 權限實體 (Permission)
```typescript
interface Permission {
  id: string;                           // 權限唯一標識
  name: string;                         // 權限名稱
  code: string;                         // 權限代碼
  description?: string;                 // 權限描述
  resourceType: ResourceType;           // 資源類型
  actions: PermissionAction[];          // 允許的操作
  conditions?: PermissionCondition[];   // 權限條件
  isSystem: boolean;                    // 是否為系統權限
  organizationId: string;               // 所屬組織
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum ResourceType {
  ORGANIZATION = 'organization',         // 組織資源
  TEAM = 'team',                        // 團隊資源
  PROJECT = 'project',                  // 項目資源
  MEMBER = 'member',                    // 成員資源
  REPOSITORY = 'repository',            // 倉庫資源
  SETTINGS = 'settings',                // 設置資源
  AUDIT = 'audit',                      // 審計資源
  BILLING = 'billing'                   // 計費資源
}

enum PermissionAction {
  CREATE = 'create',                    // 創建
  READ = 'read',                        // 讀取
  UPDATE = 'update',                    // 更新
  DELETE = 'delete',                    // 刪除
  INVITE = 'invite',                    // 邀請
  REMOVE = 'remove',                    // 移除
  MANAGE = 'manage',                    // 管理
  ADMIN = 'admin'                       // 管理員
}

interface PermissionCondition {
  field: string;                        // 條件字段
  operator: Operator;                   // 操作符
  value: any;                          // 條件值
  type: ConditionType;                 // 條件類型
}

enum Operator {
  EQUALS = 'equals',                    // 等於
  NOT_EQUALS = 'not_equals',           // 不等於
  IN = 'in',                           // 包含
  NOT_IN = 'not_in',                   // 不包含
  GREATER_THAN = 'greater_than',       // 大於
  LESS_THAN = 'less_than',             // 小於
  CONTAINS = 'contains',               // 包含字符串
  STARTS_WITH = 'starts_with',         // 以...開始
  ENDS_WITH = 'ends_with'              // 以...結束
}

enum ConditionType {
  USER_ATTRIBUTE = 'user_attribute',    // 用戶屬性
  RESOURCE_ATTRIBUTE = 'resource_attribute', // 資源屬性
  CONTEXT_ATTRIBUTE = 'context_attribute',   // 上下文屬性
  TIME_BASED = 'time_based',           // 時間條件
  LOCATION_BASED = 'location_based'    // 位置條件
}
```

### 角色實體 (Role)
```typescript
interface Role {
  id: string;                           // 角色唯一標識
  name: string;                         // 角色名稱
  code: string;                         // 角色代碼
  description?: string;                 // 角色描述
  type: RoleType;                       // 角色類型
  level: number;                        // 角色層級
  permissions: string[];                // 權限ID列表
  parentRoleId?: string;                // 父角色ID
  organizationId: string;               // 所屬組織
  isSystem: boolean;                    // 是否為系統角色
  isActive: boolean;                    // 是否啟用
  metadata?: Record<string, any>;       // 角色元數據
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum RoleType {
  ORGANIZATION = 'organization',        // 組織角色
  TEAM = 'team',                       // 團隊角色
  PROJECT = 'project',                 // 項目角色
  SYSTEM = 'system'                    // 系統角色
}

// 預定義角色
const PREDEFINED_ROLES = {
  ORGANIZATION_OWNER: {
    name: '組織擁有者',
    code: 'org_owner',
    level: 100,
    permissions: ['*'] // 所有權限
  },
  ORGANIZATION_ADMIN: {
    name: '組織管理員',
    code: 'org_admin',
    level: 90,
    permissions: ['org:manage', 'team:manage', 'member:manage']
  },
  TEAM_LEAD: {
    name: '團隊領導',
    code: 'team_lead',
    level: 80,
    permissions: ['team:manage', 'member:invite', 'project:manage']
  },
  MEMBER: {
    name: '成員',
    code: 'member',
    level: 10,
    permissions: ['org:read', 'team:read', 'project:read']
  }
};
```

### 權限分配實體 (PermissionAssignment)
```typescript
interface PermissionAssignment {
  id: string;                           // 分配唯一標識
  subjectType: SubjectType;             // 主體類型
  subjectId: string;                    // 主體ID
  resourceType: ResourceType;           // 資源類型
  resourceId?: string;                  // 資源ID（可選）
  permission: string;                   // 權限ID
  granted: boolean;                     // 是否授予
  conditions?: PermissionCondition[];   // 額外條件
  expiresAt?: Date;                     // 過期時間
  grantedBy: string;                    // 授予者
  grantedAt: Date;                      // 授予時間
  organizationId: string;               // 所屬組織
}

enum SubjectType {
  USER = 'user',                        // 用戶
  ROLE = 'role',                       // 角色
  TEAM = 'team'                        // 團隊
}
```

## 🧩 Angular 組件設計

### 權限管理主組件
```typescript
@Component({
  selector: 'app-permission-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzTabsModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzInputModule,
    NzTagModule,
    NzSwitchModule,
    NzPopconfirmModule,
    NzMessageModule,
    STModule,
    SEModule
  ],
  template: `
    <nz-card>
      <nz-tabset nzTabPosition="top">
        <!-- 角色管理 -->
        <nz-tab nzTitle="角色管理">
          <app-role-management></app-role-management>
        </nz-tab>
        
        <!-- 權限管理 -->
        <nz-tab nzTitle="權限管理">
          <app-permission-list></app-permission-list>
        </nz-tab>
        
        <!-- 權限分配 -->
        <nz-tab nzTitle="權限分配">
          <app-permission-assignment></app-permission-assignment>
        </nz-tab>
        
        <!-- 權限審計 -->
        <nz-tab nzTitle="權限審計">
          <app-permission-audit></app-permission-audit>
        </nz-tab>
      </nz-tabset>
    </nz-card>
  `
})
export class PermissionManagementComponent {
  private readonly permissionService = inject(PermissionService);
  private readonly aclService = inject(ACLService);
  
  ngOnInit() {
    this.loadPermissions();
  }
  
  private loadPermissions() {
    this.permissionService.getPermissions().subscribe();
  }
}
```

### 角色管理組件
```typescript
@Component({
  selector: 'app-role-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, STModule, SEModule],
  template: `
    <div class="role-management">
      <se-container>
        <se label="角色名稱">
          <input nz-input [(ngModel)]="searchForm.name" placeholder="搜索角色名稱" />
        </se>
        <se label="角色類型">
          <nz-select [(ngModel)]="searchForm.type" nzAllowClear>
            <nz-option nzValue="organization" nzLabel="組織角色"></nz-option>
            <nz-option nzValue="team" nzLabel="團隊角色"></nz-option>
            <nz-option nzValue="project" nzLabel="項目角色"></nz-option>
          </nz-select>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="search()">搜索</button>
          <button nz-button (click)="reset()">重置</button>
          <button nz-button nzType="primary" (click)="createRole()">創建角色</button>
        </se>
      </se-container>
      
      <st
        [data]="roles"
        [columns]="columns"
        [page]="{ front: false, show: true, showSize: true }"
        (change)="onTableChange($event)"
        (refresh)="loadRoles()">
      </st>
    </div>
  `
})
export class RoleManagementComponent implements OnInit {
  private readonly roleService = inject(RoleService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  searchForm = {
    name: '',
    type: null
  };
  
  roles: Role[] = [];
  columns: STColumn[] = [
    { title: '角色名稱', index: 'name', width: 150 },
    { title: '角色代碼', index: 'code', width: 120 },
    { title: '角色類型', index: 'type', width: 100, type: 'tag' },
    { title: '層級', index: 'level', width: 80 },
    { title: '權限數量', index: 'permissions.length', width: 100 },
    { title: '狀態', index: 'isActive', width: 80, type: 'yn' },
    { title: '創建時間', index: 'createdAt', width: 150, type: 'date' },
    {
      title: '操作',
      width: 200,
      buttons: [
        {
          text: '編輯',
          click: (record: Role) => this.editRole(record)
        },
        {
          text: '權限',
          click: (record: Role) => this.managePermissions(record)
        },
        {
          text: '刪除',
          pop: true,
          popTitle: '確定要刪除這個角色嗎？',
          click: (record: Role) => this.deleteRole(record)
        }
      ]
    }
  ];
  
  ngOnInit() {
    this.loadRoles();
  }
  
  loadRoles() {
    this.roleService.getRoles(this.searchForm).subscribe({
      next: (roles) => this.roles = roles,
      error: (error) => this.message.error('載入角色失敗')
    });
  }
  
  createRole() {
    this.modal.create({
      nzTitle: '創建角色',
      nzContent: AppCreateRoleModalComponent,
      nzFooter: null,
      nzWidth: 600,
      nzOnOk: () => {
        this.loadRoles();
        return true;
      }
    });
  }
  
  editRole(role: Role) {
    this.modal.create({
      nzTitle: '編輯角色',
      nzContent: AppEditRoleModalComponent,
      nzComponentParams: { role },
      nzFooter: null,
      nzWidth: 600,
      nzOnOk: () => {
        this.loadRoles();
        return true;
      }
    });
  }
  
  managePermissions(role: Role) {
    this.modal.create({
      nzTitle: `管理角色權限 - ${role.name}`,
      nzContent: AppRolePermissionModalComponent,
      nzComponentParams: { role },
      nzFooter: null,
      nzWidth: 800,
      nzOnOk: () => {
        this.loadRoles();
        return true;
      }
    });
  }
  
  deleteRole(role: Role) {
    this.roleService.deleteRole(role.id).subscribe({
      next: () => {
        this.message.success('角色刪除成功');
        this.loadRoles();
      },
      error: (error) => this.message.error('角色刪除失敗')
    });
  }
  
  search() {
    this.loadRoles();
  }
  
  reset() {
    this.searchForm = { name: '', type: null };
    this.loadRoles();
  }
  
  onTableChange(event: STChange) {
    // 處理表格變化
  }
}
```

### 權限檢查組件
```typescript
@Component({
  selector: 'app-permission-check',
  standalone: true,
  imports: [CommonModule, ACLModule],
  template: `
    <div *aclIf="permission" class="permission-check">
      <ng-content></ng-content>
    </div>
  `
})
export class PermissionCheckComponent implements OnInit {
  @Input() permission!: string;
  @Input() resourceId?: string;
  @Input() conditions?: PermissionCondition[];
  
  private readonly permissionService = inject(PermissionService);
  private readonly aclService = inject(ACLService);
  
  hasPermission = false;
  
  ngOnInit() {
    this.checkPermission();
  }
  
  private checkPermission() {
    this.permissionService.checkPermission({
      permission: this.permission,
      resourceId: this.resourceId,
      conditions: this.conditions
    }).subscribe({
      next: (result) => {
        this.hasPermission = result.granted;
        // 更新ACL服務
        if (result.granted) {
          this.aclService.attachRole([this.permission]);
        }
      }
    });
  }
}
```

## 🔧 服務層設計

### 權限服務 (PermissionService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private readonly http = inject(_HttpClient);
  private readonly aclService = inject(ACLService);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/permissions';
  
  // 獲取所有權限
  getPermissions(params?: any): Observable<Permission[]> {
    const cacheKey = `permissions_${JSON.stringify(params)}`;
    return this.cache.get(cacheKey, () => 
      this.http.get<Permission[]>(this.API_BASE, { params })
    );
  }
  
  // 獲取權限詳情
  getPermission(id: string): Observable<Permission> {
    return this.http.get<Permission>(`${this.API_BASE}/${id}`);
  }
  
  // 創建權限
  createPermission(permission: Partial<Permission>): Observable<Permission> {
    return this.http.post<Permission>(this.API_BASE, permission).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新權限
  updatePermission(id: string, permission: Partial<Permission>): Observable<Permission> {
    return this.http.put<Permission>(`${this.API_BASE}/${id}`, permission).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 刪除權限
  deletePermission(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 檢查權限
  checkPermission(request: PermissionCheckRequest): Observable<PermissionCheckResult> {
    return this.http.post<PermissionCheckResult>(`${this.API_BASE}/check`, request);
  }
  
  // 獲取用戶權限
  getUserPermissions(userId: string, resourceId?: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.API_BASE}/user/${userId}`, {
      params: resourceId ? { resourceId } : {}
    });
  }
  
  // 分配權限
  assignPermission(assignment: PermissionAssignment): Observable<void> {
    return this.http.post<void>(`${this.API_BASE}/assign`, assignment).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 撤銷權限
  revokePermission(assignmentId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/assign/${assignmentId}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 獲取權限樹
  getPermissionTree(): Observable<PermissionTreeNode[]> {
    return this.cache.get('permission_tree', () =>
      this.http.get<PermissionTreeNode[]>(`${this.API_BASE}/tree`)
    );
  }
}

interface PermissionCheckRequest {
  permission: string;
  resourceId?: string;
  conditions?: PermissionCondition[];
  context?: Record<string, any>;
}

interface PermissionCheckResult {
  granted: boolean;
  reason?: string;
  conditions?: PermissionCondition[];
}

interface PermissionTreeNode {
  id: string;
  name: string;
  code: string;
  children?: PermissionTreeNode[];
  permissions?: Permission[];
}
```

### 角色服務 (RoleService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/roles';
  
  // 獲取角色列表
  getRoles(params?: any): Observable<Role[]> {
    const cacheKey = `roles_${JSON.stringify(params)}`;
    return this.cache.get(cacheKey, () =>
      this.http.get<Role[]>(this.API_BASE, { params })
    );
  }
  
  // 獲取角色詳情
  getRole(id: string): Observable<Role> {
    return this.http.get<Role>(`${this.API_BASE}/${id}`);
  }
  
  // 創建角色
  createRole(role: Partial<Role>): Observable<Role> {
    return this.http.post<Role>(this.API_BASE, role).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新角色
  updateRole(id: string, role: Partial<Role>): Observable<Role> {
    return this.http.put<Role>(`${this.API_BASE}/${id}`, role).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 刪除角色
  deleteRole(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新角色權限
  updateRolePermissions(roleId: string, permissions: string[]): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/${roleId}/permissions`, { permissions }).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 獲取角色權限
  getRolePermissions(roleId: string): Observable<Permission[]> {
    return this.http.get<Permission[]>(`${this.API_BASE}/${roleId}/permissions`);
  }
  
  // 複製角色
  cloneRole(roleId: string, newName: string): Observable<Role> {
    return this.http.post<Role>(`${this.API_BASE}/${roleId}/clone`, { name: newName }).pipe(
      tap(() => this.cache.clear())
    );
  }
}
```

## 🔐 權限控制邏輯

### 權限檢查守衛
```typescript
@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate, CanActivateChild {
  private readonly permissionService = inject(PermissionService);
  private readonly router = inject(Router);
  
  constructor(
    @Optional() @Inject('PERMISSION') private permission: string,
    @Optional() @Inject('RESOURCE_ID') private resourceId: string
  ) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkPermission(route, state);
  }
  
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkPermission(childRoute, state);
  }
  
  private checkPermission(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const permission = route.data['permission'] || this.permission;
    const resourceId = route.params['id'] || route.queryParams['resourceId'] || this.resourceId;
    
    if (!permission) {
      return of(true);
    }
    
    return this.permissionService.checkPermission({
      permission,
      resourceId,
      context: {
        route: state.url,
        method: 'GET'
      }
    }).pipe(
      map(result => {
        if (!result.granted) {
          this.router.navigate(['/exception/403']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/exception/403']);
        return of(false);
      })
    );
  }
}
```

### 權限指令
```typescript
@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective implements OnInit, OnDestroy {
  @Input() appPermission!: string;
  @Input() appResourceId?: string;
  @Input() appConditions?: PermissionCondition[];
  
  private readonly permissionService = inject(PermissionService);
  private readonly templateRef = inject(TemplateRef<any>);
  private readonly viewContainer = inject(ViewContainerRef);
  
  private subscription?: Subscription;
  private hasPermission = false;
  
  ngOnInit() {
    this.checkPermission();
  }
  
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  
  private checkPermission() {
    this.subscription = this.permissionService.checkPermission({
      permission: this.appPermission,
      resourceId: this.appResourceId,
      conditions: this.appConditions
    }).subscribe({
      next: (result) => {
        this.hasPermission = result.granted;
        this.updateView();
      }
    });
  }
  
  private updateView() {
    if (this.hasPermission) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
```

## 🎨 UI/UX 設計

### 權限樹組件
```typescript
@Component({
  selector: 'app-permission-tree',
  standalone: true,
  imports: [CommonModule, NzTreeModule, NzCheckboxModule],
  template: `
    <nz-tree
      [nzData]="treeData"
      [nzCheckable]="true"
      [nzCheckedKeys]="checkedKeys"
      [nzSelectedKeys]="selectedKeys"
      [nzExpandedKeys]="expandedKeys"
      (nzCheckBoxChange)="onCheckBoxChange($event)"
      (nzClick)="onNodeClick($event)">
    </nz-tree>
  `
})
export class PermissionTreeComponent implements OnInit {
  @Input() permissions: Permission[] = [];
  @Input() selectedPermissions: string[] = [];
  @Output() permissionChange = new EventEmitter<string[]>();
  
  treeData: NzTreeNodeOptions[] = [];
  checkedKeys: string[] = [];
  selectedKeys: string[] = [];
  expandedKeys: string[] = [];
  
  ngOnInit() {
    this.buildTree();
  }
  
  private buildTree() {
    const grouped = this.groupPermissionsByResource();
    this.treeData = this.buildTreeNode(grouped);
    this.checkedKeys = [...this.selectedPermissions];
  }
  
  private groupPermissionsByResource(): Record<string, Permission[]> {
    return this.permissions.reduce((acc, permission) => {
      const resource = permission.resourceType;
      if (!acc[resource]) {
        acc[resource] = [];
      }
      acc[resource].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
  }
  
  private buildTreeNode(grouped: Record<string, Permission[]>): NzTreeNodeOptions[] {
    return Object.entries(grouped).map(([resource, permissions]) => ({
      title: this.getResourceLabel(resource),
      key: resource,
      children: permissions.map(permission => ({
        title: permission.name,
        key: permission.id,
        isLeaf: true
      }))
    }));
  }
  
  private getResourceLabel(resource: string): string {
    const labels: Record<string, string> = {
      organization: '組織管理',
      team: '團隊管理',
      project: '項目管理',
      member: '成員管理',
      repository: '倉庫管理',
      settings: '設置管理',
      audit: '審計管理',
      billing: '計費管理'
    };
    return labels[resource] || resource;
  }
  
  onCheckBoxChange(event: NzFormatEmitEvent) {
    this.checkedKeys = event.checkedKeys as string[];
    this.permissionChange.emit(this.checkedKeys);
  }
  
  onNodeClick(event: NzFormatEmitEvent) {
    this.selectedKeys = event.selectedKeys as string[];
  }
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('PermissionService', () => {
  let service: PermissionService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PermissionService]
    });
    service = TestBed.inject(PermissionService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should check permission successfully', () => {
    const request: PermissionCheckRequest = {
      permission: 'org:manage',
      resourceId: 'org-1'
    };
    const expectedResult: PermissionCheckResult = {
      granted: true
    };
    
    service.checkPermission(request).subscribe(result => {
      expect(result.granted).toBe(true);
    });
    
    const req = httpMock.expectOne('/api/permissions/check');
    expect(req.request.method).toBe('POST');
    req.flush(expectedResult);
  });
  
  it('should handle permission check error', () => {
    const request: PermissionCheckRequest = {
      permission: 'org:manage'
    };
    
    service.checkPermission(request).subscribe({
      next: () => fail('should have failed'),
      error: (error) => expect(error).toBeTruthy()
    });
    
    const req = httpMock.expectOne('/api/permissions/check');
    req.flush('Error', { status: 500, statusText: 'Internal Server Error' });
  });
});

describe('PermissionGuard', () => {
  let guard: PermissionGuard;
  let permissionService: jasmine.SpyObj<PermissionService>;
  let router: jasmine.SpyObj<Router>;
  
  beforeEach(() => {
    const permissionSpy = jasmine.createSpyObj('PermissionService', ['checkPermission']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    TestBed.configureTestingModule({
      providers: [
        PermissionGuard,
        { provide: PermissionService, useValue: permissionSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });
    
    guard = TestBed.inject(PermissionGuard);
    permissionService = TestBed.inject(PermissionService) as jasmine.SpyObj<PermissionService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });
  
  it('should allow access when permission is granted', () => {
    permissionService.checkPermission.and.returnValue(of({ granted: true }));
    const route = { data: { permission: 'org:manage' } } as ActivatedRouteSnapshot;
    
    guard.canActivate(route, {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toBe(true);
    });
  });
  
  it('should deny access when permission is denied', () => {
    permissionService.checkPermission.and.returnValue(of({ granted: false }));
    const route = { data: { permission: 'org:manage' } } as ActivatedRouteSnapshot;
    
    guard.canActivate(route, {} as RouterStateSnapshot).subscribe(result => {
      expect(result).toBe(false);
      expect(router.navigate).toHaveBeenCalledWith(['/exception/403']);
    });
  });
});
```

### 集成測試
```typescript
describe('Permission Management Integration', () => {
  let fixture: ComponentFixture<PermissionManagementComponent>;
  let component: PermissionManagementComponent;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermissionManagementComponent],
      providers: [
        { provide: PermissionService, useClass: MockPermissionService }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(PermissionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should load permissions on init', () => {
    expect(component.permissions.length).toBeGreaterThan(0);
  });
  
  it('should create role successfully', () => {
    const newRole = {
      name: 'Test Role',
      code: 'test_role',
      type: RoleType.ORGANIZATION
    };
    
    component.createRole(newRole);
    fixture.detectChanges();
    
    expect(component.roles.find(r => r.code === 'test_role')).toBeTruthy();
  });
});
```

## ⚡ 性能優化

### 權限緩存策略
```typescript
@Injectable({
  providedIn: 'root'
})
export class PermissionCacheService {
  private readonly cache = inject(DelonCacheService);
  private readonly CACHE_KEY = 'permission_cache';
  private readonly CACHE_EXPIRE = 30 * 60 * 1000; // 30分鐘
  
  // 緩存權限檢查結果
  cachePermissionCheck(request: PermissionCheckRequest, result: PermissionCheckResult): void {
    const key = this.generateCacheKey(request);
    this.cache.set(key, result, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的權限檢查結果
  getCachedPermissionCheck(request: PermissionCheckRequest): PermissionCheckResult | null {
    const key = this.generateCacheKey(request);
    return this.cache.get(key);
  }
  
  // 清除權限緩存
  clearPermissionCache(): void {
    this.cache.remove(this.CACHE_KEY);
  }
  
  // 預載入常用權限
  preloadCommonPermissions(userId: string): Observable<void> {
    const commonPermissions = ['org:read', 'team:read', 'project:read'];
    const requests = commonPermissions.map(permission => ({
      permission,
      resourceId: undefined
    }));
    
    return forkJoin(
      requests.map(request => 
        this.permissionService.checkPermission(request).pipe(
          tap(result => this.cachePermissionCheck(request, result))
        )
      )
    ).pipe(map(() => void 0));
  }
  
  private generateCacheKey(request: PermissionCheckRequest): string {
    return `${this.CACHE_KEY}_${request.permission}_${request.resourceId || 'global'}`;
  }
}
```

### 權限檢查優化
```typescript
@Injectable({
  providedIn: 'root'
})
export class OptimizedPermissionService {
  private readonly permissionService = inject(PermissionService);
  private readonly cache = inject(PermissionCacheService);
  
  // 批量權限檢查
  checkMultiplePermissions(requests: PermissionCheckRequest[]): Observable<PermissionCheckResult[]> {
    const cachedResults: PermissionCheckResult[] = [];
    const uncachedRequests: PermissionCheckRequest[] = [];
    
    // 分離緩存和非緩存請求
    requests.forEach((request, index) => {
      const cached = this.cache.getCachedPermissionCheck(request);
      if (cached) {
        cachedResults[index] = cached;
      } else {
        uncachedRequests.push(request);
      }
    });
    
    if (uncachedRequests.length === 0) {
      return of(cachedResults);
    }
    
    // 批量檢查未緩存的權限
    return this.permissionService.checkMultiplePermissions(uncachedRequests).pipe(
      map(results => {
        // 合併結果
        let uncachedIndex = 0;
        return cachedResults.map((cached, index) => {
          if (cached) {
            return cached;
          }
          const result = results[uncachedIndex++];
          this.cache.cachePermissionCheck(uncachedRequests[uncachedIndex - 1], result);
          return result;
        });
      })
    );
  }
  
  // 異步權限檢查
  checkPermissionAsync(request: PermissionCheckRequest): Observable<boolean> {
    return this.permissionService.checkPermission(request).pipe(
      map(result => result.granted),
      shareReplay(1)
    );
  }
}
```

## 📈 狀態管理

### 權限狀態 (PermissionState)
```typescript
export interface PermissionState {
  permissions: Permission[];
  roles: Role[];
  assignments: PermissionAssignment[];
  currentUserPermissions: string[];
  loading: boolean;
  error: string | null;
}

export const initialPermissionState: PermissionState = {
  permissions: [],
  roles: [],
  assignments: [],
  currentUserPermissions: [],
  loading: false,
  error: null
};

export const permissionReducer = createReducer(
  initialPermissionState,
  on(PermissionActions.loadPermissions, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(PermissionActions.loadPermissionsSuccess, (state, { permissions }) => ({
    ...state,
    permissions,
    loading: false
  })),
  on(PermissionActions.loadPermissionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(PermissionActions.updateUserPermissions, (state, { permissions }) => ({
    ...state,
    currentUserPermissions: permissions
  }))
);

export const permissionFeature = createFeature({
  name: 'permission',
  reducer: permissionReducer
});
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// 權限管理 API
GET    /api/permissions                    // 獲取權限列表
GET    /api/permissions/:id                // 獲取權限詳情
POST   /api/permissions                    // 創建權限
PUT    /api/permissions/:id                // 更新權限
DELETE /api/permissions/:id                // 刪除權限
POST   /api/permissions/check              // 檢查權限
GET    /api/permissions/tree               // 獲取權限樹
GET    /api/permissions/user/:userId       // 獲取用戶權限

// 角色管理 API
GET    /api/roles                          // 獲取角色列表
GET    /api/roles/:id                      // 獲取角色詳情
POST   /api/roles                          // 創建角色
PUT    /api/roles/:id                      // 更新角色
DELETE /api/roles/:id                      // 刪除角色
PUT    /api/roles/:id/permissions          // 更新角色權限
GET    /api/roles/:id/permissions          // 獲取角色權限
POST   /api/roles/:id/clone                // 複製角色

// 權限分配 API
POST   /api/permissions/assign             // 分配權限
DELETE /api/permissions/assign/:id         // 撤銷權限
GET    /api/permissions/assignments        // 獲取權限分配列表
```

## 🔒 部署考慮

### 環境變量配置
```typescript
// 權限系統配置
PERMISSION_CACHE_TTL=1800                 // 權限緩存過期時間（秒）
PERMISSION_BATCH_SIZE=100                 // 批量權限檢查大小
PERMISSION_AUDIT_ENABLED=true             // 啟用權限審計
PERMISSION_STRICT_MODE=false              // 嚴格權限模式

// 安全配置
PERMISSION_ENCRYPTION_KEY=                // 權限數據加密密鑰
PERMISSION_SESSION_TIMEOUT=3600           // 權限會話超時時間
PERMISSION_MAX_ATTEMPTS=5                 // 最大權限檢查嘗試次數
```

### 數據庫遷移
```sql
-- 創建權限表
CREATE TABLE permissions (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  resource_type VARCHAR(50) NOT NULL,
  actions JSON NOT NULL,
  conditions JSON,
  is_system BOOLEAN DEFAULT FALSE,
  organization_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_resource_type (resource_type),
  INDEX idx_organization_id (organization_id),
  INDEX idx_code (code)
);

-- 創建角色表
CREATE TABLE roles (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  type VARCHAR(50) NOT NULL,
  level INT NOT NULL,
  permissions JSON NOT NULL,
  parent_role_id VARCHAR(36),
  organization_id VARCHAR(36) NOT NULL,
  is_system BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_organization_id (organization_id),
  INDEX idx_type (type),
  INDEX idx_level (level),
  FOREIGN KEY (parent_role_id) REFERENCES roles(id)
);

-- 創建權限分配表
CREATE TABLE permission_assignments (
  id VARCHAR(36) PRIMARY KEY,
  subject_type VARCHAR(50) NOT NULL,
  subject_id VARCHAR(36) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(36),
  permission VARCHAR(36) NOT NULL,
  granted BOOLEAN NOT NULL DEFAULT TRUE,
  conditions JSON,
  expires_at TIMESTAMP,
  granted_by VARCHAR(36) NOT NULL,
  granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  organization_id VARCHAR(36) NOT NULL,
  INDEX idx_subject (subject_type, subject_id),
  INDEX idx_resource (resource_type, resource_id),
  INDEX idx_permission (permission),
  INDEX idx_organization_id (organization_id),
  FOREIGN KEY (permission) REFERENCES permissions(id)
);
```

## 📊 成功指標

### 功能指標
- [ ] 支持 1000+ 並發權限檢查
- [ ] 權限檢查響應時間 < 100ms
- [ ] 支持 50+ 種資源類型
- [ ] 支持 20+ 種操作類型
- [ ] 100% 權限審計覆蓋

### 性能指標
- [ ] 權限緩存命中率 > 90%
- [ ] 批量權限檢查支持 100+ 並發
- [ ] 權限樹載入時間 < 500ms
- [ ] 支持水平擴展

### 安全指標
- [ ] 通過權限滲透測試
- [ ] 零權限提升漏洞
- [ ] 完整的權限變更審計
- [ ] 支持權限加密存儲

---

**📝 注意**: 本模組是整個系統的安全核心，需要與 Firebase Auth 和 ACL 服務深度集成，確保權限控制的準確性和性能。