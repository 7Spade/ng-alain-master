# ⚙️ 工作流自動化模組

## 📋 概述

工作流自動化模組提供可視化的工作流設計器和執行引擎，支持複雜的業務流程自動化，包括條件分支、並行執行和錯誤處理機制。

### 🎯 模組目標
- 提供可視化工作流設計器
- 實現工作流執行引擎
- 支持條件分支和並行執行
- 提供工作流監控和調度功能

## 🏗️ 功能架構

### 核心功能
```
工作流自動化功能
├── 工作流設計器
│   ├── 可視化流程設計
│   ├── 節點類型管理
│   ├── 連接線管理
│   └── 工作流驗證
├── 工作流執行引擎
│   ├── 工作流解析器
│   ├── 節點執行器
│   ├── 條件判斷器
│   └── 錯誤處理器
├── 觸發器系統
│   ├── 時間觸發器
│   ├── 事件觸發器
│   ├── 手動觸發器
│   └── API 觸發器
└── 監控調度
    ├── 工作流監控
    ├── 執行歷史
    ├── 性能統計
    └── 調度管理
```

## 📊 數據結構

### 核心實體
```typescript
// 工作流定義
export interface Workflow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: WorkflowStatus;
  definition: WorkflowDefinition;
  triggers: WorkflowTrigger[];
  variables: WorkflowVariable[];
  settings: WorkflowSettings;
  statistics: WorkflowStatistics;
  createdAt: Date;
  updatedAt: Date;
}

// 工作流狀態
export enum WorkflowStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

// 工作流定義
export interface WorkflowDefinition {
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  startNode: string;
  endNodes: string[];
  metadata: WorkflowMetadata;
}

// 工作流節點
export interface WorkflowNode {
  id: string;
  type: NodeType;
  name: string;
  description?: string;
  position: { x: number; y: number };
  config: NodeConfig;
  inputs: NodeInput[];
  outputs: NodeOutput[];
}

// 節點類型
export enum NodeType {
  START = 'start',
  END = 'end',
  TASK = 'task',
  CONDITION = 'condition',
  PARALLEL = 'parallel',
  MERGE = 'merge',
  DELAY = 'delay',
  WEBHOOK = 'webhook',
  EMAIL = 'email',
  DATABASE = 'database',
  API = 'api',
  SCRIPT = 'script'
}

// 節點配置
export interface NodeConfig {
  [key: string]: any;
}

// 任務節點配置
export interface TaskNodeConfig extends NodeConfig {
  taskType: TaskType;
  parameters: Record<string, any>;
  timeout: number;
  retries: number;
  onError: ErrorAction;
}

// 任務類型
export enum TaskType {
  SEND_EMAIL = 'send_email',
  CREATE_RECORD = 'create_record',
  UPDATE_RECORD = 'update_record',
  DELETE_RECORD = 'delete_record',
  CALL_API = 'call_api',
  EXECUTE_SCRIPT = 'execute_script',
  SEND_NOTIFICATION = 'send_notification'
}

// 條件節點配置
export interface ConditionNodeConfig extends NodeConfig {
  conditions: Condition[];
  defaultPath: string;
}

// 條件
export interface Condition {
  field: string;
  operator: ConditionOperator;
  value: any;
  logicalOperator?: LogicalOperator;
}

// 條件操作符
export enum ConditionOperator {
  EQUALS = 'equals',
  NOT_EQUALS = 'not_equals',
  GREATER_THAN = 'greater_than',
  LESS_THAN = 'less_than',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains',
  IN = 'in',
  NOT_IN = 'not_in',
  IS_EMPTY = 'is_empty',
  IS_NOT_EMPTY = 'is_not_empty'
}

// 並行節點配置
export interface ParallelNodeConfig extends NodeConfig {
  branches: ParallelBranch[];
  waitForAll: boolean;
}

// 並行分支
export interface ParallelBranch {
  id: string;
  name: string;
  nodes: string[];
}

// 延遲節點配置
export interface DelayNodeConfig extends NodeConfig {
  delayType: DelayType;
  duration: number;
  unit: TimeUnit;
}

// 延遲類型
export enum DelayType {
  FIXED = 'fixed',
  RANDOM = 'random',
  CONDITIONAL = 'conditional'
}

// 時間單位
export enum TimeUnit {
  SECONDS = 'seconds',
  MINUTES = 'minutes',
  HOURS = 'hours',
  DAYS = 'days'
}

// 節點輸入
export interface NodeInput {
  id: string;
  name: string;
  type: DataType;
  required: boolean;
  defaultValue?: any;
}

// 節點輸出
export interface NodeOutput {
  id: string;
  name: string;
  type: DataType;
}

// 數據類型
export enum DataType {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array',
  DATE = 'date'
}

// 工作流連接
export interface WorkflowConnection {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
  sourceOutputId: string;
  targetInputId: string;
  condition?: Condition;
}

// 工作流觸發器
export interface WorkflowTrigger {
  id: string;
  workflowId: string;
  type: TriggerType;
  name: string;
  config: TriggerConfig;
  isEnabled: boolean;
  lastTriggered?: Date;
  nextTrigger?: Date;
}

// 觸發器類型
export enum TriggerType {
  MANUAL = 'manual',
  SCHEDULE = 'schedule',
  EVENT = 'event',
  WEBHOOK = 'webhook',
  API = 'api'
}

// 觸發器配置
export interface TriggerConfig {
  [key: string]: any;
}

// 調度觸發器配置
export interface ScheduleTriggerConfig extends TriggerConfig {
  schedule: string; // Cron 表達式
  timezone: string;
}

// 事件觸發器配置
export interface EventTriggerConfig extends TriggerConfig {
  eventType: string;
  conditions: Condition[];
}

// Webhook 觸發器配置
export interface WebhookTriggerConfig extends TriggerConfig {
  url: string;
  method: string;
  headers: Record<string, string>;
  authentication?: AuthenticationConfig;
}

// 工作流變量
export interface WorkflowVariable {
  id: string;
  name: string;
  type: DataType;
  value: any;
  isGlobal: boolean;
  description?: string;
}

// 工作流設置
export interface WorkflowSettings {
  timeout: number;
  maxRetries: number;
  retryDelay: number;
  onError: ErrorAction;
  notifications: NotificationSettings;
  logging: LoggingSettings;
}

// 錯誤動作
export enum ErrorAction {
  STOP = 'stop',
  CONTINUE = 'continue',
  RETRY = 'retry',
  SKIP = 'skip'
}

// 通知設置
export interface NotificationSettings {
  onSuccess: boolean;
  onFailure: boolean;
  onTimeout: boolean;
  recipients: string[];
  channels: NotificationChannel[];
}

// 通知渠道
export enum NotificationChannel {
  EMAIL = 'email',
  SLACK = 'slack',
  WEBHOOK = 'webhook'
}

// 日誌設置
export interface LoggingSettings {
  level: LogLevel;
  includePayload: boolean;
  includeHeaders: boolean;
  retention: number; // 天數
}

// 工作流執行
export interface WorkflowExecution {
  id: string;
  workflowId: string;
  workflowVersion: string;
  status: ExecutionStatus;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  triggeredBy: string;
  triggerType: TriggerType;
  input: Record<string, any>;
  output?: Record<string, any>;
  variables: Record<string, any>;
  nodeExecutions: NodeExecution[];
  error?: ExecutionError;
}

// 執行狀態
export enum ExecutionStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  TIMEOUT = 'timeout'
}

// 節點執行
export interface NodeExecution {
  id: string;
  nodeId: string;
  status: ExecutionStatus;
  startedAt: Date;
  completedAt?: Date;
  duration?: number;
  input: Record<string, any>;
  output?: Record<string, any>;
  error?: ExecutionError;
  retries: number;
}

// 執行錯誤
export interface ExecutionError {
  code: string;
  message: string;
  details?: Record<string, any>;
  stack?: string;
  timestamp: Date;
}

// 工作流統計
export interface WorkflowStatistics {
  totalExecutions: number;
  successfulExecutions: number;
  failedExecutions: number;
  averageDuration: number;
  lastExecution?: Date;
  successRate: number;
}

// 工作流元數據
export interface WorkflowMetadata {
  author: string;
  tags: string[];
  category: string;
  priority: number;
  estimatedDuration: number;
}
```

