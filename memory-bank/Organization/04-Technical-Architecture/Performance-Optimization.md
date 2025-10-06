# ⚡ 性能優化策略

## 📋 概述

本文檔詳細描述了 GitHub 組織功能系統的完整性能優化策略，包括前端優化、後端優化、數據庫優化、緩存策略和監控體系。

### 🎯 優化目標
- 頁面載入時間 < 2 秒
- API 響應時間 < 500ms
- 數據庫查詢時間 < 100ms
- 支持 1000+ 並發用戶
- 99.9% 系統可用性

## 🏗️ 性能優化架構

### 優化層次結構
```
性能優化體系
├── 前端優化
│   ├── 代碼分割和懶加載
│   ├── 組件優化
│   ├── 狀態管理優化
│   ├── 渲染優化
│   └── 資源優化
├── 後端優化
│   ├── API 優化
│   ├── 服務層優化
│   ├── 數據處理優化
│   ├── 異步處理優化
│   └── 內存管理優化
├── 數據庫優化
│   ├── 查詢優化
│   ├── 索引優化
│   ├── 分區優化
│   ├── 緩存優化
│   └── 連接池優化
├── 緩存策略
│   ├── 多層緩存
│   ├── 緩存失效策略
│   ├── 緩存預熱
│   └── 緩存監控
└── 監控體系
    ├── 性能監控
    ├── 錯誤監控
    ├── 業務監控
    └── 基礎設施監控
```

## 🎨 前端性能優化

### Angular 應用優化

#### 代碼分割和懶加載
```typescript
// 路由懶加載配置
const routes: Routes = [
  {
    path: 'organization',
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
    canActivate: [PermissionGuard],
    data: { preload: true }
  },
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamModule),
    canActivate: [PermissionGuard]
  },
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then(m => m.ProjectModule),
    canActivate: [PermissionGuard]
  }
];

// 預加載策略
@NgModule({
  providers: [
    {
      provide: PreloadingStrategy,
      useClass: CustomPreloadingStrategy
    }
  ]
})
export class AppModule {}

// 自定義預加載策略
@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    // 根據路由數據決定是否預加載
    if (route.data && route.data.preload) {
      return fn();
    }
    return of(null);
  }
}
```

#### 組件優化
```typescript
// OnPush 變更檢測策略
@Component({
  selector: 'app-organization-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="organization-list">
      <app-organization-card 
        *ngFor="let org of organizations$ | async; trackBy: trackByFn"
        [organization]="org">
      </app-organization-card>
    </div>
  `
})
export class OrganizationListComponent implements OnInit {
  private readonly organizationService = inject(OrganizationService);
  private readonly cdr = inject(ChangeDetectorRef);
  
  organizations$ = new BehaviorSubject<Organization[]>([]);
  
  ngOnInit() {
    this.loadOrganizations();
  }
  
  trackByFn(index: number, organization: Organization): string {
    return organization.id;
  }
  
  private loadOrganizations() {
    this.organizationService.getOrganizations().subscribe({
      next: (organizations) => {
        this.organizations$.next(organizations);
        this.cdr.markForCheck();
      }
    });
  }
}

