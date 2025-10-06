# 7️⃣ 組織設置模組

## 📋 模組概述

組織設置模組負責組織的詳細配置管理，包括組織信息設置、安全配置、集成設置、通知偏好等，為組織提供全面的自定義和管理功能。

### 🎯 功能目標
- 提供完整的組織配置管理
- 支持組織自定義設置
- 實現安全策略配置
- 提供集成和通知設置

## 🏗️ 功能架構

### 核心功能
```
組織設置模組
├── 基本信息設置
│   ├── 組織信息管理
│   ├── 頭像和品牌設置
│   ├── 聯繫信息管理
│   └── 社交媒體鏈接
├── 安全設置
│   ├── 密碼策略配置
│   ├── 會話管理設置
│   ├── IP 白名單管理
│   └── 安全審計設置
├── 集成設置
│   ├── SSO 配置
│   ├── API 密鑰管理
│   ├── Webhook 配置
│   └── 第三方集成
├── 通知設置
│   ├── 郵件通知偏好
│   ├── 推送通知設置
│   ├── 告警配置
│   └── 通知模板管理
└── 高級設置
    ├── 數據保留策略
    ├── 備份配置
    ├── 合規性設置
    └── 系統維護設置
```

## 📊 數據結構設計

### 組織設置實體 (OrganizationSettings)
```typescript
interface OrganizationSettings {
  id: string;                           // 設置唯一標識
  organizationId: string;               // 所屬組織
  basicInfo: BasicInfoSettings;         // 基本信息設置
  security: SecuritySettings;           // 安全設置
  integrations: IntegrationSettings;    // 集成設置
  notifications: NotificationSettings;  // 通知設置
  advanced: AdvancedSettings;           // 高級設置
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

interface BasicInfoSettings {
  name: string;                         // 組織名稱
  slug: string;                         // 組織標識
  description?: string;                 // 組織描述
  website?: string;                     // 官方網站
  avatar?: string;                      // 組織頭像
  logo?: string;                        // 組織標誌
  banner?: string;                      // 橫幅圖片
  location?: string;                    // 位置
  timezone: string;                     // 時區
  language: string;                     // 默認語言
  currency: string;                     // 默認貨幣
  socialLinks: SocialLink[];            // 社交媒體鏈接
}

interface SecuritySettings {
  passwordPolicy: PasswordPolicy;       // 密碼策略
  sessionSettings: SessionSettings;     // 會話設置
  ipWhitelist: IPWhitelist;            // IP 白名單
  auditSettings: AuditSettings;        // 審計設置
  mfaSettings: MFASettings;            // MFA 設置
  dataProtection: DataProtectionSettings; // 數據保護設置
}

interface IntegrationSettings {
  sso: SSOSettings;                    // SSO 設置
  apiKeys: APIKeySettings;             // API 密鑰設置
  webhooks: WebhookSettings;           // Webhook 設置
  thirdPartyIntegrations: ThirdPartyIntegration[]; // 第三方集成
}

interface NotificationSettings {
  email: EmailNotificationSettings;    // 郵件通知設置
  push: PushNotificationSettings;      // 推送通知設置
  alerts: AlertSettings;               // 告警設置
  templates: NotificationTemplate[];   // 通知模板
}

interface AdvancedSettings {
  dataRetention: DataRetentionSettings; // 數據保留設置
  backup: BackupSettings;              // 備份設置
  compliance: ComplianceSettings;      // 合規性設置
  maintenance: MaintenanceSettings;    // 維護設置
}

interface PasswordPolicy {
  minLength: number;                   // 最小長度
  requireUppercase: boolean;           // 需要大寫字母
  requireLowercase: boolean;           // 需要小寫字母
  requireNumbers: boolean;             // 需要數字
  requireSpecialChars: boolean;        // 需要特殊字符
  maxAge: number;                      // 最大使用天數
  historyCount: number;                // 歷史密碼數量
}

interface SessionSettings {
  timeout: number;                     // 會話超時時間（分鐘）
  maxConcurrentSessions: number;       // 最大並發會話數
  rememberMe: boolean;                 // 記住我功能
  deviceTracking: boolean;             // 設備追蹤
}

interface IPWhitelist {
  enabled: boolean;                    // 是否啟用
  ips: string[];                       // IP 地址列表
  ranges: IPRange[];                   // IP 範圍列表
}

interface SSOSettings {
  enabled: boolean;                    // 是否啟用 SSO
  provider: string;                    // SSO 提供商
  config: Record<string, any>;         // SSO 配置
  autoProvisioning: boolean;           // 自動配置
}

interface EmailNotificationSettings {
  enabled: boolean;                    // 是否啟用郵件通知
  smtpConfig: SMTPConfig;             // SMTP 配置
  fromAddress: string;                 // 發件人地址
  replyToAddress?: string;             // 回覆地址
  templates: EmailTemplate[];          // 郵件模板
}

interface DataRetentionSettings {
  enabled: boolean;                    // 是否啟用數據保留
  retentionPeriod: number;             // 保留期（天）
  archiveAfter: number;                // 歸檔時間（天）
  deleteAfter: number;                 // 刪除時間（天）
  exemptedData: string[];              // 豁免數據類型
}
```

