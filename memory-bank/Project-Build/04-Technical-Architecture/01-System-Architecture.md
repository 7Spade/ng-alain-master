# 技術架構總覽

## 📋 架構概述

Project-Build 專案管理框架採用現代化的技術架構，基於 Angular 20 + ng-alain + ng-zorro-antd 構建，提供完整的專案管理解決方案。

### 🎯 技術目標
- 採用微服務架構，支持水平擴展
- 使用現代化前端技術棧
- 實現前後端分離
- 支持容器化部署
- 提供完整的監控和日誌

## 🏗️ 整體架構

## 🏗️ 整體架構

### 系統架構圖
```
┌─────────────────────────────────────────────────────────────┐
│                    Client Layer (Angular 20)                │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Project   │  │     BIM      │  │    Cost     │         │
│  │ Management  │  │ Management  │  │ Management  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Task     │  │  Document    │  │  Progress   │         │
│  │  Workflow   │  │ Management   │  │  Tracking   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Service Layer (Firebase)                 │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Firebase  │  │  Firebase   │  │  Firebase   │         │
│  │    Auth     │  │  Firestore  │  │  Storage    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Firebase   │  │  Firebase   │  │  Firebase   │         │
│  │ Data Connect│  │  Functions  │  │  Analytics  │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
├─────────────────────────────────────────────────────────────┤
│                    Data Layer (PostgreSQL)                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │  Projects   │  │    BIM      │  │    Cost     │         │
│  │   Tables    │  │   Models    │  │   Tables    │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │    Task     │  │  Document   │  │  Progress  │         │
│  │   Tables    │  │   Tables    │  │   Tables   │         │
│  └─────────────┘  └─────────────┘  └─────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 技術實現細節

### Angular 20 現代化特性
```typescript
// 使用 Angular 20 的 inject() 函數
export class ProjectService {
  private firestore = inject(Firestore);
  private storage = inject(AngularFireStorage);
  private authService = inject(AuthService);
  
  // 使用 standalone components
  @Component({
    selector: 'app-project-card',
    standalone: true,
    imports: [CommonModule, NzCardModule, NzButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class ProjectCardComponent {
    // 組件實現
  }
}

// 使用 provideHttpClient 和 provideRouter
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideTanStackQuery(new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5 minutes
          cacheTime: 10 * 60 * 1000, // 10 minutes
        },
      },
    }))
  ]
};
```

### Firebase 完整集成
```typescript
// Firebase 配置
export const firebaseConfig = {
  apiKey: "AIzaSyCJ-eayGjJwBKsNIh3oEAG2GjbfTrvAMEI",
  authDomain: "elite-chiller-455712-c4.firebaseapp.com",
  projectId: "elite-chiller-455712-c4",
  storageBucket: "elite-chiller-455712-c4.firebasestorage.app",
  messagingSenderId: "7807661688",
  appId: "1:7807661688:web:ff2a2fcd4ff3d8451d1f8d",
  measurementId: "G-CY8DV4DD7J"
};

// Firebase 服務集成
export class FirebaseIntegrationService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private storage = inject(Storage);
  private analytics = inject(Analytics);
  private appCheck = inject(AppCheck);
  
  // 實時數據同步
  subscribeToProjects(): Observable<Project[]> {
    const projectsRef = collection(this.firestore, 'projects');
    const q = query(projectsRef, orderBy('updatedAt', 'desc'));
    
    return new Observable(subscriber => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const projects = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Project));
        subscriber.next(projects);
      }, (error) => {
        subscriber.error(error);
      });
      
      return () => unsubscribe();
    });
  }
  
  // 文件上傳
  uploadFile(file: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);
    
    return new Observable(subscriber => {
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          subscriber.next({ progress, status: 'uploading' });
        },
        (error) => {
          subscriber.error(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            subscriber.next({ downloadURL, status: 'completed' });
            subscriber.complete();
          });
        }
      );
    });
  }
}
```

### PostgreSQL 數據庫設計
```sql
-- 專案表
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PLANNING',
    visibility VARCHAR(20) NOT NULL DEFAULT 'PRIVATE',
    avatar VARCHAR(255),
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_by UUID NOT NULL,
    organization_id UUID,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 專案成員表
