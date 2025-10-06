# 5️⃣ 文檔管理模組

## 📋 模組概述

文檔管理模組提供專案文檔的完整管理功能，包括文檔上傳、版本控制、分類管理、權限控制、協作編輯等功能。此模組是 Project-Build 系統的知識管理核心組件。

### 🎯 功能目標
- 提供完整的文檔生命週期管理
- 實現文檔版本控制和歷史追蹤
- 支持多種文檔格式和預覽
- 提供文檔協作和評論功能
- 整合任務和成本管理

## 🏗️ 功能架構

### 核心功能
```
文檔管理模組
├── 文檔上傳管理
│   ├── 多格式支持
│   ├── 批量上傳
│   ├── 檔案驗證
│   └── 上傳進度追蹤
├── 文檔分類管理
│   ├── 分類體系
│   ├── 標籤管理
│   ├── 文檔組織
│   └── 搜尋功能
├── 版本控制
│   ├── 版本歷史
│   ├── 版本比較
│   ├── 版本回滾
│   └── 分支管理
├── 文檔預覽
│   ├── 多格式預覽
│   ├── 線上編輯
│   ├── 註解功能
│   └── 列印功能
├── 協作功能
│   ├── 文檔分享
│   ├── 評論系統
│   ├── 審批流程
│   └── 通知系統
└── 整合功能
    ├── 任務關聯
    ├── 成本關聯
    ├── BIM 關聯
    └── 進度追蹤
```

## 📊 數據結構設計

### 文檔實體 (Document)
```typescript
interface Document {
  id: string;                    // 文檔唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 文檔名稱
  description?: string;          // 文檔描述
  fileName: string;              // 原始檔案名
  fileSize: number;              // 檔案大小 (bytes)
  fileType: DocumentType;        // 文檔類型
  mimeType: string;              // MIME 類型
  category: DocumentCategory;   // 文檔分類
  tags: string[];               // 標籤
  version: string;              // 版本號
  status: DocumentStatus;      // 文檔狀態
  visibility: DocumentVisibility; // 可見性
  permissions: DocumentPermissions; // 權限設置
  metadata: DocumentMetadata;   // 文檔元數據
  previewUrl?: string;          // 預覽 URL
  downloadUrl: string;          // 下載 URL
  thumbnailUrl?: string;        // 縮圖 URL
  checksum: string;             // 檔案校驗和
  uploadProgress: number;        // 上傳進度
  relatedTasks: string[];       // 關聯任務
  relatedCostItems: string[];   // 關聯成本項目
  relatedModels: string[];      // 關聯模型
  comments: DocumentComment[];  // 評論
  approvals: DocumentApproval[]; // 審批記錄
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
  lastModifiedBy: string;        // 最後修改者 ID
}

enum DocumentType {
  PDF = 'pdf',                  // PDF 文檔
  WORD = 'word',                // Word 文檔
  EXCEL = 'excel',              // Excel 文檔
  POWERPOINT = 'powerpoint',    // PowerPoint 文檔
  IMAGE = 'image',              // 圖片
  CAD = 'cad',                  // CAD 圖紙
  TEXT = 'text',                // 文字文檔
  ARCHIVE = 'archive',          // 壓縮檔案
  VIDEO = 'video',              // 影片
  AUDIO = 'audio'               // 音訊
}

enum DocumentCategory {
  DRAWINGS = 'drawings',        // 圖紙
  SPECIFICATIONS = 'specifications', // 規範
  CONTRACTS = 'contracts',      // 合約
  REPORTS = 'reports',          // 報告
  PHOTOS = 'photos',           // 照片
  CORRESPONDENCE = 'correspondence', // 往來函件
  MEETING_MINUTES = 'meeting_minutes', // 會議記錄
  INSPECTION = 'inspection',    // 檢查記錄
  SAFETY = 'safety',           // 安全文檔
  OTHER = 'other'              // 其他
}

enum DocumentStatus {
  DRAFT = 'draft',              // 草稿
  PENDING_REVIEW = 'pending_review', // 待審查
  UNDER_REVIEW = 'under_review', // 審查中
  APPROVED = 'approved',        // 已審批
  REJECTED = 'rejected',        // 已拒絕
  ARCHIVED = 'archived'         // 已歸檔
}

enum DocumentVisibility {
  PUBLIC = 'public',            // 公開
  PRIVATE = 'private',          // 私有
  TEAM = 'team',               // 團隊
  RESTRICTED = 'restricted'     // 受限
}

interface DocumentPermissions {
  canView: string[];            // 可查看用戶
  canEdit: string[];            // 可編輯用戶
  canDelete: string[];           // 可刪除用戶
  canApprove: string[];          // 可審批用戶
  canDownload: string[];         // 可下載用戶
}

interface DocumentMetadata {
  author?: string;              // 作者
  title?: string;               // 標題
  subject?: string;             // 主題
  keywords?: string[];          // 關鍵字
  createdDate?: Date;           // 創建日期
  modifiedDate?: Date;          // 修改日期
  pageCount?: number;           // 頁數
  dimensions?: {                // 尺寸
    width: number;
    height: number;
  };
  customProperties: Record<string, any>; // 自定義屬性
}
```

