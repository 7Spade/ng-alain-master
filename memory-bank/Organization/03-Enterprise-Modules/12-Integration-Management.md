# 🔗 集成管理模組

## 📋 概述

集成管理模組負責管理與第三方服務的集成，提供統一的集成接口和數據同步機制，支持多種外部系統的無縫連接。

### 🎯 模組目標
- 提供統一的第三方服務集成框架
- 實現數據同步和轉換機制
- 支持集成監控和故障處理
- 提供集成配置和管理功能

## 🏗️ 功能架構

### 核心功能
```
集成管理功能
├── 集成配置管理
│   ├── 第三方服務配置
│   ├── 認證信息管理
│   ├── 數據映射配置
│   └── 同步規則設置
├── 數據同步引擎
│   ├── 實時數據同步
│   ├── 批量數據同步
│   ├── 增量數據同步
│   └── 數據轉換處理
├── 集成監控
│   ├── 集成狀態監控
│   ├── 數據同步監控
│   ├── 錯誤日誌記錄
│   └── 性能指標統計
└── 集成管理
    ├── 集成啟用/禁用
    ├── 集成版本管理
    ├── 集成測試工具
    └── 集成文檔生成
```

## 📊 數據結構

### 核心實體
```typescript
// 集成配置
export interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  status: IntegrationStatus;
  config: IntegrationConfig;
  mappings: DataMapping[];
  syncRules: SyncRule[];
  statistics: IntegrationStatistics;
  createdAt: Date;
  updatedAt: Date;
}

// 集成類型
export enum IntegrationType {
  GITHUB = 'github',
  GITLAB = 'gitlab',
  BITBUCKET = 'bitbucket',
  JIRA = 'jira',
  SLACK = 'slack',
  MICROSOFT_TEAMS = 'microsoft_teams',
  GOOGLE_WORKSPACE = 'google_workspace',
  SALESFORCE = 'salesforce',
  CUSTOM = 'custom'
}

// 集成狀態
export enum IntegrationStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ERROR = 'error',
  SYNCING = 'syncing',
  MAINTENANCE = 'maintenance'
}

// 集成配置
export interface IntegrationConfig {
  baseUrl: string;
  apiVersion: string;
  authentication: AuthenticationConfig;
  rateLimits: RateLimitConfig;
  timeout: number;
  retries: number;
  webhookUrl?: string;
  customHeaders?: Record<string, string>;
}

// 認證配置
export interface AuthenticationConfig {
  type: AuthenticationType;
  credentials: {
    apiKey?: string;
    token?: string;
    username?: string;
    password?: string;
    clientId?: string;
    clientSecret?: string;
    refreshToken?: string;
  };
  expiresAt?: Date;
}

// 認證類型
export enum AuthenticationType {
  API_KEY = 'api_key',
  OAUTH2 = 'oauth2',
  BASIC_AUTH = 'basic_auth',
  BEARER_TOKEN = 'bearer_token',
  CUSTOM = 'custom'
}

// 數據映射
export interface DataMapping {
  id: string;
  integrationId: string;
  sourceField: string;
  targetField: string;
  transformation?: TransformationRule;
  isRequired: boolean;
  defaultValue?: any;
  validation?: ValidationRule;
}

// 轉換規則
export interface TransformationRule {
  type: TransformationType;
  parameters: Record<string, any>;
  script?: string;
}

// 轉換類型
export enum TransformationType {
  DIRECT = 'direct',
  FORMAT = 'format',
  LOOKUP = 'lookup',
  CALCULATION = 'calculation',
  SCRIPT = 'script'
}

// 同步規則
export interface SyncRule {
  id: string;
  integrationId: string;
  name: string;
  direction: SyncDirection;
  frequency: SyncFrequency;
  filters: SyncFilter[];
  actions: SyncAction[];
  isEnabled: boolean;
  lastRun?: Date;
  nextRun?: Date;
}

// 同步方向
export enum SyncDirection {
  INBOUND = 'inbound',
  OUTBOUND = 'outbound',
  BIDIRECTIONAL = 'bidirectional'
}

// 同步頻率
export enum SyncFrequency {
  REAL_TIME = 'real_time',
  HOURLY = 'hourly',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MANUAL = 'manual'
}

// 同步過濾器
export interface SyncFilter {
  field: string;
  operator: FilterOperator;
  value: any;
  logicalOperator?: LogicalOperator;
}

// 過濾操作符
export enum FilterOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  IN = 'in',
  NOT_IN = 'not_in'
}

// 邏輯操作符
export enum LogicalOperator {
  AND = 'and',
  OR = 'or'
}

// 同步動作
export interface SyncAction {
  type: SyncActionType;
  target: string;
  parameters: Record<string, any>;
}

// 同步動作類型
export enum SyncActionType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  WEBHOOK = 'webhook',
  EMAIL = 'email'
}

// 集成統計
export interface IntegrationStatistics {
  totalSyncs: number;
  successfulSyncs: number;
  failedSyncs: number;
  lastSyncAt?: Date;
  averageSyncTime: number;
  dataVolume: number;
  errorRate: number;
}

// 集成日誌
export interface IntegrationLog {
  id: string;
  integrationId: string;
  level: LogLevel;
  message: string;
  details?: Record<string, any>;
  timestamp: Date;
  duration?: number;
  status: LogStatus;
}

// 日誌級別
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  FATAL = 'fatal'
}

// 日誌狀態
export enum LogStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
  WARNING = 'warning',
  INFO = 'info'
}
```

