# 📦 包管理模組

## 📋 概述

包管理模組提供完整的包倉庫管理、版本控制、依賴管理和安全掃描功能，支持多種包類型和包管理工具。

### 🎯 模組目標
- 提供包倉庫管理功能
- 實現版本控制系統
- 支持依賴管理和解析
- 提供安全掃描和漏洞檢測

## 🏗️ 功能架構

### 核心功能
```
包管理功能
├── 包倉庫管理
│   ├── 包創建與上傳
│   ├── 包搜索與發現
│   ├── 包分類與標籤
│   └── 包統計與分析
├── 版本控制
│   ├── 版本發布管理
│   ├── 版本比較與回滾
│   ├── 版本依賴追蹤
│   └── 版本兼容性檢查
├── 依賴管理
│   ├── 依賴解析與安裝
│   ├── 依賴衝突檢測
│   ├── 依賴更新管理
│   └── 依賴安全掃描
└── 安全掃描
    ├── 漏洞數據庫
    ├── 安全掃描引擎
    ├── 漏洞報告生成
    └── 安全策略配置
```

## 📊 數據結構

### 核心實體
```typescript
// 包
export interface Package {
  id: string;
  name: string;
  description: string;
  type: PackageType;
  status: PackageStatus;
  metadata: PackageMetadata;
  versions: PackageVersion[];
  dependencies: PackageDependency[];
  statistics: PackageStatistics;
  security: PackageSecurity;
  createdAt: Date;
  updatedAt: Date;
}

// 包類型
export enum PackageType {
  NPM = 'npm',
  PYPI = 'pypi',
  MAVEN = 'maven',
  NUGET = 'nuget',
  DOCKER = 'docker',
  GENERIC = 'generic'
}

// 包狀態
export enum PackageStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  DEPRECATED = 'deprecated',
  ARCHIVED = 'archived'
}

// 包元數據
export interface PackageMetadata {
  author: string;
  license: string;
  homepage?: string;
  repository?: string;
  keywords: string[];
  tags: string[];
  category: string;
  language: string;
  platform: string[];
  size: number;
  checksum: string;
}

// 包版本
export interface PackageVersion {
  id: string;
  packageId: string;
  version: string;
  status: VersionStatus;
  metadata: VersionMetadata;
  files: PackageFile[];
  dependencies: VersionDependency[];
  changelog: string;
  security: VersionSecurity;
  createdAt: Date;
  publishedAt?: Date;
}

// 版本狀態
export enum VersionStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  DEPRECATED = 'deprecated',
  UNPUBLISHED = 'unpublished'
}

// 版本元數據
export interface VersionMetadata {
  description: string;
  author: string;
  license: string;
  homepage?: string;
  repository?: string;
  keywords: string[];
  size: number;
  checksum: string;
  signature?: string;
  buildInfo: BuildInfo;
}

// 構建信息
export interface BuildInfo {
  buildNumber: string;
  buildDate: Date;
  buildTool: string;
  buildEnvironment: string;
  sourceVersion: string;
  buildLog?: string;
}

// 包文件
export interface PackageFile {
  id: string;
  name: string;
  path: string;
  size: number;
  checksum: string;
  contentType: string;
  isMain: boolean;
  downloadUrl: string;
  createdAt: Date;
}

// 版本依賴
export interface VersionDependency {
  id: string;
  packageName: string;
  version: string;
  type: DependencyType;
  scope: DependencyScope;
  optional: boolean;
  resolved?: string;
  integrity?: string;
}

// 依賴類型
export enum DependencyType {
  RUNTIME = 'runtime',
  DEVELOPMENT = 'development',
  PEER = 'peer',
  OPTIONAL = 'optional',
  BUNDLED = 'bundled'
}

// 依賴範圍
export enum DependencyScope {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
  BUILD = 'build'
}

// 包依賴
export interface PackageDependency {
  id: string;
  packageId: string;
  dependencyPackageId: string;
  dependencyPackage: Package;
  type: DependencyType;
  scope: DependencyScope;
  versionRange: string;
  isOptional: boolean;
  createdAt: Date;
}

// 包統計
export interface PackageStatistics {
  totalDownloads: number;
  monthlyDownloads: number;
  weeklyDownloads: number;
  dailyDownloads: number;
  totalVersions: number;
  lastDownload?: Date;
  popularity: number;
  trending: boolean;
}

// 包安全
export interface PackageSecurity {
  vulnerabilities: Vulnerability[];
  riskScore: number;
  riskLevel: RiskLevel;
  lastScanned: Date;
  scanStatus: ScanStatus;
  securityPolicy: SecurityPolicy;
}

// 漏洞
export interface Vulnerability {
  id: string;
  cveId?: string;
  title: string;
  description: string;
  severity: VulnerabilitySeverity;
  cvssScore: number;
  affectedVersions: string[];
  fixedVersions: string[];
  references: string[];
  publishedAt: Date;
  discoveredAt: Date;
}

// 漏洞嚴重程度
export enum VulnerabilitySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// 風險級別
export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// 掃描狀態
export enum ScanStatus {
  PENDING = 'pending',
  SCANNING = 'scanning',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// 安全策略
export interface SecurityPolicy {
  allowUnsafe: boolean;
  maxRiskScore: number;
  blockedSeverities: VulnerabilitySeverity[];
  autoUpdate: boolean;
  notifications: SecurityNotification[];
}

// 安全通知
export interface SecurityNotification {
  type: NotificationType;
  enabled: boolean;
  recipients: string[];
  channels: NotificationChannel[];
}

// 通知類型
export enum NotificationType {
  NEW_VULNERABILITY = 'new_vulnerability',
  VULNERABILITY_FIXED = 'vulnerability_fixed',
  HIGH_RISK_PACKAGE = 'high_risk_package',
  SCAN_FAILED = 'scan_failed'
}

// 版本安全
export interface VersionSecurity {
  vulnerabilities: Vulnerability[];
  riskScore: number;
  riskLevel: RiskLevel;
  lastScanned: Date;
  scanStatus: ScanStatus;
}

// 包倉庫
export interface PackageRegistry {
  id: string;
  name: string;
  type: PackageType;
  url: string;
  status: RegistryStatus;
  configuration: RegistryConfiguration;
  statistics: RegistryStatistics;
  createdAt: Date;
  updatedAt: Date;
}

// 倉庫狀態
export enum RegistryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  MAINTENANCE = 'maintenance',
  ERROR = 'error'
}

// 倉庫配置
export interface RegistryConfiguration {
  authentication: AuthenticationConfig;
  storage: StorageConfig;
  mirroring: MirroringConfig;
  security: SecurityConfig;
}

// 存儲配置
export interface StorageConfig {
  type: StorageType;
  location: string;
  maxSize: number;
  retention: number; // 天數
  compression: boolean;
  encryption: boolean;
}

// 存儲類型
export enum StorageType {
  LOCAL = 'local',
  S3 = 's3',
  AZURE = 'azure',
  GCS = 'gcs'
}

// 鏡像配置
export interface MirroringConfig {
  enabled: boolean;
  upstream: string[];
  syncInterval: number; // 分鐘
  autoSync: boolean;
  filters: MirroringFilter[];
}

// 鏡像過濾器
export interface MirroringFilter {
  type: FilterType;
  pattern: string;
  action: FilterAction;
}

// 過濾類型
export enum FilterType {
  PACKAGE_NAME = 'package_name',
  VERSION = 'version',
  AUTHOR = 'author',
  LICENSE = 'license'
}

// 過濾動作
export enum FilterAction {
  INCLUDE = 'include',
  EXCLUDE = 'exclude'
}

// 安全配置
export interface SecurityConfig {
  scanning: ScanningConfig;
  authentication: AuthenticationConfig;
  authorization: AuthorizationConfig;
}

// 掃描配置
export interface ScanningConfig {
  enabled: boolean;
  schedule: string; // Cron 表達式
  scanners: ScannerType[];
  autoFix: boolean;
  quarantine: boolean;
}

// 掃描器類型
export enum ScannerType {
  VULNERABILITY = 'vulnerability',
  MALWARE = 'malware',
  LICENSE = 'license',
  QUALITY = 'quality'
}

// 認證配置
export interface AuthenticationConfig {
  type: AuthType;
  credentials: Record<string, any>;
  tokenExpiry: number; // 小時
}

// 認證類型
export enum AuthType {
  NONE = 'none',
  API_KEY = 'api_key',
  OAUTH2 = 'oauth2',
  JWT = 'jwt'
}

// 授權配置
export interface AuthorizationConfig {
  readAccess: AccessLevel;
  writeAccess: AccessLevel;
  adminAccess: AccessLevel;
  customPolicies: AccessPolicy[];
}

// 訪問級別
export enum AccessLevel {
  PUBLIC = 'public',
  AUTHENTICATED = 'authenticated',
  ORGANIZATION = 'organization',
  PRIVATE = 'private'
}

// 訪問策略
export interface AccessPolicy {
  id: string;
  name: string;
  description: string;
  rules: AccessRule[];
  conditions: AccessCondition[];
}

// 訪問規則
export interface AccessRule {
  resource: string;
  actions: string[];
  effect: Effect;
}

// 效果
export enum Effect {
  ALLOW = 'allow',
  DENY = 'deny'
}

// 訪問條件
export interface AccessCondition {
  field: string;
  operator: ConditionOperator;
  value: any;
}

// 條件操作符
export enum ConditionOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  IN = 'in',
  NOT_IN = 'not_in',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than'
}

// 倉庫統計
export interface RegistryStatistics {
  totalPackages: number;
  totalVersions: number;
  totalDownloads: number;
  storageUsed: number;
  lastSync?: Date;
  syncStatus: SyncStatus;
}

// 同步狀態
export enum SyncStatus {
  IDLE = 'idle',
  SYNCING = 'syncing',
  SUCCESS = 'success',
  FAILED = 'failed'
}

// 包搜索結果
export interface PackageSearchResult {
  packages: Package[];
  total: number;
  page: number;
  pageSize: number;
  facets: SearchFacet[];
  suggestions: string[];
}

// 搜索分面
export interface SearchFacet {
  name: string;
  values: FacetValue[];
}

// 分面值
export interface FacetValue {
  value: string;
  count: number;
  selected: boolean;
}

// 依賴解析結果
export interface DependencyResolution {
  package: Package;
  version: PackageVersion;
  dependencies: ResolvedDependency[];
  conflicts: DependencyConflict[];
  warnings: ResolutionWarning[];
}

// 已解析依賴
export interface ResolvedDependency {
  package: Package;
  version: PackageVersion;
  type: DependencyType;
  scope: DependencyScope;
  resolved: boolean;
  source: string;
}

// 依賴衝突
export interface DependencyConflict {
  package: string;
  requiredVersions: string[];
  conflictType: ConflictType;
  resolution: ConflictResolution;
}

// 衝突類型
export enum ConflictType {
  VERSION_MISMATCH = 'version_mismatch',
  CIRCULAR_DEPENDENCY = 'circular_dependency',
  INCOMPATIBLE_LICENSE = 'incompatible_license',
  SECURITY_CONFLICT = 'security_conflict'
}

// 衝突解決方案
export interface ConflictResolution {
  type: ResolutionType;
  action: ResolutionAction;
  reason: string;
  alternative?: string;
}

// 解決類型
export enum ResolutionType {
  AUTOMATIC = 'automatic',
  MANUAL = 'manual',
  SKIP = 'skip',
  FAIL = 'fail'
}

// 解決動作
export enum ResolutionAction {
  USE_LATEST = 'use_latest',
  USE_COMPATIBLE = 'use_compatible',
  REMOVE_DEPENDENCY = 'remove_dependency',
  REPLACE_DEPENDENCY = 'replace_dependency'
}

// 解析警告
export interface ResolutionWarning {
  type: WarningType;
  message: string;
  package?: string;
  version?: string;
  severity: WarningSeverity;
}

// 警告類型
export enum WarningType {
  DEPRECATED = 'deprecated',
  UNMAINTAINED = 'unmaintained',
  VULNERABILITY = 'vulnerability',
  LICENSE = 'license',
  SIZE = 'size'
}

// 警告嚴重程度
export enum WarningSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}
```

