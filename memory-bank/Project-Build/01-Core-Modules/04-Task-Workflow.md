# 4️⃣ 任務工作流模組

## 📋 模組概述

任務工作流模組提供專案任務的完整管理功能，包括任務創建、分配、狀態追蹤、工作流管理、進度監控等功能。此模組是 Project-Build 系統的協作核心組件。

### 🎯 功能目標
- 提供完整的任務生命週期管理
- 實現靈活的工作流配置
- 支持多種任務視圖和看板
- 提供任務依賴和關聯管理
- 整合 BIM 模型和成本管理

## 🏗️ 功能架構

### 核心功能
```
任務工作流模組
├── 任務管理
│   ├── 任務創建和編輯
│   ├── 任務分配和委派
│   ├── 任務狀態追蹤
│   └── 任務優先級管理
├── 工作流管理
│   ├── 工作流定義
│   ├── 狀態轉換規則
│   ├── 審批流程
│   └── 自動化規則
├── 任務視圖
│   ├── 看板視圖
│   ├── 列表視圖
│   ├── 甘特圖視圖
│   └── 日曆視圖
├── 任務關聯
│   ├── 任務依賴關係
│   ├── 子任務管理
│   ├── 相關任務
│   └── 任務鏈接
└── 進度監控
    ├── 任務進度追蹤
    ├── 里程碑管理
    ├── 時間追蹤
    └── 績效分析
```

## 📊 數據結構設計

### 任務實體 (Task)
```typescript
interface Task {
  id: string;                    // 任務唯一標識
  projectId: string;             // 所屬專案 ID
  title: string;                 // 任務標題
  description?: string;          // 任務描述
  type: TaskType;               // 任務類型
  status: TaskStatus;           // 任務狀態
  priority: Priority;           // 優先級
  assignee: string;             // 負責人 ID
  reporter: string;             // 報告人 ID
  workflow: WorkflowInstance;   // 工作流實例
  dueDate?: Date;               // 截止日期
  startDate?: Date;             // 開始日期
  completedDate?: Date;         // 完成日期
  estimatedHours?: number;      // 預估工時
  actualHours?: number;         // 實際工時
  progress: number;             // 進度百分比
  tags: string[];              // 標籤
  attachments: Attachment[];    // 附件
  comments: Comment[];          // 評論
  dependencies: TaskDependency[]; // 依賴關係
  subtasks: string[];           // 子任務 ID
  parentTaskId?: string;        // 父任務 ID
  relatedTasks: string[];      // 相關任務
  relatedModels: string[];     // 關聯模型
  relatedCostItems: string[];  // 關聯成本項目
  customFields: Record<string, any>; // 自定義欄位
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum TaskType {
  FEATURE = 'feature',           // 功能
  BUG = 'bug',                  // 缺陷
  STORY = 'story',              // 故事
  EPIC = 'epic',                // 史詩
  SUBTASK = 'subtask',          // 子任務
  MILESTONE = 'milestone'       // 里程碑
}

enum TaskStatus {
  TODO = 'todo',                // 待辦
  IN_PROGRESS = 'in_progress',  // 進行中
  REVIEW = 'review',            // 審查中
  TESTING = 'testing',          // 測試中
  DONE = 'done',                // 已完成
  CANCELLED = 'cancelled'       // 已取消
}

enum Priority {
  LOWEST = 'lowest',            // 最低
  LOW = 'low',                  // 低
  MEDIUM = 'medium',            // 中
  HIGH = 'high',                // 高
  HIGHEST = 'highest'           // 最高
}
```