## 🎨 Angular 組件

### 核心組件
```typescript
// 集成管理組件
@Component({
  selector: 'app-integration-management',
  template: `
    <nz-card>
      <div nz-row nzGutter="16">
        <div nz-col nzSpan="24">
          <div class="integration-header">
            <h2>集成管理</h2>
            <button nz-button nzType="primary" (click)="createIntegration()">
              <i nz-icon nzType="plus"></i>
              創建集成
            </button>
          </div>
        </div>
      </div>
      
      <nz-tabset>
        <nz-tab nzTitle="集成列表">
          <app-integration-list 
            [integrations]="integrations"
            (edit)="editIntegration($event)"
            (delete)="deleteIntegration($event)"
            (toggle)="toggleIntegration($event)">
          </app-integration-list>
        </nz-tab>
        
        <nz-tab nzTitle="數據映射">
          <app-data-mapping 
            [mappings]="dataMappings"
            (save)="saveDataMapping($event)">
          </app-data-mapping>
        </nz-tab>
        
        <nz-tab nzTitle="同步規則">
          <app-sync-rules 
            [rules]="syncRules"
            (create)="createSyncRule($event)"
            (edit)="editSyncRule($event)"
            (delete)="deleteSyncRule($event)">
          </app-sync-rules>
        </nz-tab>
        
        <nz-tab nzTitle="監控日誌">
          <app-integration-monitor 
            [logs]="integrationLogs"
            [statistics]="integrationStatistics">
          </app-integration-monitor>
        </nz-tab>
      </nz-tabset>
    </nz-card>
  `,
  styles: [`
    .integration-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  `]
})
export class IntegrationManagementComponent implements OnInit {
  integrations: Integration[] = [];
  dataMappings: DataMapping[] = [];
  syncRules: SyncRule[] = [];
  integrationLogs: IntegrationLog[] = [];
  integrationStatistics: IntegrationStatistics[] = [];
  
  constructor(
    private integrationService: IntegrationService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}
  
  ngOnInit(): void {
    this.loadIntegrations();
    this.loadDataMappings();
    this.loadSyncRules();
    this.loadIntegrationLogs();
    this.loadIntegrationStatistics();
  }
  
  // 創建集成
  createIntegration(): void {
    const modalRef = this.modal.create({
      nzTitle: '創建集成',
      nzContent: CreateIntegrationComponent,
      nzWidth: 800,
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadIntegrations();
        this.message.success('集成創建成功');
      }
    });
  }
  
  // 編輯集成
  editIntegration(integration: Integration): void {
    const modalRef = this.modal.create({
      nzTitle: '編輯集成',
      nzContent: EditIntegrationComponent,
      nzWidth: 800,
      nzComponentParams: { integration },
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadIntegrations();
        this.message.success('集成更新成功');
      }
    });
  }
  
  // 刪除集成
  deleteIntegration(integration: Integration): void {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除集成 "${integration.name}" 嗎？`,
      nzOnOk: () => {
        this.integrationService.deleteIntegration(integration.id).subscribe({
          next: () => {
            this.loadIntegrations();
            this.message.success('集成刪除成功');
          },
          error: (error) => this.message.error('刪除失敗：' + error.message)
        });
      }
    });
  }
  
  // 切換集成狀態
  toggleIntegration(integration: Integration): void {
    const action = integration.status === IntegrationStatus.ACTIVE ? '禁用' : '啟用';
    this.modal.confirm({
      nzTitle: `確認${action}`,
      nzContent: `確定要${action}集成 "${integration.name}" 嗎？`,
      nzOnOk: () => {
        this.integrationService.toggleIntegration(integration.id).subscribe({
          next: () => {
            this.loadIntegrations();
            this.message.success(`集成${action}成功`);
          },
          error: (error) => this.message.error(`${action}失敗：` + error.message)
        });
      }
    });
  }
  
  // 創建同步規則
  createSyncRule(rule: SyncRule): void {
    this.integrationService.createSyncRule(rule).subscribe({
      next: () => {
        this.loadSyncRules();
        this.message.success('同步規則創建成功');
      },
      error: (error) => this.message.error('創建失敗：' + error.message)
    });
  }
  
  // 編輯同步規則
  editSyncRule(rule: SyncRule): void {
    const modalRef = this.modal.create({
      nzTitle: '編輯同步規則',
      nzContent: EditSyncRuleComponent,
      nzWidth: 600,
      nzComponentParams: { rule },
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadSyncRules();
        this.message.success('同步規則更新成功');
      }
    });
  }
  
  // 刪除同步規則
  deleteSyncRule(rule: SyncRule): void {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除同步規則 "${rule.name}" 嗎？`,
      nzOnOk: () => {
        this.integrationService.deleteSyncRule(rule.id).subscribe({
          next: () => {
            this.loadSyncRules();
            this.message.success('同步規則刪除成功');
          },
          error: (error) => this.message.error('刪除失敗：' + error.message)
        });
      }
    });
  }
  
  // 保存數據映射
  saveDataMapping(mapping: DataMapping): void {
    this.integrationService.saveDataMapping(mapping).subscribe({
      next: () => {
        this.loadDataMappings();
        this.message.success('數據映射保存成功');
      },
      error: (error) => this.message.error('保存失敗：' + error.message)
    });
  }
  
  // 載入數據
  private loadIntegrations(): void {
    this.integrationService.getIntegrations().subscribe({
      next: (integrations) => this.integrations = integrations,
      error: (error) => this.message.error('載入集成列表失敗：' + error.message)
    });
  }
  
  private loadDataMappings(): void {
    this.integrationService.getDataMappings().subscribe({
      next: (mappings) => this.dataMappings = mappings,
      error: (error) => this.message.error('載入數據映射失敗：' + error.message)
    });
  }
  
  private loadSyncRules(): void {
    this.integrationService.getSyncRules().subscribe({
      next: (rules) => this.syncRules = rules,
      error: (error) => this.message.error('載入同步規則失敗：' + error.message)
    });
  }
  
  private loadIntegrationLogs(): void {
    this.integrationService.getIntegrationLogs().subscribe({
      next: (logs) => this.integrationLogs = logs,
      error: (error) => this.message.error('載入集成日誌失敗：' + error.message)
    });
  }
  
  private loadIntegrationStatistics(): void {
    this.integrationService.getIntegrationStatistics().subscribe({
      next: (statistics) => this.integrationStatistics = statistics,
      error: (error) => this.message.error('載入集成統計失敗：' + error.message)
    });
  }
}
```

## 🔧 服務層

### 集成服務
```typescript
@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private readonly baseUrl = '/api/integrations';
  
  constructor(private http: HttpClient) {}
  
  // 獲取集成列表
  getIntegrations(): Observable<Integration[]> {
    return this.http.get<Integration[]>(this.baseUrl);
  }
  
  // 獲取集成詳情
  getIntegration(id: string): Observable<Integration> {
    return this.http.get<Integration>(`${this.baseUrl}/${id}`);
  }
  
  // 創建集成
  createIntegration(integration: Partial<Integration>): Observable<Integration> {
    return this.http.post<Integration>(this.baseUrl, integration);
  }
  
  // 更新集成
  updateIntegration(id: string, integration: Partial<Integration>): Observable<Integration> {
    return this.http.put<Integration>(`${this.baseUrl}/${id}`, integration);
  }
  
  // 刪除集成
  deleteIntegration(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  // 切換集成狀態
  toggleIntegration(id: string): Observable<Integration> {
    return this.http.post<Integration>(`${this.baseUrl}/${id}/toggle`, {});
  }
  
  // 測試集成連接
  testIntegration(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/${id}/test`, {});
  }
  
  // 獲取數據映射
  getDataMappings(integrationId?: string): Observable<DataMapping[]> {
    const params = integrationId ? { integrationId } : {};
    return this.http.get<DataMapping[]>(`${this.baseUrl}/mappings`, { params });
  }
  
  // 保存數據映射
  saveDataMapping(mapping: DataMapping): Observable<DataMapping> {
    if (mapping.id) {
      return this.http.put<DataMapping>(`${this.baseUrl}/mappings/${mapping.id}`, mapping);
    } else {
      return this.http.post<DataMapping>(`${this.baseUrl}/mappings`, mapping);
    }
  }
  
  // 獲取同步規則
  getSyncRules(integrationId?: string): Observable<SyncRule[]> {
    const params = integrationId ? { integrationId } : {};
    return this.http.get<SyncRule[]>(`${this.baseUrl}/sync-rules`, { params });
  }
  
  // 創建同步規則
  createSyncRule(rule: SyncRule): Observable<SyncRule> {
    return this.http.post<SyncRule>(`${this.baseUrl}/sync-rules`, rule);
  }
  
  // 更新同步規則
  updateSyncRule(id: string, rule: SyncRule): Observable<SyncRule> {
    return this.http.put<SyncRule>(`${this.baseUrl}/sync-rules/${id}`, rule);
  }
  
  // 刪除同步規則
  deleteSyncRule(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/sync-rules/${id}`);
  }
  
  // 執行同步
  executeSync(ruleId: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/sync-rules/${ruleId}/execute`, {});
  }
  
  // 獲取集成日誌
  getIntegrationLogs(integrationId?: string, limit = 100): Observable<IntegrationLog[]> {
    const params: any = { limit };
    if (integrationId) {
      params.integrationId = integrationId;
    }
    return this.http.get<IntegrationLog[]>(`${this.baseUrl}/logs`, { params });
  }
  
  // 獲取集成統計
  getIntegrationStatistics(integrationId?: string): Observable<IntegrationStatistics[]> {
    const params = integrationId ? { integrationId } : {};
    return this.http.get<IntegrationStatistics[]>(`${this.baseUrl}/statistics`, { params });
  }
}
```

## 🔒 權限控制

### 權限配置
```typescript
// 集成管理權限
export const INTEGRATION_PERMISSIONS = {
  // 集成管理權限
  INTEGRATION_MANAGE: 'integration:manage',
  INTEGRATION_VIEW: 'integration:view',
  INTEGRATION_CREATE: 'integration:create',
  INTEGRATION_EDIT: 'integration:edit',
  INTEGRATION_DELETE: 'integration:delete',
  
  // 數據映射權限
  MAPPING_MANAGE: 'integration:mapping:manage',
  MAPPING_VIEW: 'integration:mapping:view',
  MAPPING_CREATE: 'integration:mapping:create',
  MAPPING_EDIT: 'integration:mapping:edit',
  MAPPING_DELETE: 'integration:mapping:delete',
  
  // 同步規則權限
  SYNC_RULE_MANAGE: 'integration:sync:manage',
  SYNC_RULE_VIEW: 'integration:sync:view',
  SYNC_RULE_CREATE: 'integration:sync:create',
  SYNC_RULE_EDIT: 'integration:sync:edit',
  SYNC_RULE_DELETE: 'integration:sync:delete',
  SYNC_RULE_EXECUTE: 'integration:sync:execute',
  
  // 監控日誌權限
  LOG_VIEW: 'integration:log:view',
  STATISTICS_VIEW: 'integration:statistics:view'
};