## 🧩 Angular 組件設計

### 組織設置主組件
```typescript
@Component({
  selector: 'app-organization-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NzTabsModule],
  template: `
    <div class="organization-settings">
      <nz-card>
        <nz-tabset nzTabPosition="top">
          <!-- 基本信息 -->
          <nz-tab nzTitle="基本信息">
            <app-basic-info-settings [settings]="settings.basicInfo" (update)="updateBasicInfo($event)"></app-basic-info-settings>
          </nz-tab>
          
          <!-- 安全設置 -->
          <nz-tab nzTitle="安全設置">
            <app-security-settings [settings]="settings.security" (update)="updateSecurity($event)"></app-security-settings>
          </nz-tab>
          
          <!-- 集成設置 -->
          <nz-tab nzTitle="集成設置">
            <app-integration-settings [settings]="settings.integrations" (update)="updateIntegrations($event)"></app-integration-settings>
          </nz-tab>
          
          <!-- 通知設置 -->
          <nz-tab nzTitle="通知設置">
            <app-notification-settings [settings]="settings.notifications" (update)="updateNotifications($event)"></app-notification-settings>
          </nz-tab>
          
          <!-- 高級設置 -->
          <nz-tab nzTitle="高級設置">
            <app-advanced-settings [settings]="settings.advanced" (update)="updateAdvanced($event)"></app-advanced-settings>
          </nz-tab>
        </nz-tabset>
      </nz-card>
    </div>
  `
})
export class OrganizationSettingsComponent implements OnInit {
  private readonly settingsService = inject(OrganizationSettingsService);
  private readonly message = inject(NzMessageService);
  
  settings!: OrganizationSettings;
  
  ngOnInit() {
    this.loadSettings();
  }
  
  private loadSettings() {
    this.settingsService.getSettings().subscribe({
      next: (settings) => this.settings = settings,
      error: (error) => this.message.error('載入設置失敗')
    });
  }
  
  updateBasicInfo(basicInfo: BasicInfoSettings) {
    this.settingsService.updateBasicInfo(basicInfo).subscribe({
      next: () => {
        this.settings.basicInfo = basicInfo;
        this.message.success('基本信息更新成功');
      }
    });
  }
  
  updateSecurity(security: SecuritySettings) {
    this.settingsService.updateSecurity(security).subscribe({
      next: () => {
        this.settings.security = security;
        this.message.success('安全設置更新成功');
      }
    });
  }
  
  updateIntegrations(integrations: IntegrationSettings) {
    this.settingsService.updateIntegrations(integrations).subscribe({
      next: () => {
        this.settings.integrations = integrations;
        this.message.success('集成設置更新成功');
      }
    });
  }
  
  updateNotifications(notifications: NotificationSettings) {
    this.settingsService.updateNotifications(notifications).subscribe({
      next: () => {
        this.settings.notifications = notifications;
        this.message.success('通知設置更新成功');
      }
    });
  }
  
  updateAdvanced(advanced: AdvancedSettings) {
    this.settingsService.updateAdvanced(advanced).subscribe({
      next: () => {
        this.settings.advanced = advanced;
        this.message.success('高級設置更新成功');
      }
    });
  }
}
```

