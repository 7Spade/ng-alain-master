# 8️⃣ 安全管理模組

## 📋 模組概述

安全管理模組提供專案安全的全面監控功能，包括安全標準、風險評估、事故管理、培訓記錄、合規檢查等功能。此模組是 Project-Build 系統的安全保障核心組件。

### 🎯 功能目標
- 建立安全標準和程序
- 實現風險評估和管理
- 提供事故追蹤和處理
- 支持安全培訓和認證
- 整合所有模組的安全數據

## 🏗️ 功能架構

### 核心功能
```
安全管理模組
├── 安全標準
│   ├── 安全程序
│   ├── 安全政策
│   ├── 安全指南
│   └── 合規要求
├── 風險管理
│   ├── 風險識別
│   ├── 風險評估
│   ├── 風險控制
│   └── 風險監控
├── 事故管理
│   ├── 事故報告
│   ├── 事故調查
│   ├── 事故分析
│   └── 預防措施
├── 培訓管理
│   ├── 培訓計劃
│   ├── 培訓記錄
│   ├── 認證管理
│   └── 培訓評估
└── 合規檢查
    ├── 安全檢查
    ├── 合規審計
    ├── 檢查報告
    └── 整改追蹤
```

## 📊 數據結構設計

### 安全標準實體 (SafetyStandard)
```typescript
interface SafetyStandard {
  id: string;                    // 標準唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 標準名稱
  description: string;            // 標準描述
  category: SafetyCategory;      // 安全分類
  type: SafetyType;             // 標準類型
  version: string;              // 版本號
  status: SafetyStatus;         // 狀態
  requirements: SafetyRequirement[]; // 安全要求
  procedures: SafetyProcedure[]; // 安全程序
  compliance: SafetyCompliance[]; // 合規要求
  effectiveDate: Date;          // 生效日期
  reviewDate: Date;             // 審查日期
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum SafetyCategory {
  GENERAL_SAFETY = 'general_safety',     // 一般安全
  WORKPLACE_SAFETY = 'workplace_safety', // 工作場所安全
  EQUIPMENT_SAFETY = 'equipment_safety', // 設備安全
  ENVIRONMENTAL_SAFETY = 'environmental_safety', // 環境安全
  EMERGENCY_RESPONSE = 'emergency_response', // 應急響應
  PERSONAL_PROTECTION = 'personal_protection' // 個人防護
}

enum SafetyType {
  POLICY = 'policy',             // 政策
  PROCEDURE = 'procedure',       // 程序
  GUIDELINE = 'guideline',       // 指導原則
  STANDARD = 'standard',         // 標準
  REGULATION = 'regulation'      // 法規
}

enum SafetyStatus {
  DRAFT = 'draft',               // 草稿
  REVIEW = 'review',             // 審查中
  APPROVED = 'approved',         // 已審批
  ACTIVE = 'active',            // 生效中
  DEPRECATED = 'deprecated'      // 已廢棄
}

interface SafetyRequirement {
  id: string;                    // 要求唯一標識
  name: string;                  // 要求名稱
  description: string;            // 要求描述
  mandatory: boolean;            // 是否強制
  priority: Priority;           // 優先級
  applicableRoles: ProjectRole[]; // 適用角色
  verificationMethod: string;     // 驗證方法
  complianceCriteria: string[];  // 合規標準
}

interface SafetyProcedure {
  id: string;                    // 程序唯一標識
  name: string;                  // 程序名稱
  description: string;            // 程序描述
  steps: ProcedureStep[];        // 程序步驟
  prerequisites: string[];       // 前置條件
  safetyEquipment: string[];     // 安全設備
  warnings: string[];            // 警告事項
  emergencyProcedures: string[]; // 應急程序
}

interface ProcedureStep {
  id: string;                    // 步驟唯一標識
  order: number;                 // 順序
  name: string;                  // 步驟名稱
  description: string;            // 步驟描述
  duration: number;              // 預計時間
  safetyChecks: string[];        // 安全檢查
  requiredEquipment: string[];    // 所需設備
  warnings: string[];            // 警告
}

interface SafetyCompliance {
  id: string;                    // 合規唯一標識
  regulation: string;             // 法規名稱
  version: string;              // 法規版本
  effectiveDate: Date;          // 生效日期
  expiryDate?: Date;            // 失效日期
  requirements: string[];       // 合規要求
  penalties: string[];          // 違規處罰
  references: string[];         // 參考文檔
}
```

