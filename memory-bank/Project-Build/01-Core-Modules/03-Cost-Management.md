# 3️⃣ 成本管理模組

## 📋 模組概述

成本管理模組提供專案成本的完整管理功能，包括預算設置、成本項目管理、合約管理、變更控制、成本分析等功能。此模組是 Project-Build 系統的財務核心組件。

### 🎯 功能目標
- 提供完整的成本生命週期管理
- 實現預算 vs 實際成本追蹤
- 支持多種合約類型管理
- 提供成本分析和報告功能
- 整合 BIM 模型和任務管理

## 🏗️ 功能架構

### 核心功能
```
成本管理模組
├── 預算管理
│   ├── 預算設置和分配
│   ├── 預算類別管理
│   ├── 預算調整和變更
│   └── 預算使用追蹤
├── 成本項目管理
│   ├── 成本項目創建
│   ├── 成本分類和標籤
│   ├── 成本分配和歸屬
│   └── 成本審批流程
├── 合約管理
│   ├── 主合約管理
│   ├── 分包合約管理
│   ├── 合約變更管理
│   └── 付款管理
├── 變更管理
│   ├── 變更單創建
│   ├── 變更審批流程
│   ├── 變更影響分析
│   └── 變更追蹤
└── 成本分析
    ├── 成本趨勢分析
    ├── 預算執行分析
    ├── 成本結構分析
    └── 報告生成
```

## 📊 數據結構設計

### 預算實體 (Budget)
```typescript
interface Budget {
  id: string;                    // 預算唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 預算名稱
  description?: string;          // 預算描述
  type: BudgetType;             // 預算類型
  totalAmount: number;           // 總金額
  allocatedAmount: number;       // 已分配金額
  spentAmount: number;          // 已支出金額
  remainingAmount: number;       // 剩餘金額
  currency: string;             // 貨幣單位
  period: BudgetPeriod;         // 預算期間
  status: BudgetStatus;         // 預算狀態
  categories: BudgetCategory[]; // 預算分類
  approvals: Approval[];        // 審批記錄
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum BudgetType {
  MASTER = 'master',            // 主預算
  DETAILED = 'detailed',        // 詳細預算
  CONTINGENCY = 'contingency',  // 應急預算
  CHANGE_ORDER = 'change_order' // 變更預算
}

enum BudgetStatus {
  DRAFT = 'draft',              // 草稿
  PENDING_APPROVAL = 'pending_approval', // 待審批
  APPROVED = 'approved',        // 已審批
  ACTIVE = 'active',           // 執行中
  CLOSED = 'closed',           // 已關閉
  CANCELLED = 'cancelled'      // 已取消
}

interface BudgetPeriod {
  startDate: Date;             // 開始日期
  endDate: Date;               // 結束日期
  fiscalYear?: string;         // 會計年度
  quarter?: number;            // 季度
}

interface BudgetCategory {
  id: string;                  // 分類 ID
  name: string;                // 分類名稱
  code: string;                // 分類代碼
  amount: number;              // 分配金額
  spentAmount: number;         // 已支出金額
  parentId?: string;           // 父分類 ID
  children?: BudgetCategory[]; // 子分類
}
```

