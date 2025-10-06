# 9️⃣ 資源管理模組

## 📋 模組概述

資源管理模組提供專案資源的全面管理功能，包括人力資源、設備資源、物料資源、預算資源、空間資源等功能。此模組是 Project-Build 系統的資源優化核心組件。

### 🎯 功能目標
- 實現人力資源的分配和調度
- 提供設備資源的追蹤和管理
- 支持物料資源的採購和庫存
- 實現預算資源的分配和控制
- 整合所有模組的資源數據

## 🏗️ 功能架構

### 核心功能
```
資源管理模組
├── 人力資源
│   ├── 人員分配
│   ├── 技能管理
│   ├── 工作負荷
│   └── 績效追蹤
├── 設備資源
│   ├── 設備清單
│   ├── 維護計劃
│   ├── 使用追蹤
│   └── 成本分析
├── 物料資源
│   ├── 物料清單
│   ├── 採購管理
│   ├── 庫存控制
│   └── 供應商管理
├── 預算資源
│   ├── 預算分配
│   ├── 成本控制
│   ├── 費用追蹤
│   └── 財務報告
└── 空間資源
    ├── 空間規劃
    ├── 使用分配
    ├── 容量管理
    └── 優化建議
```

## 📊 數據結構設計

### 人力資源實體 (HumanResource)
```typescript
interface HumanResource {
  id: string;                    // 資源唯一標識
  projectId: string;             // 所屬專案 ID
  userId: string;                // 用戶 ID
  name: string;                  // 姓名
  role: ProjectRole;            // 專案角色
  department: string;            // 部門
  skills: Skill[];              // 技能
  availability: Availability;    // 可用性
  workload: Workload;           // 工作負荷
  cost: ResourceCost;           // 成本
  performance: Performance;     // 績效
  assignments: ResourceAssignment[]; // 分配任務
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

interface Skill {
  id: string;                    // 技能唯一標識
  name: string;                  // 技能名稱
  category: SkillCategory;       // 技能分類
  level: SkillLevel;            // 技能等級
  certification: string[];       // 認證
  experience: number;           // 經驗年數
  lastUpdated: Date;            // 最後更新
}

enum SkillCategory {
  TECHNICAL = 'technical',        // 技術技能
  MANAGEMENT = 'management',      // 管理技能
  COMMUNICATION = 'communication', // 溝通技能
  LEADERSHIP = 'leadership',     // 領導技能
  ANALYTICAL = 'analytical',     // 分析技能
  CREATIVE = 'creative'          // 創意技能
}

enum SkillLevel {
  BEGINNER = 'beginner',         // 初級
  INTERMEDIATE = 'intermediate',  // 中級
  ADVANCED = 'advanced',         // 高級
  EXPERT = 'expert'             // 專家
}

interface Availability {
  id: string;                    // 可用性唯一標識
  startDate: Date;              // 開始日期
  endDate: Date;                // 結束日期
  hoursPerWeek: number;         // 每週工時
  workingDays: DayOfWeek[];     // 工作日
  timeZone: string;             // 時區
  constraints: string[];        // 約束條件
  exceptions: AvailabilityException[]; // 例外情況
}

enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

interface AvailabilityException {
  id: string;                    // 例外唯一標識
  date: Date;                   // 日期
  startTime: string;            // 開始時間
  endTime: string;              // 結束時間
  reason: string;               // 原因
  type: ExceptionType;          // 例外類型
}

enum ExceptionType {
  UNAVAILABLE = 'unavailable',   // 不可用
  REDUCED_HOURS = 'reduced_hours', // 減少工時
  OVERTIME = 'overtime'         // 加班
}

interface Workload {
  id: string;                    // 工作負荷唯一標識
  currentLoad: number;          // 當前負荷
  maxCapacity: number;         // 最大容量
  utilization: number;          // 利用率
  tasks: WorkloadTask[];        // 任務負荷
  trends: WorkloadTrend[];      // 負荷趨勢
  lastUpdated: Date;           // 最後更新
}

interface WorkloadTask {
  id: string;                    // 任務唯一標識
  taskId: string;               // 任務 ID
  name: string;                 // 任務名稱
  effort: number;               // 工作量
  priority: Priority;          // 優先級
  status: TaskStatus;          // 狀態
  startDate: Date;             // 開始日期
  endDate: Date;               // 結束日期
}

interface WorkloadTrend {
  id: string;                    // 趨勢唯一標識
  date: Date;                   // 日期
  load: number;                 // 負荷
  capacity: number;            // 容量
  utilization: number;         // 利用率
}

interface ResourceCost {
  id: string;                    // 成本唯一標識
  hourlyRate: number;          // 時薪
  dailyRate: number;           // 日薪
  monthlyRate: number;         // 月薪
  currency: string;           // 貨幣
  costCenter: string;          // 成本中心
  budgetAllocation: number;    // 預算分配
  actualCost: number;          // 實際成本
  variance: number;            // 差異
}

interface Performance {
  id: string;                    // 績效唯一標識
  overallRating: number;        // 總體評分
  quality: number;             // 品質評分
  efficiency: number;          // 效率評分
  collaboration: number;       // 協作評分
  innovation: number;          // 創新評分
  goals: PerformanceGoal[];   // 績效目標
  reviews: PerformanceReview[]; // 績效評估
  lastReview: Date;           // 最後評估
}

interface PerformanceGoal {
  id: string;                    // 目標唯一標識
  name: string;                 // 目標名稱
  description: string;           // 目標描述
  target: number;               // 目標值
  current: number;              // 當前值
  unit: string;                 // 單位
  deadline: Date;              // 截止日期
  status: GoalStatus;          // 狀態
}

enum GoalStatus {
  NOT_STARTED = 'not_started',   // 未開始
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  OVERDUE = 'overdue'           // 逾期
}

interface PerformanceReview {
  id: string;                    // 評估唯一標識
  reviewer: string;             // 評估者 ID
  reviewDate: Date;            // 評估日期
  rating: number;              // 評分
  comments: string;            // 評論
  strengths: string[];          // 優勢
  improvements: string[];      // 改進建議
  nextGoals: string[];         // 下期目標
}

interface ResourceAssignment {
  id: string;                    // 分配唯一標識
  taskId: string;               // 任務 ID
  projectId: string;            // 專案 ID
  startDate: Date;              // 開始日期
  endDate: Date;                // 結束日期
  effort: number;               // 工作量
  role: string;                 // 角色
  status: AssignmentStatus;     // 狀態
  priority: Priority;          // 優先級
}

enum AssignmentStatus {
  ASSIGNED = 'assigned',         // 已分配
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  CANCELLED = 'cancelled'        // 已取消
}
```