### 風險管理實體 (SafetyRisk)
```typescript
interface SafetyRisk {
  id: string;                    // 風險唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 風險名稱
  description: string;            // 風險描述
  category: RiskCategory;        // 風險分類
  type: RiskType;               // 風險類型
  status: RiskStatus;           // 風險狀態
  probability: RiskProbability;  // 發生概率
  impact: RiskImpact;           // 影響程度
  riskLevel: RiskLevel;         // 風險等級
  source: string;              // 風險來源
  consequences: string[];       // 後果
  controls: RiskControl[];       // 控制措施
  owner: string;               // 負責人 ID
  assessor: string;             // 評估者 ID
  assessmentDate: Date;         // 評估日期
  reviewDate: Date;             // 審查日期
  createdAt: Date;             // 創建時間
  updatedAt: Date;             // 更新時間
  createdBy: string;           // 創建者 ID
}

enum RiskCategory {
  PHYSICAL = 'physical',         // 物理風險
  CHEMICAL = 'chemical',         // 化學風險
  BIOLOGICAL = 'biological',     // 生物風險
  ERGONOMIC = 'ergonomic',       // 人體工學風險
  PSYCHOSOCIAL = 'psychosocial', // 心理社會風險
  ENVIRONMENTAL = 'environmental'  // 環境風險
}

enum RiskType {
  HAZARD = 'hazard',             // 危害
  INCIDENT = 'incident',         // 事件
  NEAR_MISS = 'near_miss',       // 險情
  POTENTIAL = 'potential'        // 潛在風險
}

enum RiskStatus {
  IDENTIFIED = 'identified',      // 已識別
  ASSESSED = 'assessed',         // 已評估
  CONTROLLED = 'controlled',     // 已控制
  MONITORED = 'monitored',       // 監控中
  CLOSED = 'closed'              // 已關閉
}

enum RiskProbability {
  VERY_LOW = 'very_low',         // 很低 (1)
  LOW = 'low',                  // 低 (2)
  MEDIUM = 'medium',            // 中等 (3)
  HIGH = 'high',                // 高 (4)
  VERY_HIGH = 'very_high'       // 很高 (5)
}

enum RiskImpact {
  MINIMAL = 'minimal',           // 最小 (1)
  MINOR = 'minor',              // 輕微 (2)
  MODERATE = 'moderate',         // 中等 (3)
  MAJOR = 'major',              // 重大 (4)
  CATASTROPHIC = 'catastrophic'  // 災難性 (5)
}

enum RiskLevel {
  LOW = 'low',                  // 低風險 (1-4)
  MEDIUM = 'medium',            // 中等風險 (5-9)
  HIGH = 'high',                // 高風險 (10-16)
  CRITICAL = 'critical'         // 關鍵風險 (17-25)
}

interface RiskControl {
  id: string;                    // 控制唯一標識
  type: ControlType;             // 控制類型
  name: string;                  // 控制名稱
  description: string;            // 控制描述
  effectiveness: ControlEffectiveness; // 有效性
  implementationDate: Date;      // 實施日期
  responsible: string;           // 負責人 ID
  cost: number;                 // 成本
  status: ControlStatus;         // 狀態
}

enum ControlType {
  ELIMINATION = 'elimination',   // 消除
  SUBSTITUTION = 'substitution', // 替代
  ENGINEERING = 'engineering',   // 工程控制
  ADMINISTRATIVE = 'administrative', // 管理控制
  PPE = 'ppe'                   // 個人防護設備
}

enum ControlEffectiveness {
  HIGH = 'high',                 // 高
  MEDIUM = 'medium',            // 中等
  LOW = 'low'                   // 低
}

enum ControlStatus {
  PLANNED = 'planned',           // 計劃中
  IMPLEMENTED = 'implemented',   // 已實施
  EFFECTIVE = 'effective',       // 有效
  INEFFECTIVE = 'ineffective',   // 無效
  REVIEWED = 'reviewed'         // 已審查
}
```

