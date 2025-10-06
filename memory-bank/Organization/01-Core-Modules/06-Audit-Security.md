# 6️⃣ 審計安全模組

## 📋 模組概述

審計安全模組負責系統的安全監控、操作審計、異常檢測和合規性管理，提供完整的審計追蹤和安全防護功能。

### 🎯 功能目標
- 實現完整的操作審計追蹤
- 提供實時安全監控
- 支持異常行為檢測
- 確保合規性要求

## 🏗️ 功能架構

### 核心功能
```
審計安全模組
├── 操作審計
│   ├── 用戶操作記錄
│   ├── 系統操作追蹤
│   ├── 數據變更審計
│   └── 權限變更記錄
├── 安全監控
│   ├── 登錄監控
│   ├── 異常訪問檢測
│   ├── 安全事件追蹤
│   └── 威脅檢測
├── 合規管理
│   ├── 合規性檢查
│   ├── 審計報告生成
│   ├── 合規性報告
│   └── 法規遵循驗證
└── 安全配置
    ├── 安全策略管理
    ├── 審計規則配置
    ├── 告警設置
    └── 安全參數調優
```

## 📊 數據結構設計

### 審計日誌實體 (AuditLog)
```typescript
interface AuditLog {
  id: string;                           // 審計日誌唯一標識
  userId?: string;                      // 用戶ID
  userEmail?: string;                   // 用戶郵箱
  action: AuditAction;                  // 操作類型
  resourceType: ResourceType;           // 資源類型
  resourceId?: string;                  // 資源ID
  resourceName?: string;                // 資源名稱
  organizationId: string;               // 所屬組織
  teamId?: string;                      // 所屬團隊
  projectId?: string;                   // 所屬項目
  details: AuditDetails;                // 操作詳情
  metadata: AuditMetadata;              // 元數據
  ipAddress?: string;                   // IP地址
  userAgent?: string;                   // 用戶代理
  timestamp: Date;                      // 時間戳
  severity: AuditSeverity;              // 嚴重程度
  status: AuditStatus;                  // 狀態
}

enum AuditAction {
  CREATE = 'create',                    // 創建
  READ = 'read',                        // 讀取
  UPDATE = 'update',                    // 更新
  DELETE = 'delete',                    // 刪除
  LOGIN = 'login',                      // 登錄
  LOGOUT = 'logout',                    // 登出
  INVITE = 'invite',                    // 邀請
  REMOVE = 'remove',                    // 移除
  GRANT = 'grant',                      // 授予權限
  REVOKE = 'revoke',                    // 撤銷權限
  EXPORT = 'export',                    // 導出
  IMPORT = 'import',                    // 導入
  CONFIGURE = 'configure'               // 配置
}

enum AuditSeverity {
  LOW = 'low',                          // 低
  MEDIUM = 'medium',                    // 中
  HIGH = 'high',                        // 高
  CRITICAL = 'critical'                 // 嚴重
}

enum AuditStatus {
  SUCCESS = 'success',                  // 成功
  FAILURE = 'failure',                  // 失敗
  PENDING = 'pending',                  // 待處理
  SUSPICIOUS = 'suspicious'             // 可疑
}

interface AuditDetails {
  description: string;                  // 操作描述
  oldValues?: Record<string, any>;      // 舊值
  newValues?: Record<string, any>;      // 新值
  changes?: Record<string, any>;        // 變更
  reason?: string;                      // 操作原因
  context?: Record<string, any>;        // 上下文
}

interface AuditMetadata {
  sessionId?: string;                   // 會話ID
  requestId?: string;                   // 請求ID
  traceId?: string;                     // 追蹤ID
  duration?: number;                    // 操作持續時間
  source?: string;                      // 來源
  tags?: string[];                      // 標籤
}
```

