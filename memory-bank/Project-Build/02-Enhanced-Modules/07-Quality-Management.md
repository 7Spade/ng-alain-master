# 7️⃣ 品質管理模組

## 📋 模組概述

品質管理模組提供專案品質的全面監控功能，包括品質標準、檢查清單、審查流程、缺陷管理、合規性檢查等功能。此模組是 Project-Build 系統的品質保證核心組件。

### 🎯 功能目標
- 建立品質標準和檢查清單
- 實現品質審查和檢查流程
- 提供缺陷追蹤和管理
- 支持合規性檢查和認證
- 整合所有模組的品質數據

## 🏗️ 功能架構

### 核心功能
```
品質管理模組
├── 品質標準
│   ├── 標準定義
│   ├── 檢查清單
│   ├── 評分標準
│   └── 合規要求
├── 品質檢查
│   ├── 檢查計劃
│   ├── 檢查執行
│   ├── 檢查記錄
│   └── 檢查報告
├── 缺陷管理
│   ├── 缺陷追蹤
│   ├── 缺陷分類
│   ├── 修復流程
│   └── 驗證確認
├── 審查流程
│   ├── 審查計劃
│   ├── 審查執行
│   ├── 審查記錄
│   └── 審查結果
└── 合規管理
    ├── 合規檢查
    ├── 認證管理
    ├── 合規報告
    └── 風險評估
```

## 📊 數據結構設計

### 品質標準實體 (QualityStandard)
```typescript
interface QualityStandard {
  id: string;                    // 標準唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 標準名稱
  description: string;            // 標準描述
  category: QualityCategory;     // 品質分類
  type: QualityType;            // 標準類型
  version: string;              // 版本號
  status: QualityStatus;        // 狀態
  criteria: QualityCriteria[];  // 評判標準
  checklist: QualityChecklist[]; // 檢查清單
  compliance: ComplianceRequirement[]; // 合規要求
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum QualityCategory {
  BIM_MODEL = 'bim_model',       // BIM 模型
  DOCUMENT = 'document',         // 文檔
  DESIGN = 'design',             // 設計
  CONSTRUCTION = 'construction',  // 施工
  SAFETY = 'safety',            // 安全
  ENVIRONMENTAL = 'environmental' // 環境
}

enum QualityType {
  STANDARD = 'standard',         // 標準
  GUIDELINE = 'guideline',       // 指導原則
  PROCEDURE = 'procedure',       // 程序
  SPECIFICATION = 'specification' // 規範
}

enum QualityStatus {
  DRAFT = 'draft',               // 草稿
  REVIEW = 'review',             // 審查中
  APPROVED = 'approved',         // 已審批
  ACTIVE = 'active',            // 生效中
  DEPRECATED = 'deprecated'      // 已廢棄
}

interface QualityCriteria {
  id: string;                    // 標準唯一標識
  name: string;                  // 標準名稱
  description: string;            // 標準描述
  weight: number;                // 權重
  score: number;                 // 分數
  maxScore: number;             // 最高分
  unit: string;                  // 單位
  measurement: MeasurementType;  // 測量方式
}

enum MeasurementType {
  QUANTITATIVE = 'quantitative', // 定量
  QUALITATIVE = 'qualitative',   // 定性
  BINARY = 'binary',            // 二元
  SCALE = 'scale'               // 量表
}

interface QualityChecklist {
  id: string;                    // 檢查項唯一標識
  name: string;                  // 檢查項名稱
  description: string;            // 檢查項描述
  category: QualityCategory;     // 分類
  priority: Priority;           // 優先級
  required: boolean;            // 是否必需
  criteria: QualityCriteria[];  // 評判標準
  instructions: string;         // 檢查說明
  attachments: Attachment[];    // 附件
}

interface ComplianceRequirement {
  id: string;                    // 合規要求唯一標識
  name: string;                  // 要求名稱
  description: string;            // 要求描述
  regulation: string;           // 法規名稱
  version: string;              // 法規版本
  effectiveDate: Date;          // 生效日期
  expiryDate?: Date;            // 失效日期
  mandatory: boolean;           // 是否強制
  penalties: string[];         // 違規處罰
  references: string[];         // 參考文檔
}
```