### 工作流實體 (Workflow)
```typescript
interface Workflow {
  id: string;                    // 工作流唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 工作流名稱
  description?: string;          // 工作流描述
  type: WorkflowType;           // 工作流類型
  status: WorkflowStatus;       // 工作流狀態
  states: WorkflowState[];       // 工作流狀態
  transitions: WorkflowTransition[]; // 狀態轉換
  rules: WorkflowRule[];         // 工作流規則
  permissions: WorkflowPermission[]; // 權限設置
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum WorkflowType {
  SIMPLE = 'simple',             // 簡單工作流
  APPROVAL = 'approval',         // 審批工作流
  COMPLEX = 'complex'            // 複雜工作流
}

enum WorkflowStatus {
  DRAFT = 'draft',               // 草稿
  ACTIVE = 'active',             // 啟用
  INACTIVE = 'inactive',         // 停用
  ARCHIVED = 'archived'          // 已歸檔
}

interface WorkflowState {
  id: string;                    // 狀態 ID
  name: string;                  // 狀態名稱
  description?: string;          // 狀態描述
  type: StateType;              // 狀態類型
  color: string;                 // 狀態顏色
  position: number;              // 位置順序
  isInitial: boolean;            // 是否為初始狀態
  isFinal: boolean;              // 是否為最終狀態
  permissions: StatePermission[]; // 狀態權限
}

enum StateType {
  TODO = 'todo',                 // 待辦
  IN_PROGRESS = 'in_progress',   // 進行中
  REVIEW = 'review',             // 審查
  APPROVAL = 'approval',         // 審批
  COMPLETED = 'completed'        // 已完成
}

interface WorkflowTransition {
  id: string;                    // 轉換 ID
  name: string;                  // 轉換名稱
  fromStateId: string;           // 源狀態 ID
  toStateId: string;             // 目標狀態 ID
  conditions: TransitionCondition[]; // 轉換條件
  actions: TransitionAction[];    // 轉換動作
  permissions: TransitionPermission[]; // 轉換權限
}

interface TransitionCondition {
  type: ConditionType;          // 條件類型
  field: string;                // 欄位名稱
  operator: Operator;           // 操作符
  value: any;                   // 條件值
}

enum ConditionType {
  FIELD_VALUE = 'field_value',   // 欄位值
  USER_ROLE = 'user_role',       // 用戶角色
  TIME_CONDITION = 'time_condition', // 時間條件
  CUSTOM = 'custom'              // 自定義條件
}

enum Operator {
  EQUALS = 'equals',             // 等於
  NOT_EQUALS = 'not_equals',     // 不等於
  GREATER_THAN = 'greater_than', // 大於
  LESS_THAN = 'less_than',       // 小於
  CONTAINS = 'contains',         // 包含
  NOT_CONTAINS = 'not_contains' // 不包含
}

interface TransitionAction {
  type: ActionType;             // 動作類型
  config: Record<string, any>;   // 動作配置
}

enum ActionType {
  ASSIGN_USER = 'assign_user',   // 分配用戶
  SEND_NOTIFICATION = 'send_notification', // 發送通知
  UPDATE_FIELD = 'update_field', // 更新欄位
  CREATE_SUBTASK = 'create_subtask', // 創建子任務
  TRIGGER_WEBHOOK = 'trigger_webhook' // 觸發 Webhook
}
```