### 基本信息設置組件
```typescript
@Component({
  selector: 'app-basic-info-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SEModule],
  template: `
    <div class="basic-info-settings">
      <se-container>
        <se label="組織名稱" [required]="true">
          <input nz-input [(ngModel)]="basicInfo.name" placeholder="請輸入組織名稱" />
        </se>
        
        <se label="組織標識" [required]="true">
          <input nz-input [(ngModel)]="basicInfo.slug" placeholder="請輸入組織標識" />
        </se>
        
        <se label="組織描述">
          <textarea nz-input [(ngModel)]="basicInfo.description" placeholder="請輸入組織描述" rows="3"></textarea>
        </se>
        
        <se label="官方網站">
          <input nz-input [(ngModel)]="basicInfo.website" placeholder="https://example.com" />
        </se>
        
        <se label="時區">
          <nz-select [(ngModel)]="basicInfo.timezone">
            <nz-option *ngFor="let tz of timezones" [nzValue]="tz.value" [nzLabel]="tz.label"></nz-option>
          </nz-select>
        </se>
        
        <se label="默認語言">
          <nz-select [(ngModel)]="basicInfo.language">
            <nz-option *ngFor="let lang of languages" [nzValue]="lang.value" [nzLabel]="lang.label"></nz-option>
          </nz-select>
        </se>
        
        <se label="默認貨幣">
          <nz-select [(ngModel)]="basicInfo.currency">
            <nz-option *ngFor="let currency of currencies" [nzValue]="currency.value" [nzLabel]="currency.label"></nz-option>
          </nz-select>
        </se>
        
        <se>
          <button nz-button nzType="primary" (click)="save()">保存設置</button>
          <button nz-button (click)="reset()">重置</button>
        </se>
      </se-container>
    </div>
  `
})
export class BasicInfoSettingsComponent implements OnInit {
  @Input() settings!: BasicInfoSettings;
  @Output() update = new EventEmitter<BasicInfoSettings>();
  
  basicInfo!: BasicInfoSettings;
  
  timezones = [
    { value: 'UTC', label: 'UTC' },
    { value: 'Asia/Shanghai', label: 'Asia/Shanghai' },
    { value: 'America/New_York', label: 'America/New_York' }
  ];
  
  languages = [
    { value: 'zh-CN', label: '中文（簡體）' },
    { value: 'en-US', label: 'English' }
  ];
  
  currencies = [
    { value: 'CNY', label: '人民幣 (CNY)' },
    { value: 'USD', label: '美元 (USD)' },
    { value: 'EUR', label: '歐元 (EUR)' }
  ];
  
  ngOnInit() {
    this.basicInfo = { ...this.settings };
  }
  
  save() {
    this.update.emit(this.basicInfo);
  }
  
  reset() {
    this.basicInfo = { ...this.settings };
  }
}
```

## 🔧 服務層設計