### 安全事件實體 (SecurityEvent)
```typescript
interface SecurityEvent {
  id: string;                           // 安全事件唯一標識
  type: SecurityEventType;              // 事件類型
  severity: AuditSeverity;              // 嚴重程度
  title: string;                        // 事件標題
  description: string;                  // 事件描述
  userId?: string;                      // 相關用戶ID
  organizationId: string;               // 所屬組織
  source: SecurityEventSource;          // 事件來源
  details: SecurityEventDetails;        // 事件詳情
  metadata: SecurityEventMetadata;      // 元數據
  status: SecurityEventStatus;          // 事件狀態
  resolvedAt?: Date;                    // 解決時間
  resolvedBy?: string;                  // 解決者
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum SecurityEventType {
  UNAUTHORIZED_ACCESS = 'unauthorized_access',     // 未授權訪問
  SUSPICIOUS_LOGIN = 'suspicious_login',           // 可疑登錄
  PRIVILEGE_ESCALATION = 'privilege_escalation',   // 權限提升
  DATA_BREACH = 'data_breach',                     // 數據洩露
  MALWARE_DETECTED = 'malware_detected',           // 惡意軟件檢測
  BRUTE_FORCE_ATTACK = 'brute_force_attack',       // 暴力破解攻擊
  PHISHING_ATTEMPT = 'phishing_attempt',           // 釣魚嘗試
  ACCOUNT_COMPROMISE = 'account_compromise'         // 賬戶泄露
}

enum SecurityEventSource {
  AUTHENTICATION = 'authentication',    // 認證系統
  AUTHORIZATION = 'authorization',      // 授權系統
  NETWORK = 'network',                  // 網絡監控
  APPLICATION = 'application',          // 應用監控
  DATABASE = 'database',                // 數據庫監控
  FILE_SYSTEM = 'file_system',          // 文件系統
  EXTERNAL = 'external'                 // 外部系統
}

enum SecurityEventStatus {
  OPEN = 'open',                        // 開放
  INVESTIGATING = 'investigating',      // 調查中
  RESOLVED = 'resolved',                // 已解決
  FALSE_POSITIVE = 'false_positive',    // 誤報
  IGNORED = 'ignored'                   // 忽略
}

interface SecurityEventDetails {
  affectedResources?: string[];         // 受影響的資源
  attackVector?: string;                // 攻擊向量
  indicators?: string[];                // 指標
  remediation?: string;                 // 補救措施
  recommendations?: string[];           // 建議
}

interface SecurityEventMetadata {
  ipAddress?: string;                   // IP地址
  userAgent?: string;                   // 用戶代理
  location?: string;                    // 位置
  deviceInfo?: string;                  // 設備信息
  networkInfo?: string;                 // 網絡信息
}
```

## 🧩 Angular 組件設計