// 虛擬滾動優化
@Component({
  selector: 'app-member-list',
  template: `
    <cdk-virtual-scroll-viewport
      itemSize="60"
      class="member-list-viewport">
      <div
        *cdkVirtualFor="let member of members; trackBy: trackByFn"
        class="member-item">
        <app-member-card [member]="member"></app-member-card>
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class MemberListComponent {
  members: OrganizationMember[] = [];
  
  trackByFn(index: number, member: OrganizationMember): string {
    return member.id;
  }
}
```

#### 狀態管理優化
```typescript
// 使用 BehaviorSubject 進行狀態管理
@Injectable({
  providedIn: 'root'
})
export class OrganizationStateService {
  private readonly organizations$ = new BehaviorSubject<Organization[]>([]);
  private readonly loading$ = new BehaviorSubject<boolean>(false);
  private readonly error$ = new BehaviorSubject<string | null>(null);
  
  // 只讀流
  readonly organizations = this.organizations$.asObservable();
  readonly loading = this.loading$.asObservable();
  readonly error = this.error$.asObservable();
  
  // 選擇器
  readonly activeOrganizations = this.organizations.pipe(
    map(orgs => orgs.filter(org => org.status === OrganizationStatus.ACTIVE))
  );
  
  readonly organizationCount = this.organizations.pipe(
    map(orgs => orgs.length)
  );
  
  updateOrganizations(organizations: Organization[]) {
    this.organizations$.next(organizations);
  }
  
  setLoading(loading: boolean) {
    this.loading$.next(loading);
  }
  
  setError(error: string | null) {
    this.error$.next(error);
  }
}

// 使用 RxJS 操作符優化數據流
@Injectable({
  providedIn: 'root'
})
export class OptimizedOrganizationService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  // 使用 shareReplay 避免重複請求
  getOrganizations(): Observable<Organization[]> {
    return this.cache.get('organizations', () =>
      this.http.get<Organization[]>('/api/organizations').pipe(
        shareReplay(1),
        catchError(error => {
          console.error('Failed to load organizations:', error);
          return of([]);
        })
      )
    );
  }
  
  // 使用 debounceTime 優化搜索
  searchOrganizations(searchTerm$: Observable<string>): Observable<Organization[]> {
    return searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => 
        term ? this.http.get<Organization[]>(`/api/organizations/search?q=${term}`) : of([])
      ),
      shareReplay(1)
    );
  }
}
```

#### 渲染優化
```typescript
// 使用 OnPush 和 ChangeDetectorRef
@Component({
  selector: 'app-organization-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-card [nzTitle]="organization.name">
      <p>{{ organization.description }}</p>
      <div class="organization-stats">
        <span>成員: {{ organization.statistics.totalMembers }}</span>
        <span>團隊: {{ organization.statistics.totalTeams }}</span>
      </div>
    </nz-card>
  `
})
export class OrganizationCardComponent {
  @Input() organization!: Organization;
  
  private readonly cdr = inject(ChangeDetectorRef);
  
  ngOnInit() {
    // 手動觸發變更檢測
    this.cdr.markForCheck();
  }
}

// 使用 ng-container 減少 DOM 節點
@Component({
  template: `
    <ng-container *ngIf="organizations.length > 0; else emptyState">
      <div class="organization-grid">
        <ng-container *ngFor="let org of organizations; trackBy: trackByFn">
          <app-organization-card [organization]="org"></app-organization-card>
        </ng-container>
      </div>
    </ng-container>
    
    <ng-template #emptyState>
      <nz-empty nzNotFoundContent="暫無組織數據"></nz-empty>
    </ng-template>
  `
})
export class OrganizationGridComponent {
  @Input() organizations: Organization[] = [];
  
  trackByFn(index: number, org: Organization): string {
    return org.id;
  }
}
```

### 資源優化

#### 圖片優化
```typescript
// 圖片懶加載指令
@Directive({
  selector: '[appLazyLoad]'
})
export class LazyLoadDirective implements OnInit {
  @Input() appLazyLoad!: string;
  @Input() placeholder = '/assets/images/placeholder.png';
  
  private readonly element = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  
  ngOnInit() {
    const img = this.element.nativeElement;
    this.renderer.setAttribute(img, 'src', this.placeholder);
    
    // 使用 Intersection Observer 實現懶加載
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setAttribute(img, 'src', this.appLazyLoad);
          observer.unobserve(img);
        }
      });
    });
    
    observer.observe(img);
  }
}

// 圖片壓縮服務
@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  compressImage(file: File, quality: number = 0.8): Promise<Blob> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(resolve, 'image/jpeg', quality);
      };
      
      img.src = URL.createObjectURL(file);
    });
  }
}
```

#### 字體和 CSS 優化
```typescript
// 字體預加載
@Component({
  selector: 'app-root',
  template: `
    <link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
    <router-outlet />
  `
})
export class AppComponent {}