## 🎨 Angular 組件

### 包管理組件
```typescript
// 包管理組件
@Component({
  selector: 'app-package-management',
  template: `
    <nz-card>
      <div nz-row nzGutter="16">
        <div nz-col nzSpan="24">
          <div class="package-header">
            <h2>包管理</h2>
            <div class="header-actions">
              <nz-input-group [nzSuffix]="suffixIcon">
                <input type="text" nz-input placeholder="搜索包..." [(ngModel)]="searchQuery" (keyup.enter)="searchPackages()">
              </nz-input-group>
              <ng-template #suffixIcon>
                <i nz-icon nzType="search"></i>
              </ng-template>
              <button nz-button nzType="primary" (click)="uploadPackage()">
                <i nz-icon nzType="upload"></i>
                上傳包
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <nz-tabset>
        <nz-tab nzTitle="包列表">
          <app-package-list 
            [packages]="packages"
            [loading]="loading"
            (view)="viewPackage($event)"
            (edit)="editPackage($event)"
            (delete)="deletePackage($event)"
            (scan)="scanPackage($event)">
          </app-package-list>
        </nz-tab>
        
        <nz-tab nzTitle="依賴管理">
          <app-dependency-management 
            [dependencies]="dependencies"
            [conflicts]="conflicts"
            (resolve)="resolveDependencies()"
            (update)="updateDependencies()">
          </app-dependency-management>
        </nz-tab>
        
        <nz-tab nzTitle="安全掃描">
          <app-security-scanning 
            [vulnerabilities]="vulnerabilities"
            [scanResults]="scanResults"
            (scan)="performSecurityScan()"
            (fix)="fixVulnerabilities()">
          </app-security-scanning>
        </nz-tab>
        
        <nz-tab nzTitle="倉庫管理">
          <app-registry-management 
            [registries]="registries"
            (create)="createRegistry()"
            (edit)="editRegistry($event)"
            (delete)="deleteRegistry($event)">
          </app-registry-management>
        </nz-tab>
      </nz-tabset>
    </nz-card>
  `,
  styles: [`
    .package-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .header-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }
  `]
})
export class PackageManagementComponent implements OnInit {
  packages: Package[] = [];
  dependencies: PackageDependency[] = [];
  conflicts: DependencyConflict[] = [];
  vulnerabilities: Vulnerability[] = [];
  scanResults: SecurityScanResult[] = [];
  registries: PackageRegistry[] = [];
  
  searchQuery = '';
  loading = false;
  
  constructor(
    private packageService: PackageService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}
  
  ngOnInit(): void {
    this.loadPackages();
    this.loadDependencies();
    this.loadVulnerabilities();
    this.loadRegistries();
  }
  
  // 搜索包
  searchPackages(): void {
    if (!this.searchQuery.trim()) {
      this.loadPackages();
      return;
    }
    
    this.loading = true;
    this.packageService.searchPackages(this.searchQuery).subscribe({
      next: (result) => {
        this.packages = result.packages;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('搜索失敗：' + error.message);
        this.loading = false;
      }
    });
  }
  
  // 上傳包
  uploadPackage(): void {
    const modalRef = this.modal.create({
      nzTitle: '上傳包',
      nzContent: UploadPackageComponent,
      nzWidth: 600,
      nzOnOk: (component) => component.upload()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadPackages();
        this.message.success('包上傳成功');
      }
    });
  }
  
  // 查看包
  viewPackage(package: Package): void {
    const modalRef = this.modal.create({
      nzTitle: `包詳情 - ${package.name}`,
      nzContent: PackageViewComponent,
      nzWidth: 800,
      nzComponentParams: { package },
      nzFooter: [
        {
          label: '下載',
          onClick: () => this.downloadPackage(package)
        },
        {
          label: '關閉',
          onClick: () => modalRef.destroy()
        }
      ]
    });
  }
  
  // 編輯包
  editPackage(package: Package): void {
    const modalRef = this.modal.create({
      nzTitle: '編輯包',
      nzContent: EditPackageComponent,
      nzWidth: 600,
      nzComponentParams: { package },
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadPackages();
        this.message.success('包更新成功');
      }
    });
  }
  
  // 刪除包
  deletePackage(package: Package): void {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除包 "${package.name}" 嗎？此操作不可撤銷。`,
      nzOnOk: () => {
        this.packageService.deletePackage(package.id).subscribe({
          next: () => {
            this.loadPackages();
            this.message.success('包刪除成功');
          },
          error: (error) => this.message.error('刪除失敗：' + error.message)
        });
      }
    });
  }
  
  // 掃描包
  scanPackage(package: Package): void {
    this.packageService.scanPackage(package.id).subscribe({
      next: (result) => {
        this.message.success('安全掃描完成');
        this.loadVulnerabilities();
      },
      error: (error) => this.message.error('掃描失敗：' + error.message)
    });
  }
  
  // 下載包
  downloadPackage(package: Package): void {
    this.packageService.downloadPackage(package.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${package.name}-${package.versions[0].version}.tgz`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => this.message.error('下載失敗：' + error.message)
    });
  }
  
  // 解析依賴
  resolveDependencies(): void {
    this.packageService.resolveDependencies().subscribe({
      next: (result) => {
        this.dependencies = result.dependencies;
        this.conflicts = result.conflicts;
        this.message.success('依賴解析完成');
      },
      error: (error) => this.message.error('依賴解析失敗：' + error.message)
    });
  }
  
  // 更新依賴
  updateDependencies(): void {
    this.packageService.updateDependencies().subscribe({
      next: () => {
        this.loadDependencies();
        this.message.success('依賴更新完成');
      },
      error: (error) => this.message.error('依賴更新失敗：' + error.message)
    });
  }
  
  // 執行安全掃描
  performSecurityScan(): void {
    this.packageService.performSecurityScan().subscribe({
      next: (results) => {
        this.scanResults = results;
        this.message.success('安全掃描完成');
      },
      error: (error) => this.message.error('安全掃描失敗：' + error.message)
    });
  }
  
  // 修復漏洞
  fixVulnerabilities(): void {
    this.packageService.fixVulnerabilities().subscribe({
      next: () => {
        this.loadVulnerabilities();
        this.message.success('漏洞修復完成');
      },
      error: (error) => this.message.error('漏洞修復失敗：' + error.message)
    });
  }
  
  // 創建倉庫
  createRegistry(): void {
    const modalRef = this.modal.create({
      nzTitle: '創建倉庫',
      nzContent: CreateRegistryComponent,
      nzWidth: 600,
      nzOnOk: (component) => component.create()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadRegistries();
        this.message.success('倉庫創建成功');
      }
    });
  }
  
  // 編輯倉庫
  editRegistry(registry: PackageRegistry): void {
    const modalRef = this.modal.create({
      nzTitle: '編輯倉庫',
      nzContent: EditRegistryComponent,
      nzWidth: 600,
      nzComponentParams: { registry },
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadRegistries();
        this.message.success('倉庫更新成功');
      }
    });
  }
  
  // 刪除倉庫
  deleteRegistry(registry: PackageRegistry): void {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除倉庫 "${registry.name}" 嗎？`,
      nzOnOk: () => {
        this.packageService.deleteRegistry(registry.id).subscribe({
          next: () => {
            this.loadRegistries();
            this.message.success('倉庫刪除成功');
          },
          error: (error) => this.message.error('刪除失敗：' + error.message)
        });
      }
    });
  }
  
  // 載入數據
  private loadPackages(): void {
    this.loading = true;
    this.packageService.getPackages().subscribe({
      next: (packages) => {
        this.packages = packages;
        this.loading = false;
      },
      error: (error) => {
        this.message.error('載入包列表失敗：' + error.message);
        this.loading = false;
      }
    });
  }
  
  private loadDependencies(): void {
    this.packageService.getDependencies().subscribe({
      next: (dependencies) => this.dependencies = dependencies,
      error: (error) => this.message.error('載入依賴列表失敗：' + error.message)
    });
  }
  
  private loadVulnerabilities(): void {
    this.packageService.getVulnerabilities().subscribe({
      next: (vulnerabilities) => this.vulnerabilities = vulnerabilities,
      error: (error) => this.message.error('載入漏洞列表失敗：' + error.message)
    });
  }
  
  private loadRegistries(): void {
    this.packageService.getRegistries().subscribe({
      next: (registries) => this.registries = registries,
      error: (error) => this.message.error('載入倉庫列表失敗：' + error.message)
    });
  }
}
```

## 🔧 服務層

### 包服務
```typescript
@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private readonly baseUrl = '/api/packages';
  
  constructor(private http: HttpClient) {}
  
  // 獲取包列表
  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.baseUrl);
  }
  
  // 搜索包
  searchPackages(query: string): Observable<PackageSearchResult> {
    return this.http.get<PackageSearchResult>(`${this.baseUrl}/search`, {
      params: { q: query }
    });
  }
  
  // 獲取包詳情
  getPackage(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.baseUrl}/${id}`);
  }
  
  // 創建包
  createPackage(package: Partial<Package>): Observable<Package> {
    return this.http.post<Package>(this.baseUrl, package);
  }
  
  // 更新包
  updatePackage(id: string, package: Partial<Package>): Observable<Package> {
    return this.http.put<Package>(`${this.baseUrl}/${id}`, package);
  }
  
  // 刪除包
  deletePackage(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  // 上傳包版本
  uploadPackageVersion(packageId: string, file: File): Observable<PackageVersion> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<PackageVersion>(`${this.baseUrl}/${packageId}/versions`, formData);
  }
  
  // 下載包
  downloadPackage(id: string, version?: string): Observable<Blob> {
    const params = version ? { version } : {};
    return this.http.get(`${this.baseUrl}/${id}/download`, {
      responseType: 'blob',
      params
    });
  }
  
  // 獲取包版本
  getPackageVersions(packageId: string): Observable<PackageVersion[]> {
    return this.http.get<PackageVersion[]>(`${this.baseUrl}/${packageId}/versions`);
  }
  
  // 發布包版本
  publishPackageVersion(packageId: string, version: string): Observable<PackageVersion> {
    return this.http.post<PackageVersion>(`${this.baseUrl}/${packageId}/versions/${version}/publish`, {});
  }
  
  // 撤銷包版本
  unpublishPackageVersion(packageId: string, version: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${packageId}/versions/${version}/unpublish`, {});
  }
  
  // 獲取依賴
  getDependencies(): Observable<PackageDependency[]> {
    return this.http.get<PackageDependency[]>(`${this.baseUrl}/dependencies`);
  }
  
  // 解析依賴
  resolveDependencies(): Observable<DependencyResolution> {
    return this.http.post<DependencyResolution>(`${this.baseUrl}/dependencies/resolve`, {});
  }
  
  // 更新依賴
  updateDependencies(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/dependencies/update`, {});
  }
  
  // 獲取漏洞
  getVulnerabilities(): Observable<Vulnerability[]> {
    return this.http.get<Vulnerability[]>(`${this.baseUrl}/vulnerabilities`);
  }
  
  // 掃描包
  scanPackage(packageId: string): Observable<SecurityScanResult> {
    return this.http.post<SecurityScanResult>(`${this.baseUrl}/${packageId}/scan`, {});
  }
  
  // 執行安全掃描
  performSecurityScan(): Observable<SecurityScanResult[]> {
    return this.http.post<SecurityScanResult[]>(`${this.baseUrl}/security/scan`, {});
  }
  
  // 修復漏洞
  fixVulnerabilities(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/security/fix`, {});
  }
  
  // 獲取倉庫
  getRegistries(): Observable<PackageRegistry[]> {
    return this.http.get<PackageRegistry[]>(`${this.baseUrl}/registries`);
  }
  
  // 創建倉庫
  createRegistry(registry: Partial<PackageRegistry>): Observable<PackageRegistry> {
    return this.http.post<PackageRegistry>(`${this.baseUrl}/registries`, registry);
  }
  
  // 更新倉庫
  updateRegistry(id: string, registry: Partial<PackageRegistry>): Observable<PackageRegistry> {
    return this.http.put<PackageRegistry>(`${this.baseUrl}/registries/${id}`, registry);
  }
  
  // 刪除倉庫
  deleteRegistry(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/registries/${id}`);
  }
  
  // 同步倉庫
  syncRegistry(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/registries/${id}/sync`, {});
  }
}

// 安全掃描結果
export interface SecurityScanResult {
  packageId: string;
  packageName: string;
  vulnerabilities: Vulnerability[];
  riskScore: number;
  riskLevel: RiskLevel;
  scanDate: Date;
  scanStatus: ScanStatus;
}
```

## 📊 成功指標

### 功能指標
- [ ] 包管理功能完整性 > 95%
- [ ] 版本控制準確性 > 99%
- [ ] 依賴解析準確性 > 98%
- [ ] 安全掃描覆蓋率 > 90%

### 性能指標
- [ ] 包上傳時間 < 30 秒
- [ ] 依賴解析時間 < 10 秒
- [ ] 安全掃描時間 < 5 分鐘
- [ ] 包搜索響應時間 < 2 秒

---

**📝 注意**: 包管理模組需要與安全掃描服務緊密集成，確保包的安全性和合規性。