### 文檔版本實體 (DocumentVersion)
```typescript
interface DocumentVersion {
  id: string;                   // 版本唯一標識
  documentId: string;           // 文檔 ID
  version: string;               // 版本號
  fileName: string;             // 檔案名
  fileSize: number;             // 檔案大小
  checksum: string;             // 校驗和
  downloadUrl: string;           // 下載 URL
  changeLog: string;             // 變更日誌
  isCurrent: boolean;           // 是否為當前版本
  createdBy: string;            // 創建者 ID
  createdAt: Date;              // 創建時間
}

interface DocumentComment {
  id: string;                   // 評論唯一標識
  documentId: string;           // 文檔 ID
  content: string;              // 評論內容
  author: string;               // 作者 ID
  position?: CommentPosition;    // 評論位置
  status: CommentStatus;        // 評論狀態
  replies: DocumentComment[];    // 回覆
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

interface CommentPosition {
  page?: number;                // 頁碼
  x: number;                    // X 座標
  y: number;                    // Y 座標
  width?: number;               // 寬度
  height?: number;              // 高度
}

enum CommentStatus {
  ACTIVE = 'active',            // 活躍
  RESOLVED = 'resolved',        // 已解決
  ARCHIVED = 'archived'         // 已歸檔
}

interface DocumentApproval {
  id: string;                   // 審批唯一標識
  documentId: string;           // 文檔 ID
  approver: string;             // 審批者 ID
  status: ApprovalStatus;       // 審批狀態
  comment?: string;             // 審批意見
  approvedAt?: Date;           // 審批時間
  createdAt: Date;             // 創建時間
}

enum ApprovalStatus {
  PENDING = 'pending',          // 待審批
  APPROVED = 'approved',        // 已審批
  REJECTED = 'rejected'         // 已拒絕
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 文檔管理主組件
@Component({
  selector: 'app-document-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>文檔管理</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="uploadDocument()">
              <i nz-icon nzType="upload"></i>
              上傳文檔
            </button>
            <button nz-button (click)="createFolder()">
              <i nz-icon nzType="folder-add"></i>
              新建資料夾
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <div class="document-management">
          <!-- 側邊欄 -->
          <div class="sidebar">
            <nz-tree 
              [nzData]="folderTree$ | async"
              [nzSelectedKeys]="selectedKeys"
              (nzClick)="onFolderSelect($event)">
            </nz-tree>
          </div>
          
          <!-- 主內容區 -->
          <div class="main-content">
            <!-- 工具欄 -->
            <div class="toolbar">
              <nz-input-group nzSearch [nzSuffix]="suffixIcon">
                <input type="text" nz-input placeholder="搜尋文檔" [(ngModel)]="searchKeyword" (ngModelChange)="onSearch()">
              </nz-input-group>
              
              <nz-select [(ngModel)]="selectedCategory" (ngModelChange)="onCategoryChange()" placeholder="分類">
                <nz-option nzValue="" nzLabel="全部分類"></nz-option>
                <nz-option nzValue="drawings" nzLabel="圖紙"></nz-option>
                <nz-option nzValue="specifications" nzLabel="規範"></nz-option>
                <nz-option nzValue="contracts" nzLabel="合約"></nz-option>
                <nz-option nzValue="reports" nzLabel="報告"></nz-option>
              </nz-select>
              
              <nz-select [(ngModel)]="viewMode" (ngModelChange)="onViewModeChange()">
                <nz-option nzValue="list" nzLabel="列表視圖"></nz-option>
                <nz-option nzValue="grid" nzLabel="網格視圖"></nz-option>
              </nz-select>
            </div>
            
            <!-- 文檔列表 -->
            <div class="document-list" [class.grid-view]="viewMode === 'grid'">
              <nz-table 
                *ngIf="viewMode === 'list'"
                [nzData]="documents$ | async" 
                [nzLoading]="loading$ | async"
                [nzPageSize]="20"
                [nzShowPagination]="true">
                
                <thead>
                  <tr>
                    <th>文檔名稱</th>
                    <th>分類</th>
                    <th>大小</th>
                    <th>版本</th>
                    <th>狀態</th>
                    <th>最後修改</th>
                    <th>操作</th>
                  </tr>
                </thead>
                
                <tbody>
                  <tr *ngFor="let doc of documents$ | async">
                    <td>
                      <div class="document-info">
                        <i nz-icon [nzType]="getDocumentIcon(doc.fileType)" [nzTheme]="'outline'"></i>
                        <span class="document-name">{{ doc.name }}</span>
                      </div>
                    </td>
                    <td>
                      <nz-tag [nzColor]="getCategoryColor(doc.category)">
                        {{ doc.category | documentCategoryLabel }}
                      </nz-tag>
                    </td>
                    <td>{{ doc.fileSize | fileSize }}</td>
                    <td>{{ doc.version }}</td>
                    <td>
                      <nz-badge 
                        [nzStatus]="getStatusType(doc.status)" 
                        [nzText]="doc.status | documentStatusLabel">
                      </nz-badge>
                    </td>
                    <td>{{ doc.updatedAt | date:'short' }}</td>
                    <td>
                      <nz-button-group>
                        <button nz-button nzSize="small" (click)="previewDocument(doc)">
                          <i nz-icon nzType="eye"></i>
                        </button>
                        <button nz-button nzSize="small" (click)="downloadDocument(doc)">
                          <i nz-icon nzType="download"></i>
                        </button>
                        <button nz-button nzSize="small" (click)="editDocument(doc)">
                          <i nz-icon nzType="edit"></i>
                        </button>
                        <button nz-button nzSize="small" nzDanger (click)="deleteDocument(doc)">
                          <i nz-icon nzType="delete"></i>
                        </button>
                      </nz-button-group>
                    </td>
                  </tr>
                </tbody>
              </nz-table>
              
              <!-- 網格視圖 -->
              <div *ngIf="viewMode === 'grid'" class="grid-container">
                <div *ngFor="let doc of documents$ | async" class="document-card" (click)="previewDocument(doc)">
                  <div class="document-thumbnail">
                    <img *ngIf="doc.thumbnailUrl" [src]="doc.thumbnailUrl" [alt]="doc.name">
                    <i *ngIf="!doc.thumbnailUrl" nz-icon [nzType]="getDocumentIcon(doc.fileType)" [nzTheme]="'outline'"></i>
                  </div>
                  <div class="document-details">
                    <div class="document-name">{{ doc.name }}</div>
                    <div class="document-meta">
                      <span>{{ doc.fileSize | fileSize }}</span>
                      <span>{{ doc.version }}</span>
                    </div>
                    <div class="document-status">
                      <nz-badge 
                        [nzStatus]="getStatusType(doc.status)" 
                        [nzText]="doc.status | documentStatusLabel">
                      </nz-badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nz-card-content>
    </nz-card>
    
    <ng-template #suffixIcon>
      <i nz-icon nzType="search"></i>
    </ng-template>
  `,
  styles: [`
    .document-management {
      display: flex;
      height: calc(100vh - 200px);
    }
    
    .sidebar {
      width: 250px;
      border-right: 1px solid #f0f0f0;
      padding: 16px;
      overflow-y: auto;
    }
    
    .main-content {
      flex: 1;
      padding: 16px;
      display: flex;
      flex-direction: column;
    }
    
    .toolbar {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      align-items: center;
    }
    
    .document-list {
      flex: 1;
      overflow-y: auto;
    }
    
    .document-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .document-name {
      font-weight: 500;
    }
    
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .document-card {
      border: 1px solid #f0f0f0;
      border-radius: 8px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .document-card:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    
    .document-thumbnail {
      height: 120px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;
      border-radius: 4px;
      margin-bottom: 12px;
    }
    
    .document-thumbnail img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    .document-thumbnail i {
      font-size: 48px;
      color: #999;
    }
    
    .document-details {
      text-align: center;
    }
    
    .document-name {
      font-weight: 500;
      margin-bottom: 8px;
      word-break: break-word;
    }
    
    .document-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
    }
    
    .document-status {
      display: flex;
      justify-content: center;
    }
  `]
})
export class DocumentManagementComponent implements OnInit {
  documents$ = this.documentService.documents$;
  folderTree$ = this.documentService.folderTree$;
  loading$ = this.documentService.loading$;
  
