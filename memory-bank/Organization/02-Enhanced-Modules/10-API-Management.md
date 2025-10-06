# 🔌 API 管理模組

## 📋 模組概述

API 管理模組負責組織內部的 API 接口管理、版本控制、訪問控制、監控分析等功能，提供完整的 API 生命週期管理。

### 🎯 功能目標
- 提供完整的 API 生命週期管理
- 實現 API 版本控制和文檔管理
- 支持 API 訪問控制和限流
- 提供 API 監控和分析

## 🏗️ 功能架構

### 核心功能
```
API 管理模組
├── API 註冊管理
│   ├── API 註冊和發現
│   ├── API 元數據管理
│   ├── API 分類和標籤
│   └── API 文檔生成
├── 版本控制管理
│   ├── API 版本創建
│   ├── 版本比較和遷移
│   ├── 版本兼容性檢查
│   └── 版本棄用管理
├── 訪問控制管理
│   ├── API 密鑰管理
│   ├── 訪問權限控制
│   ├── 限流策略配置
│   └── 白名單管理
├── 監控分析管理
│   ├── API 調用統計
│   ├── 性能監控
│   ├── 錯誤率分析
│   └── 使用情況分析
└── 開發者門戶
    ├── API 文檔瀏覽
    ├── API 測試工具
    ├── SDK 下載
    └── 開發者支持
```

## 📊 數據結構設計

### API 實體 (API)
```typescript
interface API {
  id: string;                           // API 唯一標識
  name: string;                         // API 名稱
  description?: string;                 // API 描述
  version: string;                      // API 版本
  baseUrl: string;                      // 基礎 URL
  protocol: APIProtocol;                // 協議類型
  category: APICategory;                // API 分類
  tags: string[];                       // 標籤
  endpoints: APIEndpoint[];             // API 端點
  authentication: AuthenticationConfig; // 認證配置
  rateLimit: RateLimitConfig;           // 限流配置
  organizationId: string;               // 所屬組織
  teamId?: string;                      // 所屬團隊
  projectId?: string;                   // 所屬項目
  status: APIStatus;                    // API 狀態
  metadata: APIMetadata;                // 元數據
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum APIProtocol {
  HTTP = 'http',                        // HTTP
  HTTPS = 'https',                      // HTTPS
  GRAPHQL = 'graphql',                  // GraphQL
  WEBSOCKET = 'websocket'               // WebSocket
}

enum APICategory {
  INTERNAL = 'internal',                // 內部 API
  EXTERNAL = 'external',                // 外部 API
  THIRD_PARTY = 'third_party',          // 第三方 API
  PUBLIC = 'public'                     // 公開 API
}

enum APIStatus {
  DRAFT = 'draft',                      // 草稿
  ACTIVE = 'active',                    // 活躍
  DEPRECATED = 'deprecated',            // 已棄用
  RETIRED = 'retired'                   // 已退役
}

interface APIEndpoint {
  id: string;                           // 端點唯一標識
  path: string;                         // 端點路徑
  method: HTTPMethod;                   // HTTP 方法
  summary?: string;                     // 端點摘要
  description?: string;                 // 端點描述
  parameters: APIParameter[];           // 參數
  requestBody?: APIRequestBody;         // 請求體
  responses: APIResponse[];             // 響應
  examples: APIExample[];               // 示例
  deprecated: boolean;                  // 是否已棄用
}

interface APIParameter {
  name: string;                         // 參數名
  in: 'query' | 'path' | 'header' | 'cookie';
  required: boolean;                    // 是否必需
  type: string;                         // 參數類型
  description?: string;                 // 參數描述
  example?: any;                        // 示例值
  schema: JSONSchema;                   // 參數模式
}

interface AuthenticationConfig {
  type: AuthType;                       // 認證類型
  scheme: AuthScheme;                   // 認證方案
  config: Record<string, any>;          // 認證配置
  required: boolean;                    // 是否必需
}

enum AuthType {
  NONE = 'none',                        // 無認證
  API_KEY = 'api_key',                  // API 密鑰
  BEARER = 'bearer',                    // Bearer Token
  BASIC = 'basic',                      // Basic Auth
  OAUTH2 = 'oauth2',                    // OAuth 2.0
  JWT = 'jwt'                           // JWT Token
}

interface RateLimitConfig {
  enabled: boolean;                     // 是否啟用限流
  requests: number;                     // 請求數量
  window: number;                       // 時間窗口（秒）
  burst: number;                        // 突發請求數
  strategy: RateLimitStrategy;          // 限流策略
}

enum RateLimitStrategy {
  FIXED_WINDOW = 'fixed_window',        // 固定窗口
  SLIDING_WINDOW = 'sliding_window',    // 滑動窗口
  TOKEN_BUCKET = 'token_bucket',        // 令牌桶
  LEAKY_BUCKET = 'leaky_bucket'         // 漏桶
}
```

