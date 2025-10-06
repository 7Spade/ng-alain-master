# 12️⃣ 企業集成模組

## 📋 模組概述

企業集成模組提供與外部企業系統的全面集成功能，包括 ERP 系統、CRM 系統、財務系統、人力資源系統、供應鏈系統等。此模組是 Project-Build 系統的企業級集成核心組件。

### 🎯 功能目標
- 實現與主流 ERP 系統的無縫集成
- 提供 CRM 系統的數據同步功能
- 支持財務系統的實時數據交換
- 實現人力資源系統的員工數據同步
- 整合供應鏈系統的物料和供應商數據

## 🏗️ 功能架構

### 核心功能
```
企業集成模組
├── ERP 集成
│   ├── SAP 集成
│   ├── Oracle 集成
│   ├── Microsoft Dynamics 集成
│   └── 自定義 ERP 集成
├── CRM 集成
│   ├── Salesforce 集成
│   ├── HubSpot 集成
│   ├── Microsoft CRM 集成
│   └── 自定義 CRM 集成
├── 財務集成
│   ├── 會計系統集成
│   ├── 預算系統集成
│   ├── 發票系統集成
│   └── 支付系統集成
├── HR 集成
│   ├── 員工管理系統
│   ├── 薪資系統
│   ├── 考勤系統
│   └── 培訓系統
└── 供應鏈集成
    ├── 供應商管理系統
    ├── 採購系統
    ├── 庫存管理系統
    └── 物流系統
```

## 📊 數據結構設計

