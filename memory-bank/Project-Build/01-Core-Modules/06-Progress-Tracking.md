# 6️⃣ 進度追蹤模組

## 📋 模組概述

進度追蹤模組提供專案進度的完整監控功能，包括進度報告、里程碑管理、時間追蹤、績效分析、風險監控等功能。此模組是 Project-Build 系統的監控核心組件。

### 🎯 功能目標
- 提供實時的專案進度監控
- 實現里程碑和關鍵路徑管理
- 支持時間追蹤和工時統計
- 提供進度分析和預測功能
- 整合所有核心模組的進度數據

## 🏗️ 功能架構

### 核心功能
```
進度追蹤模組
├── 進度監控
│   ├── 整體進度追蹤
│   ├── 模組進度分析
│   ├── 里程碑監控
│   └── 關鍵路徑分析
├── 時間追蹤
│   ├── 工時記錄
│   ├── 時間分配
│   ├── 效率分析
│   └── 資源利用率
├── 績效分析
│   ├── 團隊績效
│   ├── 個人績效
│   ├── 成本效益
│   └── 品質指標
├── 風險監控
│   ├── 進度風險
│   ├── 成本風險
│   ├── 品質風險
│   └── 風險預警
└── 報告系統
    ├── 進度報告
    ├── 績效報告
    ├── 風險報告
    └── 自定義報告
```

## 📊 數據結構設計

### 進度實體 (Progress)
```typescript
interface Progress {
  id: string;                    // 進度唯一標識
  projectId: string;             // 所屬專案 ID
  type: ProgressType;           // 進度類型
  category: ProgressCategory;   // 進度分類
  name: string;                  // 進度名稱
  description?: string;          // 進度描述
  currentValue: number;          // 當前值
  targetValue: number;           // 目標值
  unit: string;                  // 單位
  percentage: number;            // 完成百分比
  status: ProgressStatus;       // 進度狀態
  priority: Priority;           // 優先級
  startDate: Date;              // 開始日期
  endDate: Date;                // 結束日期
  actualStartDate?: Date;        // 實際開始日期
  actualEndDate?: Date;          // 實際結束日期
  dependencies: string[];       // 依賴關係
  milestones: Milestone[];       // 里程碑
  risks: Risk[];                // 風險
  metrics: ProgressMetric[];    // 指標
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum ProgressType {
  OVERALL = 'overall',           // 整體進度
  TASK = 'task',                // 任務進度
  COST = 'cost',                // 成本進度
  QUALITY = 'quality',          // 品質進度
  SCHEDULE = 'schedule',        // 時程進度
  RESOURCE = 'resource'         // 資源進度
}

enum ProgressCategory {
  BIM_MODEL = 'bim_model',       // BIM 模型
  COST_MANAGEMENT = 'cost_management', // 成本管理
  TASK_MANAGEMENT = 'task_management', // 任務管理
  DOCUMENT_MANAGEMENT = 'document_management', // 文檔管理
  QUALITY_CONTROL = 'quality_control', // 品質控制
  SAFETY_MANAGEMENT = 'safety_management' // 安全管理
}

enum ProgressStatus {
  NOT_STARTED = 'not_started',  // 未開始
  IN_PROGRESS = 'in_progress',  // 進行中
  ON_TRACK = 'on_track',        // 正常
  AT_RISK = 'at_risk',          // 有風險
  DELAYED = 'delayed',          // 延遲
  COMPLETED = 'completed'       // 已完成
}
```