### 品質檢查實體 (QualityInspection)
```typescript
interface QualityInspection {
  id: string;                    // 檢查唯一標識
  projectId: string;             // 所屬專案 ID
  standardId: string;            // 標準 ID
  name: string;                  // 檢查名稱
  description: string;            // 檢查描述
  type: InspectionType;         // 檢查類型
  status: InspectionStatus;     // 檢查狀態
  priority: Priority;           // 優先級
  plannedDate: Date;            // 計劃日期
  actualDate?: Date;            // 實際日期
  inspectorId: string;          // 檢查員 ID
  location: string;             // 檢查地點
  scope: string;                // 檢查範圍
  checklist: InspectionChecklist[]; // 檢查清單
  findings: InspectionFinding[]; // 檢查發現
  score: number;                // 總分
  maxScore: number;            // 最高分
  grade: QualityGrade;         // 品質等級
  recommendations: string[];   // 建議
  attachments: Attachment[];    // 附件
  createdAt: Date;             // 創建時間
  updatedAt: Date;             // 更新時間
  createdBy: string;           // 創建者 ID
}

enum InspectionType {
  INITIAL = 'initial',          // 初始檢查
  ROUTINE = 'routine',          // 例行檢查
  SPECIAL = 'special',          // 特殊檢查
  FINAL = 'final',              // 最終檢查
  AUDIT = 'audit'               // 審計檢查
}

enum InspectionStatus {
  PLANNED = 'planned',          // 已計劃
  IN_PROGRESS = 'in_progress',  // 進行中
  COMPLETED = 'completed',      // 已完成
  CANCELLED = 'cancelled',      // 已取消
  DEFERRED = 'deferred'          // 已延期
}

enum QualityGrade {
  EXCELLENT = 'excellent',       // 優秀 (90-100)
  GOOD = 'good',                // 良好 (80-89)
  ACCEPTABLE = 'acceptable',     // 可接受 (70-79)
  POOR = 'poor',                // 差 (60-69)
  UNACCEPTABLE = 'unacceptable'  // 不可接受 (<60)
}

interface InspectionChecklist {
  id: string;                    // 檢查項唯一標識
  checklistId: string;           // 檢查清單 ID
  name: string;                  // 檢查項名稱
  description: string;            // 檢查項描述
  required: boolean;            // 是否必需
  status: ChecklistItemStatus;  // 檢查狀態
  score: number;                // 得分
  maxScore: number;             // 最高分
  comments: string;             // 備註
  evidence: Attachment[];       // 證據
  checkedBy: string;            // 檢查者 ID
  checkedAt: Date;              // 檢查時間
}

enum ChecklistItemStatus {
  NOT_CHECKED = 'not_checked',   // 未檢查
  PASSED = 'passed',            // 通過
  FAILED = 'failed',            // 失敗
  NOT_APPLICABLE = 'not_applicable' // 不適用
}

interface InspectionFinding {
  id: string;                    // 發現唯一標識
  inspectionId: string;          // 檢查 ID
  type: FindingType;            // 發現類型
  severity: FindingSeverity;    // 嚴重程度
  category: QualityCategory;     // 分類
  title: string;                 // 標題
  description: string;           // 描述
  location: string;             // 位置
  evidence: Attachment[];       // 證據
  recommendations: string[];   // 建議
  correctiveActions: string[];  // 糾正措施
  status: FindingStatus;       // 狀態
  assignedTo?: string;          // 負責人 ID
  dueDate?: Date;               // 截止日期
  resolvedDate?: Date;          // 解決日期
  createdAt: Date;             // 創建時間
  updatedAt: Date;             // 更新時間
}

enum FindingType {
  NON_CONFORMITY = 'non_conformity', // 不符合項
  OBSERVATION = 'observation',       // 觀察項
  OPPORTUNITY = 'opportunity',       // 改進機會
  COMPLIANCE = 'compliance'          // 合規問題
}

enum FindingSeverity {
  CRITICAL = 'critical',        // 嚴重
  MAJOR = 'major',              // 主要
  MINOR = 'minor',              // 次要
  OBSERVATION = 'observation'    // 觀察
}

enum FindingStatus {
  OPEN = 'open',                // 開放
  IN_PROGRESS = 'in_progress',  // 進行中
  RESOLVED = 'resolved',        // 已解決
  CLOSED = 'closed',            // 已關閉
  REJECTED = 'rejected'         // 已拒絕
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 品質管理主組件
@Component({
  selector: 'app-quality-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>品質管理</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createStandard()">
              <i nz-icon nzType="plus"></i>
              創建標準
            </button>
            <button nz-button (click)="createInspection()">
              <i nz-icon nzType="search"></i>
              創建檢查
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="品質標準">
            <app-quality-standards></app-quality-standards>
          </nz-tab>
          <nz-tab nzTitle="品質檢查">
            <app-quality-inspections></app-quality-inspections>
          </nz-tab>
          <nz-tab nzTitle="缺陷管理">
            <app-defect-management></app-defect-management>
          </nz-tab>
          <nz-tab nzTitle="審查流程">
            <app-review-process></app-review-process>
          </nz-tab>
          <nz-tab nzTitle="合規管理">
            <app-compliance-management></app-compliance-management>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class QualityManagementComponent implements OnInit {
  constructor(
    private qualityService: QualityService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.qualityService.loadQualityStandards();
  }
  
  createStandard() {
    this.modal.create({
      nzTitle: '創建品質標準',
      nzContent: AppCreateQualityStandardModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  createInspection() {
    this.modal.create({
      nzTitle: '創建品質檢查',
      nzContent: AppCreateInspectionModalComponent,
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
export class QualityService {
  private readonly apiUrl = '/api/projects';
  
  private standardsSubject = new BehaviorSubject<QualityStandard[]>([]);
  private inspectionsSubject = new BehaviorSubject<QualityInspection[]>([]);
  private findingsSubject = new BehaviorSubject<InspectionFinding[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  standards$ = this.standardsSubject.asObservable();
  inspections$ = this.inspectionsSubject.asObservable();
  findings$ = this.findingsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建品質標準
  createStandard(standardData: CreateQualityStandardRequest): Observable<QualityStandard> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<QualityStandard>(`${this.apiUrl}/${projectId}/quality-standards`, standardData).pipe(
      tap(standard => {
        const currentStandards = this.standardsSubject.value;
        this.standardsSubject.next([...currentStandards, standard]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入品質標準
  loadQualityStandards(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<QualityStandard[]>(`${this.apiUrl}/${projectId}/quality-standards`)
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
  
  // 創建品質檢查
  createInspection(inspectionData: CreateInspectionRequest): Observable<QualityInspection> {
    return this.http.post<QualityInspection>('/api/quality-inspections', inspectionData).pipe(
      tap(inspection => {
        const currentInspections = this.inspectionsSubject.value;
        this.inspectionsSubject.next([...currentInspections, inspection]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入品質檢查
  loadQualityInspections(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<QualityInspection[]>(`${this.apiUrl}/${projectId}/quality-inspections`)
      .pipe(
        tap(inspections => this.inspectionsSubject.next(inspections)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 創建檢查發現
  createFinding(findingData: CreateFindingRequest): Observable<InspectionFinding> {
    return this.http.post<InspectionFinding>('/api/inspection-findings', findingData).pipe(
      tap(finding => {
        const currentFindings = this.findingsSubject.value;
        this.findingsSubject.next([...currentFindings, finding]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 更新檢查發現
  updateFinding(findingId: string, updates: Partial<InspectionFinding>): Observable<InspectionFinding> {
    return this.http.patch<InspectionFinding>(`/api/inspection-findings/${findingId}`, updates).pipe(
      tap(updatedFinding => {
        const findings = this.findingsSubject.value;
        const index = findings.findIndex(f => f.id === findingId);
        if (index !== -1) {
          findings[index] = updatedFinding;
          this.findingsSubject.next([...findings]);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 獲取品質統計
  getQualityStats(): Observable<QualityStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<QualityStats>(`${this.apiUrl}/${projectId}/quality-stats`);
  }
  
  // 獲取合規報告
  getComplianceReport(): Observable<ComplianceReport> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<ComplianceReport>(`${this.apiUrl}/${projectId}/compliance-report`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Quality service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 品質管理權限
```typescript
enum QualityManagementPermission {
  VIEW_STANDARDS = 'view_standards',
  MANAGE_STANDARDS = 'manage_standards',
  VIEW_INSPECTIONS = 'view_inspections',
  MANAGE_INSPECTIONS = 'manage_inspections',
  VIEW_FINDINGS = 'view_findings',
  MANAGE_FINDINGS = 'manage_findings',
  VIEW_COMPLIANCE = 'view_compliance',
  MANAGE_COMPLIANCE = 'manage_compliance',
  GENERATE_REPORTS = 'generate_reports',
  APPROVE_STANDARDS = 'approve_standards'
}

