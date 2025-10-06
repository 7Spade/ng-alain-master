# 14️⃣ 移動端支持模組

## 📋 模組概述

移動端支持模組提供專案管理系統的移動端應用功能，包括原生移動應用、響應式 Web 應用、離線支持、推送通知、移動端優化等功能。此模組是 Project-Build 系統的移動端體驗核心組件。

### 🎯 功能目標
- 實現跨平台移動應用開發
- 提供響應式 Web 應用支持
- 實現離線數據同步功能
- 支持移動端推送通知
- 優化移動端用戶體驗

## 🏗️ 功能架構

### 核心功能
```
移動端支持模組
├── 原生應用
│   ├── iOS 應用
│   ├── Android 應用
│   ├── 跨平台框架
│   └── 原生功能集成
├── 響應式 Web
│   ├── 移動端適配
│   ├── 觸控優化
│   ├── 性能優化
│   └── PWA 支持
├── 離線支持
│   ├── 數據緩存
│   ├── 離線同步
│   ├── 衝突解決
│   └── 數據一致性
├── 推送通知
│   ├── 即時通知
│   ├── 定時通知
│   ├── 位置通知
│   └── 通知管理
└── 移動端優化
    ├── 性能優化
    ├── 電池優化
    ├── 網路優化
    └── 存儲優化
```

## 📊 數據結構設計