### 事故管理實體 (SafetyIncident)
```typescript
interface SafetyIncident {
  id: string;                    // 事故唯一標識
  projectId: string;             // 所屬專案 ID
  incidentNumber: string;        // 事故編號
  title: string;                 // 事故標題
  description: string;            // 事故描述
  type: IncidentType;            // 事故類型
  severity: IncidentSeverity;     // 嚴重程度
  status: IncidentStatus;        // 事故狀態
  category: SafetyCategory;      // 安全分類
  location: string;              // 事故地點
  dateTime: Date;               // 事故時間
  reportedBy: string;           // 報告人 ID
  reportedAt: Date;             // 報告時間
  involvedPersons: InvolvedPerson[]; // 涉及人員
  witnesses: Witness[];          // 目擊者
  immediateActions: string[];    // 立即行動
  investigation: Investigation; // 調查
  rootCauses: RootCause[];       // 根本原因
  correctiveActions: CorrectiveAction[]; // 糾正措施
  preventiveActions: PreventiveAction[]; // 預防措施
  attachments: Attachment[];     // 附件
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum IncidentType {
  INJURY = 'injury',             // 傷害
  ILLNESS = 'illness',           // 疾病
  PROPERTY_DAMAGE = 'property_damage', // 財產損失
  ENVIRONMENTAL = 'environmental', // 環境事故
  NEAR_MISS = 'near_miss',       // 險情
  UNSAFE_CONDITION = 'unsafe_condition', // 不安全條件
  UNSAFE_BEHAVIOR = 'unsafe_behavior' // 不安全行為
}

enum IncidentSeverity {
  FATAL = 'fatal',               // 致命
  MAJOR = 'major',              // 重大
  MODERATE = 'moderate',         // 中等
  MINOR = 'minor',              // 輕微
  NEGLIGIBLE = 'negligible'      // 可忽略
}

enum IncidentStatus {
  REPORTED = 'reported',         // 已報告
  INVESTIGATING = 'investigating', // 調查中
  ANALYZING = 'analyzing',        // 分析中
  RESOLVED = 'resolved',         // 已解決
  CLOSED = 'closed'              // 已關閉
}

interface InvolvedPerson {
  id: string;                    // 人員唯一標識
  name: string;                  // 姓名
  role: ProjectRole;            // 角色
  department: string;            // 部門
  injuryType?: string;          // 傷害類型
  injurySeverity?: string;       // 傷害嚴重程度
  medicalTreatment: boolean;     // 是否接受醫療
  workRestriction: boolean;      // 是否工作限制
  returnToWorkDate?: Date;       // 復工日期
}

interface Witness {
  id: string;                    // 目擊者唯一標識
  name: string;                  // 姓名
  role: ProjectRole;            // 角色
  department: string;            // 部門
  statement: string;              // 證詞
  contactInfo: string;           // 聯繫方式
}

interface Investigation {
  id: string;                    // 調查唯一標識
  investigator: string;         // 調查員 ID
  startDate: Date;              // 開始日期
  endDate?: Date;                // 結束日期
  methodology: string;           // 調查方法
  findings: string[];            // 調查發現
  evidence: Attachment[];         // 證據
  conclusions: string[];         // 結論
  recommendations: string[];      // 建議
}

interface RootCause {
  id: string;                    // 原因唯一標識
  category: RootCauseCategory;   // 原因分類
  description: string;            // 原因描述
  contributingFactors: string[]; // 促成因素
  evidence: string[];           // 證據
}

enum RootCauseCategory {
  HUMAN_FACTOR = 'human_factor', // 人為因素
  EQUIPMENT = 'equipment',       // 設備因素
  ENVIRONMENT = 'environment',   // 環境因素
  MANAGEMENT = 'management',     // 管理因素
  PROCEDURE = 'procedure',       // 程序因素
  TRAINING = 'training'          // 培訓因素
}

interface CorrectiveAction {
  id: string;                    // 措施唯一標識
  description: string;            // 措施描述
  responsible: string;           // 負責人 ID
  dueDate: Date;                // 截止日期
  status: ActionStatus;          // 狀態
  effectiveness: string;         // 有效性
  verification: string;          // 驗證
}

interface PreventiveAction {
  id: string;                    // 措施唯一標識
  description: string;            // 措施描述
  responsible: string;           // 負責人 ID
  dueDate: Date;                // 截止日期
  status: ActionStatus;          // 狀態
  implementation: string;         // 實施情況
}

enum ActionStatus {
  PLANNED = 'planned',           // 計劃中
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  VERIFIED = 'verified',         // 已驗證
  OVERDUE = 'overdue'            // 逾期
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 安全管理主組件
@Component({
  selector: 'app-safety-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>安全管理</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createStandard()">
              <i nz-icon nzType="plus"></i>
              創建標準
            </button>
            <button nz-button nzDanger (click)="reportIncident()">
              <i nz-icon nzType="exclamation-circle"></i>
              報告事故
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="安全標準">
            <app-safety-standards></app-safety-standards>
          </nz-tab>
          <nz-tab nzTitle="風險管理">
            <app-risk-management></app-risk-management>
          </nz-tab>
          <nz-tab nzTitle="事故管理">
            <app-incident-management></app-incident-management>
          </nz-tab>
          <nz-tab nzTitle="培訓管理">
            <app-training-management></app-training-management>
          </nz-tab>
          <nz-tab nzTitle="合規檢查">
            <app-compliance-check></app-compliance-check>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class SafetyManagementComponent implements OnInit {
  constructor(
    private safetyService: SafetyService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.safetyService.loadSafetyStandards();
  }
  
  createStandard() {
    this.modal.create({
      nzTitle: '創建安全標準',
      nzContent: AppCreateSafetyStandardModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  reportIncident() {
    this.modal.create({
      nzTitle: '報告安全事故',
      nzContent: AppReportIncidentModalComponent,
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
export class SafetyService {
  private readonly apiUrl = '/api/projects';
  
  private standardsSubject = new BehaviorSubject<SafetyStandard[]>([]);
  private risksSubject = new BehaviorSubject<SafetyRisk[]>([]);
  private incidentsSubject = new BehaviorSubject<SafetyIncident[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  standards$ = this.standardsSubject.asObservable();
  risks$ = this.risksSubject.asObservable();
  incidents$ = this.incidentsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建安全標準
  createStandard(standardData: CreateSafetyStandardRequest): Observable<SafetyStandard> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<SafetyStandard>(`${this.apiUrl}/${projectId}/safety-standards`, standardData).pipe(
      tap(standard => {
        const currentStandards = this.standardsSubject.value;
        this.standardsSubject.next([...currentStandards, standard]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入安全標準
  loadSafetyStandards(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<SafetyStandard[]>(`${this.apiUrl}/${projectId}/safety-standards`)
      .pipe(
        tap(standards => this.standardsSubject.next(standards)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建風險評估
  createRisk(riskData: CreateRiskRequest): Observable<SafetyRisk> {
    return this.http.post<SafetyRisk>('/api/safety-risks', riskData).pipe(
      tap(risk => {
        const currentRisks = this.risksSubject.value;
        this.risksSubject.next([...currentRisks, risk]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入風險評估
  loadSafetyRisks(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<SafetyRisk[]>(`${this.apiUrl}/${projectId}/safety-risks`)
      .pipe(
        tap(risks => this.risksSubject.next(risks)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 報告事故
  reportIncident(incidentData: CreateIncidentRequest): Observable<SafetyIncident> {
    return this.http.post<SafetyIncident>('/api/safety-incidents', incidentData).pipe(
      tap(incident => {
        const currentIncidents = this.incidentsSubject.value;
        this.incidentsSubject.next([...currentIncidents, incident]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入事故記錄
  loadSafetyIncidents(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<SafetyIncident[]>(`${this.apiUrl}/${projectId}/safety-incidents`)
      .pipe(
        tap(incidents => this.incidentsSubject.next(incidents)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 獲取安全統計
  getSafetyStats(): Observable<SafetyStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<SafetyStats>(`${this.apiUrl}/${projectId}/safety-stats`);
  }
  
  // 獲取風險矩陣
  getRiskMatrix(): Observable<RiskMatrix> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<RiskMatrix>(`${this.apiUrl}/${projectId}/risk-matrix`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Safety service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 安全管理權限
```typescript
enum SafetyManagementPermission {
  VIEW_STANDARDS = 'view_standards',
  MANAGE_STANDARDS = 'manage_standards',
  VIEW_RISKS = 'view_risks',
  MANAGE_RISKS = 'manage_risks',
  VIEW_INCIDENTS = 'view_incidents',
  MANAGE_INCIDENTS = 'manage_incidents',
  REPORT_INCIDENTS = 'report_incidents',
  VIEW_TRAINING = 'view_training',
  MANAGE_TRAINING = 'manage_training',
  VIEW_COMPLIANCE = 'view_compliance',
  MANAGE_COMPLIANCE = 'manage_compliance',
  GENERATE_REPORTS = 'generate_reports'
}