### 集成配置實體 (IntegrationConfig)
```typescript
interface IntegrationConfig {
  id: string;                    // 配置唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 集成名稱
  description?: string;           // 集成描述
  type: IntegrationType;         // 集成類型
  system: ExternalSystem;        // 外部系統
  status: IntegrationStatus;     // 集成狀態
  connection: ConnectionConfig;   // 連接配置
  mapping: DataMapping[];         // 數據映射
  schedule: SyncSchedule;        // 同步排程
  monitoring: MonitoringConfig;   // 監控配置
  security: SecurityConfig;      // 安全配置
  version: string;               // 版本號
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum IntegrationType {
  ERP = 'erp',                  // ERP 系統
  CRM = 'crm',                  // CRM 系統
  FINANCE = 'finance',           // 財務系統
  HR = 'hr',                    // 人力資源系統
  SUPPLY_CHAIN = 'supply_chain', // 供應鏈系統
  ACCOUNTING = 'accounting',     // 會計系統
  PROJECT_MANAGEMENT = 'project_management', // 專案管理系統
  DOCUMENT_MANAGEMENT = 'document_management' // 文檔管理系統
}

enum ExternalSystem {
  // ERP 系統
  SAP = 'sap',
  ORACLE_ERP = 'oracle_erp',
  MICROSOFT_DYNAMICS = 'microsoft_dynamics',
  NETSUITE = 'netsuite',
  SAGE = 'sage',
  
  // CRM 系統
  SALESFORCE = 'salesforce',
  HUBSPOT = 'hubspot',
  MICROSOFT_CRM = 'microsoft_crm',
  PIPEDRIVE = 'pipedrive',
  ZOHO_CRM = 'zoho_crm',
  
  // 財務系統
  QUICKBOOKS = 'quickbooks',
  XERO = 'xero',
  WAVE = 'wave',
  FRESHBOOKS = 'freshbooks',
  
  // HR 系統
  WORKDAY = 'workday',
  BAMBOOHR = 'bamboohr',
  ADP = 'adp',
  PAYCHEX = 'paychex',
  
  // 供應鏈系統
  SAP_MM = 'sap_mm',
  ORACLE_SCM = 'oracle_scm',
  KINAXIS = 'kinaxis',
  
  // 自定義系統
  CUSTOM = 'custom'
}

enum IntegrationStatus {
  ACTIVE = 'active',            // 活躍
  INACTIVE = 'inactive',        // 非活躍
  ERROR = 'error',              // 錯誤
  MAINTENANCE = 'maintenance',   // 維護中
  PENDING = 'pending'           // 待處理
}

interface ConnectionConfig {
  id: string;                    // 連接唯一標識
  protocol: ConnectionProtocol;  // 連接協議
  endpoint: string;              // 端點 URL
  authentication: AuthConfig;   // 認證配置
  timeout: number;               // 超時時間
  retryPolicy: RetryPolicy;      // 重試策略
  ssl: SSLConfig;               // SSL 配置
  proxy?: ProxyConfig;          // 代理配置
}

enum ConnectionProtocol {
  HTTP = 'http',                // HTTP
  HTTPS = 'https',              // HTTPS
  FTP = 'ftp',                  // FTP
  SFTP = 'sftp',                // SFTP
  SOAP = 'soap',                // SOAP
  REST = 'rest',                // REST
  GRAPHQL = 'graphql',          // GraphQL
  ODBC = 'odbc',                // ODBC
  JDBC = 'jdbc'                 // JDBC
}

interface AuthConfig {
  id: string;                    // 認證唯一標識
  type: AuthType;               // 認證類型
  credentials: AuthCredentials;  // 認證憑證
  token?: TokenConfig;          // Token 配置
  oauth?: OAuthConfig;          // OAuth 配置
}

enum AuthType {
  BASIC = 'basic',              // 基本認證
  API_KEY = 'api_key',          // API 金鑰
  OAUTH2 = 'oauth2',            // OAuth 2.0
  JWT = 'jwt',                  // JWT
  CERTIFICATE = 'certificate',   // 證書認證
  SAML = 'saml'                // SAML
}

interface AuthCredentials {
  id: string;                    // 憑證唯一標識
  username?: string;            // 用戶名
  password?: string;            // 密碼
  apiKey?: string;              // API 金鑰
  secret?: string;              // 密鑰
  certificate?: string;         // 證書
  privateKey?: string;          // 私鑰
}

interface TokenConfig {
  id: string;                    // Token 唯一標識
  accessToken: string;          // 訪問令牌
  refreshToken?: string;        // 刷新令牌
  expiresAt: Date;              // 過期時間
  scope?: string[];             // 作用域
}

interface OAuthConfig {
  id: string;                    // OAuth 唯一標識
  clientId: string;             // 客戶端 ID
  clientSecret: string;          // 客戶端密鑰
  authorizationUrl: string;      // 授權 URL
  tokenUrl: string;             // Token URL
  redirectUri: string;          // 重定向 URI
  scope: string[];              // 作用域
}

interface RetryPolicy {
  id: string;                    // 重試唯一標識
  maxRetries: number;           // 最大重試次數
  retryDelay: number;           // 重試延遲
  backoffMultiplier: number;    // 退避乘數
  maxDelay: number;             // 最大延遲
}

interface SSLConfig {
  id: string;                    // SSL 唯一標識
  enabled: boolean;             // 是否啟用
  verifyCertificate: boolean;    // 驗證證書
  certificate?: string;          // 證書
  privateKey?: string;          // 私鑰
  caCertificate?: string;       // CA 證書
}

interface ProxyConfig {
  id: string;                    // 代理唯一標識
  host: string;                 // 代理主機
  port: number;                 // 代理端口
  username?: string;            // 代理用戶名
  password?: string;            // 代理密碼
  protocol: string;             // 代理協議
}

interface DataMapping {
  id: string;                    // 映射唯一標識
  sourceField: string;          // 源欄位
  targetField: string;          // 目標欄位
  transformation?: Transformation; // 轉換規則
  validation?: ValidationRule;   // 驗證規則
  required: boolean;            // 是否必需
  defaultValue?: any;           // 預設值
}

interface Transformation {
  id: string;                    // 轉換唯一標識
  type: TransformationType;      // 轉換類型
  parameters: TransformationParameter[]; // 轉換參數
  script?: string;               // 自定義腳本
}

enum TransformationType {
  DIRECT = 'direct',            // 直接映射
  FORMAT = 'format',            // 格式化
  CALCULATE = 'calculate',       // 計算
  LOOKUP = 'lookup',            // 查找
  SPLIT = 'split',              // 分割
  MERGE = 'merge',              // 合併
  FILTER = 'filter',            // 篩選
  SORT = 'sort',                // 排序
  CUSTOM = 'custom'             // 自定義
}

interface TransformationParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  value: any;                   // 參數值
  type: ParameterType;          // 參數類型
}

interface ValidationRule {
  id: string;                    // 驗證唯一標識
  type: ValidationType;          // 驗證類型
  parameters: ValidationParameter[]; // 驗證參數
  message: string;              // 錯誤訊息
}

enum ValidationType {
  REQUIRED = 'required',         // 必填
  MIN_LENGTH = 'min_length',     // 最小長度
  MAX_LENGTH = 'max_length',     // 最大長度
  MIN_VALUE = 'min_value',       // 最小值
  MAX_VALUE = 'max_value',       // 最大值
  PATTERN = 'pattern',          // 正則表達式
  EMAIL = 'email',              // 電子郵件
  URL = 'url',                  // URL
  DATE = 'date',                // 日期
  NUMBER = 'number',            // 數字
  CUSTOM = 'custom'             // 自定義
}

interface ValidationParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  value: any;                   // 參數值
}

interface SyncSchedule {
  id: string;                    // 排程唯一標識
  enabled: boolean;             // 是否啟用
  frequency: SyncFrequency;      // 同步頻率
  time: string;                 // 同步時間
  timezone: string;             // 時區
  batchSize: number;            // 批次大小
  parallelJobs: number;         // 並行作業數
  lastSync?: Date;              // 最後同步時間
  nextSync?: Date;              // 下次同步時間
}

enum SyncFrequency {
  REAL_TIME = 'real_time',       // 實時
  MINUTELY = 'minutely',        // 每分鐘
  HOURLY = 'hourly',            // 每小時
  DAILY = 'daily',              // 每日
  WEEKLY = 'weekly',            // 每週
  MONTHLY = 'monthly',          // 每月
  MANUAL = 'manual'             // 手動
}

interface MonitoringConfig {
  id: string;                    // 監控唯一標識
  enabled: boolean;             // 是否啟用
  metrics: MonitoringMetric[];    // 監控指標
  alerts: AlertConfig[];        // 告警配置
  logging: LoggingConfig;       // 日誌配置
}

interface MonitoringMetric {
  id: string;                    // 指標唯一標識
  name: string;                 // 指標名稱
  type: MetricType;             // 指標類型
  threshold: number;            // 閾值
  unit: string;                 // 單位
}

enum MetricType {
  SUCCESS_RATE = 'success_rate', // 成功率
  RESPONSE_TIME = 'response_time', // 響應時間
  ERROR_RATE = 'error_rate',     // 錯誤率
  DATA_VOLUME = 'data_volume',   // 數據量
  THROUGHPUT = 'throughput'      // 吞吐量
}

interface AlertConfig {
  id: string;                    // 告警唯一標識
  name: string;                 // 告警名稱
  condition: AlertCondition;     // 告警條件
  severity: AlertSeverity;       // 告警嚴重程度
  recipients: string[];         // 接收者
  channels: AlertChannel[];      // 告警通道
}

interface AlertCondition {
  id: string;                    // 條件唯一標識
  metric: string;               // 指標名稱
  operator: ComparisonOperator; // 比較運算子
  value: number;                // 比較值
  duration: number;             // 持續時間
}

enum ComparisonOperator {
  GREATER_THAN = 'greater_than', // 大於
  LESS_THAN = 'less_than',       // 小於
  EQUALS = 'equals',            // 等於
  NOT_EQUALS = 'not_equals',     // 不等於
  GREATER_THAN_OR_EQUAL = 'greater_than_or_equal', // 大於等於
  LESS_THAN_OR_EQUAL = 'less_than_or_equal' // 小於等於
}

enum AlertSeverity {
  LOW = 'low',                  // 低
  MEDIUM = 'medium',            // 中
  HIGH = 'high',                // 高
  CRITICAL = 'critical'         // 嚴重
}

enum AlertChannel {
  EMAIL = 'email',              // 電子郵件
  SMS = 'sms',                  // 簡訊
  PUSH = 'push',                // 推送
  WEBHOOK = 'webhook'           // Webhook
}

interface LoggingConfig {
  id: string;                    // 日誌唯一標識
  enabled: boolean;             // 是否啟用
  level: LogLevel;              // 日誌級別
  retention: number;            // 保留天數
  format: LogFormat;            // 日誌格式
}

enum LogLevel {
  DEBUG = 'debug',              // 調試
  INFO = 'info',                // 信息
  WARN = 'warn',                // 警告
  ERROR = 'error',              // 錯誤
  FATAL = 'fatal'               // 致命
}

enum LogFormat {
  JSON = 'json',                // JSON
  TEXT = 'text',                // 文字
  XML = 'xml'                   // XML
}

interface SecurityConfig {
  id: string;                    // 安全唯一標識
  encryption: EncryptionConfig;   // 加密配置
  accessControl: AccessControlConfig; // 訪問控制配置
  audit: AuditConfig;           // 審計配置
}

interface EncryptionConfig {
  id: string;                    // 加密唯一標識
  enabled: boolean;             // 是否啟用
  algorithm: EncryptionAlgorithm; // 加密算法
  keySize: number;              // 密鑰大小
  keyRotation: number;          // 密鑰輪換週期
}

enum EncryptionAlgorithm {
  AES256 = 'aes256',            // AES-256
  RSA2048 = 'rsa2048',          // RSA-2048
  RSA4096 = 'rsa4096',          // RSA-4096
  ECDSA = 'ecdsa'               // ECDSA
}

interface AccessControlConfig {
  id: string;                    // 訪問控制唯一標識
  enabled: boolean;             // 是否啟用
  rules: AccessRule[];          // 訪問規則
  defaultPolicy: AccessPolicy;   // 預設策略
}

interface AccessRule {
  id: string;                    // 規則唯一標識
  subject: string;              // 主體
  resource: string;             // 資源
  action: string;               // 動作
  effect: AccessEffect;         // 效果
  conditions?: AccessCondition[]; // 條件
}

enum AccessPolicy {
  ALLOW = 'allow',              // 允許
  DENY = 'deny'                 // 拒絕
}

enum AccessEffect {
  ALLOW = 'allow',              // 允許
  DENY = 'deny'                 // 拒絕
}

interface AccessCondition {
  id: string;                    // 條件唯一標識
  attribute: string;            // 屬性
  operator: ComparisonOperator; // 運算子
  value: any;                   // 值
}

interface AuditConfig {
  id: string;                    // 審計唯一標識
  enabled: boolean;             // 是否啟用
  events: AuditEvent[];         // 審計事件
  retention: number;            // 保留天數
}

interface AuditEvent {
  id: string;                    // 事件唯一標識
  name: string;                 // 事件名稱
  description: string;          // 事件描述
  level: AuditLevel;            // 審計級別
}

enum AuditLevel {
  BASIC = 'basic',              // 基本
  DETAILED = 'detailed',         // 詳細
  COMPREHENSIVE = 'comprehensive' // 全面
}
```