CREATE TABLE project_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_id UUID NOT NULL,
    role VARCHAR(50) NOT NULL,
    permissions JSONB DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    invited_by UUID,
    UNIQUE(project_id, user_id)
);

-- BIM 模型表
CREATE TABLE bim_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT NOT NULL,
    file_format VARCHAR(20) NOT NULL,
    download_url VARCHAR(500),
    status VARCHAR(20) NOT NULL DEFAULT 'UPLOADING',
    upload_progress INTEGER DEFAULT 0,
    processing_progress INTEGER DEFAULT 0,
    uploaded_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 成本項目表
CREATE TABLE cost_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    unit VARCHAR(50),
    quantity DECIMAL(15,2),
    unit_price DECIMAL(15,2),
    total_price DECIMAL(15,2),
    status VARCHAR(20) NOT NULL DEFAULT 'PLANNED',
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 任務表
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'TODO',
    priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
    assignee_id UUID,
    due_date TIMESTAMP,
    estimated_hours DECIMAL(8,2),
    actual_hours DECIMAL(8,2),
    progress INTEGER DEFAULT 0,
    created_by UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 創建索引
CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_organization_id ON projects(organization_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_updated_at ON projects(updated_at);

CREATE INDEX idx_project_members_project_id ON project_members(project_id);
CREATE INDEX idx_project_members_user_id ON project_members(user_id);
CREATE INDEX idx_project_members_status ON project_members(status);

CREATE INDEX idx_bim_models_project_id ON bim_models(project_id);
CREATE INDEX idx_bim_models_status ON bim_models(status);
CREATE INDEX idx_bim_models_uploaded_by ON bim_models(uploaded_by);

CREATE INDEX idx_cost_items_project_id ON cost_items(project_id);
CREATE INDEX idx_cost_items_category ON cost_items(category);
CREATE INDEX idx_cost_items_status ON cost_items(status);

CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_tasks_assignee_id ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

### 性能優化策略
```typescript
// 虛擬滾動實現
@Component({
  selector: 'app-project-list',
  template: `
    <cdk-virtual-scroll-viewport 
      itemSize="200" 
      class="viewport"
      [dataSource]="dataSource">
      <div *cdkVirtualFor="let project of dataSource.data" 
           class="project-item">
        <app-project-card [project]="project"></app-project-card>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
      width: 100%;
    }
    
    .project-item {
      height: 200px;
      padding: 8px;
    }
  `]
})
export class ProjectListComponent {
  dataSource = new DataSource<Project>();
  
  constructor() {
    this.dataSource.data = this.projects;
  }
}

// 懶加載實現
const routes: Routes = [
  {
    path: 'project-build',
    loadChildren: () => import('./routes/project-build/project-build.module')
      .then(m => m.ProjectBuildModule)
  },
  {
    path: 'project-build/bim',
    loadChildren: () => import('./routes/project-build/bim-management/bim-management.module')
      .then(m => m.BIMManagementModule)
  },
  {
    path: 'project-build/cost',
    loadChildren: () => import('./routes/project-build/cost-management/cost-management.module')
      .then(m => m.CostManagementModule)
  }
];

// 緩存策略
@Injectable()
export class ProjectCacheService {
  private cache = new Map<string, any>();
  private cacheTimeout = 5 * 60 * 1000; // 5 minutes
  
  set(key: string, value: any): void {
    this.cache.set(key, {
      value,
      timestamp: Date.now()
    });
  }
  
  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.value;
  }
  
  clear(): void {
    this.cache.clear();
  }
}
```