### 審計管理主組件
```typescript
@Component({
  selector: 'app-audit-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, STModule, SEModule],
  template: `
    <div class="audit-management">
      <se-container>
        <se label="操作類型">
          <nz-select [(ngModel)]="searchForm.action" nzAllowClear>
            <nz-option *ngFor="let action of auditActions" [nzValue]="action.value" [nzLabel]="action.label"></nz-option>
          </nz-select>
        </se>
        <se label="用戶">
          <input nz-input [(ngModel)]="searchForm.user" placeholder="搜索用戶" />
        </se>
        <se label="資源類型">
          <nz-select [(ngModel)]="searchForm.resourceType" nzAllowClear>
            <nz-option *ngFor="let type of resourceTypes" [nzValue]="type.value" [nzLabel]="type.label"></nz-option>
          </nz-select>
        </se>
        <se label="嚴重程度">
          <nz-select [(ngModel)]="searchForm.severity" nzAllowClear>
            <nz-option *ngFor="let severity of severities" [nzValue]="severity.value" [nzLabel]="severity.label"></nz-option>
          </nz-select>
        </se>
        <se label="時間範圍">
          <nz-range-picker [(ngModel)]="searchForm.dateRange" nzShowTime></nz-range-picker>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="search()">搜索</button>
          <button nz-button (click)="reset()">重置</button>
          <button nz-button (click)="exportAuditLogs()">導出</button>
        </se>
      </se-container>
      
      <st
        [data]="auditLogs"
        [columns]="columns"
        [page]="{ front: false, show: true, showSize: true }"
        (change)="onTableChange($event)"
        (refresh)="loadAuditLogs()">
      </st>
    </div>
  `
})
export class AuditManagementComponent implements OnInit {
  private readonly auditService = inject(AuditService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  searchForm = {
    action: null,
    user: '',
    resourceType: null,
    severity: null,
    dateRange: null
  };
  
  auditLogs: AuditLog[] = [];
  auditActions = [
    { value: AuditAction.CREATE, label: '創建' },
    { value: AuditAction.READ, label: '讀取' },
    { value: AuditAction.UPDATE, label: '更新' },
    { value: AuditAction.DELETE, label: '刪除' },
    { value: AuditAction.LOGIN, label: '登錄' },
    { value: AuditAction.LOGOUT, label: '登出' }
  ];
  
  resourceTypes = [
    { value: ResourceType.ORGANIZATION, label: '組織' },
    { value: ResourceType.TEAM, label: '團隊' },
    { value: ResourceType.PROJECT, label: '項目' },
    { value: ResourceType.MEMBER, label: '成員' }
  ];
  
  severities = [
    { value: AuditSeverity.LOW, label: '低' },
    { value: AuditSeverity.MEDIUM, label: '中' },
    { value: AuditSeverity.HIGH, label: '高' },
    { value: AuditSeverity.CRITICAL, label: '嚴重' }
  ];
  
  columns: STColumn[] = [
    { title: '時間', index: 'timestamp', width: 150, type: 'date' },
    { title: '用戶', index: 'userEmail', width: 150 },
    { title: '操作', index: 'action', width: 100, type: 'tag' },
    { title: '資源', index: 'resourceName', width: 150 },
    { title: '嚴重程度', index: 'severity', width: 100, type: 'tag' },
    { title: '狀態', index: 'status', width: 100, type: 'tag' },
    { title: 'IP地址', index: 'ipAddress', width: 120 },
    {
      title: '操作',
      width: 150,
      buttons: [
        {
          text: '詳情',
          click: (record: AuditLog) => this.viewAuditDetails(record)
        },
        {
          text: '標記',
          click: (record: AuditLog) => this.markAuditLog(record)
        }
      ]
    }
  ];
  
  ngOnInit() {
    this.loadAuditLogs();
  }
  
  loadAuditLogs() {
    this.auditService.getAuditLogs(this.searchForm).subscribe({
      next: (logs) => this.auditLogs = logs,
      error: (error) => this.message.error('載入審計日誌失敗')
    });
  }
  
  viewAuditDetails(log: AuditLog) {
    this.modal.create({
      nzTitle: '審計日誌詳情',
      nzContent: AppAuditDetailsModalComponent,
      nzComponentParams: { auditLog: log },
      nzFooter: null,
      nzWidth: 800
    });
  }
  
  markAuditLog(log: AuditLog) {
    this.auditService.markAuditLog(log.id, { status: AuditStatus.SUSPICIOUS }).subscribe({
      next: () => {
        this.message.success('審計日誌已標記');
        this.loadAuditLogs();
      }
    });
  }
  
  exportAuditLogs() {
    this.auditService.exportAuditLogs(this.searchForm).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
      }
    });
  }
  
  search() {
    this.loadAuditLogs();
  }
  
  reset() {
    this.searchForm = {
      action: null,
      user: '',
      resourceType: null,
      severity: null,
      dateRange: null
    };
    this.loadAuditLogs();
  }
  
  onTableChange(event: STChange) {
    // 處理表格變化
  }
}
```

## 🔧 服務層設計