### 數據同步實體 (DataSync)
```typescript
interface DataSync {
  id: string;                    // 同步唯一標識
  integrationId: string;         // 集成配置 ID
  type: SyncType;               // 同步類型
  direction: SyncDirection;      // 同步方向
  status: SyncStatus;           // 同步狀態
  source: SyncSource;           // 源系統
  target: SyncTarget;           // 目標系統
  data: SyncData;               // 同步數據
  statistics: SyncStatistics;    // 同步統計
  errors: SyncError[];          // 同步錯誤
  startedAt: Date;              // 開始時間
  completedAt?: Date;            // 完成時間
  createdAt: Date;              // 創建時間
}

enum SyncType {
  FULL = 'full',                // 全量同步
  INCREMENTAL = 'incremental',   // 增量同步
  DELTA = 'delta',              // 差異同步
  MANUAL = 'manual'             // 手動同步
}

enum SyncDirection {
  IMPORT = 'import',            // 導入
  EXPORT = 'export',            // 導出
  BIDIRECTIONAL = 'bidirectional' // 雙向
}

enum SyncStatus {
  PENDING = 'pending',          // 待處理
  RUNNING = 'running',          // 運行中
  COMPLETED = 'completed',      // 已完成
  FAILED = 'failed',            // 失敗
  CANCELLED = 'cancelled',      // 已取消
  PAUSED = 'paused'             // 已暫停
}

interface SyncSource {
  id: string;                    // 源唯一標識
  system: ExternalSystem;       // 系統類型
  endpoint: string;              // 端點
  query: string;                 // 查詢語句
  filters: SyncFilter[];         // 篩選器
  pagination: PaginationConfig;  // 分頁配置
}

interface SyncTarget {
  id: string;                    // 目標唯一標識
  system: ExternalSystem;       // 系統類型
  endpoint: string;              // 端點
  table: string;                 // 目標表
  operation: SyncOperation;       // 操作類型
}

enum SyncOperation {
  INSERT = 'insert',            // 插入
  UPDATE = 'update',            // 更新
  UPSERT = 'upsert',            // 插入或更新
  DELETE = 'delete'             // 刪除
}

interface SyncFilter {
  id: string;                    // 篩選器唯一標識
  field: string;                // 欄位名稱
  operator: FilterOperator;      // 篩選運算子
  value: any;                   // 篩選值
}

interface PaginationConfig {
  id: string;                    // 分頁唯一標識
  enabled: boolean;             // 是否啟用
  pageSize: number;             // 頁面大小
  maxPages: number;             // 最大頁數
  offset: number;                // 偏移量
}

interface SyncData {
  id: string;                    // 數據唯一標識
  records: SyncRecord[];         // 同步記錄
  totalRecords: number;         // 總記錄數
  processedRecords: number;     // 已處理記錄數
  failedRecords: number;        // 失敗記錄數
  skippedRecords: number;       // 跳過記錄數
}

interface SyncRecord {
  id: string;                    // 記錄唯一標識
  sourceId: string;             // 源 ID
  targetId?: string;            // 目標 ID
  data: any;                    // 記錄數據
  status: RecordStatus;         // 記錄狀態
  error?: string;               // 錯誤訊息
  processedAt?: Date;           // 處理時間
}

enum RecordStatus {
  PENDING = 'pending',          // 待處理
  PROCESSING = 'processing',     // 處理中
  SUCCESS = 'success',          // 成功
  FAILED = 'failed',            // 失敗
  SKIPPED = 'skipped'           // 跳過
}

interface SyncStatistics {
  id: string;                    // 統計唯一標識
  duration: number;              // 持續時間
  throughput: number;            // 吞吐量
  successRate: number;           // 成功率
  errorRate: number;             // 錯誤率
  dataVolume: number;            // 數據量
  averageResponseTime: number;   // 平均響應時間
}

interface SyncError {
  id: string;                    // 錯誤唯一標識
  type: ErrorType;              // 錯誤類型
  code: string;                 // 錯誤代碼
  message: string;              // 錯誤訊息
  details: any;                 // 錯誤詳情
  timestamp: Date;              // 時間戳
  resolved: boolean;            // 是否已解決
  resolution?: string;          // 解決方案
}

enum ErrorType {
  CONNECTION = 'connection',     // 連接錯誤
  AUTHENTICATION = 'authentication', // 認證錯誤
  AUTHORIZATION = 'authorization', // 授權錯誤
  VALIDATION = 'validation',     // 驗證錯誤
  TRANSFORMATION = 'transformation', // 轉換錯誤
  TIMEOUT = 'timeout',          // 超時錯誤
  RATE_LIMIT = 'rate_limit',     // 速率限制錯誤
  DATA_FORMAT = 'data_format',    // 數據格式錯誤
  SYSTEM_ERROR = 'system_error'  // 系統錯誤
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 企業集成主組件
@Component({
  selector: 'app-enterprise-integration',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>企業集成</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createIntegration()">
              <i nz-icon nzType="plus"></i>
              創建集成
            </button>
            <button nz-button (click)="testConnection()">
              <i nz-icon nzType="api"></i>
              測試連接
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="集成配置">
            <app-integration-config></app-integration-config>
          </nz-tab>
          <nz-tab nzTitle="數據同步">
            <app-data-sync></app-data-sync>
          </nz-tab>
          <nz-tab nzTitle="監控告警">
            <app-integration-monitoring></app-integration-monitoring>
          </nz-tab>
          <nz-tab nzTitle="日誌審計">
            <app-integration-logs></app-integration-logs>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class EnterpriseIntegrationComponent implements OnInit {
  constructor(
    private integrationService: IntegrationService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.integrationService.loadIntegrations();
  }
  
  createIntegration() {
    this.modal.create({
      nzTitle: '創建企業集成',
      nzContent: AppCreateIntegrationModalComponent,
      nzFooter: null,
      nzWidth: 1200
    });
  }
  
  testConnection() {
    this.modal.create({
      nzTitle: '測試連接',
      nzContent: AppTestConnectionModalComponent,
      nzFooter: null,
      nzWidth: 800
    });
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  private readonly apiUrl = '/api/projects';
  
  private integrationsSubject = new BehaviorSubject<IntegrationConfig[]>([]);
  private syncJobsSubject = new BehaviorSubject<DataSync[]>([]);
  private monitoringDataSubject = new BehaviorSubject<MonitoringData[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  integrations$ = this.integrationsSubject.asObservable();
  syncJobs$ = this.syncJobsSubject.asObservable();
  monitoringData$ = this.monitoringDataSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 載入集成配置
  loadIntegrations(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<IntegrationConfig[]>(`${this.apiUrl}/${projectId}/integrations`)
      .pipe(
        tap(integrations => this.integrationsSubject.next(integrations)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建集成配置
  createIntegration(integrationData: CreateIntegrationRequest): Observable<IntegrationConfig> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<IntegrationConfig>(`${this.apiUrl}/${projectId}/integrations`, integrationData).pipe(
      tap(integration => {
        const currentIntegrations = this.integrationsSubject.value;
        this.integrationsSubject.next([...currentIntegrations, integration]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 測試連接
  testConnection(connectionConfig: ConnectionConfig): Observable<ConnectionTestResult> {
    return this.http.post<ConnectionTestResult>('/api/integrations/test-connection', connectionConfig).pipe(
      catchError(this.handleError)
    );
  }
  
  // 執行數據同步
  executeSync(integrationId: string, syncType: SyncType): Observable<DataSync> {
    return this.http.post<DataSync>(`/api/integrations/${integrationId}/sync`, { type: syncType }).pipe(
      tap(sync => {
        const currentSyncJobs = this.syncJobsSubject.value;
        this.syncJobsSubject.next([...currentSyncJobs, sync]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入同步作業
  loadSyncJobs(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<DataSync[]>(`${this.apiUrl}/${projectId}/sync-jobs`)
      .pipe(
        tap(syncJobs => this.syncJobsSubject.next(syncJobs)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取監控數據
  getMonitoringData(integrationId: string): Observable<MonitoringData> {
    return this.http.get<MonitoringData>(`/api/integrations/${integrationId}/monitoring`);
  }
  
  // 載入監控數據
  loadMonitoringData(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<MonitoringData[]>(`${this.apiUrl}/${projectId}/monitoring-data`)
      .pipe(
        tap(monitoringData => this.monitoringDataSubject.next(monitoringData)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取集成統計
  getIntegrationStats(): Observable<IntegrationStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<IntegrationStats>(`${this.apiUrl}/${projectId}/integration-stats`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Integration service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 企業集成權限
```typescript
enum EnterpriseIntegrationPermission {
  VIEW_INTEGRATIONS = 'view_integrations',
  CREATE_INTEGRATIONS = 'create_integrations',
  EDIT_INTEGRATIONS = 'edit_integrations',
  DELETE_INTEGRATIONS = 'delete_integrations',
  TEST_CONNECTIONS = 'test_connections',
  EXECUTE_SYNC = 'execute_sync',
  VIEW_SYNC_JOBS = 'view_sync_jobs',
  MANAGE_SYNC_JOBS = 'manage_sync_jobs',
  VIEW_MONITORING = 'view_monitoring',
  MANAGE_MONITORING = 'manage_monitoring',
  VIEW_LOGS = 'view_logs',
  MANAGE_SECURITY = 'manage_security',
  EXPORT_DATA = 'export_data',
  IMPORT_DATA = 'import_data'
}