### 設備資源實體 (EquipmentResource)
```typescript
interface EquipmentResource {
  id: string;                    // 設備唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 設備名稱
  type: EquipmentType;           // 設備類型
  category: EquipmentCategory;   // 設備分類
  model: string;                 // 型號
  serialNumber: string;          // 序列號
  manufacturer: string;          // 製造商
  status: EquipmentStatus;        // 設備狀態
  location: string;              // 位置
  specifications: EquipmentSpecification[]; // 規格
  maintenance: MaintenanceRecord[]; // 維護記錄
  usage: UsageRecord[];          // 使用記錄
  cost: EquipmentCost;          // 成本
  warranty: WarrantyInfo;       // 保修信息
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum EquipmentType {
  COMPUTER = 'computer',         // 電腦
  SOFTWARE = 'software',        // 軟體
  MACHINERY = 'machinery',       // 機械
  VEHICLE = 'vehicle',          // 車輛
  TOOL = 'tool',               // 工具
  INSTRUMENT = 'instrument'     // 儀器
}

enum EquipmentCategory {
  IT_EQUIPMENT = 'it_equipment', // IT 設備
  CONSTRUCTION = 'construction', // 建築設備
  OFFICE = 'office',           // 辦公設備
  LABORATORY = 'laboratory',    // 實驗室設備
  MEDICAL = 'medical',         // 醫療設備
  OTHER = 'other'               // 其他
}

enum EquipmentStatus {
  AVAILABLE = 'available',       // 可用
  IN_USE = 'in_use',            // 使用中
  MAINTENANCE = 'maintenance',   // 維護中
  REPAIR = 'repair',            // 維修中
  RETIRED = 'retired',          // 已退役
  LOST = 'lost'                 // 遺失
}

interface EquipmentSpecification {
  id: string;                    // 規格唯一標識
  name: string;                 // 規格名稱
  value: string;               // 規格值
  unit: string;                // 單位
  description: string;         // 描述
}

interface MaintenanceRecord {
  id: string;                    // 維護唯一標識
  type: MaintenanceType;         // 維護類型
  description: string;           // 維護描述
  performedBy: string;          // 執行者 ID
  performedAt: Date;            // 執行時間
  duration: number;             // 持續時間
  cost: number;                 // 成本
  nextMaintenance: Date;        // 下次維護
  status: MaintenanceStatus;     // 狀態
  notes: string;                // 備註
}

enum MaintenanceType {
  PREVENTIVE = 'preventive',     // 預防性維護
  CORRECTIVE = 'corrective',     // 糾正性維護
  EMERGENCY = 'emergency',       // 緊急維護
  UPGRADE = 'upgrade'           // 升級維護
}

enum MaintenanceStatus {
  SCHEDULED = 'scheduled',       // 已排程
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  CANCELLED = 'cancelled'        // 已取消
}

interface UsageRecord {
  id: string;                    // 使用唯一標識
  userId: string;               // 使用者 ID
  startTime: Date;              // 開始時間
  endTime: Date;                // 結束時間
  purpose: string;              // 使用目的
  location: string;             // 使用地點
  status: UsageStatus;          // 使用狀態
  notes: string;                // 備註
}

enum UsageStatus {
  ACTIVE = 'active',             // 使用中
  COMPLETED = 'completed',       // 已完成
  INTERRUPTED = 'interrupted'    // 中斷
}

interface EquipmentCost {
  id: string;                    // 成本唯一標識
  purchasePrice: number;        // 購買價格
  depreciationRate: number;     // 折舊率
  currentValue: number;         // 當前價值
  maintenanceCost: number;      // 維護成本
  operatingCost: number;        // 運營成本
  totalCost: number;           // 總成本
  costPerHour: number;         // 每小時成本
  currency: string;            // 貨幣
}

interface WarrantyInfo {
  id: string;                    // 保修唯一標識
  startDate: Date;              // 保修開始
  endDate: Date;                // 保修結束
  provider: string;             // 保修提供商
  terms: string;                // 保修條款
  contact: string;              // 聯繫方式
  coverage: string[];           // 保修範圍
}
```