// 角色權限映射
const QUALITY_PERMISSIONS: Record<ProjectRole, QualityManagementPermission[]> = {
  [ProjectRole.OWNER]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.MANAGE_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS,
    QualityManagementPermission.MANAGE_INSPECTIONS,
    QualityManagementPermission.VIEW_FINDINGS,
    QualityManagementPermission.MANAGE_FINDINGS,
    QualityManagementPermission.VIEW_COMPLIANCE,
    QualityManagementPermission.MANAGE_COMPLIANCE,
    QualityManagementPermission.GENERATE_REPORTS,
    QualityManagementPermission.APPROVE_STANDARDS
  ],
  [ProjectRole.ADMIN]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.MANAGE_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS,
    QualityManagementPermission.MANAGE_INSPECTIONS,
    QualityManagementPermission.VIEW_FINDINGS,
    QualityManagementPermission.MANAGE_FINDINGS,
    QualityManagementPermission.VIEW_COMPLIANCE,
    QualityManagementPermission.MANAGE_COMPLIANCE,
    QualityManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.MANAGER]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS,
    QualityManagementPermission.MANAGE_INSPECTIONS,
    QualityManagementPermission.VIEW_FINDINGS,
    QualityManagementPermission.MANAGE_FINDINGS,
    QualityManagementPermission.VIEW_COMPLIANCE,
    QualityManagementPermission.GENERATE_REPORTS
  ],
  [ProjectRole.ENGINEER]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS,
    QualityManagementPermission.MANAGE_INSPECTIONS,
    QualityManagementPermission.VIEW_FINDINGS,
    QualityManagementPermission.MANAGE_FINDINGS,
    QualityManagementPermission.VIEW_COMPLIANCE
  ],
  [ProjectRole.CONTRACTOR]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS,
    QualityManagementPermission.VIEW_FINDINGS,
    QualityManagementPermission.VIEW_COMPLIANCE
  ],
  [ProjectRole.VIEWER]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS,
    QualityManagementPermission.VIEW_FINDINGS,
    QualityManagementPermission.VIEW_COMPLIANCE
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    QualityManagementPermission.VIEW_STANDARDS,
    QualityManagementPermission.VIEW_INSPECTIONS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface QualityManagementApi {
  // 品質標準管理
  POST /api/projects/{projectId}/quality-standards    // 創建品質標準
  GET /api/projects/{projectId}/quality-standards     // 獲取品質標準列表
  GET /api/quality-standards/{standardId}              // 獲取品質標準詳情
  PATCH /api/quality-standards/{standardId}            // 更新品質標準
  DELETE /api/quality-standards/{standardId}           // 刪除品質標準
  
  // 品質檢查管理
  POST /api/quality-inspections                       // 創建品質檢查
  GET /api/projects/{projectId}/quality-inspections   // 獲取品質檢查列表
  GET /api/quality-inspections/{inspectionId}         // 獲取品質檢查詳情
  PATCH /api/quality-inspections/{inspectionId}        // 更新品質檢查
  DELETE /api/quality-inspections/{inspectionId}       // 刪除品質檢查
  
  // 檢查發現管理
  POST /api/inspection-findings                      // 創建檢查發現
  GET /api/inspection-findings                       // 獲取檢查發現列表
  GET /api/inspection-findings/{findingId}            // 獲取檢查發現詳情
  PATCH /api/inspection-findings/{findingId}         // 更新檢查發現
  DELETE /api/inspection-findings/{findingId}         // 刪除檢查發現
  
  // 合規管理
  GET /api/projects/{projectId}/compliance-report    // 獲取合規報告
  POST /api/projects/{projectId}/compliance-check    // 執行合規檢查
  GET /api/projects/{projectId}/quality-stats        // 獲取品質統計
}