### 里程碑實體 (Milestone)
```typescript
interface Milestone {
  id: string;                    // 里程碑唯一標識
  progressId: string;            // 所屬進度 ID
  name: string;                  // 里程碑名稱
  description?: string;          // 里程碑描述
  targetDate: Date;              // 目標日期
  actualDate?: Date;             // 實際日期
  status: MilestoneStatus;       // 里程碑狀態
  priority: Priority;           // 優先級
  dependencies: string[];       // 依賴關係
  deliverables: Deliverable[];   // 交付物
  risks: Risk[];                // 風險
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum MilestoneStatus {
  PENDING = 'pending',           // 待開始
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  DELAYED = 'delayed',           // 延遲
  CANCELLED = 'cancelled'        // 已取消
}

interface Deliverable {
  id: string;                    // 交付物唯一標識
  name: string;                  // 交付物名稱
  description?: string;          // 交付物描述
  type: DeliverableType;        // 交付物類型
  status: DeliverableStatus;    // 交付物狀態
  dueDate: Date;                // 截止日期
  completedDate?: Date;          // 完成日期
  quality: QualityLevel;        // 品質等級
  acceptanceCriteria: string[];  // 驗收標準
  attachments: Attachment[];    // 附件
}

enum DeliverableType {
  DOCUMENT = 'document',         // 文檔
  MODEL = 'model',              // 模型
  REPORT = 'report',            // 報告
  DRAWING = 'drawing',          // 圖紙
  SPECIFICATION = 'specification', // 規範
  TEST_RESULT = 'test_result'   // 測試結果
}

enum DeliverableStatus {
  DRAFT = 'draft',               // 草稿
  UNDER_REVIEW = 'under_review', // 審查中
  APPROVED = 'approved',         // 已審批
  DELIVERED = 'delivered',       // 已交付
  REJECTED = 'rejected'          // 已拒絕
}

enum QualityLevel {
  EXCELLENT = 'excellent',       // 優秀
  GOOD = 'good',                // 良好
  ACCEPTABLE = 'acceptable',     // 可接受
  POOR = 'poor',                // 差
  UNACCEPTABLE = 'unacceptable'  // 不可接受
}
```