### 工作流實例 (WorkflowInstance)
```typescript
interface WorkflowInstance {
  id: string;                    // 實例唯一標識
  workflowId: string;            // 工作流 ID
  taskId: string;                // 任務 ID
  currentStateId: string;        // 當前狀態 ID
  history: WorkflowHistory[];    // 歷史記錄
  variables: Record<string, any>; // 變數
  status: InstanceStatus;       // 實例狀態
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum InstanceStatus {
  RUNNING = 'running',           // 運行中
  COMPLETED = 'completed',       // 已完成
  SUSPENDED = 'suspended',       // 暫停
  TERMINATED = 'terminated'      // 終止
}

interface WorkflowHistory {
  id: string;                    // 歷史記錄 ID
  fromStateId?: string;          // 源狀態 ID
  toStateId: string;            // 目標狀態 ID
  transitionId?: string;        // 轉換 ID
  userId: string;               // 操作用戶 ID
  comment?: string;             // 備註
  timestamp: Date;              // 時間戳
  variables?: Record<string, any>; // 變數快照
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 任務管理主組件
@Component({
  selector: 'app-task-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>任務管理</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createTask()">
              <i nz-icon nzType="plus"></i>
              創建任務
            </button>
            <button nz-button (click)="configureWorkflow()">
              <i nz-icon nzType="setting"></i>
              工作流設置
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="看板視圖">
            <app-task-kanban></app-task-kanban>
          </nz-tab>
          <nz-tab nzTitle="列表視圖">
            <app-task-list></app-task-list>
          </nz-tab>
          <nz-tab nzTitle="甘特圖">
            <app-task-gantt></app-task-gantt>
          </nz-tab>
          <nz-tab nzTitle="日曆視圖">
            <app-task-calendar></app-task-calendar>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class TaskManagementComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.taskService.loadProjectTasks();
  }
  
  createTask() {
    this.modal.create({
      nzTitle: '創建任務',
      nzContent: AppCreateTaskModalComponent,
      nzFooter: null,
      nzWidth: 800
    });
  }
  
  configureWorkflow() {
    this.modal.create({
      nzTitle: '工作流設置',
      nzContent: AppWorkflowConfigModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
}

// 任務看板組件
@Component({
  selector: 'app-task-kanban',
  template: `
    <div class="kanban-board">
      <div class="kanban-columns">
        <div 
          *ngFor="let state of workflowStates$ | async" 
          class="kanban-column"
          [class]="'column-' + state.type">
          
          <div class="column-header">
            <h3>{{ state.name }}</h3>
            <span class="task-count">{{ getTaskCount(state.id) }}</span>
          </div>
          
          <div 
            class="column-content"
            cdkDropList
            [cdkDropListData]="getTasksByState(state.id)"
            (cdkDropListDropped)="onTaskDrop($event, state.id)">
            
            <div 
              *ngFor="let task of getTasksByState(state.id)" 
              class="task-card"
              cdkDrag
              [cdkDragData]="task"
              (click)="viewTask(task)">
              
              <div class="task-header">
                <span class="task-type">{{ task.type | taskTypeLabel }}</span>
                <span class="task-priority" [class]="'priority-' + task.priority">
                  {{ task.priority | priorityLabel }}
                </span>
              </div>
              
              <div class="task-title">{{ task.title }}</div>
              
              <div class="task-meta">
                <div class="task-assignee">
                  <nz-avatar [nzSrc]="getAssigneeAvatar(task.assignee)" [nzSize]="20"></nz-avatar>
                  <span>{{ getAssigneeName(task.assignee) }}</span>
                </div>
                
                <div class="task-progress" *ngIf="task.progress > 0">
                  <nz-progress 
                    [nzPercent]="task.progress" 
                    [nzSize]="'small'"
                    [nzShowInfo]="false">
                  </nz-progress>
                </div>
                
                <div class="task-due-date" *ngIf="task.dueDate">
                  <i nz-icon nzType="calendar"></i>
                  <span>{{ task.dueDate | date:'MM/dd' }}</span>
                </div>
              </div>
              
              <div class="task-tags" *ngIf="task.tags.length > 0">
                <nz-tag 
                  *ngFor="let tag of task.tags" 
                  [nzColor]="getTagColor(tag)"
                  nzSize="small">
                  {{ tag }}
                </nz-tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kanban-board {
      height: calc(100vh - 200px);
      overflow-x: auto;
      padding: 16px;
    }
    
    .kanban-columns {
      display: flex;
      gap: 16px;
      min-width: max-content;
    }
    
    .kanban-column {
      width: 300px;
      background: #f5f5f5;
      border-radius: 8px;
      padding: 16px;
      min-height: 500px;
    }
    
    .column-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #d9d9d9;
    }
    
    .column-header h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 500;
    }
    
    .task-count {
      background: #1890ff;
      color: white;
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 12px;
    }
    
    .column-content {
      min-height: 400px;
    }
    
    .task-card {
      background: white;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .task-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }
    
    .task-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .task-type {
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
    
    .task-priority {
      font-size: 12px;
      padding: 2px 6px;
      border-radius: 4px;
    }
    
    .priority-highest { background: #ff4d4f; color: white; }
    .priority-high { background: #ff7a45; color: white; }
    .priority-medium { background: #faad14; color: white; }
    .priority-low { background: #52c41a; color: white; }
    .priority-lowest { background: #d9d9d9; color: #666; }
    
    .task-title {
      font-weight: 500;
      margin-bottom: 8px;
      line-height: 1.4;
    }
    
    .task-meta {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .task-assignee {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: #666;
    }
    
    .task-due-date {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      color: #666;
    }
    
    .task-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  `]
})
export class TaskKanbanComponent implements OnInit {
  tasks$ = this.taskService.tasks$;
  workflowStates$ = this.taskService.workflowStates$;
  
  constructor(
    private taskService: TaskService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.taskService.loadWorkflowStates();
  }
  
  getTasksByState(stateId: string): Task[] {
    return this.taskService.getTasksByState(stateId);
  }
  
  getTaskCount(stateId: string): number {
    return this.getTasksByState(stateId).length;
  }
  
  onTaskDrop(event: CdkDragDrop<Task[]>, targetStateId: string) {
    const task = event.item.data;
    const currentStateId = task.workflow.currentStateId;
    
    if (currentStateId !== targetStateId) {
      this.taskService.transitionTask(task.id, targetStateId).subscribe({
        next: () => {
          // 更新本地狀態
          this.taskService.updateTaskState(task.id, targetStateId);
        },
        error: (error) => {
          console.error('Failed to transition task:', error);
        }
      });
    }
  }
  
  viewTask(task: Task) {
    this.modal.create({
      nzTitle: '任務詳情',
      nzContent: AppTaskDetailModalComponent,
      nzComponentParams: { task },
      nzFooter: null,
      nzWidth: 1000
    });
  }
  
  getAssigneeAvatar(assigneeId: string): string {
    // 獲取負責人頭像
    return '';
  }
  
  getAssigneeName(assigneeId: string): string {
    // 獲取負責人姓名
    return '';
  }
  
  getTagColor(tag: string): string {
    const colors = ['blue', 'green', 'orange', 'purple', 'cyan'];
    return colors[tag.length % colors.length];
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = '/api/projects';
  
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private workflowStatesSubject = new BehaviorSubject<WorkflowState[]>([]);
  private workflowsSubject = new BehaviorSubject<Workflow[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  tasks$ = this.tasksSubject.asObservable();
  workflowStates$ = this.workflowStatesSubject.asObservable();
  workflows$ = this.workflowsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建任務
  createTask(taskData: CreateTaskRequest): Observable<Task> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Task>(`${this.apiUrl}/${projectId}/tasks`, taskData).pipe(
      tap(task => {
        const currentTasks = this.tasksSubject.value;
        this.tasksSubject.next([...currentTasks, task]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入任務
  loadProjectTasks(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Task[]>(`${this.apiUrl}/${projectId}/tasks`)
      .pipe(
        tap(tasks => this.tasksSubject.next(tasks)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 載入工作流狀態
  loadWorkflowStates(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<WorkflowState[]>(`${this.apiUrl}/${projectId}/workflow-states`)
      .pipe(
        tap(states => this.workflowStatesSubject.next(states)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 任務狀態轉換
  transitionTask(taskId: string, targetStateId: string, comment?: string): Observable<Task> {
    return this.http.post<Task>(`/api/tasks/${taskId}/transition`, {
      targetStateId,
      comment
    }).pipe(
      tap(updatedTask => {
        const tasks = this.tasksSubject.value;
        const index = tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
          tasks[index] = updatedTask;
          this.tasksSubject.next([...tasks]);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 更新任務狀態（本地）
  updateTaskState(taskId: string, stateId: string): void {
    const tasks = this.tasksSubject.value;
    const index = tasks.findIndex(t => t.id === taskId);
    if (index !== -1) {
      tasks[index].workflow.currentStateId = stateId;
      this.tasksSubject.next([...tasks]);
    }
  }
  
  // 獲取任務統計
  getTaskStats(): Observable<TaskStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<TaskStats>(`${this.apiUrl}/${projectId}/task-stats`);
  }
  
  // 創建工作流
  createWorkflow(workflowData: CreateWorkflowRequest): Observable<Workflow> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Workflow>(`${this.apiUrl}/${projectId}/workflows`, workflowData).pipe(
      tap(workflow => {
        const currentWorkflows = this.workflowsSubject.value;
        this.workflowsSubject.next([...currentWorkflows, workflow]);
      }),
      catchError(this.handleError)
    );
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Task service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 任務管理權限
```typescript
enum TaskManagementPermission {
  VIEW_TASKS = 'view_tasks',
  CREATE_TASKS = 'create_tasks',
  EDIT_TASKS = 'edit_tasks',
  DELETE_TASKS = 'delete_tasks',
  ASSIGN_TASKS = 'assign_tasks',
  TRANSITION_TASKS = 'transition_tasks',
  MANAGE_WORKFLOWS = 'manage_workflows',
  VIEW_TASK_STATS = 'view_task_stats',
  EXPORT_TASK_DATA = 'export_task_data'
}

// 角色權限映射
const TASK_PERMISSIONS: Record<ProjectRole, TaskManagementPermission[]> = {
  [ProjectRole.OWNER]: [
    TaskManagementPermission.VIEW_TASKS,
    TaskManagementPermission.CREATE_TASKS,
    TaskManagementPermission.EDIT_TASKS,
    TaskManagementPermission.DELETE_TASKS,
    TaskManagementPermission.ASSIGN_TASKS,
    TaskManagementPermission.TRANSITION_TASKS,
    TaskManagementPermission.MANAGE_WORKFLOWS,
    TaskManagementPermission.VIEW_TASK_STATS,
    TaskManagementPermission.EXPORT_TASK_DATA
  ],
  [ProjectRole.ADMIN]: [
    TaskManagementPermission.VIEW_TASKS,
    TaskManagementPermission.CREATE_TASKS,
    TaskManagementPermission.EDIT_TASKS,
    TaskManagementPermission.ASSIGN_TASKS,
    TaskManagementPermission.TRANSITION_TASKS,
    TaskManagementPermission.MANAGE_WORKFLOWS,
    TaskManagementPermission.VIEW_TASK_STATS,
    TaskManagementPermission.EXPORT_TASK_DATA
  ],
  [ProjectRole.MANAGER]: [
    TaskManagementPermission.VIEW_TASKS,
    TaskManagementPermission.CREATE_TASKS,
    TaskManagementPermission.EDIT_TASKS,
    TaskManagementPermission.ASSIGN_TASKS,
    TaskManagementPermission.TRANSITION_TASKS,
    TaskManagementPermission.VIEW_TASK_STATS
  ],
  [ProjectRole.ENGINEER]: [
    TaskManagementPermission.VIEW_TASKS,
    TaskManagementPermission.CREATE_TASKS,
    TaskManagementPermission.EDIT_TASKS,
    TaskManagementPermission.TRANSITION_TASKS
  ],
  [ProjectRole.CONTRACTOR]: [
    TaskManagementPermission.VIEW_TASKS,
    TaskManagementPermission.EDIT_TASKS,
    TaskManagementPermission.TRANSITION_TASKS
  ],
  [ProjectRole.VIEWER]: [
    TaskManagementPermission.VIEW_TASKS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    TaskManagementPermission.VIEW_TASKS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface TaskManagementApi {
  // 任務管理
  POST /api/projects/{projectId}/tasks         // 創建任務
  GET /api/projects/{projectId}/tasks         // 獲取任務列表
  GET /api/tasks/{taskId}                     // 獲取任務詳情
  PATCH /api/tasks/{taskId}                   // 更新任務
  DELETE /api/tasks/{taskId}                  // 刪除任務
  
  // 任務狀態轉換
  POST /api/tasks/{taskId}/transition         // 任務狀態轉換
  GET /api/tasks/{taskId}/history             // 獲取任務歷史
  
  // 工作流管理
  POST /api/projects/{projectId}/workflows    // 創建工作流
  GET /api/projects/{projectId}/workflows     // 獲取工作流列表
  GET /api/workflows/{workflowId}             // 獲取工作流詳情
  PATCH /api/workflows/{workflowId}           // 更新工作流
  
  // 任務統計
  GET /api/projects/{projectId}/task-stats    // 獲取任務統計
  GET /api/projects/{projectId}/task-trends   // 獲取任務趨勢
}

// 請求/響應類型
interface CreateTaskRequest {
  title: string;
  description?: string;
  type: TaskType;
  priority: Priority;
  assignee: string;
  dueDate?: Date;
  estimatedHours?: number;
  tags: string[];
  parentTaskId?: string;
  relatedTasks: string[];
  customFields: Record<string, any>;
}

interface CreateWorkflowRequest {
  name: string;
  description?: string;
  type: WorkflowType;
  states: WorkflowState[];
  transitions: WorkflowTransition[];
  rules: WorkflowRule[];
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const taskConfig = {
  maxTasksPerProject: parseInt(process.env.MAX_TASKS_PER_PROJECT || '10000'),
  maxSubtasksPerTask: parseInt(process.env.MAX_SUBTASKS_PER_TASK || '100'),
  enableTimeTracking: process.env.ENABLE_TIME_TRACKING === 'true',
  enableWorkflowAutomation: process.env.ENABLE_WORKFLOW_AUTOMATION === 'true',
  defaultWorkflowType: process.env.DEFAULT_WORKFLOW_TYPE || 'simple',
  taskTypes: process.env.TASK_TYPES?.split(',') || ['feature', 'bug', 'story', 'epic'],
  priorities: process.env.TASK_PRIORITIES?.split(',') || ['lowest', 'low', 'medium', 'high', 'highest']
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 任務管理功能
- [ ] 工作流引擎
- [ ] 看板視圖實現
- [ ] 甘特圖集成
- [ ] 任務依賴管理
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成