### 物料資源實體 (MaterialResource)
```typescript
interface MaterialResource {
  id: string;                    // 物料唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 物料名稱
  code: string;                  // 物料編碼
  category: MaterialCategory;     // 物料分類
  type: MaterialType;           // 物料類型
  description: string;            // 物料描述
  specifications: MaterialSpecification[]; // 規格
  inventory: InventoryInfo;      // 庫存信息
  suppliers: Supplier[];         // 供應商
  procurement: ProcurementInfo; // 採購信息
  cost: MaterialCost;           // 成本
  quality: QualityInfo;         // 品質信息
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum MaterialCategory {
  RAW_MATERIAL = 'raw_material', // 原材料
  COMPONENT = 'component',       // 組件
  FINISHED_GOOD = 'finished_good', // 成品
  CONSUMABLE = 'consumable',     // 消耗品
  TOOL = 'tool',               // 工具
  EQUIPMENT = 'equipment'       // 設備
}

enum MaterialType {
  STEEL = 'steel',              // 鋼材
  CONCRETE = 'concrete',        // 混凝土
  WOOD = 'wood',               // 木材
  GLASS = 'glass',             // 玻璃
  PLASTIC = 'plastic',         // 塑膠
  ELECTRONIC = 'electronic',   // 電子
  CHEMICAL = 'chemical',       // 化學
  OTHER = 'other'              // 其他
}

interface MaterialSpecification {
  id: string;                    // 規格唯一標識
  name: string;                 // 規格名稱
  value: string;               // 規格值
  unit: string;                // 單位
  tolerance: string;            // 公差
  standard: string;              // 標準
}

interface InventoryInfo {
  id: string;                    // 庫存唯一標識
  currentStock: number;         // 當前庫存
  minStock: number;             // 最小庫存
  maxStock: number;             // 最大庫存
  reorderPoint: number;         // 再訂購點
  reorderQuantity: number;      // 再訂購量
  location: string;             // 庫存位置
  batchNumber: string;          // 批次號
  expiryDate?: Date;            // 過期日期
  lastUpdated: Date;            // 最後更新
}

interface Supplier {
  id: string;                    // 供應商唯一標識
  name: string;                 // 供應商名稱
  contact: ContactInfo;         // 聯繫信息
  rating: number;               // 評級
  leadTime: number;             // 交貨期
  minimumOrder: number;         // 最小訂購量
  paymentTerms: string;        // 付款條件
  certifications: string[];     // 認證
  status: SupplierStatus;      // 狀態
}

enum SupplierStatus {
  ACTIVE = 'active',            // 活躍
  INACTIVE = 'inactive',        // 非活躍
  SUSPENDED = 'suspended',      // 暫停
  BLACKLISTED = 'blacklisted'   // 黑名單
}

interface ContactInfo {
  id: string;                    // 聯繫唯一標識
  name: string;                 // 聯繫人姓名
  email: string;                // 電子郵件
  phone: string;                // 電話
  address: string;              // 地址
  website: string;              // 網站
}

interface ProcurementInfo {
  id: string;                    // 採購唯一標識
  lastOrderDate: Date;          // 最後訂購日期
  lastOrderQuantity: number;     // 最後訂購數量
  lastOrderPrice: number;        // 最後訂購價格
  averagePrice: number;          // 平均價格
  totalOrders: number;           // 總訂購次數
  totalQuantity: number;         // 總訂購數量
  totalCost: number;            // 總成本
}

interface MaterialCost {
  id: string;                    // 成本唯一標識
  unitPrice: number;            // 單價
  totalCost: number;            // 總成本
  currency: string;             // 貨幣
  costCenter: string;           // 成本中心
  budgetAllocation: number;     // 預算分配
  actualCost: number;           // 實際成本
  variance: number;             // 差異
}

interface QualityInfo {
  id: string;                    // 品質唯一標識
  grade: QualityGrade;          // 品質等級
  standards: string[];          // 標準
  certifications: string[];     // 認證
  testResults: TestResult[];    // 測試結果
  compliance: ComplianceStatus; // 合規狀態
}

interface TestResult {
  id: string;                    // 測試唯一標識
  testName: string;             // 測試名稱
  testDate: Date;               // 測試日期
  result: string;               // 測試結果
  standard: string;             // 標準
  tester: string;                // 測試者
  notes: string;                // 備註
}

enum ComplianceStatus {
  COMPLIANT = 'compliant',       // 合規
  NON_COMPLIANT = 'non_compliant', // 不合規
  PENDING = 'pending',          // 待確認
  EXEMPT = 'exempt'             // 豁免
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 資源管理主組件
@Component({
  selector: 'app-resource-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>資源管理</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="addResource()">
              <i nz-icon nzType="plus"></i>
              添加資源
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
          <nz-tab nzTitle="人力資源">
            <app-human-resources></app-human-resources>
          </nz-tab>
          <nz-tab nzTitle="設備資源">
            <app-equipment-resources></app-equipment-resources>
          </nz-tab>
          <nz-tab nzTitle="物料資源">
            <app-material-resources></app-material-resources>
          </nz-tab>
          <nz-tab nzTitle="預算資源">
            <app-budget-resources></app-budget-resources>
          </nz-tab>
          <nz-tab nzTitle="空間資源">
            <app-space-resources></app-space-resources>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class ResourceManagementComponent implements OnInit {
  constructor(
    private resourceService: ResourceService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.resourceService.loadResources();
  }
  
  addResource() {
    this.modal.create({
      nzTitle: '添加資源',
      nzContent: AppAddResourceModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  generateReport() {
    this.modal.create({
      nzTitle: '生成資源報告',
      nzContent: AppGenerateResourceReportModalComponent,
      nzFooter: null,
      nzWidth: 1200
    });
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private readonly apiUrl = '/api/projects';
  
  private humanResourcesSubject = new BehaviorSubject<HumanResource[]>([]);
  private equipmentResourcesSubject = new BehaviorSubject<EquipmentResource[]>([]);
  private materialResourcesSubject = new BehaviorSubject<MaterialResource[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  humanResources$ = this.humanResourcesSubject.asObservable();
  equipmentResources$ = this.equipmentResourcesSubject.asObservable();
  materialResources$ = this.materialResourcesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 載入人力資源
  loadHumanResources(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<HumanResource[]>(`${this.apiUrl}/${projectId}/human-resources`)
      .pipe(
        tap(resources => this.humanResourcesSubject.next(resources)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 載入設備資源
  loadEquipmentResources(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<EquipmentResource[]>(`${this.apiUrl}/${projectId}/equipment-resources`)
      .pipe(
        tap(resources => this.equipmentResourcesSubject.next(resources)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 載入物料資源
  loadMaterialResources(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<MaterialResource[]>(`${this.apiUrl}/${projectId}/material-resources`)
      .pipe(
        tap(resources => this.materialResourcesSubject.next(resources)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 分配人力資源
  assignHumanResource(assignment: ResourceAssignment): Observable<ResourceAssignment> {
    return this.http.post<ResourceAssignment>('/api/resource-assignments', assignment).pipe(
      catchError(this.handleError)
    );
  }
  
  // 更新工作負荷
  updateWorkload(userId: string, workload: Workload): Observable<Workload> {
    return this.http.patch<Workload>(`/api/human-resources/${userId}/workload`, workload).pipe(
      catchError(this.handleError)
    );
  }
  
  // 記錄設備使用
  recordEquipmentUsage(usage: UsageRecord): Observable<UsageRecord> {
    return this.http.post<UsageRecord>('/api/equipment-usage', usage).pipe(
      catchError(this.handleError)
    );
  }
  
  // 更新庫存
  updateInventory(materialId: string, inventory: InventoryInfo): Observable<InventoryInfo> {
    return this.http.patch<InventoryInfo>(`/api/material-resources/${materialId}/inventory`, inventory).pipe(
      catchError(this.handleError)
    );
  }
  
  // 獲取資源統計
  getResourceStats(): Observable<ResourceStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<ResourceStats>(`${this.apiUrl}/${projectId}/resource-stats`);
  }
  
  // 獲取資源利用率
  getResourceUtilization(): Observable<ResourceUtilization> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<ResourceUtilization>(`${this.apiUrl}/${projectId}/resource-utilization`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Resource service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 資源管理權限
```typescript
enum ResourceManagementPermission {
  VIEW_HUMAN_RESOURCES = 'view_human_resources',
  MANAGE_HUMAN_RESOURCES = 'manage_human_resources',
  VIEW_EQUIPMENT_RESOURCES = 'view_equipment_resources',
  MANAGE_EQUIPMENT_RESOURCES = 'manage_equipment_resources',
  VIEW_MATERIAL_RESOURCES = 'view_material_resources',
  MANAGE_MATERIAL_RESOURCES = 'manage_material_resources',
  VIEW_BUDGET_RESOURCES = 'view_budget_resources',
  MANAGE_BUDGET_RESOURCES = 'manage_budget_resources',
  VIEW_SPACE_RESOURCES = 'view_space_resources',
  MANAGE_SPACE_RESOURCES = 'manage_space_resources',
  ASSIGN_RESOURCES = 'assign_resources',
  GENERATE_REPORTS = 'generate_reports'
}