  selectedKeys: string[] = [];
  searchKeyword = '';
  selectedCategory = '';
  viewMode: 'list' | 'grid' = 'list';
  
  constructor(
    private documentService: DocumentService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}
  
  ngOnInit() {
    this.documentService.loadProjectDocuments();
    this.documentService.loadFolderTree();
  }
  
  uploadDocument() {
    this.modal.create({
      nzTitle: '上傳文檔',
      nzContent: AppUploadDocumentModalComponent,
      nzFooter: null,
      nzWidth: 600
    });
  }
  
  createFolder() {
    this.modal.create({
      nzTitle: '新建資料夾',
      nzContent: AppCreateFolderModalComponent,
      nzFooter: null,
      nzWidth: 400
    });
  }
  
  onFolderSelect(event: any) {
    this.selectedKeys = [event.node.key];
    this.documentService.loadDocumentsByFolder(event.node.key);
  }
  
  onSearch() {
    this.documentService.searchDocuments(this.searchKeyword);
  }
  
  onCategoryChange() {
    this.documentService.filterByCategory(this.selectedCategory);
  }
  
  onViewModeChange() {
    // 視圖模式切換邏輯
  }
  
  previewDocument(document: Document) {
    this.modal.create({
      nzTitle: '文檔預覽',
      nzContent: AppDocumentPreviewModalComponent,
      nzComponentParams: { document },
      nzFooter: null,
      nzWidth: '90%',
      nzStyle: { 'max-width': '1200px' }
    });
  }
  