// CSS 關鍵路徑優化
@Component({
  selector: 'app-organization',
  template: `
    <div class="organization-container">
      <app-organization-header [organization]="organization"></app-organization-header>
      <app-organization-content [organization]="organization"></app-organization-content>
    </div>
  `,
  styles: [`
    .organization-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    /* 關鍵 CSS 內聯 */
    app-organization-header {
      position: sticky;
      top: 0;
      z-index: 100;
    }
  `]
})
export class OrganizationComponent {}
```

## 🔧 後端性能優化

### API 優化

#### 數據庫查詢優化
```typescript
// 使用數據庫索引優化查詢
@Injectable({
  providedIn: 'root'
})
export class OptimizedOrganizationService {
  private readonly db = inject(DatabaseService);
  
  // 使用索引查詢
  async getOrganizationsWithIndex(params: GetOrganizationsParams): Promise<Organization[]> {
    const query = this.db.collection('organizations')
      .where('status', '==', 'active') // 使用索引字段
      .where('createdAt', '>=', params.startDate) // 使用索引字段
      .orderBy('createdAt', 'desc') // 使用索引字段
      .limit(params.limit);
    
    const snapshot = await query.get();
    return snapshot.docs.map(doc => doc.data() as Organization);
  }
  
  // 批量操作優化
  async batchUpdateOrganizations(updates: OrganizationUpdate[]): Promise<void> {
    const batch = this.db.batch();
    
    updates.forEach(update => {
      const ref = this.db.collection('organizations').doc(update.id);
      batch.update(ref, update.data);
    });
    
    await batch.commit();
  }
  
  // 分頁查詢優化
  async getOrganizationsPaginated(
    lastDoc?: DocumentSnapshot,
    limit: number = 20
  ): Promise<{ organizations: Organization[]; lastDoc?: DocumentSnapshot }> {
    let query = this.db.collection('organizations')
      .orderBy('createdAt', 'desc')
      .limit(limit);
    
    if (lastDoc) {
      query = query.startAfter(lastDoc);
    }
    
    const snapshot = await query.get();
    const organizations = snapshot.docs.map(doc => doc.data() as Organization);
    const newLastDoc = snapshot.docs[snapshot.docs.length - 1];
    
    return { organizations, lastDoc: newLastDoc };
  }
}
```

#### 緩存策略
```typescript
// 多層緩存服務
@Injectable({
  providedIn: 'root'
})
export class MultiLayerCacheService {
  private readonly memoryCache = new Map<string, CacheItem>();
  private readonly redisCache = inject(RedisService);
  private readonly db = inject(DatabaseService);
  
  async get<T>(key: string, ttl: number = 300): Promise<T | null> {
    // 1. 檢查內存緩存
    const memoryItem = this.memoryCache.get(key);
    if (memoryItem && !this.isExpired(memoryItem)) {
      return memoryItem.data as T;
    }
    
    // 2. 檢查 Redis 緩存
    const redisData = await this.redisCache.get(key);
    if (redisData) {
      const item: CacheItem = { data: redisData, expiresAt: Date.now() + ttl * 1000 };
      this.memoryCache.set(key, item);
      return redisData as T;
    }
    
    // 3. 從數據庫獲取
    return null;
  }
  
  async set<T>(key: string, data: T, ttl: number = 300): Promise<void> {
    const expiresAt = Date.now() + ttl * 1000;
    const item: CacheItem = { data, expiresAt };
    
    // 設置內存緩存
    this.memoryCache.set(key, item);
    
    // 設置 Redis 緩存
    await this.redisCache.setex(key, ttl, JSON.stringify(data));
  }
  
  private isExpired(item: CacheItem): boolean {
    return Date.now() > item.expiresAt;
  }
}

interface CacheItem {
  data: any;
  expiresAt: number;
}

// 緩存預熱服務
@Injectable({
  providedIn: 'root'
})
export class CacheWarmupService {
  private readonly cacheService = inject(MultiLayerCacheService);
  private readonly organizationService = inject(OrganizationService);
  
  async warmupCache(): Promise<void> {
    // 預熱常用數據
    const tasks = [
      this.preloadOrganizations(),
      this.preloadPermissions(),
      this.preloadTeams()
    ];
    
    await Promise.all(tasks);
  }
  