// 角色權限映射
export const INTEGRATION_ROLE_PERMISSIONS = {
  [OrganizationRole.OWNER]: Object.values(INTEGRATION_PERMISSIONS),
  [OrganizationRole.ADMIN]: [
    INTEGRATION_PERMISSIONS.INTEGRATION_MANAGE,
    INTEGRATION_PERMISSIONS.INTEGRATION_VIEW,
    INTEGRATION_PERMISSIONS.INTEGRATION_CREATE,
    INTEGRATION_PERMISSIONS.INTEGRATION_EDIT,
    INTEGRATION_PERMISSIONS.MAPPING_MANAGE,
    INTEGRATION_PERMISSIONS.SYNC_RULE_MANAGE,
    INTEGRATION_PERMISSIONS.LOG_VIEW,
    INTEGRATION_PERMISSIONS.STATISTICS_VIEW
  ],
  [OrganizationRole.MEMBER]: [
    INTEGRATION_PERMISSIONS.INTEGRATION_VIEW,
    INTEGRATION_PERMISSIONS.MAPPING_VIEW,
    INTEGRATION_PERMISSIONS.SYNC_RULE_VIEW,
    INTEGRATION_PERMISSIONS.LOG_VIEW,
    INTEGRATION_PERMISSIONS.STATISTICS_VIEW
  ]
};
```

## 🧪 測試策略

### 單元測試
```typescript
describe('IntegrationService', () => {
  let service: IntegrationService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IntegrationService]
    });
    service = TestBed.inject(IntegrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  afterEach(() => {
    httpMock.verify();
  });
  
  it('should get integrations', () => {
    const mockIntegrations = [TestDataFactory.createIntegration()];
    
    service.getIntegrations().subscribe(integrations => {
      expect(integrations).toEqual(mockIntegrations);
    });
    
    const req = httpMock.expectOne('/api/integrations');
    expect(req.request.method).toBe('GET');
    req.flush(mockIntegrations);
  });
  
  it('should create integration', () => {
    const newIntegration = TestDataFactory.createIntegration({ name: 'New Integration' });
    
    service.createIntegration(newIntegration).subscribe(integration => {
      expect(integration).toEqual(newIntegration);
    });
    
    const req = httpMock.expectOne('/api/integrations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newIntegration);
    req.flush(newIntegration);
  });
});
```

## 📈 性能優化

### 緩存策略
```typescript
@Injectable({
  providedIn: 'root'
})
export class IntegrationCacheService {
  private cache = new Map<string, any>();
  private cacheTimeout = 5 * 60 * 1000; // 5 分鐘
  
  // 獲取緩存數據
  get<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    return null;
  }
  
  // 設置緩存數據
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  // 清除緩存
  clear(key?: string): void {
    if (key) {
      this.cache.delete(key);
    } else {
      this.cache.clear();
    }
  }
}
```

## 📊 成功指標

### 功能指標
- [ ] 集成管理功能完整性 > 95%
- [ ] 數據同步準確性 > 99%
- [ ] 集成監控覆蓋率 > 90%
- [ ] 錯誤處理完整性 > 95%

### 性能指標
- [ ] 集成響應時間 < 2 秒
- [ ] 數據同步延遲 < 5 秒
- [ ] 系統可用性 > 99.5%
- [ ] 錯誤率 < 0.1%

---

**📝 注意**: 集成管理模組需要與其他模組緊密集成，確保數據一致性和系統穩定性。