  downloadDocument(document: Document) {
    this.documentService.downloadDocument(document.id).subscribe({
      next: () => this.message.success('下載開始'),
      error: (error) => this.message.error('下載失敗: ' + error.message)
    });
  }
  
  editDocument(document: Document) {
    this.modal.create({
      nzTitle: '編輯文檔',
      nzContent: AppEditDocumentModalComponent,
      nzComponentParams: { document },
      nzFooter: null,
      nzWidth: 600
    });
  }
  
  deleteDocument(document: Document) {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除文檔 ${document.name} 嗎？`,
      nzOkText: '刪除',
      nzOkType: 'danger',
      nzCancelText: '取消',
      nzOnOk: () => this.documentService.deleteDocument(document.id)
    });
  }
  
  getDocumentIcon(fileType: DocumentType): string {
    const icons = {
      [DocumentType.PDF]: 'file-pdf',
      [DocumentType.WORD]: 'file-word',
      [DocumentType.EXCEL]: 'file-excel',
      [DocumentType.POWERPOINT]: 'file-ppt',
      [DocumentType.IMAGE]: 'file-image',
      [DocumentType.CAD]: 'file',
      [DocumentType.TEXT]: 'file-text',
      [DocumentType.ARCHIVE]: 'file-zip',
      [DocumentType.VIDEO]: 'file-video',
      [DocumentType.AUDIO]: 'file-audio'
    };
    return icons[fileType] || 'file';
  }
  
  getCategoryColor(category: DocumentCategory): string {
    const colors = {
      [DocumentCategory.DRAWINGS]: 'blue',
      [DocumentCategory.SPECIFICATIONS]: 'green',
      [DocumentCategory.CONTRACTS]: 'orange',
      [DocumentCategory.REPORTS]: 'purple',
      [DocumentCategory.PHOTOS]: 'cyan',
      [DocumentCategory.CORRESPONDENCE]: 'magenta',
      [DocumentCategory.MEETING_MINUTES]: 'lime',
      [DocumentCategory.INSPECTION]: 'gold',
      [DocumentCategory.SAFETY]: 'red',
      [DocumentCategory.OTHER]: 'default'
    };
    return colors[category] || 'default';
  }
  
  getStatusType(status: DocumentStatus): 'success' | 'warning' | 'error' | 'default' {
    const types = {
      [DocumentStatus.APPROVED]: 'success',
      [DocumentStatus.PENDING_REVIEW]: 'warning',
      [DocumentStatus.UNDER_REVIEW]: 'warning',
      [DocumentStatus.REJECTED]: 'error',
      [DocumentStatus.DRAFT]: 'default',
      [DocumentStatus.ARCHIVED]: 'default'
    };
    return types[status] || 'default';
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private readonly apiUrl = '/api/projects';
  
  private documentsSubject = new BehaviorSubject<Document[]>([]);
  private folderTreeSubject = new BehaviorSubject<any[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  documents$ = this.documentsSubject.asObservable();
  folderTree$ = this.folderTreeSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {}
  
  // 上傳文檔
  uploadDocument(file: File, metadata: DocumentMetadata): Observable<Document> {
    const documentId = this.generateId();
    const filePath = `projects/${this.getCurrentProjectId()}/documents/${documentId}/${file.name}`;
    
    const uploadTask = this.storage.upload(filePath, file);
    
    return from(uploadTask).pipe(
      switchMap(() => this.storage.ref(filePath).getDownloadURL()),
      switchMap(downloadURL => {
        const documentData: CreateDocumentRequest = {
          projectId: this.getCurrentProjectId(),
          name: file.name,
          fileName: file.name,
          fileSize: file.size,
          fileType: this.getFileType(file.name),
          mimeType: file.type,
          downloadURL,
          ...metadata
        };
        
        return this.http.post<Document>(`${this.apiUrl}/${this.getCurrentProjectId()}/documents`, documentData);
      }),
      tap(document => {
        const currentDocuments = this.documentsSubject.value;
        this.documentsSubject.next([...currentDocuments, document]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入文檔
  loadProjectDocuments(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Document[]>(`${this.apiUrl}/${projectId}/documents`)
      .pipe(
        tap(documents => this.documentsSubject.next(documents)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 載入資料夾樹
  loadFolderTree(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<any[]>(`${this.apiUrl}/${projectId}/folders`)
      .pipe(
        tap(tree => this.folderTreeSubject.next(tree)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 搜尋文檔
  searchDocuments(keyword: string): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Document[]>(`${this.apiUrl}/${projectId}/documents/search`, {
      params: { keyword }
    }).pipe(
      tap(documents => this.documentsSubject.next(documents)),
      catchError(this.handleError)
    ).subscribe();
  }
  
  // 按分類篩選
  filterByCategory(category: string): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Document[]>(`${this.apiUrl}/${projectId}/documents`, {
      params: category ? { category } : {}
    }).pipe(
      tap(documents => this.documentsSubject.next(documents)),
      catchError(this.handleError)
    ).subscribe();
  }
  
  // 下載文檔
  downloadDocument(documentId: string): Observable<void> {
    return this.http.get(`/api/documents/${documentId}/download`, {
      responseType: 'blob'
    }).pipe(
      tap(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document';
        link.click();
        window.URL.revokeObjectURL(url);
      }),
      map(() => void 0),
      catchError(this.handleError)
    );
  }
  
  // 刪除文檔
  deleteDocument(documentId: string): Observable<void> {
    return this.http.delete<void>(`/api/documents/${documentId}`).pipe(
      tap(() => {
        const documents = this.documentsSubject.value;
        const filteredDocuments = documents.filter(d => d.id !== documentId);
        this.documentsSubject.next(filteredDocuments);
      }),
      catchError(this.handleError)
    );
  }
  
  // 創建文檔版本
  createVersion(documentId: string, file: File, changeLog: string): Observable<DocumentVersion> {
    const versionId = this.generateId();
    const filePath = `projects/${this.getCurrentProjectId()}/documents/${documentId}/versions/${versionId}/${file.name}`;
    
    const uploadTask = this.storage.upload(filePath, file);
    
    return from(uploadTask).pipe(
      switchMap(() => this.storage.ref(filePath).getDownloadURL()),
      switchMap(downloadURL => {
        return this.http.post<DocumentVersion>(`/api/documents/${documentId}/versions`, {
          fileName: file.name,
          fileSize: file.size,
          downloadURL,
          changeLog
        });
      }),
      catchError(this.handleError)
    );
  }
  
  // 添加評論
  addComment(documentId: string, comment: CreateCommentRequest): Observable<DocumentComment> {
    return this.http.post<DocumentComment>(`/api/documents/${documentId}/comments`, comment).pipe(
      tap(newComment => {
        const documents = this.documentsSubject.value;
        const document = documents.find(d => d.id === documentId);
        if (document) {
          document.comments.push(newComment);
          this.documentsSubject.next([...documents]);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private getFileType(fileName: string): DocumentType {
    const extension = fileName.split('.').pop()?.toLowerCase();
    const typeMap: Record<string, DocumentType> = {
      'pdf': DocumentType.PDF,
      'doc': DocumentType.WORD,
      'docx': DocumentType.WORD,
      'xls': DocumentType.EXCEL,
      'xlsx': DocumentType.EXCEL,
      'ppt': DocumentType.POWERPOINT,
      'pptx': DocumentType.POWERPOINT,
      'jpg': DocumentType.IMAGE,
      'jpeg': DocumentType.IMAGE,
      'png': DocumentType.IMAGE,
      'gif': DocumentType.IMAGE,
      'dwg': DocumentType.CAD,
      'dxf': DocumentType.CAD,
      'txt': DocumentType.TEXT,
      'zip': DocumentType.ARCHIVE,
      'rar': DocumentType.ARCHIVE,
      'mp4': DocumentType.VIDEO,
      'avi': DocumentType.VIDEO,
      'mp3': DocumentType.AUDIO,
      'wav': DocumentType.AUDIO
    };
    return typeMap[extension || ''] || DocumentType.TEXT;
  }
  
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
  
  private getCurrentProjectId(): string {
    // 從認證服務獲取當前專案 ID
    return 'current-project-id';
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Document service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 文檔管理權限
```typescript
enum DocumentManagementPermission {
  VIEW_DOCUMENTS = 'view_documents',
  UPLOAD_DOCUMENTS = 'upload_documents',
  EDIT_DOCUMENTS = 'edit_documents',
  DELETE_DOCUMENTS = 'delete_documents',
  DOWNLOAD_DOCUMENTS = 'download_documents',
  MANAGE_VERSIONS = 'manage_versions',
  MANAGE_COMMENTS = 'manage_comments',
  APPROVE_DOCUMENTS = 'approve_documents',
  MANAGE_PERMISSIONS = 'manage_permissions',
  EXPORT_DOCUMENTS = 'export_documents'
}

// 角色權限映射
const DOCUMENT_PERMISSIONS: Record<ProjectRole, DocumentManagementPermission[]> = {
  [ProjectRole.OWNER]: [
    DocumentManagementPermission.VIEW_DOCUMENTS,
    DocumentManagementPermission.UPLOAD_DOCUMENTS,
    DocumentManagementPermission.EDIT_DOCUMENTS,
    DocumentManagementPermission.DELETE_DOCUMENTS,
    DocumentManagementPermission.DOWNLOAD_DOCUMENTS,
    DocumentManagementPermission.MANAGE_VERSIONS,
    DocumentManagementPermission.MANAGE_COMMENTS,
    DocumentManagementPermission.APPROVE_DOCUMENTS,
    DocumentManagementPermission.MANAGE_PERMISSIONS,
    DocumentManagementPermission.EXPORT_DOCUMENTS
  ],
  [ProjectRole.ADMIN]: [
    DocumentManagementPermission.VIEW_DOCUMENTS,
    DocumentManagementPermission.UPLOAD_DOCUMENTS,
    DocumentManagementPermission.EDIT_DOCUMENTS,
    DocumentManagementPermission.DELETE_DOCUMENTS,
    DocumentManagementPermission.DOWNLOAD_DOCUMENTS,
    DocumentManagementPermission.MANAGE_VERSIONS,
    DocumentManagementPermission.MANAGE_COMMENTS,
    DocumentManagementPermission.APPROVE_DOCUMENTS,
    DocumentManagementPermission.EXPORT_DOCUMENTS
  ],
  [ProjectRole.MANAGER]: [
    DocumentManagementPermission.VIEW_DOCUMENTS,
    DocumentManagementPermission.UPLOAD_DOCUMENTS,
    DocumentManagementPermission.EDIT_DOCUMENTS,
    DocumentManagementPermission.DOWNLOAD_DOCUMENTS,
    DocumentManagementPermission.MANAGE_COMMENTS,
    DocumentManagementPermission.APPROVE_DOCUMENTS
  ],
  [ProjectRole.ENGINEER]: [
    DocumentManagementPermission.VIEW_DOCUMENTS,
    DocumentManagementPermission.UPLOAD_DOCUMENTS,
    DocumentManagementPermission.EDIT_DOCUMENTS,
    DocumentManagementPermission.DOWNLOAD_DOCUMENTS,
    DocumentManagementPermission.MANAGE_COMMENTS
  ],
  [ProjectRole.CONTRACTOR]: [
    DocumentManagementPermission.VIEW_DOCUMENTS,
    DocumentManagementPermission.DOWNLOAD_DOCUMENTS,
    DocumentManagementPermission.MANAGE_COMMENTS
  ],
  [ProjectRole.VIEWER]: [
    DocumentManagementPermission.VIEW_DOCUMENTS,
    DocumentManagementPermission.DOWNLOAD_DOCUMENTS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    DocumentManagementPermission.VIEW_DOCUMENTS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface DocumentManagementApi {
  // 文檔管理
  POST /api/projects/{projectId}/documents     // 上傳文檔
  GET /api/projects/{projectId}/documents      // 獲取文檔列表
  GET /api/documents/{documentId}              // 獲取文檔詳情
  PATCH /api/documents/{documentId}            // 更新文檔
  DELETE /api/documents/{documentId}           // 刪除文檔
  
  // 文檔搜尋
  GET /api/projects/{projectId}/documents/search // 搜尋文檔
  GET /api/projects/{projectId}/documents/filter // 篩選文檔
  
  // 版本管理
  POST /api/documents/{documentId}/versions    // 創建版本
  GET /api/documents/{documentId}/versions     // 獲取版本列表
  GET /api/versions/{versionId}                 // 獲取版本詳情
  
  // 評論管理
  POST /api/documents/{documentId}/comments    // 添加評論
  GET /api/documents/{documentId}/comments     // 獲取評論列表
  PATCH /api/comments/{commentId}              // 更新評論
  DELETE /api/comments/{commentId}             // 刪除評論
  
  // 下載和預覽
  GET /api/documents/{documentId}/download     // 下載文檔
  GET /api/documents/{documentId}/preview      // 預覽文檔
  GET /api/documents/{documentId}/thumbnail    // 獲取縮圖
}

// 請求/響應類型
interface CreateDocumentRequest {
  projectId: string;
  name: string;
  fileName: string;
  fileSize: number;
  fileType: DocumentType;
  mimeType: string;
  downloadURL: string;
  category: DocumentCategory;
  tags: string[];
  visibility: DocumentVisibility;
  permissions: DocumentPermissions;
  metadata: DocumentMetadata;
}

interface CreateCommentRequest {
  content: string;
  position?: CommentPosition;
}

interface DocumentMetadata {
  author?: string;
  title?: string;
  subject?: string;
  keywords?: string[];
  customProperties: Record<string, any>;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const documentConfig = {
  maxFileSize: parseInt(process.env.MAX_DOCUMENT_FILE_SIZE || '100') * 1024 * 1024, // MB
  supportedFormats: process.env.DOCUMENT_SUPPORTED_FORMATS?.split(',') || ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
  enableVersionControl: process.env.ENABLE_DOCUMENT_VERSION_CONTROL === 'true',
  enableComments: process.env.ENABLE_DOCUMENT_COMMENTS === 'true',
  enableApprovalWorkflow: process.env.ENABLE_DOCUMENT_APPROVAL === 'true',
  maxVersionsPerDocument: parseInt(process.env.MAX_VERSIONS_PER_DOCUMENT || '50'),
  thumbnailGeneration: process.env.ENABLE_THUMBNAIL_GENERATION === 'true'
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 文檔上傳功能
- [ ] 版本控制系統
- [ ] 文檔預覽功能
- [ ] 評論系統
- [ ] 權限控制實現
- [ ] 搜尋和篩選
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成