  private async preloadOrganizations(): Promise<void> {
    const organizations = await this.organizationService.getOrganizations();
    await this.cacheService.set('organizations:all', organizations, 600);
  }
  
  private async preloadPermissions(): Promise<void> {
    const permissions = await this.permissionService.getPermissions();
    await this.cacheService.set('permissions:all', permissions, 1800);
  }
  
  private async preloadTeams(): Promise<void> {
    const teams = await this.teamService.getTeams();
    await this.cacheService.set('teams:all', teams, 600);
  }
}
```

#### 異步處理優化
```typescript
// 隊列服務
@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private readonly queue = new Map<string, Queue>();
  
  async addJob<T>(queueName: string, job: Job<T>): Promise<void> {
    if (!this.queue.has(queueName)) {
      this.queue.set(queueName, new Queue());
    }
    
    const queue = this.queue.get(queueName)!;
    await queue.add(job);
  }
  
  async processQueue(queueName: string, processor: (job: Job<any>) => Promise<void>): Promise<void> {
    const queue = this.queue.get(queueName);
    if (!queue) return;
    
    queue.process(processor);
  }
}

class Queue {
  private jobs: Job<any>[] = [];
  private processing = false;
  
  async add(job: Job<any>): Promise<void> {
    this.jobs.push(job);
    if (!this.processing) {
      this.process();
    }
  }
  
  async process(processor: (job: Job<any>) => Promise<void>): Promise<void> {
    this.processing = true;
    
    while (this.jobs.length > 0) {
      const job = this.jobs.shift()!;
      try {
        await processor(job);
      } catch (error) {
        console.error('Job processing failed:', error);
      }
    }
    
    this.processing = false;
  }
}

interface Job<T> {
  id: string;
  data: T;
  attempts: number;
  maxAttempts: number;
}

// 批量處理服務
@Injectable({
  providedIn: 'root'
})
export class BatchProcessingService {
  private readonly batchSize = 100;
  private readonly batchTimeout = 5000; // 5秒
  
  private batches = new Map<string, any[]>();
  private timers = new Map<string, NodeJS.Timeout>();
  
  async addToBatch<T>(batchKey: string, item: T): Promise<void> {
    if (!this.batches.has(batchKey)) {
      this.batches.set(batchKey, []);
    }
    
    const batch = this.batches.get(batchKey)!;
    batch.push(item);
    
    // 如果達到批次大小，立即處理
    if (batch.length >= this.batchSize) {
      await this.processBatch(batchKey);
      return;
    }
    
    // 設置定時器
    if (!this.timers.has(batchKey)) {
      const timer = setTimeout(() => {
        this.processBatch(batchKey);
      }, this.batchTimeout);
      this.timers.set(batchKey, timer);
    }
  }
  
  private async processBatch(batchKey: string): Promise<void> {
    const batch = this.batches.get(batchKey);
    if (!batch || batch.length === 0) return;
    
    // 清除定時器
    const timer = this.timers.get(batchKey);
    if (timer) {
      clearTimeout(timer);
      this.timers.delete(batchKey);
    }
    
    // 處理批次
    try {
      await this.processBatchData(batchKey, batch);
    } finally {
      // 清空批次
      this.batches.set(batchKey, []);
    }
  }
  
  private async processBatchData(batchKey: string, batch: any[]): Promise<void> {
    // 根據批次類型處理數據
    switch (batchKey) {
      case 'audit-logs':
        await this.batchInsertAuditLogs(batch);
        break;
      case 'notifications':
        await this.batchSendNotifications(batch);
        break;
      default:
        console.warn(`Unknown batch key: ${batchKey}`);
    }
  }
  
  private async batchInsertAuditLogs(logs: AuditLog[]): Promise<void> {
    // 批量插入審計日誌
    const batch = this.db.batch();
    logs.forEach(log => {
      const ref = this.db.collection('audit_logs').doc();
      batch.set(ref, log);
    });
    await batch.commit();
  }
  