// 角色權限映射
const INTEGRATION_PERMISSIONS: Record<ProjectRole, EnterpriseIntegrationPermission[]> = {
  [ProjectRole.OWNER]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.CREATE_INTEGRATIONS,
    EnterpriseIntegrationPermission.EDIT_INTEGRATIONS,
    EnterpriseIntegrationPermission.DELETE_INTEGRATIONS,
    EnterpriseIntegrationPermission.TEST_CONNECTIONS,
    EnterpriseIntegrationPermission.EXECUTE_SYNC,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS,
    EnterpriseIntegrationPermission.MANAGE_SYNC_JOBS,
    EnterpriseIntegrationPermission.VIEW_MONITORING,
    EnterpriseIntegrationPermission.MANAGE_MONITORING,
    EnterpriseIntegrationPermission.VIEW_LOGS,
    EnterpriseIntegrationPermission.MANAGE_SECURITY,
    EnterpriseIntegrationPermission.EXPORT_DATA,
    EnterpriseIntegrationPermission.IMPORT_DATA
  ],
  [ProjectRole.ADMIN]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.CREATE_INTEGRATIONS,
    EnterpriseIntegrationPermission.EDIT_INTEGRATIONS,
    EnterpriseIntegrationPermission.DELETE_INTEGRATIONS,
    EnterpriseIntegrationPermission.TEST_CONNECTIONS,
    EnterpriseIntegrationPermission.EXECUTE_SYNC,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS,
    EnterpriseIntegrationPermission.MANAGE_SYNC_JOBS,
    EnterpriseIntegrationPermission.VIEW_MONITORING,
    EnterpriseIntegrationPermission.MANAGE_MONITORING,
    EnterpriseIntegrationPermission.VIEW_LOGS,
    EnterpriseIntegrationPermission.MANAGE_SECURITY,
    EnterpriseIntegrationPermission.EXPORT_DATA,
    EnterpriseIntegrationPermission.IMPORT_DATA
  ],
  [ProjectRole.MANAGER]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.CREATE_INTEGRATIONS,
    EnterpriseIntegrationPermission.EDIT_INTEGRATIONS,
    EnterpriseIntegrationPermission.TEST_CONNECTIONS,
    EnterpriseIntegrationPermission.EXECUTE_SYNC,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS,
    EnterpriseIntegrationPermission.VIEW_MONITORING,
    EnterpriseIntegrationPermission.VIEW_LOGS,
    EnterpriseIntegrationPermission.EXPORT_DATA,
    EnterpriseIntegrationPermission.IMPORT_DATA
  ],
  [ProjectRole.ENGINEER]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.TEST_CONNECTIONS,
    EnterpriseIntegrationPermission.EXECUTE_SYNC,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS,
    EnterpriseIntegrationPermission.VIEW_MONITORING,
    EnterpriseIntegrationPermission.VIEW_LOGS,
    EnterpriseIntegrationPermission.EXPORT_DATA
  ],
  [ProjectRole.CONTRACTOR]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS,
    EnterpriseIntegrationPermission.VIEW_MONITORING,
    EnterpriseIntegrationPermission.VIEW_LOGS
  ],
  [ProjectRole.VIEWER]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS,
    EnterpriseIntegrationPermission.VIEW_MONITORING,
    EnterpriseIntegrationPermission.VIEW_LOGS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    EnterpriseIntegrationPermission.VIEW_INTEGRATIONS,
    EnterpriseIntegrationPermission.VIEW_SYNC_JOBS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface EnterpriseIntegrationApi {
  // 集成配置管理
  POST /api/projects/{projectId}/integrations        // 創建集成配置
  GET /api/projects/{projectId}/integrations         // 獲取集成配置列表
  GET /api/integrations/{integrationId}              // 獲取集成配置詳情
  PATCH /api/integrations/{integrationId}            // 更新集成配置
  DELETE /api/integrations/{integrationId}           // 刪除集成配置
  
  // 連接測試
  POST /api/integrations/test-connection             // 測試連接
  POST /api/integrations/{integrationId}/validate    // 驗證配置
  
  // 數據同步
  POST /api/integrations/{integrationId}/sync         // 執行數據同步
  GET /api/projects/{projectId}/sync-jobs            // 獲取同步作業列表
  GET /api/sync-jobs/{syncId}                        // 獲取同步作業詳情
  POST /api/sync-jobs/{syncId}/cancel                // 取消同步作業
  
  // 監控管理
  GET /api/integrations/{integrationId}/monitoring    // 獲取監控數據
  GET /api/projects/{projectId}/monitoring-data      // 獲取監控數據列表
  POST /api/integrations/{integrationId}/alerts       // 創建告警規則
  
  // 日誌審計
  GET /api/integrations/{integrationId}/logs          // 獲取集成日誌
  GET /api/projects/{projectId}/audit-logs           // 獲取審計日誌
  POST /api/integrations/{integrationId}/logs/export  // 導出日誌
  
  // 統計分析
  GET /api/projects/{projectId}/integration-stats    // 獲取集成統計
  GET /api/integrations/{integrationId}/performance   // 獲取性能指標
}

