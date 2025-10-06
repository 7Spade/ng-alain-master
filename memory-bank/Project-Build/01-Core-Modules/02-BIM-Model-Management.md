# 2️⃣ BIM 模型管理模組

## 📋 模組概述

BIM 模型管理模組提供建築資訊模型 (Building Information Modeling) 的完整管理功能，包括模型上傳、版本控制、3D 視覺化、協作註解等功能。此模組是 Project-Build 系統的核心技術組件。

### 🎯 功能目標
- 支持多種 BIM 模型格式的上傳和管理
- 提供高品質的 3D 模型視覺化
- 實現模型版本控制和協作
- 支持模型註解和討論功能
- 整合任務和成本管理

## 🏗️ 功能架構

### 核心功能
```
BIM 模型管理模組
├── 模型上傳管理
│   ├── 多格式支持 (IFC, DWG, RVT, etc.)
│   ├── 檔案驗證和轉換
│   ├── 上傳進度追蹤
│   └── 錯誤處理和重試
├── 模型視覺化
│   ├── 3D 渲染引擎
│   ├── 相機控制
│   ├── 模型樹導航
│   └── 屬性面板
├── 版本控制
│   ├── 模型版本管理
│   ├── 變更追蹤
│   ├── 版本比較
│   └── 回滾功能
├── 協作功能
│   ├── 模型註解
│   ├── 標記和標籤
│   ├── 討論線程
│   └── 權限控制
└── 整合功能
    ├── 任務關聯
    ├── 成本關聯
    ├── 文檔關聯
    └── 進度追蹤
```

## 📊 數據結構設計

### BIM 模型實體 (BIMModel)
```typescript
interface BIMModel {
  id: string;                    // 模型唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 模型名稱
  description?: string;          // 模型描述
  fileName: string;              // 原始檔案名
  fileSize: number;              // 檔案大小 (bytes)
  fileFormat: ModelFormat;       // 檔案格式
  version: string;               // 版本號
  status: ModelStatus;          // 模型狀態
  uploadProgress: number;        // 上傳進度
  processingProgress: number;    // 處理進度
  metadata: ModelMetadata;       // 模型元數據
  viewerConfig: ViewerConfig;    // 查看器配置
  permissions: ModelPermissions; // 權限設置
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  uploadedBy: string;           // 上傳者 ID
  parentModelId?: string;       // 父模型 ID (版本)
}

enum ModelFormat {
  IFC = 'ifc',                  // Industry Foundation Classes
  DWG = 'dwg',                  // AutoCAD Drawing
  RVT = 'rvt',                  // Revit Project
  NWD = 'nwd',                  // Navisworks
  FBX = 'fbx',                  // Autodesk FBX
  OBJ = 'obj',                  // Wavefront OBJ
  GLTF = 'gltf',                // glTF
  GLB = 'glb'                   // Binary glTF
}

enum ModelStatus {
  UPLOADING = 'uploading',      // 上傳中
  PROCESSING = 'processing',    // 處理中
  READY = 'ready',              // 就緒
  ERROR = 'error',              // 錯誤
  ARCHIVED = 'archived'         // 已歸檔
}

interface ModelMetadata {
  boundingBox: BoundingBox;     // 邊界框
  objectCount: number;          // 物件數量
  materialCount: number;        // 材質數量
  textureCount: number;         // 紋理數量
  geometryInfo: GeometryInfo;   // 幾何資訊
  properties: Record<string, any>; // 自定義屬性
}

interface BoundingBox {
  min: [number, number, number]; // 最小座標
  max: [number, number, number]; // 最大座標
  center: [number, number, number]; // 中心點
  size: [number, number, number]; // 尺寸
}

interface ViewerConfig {
  backgroundColor: string;       // 背景顏色
  defaultView: ViewType;        // 默認視圖
  cameraPosition: [number, number, number]; // 相機位置
  cameraTarget: [number, number, number];    // 相機目標
  renderMode: RenderMode;       // 渲染模式
  lighting: LightingConfig;     // 光照設置
  materials: MaterialConfig[];  // 材質設置
}

enum ViewType {
  TOP = 'top',                  // 頂視圖
  FRONT = 'front',              // 前視圖
  RIGHT = 'right',              // 右視圖
  ISOMETRIC = 'isometric',      // 等軸視圖
  PERSPECTIVE = 'perspective'   // 透視圖
}

enum RenderMode {
  SOLID = 'solid',              // 實體渲染
  WIREFRAME = 'wireframe',      // 線框渲染
  SHADED = 'shaded',            // 陰影渲染
  TEXTURED = 'textured'         // 紋理渲染
}
```