### 組織設置服務 (OrganizationSettingsService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class OrganizationSettingsService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/organization-settings';
  
  // 獲取組織設置
  getSettings(): Observable<OrganizationSettings> {
    return this.cache.get('organization-settings', () =>
      this.http.get<OrganizationSettings>(this.API_BASE)
    );
  }
  
  // 更新基本信息
  updateBasicInfo(basicInfo: BasicInfoSettings): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/basic-info`, basicInfo).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新安全設置
  updateSecurity(security: SecuritySettings): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/security`, security).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新集成設置
  updateIntegrations(integrations: IntegrationSettings): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/integrations`, integrations).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新通知設置
  updateNotifications(notifications: NotificationSettings): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/notifications`, notifications).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新高級設置
  updateAdvanced(advanced: AdvancedSettings): Observable<void> {
    return this.http.put<void>(`${this.API_BASE}/advanced`, advanced).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 重置設置
  resetSettings(): Observable<void> {
    return this.http.post<void>(`${this.API_BASE}/reset`, {}).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 導出設置
  exportSettings(): Observable<Blob> {
    return this.http.get(`${this.API_BASE}/export`, { responseType: 'blob' });
  }
  
  // 導入設置
  importSettings(file: File): Observable<void> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<void>(`${this.API_BASE}/import`, formData).pipe(
      tap(() => this.cache.clear())
    );
  }
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('OrganizationSettingsService', () => {
  let service: OrganizationSettingsService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrganizationSettingsService]
    });
    service = TestBed.inject(OrganizationSettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should get organization settings', () => {
    const mockSettings: OrganizationSettings = {
      id: '1',
      organizationId: 'org-1',
      basicInfo: {} as BasicInfoSettings,
      security: {} as SecuritySettings,
      integrations: {} as IntegrationSettings,
      notifications: {} as NotificationSettings,
      advanced: {} as AdvancedSettings,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    service.getSettings().subscribe(settings => {
      expect(settings).toEqual(mockSettings);
    });
    
    const req = httpMock.expectOne('/api/organization-settings');
    expect(req.request.method).toBe('GET');
    req.flush(mockSettings);
  });
  
  it('should update basic info', () => {
    const basicInfo: BasicInfoSettings = {
      name: 'Test Organization',
      slug: 'test-org',
      timezone: 'UTC',
      language: 'en-US',
      currency: 'USD',
      socialLinks: []
    };
    
    service.updateBasicInfo(basicInfo).subscribe(() => {
      expect(true).toBe(true);
    });
    
    const req = httpMock.expectOne('/api/organization-settings/basic-info');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(basicInfo);
    req.flush({});
  });
});
```

## ⚡ 性能優化

### 設置緩存策略
```typescript
@Injectable({
  providedIn: 'root'
})
export class SettingsCacheService {
  private readonly cache = inject(DelonCacheService);
  private readonly CACHE_KEY = 'org-settings';
  private readonly CACHE_EXPIRE = 30 * 60 * 1000; // 30分鐘
  
  // 緩存組織設置
  cacheSettings(settings: OrganizationSettings): void {
    this.cache.set(this.CACHE_KEY, settings, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的設置
  getCachedSettings(): OrganizationSettings | null {
    return this.cache.get(this.CACHE_KEY);
  }
  
  // 清除設置緩存
  clearSettingsCache(): void {
    this.cache.remove(this.CACHE_KEY);
  }
  
  // 預載入設置
  preloadSettings(): Observable<OrganizationSettings> {
    return this.settingsService.getSettings().pipe(
      tap(settings => this.cacheSettings(settings))
    );
  }
}
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// 組織設置 API
GET    /api/organization-settings              // 獲取組織設置
PUT    /api/organization-settings/basic-info   // 更新基本信息
PUT    /api/organization-settings/security     // 更新安全設置
PUT    /api/organization-settings/integrations // 更新集成設置
PUT    /api/organization-settings/notifications // 更新通知設置
PUT    /api/organization-settings/advanced     // 更新高級設置
POST   /api/organization-settings/reset        // 重置設置
GET    /api/organization-settings/export       // 導出設置
POST   /api/organization-settings/import       // 導入設置
```

## 📊 成功指標

### 功能指標
- [ ] 支持 50+ 種設置選項
- [ ] 設置變更響應時間 < 1 秒
- [ ] 支持設置導入/導出
- [ ] 100% 設置驗證覆蓋
- [ ] 支持設置版本管理

### 性能指標
- [ ] 設置載入時間 < 500ms
- [ ] 設置緩存命中率 > 90%
- [ ] 支持設置批量更新
- [ ] 支持設置預覽

### 安全指標
- [ ] 設置變更審計
- [ ] 敏感設置加密存儲
- [ ] 設置權限控制
- [ ] 設置備份和恢復

---

**📝 注意**: 本模組需要與權限控制模組和安全架構深度集成，確保設置的安全性和合規性。