### API 密鑰實體 (APIKey)
```typescript
interface APIKey {
  id: string;                           // 密鑰唯一標識
  name: string;                         // 密鑰名稱
  key: string;                          // 密鑰值
  secret?: string;                      // 密鑰秘鑰
  apiId: string;                        // 所屬 API
  organizationId: string;               // 所屬組織
  teamId?: string;                      // 所屬團隊
  projectId?: string;                   // 所屬項目
  permissions: APIPermission[];         // 權限
  rateLimit?: RateLimitConfig;          // 限流配置
  allowedIPs: string[];                 // 允許的 IP
  allowedDomains: string[];             // 允許的域名
  expiresAt?: Date;                     // 過期時間
  lastUsedAt?: Date;                    // 最後使用時間
  usageCount: number;                   // 使用次數
  status: APIKeyStatus;                 // 密鑰狀態
  createdBy: string;                    // 創建者
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum APIKeyStatus {
  ACTIVE = 'active',                    // 活躍
  INACTIVE = 'inactive',                // 非活躍
  SUSPENDED = 'suspended',              // 暫停
  EXPIRED = 'expired'                   // 已過期
}

interface APIPermission {
  endpoint: string;                     // 端點路徑
  method: HTTPMethod;                   // HTTP 方法
  allowed: boolean;                     // 是否允許
  rateLimit?: RateLimitConfig;          // 端點限流
}
```

## 🧩 Angular 組件設計

### API 管理主組件
```typescript
@Component({
  selector: 'app-api-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, STModule, SEModule],
  template: `
    <div class="api-management">
      <se-container>
        <se label="API 名稱">
          <input nz-input [(ngModel)]="searchForm.name" placeholder="搜索 API 名稱" />
        </se>
        <se label="分類">
          <nz-select [(ngModel)]="searchForm.category" nzAllowClear>
            <nz-option *ngFor="let category of apiCategories" [nzValue]="category.value" [nzLabel]="category.label"></nz-option>
          </nz-select>
        </se>
        <se label="狀態">
          <nz-select [(ngModel)]="searchForm.status" nzAllowClear>
            <nz-option *ngFor="let status of apiStatuses" [nzValue]="status.value" [nzLabel]="status.label"></nz-option>
          </nz-select>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="search()">搜索</button>
          <button nz-button (click)="reset()">重置</button>
          <button nz-button nzType="primary" (click)="createAPI()">創建 API</button>
        </se>
      </se-container>
      
      <st
        [data]="apis"
        [columns]="columns"
        [page]="{ front: false, show: true, showSize: true }"
        (change)="onTableChange($event)"
        (refresh)="loadAPIs()">
      </st>
    </div>
  `
})
export class APIManagementComponent implements OnInit {
  private readonly apiService = inject(APIManagementService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  searchForm = {
    name: '',
    category: null,
    status: null
  };
  
  apis: API[] = [];
  apiCategories = [
    { value: APICategory.INTERNAL, label: '內部 API' },
    { value: APICategory.EXTERNAL, label: '外部 API' },
    { value: APICategory.THIRD_PARTY, label: '第三方 API' },
    { value: APICategory.PUBLIC, label: '公開 API' }
  ];
  
  apiStatuses = [
    { value: APIStatus.DRAFT, label: '草稿' },
    { value: APIStatus.ACTIVE, label: '活躍' },
    { value: APIStatus.DEPRECATED, label: '已棄用' },
    { value: APIStatus.RETIRED, label: '已退役' }
  ];
  
  columns: STColumn[] = [
    { title: 'API 名稱', index: 'name', width: 200 },
    { title: '版本', index: 'version', width: 100 },
    { title: '分類', index: 'category', width: 100, type: 'tag' },
    { title: '協議', index: 'protocol', width: 100, type: 'tag' },
    { title: '狀態', index: 'status', width: 100, type: 'tag' },
    { title: '端點數', index: 'endpoints.length', width: 100 },
    { title: '創建時間', index: 'createdAt', width: 150, type: 'date' },
    {
      title: '操作',
      width: 250,
      buttons: [
        {
          text: '查看',
          click: (record: API) => this.viewAPI(record)
        },
        {
          text: '編輯',
          click: (record: API) => this.editAPI(record)
        },
        {
          text: '文檔',
          click: (record: API) => this.viewDocumentation(record)
        },
        {
          text: '測試',
          click: (record: API) => this.testAPI(record)
        }
      ]
    }
  ];
  
  ngOnInit() {
    this.loadAPIs();
  }
  
  loadAPIs() {
    this.apiService.getAPIs(this.searchForm).subscribe({
      next: (apis) => this.apis = apis,
      error: (error) => this.message.error('載入 API 失敗')
    });
  }
  
  createAPI() {
    this.modal.create({
      nzTitle: '創建 API',
      nzContent: AppCreateAPIModalComponent,
      nzFooter: null,
      nzWidth: 800,
      nzOnOk: () => {
        this.loadAPIs();
        return true;
      }
    });
  }
  
  viewAPI(api: API) {
    this.modal.create({
      nzTitle: `API 詳情 - ${api.name}`,
      nzContent: AppAPIDetailsModalComponent,
      nzComponentParams: { api },
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  editAPI(api: API) {
    this.modal.create({
      nzTitle: '編輯 API',
      nzContent: AppEditAPIModalComponent,
      nzComponentParams: { api },
      nzFooter: null,
      nzWidth: 800,
      nzOnOk: () => {
        this.loadAPIs();
        return true;
      }
    });
  }
  
  viewDocumentation(api: API) {
    this.modal.create({
      nzTitle: `API 文檔 - ${api.name}`,
      nzContent: AppAPIDocumentationModalComponent,
      nzComponentParams: { api },
      nzFooter: null,
      nzWidth: 1200
    });
  }
  
  testAPI(api: API) {
    this.modal.create({
      nzTitle: `API 測試 - ${api.name}`,
      nzContent: AppAPITestModalComponent,
      nzComponentParams: { api },
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  search() {
    this.loadAPIs();
  }
  
  reset() {
    this.searchForm = { name: '', category: null, status: null };
    this.loadAPIs();
  }
  
  onTableChange(event: STChange) {
    // 處理表格變化
  }
}
```