### 移動應用實體 (MobileApp)
```typescript
interface MobileApp {
  id: string;                    // 應用唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 應用名稱
  description?: string;          // 應用描述
  platform: MobilePlatform;      // 平台類型
  version: string;               // 版本號
  buildNumber: string;           // 構建號
  status: AppStatus;             // 應用狀態
  configuration: AppConfiguration; // 應用配置
  features: MobileFeature[];      // 功能特性
  permissions: AppPermission[];   // 應用權限
  deployment: AppDeployment;      // 部署配置
  analytics: AppAnalytics;       // 應用分析
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum MobilePlatform {
  IOS = 'ios',                  // iOS
  ANDROID = 'android',          // Android
  WEB = 'web',                  // Web
  PWA = 'pwa',                  // Progressive Web App
  CROSS_PLATFORM = 'cross_platform' // 跨平台
}

enum AppStatus {
  DEVELOPMENT = 'development',   // 開發中
  TESTING = 'testing',          // 測試中
  STAGING = 'staging',          // 預發布
  PRODUCTION = 'production',    // 生產環境
  ARCHIVED = 'archived'         // 已封存
}

interface AppConfiguration {
  id: string;                    // 配置唯一標識
  theme: AppTheme;              // 應用主題
  language: string;             // 語言設置
  region: string;               // 地區設置
  timezone: string;             // 時區設置
  features: FeatureToggle[];     // 功能開關
  api: APIConfiguration;        // API 配置
  storage: StorageConfiguration;  // 存儲配置
  network: NetworkConfiguration; // 網路配置
  security: SecurityConfiguration; // 安全配置
}

interface AppTheme {
  id: string;                    // 主題唯一標識
  name: string;                 // 主題名稱
  primaryColor: string;          // 主色調
  secondaryColor: string;        // 輔助色調
  backgroundColor: string;       // 背景色
  textColor: string;            // 文字色
  accentColor: string;          // 強調色
  darkMode: boolean;            // 深色模式
  customColors: CustomColor[];   // 自定義色彩
}

interface CustomColor {
  id: string;                    // 色彩唯一標識
  name: string;                 // 色彩名稱
  value: string;                // 色彩值
  usage: ColorUsage;            // 使用場景
}

enum ColorUsage {
  PRIMARY = 'primary',          // 主要
  SECONDARY = 'secondary',      // 次要
  SUCCESS = 'success',          // 成功
  WARNING = 'warning',          // 警告
  ERROR = 'error',              // 錯誤
  INFO = 'info'                 // 信息
}

interface FeatureToggle {
  id: string;                    // 開關唯一標識
  name: string;                 // 功能名稱
  enabled: boolean;             // 是否啟用
  description?: string;          // 功能描述
  targetUsers?: string[];       // 目標用戶
  rolloutPercentage?: number;    // 推出百分比
}

interface APIConfiguration {
  id: string;                    // API 配置唯一標識
  baseUrl: string;               // 基礎 URL
  timeout: number;              // 超時時間
  retryAttempts: number;         // 重試次數
  retryDelay: number;            // 重試延遲
  authentication: AuthConfig;     // 認證配置
  caching: CacheConfig;          // 緩存配置
  compression: boolean;          // 是否壓縮
  encryption: boolean;           // 是否加密
}

interface StorageConfiguration {
  id: string;                    // 存儲配置唯一標識
  type: StorageType;            // 存儲類型
  maxSize: number;              // 最大大小
  encryption: boolean;           // 是否加密
  compression: boolean;          // 是否壓縮
  backup: BackupConfig;          // 備份配置
  sync: SyncConfig;             // 同步配置
}

enum StorageType {
  LOCAL = 'local',              // 本地存儲
  CLOUD = 'cloud',              // 雲端存儲
  HYBRID = 'hybrid'             // 混合存儲
}

interface BackupConfig {
  id: string;                    // 備份配置唯一標識
  enabled: boolean;             // 是否啟用
  frequency: BackupFrequency;    // 備份頻率
  retention: number;            // 保留天數
  encryption: boolean;           // 是否加密
}

enum BackupFrequency {
  DAILY = 'daily',              // 每日
  WEEKLY = 'weekly',            // 每週
  MONTHLY = 'monthly',          // 每月
  MANUAL = 'manual'             // 手動
}

interface SyncConfig {
  id: string;                    // 同步配置唯一標識
  enabled: boolean;             // 是否啟用
  strategy: SyncStrategy;        // 同步策略
  conflictResolution: ConflictResolution; // 衝突解決
  batchSize: number;            // 批次大小
  interval: number;             // 同步間隔
}

enum SyncStrategy {
  REAL_TIME = 'real_time',       // 實時同步
  PERIODIC = 'periodic',        // 定期同步
  MANUAL = 'manual',            // 手動同步
  HYBRID = 'hybrid'             // 混合同步
}

enum ConflictResolution {
  SERVER_WINS = 'server_wins',   // 服務器優先
  CLIENT_WINS = 'client_wins',   // 客戶端優先
  LAST_MODIFIED = 'last_modified', // 最後修改優先
  MANUAL = 'manual'             // 手動解決
}

interface NetworkConfiguration {
  id: string;                    // 網路配置唯一標識
  offlineMode: boolean;         // 離線模式
  dataSaver: boolean;           // 數據節省
  compression: boolean;         // 壓縮傳輸
  caching: boolean;             // 網路緩存
  retryPolicy: RetryPolicy;      // 重試策略
  timeout: number;              // 超時時間
}

interface SecurityConfiguration {
  id: string;                    // 安全配置唯一標識
  encryption: EncryptionConfig;  // 加密配置
  biometric: BiometricConfig;    // 生物識別配置
  pinCode: PinCodeConfig;        // PIN 碼配置
  sessionTimeout: number;        // 會話超時
  autoLock: boolean;            // 自動鎖定
}

interface BiometricConfig {
  id: string;                    // 生物識別唯一標識
  enabled: boolean;             // 是否啟用
  types: BiometricType[];       // 生物識別類型
  fallback: boolean;            // 是否允許回退
}

enum BiometricType {
  FINGERPRINT = 'fingerprint',   // 指紋
  FACE_ID = 'face_id',          // 面容 ID
  TOUCH_ID = 'touch_id',        // 觸控 ID
  VOICE = 'voice'               // 語音
}

interface PinCodeConfig {
  id: string;                    // PIN 碼唯一標識
  enabled: boolean;             // 是否啟用
  length: number;               // PIN 碼長度
  maxAttempts: number;          // 最大嘗試次數
  lockoutDuration: number;      // 鎖定時長
}

interface MobileFeature {
  id: string;                    // 功能唯一標識
  name: string;                 // 功能名稱
  description: string;           // 功能描述
  type: FeatureType;            // 功能類型
  enabled: boolean;              // 是否啟用
  permissions: string[];         // 所需權限
  dependencies: string[];       // 依賴功能
  configuration: FeatureConfig;  // 功能配置
}

enum FeatureType {
  CORE = 'core',                // 核心功能
  ENHANCED = 'enhanced',        // 增強功能
  PREMIUM = 'premium',          // 高級功能
  EXPERIMENTAL = 'experimental'  // 實驗功能
}

interface FeatureConfig {
  id: string;                    // 配置唯一標識
  parameters: ConfigParameter[]; // 配置參數
  constraints: ConfigConstraint[]; // 配置約束
}

interface ConfigParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  type: ParameterType;          // 參數類型
  value: any;                   // 參數值
  required: boolean;            // 是否必需
  defaultValue?: any;           // 預設值
}

interface ConfigConstraint {
  id: string;                    // 約束唯一標識
  parameter: string;            // 參數名稱
  condition: ConstraintCondition; // 約束條件
  value: any;                   // 約束值
}

enum ConstraintCondition {
  EQUALS = 'equals',            // 等於
  NOT_EQUALS = 'not_equals',    // 不等於
  GREATER_THAN = 'greater_than', // 大於
  LESS_THAN = 'less_than',      // 小於
  CONTAINS = 'contains',        // 包含
  REGEX = 'regex'              // 正則表達式
}

interface AppPermission {
  id: string;                    // 權限唯一標識
  name: string;                 // 權限名稱
  description: string;           // 權限描述
  type: PermissionType;          // 權限類型
  required: boolean;            // 是否必需
  rationale: string;            // 權限說明
  usage: PermissionUsage[];      // 使用場景
}

enum PermissionType {
  CAMERA = 'camera',            // 相機
  LOCATION = 'location',        // 位置
  STORAGE = 'storage',          // 存儲
  CONTACTS = 'contacts',        // 聯繫人
  CALENDAR = 'calendar',        // 日曆
  MICROPHONE = 'microphone',    // 麥克風
  NOTIFICATIONS = 'notifications', // 通知
  NETWORK = 'network'           // 網路
}

interface PermissionUsage {
  id: string;                    // 使用唯一標識
  feature: string;              // 功能名稱
  description: string;           // 使用描述
}

interface AppDeployment {
  id: string;                    // 部署唯一標識
  environment: DeploymentEnvironment; // 部署環境
  store: AppStore;              // 應用商店
  status: DeploymentStatus;      // 部署狀態
  version: string;              // 版本號
  buildNumber: string;          // 構建號
  releaseNotes: string;         // 發布說明
  screenshots: Screenshot[];     // 截圖
  metadata: AppMetadata;        // 應用元數據
  review: AppReview;            // 審核信息
  publishedAt?: Date;           // 發布時間
}

enum AppStore {
  APP_STORE = 'app_store',      // App Store
  GOOGLE_PLAY = 'google_play',  // Google Play
  HUAWEI_APP_GALLERY = 'huawei_app_gallery', // 華為應用市場
  SAMSUNG_GALAXY_STORE = 'samsung_galaxy_store', // 三星應用商店
  AMAZON_APPSTORE = 'amazon_appstore', // 亞馬遜應用商店
  ENTERPRISE = 'enterprise'     // 企業分發
}

enum DeploymentStatus {
  DRAFT = 'draft',              // 草稿
  SUBMITTED = 'submitted',      // 已提交
  REVIEWING = 'reviewing',      // 審核中
  APPROVED = 'approved',        // 已批准
  REJECTED = 'rejected',        // 已拒絕
  PUBLISHED = 'published',      // 已發布
  SUSPENDED = 'suspended'       // 已暫停
}

interface Screenshot {
  id: string;                    // 截圖唯一標識
  url: string;                  // 截圖 URL
  type: ScreenshotType;         // 截圖類型
  device: string;               // 設備類型
  description?: string;          // 截圖描述
}

enum ScreenshotType {
  PHONE = 'phone',              // 手機
  TABLET = 'tablet',            // 平板
  DESKTOP = 'desktop'           // 桌面
}

interface AppMetadata {
  id: string;                    // 元數據唯一標識
  category: AppCategory;         // 應用分類
  keywords: string[];           // 關鍵詞
  description: string;           // 應用描述
  shortDescription: string;      // 簡短描述
  ageRating: AgeRating;         // 年齡分級
  contentRating: ContentRating;  // 內容分級
  languages: string[];          // 支持語言
  regions: string[];            // 支持地區
}

enum AppCategory {
  BUSINESS = 'business',         // 商務
  PRODUCTIVITY = 'productivity', // 生產力
  PROJECT_MANAGEMENT = 'project_management', // 專案管理
  COLLABORATION = 'collaboration', // 協作
  COMMUNICATION = 'communication', // 溝通
  UTILITIES = 'utilities'       // 工具
}

enum AgeRating {
  EVERYONE = 'everyone',         // 所有人
  EVERYONE_10_PLUS = 'everyone_10_plus', // 10 歲以上
  TEEN = 'teen',                // 青少年
  MATURE = 'mature'             // 成人
}

enum ContentRating {
  SAFE = 'safe',                // 安全
  MODERATE = 'moderate',        // 中等
  MATURE = 'mature'             // 成人
}

interface AppReview {
  id: string;                    // 審核唯一標識
  status: ReviewStatus;          // 審核狀態
  reviewer: string;             // 審核者
  comments: string;             // 審核意見
  rating: number;               // 評分
  submittedAt: Date;            // 提交時間
  reviewedAt?: Date;            // 審核時間
}

enum ReviewStatus {
  PENDING = 'pending',          // 待審核
  APPROVED = 'approved',        // 已批准
  REJECTED = 'rejected',        // 已拒絕
  NEEDS_REVISION = 'needs_revision' // 需要修訂
}

interface AppAnalytics {
  id: string;                    // 分析唯一標識
  installs: number;             // 安裝數
  activeUsers: number;          // 活躍用戶
  sessions: number;             // 會話數
  crashes: number;              // 崩潰數
  ratings: AppRating[];          // 評分
  reviews: AppReview[];          // 評論
  performance: PerformanceMetrics; // 性能指標
  usage: UsageMetrics;          // 使用指標
}

interface AppRating {
  id: string;                    // 評分唯一標識
  rating: number;               // 評分
  count: number;                // 評分數量
  average: number;              // 平均評分
  distribution: RatingDistribution; // 評分分佈
}

interface RatingDistribution {
  id: string;                    // 分佈唯一標識
  oneStar: number;              // 一星
  twoStar: number;              // 二星
  threeStar: number;            // 三星
  fourStar: number;             // 四星
  fiveStar: number;             // 五星
}

interface PerformanceMetrics {
  id: string;                    // 性能唯一標識
  loadTime: number;             // 載入時間
  responseTime: number;         // 響應時間
  memoryUsage: number;          // 記憶體使用
  cpuUsage: number;             // CPU 使用
  batteryUsage: number;         // 電池使用
  networkUsage: number;         // 網路使用
}

interface UsageMetrics {
  id: string;                    // 使用唯一標識
  dailyActiveUsers: number;     // 日活躍用戶
  monthlyActiveUsers: number;   // 月活躍用戶
  sessionDuration: number;      // 會話時長
  featureUsage: FeatureUsage[];  // 功能使用
  userRetention: RetentionMetrics; // 用戶留存
}

interface FeatureUsage {
  id: string;                    // 功能使用唯一標識
  featureName: string;          // 功能名稱
  usageCount: number;           // 使用次數
  uniqueUsers: number;          // 唯一用戶
  averageTime: number;          // 平均使用時間
}

interface RetentionMetrics {
  id: string;                    // 留存唯一標識
  day1: number;                 // 1 日留存
  day7: number;                 // 7 日留存
  day30: number;                // 30 日留存
  day90: number;                // 90 日留存
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 移動端支持主組件
@Component({
  selector: 'app-mobile-support',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>移動端支持</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createApp()">
              <i nz-icon nzType="mobile"></i>
              創建應用
            </button>
            <button nz-button (click)="deployApp()">
              <i nz-icon nzType="cloud-upload"></i>
              部署應用
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="應用管理">
            <app-mobile-app-management></app-mobile-app-management>
          </nz-tab>
          <nz-tab nzTitle="推送通知">
            <app-push-notifications></app-push-notifications>
          </nz-tab>
          <nz-tab nzTitle="離線支持">
            <app-offline-support></app-offline-support>
          </nz-tab>
          <nz-tab nzTitle="性能監控">
            <app-mobile-performance></app-mobile-performance>
          </nz-tab>
          <nz-tab nzTitle="用戶分析">
            <app-mobile-analytics></app-mobile-analytics>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class MobileSupportComponent implements OnInit {
  constructor(
    private mobileService: MobileSupportService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.mobileService.loadApps();
  }
  
  createApp() {
    this.modal.create({
      nzTitle: '創建移動應用',
      nzContent: AppCreateMobileAppModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  deployApp() {
    this.modal.create({
      nzTitle: '部署移動應用',
      nzContent: AppDeployMobileAppModalComponent,
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
export class MobileSupportService {
  private readonly apiUrl = '/api/projects';
  
  private appsSubject = new BehaviorSubject<MobileApp[]>([]);
  private notificationsSubject = new BehaviorSubject<PushNotification[]>([]);
  private analyticsSubject = new BehaviorSubject<AppAnalytics[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  apps$ = this.appsSubject.asObservable();
  notifications$ = this.notificationsSubject.asObservable();
  analytics$ = this.analyticsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 載入應用
  loadApps(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<MobileApp[]>(`${this.apiUrl}/${projectId}/mobile-apps`)
      .pipe(
        tap(apps => this.appsSubject.next(apps)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建應用
  createApp(appData: CreateMobileAppRequest): Observable<MobileApp> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<MobileApp>(`${this.apiUrl}/${projectId}/mobile-apps`, appData).pipe(
      tap(app => {
        const currentApps = this.appsSubject.value;
        this.appsSubject.next([...currentApps, app]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 部署應用
  deployApp(appId: string, deploymentData: DeploymentRequest): Observable<AppDeployment> {
    return this.http.post<AppDeployment>(`/api/mobile-apps/${appId}/deploy`, deploymentData).pipe(
      catchError(this.handleError)
    );
  }
  
  // 發送推送通知
  sendPushNotification(notificationData: CreateNotificationRequest): Observable<PushNotification> {
    return this.http.post<PushNotification>('/api/push-notifications', notificationData).pipe(
      tap(notification => {
        const currentNotifications = this.notificationsSubject.value;
        this.notificationsSubject.next([...currentNotifications, notification]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入推送通知
  loadPushNotifications(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<PushNotification[]>(`${this.apiUrl}/${projectId}/push-notifications`)
      .pipe(
        tap(notifications => this.notificationsSubject.next(notifications)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取應用分析
  getAppAnalytics(appId: string): Observable<AppAnalytics> {
    return this.http.get<AppAnalytics>(`/api/mobile-apps/${appId}/analytics`);
  }
  
  // 載入應用分析
  loadAppAnalytics(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<AppAnalytics[]>(`${this.apiUrl}/${projectId}/app-analytics`)
      .pipe(
        tap(analytics => this.analyticsSubject.next(analytics)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取移動端統計
  getMobileStats(): Observable<MobileStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<MobileStats>(`${this.apiUrl}/${projectId}/mobile-stats`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Mobile support service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 移動端支持權限
```typescript
enum MobileSupportPermission {
  VIEW_APPS = 'view_apps',
  CREATE_APPS = 'create_apps',
  EDIT_APPS = 'edit_apps',
  DELETE_APPS = 'delete_apps',
  DEPLOY_APPS = 'deploy_apps',
  VIEW_NOTIFICATIONS = 'view_notifications',
  SEND_NOTIFICATIONS = 'send_notifications',
  MANAGE_NOTIFICATIONS = 'manage_notifications',
  VIEW_OFFLINE_SUPPORT = 'view_offline_support',
  MANAGE_OFFLINE_SUPPORT = 'manage_offline_support',
  VIEW_PERFORMANCE = 'view_performance',
  MANAGE_PERFORMANCE = 'manage_performance',
  VIEW_ANALYTICS = 'view_analytics',
  MANAGE_ANALYTICS = 'manage_analytics',
  VIEW_MOBILE_STATS = 'view_mobile_stats'
}