## 🎨 Angular 組件

### 工作流設計器組件
```typescript
// 工作流設計器組件
@Component({
  selector: 'app-workflow-designer',
  template: `
    <div class="workflow-designer">
      <div class="designer-toolbar">
        <nz-button-group>
          <button nz-button (click)="saveWorkflow()">
            <i nz-icon nzType="save"></i>
            保存
          </button>
          <button nz-button (click)="validateWorkflow()">
            <i nz-icon nzType="check-circle"></i>
            驗證
          </button>
          <button nz-button (click)="testWorkflow()">
            <i nz-icon nzType="play-circle"></i>
            測試
          </button>
        </nz-button-group>
        
        <div class="toolbar-right">
          <nz-select [(ngModel)]="selectedNodeType" style="width: 200px;">
            <nz-option *ngFor="let nodeType of nodeTypes" [nzValue]="nodeType.value" [nzLabel]="nodeType.label">
            </nz-option>
          </nz-select>
          <button nz-button nzType="primary" (click)="addNode()">
            <i nz-icon nzType="plus"></i>
            添加節點
          </button>
        </div>
      </div>
      
      <div class="designer-canvas" #canvas>
        <svg class="workflow-svg" [attr.width]="canvasWidth" [attr.height]="canvasHeight">
          <!-- 連接線 -->
          <g class="connections">
            <path *ngFor="let connection of connections" 
                  [attr.d]="getConnectionPath(connection)"
                  class="connection-line"
                  [class.selected]="selectedConnection === connection.id"
                  (click)="selectConnection(connection)">
            </path>
          </g>
          
          <!-- 節點 -->
          <g class="nodes">
            <g *ngFor="let node of nodes" 
               [attr.transform]="'translate(' + node.position.x + ',' + node.position.y + ')'"
               class="workflow-node"
               [class.selected]="selectedNode === node.id"
               (click)="selectNode(node)">
              
              <!-- 節點背景 -->
              <rect [attr.width]="nodeWidth" [attr.height]="nodeHeight" 
                    class="node-background" 
                    [class]="'node-type-' + node.type">
              </rect>
              
              <!-- 節點圖標 -->
              <text [attr.x]="nodeWidth/2" [attr.y]="nodeHeight/2" 
                    class="node-icon" 
                    text-anchor="middle" 
                    dominant-baseline="middle">
                {{ getNodeIcon(node.type) }}
              </text>
              
              <!-- 節點標題 -->
              <text [attr.x]="nodeWidth/2" [attr.y]="nodeHeight + 20" 
                    class="node-title" 
                    text-anchor="middle">
                {{ node.name }}
              </text>
              
              <!-- 輸入端口 -->
              <circle *ngFor="let input of node.inputs; let i = index"
                      [attr.cx]="0" 
                      [attr.cy]="20 + i * 30" 
                      r="8" 
                      class="input-port"
                      (click)="startConnection(node, input, 'input')">
              </circle>
              
              <!-- 輸出端口 -->
              <circle *ngFor="let output of node.outputs; let i = index"
                      [attr.cx]="nodeWidth" 
                      [attr.cy]="20 + i * 30" 
                      r="8" 
                      class="output-port"
                      (click)="startConnection(node, output, 'output')">
              </circle>
            </g>
          </g>
        </svg>
      </div>
      
      <!-- 屬性面板 -->
      <div class="properties-panel" *ngIf="selectedNode">
        <nz-card nzTitle="節點屬性">
          <app-node-properties 
            [node]="selectedNode"
            (update)="updateNode($event)">
          </app-node-properties>
        </nz-card>
      </div>
    </div>
  `,
  styles: [`
    .workflow-designer {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .designer-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
    }
    
    .designer-canvas {
      flex: 1;
      position: relative;
      overflow: auto;
    }
    
    .workflow-svg {
      width: 100%;
      height: 100%;
    }
    
    .workflow-node {
      cursor: pointer;
    }
    
    .node-background {
      fill: #fff;
      stroke: #d9d9d9;
      stroke-width: 2;
      rx: 8;
    }
    
    .node-background.selected {
      stroke: #1890ff;
      stroke-width: 3;
    }
    
    .node-type-start {
      fill: #52c41a;
    }
    
    .node-type-end {
      fill: #f5222d;
    }
    
    .node-type-task {
      fill: #1890ff;
    }
    
    .node-type-condition {
      fill: #faad14;
    }
    
    .connection-line {
      fill: none;
      stroke: #d9d9d9;
      stroke-width: 2;
      cursor: pointer;
    }
    
    .connection-line.selected {
      stroke: #1890ff;
      stroke-width: 3;
    }
    
    .properties-panel {
      width: 300px;
      border-left: 1px solid #f0f0f0;
    }
  `]
})
export class WorkflowDesignerComponent implements OnInit {
  @Input() workflow: Workflow;
  @Output() workflowChange = new EventEmitter<Workflow>();
  
  nodes: WorkflowNode[] = [];
  connections: WorkflowConnection[] = [];
  selectedNode: WorkflowNode | null = null;
  selectedConnection: string | null = null;
  selectedNodeType: NodeType = NodeType.TASK;
  
  canvasWidth = 1200;
  canvasHeight = 800;
  nodeWidth = 120;
  nodeHeight = 80;
  
  nodeTypes = [
    { value: NodeType.START, label: '開始' },
    { value: NodeType.END, label: '結束' },
    { value: NodeType.TASK, label: '任務' },
    { value: NodeType.CONDITION, label: '條件' },
    { value: NodeType.PARALLEL, label: '並行' },
    { value: NodeType.MERGE, label: '合併' },
    { value: NodeType.DELAY, label: '延遲' },
    { value: NodeType.WEBHOOK, label: 'Webhook' },
    { value: NodeType.EMAIL, label: '郵件' },
    { value: NodeType.DATABASE, label: '數據庫' },
    { value: NodeType.API, label: 'API' },
    { value: NodeType.SCRIPT, label: '腳本' }
  ];
  
  constructor(
    private workflowService: WorkflowService,
    private message: NzMessageService
  ) {}
  
  ngOnInit(): void {
    if (this.workflow) {
      this.nodes = this.workflow.definition.nodes;
      this.connections = this.workflow.definition.connections;
    }
  }
  
  // 添加節點
  addNode(): void {
    const newNode: WorkflowNode = {
      id: this.generateId(),
      type: this.selectedNodeType,
      name: this.getDefaultNodeName(this.selectedNodeType),
      position: { x: 100, y: 100 },
      config: this.getDefaultNodeConfig(this.selectedNodeType),
      inputs: this.getDefaultNodeInputs(this.selectedNodeType),
      outputs: this.getDefaultNodeOutputs(this.selectedNodeType)
    };
    
    this.nodes.push(newNode);
    this.updateWorkflow();
  }
  
  // 選擇節點
  selectNode(node: WorkflowNode): void {
    this.selectedNode = node;
    this.selectedConnection = null;
  }
  
  // 選擇連接
  selectConnection(connection: WorkflowConnection): void {
    this.selectedConnection = connection.id;
    this.selectedNode = null;
  }
  
  // 開始連接
  startConnection(node: WorkflowNode, port: any, type: 'input' | 'output'): void {
    // 實現連接邏輯
  }
  
  // 更新節點
  updateNode(node: WorkflowNode): void {
    const index = this.nodes.findIndex(n => n.id === node.id);
    if (index !== -1) {
      this.nodes[index] = node;
      this.updateWorkflow();
    }
  }
  
  // 保存工作流
  saveWorkflow(): void {
    const updatedWorkflow: Workflow = {
      ...this.workflow,
      definition: {
        nodes: this.nodes,
        connections: this.connections,
        startNode: this.nodes.find(n => n.type === NodeType.START)?.id || '',
        endNodes: this.nodes.filter(n => n.type === NodeType.END).map(n => n.id),
        metadata: this.workflow.definition.metadata
      }
    };
    
    this.workflowService.updateWorkflow(updatedWorkflow.id, updatedWorkflow).subscribe({
      next: () => {
        this.message.success('工作流保存成功');
        this.workflowChange.emit(updatedWorkflow);
      },
      error: (error) => this.message.error('保存失敗：' + error.message)
    });
  }
  
  // 驗證工作流
  validateWorkflow(): void {
    const validation = this.workflowService.validateWorkflow(this.workflow);
    if (validation.isValid) {
      this.message.success('工作流驗證通過');
    } else {
      this.message.error('工作流驗證失敗：' + validation.errors.join(', '));
    }
  }
  
  // 測試工作流
  testWorkflow(): void {
    this.workflowService.testWorkflow(this.workflow.id).subscribe({
      next: (result) => {
        if (result.success) {
          this.message.success('工作流測試成功');
        } else {
          this.message.error('工作流測試失敗：' + result.message);
        }
      },
      error: (error) => this.message.error('測試失敗：' + error.message)
    });
  }
  
  // 獲取連接路徑
  getConnectionPath(connection: WorkflowConnection): string {
    const sourceNode = this.nodes.find(n => n.id === connection.sourceNodeId);
    const targetNode = this.nodes.find(n => n.id === connection.targetNodeId);
    
    if (!sourceNode || !targetNode) return '';
    
    const startX = sourceNode.position.x + this.nodeWidth;
    const startY = sourceNode.position.y + 20;
    const endX = targetNode.position.x;
    const endY = targetNode.position.y + 20;
    
    const controlX1 = startX + 50;
    const controlY1 = startY;
    const controlX2 = endX - 50;
    const controlY2 = endY;
    
    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;
  }
  
  // 獲取節點圖標
  getNodeIcon(nodeType: NodeType): string {
    const icons = {
      [NodeType.START]: '▶',
      [NodeType.END]: '■',
      [NodeType.TASK]: '⚙',
      [NodeType.CONDITION]: '?',
      [NodeType.PARALLEL]: '∥',
      [NodeType.MERGE]: '⧉',
      [NodeType.DELAY]: '⏱',
      [NodeType.WEBHOOK]: '🔗',
      [NodeType.EMAIL]: '✉',
      [NodeType.DATABASE]: '🗄',
      [NodeType.API]: '🌐',
      [NodeType.SCRIPT]: '📝'
    };
    return icons[nodeType] || '?';
  }
  
  // 更新工作流
  private updateWorkflow(): void {
    const updatedWorkflow: Workflow = {
      ...this.workflow,
      definition: {
        ...this.workflow.definition,
        nodes: this.nodes,
        connections: this.connections
      }
    };
    this.workflowChange.emit(updatedWorkflow);
  }
  
  // 生成 ID
  private generateId(): string {
    return 'node_' + Math.random().toString(36).substr(2, 9);
  }
  
  // 獲取默認節點名稱
  private getDefaultNodeName(nodeType: NodeType): string {
    const names = {
      [NodeType.START]: '開始',
      [NodeType.END]: '結束',
      [NodeType.TASK]: '任務',
      [NodeType.CONDITION]: '條件判斷',
      [NodeType.PARALLEL]: '並行執行',
      [NodeType.MERGE]: '合併結果',
      [NodeType.DELAY]: '延遲等待',
      [NodeType.WEBHOOK]: 'Webhook',
      [NodeType.EMAIL]: '發送郵件',
      [NodeType.DATABASE]: '數據庫操作',
      [NodeType.API]: 'API 調用',
      [NodeType.SCRIPT]: '腳本執行'
    };
    return names[nodeType] || '未知節點';
  }
  
  // 獲取默認節點配置
  private getDefaultNodeConfig(nodeType: NodeType): NodeConfig {
    switch (nodeType) {
      case NodeType.TASK:
        return {
          taskType: TaskType.CALL_API,
          parameters: {},
          timeout: 30000,
          retries: 3,
          onError: ErrorAction.STOP
        };
      case NodeType.CONDITION:
        return {
          conditions: [],
          defaultPath: ''
        };
      case NodeType.PARALLEL:
        return {
          branches: [],
          waitForAll: true
        };
      case NodeType.DELAY:
        return {
          delayType: DelayType.FIXED,
          duration: 1,
          unit: TimeUnit.SECONDS
        };
      default:
        return {};
    }
  }
  
  // 獲取默認節點輸入
  private getDefaultNodeInputs(nodeType: NodeType): NodeInput[] {
    switch (nodeType) {
      case NodeType.START:
        return [];
      case NodeType.TASK:
        return [
          { id: 'input1', name: '輸入', type: DataType.OBJECT, required: false }
        ];
      case NodeType.CONDITION:
        return [
          { id: 'input1', name: '數據', type: DataType.OBJECT, required: true }
        ];
      default:
        return [
          { id: 'input1', name: '輸入', type: DataType.OBJECT, required: false }
        ];
    }
  }
  
  // 獲取默認節點輸出
  private getDefaultNodeOutputs(nodeType: NodeType): NodeOutput[] {
    switch (nodeType) {
      case NodeType.END:
        return [];
      case NodeType.TASK:
        return [
          { id: 'output1', name: '輸出', type: DataType.OBJECT }
        ];
      case NodeType.CONDITION:
        return [
          { id: 'output1', name: '是', type: DataType.OBJECT },
          { id: 'output2', name: '否', type: DataType.OBJECT }
        ];
      default:
        return [
          { id: 'output1', name: '輸出', type: DataType.OBJECT }
        ];
    }
  }
}
```