// 角色權限映射
const SAFETY_PERMISSIONS: Record<ProjectRole, SafetyManagementPermission[]> = {
  [ProjectRole.OWNER]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.MANAGE_STANDARDS,
    SafetyManagementPermission.VIEW_RISKS,
    SafetyManagementPermission.MANAGE_RISKS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.MANAGE_INCIDENTS,
    SafetyManagementPermission.REPORT_INCIDENTS,
    SafetyManagementPermission.VIEW_TRAINING,
    SafetyManagementPermission.MANAGE_TRAINING,
    SafetyManagementPermission.VIEW_COMPLIANCE,
    SafetyManagementPermission.MANAGE_COMPLIANCE,
    SafetyManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ADMIN]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.MANAGE_STANDARDS,
    SafetyManagementPermission.VIEW_RISKS,
    SafetyManagementPermission.MANAGE_RISKS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.MANAGE_INCIDENTS,
    SafetyManagementPermission.REPORT_INCIDENTS,
    SafetyManagementPermission.VIEW_TRAINING,
    SafetyManagementPermission.MANAGE_TRAINING,
    SafetyManagementPermission.VIEW_COMPLIANCE,
    SafetyManagementPermission.MANAGE_COMPLIANCE,
    SafetyManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.MANAGER]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.VIEW_RISKS,
    SafetyManagementPermission.MANAGE_RISKS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.MANAGE_INCIDENTS,
    SafetyManagementPermission.REPORT_INCIDENTS,
    SafetyManagementPermission.VIEW_TRAINING,
    SafetyManagementPermission.MANAGE_TRAINING,
    SafetyManagementPermission.VIEW_COMPLIANCE,
    SafetyManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ENGINEER]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.VIEW_RISKS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.REPORT_INCIDENTS,
    SafetyManagementPermission.VIEW_TRAINING,
    SafetyManagementPermission.VIEW_COMPLIANCE
  ],
  [ProjectRole.CONTRACTOR]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.VIEW_RISKS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.REPORT_INCIDENTS,
    SafetyManagementPermission.VIEW_TRAINING,
    SafetyManagementPermission.VIEW_COMPLIANCE
  ],
  [ProjectRole.VIEWER]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.VIEW_RISKS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.VIEW_TRAINING,
    SafetyManagementPermission.VIEW_COMPLIANCE
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    SafetyManagementPermission.VIEW_STANDARDS,
    SafetyManagementPermission.VIEW_INCIDENTS,
    SafetyManagementPermission.REPORT_INCIDENTS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface SafetyManagementApi {
  // 安全標準管理
  POST /api/projects/{projectId}/safety-standards    // 創建安全標準
  GET /api/projects/{projectId}/safety-standards     // 獲取安全標準列表
  GET /api/safety-standards/{standardId}             // 獲取安全標準詳情
  PATCH /api/safety-standards/{standardId}           // 更新安全標準
  DELETE /api/safety-standards/{standardId}          // 刪除安全標準
  
  // 風險管理
  POST /api/safety-risks                            // 創建風險評估
  GET /api/projects/{projectId}/safety-risks        // 獲取風險列表
  GET /api/safety-risks/{riskId}                    // 獲取風險詳情
  PATCH /api/safety-risks/{riskId}                  // 更新風險評估
  DELETE /api/safety-risks/{riskId}                 // 刪除風險評估
  
  // 事故管理
  POST /api/safety-incidents                        // 報告事故
  GET /api/projects/{projectId}/safety-incidents    // 獲取事故列表
  GET /api/safety-incidents/{incidentId}            // 獲取事故詳情
  PATCH /api/safety-incidents/{incidentId}          // 更新事故
  DELETE /api/safety-incidents/{incidentId}         // 刪除事故
  
  // 培訓管理
  POST /api/safety-training                         // 創建培訓記錄
  GET /api/projects/{projectId}/safety-training      // 獲取培訓記錄
  GET /api/safety-training/{trainingId}             // 獲取培訓詳情
  PATCH /api/safety-training/{trainingId}           // 更新培訓記錄
  
  // 合規檢查
  GET /api/projects/{projectId}/safety-compliance   // 獲取合規狀態
  POST /api/projects/{projectId}/safety-audit       // 執行安全審計
  GET /api/projects/{projectId}/safety-stats         // 獲取安全統計
  GET /api/projects/{projectId}/risk-matrix          // 獲取風險矩陣
}