  private async batchSendNotifications(notifications: Notification[]): Promise<void> {
    // 批量發送通知
    await Promise.all(notifications.map(n => this.sendNotification(n)));
  }
}
```

## 🗄️ 數據庫性能優化

### 索引優化
```sql
-- 組織表索引
CREATE INDEX idx_organizations_status_created ON organizations(status, created_at DESC);
CREATE INDEX idx_organizations_owner ON organizations(owner_id);
CREATE INDEX idx_organizations_type_status ON organizations(type, status);

-- 成員表索引
CREATE INDEX idx_organization_members_org_user ON organization_members(organization_id, user_id);
CREATE INDEX idx_organization_members_role_status ON organization_members(role, status);
CREATE INDEX idx_organization_members_joined_at ON organization_members(joined_at DESC);

-- 團隊表索引
CREATE INDEX idx_teams_org_parent ON teams(organization_id, parent_team_id);
CREATE INDEX idx_teams_visibility_type ON teams(visibility, type);

-- 項目表索引
CREATE INDEX idx_projects_org_team ON projects(organization_id, team_id);
CREATE INDEX idx_projects_status_type ON projects(status, type);
CREATE INDEX idx_projects_owner ON projects(owner_id);

-- 審計日誌表索引
CREATE INDEX idx_audit_logs_org_timestamp ON audit_logs(organization_id, timestamp DESC);
CREATE INDEX idx_audit_logs_user_action ON audit_logs(user_id, action);
CREATE INDEX idx_audit_logs_resource ON audit_logs(resource_type, resource_id);
CREATE INDEX idx_audit_logs_severity ON audit_logs(severity, status);

-- 權限表索引
CREATE INDEX idx_permissions_org_resource ON permissions(organization_id, resource_type);
CREATE INDEX idx_permission_assignments_subject ON permission_assignments(subject_type, subject_id);
CREATE INDEX idx_permission_assignments_resource ON permission_assignments(resource_type, resource_id);
```

### 查詢優化
```typescript
// 優化的查詢服務
@Injectable({
  providedIn: 'root'
})
export class OptimizedDatabaseService {
  private readonly db = inject(DatabaseService);
  
  // 使用分區表優化大表查詢
  async getAuditLogsPartitioned(
    organizationId: string,
    startDate: Date,
    endDate: Date,
    limit: number = 1000
  ): Promise<AuditLog[]> {
    // 按月分區查詢
    const partitions = this.getDatePartitions(startDate, endDate);
    const results: AuditLog[] = [];
    
    for (const partition of partitions) {
      const query = this.db.collection(`audit_logs_${partition}`)
        .where('organization_id', '==', organizationId)
        .where('timestamp', '>=', partition.start)
        .where('timestamp', '<=', partition.end)
        .orderBy('timestamp', 'desc')
        .limit(limit);
      
      const snapshot = await query.get();
      const logs = snapshot.docs.map(doc => doc.data() as AuditLog);
      results.push(...logs);
      
      if (results.length >= limit) break;
    }
    
    return results.slice(0, limit);
  }
  
  // 使用物化視圖優化統計查詢
  async getOrganizationStatistics(organizationId: string): Promise<OrganizationStats> {
    // 從物化視圖獲取統計數據
    const statsRef = this.db.collection('organization_stats').doc(organizationId);
    const statsDoc = await statsRef.get();
    
    if (statsDoc.exists) {
      return statsDoc.data() as OrganizationStats;
    }
    
    // 如果物化視圖不存在，實時計算
    return this.calculateOrganizationStatistics(organizationId);
  }
  
  // 使用讀寫分離優化查詢性能
  async readFromReplica<T>(collection: string, query: any): Promise<T[]> {
    // 從讀副本查詢
    const replica = this.db.replica();
    const snapshot = await replica.collection(collection).where(query).get();
    return snapshot.docs.map(doc => doc.data() as T);
  }
  
  private getDatePartitions(startDate: Date, endDate: Date): Partition[] {
    const partitions: Partition[] = [];
    let current = new Date(startDate);
    
    while (current <= endDate) {
      const monthStart = new Date(current.getFullYear(), current.getMonth(), 1);
      const monthEnd = new Date(current.getFullYear(), current.getMonth() + 1, 0);
      
      partitions.push({
        key: `${current.getFullYear()}_${current.getMonth() + 1}`,
        start: monthStart,
        end: monthEnd
      });
      
      current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    }
    
    return partitions;
  }
}