### 成本項目實體 (CostItem)
```typescript
interface CostItem {
  id: string;                  // 成本項目唯一標識
  projectId: string;           // 所屬專案 ID
  budgetId: string;            // 所屬預算 ID
  name: string;                // 成本項目名稱
  description?: string;       // 成本項目描述
  category: CostCategory;      // 成本分類
  type: CostItemType;         // 成本項目類型
  amount: number;             // 金額
  quantity: number;           // 數量
  unitPrice: number;          // 單價
  unit: string;               // 單位
  currency: string;           // 貨幣單位
  status: CostItemStatus;     // 狀態
  priority: Priority;         // 優先級
  tags: string[];             // 標籤
  attachments: Attachment[];  // 附件
  approvals: Approval[];      // 審批記錄
  relatedTasks: string[];     // 關聯任務
  relatedModels: string[];    // 關聯模型
  createdAt: Date;            // 創建時間
  updatedAt: Date;            // 更新時間
  createdBy: string;          // 創建者 ID
  approvedBy?: string;        // 審批者 ID
  approvedAt?: Date;          // 審批時間
}

enum CostCategory {
  MATERIALS = 'materials',     // 材料
  LABOR = 'labor',             // 人工
  EQUIPMENT = 'equipment',     // 設備
  SUBCONTRACTOR = 'subcontractor', // 分包
  OVERHEAD = 'overhead',       // 間接費用
  PROFIT = 'profit',          // 利潤
  CONTINGENCY = 'contingency'  // 應急費用
}

enum CostItemType {
  DIRECT = 'direct',           // 直接成本
  INDIRECT = 'indirect',       // 間接成本
  FIXED = 'fixed',             // 固定成本
  VARIABLE = 'variable'        // 變動成本
}

enum CostItemStatus {
  DRAFT = 'draft',             // 草稿
  PENDING_APPROVAL = 'pending_approval', // 待審批
  APPROVED = 'approved',       // 已審批
  IN_PROGRESS = 'in_progress', // 進行中
  COMPLETED = 'completed',     // 已完成
  CANCELLED = 'cancelled'      // 已取消
}
```