## 🔧 服務層設計

### API 管理服務 (APIManagementService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class APIManagementService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/api-management';
  
  // 獲取 API 列表
  getAPIs(params?: any): Observable<API[]> {
    return this.http.get<API[]>(this.API_BASE, { params });
  }
  
  // 創建 API
  createAPI(api: Partial<API>): Observable<API> {
    return this.http.post<API>(this.API_BASE, api).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新 API
  updateAPI(id: string, api: Partial<API>): Observable<API> {
    return this.http.put<API>(`${this.API_BASE}/${id}`, api).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 刪除 API
  deleteAPI(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 獲取 API 詳情
  getAPIDetails(id: string): Observable<API> {
    return this.http.get<API>(`${this.API_BASE}/${id}`);
  }
  
  // 生成 API 文檔
  generateDocumentation(id: string): Observable<APIDocumentation> {
    return this.http.get<APIDocumentation>(`${this.API_BASE}/${id}/documentation`);
  }
  
  // 測試 API
  testAPI(id: string, endpoint: string, testData: any): Observable<APITestResult> {
    return this.http.post<APITestResult>(`${this.API_BASE}/${id}/test`, {
      endpoint,
      data: testData
    });
  }
  
  // 獲取 API 使用統計
  getAPIStatistics(id: string, params?: any): Observable<APIStatistics> {
    return this.http.get<APIStatistics>(`${this.API_BASE}/${id}/statistics`, { params });
  }
  
  // 創建 API 密鑰
  createAPIKey(apiId: string, apiKey: Partial<APIKey>): Observable<APIKey> {
    return this.http.post<APIKey>(`${this.API_BASE}/${apiId}/keys`, apiKey);
  }
  
  // 獲取 API 密鑰列表
  getAPIKeys(apiId: string): Observable<APIKey[]> {
    return this.http.get<APIKey[]>(`${this.API_BASE}/${apiId}/keys`);
  }
  
  // 更新 API 密鑰
  updateAPIKey(apiId: string, keyId: string, apiKey: Partial<APIKey>): Observable<APIKey> {
    return this.http.put<APIKey>(`${this.API_BASE}/${apiId}/keys/${keyId}`, apiKey);
  }
  
  // 刪除 API 密鑰
  deleteAPIKey(apiId: string, keyId: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${apiId}/keys/${keyId}`);
  }
}

interface APIDocumentation {
  id: string;
  apiId: string;
  title: string;
  description: string;
  version: string;
  openapi: any;
  endpoints: APIEndpoint[];
  schemas: Record<string, any>;
  examples: APIExample[];
  generatedAt: Date;
}

interface APITestResult {
  success: boolean;
  statusCode: number;
  responseTime: number;
  response: any;
  error?: string;
  timestamp: Date;
}

interface APIStatistics {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  averageResponseTime: number;
  requestsPerDay: Array<{ date: string; count: number }>;
  topEndpoints: Array<{ endpoint: string; count: number }>;
  errorRate: number;
  usageByKey: Array<{ keyId: string; requests: number }>;
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('APIManagementService', () => {
  let service: APIManagementService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIManagementService]
    });
    service = TestBed.inject(APIManagementService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create API successfully', () => {
    const api: Partial<API> = {
      name: 'Test API',
      version: '1.0.0',
      baseUrl: 'https://api.example.com',
      protocol: APIProtocol.HTTPS,
      category: APICategory.INTERNAL
    };
    
    service.createAPI(api).subscribe(result => {
      expect(result.name).toBe('Test API');
    });
    
    const req = httpMock.expectOne('/api/api-management');
    expect(req.request.method).toBe('POST');
    req.flush({ ...api, id: '1' });
  });
});
```

## ⚡ 性能優化

### API 緩存策略
```typescript
@Injectable({
  providedIn: 'root'
})
export class APICacheService {
  private readonly cache = inject(DelonCacheService);
  private readonly CACHE_EXPIRE = 10 * 60 * 1000; // 10分鐘
  
  // 緩存 API 列表
  cacheAPIList(key: string, apis: API[]): void {
    this.cache.set(key, apis, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的 API 列表
  getCachedAPIList(key: string): API[] | null {
    return this.cache.get(key);
  }
  
  // 緩存 API 文檔
  cacheDocumentation(apiId: string, documentation: APIDocumentation): void {
    this.cache.set(`api-doc-${apiId}`, documentation, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的 API 文檔
  getCachedDocumentation(apiId: string): APIDocumentation | null {
    return this.cache.get(`api-doc-${apiId}`);
  }
  
  // 清除 API 緩存
  clearAPICache(apiId?: string): void {
    if (apiId) {
      this.cache.remove(`api-doc-${apiId}`);
    } else {
      this.cache.clear();
    }
  }
}
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// API 管理 API
GET    /api/api-management                // 獲取 API 列表
POST   /api/api-management                // 創建 API
GET    /api/api-management/:id           // 獲取 API 詳情
PUT    /api/api-management/:id           // 更新 API
DELETE /api/api-management/:id           // 刪除 API
GET    /api/api-management/:id/documentation // 獲取 API 文檔
POST   /api/api-management/:id/test      // 測試 API
GET    /api/api-management/:id/statistics // 獲取 API 統計

// API 密鑰管理 API
GET    /api/api-management/:id/keys      // 獲取 API 密鑰列表
POST   /api/api-management/:id/keys      // 創建 API 密鑰
GET    /api/api-management/:id/keys/:keyId // 獲取 API 密鑰詳情
PUT    /api/api-management/:id/keys/:keyId // 更新 API 密鑰
DELETE /api/api-management/:id/keys/:keyId // 刪除 API 密鑰

// API 版本管理 API
GET    /api/api-management/:id/versions  // 獲取 API 版本列表
POST   /api/api-management/:id/versions  // 創建 API 版本
GET    /api/api-management/:id/versions/:version // 獲取版本詳情
PUT    /api/api-management/:id/versions/:version // 更新版本
DELETE /api/api-management/:id/versions/:version // 刪除版本
```

## 📊 成功指標

### 功能指標
- [ ] 支持 4 種 API 協議
- [ ] 支持 API 版本控制
- [ ] 支持 API 密鑰管理
- [ ] 支持 API 文檔自動生成
- [ ] 支持 API 測試工具

### 性能指標
- [ ] API 列表載入時間 < 1 秒
- [ ] API 文檔生成時間 < 5 秒
- [ ] 支持 API 緩存
- [ ] 支持 API 限流

### 安全指標
- [ ] API 訪問權限控制
- [ ] API 密鑰安全管理
- [ ] API 調用審計
- [ ] API 限流保護

---

**📝 注意**: 本模組需要與權限控制模組和安全架構深度集成，確保 API 的安全性和可管理性。