### 時間追蹤實體 (TimeTracking)
```typescript
interface TimeTracking {
  id: string;                    // 時間追蹤唯一標識
  projectId: string;             // 所屬專案 ID
  userId: string;                // 用戶 ID
  taskId?: string;               // 任務 ID
  activity: string;              // 活動描述
  category: TimeCategory;        // 時間分類
  startTime: Date;               // 開始時間
  endTime: Date;                 // 結束時間
  duration: number;              // 持續時間 (分鐘)
  billableHours: number;         // 可計費工時
  hourlyRate?: number;           // 時薪
  description?: string;          // 描述
  tags: string[];               // 標籤
  isApproved: boolean;           // 是否已審批
  approvedBy?: string;           // 審批者 ID
  approvedAt?: Date;             // 審批時間
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum TimeCategory {
  DEVELOPMENT = 'development',   // 開發
  TESTING = 'testing',          // 測試
  REVIEW = 'review',            // 審查
  MEETING = 'meeting',          // 會議
  TRAINING = 'training',        // 培訓
  ADMINISTRATION = 'administration', // 行政
  RESEARCH = 'research',         // 研究
  OTHER = 'other'               // 其他
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 進度追蹤主組件
@Component({
  selector: 'app-progress-tracking',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>進度追蹤</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createProgress()">
              <i nz-icon nzType="plus"></i>
              創建進度
            </button>
            <button nz-button (click)="generateReport()">
              <i nz-icon nzType="file-text"></i>
              生成報告
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="進度概覽">
            <app-progress-overview></app-progress-overview>
          </nz-tab>
          <nz-tab nzTitle="里程碑">
            <app-milestone-management></app-milestone-management>
          </nz-tab>
          <nz-tab nzTitle="時間追蹤">
            <app-time-tracking></app-time-tracking>
          </nz-tab>
          <nz-tab nzTitle="績效分析">
            <app-performance-analysis></app-performance-analysis>
          </nz-tab>
          <nz-tab nzTitle="風險監控">
            <app-risk-monitoring></app-risk-monitoring>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class ProgressTrackingComponent implements OnInit {
  constructor(
    private progressService: ProgressService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.progressService.loadProjectProgress();
  }
  
  createProgress() {
    this.modal.create({
      nzTitle: '創建進度',
      nzContent: AppCreateProgressModalComponent,
      nzFooter: null,
      nzWidth: 800
    });
  }
  
  generateReport() {
    this.modal.create({
      nzTitle: '生成報告',
      nzContent: AppGenerateReportModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
}

// 進度概覽組件
@Component({
  selector: 'app-progress-overview',
  template: `
    <div class="progress-overview">
      <!-- 進度統計卡片 -->
      <div class="progress-cards">
        <nz-card nzSize="small" class="progress-card">
          <nz-statistic
            nzTitle="整體進度"
            [nzValue]="progressStats.overallProgress"
            nzSuffix="%"
            nzValueStyle="color: #3f8600">
          </nz-statistic>
        </nz-card>
        
        <nz-card nzSize="small" class="progress-card">
          <nz-statistic
            nzTitle="已完成任務"
            [nzValue]="progressStats.completedTasks"
            [nzSuffix]="'/' + progressStats.totalTasks"
            nzValueStyle="color: #1890ff">
          </nz-statistic>
        </nz-card>
        
        <nz-card nzSize="small" class="progress-card">
          <nz-statistic
            nzTitle="已用預算"
            [nzValue]="progressStats.usedBudget | currency:'TWD':'symbol':'1.0-0'"
            nzValueStyle="color: #cf1322">
          </nz-statistic>
        </nz-card>
        
        <nz-card nzSize="small" class="progress-card">
          <nz-statistic
            nzTitle="剩餘時間"
            [nzValue]="progressStats.remainingDays"
            nzSuffix="天"
            nzValueStyle="color: #722ed1">
          </nz-statistic>
        </nz-card>
      </div>
      
      <!-- 進度圖表 -->
      <div class="progress-charts">
        <nz-card nzTitle="進度趨勢">
          <div echarts 
               [options]="progressChartOptions" 
               [initOpts]="chartInitOpts"
               class="chart">
          </div>
        </nz-card>
        
        <nz-card nzTitle="模組進度">
          <div echarts 
               [options]="moduleProgressChartOptions" 
               [initOpts]="chartInitOpts"
               class="chart">
          </div>
        </nz-card>
      </div>
      
      <!-- 進度列表 -->
      <div class="progress-list">
        <nz-card nzTitle="進度詳情">
          <nz-table 
            [nzData]="progressList$ | async" 
            [nzLoading]="loading$ | async"
            [nzPageSize]="10">
            
            <thead>
              <tr>
                <th>進度項目</th>
                <th>類型</th>
                <th>進度</th>
                <th>狀態</th>
                <th>開始日期</th>
                <th>結束日期</th>
                <th>操作</th>
              </tr>
            </thead>
            
            <tbody>
              <tr *ngFor="let progress of progressList$ | async">
                <td>{{ progress.name }}</td>
                <td>
                  <nz-tag [nzColor]="getProgressTypeColor(progress.type)">
                    {{ progress.type | progressTypeLabel }}
                  </nz-tag>
                </td>
                <td>
                  <nz-progress 
                    [nzPercent]="progress.percentage" 
                    [nzStatus]="getProgressStatus(progress.status)">
                  </nz-progress>
                </td>
                <td>
                  <nz-badge 
                    [nzStatus]="getStatusType(progress.status)" 
                    [nzText]="progress.status | progressStatusLabel">
                  </nz-badge>
                </td>
                <td>{{ progress.startDate | date:'short' }}</td>
                <td>{{ progress.endDate | date:'short' }}</td>
                <td>
                  <nz-button-group>
                    <button nz-button nzSize="small" (click)="viewProgress(progress)">
                      查看
                    </button>
                    <button nz-button nzSize="small" (click)="editProgress(progress)">
                      編輯
                    </button>
                  </nz-button-group>
                </td>
              </tr>
            </tbody>
          </nz-table>
        </nz-card>
      </div>
    </div>
  `,
  styles: [`
    .progress-overview {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .progress-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .progress-card {
      text-align: center;
    }
    
    .progress-charts {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    
    .chart {
      height: 300px;
    }
    
    .progress-list {
      margin-top: 16px;
    }
  `]
})
export class ProgressOverviewComponent implements OnInit {
  progressList$ = this.progressService.progressList$;
  loading$ = this.progressService.loading$;
  progressStats: ProgressStats;
  progressChartOptions: any;
  moduleProgressChartOptions: any;
  chartInitOpts = { renderer: 'svg' };
  
  constructor(
    private progressService: ProgressService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.loadProgressStats();
    this.setupCharts();
  }
  
  private loadProgressStats() {
    this.progressService.getProgressStats().subscribe(stats => {
      this.progressStats = stats;
    });
  }
  
  private setupCharts() {
    // 進度趨勢圖表
    this.progressChartOptions = {
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['整體進度', '計劃進度']
      },
      xAxis: {
        type: 'category',
        data: ['第1週', '第2週', '第3週', '第4週', '第5週', '第6週', '第7週', '第8週']
      },
      yAxis: {
        type: 'value',
        max: 100
      },
      series: [
        {
          name: '整體進度',
          type: 'line',
          data: [10, 20, 35, 45, 55, 65, 75, 85]
        },
        {
          name: '計劃進度',
          type: 'line',
          data: [12, 25, 40, 50, 60, 70, 80, 90]
        }
      ]
    };
    
    // 模組進度圖表
    this.moduleProgressChartOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '模組進度',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 85, name: 'BIM 模型' },
            { value: 70, name: '成本管理' },
            { value: 60, name: '任務管理' },
            { value: 45, name: '文檔管理' },
            { value: 30, name: '進度追蹤' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  
  getProgressTypeColor(type: ProgressType): string {
    const colors = {
      [ProgressType.OVERALL]: 'blue',
      [ProgressType.TASK]: 'green',
      [ProgressType.COST]: 'orange',
      [ProgressType.QUALITY]: 'purple',
      [ProgressType.SCHEDULE]: 'cyan',
      [ProgressType.RESOURCE]: 'magenta'
    };
    return colors[type] || 'default';
  }
  
  getProgressStatus(status: ProgressStatus): 'success' | 'exception' | 'active' | 'normal' {
    const statuses = {
      [ProgressStatus.COMPLETED]: 'success',
      [ProgressStatus.ON_TRACK]: 'success',
      [ProgressStatus.IN_PROGRESS]: 'active',
      [ProgressStatus.AT_RISK]: 'exception',
      [ProgressStatus.DELAYED]: 'exception',
      [ProgressStatus.NOT_STARTED]: 'normal'
    };
    return statuses[status] || 'normal';
  }
  
  getStatusType(status: ProgressStatus): 'success' | 'warning' | 'error' | 'default' {
    const types = {
      [ProgressStatus.COMPLETED]: 'success',
      [ProgressStatus.ON_TRACK]: 'success',
      [ProgressStatus.IN_PROGRESS]: 'warning',
      [ProgressStatus.AT_RISK]: 'error',
      [ProgressStatus.DELAYED]: 'error',
      [ProgressStatus.NOT_STARTED]: 'default'
    };
    return types[status] || 'default';
  }
  
  viewProgress(progress: Progress) {
    this.modal.create({
      nzTitle: '進度詳情',
      nzContent: AppProgressDetailModalComponent,
      nzComponentParams: { progress },
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  editProgress(progress: Progress) {
    this.modal.create({
      nzTitle: '編輯進度',
      nzContent: AppEditProgressModalComponent,
      nzComponentParams: { progress },
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
export class ProgressService {
  private readonly apiUrl = '/api/projects';
  
  private progressListSubject = new BehaviorSubject<Progress[]>([]);
  private milestonesSubject = new BehaviorSubject<Milestone[]>([]);
  private timeTrackingSubject = new BehaviorSubject<TimeTracking[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  progressList$ = this.progressListSubject.asObservable();
  milestones$ = this.milestonesSubject.asObservable();
  timeTracking$ = this.timeTrackingSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建進度
  createProgress(progressData: CreateProgressRequest): Observable<Progress> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Progress>(`${this.apiUrl}/${projectId}/progress`, progressData).pipe(
      tap(progress => {
        const currentProgress = this.progressListSubject.value;
        this.progressListSubject.next([...currentProgress, progress]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入進度
  loadProjectProgress(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Progress[]>(`${this.apiUrl}/${projectId}/progress`)
      .pipe(
        tap(progress => this.progressListSubject.next(progress)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 更新進度
  updateProgress(progressId: string, updates: Partial<Progress>): Observable<Progress> {
    return this.http.patch<Progress>(`/api/progress/${progressId}`, updates).pipe(
      tap(updatedProgress => {
        const progress = this.progressListSubject.value;
        const index = progress.findIndex(p => p.id === progressId);
        if (index !== -1) {
          progress[index] = updatedProgress;
          this.progressListSubject.next([...progress]);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 獲取進度統計
  getProgressStats(): Observable<ProgressStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<ProgressStats>(`${this.apiUrl}/${projectId}/progress-stats`);
  }
  
  // 創建里程碑
  createMilestone(milestoneData: CreateMilestoneRequest): Observable<Milestone> {
    return this.http.post<Milestone>('/api/milestones', milestoneData).pipe(
      tap(milestone => {
        const currentMilestones = this.milestonesSubject.value;
        this.milestonesSubject.next([...currentMilestones, milestone]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入里程碑
  loadMilestones(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Milestone[]>(`${this.apiUrl}/${projectId}/milestones`)
      .pipe(
        tap(milestones => this.milestonesSubject.next(milestones)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 記錄時間
  recordTime(timeData: CreateTimeTrackingRequest): Observable<TimeTracking> {
    return this.http.post<TimeTracking>('/api/time-tracking', timeData).pipe(
      tap(timeTracking => {
        const currentTimeTracking = this.timeTrackingSubject.value;
        this.timeTrackingSubject.next([...currentTimeTracking, timeTracking]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入時間追蹤
  loadTimeTracking(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<TimeTracking[]>(`${this.apiUrl}/${projectId}/time-tracking`)
      .pipe(
        tap(timeTracking => this.timeTrackingSubject.next(timeTracking)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取績效分析
  getPerformanceAnalysis(): Observable<PerformanceAnalysis> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<PerformanceAnalysis>(`${this.apiUrl}/${projectId}/performance-analysis`);
  }
  
  // 獲取風險監控
  getRiskMonitoring(): Observable<RiskMonitoring> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<RiskMonitoring>(`${this.apiUrl}/${projectId}/risk-monitoring`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Progress service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 進度追蹤權限
```typescript
enum ProgressTrackingPermission {
  VIEW_PROGRESS = 'view_progress',
  MANAGE_PROGRESS = 'manage_progress',
  VIEW_MILESTONES = 'view_milestones',
  MANAGE_MILESTONES = 'manage_milestones',
  VIEW_TIME_TRACKING = 'view_time_tracking',
  MANAGE_TIME_TRACKING = 'manage_time_tracking',
  VIEW_PERFORMANCE = 'view_performance',
  VIEW_RISKS = 'view_risks',
  MANAGE_RISKS = 'manage_risks',
  GENERATE_REPORTS = 'generate_reports'
}

// 角色權限映射
const PROGRESS_PERMISSIONS: Record<ProjectRole, ProgressTrackingPermission[]> = {
  [ProjectRole.OWNER]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.MANAGE_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES,
    ProgressTrackingPermission.MANAGE_MILESTONES,
    ProgressTrackingPermission.VIEW_TIME_TRACKING,
    ProgressTrackingPermission.MANAGE_TIME_TRACKING,
    ProgressTrackingPermission.VIEW_PERFORMANCE,
    ProgressTrackingPermission.VIEW_RISKS,
    ProgressTrackingPermission.MANAGE_RISKS,
    ProgressTrackingPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ADMIN]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.MANAGE_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES,
    ProgressTrackingPermission.MANAGE_MILESTONES,
    ProgressTrackingPermission.VIEW_TIME_TRACKING,
    ProgressTrackingPermission.MANAGE_TIME_TRACKING,
    ProgressTrackingPermission.VIEW_PERFORMANCE,
    ProgressTrackingPermission.VIEW_RISKS,
    ProgressTrackingPermission.GENERATE_REPORTS
  ],
  [ProjectRole.MANAGER]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.MANAGE_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES,
    ProgressTrackingPermission.MANAGE_MILESTONES,
    ProgressTrackingPermission.VIEW_TIME_TRACKING,
    ProgressTrackingPermission.VIEW_PERFORMANCE,
    ProgressTrackingPermission.VIEW_RISKS,
    ProgressTrackingPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ENGINEER]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES,
    ProgressTrackingPermission.VIEW_TIME_TRACKING,
    ProgressTrackingPermission.MANAGE_TIME_TRACKING,
    ProgressTrackingPermission.VIEW_PERFORMANCE
  ],
  [ProjectRole.CONTRACTOR]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES,
    ProgressTrackingPermission.VIEW_TIME_TRACKING,
    ProgressTrackingPermission.MANAGE_TIME_TRACKING
  ],
  [ProjectRole.VIEWER]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES,
    ProgressTrackingPermission.VIEW_TIME_TRACKING
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    ProgressTrackingPermission.VIEW_PROGRESS,
    ProgressTrackingPermission.VIEW_MILESTONES
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface ProgressTrackingApi {
  // 進度管理
  POST /api/projects/{projectId}/progress        // 創建進度
  GET /api/projects/{projectId}/progress         // 獲取進度列表
  GET /api/progress/{progressId}                  // 獲取進度詳情
  PATCH /api/progress/{progressId}                // 更新進度
  DELETE /api/progress/{progressId}               // 刪除進度
  
  // 里程碑管理
  POST /api/milestones                           // 創建里程碑
  GET /api/projects/{projectId}/milestones       // 獲取里程碑列表
  GET /api/milestones/{milestoneId}              // 獲取里程碑詳情
  PATCH /api/milestones/{milestoneId}            // 更新里程碑
  DELETE /api/milestones/{milestoneId}            // 刪除里程碑
  
  // 時間追蹤
  POST /api/time-tracking                        // 記錄時間
  GET /api/projects/{projectId}/time-tracking    // 獲取時間追蹤
  PATCH /api/time-tracking/{timeId}              // 更新時間記錄
  DELETE /api/time-tracking/{timeId}              // 刪除時間記錄
  
  // 分析和報告
  GET /api/projects/{projectId}/progress-stats    // 獲取進度統計
  GET /api/projects/{projectId}/performance-analysis // 獲取績效分析
  GET /api/projects/{projectId}/risk-monitoring   // 獲取風險監控
  POST /api/projects/{projectId}/reports          // 生成報告
}