### 合約實體 (Contract)
```typescript
interface Contract {
  id: string;                  // 合約唯一標識
  projectId: string;           // 所屬專案 ID
  name: string;                // 合約名稱
  number: string;              // 合約編號
  type: ContractType;          // 合約類型
  status: ContractStatus;      // 合約狀態
  parties: ContractParty[];    // 合約當事人
  amount: number;              // 合約金額
  currency: string;            // 貨幣單位
  startDate: Date;             // 開始日期
  endDate: Date;               // 結束日期
  terms: ContractTerms;        // 合約條款
  payments: Payment[];         // 付款記錄
  changes: ContractChange[];   // 合約變更
  documents: ContractDocument[]; // 合約文檔
  createdAt: Date;             // 創建時間
  updatedAt: Date;             // 更新時間
  createdBy: string;           // 創建者 ID
}

enum ContractType {
  MAIN = 'main',               // 主合約
  SUBCONTRACT = 'subcontract', // 分包合約
  SUPPLY = 'supply',          // 供應合約
  SERVICE = 'service',         // 服務合約
  CONSULTING = 'consulting'    // 諮詢合約
}

enum ContractStatus {
  DRAFT = 'draft',             // 草稿
  PENDING_SIGNATURE = 'pending_signature', // 待簽署
  ACTIVE = 'active',           // 執行中
  SUSPENDED = 'suspended',     // 暫停
  COMPLETED = 'completed',     // 已完成
  TERMINATED = 'terminated'    // 終止
}

interface ContractParty {
  id: string;                  // 當事人 ID
  name: string;                // 當事人名稱
  type: PartyType;             // 當事人類型
  role: PartyRole;             // 當事人角色
  contactInfo: ContactInfo;    // 聯繫信息
}

enum PartyType {
  COMPANY = 'company',         // 公司
  INDIVIDUAL = 'individual',   // 個人
  GOVERNMENT = 'government'    // 政府
}

enum PartyRole {
  OWNER = 'owner',             // 業主
  CONTRACTOR = 'contractor',    // 承包商
  SUBCONTRACTOR = 'subcontractor', // 分包商
  SUPPLIER = 'supplier',       // 供應商
  CONSULTANT = 'consultant'    // 顧問
}

interface ContractTerms {
  paymentTerms: PaymentTerms;  // 付款條款
  deliveryTerms: DeliveryTerms; // 交貨條款
  warrantyTerms: WarrantyTerms; // 保修條款
  penaltyTerms: PenaltyTerms;  // 罰款條款
  terminationTerms: TerminationTerms; // 終止條款
}

interface PaymentTerms {
  paymentSchedule: PaymentSchedule[]; // 付款計劃
  paymentMethod: string;        // 付款方式
  currency: string;             // 付款貨幣
  latePaymentPenalty: number;   // 遲付款罰款
}

interface PaymentSchedule {
  milestone: string;            // 里程碑
  percentage: number;           // 付款百分比
  amount: number;              // 付款金額
  dueDate: Date;               // 到期日期
  conditions: string[];         // 付款條件
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 成本管理主組件
@Component({
  selector: 'app-cost-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>成本管理</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createBudget()">
              <i nz-icon nzType="plus"></i>
              創建預算
            </button>
            <button nz-button (click)="createCostItem()">
              <i nz-icon nzType="dollar"></i>
              添加成本項目
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="預算概覽">
            <app-budget-overview></app-budget-overview>
          </nz-tab>
          <nz-tab nzTitle="成本項目">
            <app-cost-items></app-cost-items>
          </nz-tab>
          <nz-tab nzTitle="合約管理">
            <app-contract-management></app-contract-management>
          </nz-tab>
          <nz-tab nzTitle="變更管理">
            <app-change-management></app-change-management>
          </nz-tab>
          <nz-tab nzTitle="成本分析">
            <app-cost-analysis></app-cost-analysis>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class CostManagementComponent implements OnInit {
  constructor(
    private costService: CostService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.costService.loadProjectBudgets();
    this.costService.loadCostItems();
  }
  
  createBudget() {
    this.modal.create({
      nzTitle: '創建預算',
      nzContent: AppCreateBudgetModalComponent,
      nzFooter: null,
      nzWidth: 800
    });
  }
  
  createCostItem() {
    this.modal.create({
      nzTitle: '添加成本項目',
      nzContent: AppCreateCostItemModalComponent,
      nzFooter: null,
      nzWidth: 600
    });
  }
}

// 預算概覽組件
@Component({
  selector: 'app-budget-overview',
  template: `
    <div class="budget-overview">
      <!-- 預算統計卡片 -->
      <div class="budget-cards">
        <nz-card nzSize="small" class="budget-card">
          <nz-statistic
            nzTitle="總預算"
            [nzValue]="budgetStats.totalBudget | currency:'TWD':'symbol':'1.0-0'"
            nzValueStyle="color: #3f8600">
          </nz-statistic>
        </nz-card>
        
        <nz-card nzSize="small" class="budget-card">
          <nz-statistic
            nzTitle="已分配"
            [nzValue]="budgetStats.allocatedAmount | currency:'TWD':'symbol':'1.0-0'"
            nzValueStyle="color: #1890ff">
          </nz-statistic>
        </nz-card>
        
        <nz-card nzSize="small" class="budget-card">
          <nz-statistic
            nzTitle="已支出"
            [nzValue]="budgetStats.spentAmount | currency:'TWD':'symbol':'1.0-0'"
            nzValueStyle="color: #cf1322">
          </nz-statistic>
        </nz-card>
        
        <nz-card nzSize="small" class="budget-card">
          <nz-statistic
            nzTitle="剩餘預算"
            [nzValue]="budgetStats.remainingAmount | currency:'TWD':'symbol':'1.0-0'"
            nzValueStyle="color: #722ed1">
          </nz-statistic>
        </nz-card>
      </div>
      
      <!-- 預算使用率 -->
      <div class="budget-usage">
        <nz-card nzTitle="預算使用率">
          <nz-progress 
            [nzPercent]="budgetUsagePercentage" 
            nzStatus="active"
            [nzShowInfo]="true">
          </nz-progress>
        </nz-card>
      </div>
      
      <!-- 預算分類圖表 -->
      <div class="budget-chart">
        <nz-card nzTitle="預算分類">
          <div echarts 
               [options]="budgetChartOptions" 
               [initOpts]="chartInitOpts"
               class="chart">
          </div>
        </nz-card>
      </div>
      
      <!-- 預算列表 -->
      <div class="budget-list">
        <nz-card nzTitle="預算列表">
          <nz-table 
            [nzData]="budgets$ | async" 
            [nzLoading]="loading$ | async"
            [nzPageSize]="10">
            
            <thead>
              <tr>
                <th>預算名稱</th>
                <th>類型</th>
                <th>總金額</th>
                <th>已分配</th>
                <th>已支出</th>
                <th>使用率</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            
            <tbody>
              <tr *ngFor="let budget of budgets$ | async">
                <td>{{ budget.name }}</td>
                <td>
                  <nz-tag [nzColor]="getBudgetTypeColor(budget.type)">
                    {{ budget.type | budgetTypeLabel }}
                  </nz-tag>
                </td>
                <td>{{ budget.totalAmount | currency:'TWD':'symbol':'1.0-0' }}</td>
                <td>{{ budget.allocatedAmount | currency:'TWD':'symbol':'1.0-0' }}</td>
                <td>{{ budget.spentAmount | currency:'TWD':'symbol':'1.0-0' }}</td>
                <td>
                  <nz-progress 
                    [nzPercent]="getBudgetUsagePercentage(budget)" 
                    [nzSize]="'small'">
                  </nz-progress>
                </td>
                <td>
                  <nz-badge 
                    [nzStatus]="getBudgetStatusType(budget.status)" 
                    [nzText]="budget.status | budgetStatusLabel">
                  </nz-badge>
                </td>
                <td>
                  <nz-button-group>
                    <button nz-button nzSize="small" (click)="viewBudget(budget)">
                      查看
                    </button>
                    <button nz-button nzSize="small" (click)="editBudget(budget)">
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
    .budget-overview {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .budget-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .budget-card {
      text-align: center;
    }
    
    .budget-usage,
    .budget-chart,
    .budget-list {
      margin-top: 16px;
    }
    
    .chart {
      height: 300px;
    }
  `]
})
export class BudgetOverviewComponent implements OnInit {
  budgets$ = this.costService.budgets$;
  loading$ = this.costService.loading$;
  budgetStats: BudgetStats;
  budgetUsagePercentage: number;
  budgetChartOptions: any;
  chartInitOpts = { renderer: 'svg' };
  
  constructor(
    private costService: CostService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.loadBudgetStats();
    this.setupChart();
  }
  
  private loadBudgetStats() {
    this.costService.getBudgetStats().subscribe(stats => {
      this.budgetStats = stats;
      this.budgetUsagePercentage = (stats.spentAmount / stats.totalBudget) * 100;
    });
  }
  
  private setupChart() {
    this.budgetChartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: '預算分類',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 335, name: '材料' },
            { value: 310, name: '人工' },
            { value: 234, name: '設備' },
            { value: 135, name: '分包' },
            { value: 1548, name: '其他' }
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
  
  getBudgetUsagePercentage(budget: Budget): number {
    return (budget.spentAmount / budget.totalAmount) * 100;
  }
  
  getBudgetTypeColor(type: BudgetType): string {
    const colors = {
      [BudgetType.MASTER]: 'blue',
      [BudgetType.DETAILED]: 'green',
      [BudgetType.CONTINGENCY]: 'orange',
      [BudgetType.CHANGE_ORDER]: 'purple'
    };
    return colors[type] || 'default';
  }
  
  getBudgetStatusType(status: BudgetStatus): 'success' | 'warning' | 'error' | 'default' {
    const types = {
      [BudgetStatus.ACTIVE]: 'success',
      [BudgetStatus.APPROVED]: 'success',
      [BudgetStatus.PENDING_APPROVAL]: 'warning',
      [BudgetStatus.DRAFT]: 'default',
      [BudgetStatus.CLOSED]: 'success',
      [BudgetStatus.CANCELLED]: 'error'
    };
    return types[status] || 'default';
  }
  
  viewBudget(budget: Budget) {
    this.modal.create({
      nzTitle: '預算詳情',
      nzContent: AppBudgetDetailModalComponent,
      nzComponentParams: { budget },
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  editBudget(budget: Budget) {
    this.modal.create({
      nzTitle: '編輯預算',
      nzContent: AppEditBudgetModalComponent,
      nzComponentParams: { budget },
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
export class CostService {
  private readonly apiUrl = '/api/projects';
  
  private budgetsSubject = new BehaviorSubject<Budget[]>([]);
  private costItemsSubject = new BehaviorSubject<CostItem[]>([]);
  private contractsSubject = new BehaviorSubject<Contract[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  budgets$ = this.budgetsSubject.asObservable();
  costItems$ = this.costItemsSubject.asObservable();
  contracts$ = this.contractsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建預算
  createBudget(budgetData: CreateBudgetRequest): Observable<Budget> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Budget>(`${this.apiUrl}/${projectId}/budgets`, budgetData).pipe(
      tap(budget => {
        const currentBudgets = this.budgetsSubject.value;
        this.budgetsSubject.next([...currentBudgets, budget]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入預算
  loadProjectBudgets(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Budget[]>(`${this.apiUrl}/${projectId}/budgets`)
      .pipe(
        tap(budgets => this.budgetsSubject.next(budgets)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建成本項目
  createCostItem(costItemData: CreateCostItemRequest): Observable<CostItem> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<CostItem>(`${this.apiUrl}/${projectId}/cost-items`, costItemData).pipe(
      tap(costItem => {
        const currentCostItems = this.costItemsSubject.value;
        this.costItemsSubject.next([...currentCostItems, costItem]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入成本項目
  loadCostItems(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<CostItem[]>(`${this.apiUrl}/${projectId}/cost-items`)
      .pipe(
        tap(costItems => this.costItemsSubject.next(costItems)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取預算統計
  getBudgetStats(): Observable<BudgetStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<BudgetStats>(`${this.apiUrl}/${projectId}/budget-stats`);
  }
  
  // 獲取成本分析
  getCostAnalysis(): Observable<CostAnalysis> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<CostAnalysis>(`${this.apiUrl}/${projectId}/cost-analysis`);
  }
  
  // 創建合約
  createContract(contractData: CreateContractRequest): Observable<Contract> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Contract>(`${this.apiUrl}/${projectId}/contracts`, contractData).pipe(
      tap(contract => {
        const currentContracts = this.contractsSubject.value;
        this.contractsSubject.next([...currentContracts, contract]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入合約
  loadContracts(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Contract[]>(`${this.apiUrl}/${projectId}/contracts`)
      .pipe(
        tap(contracts => this.contractsSubject.next(contracts)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Cost service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 成本管理權限
```typescript
enum CostManagementPermission {
  VIEW_BUDGETS = 'view_budgets',
  MANAGE_BUDGETS = 'manage_budgets',
  APPROVE_BUDGETS = 'approve_budgets',
  VIEW_COST_ITEMS = 'view_cost_items',
  MANAGE_COST_ITEMS = 'manage_cost_items',
  APPROVE_COST_ITEMS = 'approve_cost_items',
  VIEW_CONTRACTS = 'view_contracts',
  MANAGE_CONTRACTS = 'manage_contracts',
  VIEW_COST_ANALYSIS = 'view_cost_analysis',
  EXPORT_COST_DATA = 'export_cost_data'
}

// 角色權限映射
const COST_PERMISSIONS: Record<ProjectRole, CostManagementPermission[]> = {
  [ProjectRole.OWNER]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.MANAGE_BUDGETS,
    CostManagementPermission.APPROVE_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS,
    CostManagementPermission.MANAGE_COST_ITEMS,
    CostManagementPermission.APPROVE_COST_ITEMS,
    CostManagementPermission.VIEW_CONTRACTS,
    CostManagementPermission.MANAGE_CONTRACTS,
    CostManagementPermission.VIEW_COST_ANALYSIS,
    CostManagementPermission.EXPORT_COST_DATA
  ],
  [ProjectRole.ADMIN]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.MANAGE_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS,
    CostManagementPermission.MANAGE_COST_ITEMS,
    CostManagementPermission.VIEW_CONTRACTS,
    CostManagementPermission.MANAGE_CONTRACTS,
    CostManagementPermission.VIEW_COST_ANALYSIS,
    CostManagementPermission.EXPORT_COST_DATA
  ],
  [ProjectRole.MANAGER]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.MANAGE_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS,
    CostManagementPermission.MANAGE_COST_ITEMS,
    CostManagementPermission.VIEW_CONTRACTS,
    CostManagementPermission.VIEW_COST_ANALYSIS
  ],
  [ProjectRole.ENGINEER]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS,
    CostManagementPermission.MANAGE_COST_ITEMS,
    CostManagementPermission.VIEW_CONTRACTS
  ],
  [ProjectRole.CONTRACTOR]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS,
    CostManagementPermission.VIEW_CONTRACTS
  ],
  [ProjectRole.VIEWER]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS,
    CostManagementPermission.VIEW_CONTRACTS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    CostManagementPermission.VIEW_BUDGETS,
    CostManagementPermission.VIEW_COST_ITEMS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface CostManagementApi {
  // 預算管理
  POST /api/projects/{projectId}/budgets        // 創建預算
  GET /api/projects/{projectId}/budgets         // 獲取預算列表
  GET /api/budgets/{budgetId}                   // 獲取預算詳情
  PATCH /api/budgets/{budgetId}                 // 更新預算
  DELETE /api/budgets/{budgetId}                // 刪除預算
  
  // 成本項目
  POST /api/projects/{projectId}/cost-items     // 創建成本項目
  GET /api/projects/{projectId}/cost-items      // 獲取成本項目列表
  GET /api/cost-items/{costItemId}               // 獲取成本項目詳情
  PATCH /api/cost-items/{costItemId}             // 更新成本項目
  DELETE /api/cost-items/{costItemId}            // 刪除成本項目
  
  // 合約管理
  POST /api/projects/{projectId}/contracts      // 創建合約
  GET /api/projects/{projectId}/contracts       // 獲取合約列表
  GET /api/contracts/{contractId}                // 獲取合約詳情
  PATCH /api/contracts/{contractId}              // 更新合約
  DELETE /api/contracts/{contractId}              // 刪除合約
  
  // 成本分析
  GET /api/projects/{projectId}/budget-stats     // 獲取預算統計
  GET /api/projects/{projectId}/cost-analysis    // 獲取成本分析
  GET /api/projects/{projectId}/cost-trends     // 獲取成本趨勢
}