### 安全措施
```typescript
// 權限守衛
@Injectable()
export class ProjectAccessGuard implements CanActivate {
  private authService = inject(AuthService);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const projectId = route.params['id'];
    const requiredPermission = route.data['permission'];
    
    return this.authService.getCurrentUser().pipe(
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return of(false);
        }
        
        return this.projectService.checkProjectAccess(projectId, user.uid, requiredPermission);
      }),
      catchError(() => {
        this.router.navigate(['/unauthorized']);
        return of(false);
      })
    );
  }
}

// 數據驗證
export class ProjectValidator {
  static validateProject(project: Project): ValidationResult {
    const errors: string[] = [];
    
    if (!project.name || project.name.trim().length === 0) {
      errors.push('專案名稱不能為空');
    }
    
    if (project.name && project.name.length > 100) {
      errors.push('專案名稱不能超過100個字符');
    }
    
    if (project.description && project.description.length > 500) {
      errors.push('專案描述不能超過500個字符');
    }
    
    if (project.startDate && project.endDate && project.startDate > project.endDate) {
      errors.push('開始日期不能晚於結束日期');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

// XSS 防護
@Injectable()
export class SanitizationService {
  private sanitizer = inject(DomSanitizer);
  
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }
  
  sanitizeUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
```

### 監控和日誌
```typescript
// 性能監控
@Injectable()
export class PerformanceMonitoringService {
  private analytics = inject(Analytics);
  
  trackPageView(pageName: string): void {
    logEvent(this.analytics, 'page_view', {
      page_title: pageName,
      page_location: window.location.href
    });
  }
  
  trackUserAction(action: string, category: string, label?: string): void {
    logEvent(this.analytics, 'user_action', {
      action,
      category,
      label
    });
  }
  
  trackProjectCreation(projectType: string): void {
    logEvent(this.analytics, 'project_created', {
      project_type: projectType,
      timestamp: new Date().toISOString()
    });
  }
}

// 錯誤監控
@Injectable()
export class ErrorMonitoringService {
  private analytics = inject(Analytics);
  
  logError(error: Error, context?: any): void {
    logEvent(this.analytics, 'error_occurred', {
      error_message: error.message,
      error_stack: error.stack,
      context: JSON.stringify(context),
      timestamp: new Date().toISOString()
    });
  }
  
  logApiError(endpoint: string, status: number, error: any): void {
    logEvent(this.analytics, 'api_error', {
      endpoint,
      status,
      error_message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}
```

## 📊 數據架構

### 數據庫設計
- **PostgreSQL**: 核心業務數據
- **Redis**: 緩存和會話
- **MongoDB**: 文檔和日誌
- **Elasticsearch**: 搜索和分析

### 數據流
1. 前端請求 → API 網關
2. API 網關 → 微服務
3. 微服務 → 數據庫
4. 數據庫 → 緩存
5. 緩存 → 前端響應

## 🔐 安全架構

### 認證授權
- JWT Token 認證
- RBAC 權限控制
- OAuth 2.0 集成
- 多因素認證

### 數據安全
- 數據加密
- 傳輸加密
- 訪問控制
- 審計日誌

## 📈 性能優化

### 前端優化
- 懶加載
- 虛擬滾動
- 圖片優化
- 代碼分割

### 後端優化
- 數據庫索引
- 查詢優化
- 緩存策略
- 連接池

## 🚀 部署架構

### 環境配置
- 開發環境
- 測試環境
- 預發布環境
- 生產環境

### 部署策略
- 藍綠部署
- 滾動更新
- 金絲雀部署
- 自動回滾

## 📊 監控架構

### 應用監控
- 性能指標
- 錯誤追蹤
- 用戶行為
- 業務指標

### 基礎設施監控
- 服務器監控
- 網絡監控
- 存儲監控
- 安全監控

## 🔄 擴展性設計

### 水平擴展
- 微服務拆分
- 負載均衡
- 數據分片
- 緩存集群

### 垂直擴展
- 資源優化
- 性能調優
- 架構重構
- 技術升級

---

**📋 技術架構檢查清單**
- [ ] 整體架構設計完成
- [ ] 技術棧選型完成
- [ ] 數據架構設計完成
- [ ] 安全架構設計完成
- [ ] 性能優化策略完成
- [ ] 部署架構設計完成
- [ ] 監控架構設計完成
- [ ] 擴展性設計完成