## 🔧 服務層

### 工作流服務
```typescript
@Injectable({
  providedIn: 'root'
})
export class WorkflowService {
  private readonly baseUrl = '/api/workflows';
  
  constructor(private http: HttpClient) {}
  
  // 獲取工作流列表
  getWorkflows(): Observable<Workflow[]> {
    return this.http.get<Workflow[]>(this.baseUrl);
  }
  
  // 獲取工作流詳情
  getWorkflow(id: string): Observable<Workflow> {
    return this.http.get<Workflow>(`${this.baseUrl}/${id}`);
  }
  
  // 創建工作流
  createWorkflow(workflow: Partial<Workflow>): Observable<Workflow> {
    return this.http.post<Workflow>(this.baseUrl, workflow);
  }
  
  // 更新工作流
  updateWorkflow(id: string, workflow: Partial<Workflow>): Observable<Workflow> {
    return this.http.put<Workflow>(`${this.baseUrl}/${id}`, workflow);
  }
  
  // 刪除工作流
  deleteWorkflow(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  // 驗證工作流
  validateWorkflow(workflow: Workflow): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    // 檢查是否有開始節點
    const startNodes = workflow.definition.nodes.filter(n => n.type === NodeType.START);
    if (startNodes.length === 0) {
      errors.push('工作流必須有一個開始節點');
    } else if (startNodes.length > 1) {
      errors.push('工作流只能有一個開始節點');
    }
    
    // 檢查是否有結束節點
    const endNodes = workflow.definition.nodes.filter(n => n.type === NodeType.END);
    if (endNodes.length === 0) {
      errors.push('工作流必須至少有一個結束節點');
    }
    
    // 檢查連接是否有效
    for (const connection of workflow.definition.connections) {
      const sourceNode = workflow.definition.nodes.find(n => n.id === connection.sourceNodeId);
      const targetNode = workflow.definition.nodes.find(n => n.id === connection.targetNodeId);
      
      if (!sourceNode || !targetNode) {
        errors.push(`連接 ${connection.id} 引用了不存在的節點`);
      }
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  
  // 測試工作流
  testWorkflow(id: string): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/${id}/test`, {});
  }
  
  // 執行工作流
  executeWorkflow(id: string, input: Record<string, any>): Observable<WorkflowExecution> {
    return this.http.post<WorkflowExecution>(`${this.baseUrl}/${id}/execute`, input);
  }
  
  // 獲取工作流執行歷史
  getWorkflowExecutions(workflowId: string, limit = 100): Observable<WorkflowExecution[]> {
    return this.http.get<WorkflowExecution[]>(`${this.baseUrl}/${workflowId}/executions`, {
      params: { limit: limit.toString() }
    });
  }
  
  // 獲取工作流執行詳情
  getWorkflowExecution(executionId: string): Observable<WorkflowExecution> {
    return this.http.get<WorkflowExecution>(`${this.baseUrl}/executions/${executionId}`);
  }
  
  // 取消工作流執行
  cancelWorkflowExecution(executionId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/executions/${executionId}/cancel`, {});
  }
  
  // 獲取工作流觸發器
  getWorkflowTriggers(workflowId: string): Observable<WorkflowTrigger[]> {
    return this.http.get<WorkflowTrigger[]>(`${this.baseUrl}/${workflowId}/triggers`);
  }
  
  // 創建工作流觸發器
  createWorkflowTrigger(trigger: WorkflowTrigger): Observable<WorkflowTrigger> {
    return this.http.post<WorkflowTrigger>(`${this.baseUrl}/triggers`, trigger);
  }
  
  // 更新工作流觸發器
  updateWorkflowTrigger(id: string, trigger: WorkflowTrigger): Observable<WorkflowTrigger> {
    return this.http.put<WorkflowTrigger>(`${this.baseUrl}/triggers/${id}`, trigger);
  }
  
  // 刪除工作流觸發器
  deleteWorkflowTrigger(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/triggers/${id}`);
  }
}
```

## 📊 成功指標

### 功能指標
- [ ] 工作流設計器功能完整性 > 95%
- [ ] 工作流執行引擎可靠性 > 99%
- [ ] 觸發器系統準確性 > 99%
- [ ] 監控調度功能完整性 > 95%

### 性能指標
- [ ] 工作流執行時間 < 30 秒
- [ ] 設計器響應時間 < 1 秒
- [ ] 並發執行支持 > 100
- [ ] 系統可用性 > 99.9%

---

**📝 注意**: 工作流自動化模組需要與其他模組緊密集成，確保工作流的穩定執行和數據一致性。