// 請求/響應類型
interface CreateIntegrationRequest {
  name: string;
  description?: string;
  type: IntegrationType;
  system: ExternalSystem;
  connection: ConnectionConfig;
  mapping: DataMapping[];
  schedule: SyncSchedule;
  monitoring: MonitoringConfig;
  security: SecurityConfig;
}

interface ConnectionTestResult {
  success: boolean;
  responseTime: number;
  error?: string;
  details: ConnectionTestDetail[];
}

interface ConnectionTestDetail {
  test: string;
  success: boolean;
  message: string;
  duration: number;
}

interface MonitoringData {
  id: string;
  integrationId: string;
  timestamp: Date;
  metrics: MonitoringMetric[];
  status: IntegrationStatus;
  alerts: AlertEvent[];
}

interface AlertEvent {
  id: string;
  alertId: string;
  severity: AlertSeverity;
  message: string;
  timestamp: Date;
  resolved: boolean;
}

interface IntegrationStats {
  totalIntegrations: number;
  activeIntegrations: number;
  totalSyncJobs: number;
  successfulSyncs: number;
  failedSyncs: number;
  averageResponseTime: number;
  dataVolume: number;
  lastUpdated: Date;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const integrationConfig = {
  enableEnterpriseIntegration: process.env.ENABLE_ENTERPRISE_INTEGRATION === 'true',
  maxConcurrentSyncs: parseInt(process.env.MAX_CONCURRENT_SYNCS || '5'),
  syncTimeout: parseInt(process.env.SYNC_TIMEOUT || '3600'), // 1 hour
  connectionTimeout: parseInt(process.env.CONNECTION_TIMEOUT || '300'), // 5 minutes
  retryAttempts: parseInt(process.env.RETRY_ATTEMPTS || '3'),
  retryDelay: parseInt(process.env.RETRY_DELAY || '60'), // 1 minute
  batchSize: parseInt(process.env.BATCH_SIZE || '1000'),
  monitoringInterval: parseInt(process.env.MONITORING_INTERVAL || '300'), // 5 minutes
  logRetentionDays: parseInt(process.env.LOG_RETENTION_DAYS || '90'),
  auditRetentionDays: parseInt(process.env.AUDIT_RETENTION_DAYS || '365'),
  encryptionEnabled: process.env.ENCRYPTION_ENABLED === 'true',
  supportedSystems: process.env.SUPPORTED_SYSTEMS?.split(',') || [
    'sap', 'oracle_erp', 'microsoft_dynamics', 'salesforce', 'hubspot'
  ],
  webhookUrl: process.env.WEBHOOK_URL,
  alertEmail: process.env.ALERT_EMAIL,
  sslVerify: process.env.SSL_VERIFY === 'true'
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] ERP 系統集成
- [ ] CRM 系統集成
- [ ] 財務系統集成
- [ ] HR 系統集成
- [ ] 供應鏈系統集成
- [ ] 數據同步功能
- [ ] 監控告警系統
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成