// 請求/響應類型
interface CreateBudgetRequest {
  name: string;
  description?: string;
  type: BudgetType;
  totalAmount: number;
  currency: string;
  period: BudgetPeriod;
  categories: BudgetCategory[];
}

interface CreateCostItemRequest {
  budgetId: string;
  name: string;
  description?: string;
  category: CostCategory;
  type: CostItemType;
  amount: number;
  quantity: number;
  unitPrice: number;
  unit: string;
  priority: Priority;
  tags: string[];
}

interface CreateContractRequest {
  name: string;
  number: string;
  type: ContractType;
  parties: ContractParty[];
  amount: number;
  currency: string;
  startDate: Date;
  endDate: Date;
  terms: ContractTerms;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const costConfig = {
  defaultCurrency: process.env.DEFAULT_CURRENCY || 'TWD',
  supportedCurrencies: process.env.SUPPORTED_CURRENCIES?.split(',') || ['TWD', 'USD', 'EUR'],
  maxBudgetAmount: parseInt(process.env.MAX_BUDGET_AMOUNT || '1000000000'),
  enableApprovalWorkflow: process.env.ENABLE_APPROVAL_WORKFLOW === 'true',
  costItemCategories: process.env.COST_ITEM_CATEGORIES?.split(',') || ['materials', 'labor', 'equipment'],
  contractTypes: process.env.CONTRACT_TYPES?.split(',') || ['main', 'subcontract', 'supply']
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 預算管理功能
- [ ] 成本項目管理
- [ ] 合約管理系統
- [ ] 變更管理流程
- [ ] 成本分析報告
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成