// 請求/響應類型
interface CreateSafetyStandardRequest {
  name: string;
  description: string;
  category: SafetyCategory;
  type: SafetyType;
  requirements: SafetyRequirement[];
  procedures: SafetyProcedure[];
  compliance: SafetyCompliance[];
  effectiveDate: Date;
  reviewDate: Date;
}

interface CreateRiskRequest {
  projectId: string;
  name: string;
  description: string;
  category: RiskCategory;
  type: RiskType;
  probability: RiskProbability;
  impact: RiskImpact;
  source: string;
  consequences: string[];
  owner: string;
  assessor: string;
}

interface CreateIncidentRequest {
  projectId: string;
  title: string;
  description: string;
  type: IncidentType;
  severity: IncidentSeverity;
  category: SafetyCategory;
  location: string;
  dateTime: Date;
  involvedPersons: InvolvedPerson[];
  witnesses: Witness[];
  immediateActions: string[];
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const safetyConfig = {
  enableSafetyStandards: process.env.ENABLE_SAFETY_STANDARDS === 'true',
  enableRiskManagement: process.env.ENABLE_RISK_MANAGEMENT === 'true',
  enableIncidentReporting: process.env.ENABLE_INCIDENT_REPORTING === 'true',
  enableTrainingManagement: process.env.ENABLE_TRAINING_MANAGEMENT === 'true',
  enableComplianceChecking: process.env.ENABLE_COMPLIANCE_CHECKING === 'true',
  incidentReportingRequired: process.env.INCIDENT_REPORTING_REQUIRED === 'true',
  riskAssessmentFrequency: process.env.RISK_ASSESSMENT_FREQUENCY || 'monthly',
  trainingExpiryReminderDays: parseInt(process.env.TRAINING_EXPIRY_REMINDER_DAYS || '30'),
  maxIncidentsPerProject: parseInt(process.env.MAX_INCIDENTS_PER_PROJECT || '1000'),
  safetyAlertThresholds: {
    critical: parseInt(process.env.CRITICAL_ALERT_THRESHOLD || '5'),
    high: parseInt(process.env.HIGH_ALERT_THRESHOLD || '10'),
    medium: parseInt(process.env.MEDIUM_ALERT_THRESHOLD || '20')
  }
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 安全標準管理
- [ ] 風險管理功能
- [ ] 事故管理系統
- [ ] 培訓管理功能
- [ ] 合規檢查系統
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成