// 角色權限映射
const MOBILE_SUPPORT_PERMISSIONS: Record<ProjectRole, MobileSupportPermission[]> = {
  [ProjectRole.OWNER]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.CREATE_APPS,
    MobileSupportPermission.EDIT_APPS,
    MobileSupportPermission.DELETE_APPS,
    MobileSupportPermission.DEPLOY_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS,
    MobileSupportPermission.SEND_NOTIFICATIONS,
    MobileSupportPermission.MANAGE_NOTIFICATIONS,
    MobileSupportPermission.VIEW_OFFLINE_SUPPORT,
    MobileSupportPermission.MANAGE_OFFLINE_SUPPORT,
    MobileSupportPermission.VIEW_PERFORMANCE,
    MobileSupportPermission.MANAGE_PERFORMANCE,
    MobileSupportPermission.VIEW_ANALYTICS,
    MobileSupportPermission.MANAGE_ANALYTICS,
    MobileSupportPermission.VIEW_MOBILE_STATS
  ],
  [ProjectRole.ADMIN]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.CREATE_APPS,
    MobileSupportPermission.EDIT_APPS,
    MobileSupportPermission.DELETE_APPS,
    MobileSupportPermission.DEPLOY_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS,
    MobileSupportPermission.SEND_NOTIFICATIONS,
    MobileSupportPermission.MANAGE_NOTIFICATIONS,
    MobileSupportPermission.VIEW_OFFLINE_SUPPORT,
    MobileSupportPermission.MANAGE_OFFLINE_SUPPORT,
    MobileSupportPermission.VIEW_PERFORMANCE,
    MobileSupportPermission.MANAGE_PERFORMANCE,
    MobileSupportPermission.VIEW_ANALYTICS,
    MobileSupportPermission.MANAGE_ANALYTICS,
    MobileSupportPermission.VIEW_MOBILE_STATS
  ],
  [ProjectRole.MANAGER]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.CREATE_APPS,
    MobileSupportPermission.EDIT_APPS,
    MobileSupportPermission.DEPLOY_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS,
    MobileSupportPermission.SEND_NOTIFICATIONS,
    MobileSupportPermission.MANAGE_NOTIFICATIONS,
    MobileSupportPermission.VIEW_OFFLINE_SUPPORT,
    MobileSupportPermission.VIEW_PERFORMANCE,
    MobileSupportPermission.VIEW_ANALYTICS,
    MobileSupportPermission.VIEW_MOBILE_STATS
  ],
  [ProjectRole.ENGINEER]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.CREATE_APPS,
    MobileSupportPermission.EDIT_APPS,
    MobileSupportPermission.DEPLOY_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS,
    MobileSupportPermission.SEND_NOTIFICATIONS,
    MobileSupportPermission.VIEW_OFFLINE_SUPPORT,
    MobileSupportPermission.VIEW_PERFORMANCE,
    MobileSupportPermission.VIEW_ANALYTICS
  ],
  [ProjectRole.CONTRACTOR]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS,
    MobileSupportPermission.VIEW_OFFLINE_SUPPORT,
    MobileSupportPermission.VIEW_PERFORMANCE,
    MobileSupportPermission.VIEW_ANALYTICS
  ],
  [ProjectRole.VIEWER]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS,
    MobileSupportPermission.VIEW_OFFLINE_SUPPORT,
    MobileSupportPermission.VIEW_PERFORMANCE,
    MobileSupportPermission.VIEW_ANALYTICS,
    MobileSupportPermission.VIEW_MOBILE_STATS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    MobileSupportPermission.VIEW_APPS,
    MobileSupportPermission.VIEW_NOTIFICATIONS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface MobileSupportApi {
  // 移動應用管理
  POST /api/projects/{projectId}/mobile-apps         // 創建移動應用
  GET /api/projects/{projectId}/mobile-apps         // 獲取移動應用列表
  GET /api/mobile-apps/{appId}                       // 獲取移動應用詳情
  PATCH /api/mobile-apps/{appId}                     // 更新移動應用
  DELETE /api/mobile-apps/{appId}                    // 刪除移動應用
  
  // 應用部署
  POST /api/mobile-apps/{appId}/deploy               // 部署應用
  GET /api/mobile-apps/{appId}/deployments           // 獲取部署列表
  GET /api/deployments/{deploymentId}                 // 獲取部署詳情
  POST /api/deployments/{deploymentId}/rollback      // 回滾部署
  
  // 推送通知
  POST /api/push-notifications                       // 發送推送通知
  GET /api/projects/{projectId}/push-notifications   // 獲取推送通知列表
  GET /api/push-notifications/{notificationId}       // 獲取推送通知詳情
  PATCH /api/push-notifications/{notificationId}     // 更新推送通知
  
  // 離線支持
  GET /api/mobile-apps/{appId}/offline-data          // 獲取離線數據
  POST /api/mobile-apps/{appId}/sync                 // 同步數據
  GET /api/sync-jobs/{jobId}                         // 獲取同步作業
  
  // 性能監控
  GET /api/mobile-apps/{appId}/performance           // 獲取性能指標
  GET /api/mobile-apps/{appId}/crashes                // 獲取崩潰報告
  POST /api/mobile-apps/{appId}/performance-alerts   // 創建性能告警
  
  // 用戶分析
  GET /api/mobile-apps/{appId}/analytics              // 獲取應用分析
  GET /api/mobile-apps/{appId}/users                  // 獲取用戶統計
  GET /api/mobile-apps/{appId}/usage                  // 獲取使用統計
  
  // 移動端統計
  GET /api/projects/{projectId}/mobile-stats          // 獲取移動端統計
}