interface Partition {
  key: string;
  start: Date;
  end: Date;
}
```

### 連接池優化
```typescript
// 數據庫連接池配置
@Injectable({
  providedIn: 'root'
})
export class DatabasePoolService {
  private readonly pool: Pool;
  
  constructor() {
    this.pool = new Pool({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      max: 20, // 最大連接數
      min: 5,  // 最小連接數
      idle: 10000, // 空閒超時時間
      acquire: 30000, // 獲取連接超時時間
      evict: 1000, // 檢查空閒連接間隔
      handleDisconnects: true
    });
  }
  
  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(sql, params);
      return result.rows;
    } finally {
      client.release();
    }
  }
  
  async transaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
```

## 📊 監控體系

### 性能監控
```typescript
// 性能監控服務
@Injectable({
  providedIn: 'root'
})
export class PerformanceMonitoringService {
  private readonly metrics = new Map<string, Metric>();
  
  // 記錄 API 響應時間
  recordApiResponseTime(endpoint: string, duration: number): void {
    const key = `api.${endpoint}.response_time`;
    this.recordMetric(key, duration, 'histogram');
  }
  
  // 記錄數據庫查詢時間
  recordDatabaseQueryTime(query: string, duration: number): void {
    const key = `database.${query}.query_time`;
    this.recordMetric(key, duration, 'histogram');
  }
  
  // 記錄緩存命中率
  recordCacheHitRate(cacheKey: string, hit: boolean): void {
    const key = `cache.${cacheKey}.hit_rate`;
    this.recordMetric(key, hit ? 1 : 0, 'counter');
  }
  
  // 記錄錯誤率
  recordErrorRate(service: string, error: boolean): void {
    const key = `service.${service}.error_rate`;
    this.recordMetric(key, error ? 1 : 0, 'counter');
  }
  
  private recordMetric(key: string, value: number, type: 'counter' | 'histogram' | 'gauge'): void {
    if (!this.metrics.has(key)) {
      this.metrics.set(key, { type, values: [] });
    }
    
    const metric = this.metrics.get(key)!;
    metric.values.push({ value, timestamp: Date.now() });
    
    // 保持最近 1000 個值
    if (metric.values.length > 1000) {
      metric.values = metric.values.slice(-1000);
    }
  }
  
  // 獲取性能指標
  getMetrics(): Map<string, Metric> {
    return new Map(this.metrics);
  }
  
  // 導出指標到監控系統
  exportMetrics(): void {
    const metrics = this.getMetrics();
    // 發送到 Prometheus、Grafana 等監控系統
    this.sendToMonitoringSystem(metrics);
  }
}

interface Metric {
  type: 'counter' | 'histogram' | 'gauge';
  values: Array<{ value: number; timestamp: number }>;
}

// 性能中間件
export function performanceMiddleware(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const endpoint = `${req.method} ${req.path}`;
    
    // 記錄響應時間
    performanceService.recordApiResponseTime(endpoint, duration);
    
    // 記錄錯誤率
    if (res.statusCode >= 400) {
      performanceService.recordErrorRate(endpoint, true);
    }
  });
  
  next();
}
```

### 錯誤監控
```typescript
// 錯誤監控服務
@Injectable({
  providedIn: 'root'
})
export class ErrorMonitoringService {
  private readonly errors: ErrorLog[] = [];
  
  // 記錄錯誤
  recordError(error: Error, context: ErrorContext): void {
    const errorLog: ErrorLog = {
      id: generateId(),
      message: error.message,
      stack: error.stack,
      context,
      timestamp: new Date(),
      severity: this.determineSeverity(error),
      userId: context.userId,
      organizationId: context.organizationId
    };
    
    this.errors.push(errorLog);
    
    // 發送到錯誤監控系統
    this.sendToErrorMonitoring(errorLog);
    
    // 如果是嚴重錯誤，發送告警
    if (errorLog.severity === 'critical') {
      this.sendAlert(errorLog);
    }
  }
  