### 審計服務 (AuditService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/audit';
  
  // 獲取審計日誌
  getAuditLogs(params?: any): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.API_BASE}/logs`, { params });
  }
  
  // 創建審計日誌
  createAuditLog(log: Partial<AuditLog>): Observable<AuditLog> {
    return this.http.post<AuditLog>(`${this.API_BASE}/logs`, log);
  }
  
  // 獲取安全事件
  getSecurityEvents(params?: any): Observable<SecurityEvent[]> {
    return this.http.get<SecurityEvent[]>(`${this.API_BASE}/security-events`, { params });
  }
  
  // 創建安全事件
  createSecurityEvent(event: Partial<SecurityEvent>): Observable<SecurityEvent> {
    return this.http.post<SecurityEvent>(`${this.API_BASE}/security-events`, event);
  }
  
  // 標記審計日誌
  markAuditLog(id: string, updates: Partial<AuditLog>): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/logs/${id}`, updates);
  }
  
  // 解決安全事件
  resolveSecurityEvent(id: string, resolution: any): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/security-events/${id}/resolve`, resolution);
  }
  
  // 導出審計日誌
  exportAuditLogs(params?: any): Observable<Blob> {
    return this.http.get(`${this.API_BASE}/export`, { 
      params, 
      responseType: 'blob' 
    });
  }
  
  // 獲取審計統計
  getAuditStatistics(params?: any): Observable<AuditStatistics> {
    return this.http.get<AuditStatistics>(`${this.API_BASE}/statistics`, { params });
  }
}

interface AuditStatistics {
  totalLogs: number;                    // 總日誌數
  todayLogs: number;                    // 今日日誌數
  criticalEvents: number;               // 嚴重事件數
  securityEvents: number;               // 安全事件數
  topActions: Array<{ action: string; count: number }>; // 熱門操作
  topUsers: Array<{ user: string; count: number }>;     // 活躍用戶
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('AuditService', () => {
  let service: AuditService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuditService]
    });
    service = TestBed.inject(AuditService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create audit log successfully', () => {
    const auditLog: Partial<AuditLog> = {
      action: AuditAction.LOGIN,
      resourceType: ResourceType.ORGANIZATION,
      severity: AuditSeverity.MEDIUM
    };
    
    service.createAuditLog(auditLog).subscribe(log => {
      expect(log.action).toBe(AuditAction.LOGIN);
    });
    
    const req = httpMock.expectOne('/api/audit/logs');
    expect(req.request.method).toBe('POST');
    req.flush({ ...auditLog, id: '1' });
  });
});
```

## ⚡ 性能優化

### 審計日誌緩存
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuditCacheService {
  private readonly cache = inject(DelonCacheService);
  private readonly CACHE_KEY = 'audit_cache';
  private readonly CACHE_EXPIRE = 5 * 60 * 1000; // 5分鐘
  
  // 緩存審計統計
  cacheAuditStatistics(stats: AuditStatistics): void {
    this.cache.set(`${this.CACHE_KEY}_stats`, stats, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的審計統計
  getCachedAuditStatistics(): AuditStatistics | null {
    return this.cache.get(`${this.CACHE_KEY}_stats`);
  }
  
  // 清除審計緩存
  clearAuditCache(): void {
    this.cache.remove(this.CACHE_KEY);
  }
}
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// 審計管理 API
GET    /api/audit/logs                   // 獲取審計日誌
POST   /api/audit/logs                   // 創建審計日誌
PUT    /api/audit/logs/:id               // 更新審計日誌
GET    /api/audit/logs/:id               // 獲取審計日誌詳情
GET    /api/audit/security-events        // 獲取安全事件
POST   /api/audit/security-events        // 創建安全事件
PUT    /api/audit/security-events/:id/resolve // 解決安全事件
GET    /api/audit/statistics             // 獲取審計統計
GET    /api/audit/export                 // 導出審計日誌
```

## 📊 成功指標

### 功能指標
- [ ] 支持 10000+ 審計日誌/天
- [ ] 實時安全事件檢測
- [ ] 支持 10+ 種審計操作類型
- [ ] 100% 操作審計覆蓋
- [ ] 支持審計日誌導出

### 性能指標
- [ ] 審計日誌查詢響應時間 < 2 秒
- [ ] 安全事件檢測延遲 < 30 秒
- [ ] 支持審計數據壓縮存儲
- [ ] 支持水平擴展

### 安全指標
- [ ] 審計日誌完整性驗證
- [ ] 審計數據加密存儲
- [ ] 安全事件自動響應
- [ ] 合規性報告生成

---

**📝 注意**: 本模組需要與所有其他模組集成，確保完整的操作追蹤和安全監控。