// 請求/響應類型
interface CreateMobileAppRequest {
  name: string;
  description?: string;
  platform: MobilePlatform;
  configuration: AppConfiguration;
  features: MobileFeature[];
  permissions: AppPermission[];
}

interface DeploymentRequest {
  environment: DeploymentEnvironment;
  store: AppStore;
  version: string;
  buildNumber: string;
  releaseNotes: string;
  screenshots: Screenshot[];
  metadata: AppMetadata;
}

interface CreateNotificationRequest {
  title: string;
  body: string;
  data?: any;
  targetUsers?: string[];
  targetDevices?: string[];
  scheduleAt?: Date;
  priority: NotificationPriority;
  sound?: string;
  badge?: number;
}

enum NotificationPriority {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
  CRITICAL = 'critical'
}

interface PushNotification {
  id: string;
  title: string;
  body: string;
  data?: any;
  targetUsers: string[];
  targetDevices: string[];
  status: NotificationStatus;
  sentAt?: Date;
  deliveredAt?: Date;
  openedAt?: Date;
  createdAt: Date;
  createdBy: string;
}

enum NotificationStatus {
  PENDING = 'pending',
  SENT = 'sent',
  DELIVERED = 'delivered',
  OPENED = 'opened',
  FAILED = 'failed'
}