### 模型註解實體 (ModelAnnotation)
```typescript
interface ModelAnnotation {
  id: string;                   // 註解唯一標識
  modelId: string;              // 模型 ID
  projectId: string;            // 專案 ID
  type: AnnotationType;        // 註解類型
  title: string;               // 註解標題
  description: string;          // 註解描述
  position: AnnotationPosition; // 註解位置
  author: string;              // 作者 ID
  status: AnnotationStatus;    // 註解狀態
  priority: Priority;          // 優先級
  tags: string[];              // 標籤
  attachments: Attachment[];   // 附件
  comments: Comment[];         // 評論
  createdAt: Date;             // 創建時間
  updatedAt: Date;             // 更新時間
  resolvedAt?: Date;           // 解決時間
  resolvedBy?: string;         // 解決者 ID
}

enum AnnotationType {
  ISSUE = 'issue',             // 問題
  QUESTION = 'question',       // 疑問
  SUGGESTION = 'suggestion',   // 建議
  NOTE = 'note',               // 備註
  MEASUREMENT = 'measurement', // 測量
  HIGHLIGHT = 'highlight'      // 高亮
}

interface AnnotationPosition {
  worldPosition: [number, number, number]; // 世界座標
  screenPosition: [number, number];       // 螢幕座標
  objectId?: string;                       // 關聯物件 ID
  faceIndex?: number;                     // 面索引
}

enum AnnotationStatus {
  OPEN = 'open',               // 開啟
  IN_PROGRESS = 'in_progress', // 進行中
  RESOLVED = 'resolved',       // 已解決
  CLOSED = 'closed'           // 已關閉
}

enum Priority {
  LOW = 'low',                 // 低
  MEDIUM = 'medium',           // 中
  HIGH = 'high',               // 高
  CRITICAL = 'critical'        // 緊急
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// BIM 模型查看器組件 - 使用 Angular 20 現代化語法
@Component({
  selector: 'app-bim-model-viewer',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzTreeModule,
    NzSpinModule,
    ModelPropertiesComponent,
    ModelAnnotationsComponent
  ],
  template: `
    <div class="bim-viewer-container">
      <!-- 工具欄 -->
      <div class="viewer-toolbar">
        <nz-button-group>
          <button nz-button (click)="resetView()">
            <i nz-icon nzType="home"></i>
            重置視圖
          </button>
          <button nz-button (click)="toggleWireframe()">
            <i nz-icon nzType="border"></i>
            線框模式
          </button>
          <button nz-button (click)="toggleMeasure()">
            <i nz-icon nzType="ruler"></i>
            測量工具
          </button>
        </nz-button-group>
        
        <div class="view-controls">
          <nz-select [(ngModel)]="selectedView" (ngModelChange)="changeView($event)">
            <nz-option nzValue="top" nzLabel="頂視圖"></nz-option>
            <nz-option nzValue="front" nzLabel="前視圖"></nz-option>
            <nz-option nzValue="right" nzLabel="右視圖"></nz-option>
            <nz-option nzValue="isometric" nzLabel="等軸視圖"></nz-option>
          </nz-select>
        </div>
      </div>
      
      <!-- 主視圖區域 -->
      <div class="viewer-main">
        <!-- 模型樹面板 -->
        <div class="model-tree-panel" [class.collapsed]="treePanelCollapsed">
          <div class="panel-header">
            <span>模型樹</span>
            <button nz-button nzType="text" nzSize="small" (click)="toggleTreePanel()">
              <i nz-icon [nzType]="treePanelCollapsed ? 'right' : 'left'"></i>
            </button>
          </div>
          <div class="panel-content">
            <nz-tree 
              [nzData]="modelTree$ | async"
              [nzCheckable]="true"
              (nzClick)="onTreeNodeClick($event)">
            </nz-tree>
          </div>
        </div>
        
        <!-- 3D 查看器 -->
        <div class="viewer-canvas" #viewerCanvas>
          <div class="viewer-loading" *ngIf="loading">
            <nz-spin nzSize="large">
              <div class="loading-text">載入模型中...</div>
            </nz-spin>
          </div>
        </div>
        
        <!-- 屬性面板 -->
        <div class="properties-panel" [class.collapsed]="propertiesPanelCollapsed">
          <div class="panel-header">
            <span>屬性</span>
            <button nz-button nzType="text" nzSize="small" (click)="togglePropertiesPanel()">
              <i nz-icon [nzType]="propertiesPanelCollapsed ? 'left' : 'right'"></i>
            </button>
          </div>
          <div class="panel-content">
            <app-model-properties [selectedObject]="selectedObject$ | async">
            </app-model-properties>
          </div>
        </div>
      </div>
      
      <!-- 註解面板 -->
      <div class="annotations-panel" *ngIf="showAnnotations">
        <div class="panel-header">
          <span>註解</span>
          <button nz-button nzType="text" nzSize="small" (click)="showAnnotations = false">
            <i nz-icon nzType="close"></i>
          </button>
        </div>
        <div class="panel-content">
          <app-model-annotations 
            [modelId]="modelId"
            [annotations]="annotations$ | async">
          </app-model-annotations>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bim-viewer-container {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .viewer-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      border-bottom: 1px solid #f0f0f0;
      background: #fff;
    }
    
    .viewer-main {
      flex: 1;
      display: flex;
      position: relative;
    }
    
    .model-tree-panel,
    .properties-panel {
      width: 300px;
      border-right: 1px solid #f0f0f0;
      background: #fff;
      transition: width 0.3s;
    }
    
    .model-tree-panel.collapsed,
    .properties-panel.collapsed {
      width: 0;
      overflow: hidden;
    }
    
    .viewer-canvas {
      flex: 1;
      position: relative;
      background: #f5f5f5;
    }
    
    .annotations-panel {
      position: absolute;
      top: 0;
      right: 0;
      width: 400px;
      height: 100%;
      background: #fff;
      border-left: 1px solid #f0f0f0;
      z-index: 1000;
    }
    
    .panel-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid #f0f0f0;
      font-weight: 500;
    }
    
    .panel-content {
      padding: 16px;
      height: calc(100% - 49px);
      overflow-y: auto;
    }
    
    .viewer-loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
    
    .loading-text {
      margin-top: 16px;
      color: #666;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BIModelViewerComponent implements OnInit, OnDestroy {
  @Input() modelId: string;
  @Input() projectId: string;
  
  @ViewChild('viewerCanvas', { static: true }) viewerCanvas: ElementRef;
  
  loading = false;
  treePanelCollapsed = false;
  propertiesPanelCollapsed = false;
  showAnnotations = false;
  selectedView = 'isometric';
  
  private bimService = inject(BIModelService);
  private cdr = inject(ChangeDetectorRef);
  
  modelTree$ = this.bimService.modelTree$;
  selectedObject$ = this.bimService.selectedObject$;
  annotations$ = this.bimService.annotations$;
  
  private viewer: any;
  private destroy$ = new Subject<void>();
  
  ngOnInit() {
    this.loadModel();
    this.setupViewer();
  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.viewer) {
      this.viewer.dispose();
    }
  }
  
  private loadModel() {
    this.loading = true;
    this.bimService.loadModel(this.modelId).subscribe({
      next: (model) => {
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loading = false;
        console.error('Failed to load model:', error);
        this.cdr.detectChanges();
      }
    });
  }
  
  private setupViewer() {
    // 初始化 3D 查看器 (使用 Three.js 或 xeokit-sdk)
    // this.viewer = new xeokit.Viewer(this.viewerCanvas.nativeElement);
  }
  
  resetView() {
    if (this.viewer) {
      this.viewer.camera.eye = [0, 0, 100];
      this.viewer.camera.look = [0, 0, 0];
      this.viewer.camera.up = [0, 1, 0];
    }
  }
  
  toggleWireframe() {
    if (this.viewer) {
      // 切換線框模式
    }
  }
  
  toggleMeasure() {
    if (this.viewer) {
      // 切換測量工具
    }
  }
  
  changeView(viewType: string) {
    if (this.viewer) {
      // 改變視圖
    }
  }
  
  toggleTreePanel() {
    this.treePanelCollapsed = !this.treePanelCollapsed;
  }
  
  togglePropertiesPanel() {
    this.propertiesPanelCollapsed = !this.propertiesPanelCollapsed;
  }
  
  onTreeNodeClick(event: any) {
    const node = event.node;
    this.bimService.selectObject(node.key);
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class BIModelService {
  private firestore = inject(Firestore);
  private storage = inject(AngularFireStorage);
  private authService = inject(AuthService);
  
  private modelsSubject = new BehaviorSubject<BIMModel[]>([]);
  private currentModelSubject = new BehaviorSubject<BIMModel | null>(null);
  private modelTreeSubject = new BehaviorSubject<any[]>([]);
  private selectedObjectSubject = new BehaviorSubject<any>(null);
  private annotationsSubject = new BehaviorSubject<ModelAnnotation[]>([]);
  
  models$ = this.modelsSubject.asObservable();
  currentModel$ = this.currentModelSubject.asObservable();
  modelTree$ = this.modelTreeSubject.asObservable();
  selectedObject$ = this.selectedObjectSubject.asObservable();
  annotations$ = this.annotationsSubject.asObservable();
  
  // 上傳模型 - 使用 Firebase Storage
  uploadModel(projectId: string, file: File): Observable<BIMModel> {
    const modelId = this.generateId();
    const filePath = `projects/${projectId}/models/${modelId}/${file.name}`;
    
    const uploadTask = this.storage.upload(filePath, file);
    
    return from(uploadTask).pipe(
      switchMap(() => this.storage.ref(filePath).getDownloadURL()),
      switchMap(downloadURL => {
        const modelData: CreateModelRequest = {
          projectId,
          name: file.name,
          fileName: file.name,
          fileSize: file.size,
          fileFormat: this.getFileFormat(file.name),
          downloadURL,
          status: ModelStatus.UPLOADING,
          uploadProgress: 0,
          processingProgress: 0,
          uploadedBy: this.authService.getCurrentUser()?.uid || '',
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        const modelRef = collection(this.firestore, 'projects', projectId, 'models');
        return from(addDoc(modelRef, modelData)).pipe(
          map(docRef => ({ ...modelData, id: docRef.id } as BIMModel))
        );
      }),
      tap(model => {
        const currentModels = this.modelsSubject.value;
        this.modelsSubject.next([...currentModels, model]);
        this.startModelProcessing(model);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入模型 - 使用 Firestore
  loadModel(modelId: string): Observable<BIMModel> {
    const modelRef = doc(this.firestore, 'models', modelId);
    return from(getDoc(modelRef)).pipe(
      map(doc => ({ id: doc.id, ...doc.data() } as BIMModel)),
      tap(model => {
        this.currentModelSubject.next(model);
        this.loadModelTree(modelId);
        this.loadAnnotations(modelId);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入模型樹 - 使用 Firestore 實時查詢
  loadModelTree(modelId: string): void {
    const treeRef = collection(this.firestore, 'models', modelId, 'tree');
    const q = query(treeRef, orderBy('level', 'asc'));
    
    onSnapshot(q, (snapshot) => {
      const tree = snapshot.docs.map(doc => ({
        key: doc.id,
        ...doc.data()
      }));
      this.modelTreeSubject.next(this.buildTreeStructure(tree));
    }, (error) => {
      console.error('Failed to load model tree:', error);
    });
  }
  
  // 載入註解 - 使用 Firestore 實時查詢
  loadAnnotations(modelId: string): void {
    const annotationsRef = collection(this.firestore, 'models', modelId, 'annotations');
    const q = query(annotationsRef, orderBy('createdAt', 'desc'));
    
    onSnapshot(q, (snapshot) => {
      const annotations = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ModelAnnotation));
      this.annotationsSubject.next(annotations);
    }, (error) => {
      console.error('Failed to load annotations:', error);
    });
  }
  
  // 創建註解 - 使用 Firestore
  createAnnotation(modelId: string, annotationData: CreateAnnotationRequest): Observable<ModelAnnotation> {
    const annotationsRef = collection(this.firestore, 'models', modelId, 'annotations');
    const newAnnotation: ModelAnnotation = {
      id: '',
      modelId,
      ...annotationData,
      author: this.authService.getCurrentUser()?.uid || '',
      status: AnnotationStatus.OPEN,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    return from(addDoc(annotationsRef, newAnnotation)).pipe(
      map(docRef => ({ ...newAnnotation, id: docRef.id })),
      tap(annotation => {
        const currentAnnotations = this.annotationsSubject.value;
        this.annotationsSubject.next([annotation, ...currentAnnotations]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 選擇物件 - 使用 Firestore
  selectObject(objectId: string): void {
    const objectRef = doc(this.firestore, 'objects', objectId);
    from(getDoc(objectRef)).subscribe({
      next: (doc) => {
        const object = { id: doc.id, ...doc.data() };
        this.selectedObjectSubject.next(object);
      },
      error: (error) => console.error('Failed to load object:', error)
    });
  }
  
  // 更新模型狀態
  updateModelStatus(modelId: string, status: ModelStatus, progress?: number): Observable<void> {
    const modelRef = doc(this.firestore, 'models', modelId);
    const updateData: any = { status, updatedAt: new Date() };
    
    if (progress !== undefined) {
      updateData.processingProgress = progress;
    }
    
    return from(updateDoc(modelRef, updateData)).pipe(
      tap(() => {
        const currentModel = this.currentModelSubject.value;
        if (currentModel && currentModel.id === modelId) {
          this.currentModelSubject.next({ ...currentModel, ...updateData });
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 獲取模型列表
  getModels(projectId: string): Observable<BIMModel[]> {
    const modelsRef = collection(this.firestore, 'projects', projectId, 'models');
    const q = query(modelsRef, orderBy('updatedAt', 'desc'));
    
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BIMModel))),
      tap(models => this.modelsSubject.next(models)),
      catchError(this.handleError)
    );
  }
  
  // 刪除模型
  deleteModel(modelId: string): Observable<void> {
    const modelRef = doc(this.firestore, 'models', modelId);
    return from(deleteDoc(modelRef)).pipe(
      tap(() => {
        const models = this.modelsSubject.value;
        const filteredModels = models.filter(m => m.id !== modelId);
        this.modelsSubject.next(filteredModels);
      }),
      catchError(this.handleError)
    );
  }
  
  // 開始模型處理
  private startModelProcessing(model: BIMModel): void {
    // 模擬模型處理過程
    const interval = setInterval(() => {
      const currentProgress = model.processingProgress || 0;
      const newProgress = Math.min(currentProgress + 10, 100);
      
      this.updateModelStatus(model.id, ModelStatus.PROCESSING, newProgress).subscribe();
      
      if (newProgress >= 100) {
        clearInterval(interval);
        this.updateModelStatus(model.id, ModelStatus.READY).subscribe();
      }
    }, 1000);
  }
  
  // 構建樹結構
  private buildTreeStructure(nodes: any[]): any[] {
    const map = new Map();
    const roots: any[] = [];
    
    nodes.forEach(node => {
      map.set(node.key, { ...node, children: [] });
    });
    
    nodes.forEach(node => {
      const parent = map.get(node.parentId);
      if (parent) {
        parent.children.push(map.get(node.key));
      } else {
        roots.push(map.get(node.key));
      }
    });
    
    return roots;
  }
  
  private getFileFormat(fileName: string): ModelFormat {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const formatMap: Record<string, ModelFormat> = {
      'ifc': ModelFormat.IFC,
      'dwg': ModelFormat.DWG,
      'rvt': ModelFormat.RVT,
      'nwd': ModelFormat.NWD,
      'fbx': ModelFormat.FBX,
      'obj': ModelFormat.OBJ,
      'gltf': ModelFormat.GLTF,
      'glb': ModelFormat.GLB
    };
    return formatMap[extension || ''] || ModelFormat.IFC;
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  private handleError(error: any): Observable<never> {
    console.error('BIM model service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### BIM 模型權限
```typescript
enum BIMModelPermission {
  VIEW_MODELS = 'view_models',
  UPLOAD_MODELS = 'upload_models',
  DELETE_MODELS = 'delete_models',
  MANAGE_MODELS = 'manage_models',
  CREATE_ANNOTATIONS = 'create_annotations',
  MANAGE_ANNOTATIONS = 'manage_annotations',
  EXPORT_MODELS = 'export_models',
  SHARE_MODELS = 'share_models'
}

// 角色權限映射
const BIM_PERMISSIONS: Record<ProjectRole, BIMModelPermission[]> = {
  [ProjectRole.OWNER]: [
    BIMModelPermission.VIEW_MODELS,
    BIMModelPermission.UPLOAD_MODELS,
    BIMModelPermission.DELETE_MODELS,
    BIMModelPermission.MANAGE_MODELS,
    BIMModelPermission.CREATE_ANNOTATIONS,
    BIMModelPermission.MANAGE_ANNOTATIONS,
    BIMModelPermission.EXPORT_MODELS,
    BIMModelPermission.SHARE_MODELS
  ],
  [ProjectRole.ADMIN]: [
    BIMModelPermission.VIEW_MODELS,
    BIMModelPermission.UPLOAD_MODELS,
    BIMModelPermission.MANAGE_MODELS,
    BIMModelPermission.CREATE_ANNOTATIONS,
    BIMModelPermission.MANAGE_ANNOTATIONS,
    BIMModelPermission.EXPORT_MODELS
  ],
  [ProjectRole.MANAGER]: [
    BIMModelPermission.VIEW_MODELS,
    BIMModelPermission.UPLOAD_MODELS,
    BIMModelPermission.CREATE_ANNOTATIONS,
    BIMModelPermission.EXPORT_MODELS
  ],
  [ProjectRole.ENGINEER]: [
    BIMModelPermission.VIEW_MODELS,
    BIMModelPermission.UPLOAD_MODELS,
    BIMModelPermission.CREATE_ANNOTATIONS
  ],
  [ProjectRole.CONTRACTOR]: [
    BIMModelPermission.VIEW_MODELS,
    BIMModelPermission.CREATE_ANNOTATIONS
  ],
  [ProjectRole.VIEWER]: [
    BIMModelPermission.VIEW_MODELS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    BIMModelPermission.VIEW_MODELS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface BIMModelApi {
  // 模型管理
  POST /api/projects/{projectId}/models        // 上傳模型
  GET /api/projects/{projectId}/models         // 獲取模型列表
  GET /api/models/{modelId}                    // 獲取模型詳情
  PATCH /api/models/{modelId}                  // 更新模型
  DELETE /api/models/{modelId}                 // 刪除模型
  
  // 模型樹
  GET /api/models/{modelId}/tree               // 獲取模型樹
  GET /api/models/{modelId}/objects/{objectId} // 獲取物件詳情
  
  // 註解管理
  POST /api/models/{modelId}/annotations       // 創建註解
  GET /api/models/{modelId}/annotations        // 獲取註解列表
  PATCH /api/annotations/{annotationId}        // 更新註解
  DELETE /api/annotations/{annotationId}       // 刪除註解
  
  // 模型處理
  POST /api/models/{modelId}/process           // 處理模型
  GET /api/models/{modelId}/status             // 獲取處理狀態
}

// 請求/響應類型
interface CreateModelRequest {
  projectId: string;
  name: string;
  fileName: string;
  fileSize: number;
  fileFormat: ModelFormat;
  downloadURL: string;
}

interface CreateAnnotationRequest {
  type: AnnotationType;
  title: string;
  description: string;
  position: AnnotationPosition;
  priority: Priority;
  tags: string[];
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const bimConfig = {
  maxFileSize: parseInt(process.env.MAX_BIM_FILE_SIZE || '500') * 1024 * 1024, // MB
  supportedFormats: process.env.BIM_SUPPORTED_FORMATS?.split(',') || ['ifc', 'dwg', 'rvt'],
  processingTimeout: parseInt(process.env.BIM_PROCESSING_TIMEOUT || '3600'), // seconds
  viewerEngine: process.env.BIM_VIEWER_ENGINE || 'xeokit',
  enableAnnotations: process.env.ENABLE_BIM_ANNOTATIONS === 'true',
  maxAnnotationsPerModel: parseInt(process.env.MAX_ANNOTATIONS_PER_MODEL || '1000')
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 3D 查看器集成
- [ ] 模型上傳功能
- [ ] 版本控制實現
- [ ] 註解系統開發
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成