// 角色權限映射
const RESOURCE_PERMISSIONS: Record<ProjectRole, ResourceManagementPermission[]> = {
  [ProjectRole.OWNER]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.MANAGE_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.MANAGE_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES,
    ResourceManagementPermission.MANAGE_MATERIAL_RESOURCES,
    ResourceManagementPermission.VIEW_BUDGET_RESOURCES,
    ResourceManagementPermission.MANAGE_BUDGET_RESOURCES,
    ResourceManagementPermission.VIEW_SPACE_RESOURCES,
    ResourceManagementPermission.MANAGE_SPACE_RESOURCES,
    ResourceManagementPermission.ASSIGN_RESOURCES,
    ResourceManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ADMIN]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.MANAGE_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.MANAGE_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES,
    ResourceManagementPermission.MANAGE_MATERIAL_RESOURCES,
    ResourceManagementPermission.VIEW_BUDGET_RESOURCES,
    ResourceManagementPermission.MANAGE_BUDGET_RESOURCES,
    ResourceManagementPermission.VIEW_SPACE_RESOURCES,
    ResourceManagementPermission.MANAGE_SPACE_RESOURCES,
    ResourceManagementPermission.ASSIGN_RESOURCES,
    ResourceManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.MANAGER]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.MANAGE_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.MANAGE_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES,
    ResourceManagementPermission.MANAGE_MATERIAL_RESOURCES,
    ResourceManagementPermission.VIEW_BUDGET_RESOURCES,
    ResourceManagementPermission.VIEW_SPACE_RESOURCES,
    ResourceManagementPermission.ASSIGN_RESOURCES,
    ResourceManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ENGINEER]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.MANAGE_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES,
    ResourceManagementPermission.MANAGE_MATERIAL_RESOURCES,
    ResourceManagementPermission.VIEW_BUDGET_RESOURCES,
    ResourceManagementPermission.VIEW_SPACE_RESOURCES
  ],
  [ProjectRole.CONTRACTOR]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES,
    ResourceManagementPermission.VIEW_BUDGET_RESOURCES,
    ResourceManagementPermission.VIEW_SPACE_RESOURCES
  ],
  [ProjectRole.VIEWER]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES,
    ResourceManagementPermission.VIEW_BUDGET_RESOURCES,
    ResourceManagementPermission.VIEW_SPACE_RESOURCES
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    ResourceManagementPermission.VIEW_HUMAN_RESOURCES,
    ResourceManagementPermission.VIEW_EQUIPMENT_RESOURCES,
    ResourceManagementPermission.VIEW_MATERIAL_RESOURCES
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface ResourceManagementApi {
  // 人力資源管理
  GET /api/projects/{projectId}/human-resources      // 獲取人力資源列表
  POST /api/human-resources                         // 創建人力資源
  GET /api/human-resources/{resourceId}              // 獲取人力資源詳情
  PATCH /api/human-resources/{resourceId}            // 更新人力資源
  DELETE /api/human-resources/{resourceId}           // 刪除人力資源
  
  // 設備資源管理
  GET /api/projects/{projectId}/equipment-resources // 獲取設備資源列表
  POST /api/equipment-resources                     // 創建設備資源
  GET /api/equipment-resources/{resourceId}         // 獲取設備資源詳情
  PATCH /api/equipment-resources/{resourceId}       // 更新設備資源
  DELETE /api/equipment-resources/{resourceId}      // 刪除設備資源
  
  // 物料資源管理
  GET /api/projects/{projectId}/material-resources  // 獲取物料資源列表
  POST /api/material-resources                     // 創建物料資源
  GET /api/material-resources/{resourceId}         // 獲取物料資源詳情
  PATCH /api/material-resources/{resourceId}       // 更新物料資源
  DELETE /api/material-resources/{resourceId}      // 刪除物料資源
  
  // 資源分配
  POST /api/resource-assignments                    // 創建資源分配
  GET /api/resource-assignments                     // 獲取資源分配列表
  PATCH /api/resource-assignments/{assignmentId}    // 更新資源分配
  DELETE /api/resource-assignments/{assignmentId}   // 刪除資源分配
  
  // 資源統計
  GET /api/projects/{projectId}/resource-stats      // 獲取資源統計
  GET /api/projects/{projectId}/resource-utilization // 獲取資源利用率
  POST /api/projects/{projectId}/resource-reports   // 生成資源報告
}