interface MobileStats {
  totalApps: number;
  activeApps: number;
  totalInstalls: number;
  activeUsers: number;
  totalNotifications: number;
  notificationDeliveryRate: number;
  averageSessionDuration: number;
  crashRate: number;
  lastUpdated: Date;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const mobileSupportConfig = {
  enableMobileApps: process.env.ENABLE_MOBILE_APPS === 'true',
  enablePushNotifications: process.env.ENABLE_PUSH_NOTIFICATIONS === 'true',
  enableOfflineSupport: process.env.ENABLE_OFFLINE_SUPPORT === 'true',
  enablePerformanceMonitoring: process.env.ENABLE_PERFORMANCE_MONITORING === 'true',
  enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
  maxAppsPerProject: parseInt(process.env.MAX_APPS_PER_PROJECT || '10'),
  maxNotificationBatchSize: parseInt(process.env.MAX_NOTIFICATION_BATCH_SIZE || '1000'),
  notificationRetryAttempts: parseInt(process.env.NOTIFICATION_RETRY_ATTEMPTS || '3'),
  offlineDataRetentionDays: parseInt(process.env.OFFLINE_DATA_RETENTION_DAYS || '30'),
  syncInterval: parseInt(process.env.SYNC_INTERVAL || '300'), // 5 minutes
  performanceMonitoringInterval: parseInt(process.env.PERFORMANCE_MONITORING_INTERVAL || '60'), // 1 minute
  analyticsRetentionDays: parseInt(process.env.ANALYTICS_RETENTION_DAYS || '365'),
  pushNotificationProviders: process.env.PUSH_NOTIFICATION_PROVIDERS?.split(',') || ['fcm', 'apns'],
  fcmServerKey: process.env.FCM_SERVER_KEY,
  apnsCertificate: process.env.APNS_CERTIFICATE,
  apnsPrivateKey: process.env.APNS_PRIVATE_KEY,
  appStoreConnectApiKey: process.env.APP_STORE_CONNECT_API_KEY,
  googlePlayServiceAccountKey: process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_KEY,
  crashReportingEnabled: process.env.CRASH_REPORTING_ENABLED === 'true',
  crashReportingProvider: process.env.CRASH_REPORTING_PROVIDER || 'firebase'
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 原生應用開發
- [ ] 響應式 Web 應用
- [ ] 離線支持功能
- [ ] 推送通知系統
- [ ] 性能監控功能
- [ ] 用戶分析功能
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成