  private determineSeverity(error: Error): 'low' | 'medium' | 'high' | 'critical' {
    if (error.name === 'ValidationError') return 'low';
    if (error.name === 'AuthenticationError') return 'high';
    if (error.name === 'DatabaseError') return 'critical';
    return 'medium';
  }
  
  private sendToErrorMonitoring(errorLog: ErrorLog): void {
    // 發送到 Sentry、Rollbar 等錯誤監控系統
    console.log('Sending error to monitoring system:', errorLog);
  }
  
  private sendAlert(errorLog: ErrorLog): void {
    // 發送告警通知
    console.log('Sending alert for critical error:', errorLog);
  }
}

interface ErrorLog {
  id: string;
  message: string;
  stack?: string;
  context: ErrorContext;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  organizationId?: string;
}

interface ErrorContext {
  userId?: string;
  organizationId?: string;
  endpoint?: string;
  method?: string;
  userAgent?: string;
  ip?: string;
}
```

## 📊 性能測試

### 負載測試
```typescript
// 負載測試服務
@Injectable({
  providedIn: 'root'
})
export class LoadTestingService {
  // 並發用戶測試
  async testConcurrentUsers(userCount: number, duration: number): Promise<LoadTestResult> {
    const startTime = Date.now();
    const results: RequestResult[] = [];
    
    const promises = Array(userCount).fill(0).map(async (_, index) => {
      const userResults: RequestResult[] = [];
      const endTime = startTime + duration;
      
      while (Date.now() < endTime) {
        try {
          const start = Date.now();
          const response = await this.makeTestRequest();
          const duration = Date.now() - start;
          
          userResults.push({
            success: true,
            duration,
            statusCode: response.status
          });
        } catch (error) {
          userResults.push({
            success: false,
            duration: 0,
            error: error.message
          });
        }
        
        // 隨機間隔
        await this.sleep(Math.random() * 1000);
      }
      
      return userResults;
    });
    
    const allResults = await Promise.all(promises);
    const flatResults = allResults.flat();
    
    return this.calculateLoadTestResult(flatResults);
  }
  
  private async makeTestRequest(): Promise<Response> {
    const endpoints = [
      '/api/organizations',
      '/api/teams',
      '/api/projects',
      '/api/members'
    ];
    
    const endpoint = endpoints[Math.floor(Math.random() * endpoints.length)];
    return fetch(`http://localhost:3000${endpoint}`);
  }
  
  private calculateLoadTestResult(results: RequestResult[]): LoadTestResult {
    const total = results.length;
    const successful = results.filter(r => r.success).length;
    const failed = total - successful;
    
    const durations = results.filter(r => r.success).map(r => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const maxDuration = Math.max(...durations);
    const minDuration = Math.min(...durations);
    
    return {
      totalRequests: total,
      successfulRequests: successful,
      failedRequests: failed,
      successRate: (successful / total) * 100,
      averageResponseTime: avgDuration,
      maxResponseTime: maxDuration,
      minResponseTime: minDuration,
      throughput: total / (Date.now() / 1000) // 請求/秒
    };
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

interface RequestResult {
  success: boolean;
  duration: number;
  statusCode?: number;
  error?: string;
}

interface LoadTestResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  successRate: number;
  averageResponseTime: number;
  maxResponseTime: number;
  minResponseTime: number;
  throughput: number;
}
```

## 📊 成功指標

### 性能指標
- [ ] 頁面載入時間 < 2 秒
- [ ] API 響應時間 < 500ms
- [ ] 數據庫查詢時間 < 100ms
- [ ] 支持 1000+ 並發用戶
- [ ] 99.9% 系統可用性

### 優化指標
- [ ] 代碼分割覆蓋率 > 90%
- [ ] 緩存命中率 > 85%
- [ ] 數據庫索引覆蓋率 > 95%
- [ ] 錯誤率 < 0.1%
- [ ] 資源壓縮率 > 70%

### 監控指標
- [ ] 實時性能監控
- [ ] 自動告警系統
- [ ] 性能趨勢分析
- [ ] 容量規劃建議
- [ ] 性能回歸檢測

---

**📝 注意**: 性能優化是一個持續的過程，需要根據實際使用情況和監控數據不斷調整和改進。