// 請求/響應類型
interface CreateQualityStandardRequest {
  name: string;
  description: string;
  category: QualityCategory;
  type: QualityType;
  criteria: QualityCriteria[];
  checklist: QualityChecklist[];
  compliance: ComplianceRequirement[];
}

interface CreateInspectionRequest {
  projectId: string;
  standardId: string;
  name: string;
  description: string;
  type: InspectionType;
  priority: Priority;
  plannedDate: Date;
  inspectorId: string;
  location: string;
  scope: string;
}

interface CreateFindingRequest {
  inspectionId: string;
  type: FindingType;
  severity: FindingSeverity;
  category: QualityCategory;
  title: string;
  description: string;
  location: string;
  recommendations: string[];
  correctiveActions: string[];
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const qualityConfig = {
  enableQualityStandards: process.env.ENABLE_QUALITY_STANDARDS === 'true',
  enableInspections: process.env.ENABLE_INSPECTIONS === 'true',
  enableCompliance: process.env.ENABLE_COMPLIANCE === 'true',
  maxFindingsPerInspection: parseInt(process.env.MAX_FINDINGS_PER_INSPECTION || '100'),
  inspectionReminderDays: parseInt(process.env.INSPECTION_REMINDER_DAYS || '7'),
  qualityGradeThresholds: {
    excellent: parseInt(process.env.EXCELLENT_THRESHOLD || '90'),
    good: parseInt(process.env.GOOD_THRESHOLD || '80'),
    acceptable: parseInt(process.env.ACCEPTABLE_THRESHOLD || '70'),
    poor: parseInt(process.env.POOR_THRESHOLD || '60')
  }
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 品質標準管理
- [ ] 品質檢查功能
- [ ] 缺陷管理系統
- [ ] 審查流程管理
- [ ] 合規管理功能
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成