// 請求/響應類型
interface CreateProgressRequest {
  type: ProgressType;
  category: ProgressCategory;
  name: string;
  description?: string;
  targetValue: number;
  unit: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
  dependencies: string[];
}

interface CreateMilestoneRequest {
  progressId: string;
  name: string;
  description?: string;
  targetDate: Date;
  priority: Priority;
  dependencies: string[];
  deliverables: Deliverable[];
}

interface CreateTimeTrackingRequest {
  projectId: string;
  taskId?: string;
  activity: string;
  category: TimeCategory;
  startTime: Date;
  endTime: Date;
  description?: string;
  tags: string[];
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const progressConfig = {
  enableTimeTracking: process.env.ENABLE_TIME_TRACKING === 'true',
  enablePerformanceAnalysis: process.env.ENABLE_PERFORMANCE_ANALYSIS === 'true',
  enableRiskMonitoring: process.env.ENABLE_RISK_MONITORING === 'true',
  progressUpdateInterval: parseInt(process.env.PROGRESS_UPDATE_INTERVAL || '3600'), // seconds
  maxMilestonesPerProgress: parseInt(process.env.MAX_MILESTONES_PER_PROGRESS || '50'),
  timeTrackingCategories: process.env.TIME_TRACKING_CATEGORIES?.split(',') || ['development', 'testing', 'review', 'meeting']
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 進度監控功能
- [ ] 里程碑管理
- [ ] 時間追蹤系統
- [ ] 績效分析功能
- [ ] 風險監控系統
- [ ] 報告生成功能
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成