// 請求/響應類型
interface CreateHumanResourceRequest {
  userId: string;
  projectId: string;
  role: ProjectRole;
  department: string;
  skills: Skill[];
  availability: Availability;
  cost: ResourceCost;
}

interface CreateEquipmentResourceRequest {
  projectId: string;
  name: string;
  type: EquipmentType;
  category: EquipmentCategory;
  model: string;
  serialNumber: string;
  manufacturer: string;
  location: string;
  specifications: EquipmentSpecification[];
  cost: EquipmentCost;
  warranty: WarrantyInfo;
}

interface CreateMaterialResourceRequest {
  projectId: string;
  name: string;
  code: string;
  category: MaterialCategory;
  type: MaterialType;
  description: string;
  specifications: MaterialSpecification[];
  inventory: InventoryInfo;
  suppliers: Supplier[];
  cost: MaterialCost;
  quality: QualityInfo;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const resourceConfig = {
  enableHumanResources: process.env.ENABLE_HUMAN_RESOURCES === 'true',
  enableEquipmentResources: process.env.ENABLE_EQUIPMENT_RESOURCES === 'true',
  enableMaterialResources: process.env.ENABLE_MATERIAL_RESOURCES === 'true',
  enableBudgetResources: process.env.ENABLE_BUDGET_RESOURCES === 'true',
  enableSpaceResources: process.env.ENABLE_SPACE_RESOURCES === 'true',
  maxResourceAssignments: parseInt(process.env.MAX_RESOURCE_ASSIGNMENTS || '1000'),
  resourceUpdateInterval: parseInt(process.env.RESOURCE_UPDATE_INTERVAL || '3600'), // seconds
  inventoryAlertThreshold: parseFloat(process.env.INVENTORY_ALERT_THRESHOLD || '0.1'),
  maintenanceReminderDays: parseInt(process.env.MAINTENANCE_REMINDER_DAYS || '7'),
  resourceCostCalculation: {
    includeDepreciation: process.env.INCLUDE_DEPRECIATION === 'true',
    includeMaintenance: process.env.INCLUDE_MAINTENANCE === 'true',
    includeOperating: process.env.INCLUDE_OPERATING === 'true'
  }
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 人力資源管理
- [ ] 設備資源管理
- [ ] 物料資源管理
- [ ] 預算資源管理
- [ ] 空間資源管理
- [ ] 資源分配功能
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成