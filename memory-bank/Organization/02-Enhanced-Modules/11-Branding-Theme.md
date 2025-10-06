# 🎨 品牌主題模組

## 📋 模組概述

品牌主題模組負責組織的品牌形象管理、主題自定義、UI 樣式配置等功能，提供完整的品牌定製和主題管理能力。

### 🎯 功能目標
- 提供完整的品牌形象管理
- 支持主題自定義和切換
- 實現 UI 組件樣式配置
- 提供品牌資源管理

## 🏗️ 功能架構

### 核心功能
```
品牌主題模組
├── 品牌形象管理
│   ├── Logo 管理
│   ├── 品牌色彩配置
│   ├── 字體配置
│   └── 品牌資源庫
├── 主題管理
│   ├── 主題創建和編輯
│   ├── 主題預覽
│   ├── 主題切換
│   └── 主題版本管理
├── 樣式配置
│   ├── CSS 變量管理
│   ├── 組件樣式配置
│   ├── 響應式設計
│   └── 動畫效果配置
├── 資源管理
│   ├── 圖片資源管理
│   ├── 字體資源管理
│   ├── 圖標資源管理
│   └── 媒體資源管理
└── 品牌指南
    ├── 品牌規範文檔
    ├── 使用指南
    ├── 最佳實踐
    └── 品牌檢查工具
```

## 📊 數據結構設計

### 主題實體 (Theme)
```typescript
interface Theme {
  id: string;                           // 主題唯一標識
  name: string;                         // 主題名稱
  description?: string;                 // 主題描述
  type: ThemeType;                      // 主題類型
  status: ThemeStatus;                  // 主題狀態
  branding: BrandingConfig;             // 品牌配置
  colors: ColorPalette;                 // 顏色配置
  typography: TypographyConfig;         // 字體配置
  layout: LayoutConfig;                 // 佈局配置
  components: ComponentStyleConfig[];   // 組件樣式配置
  animations: AnimationConfig[];        // 動畫配置
  variables: CSSVariable[];             // CSS 變量
  organizationId: string;               // 所屬組織
  isDefault: boolean;                   // 是否為默認主題
  isPublic: boolean;                    // 是否公開
  createdBy: string;                    // 創建者
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum ThemeType {
  LIGHT = 'light',                      // 淺色主題
  DARK = 'dark',                        // 深色主題
  HIGH_CONTRAST = 'high_contrast',      // 高對比度主題
  CUSTOM = 'custom'                     // 自定義主題
}

enum ThemeStatus {
  DRAFT = 'draft',                      // 草稿
  ACTIVE = 'active',                    // 活躍
  ARCHIVED = 'archived'                 // 已歸檔
}

interface BrandingConfig {
  logo: LogoConfig;                     // Logo 配置
  favicon: FaviconConfig;               // 網站圖標配置
  brandColors: BrandColors;             // 品牌色彩
  brandFonts: BrandFonts;               // 品牌字體
  brandAssets: BrandAsset[];            // 品牌資源
}

interface LogoConfig {
  primary: string;                      // 主要 Logo
  secondary?: string;                   // 次要 Logo
  icon?: string;                        // 圖標 Logo
  darkMode?: string;                    // 深色模式 Logo
  sizes: LogoSize[];                    // Logo 尺寸
}

interface ColorPalette {
  primary: ColorGroup;                  // 主色調
  secondary: ColorGroup;                // 輔助色調
  neutral: ColorGroup;                  // 中性色調
  semantic: SemanticColors;             // 語義色彩
  gradients: GradientConfig[];          // 漸變配置
}

interface ColorGroup {
  base: string;                         // 基礎色
  light: string;                        // 淺色
  lighter: string;                      // 更淺色
  dark: string;                         // 深色
  darker: string;                       // 更深色
  contrast: string;                     // 對比色
}

interface TypographyConfig {
  fontFamily: FontFamilyConfig;         // 字體族配置
  fontSize: FontSizeConfig;             // 字體大小配置
  fontWeight: FontWeightConfig;         // 字體粗細配置
  lineHeight: LineHeightConfig;         // 行高配置
  letterSpacing: LetterSpacingConfig;   // 字間距配置
}

interface CSSVariable {
  name: string;                         // 變量名
  value: string;                        // 變量值
  description?: string;                 // 變量描述
  category: string;                     // 變量分類
  type: 'color' | 'size' | 'spacing' | 'typography' | 'other';
}
```

## 🧩 Angular 組件設計

### 主題管理主組件
```typescript
@Component({
  selector: 'app-theme-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, STModule],
  template: `
    <div class="theme-management">
      <se-container>
        <se label="主題名稱">
          <input nz-input [(ngModel)]="searchForm.name" placeholder="搜索主題名稱" />
        </se>
        <se label="主題類型">
          <nz-select [(ngModel)]="searchForm.type" nzAllowClear>
            <nz-option *ngFor="let type of themeTypes" [nzValue]="type.value" [nzLabel]="type.label"></nz-option>
          </nz-select>
        </se>
        <se label="狀態">
          <nz-select [(ngModel)]="searchForm.status" nzAllowClear>
            <nz-option *ngFor="let status of themeStatuses" [nzValue]="status.value" [nzLabel]="status.label"></nz-option>
          </nz-select>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="search()">搜索</button>
          <button nz-button (click)="reset()">重置</button>
          <button nz-button nzType="primary" (click)="createTheme()">創建主題</button>
        </se>
      </se-container>
      
      <st
        [data]="themes"
        [columns]="columns"
        [page]="{ front: false, show: true, showSize: true }"
        (change)="onTableChange($event)"
        (refresh)="loadThemes()">
      </st>
    </div>
  `
})
export class ThemeManagementComponent implements OnInit {
  private readonly themeService = inject(ThemeService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  searchForm = {
    name: '',
    type: null,
    status: null
  };
  
  themes: Theme[] = [];
  themeTypes = [
    { value: ThemeType.LIGHT, label: '淺色主題' },
    { value: ThemeType.DARK, label: '深色主題' },
    { value: ThemeType.HIGH_CONTRAST, label: '高對比度主題' },
    { value: ThemeType.CUSTOM, label: '自定義主題' }
  ];
  
  themeStatuses = [
    { value: ThemeStatus.DRAFT, label: '草稿' },
    { value: ThemeStatus.ACTIVE, label: '活躍' },
    { value: ThemeStatus.ARCHIVED, label: '已歸檔' }
  ];
  
  columns: STColumn[] = [
    { title: '主題名稱', index: 'name', width: 200 },
    { title: '類型', index: 'type', width: 100, type: 'tag' },
    { title: '狀態', index: 'status', width: 100, type: 'tag' },
    { title: '默認', index: 'isDefault', width: 80, type: 'yn' },
    { title: '公開', index: 'isPublic', width: 80, type: 'yn' },
    { title: '創建時間', index: 'createdAt', width: 150, type: 'date' },
    {
      title: '操作',
      width: 250,
      buttons: [
        {
          text: '預覽',
          click: (record: Theme) => this.previewTheme(record)
        },
        {
          text: '編輯',
          click: (record: Theme) => this.editTheme(record)
        },
        {
          text: '應用',
          click: (record: Theme) => this.applyTheme(record)
        },
        {
          text: '複製',
          click: (record: Theme) => this.cloneTheme(record)
        }
      ]
    }
  ];
  
  ngOnInit() {
    this.loadThemes();
  }
  
  loadThemes() {
    this.themeService.getThemes(this.searchForm).subscribe({
      next: (themes) => this.themes = themes,
      error: (error) => this.message.error('載入主題失敗')
    });
  }
  
  createTheme() {
    this.modal.create({
      nzTitle: '創建主題',
      nzContent: AppCreateThemeModalComponent,
      nzFooter: null,
      nzWidth: 1000,
      nzOnOk: () => {
        this.loadThemes();
        return true;
      }
    });
  }
  
  previewTheme(theme: Theme) {
    this.modal.create({
      nzTitle: `主題預覽 - ${theme.name}`,
      nzContent: AppThemePreviewModalComponent,
      nzComponentParams: { theme },
      nzFooter: null,
      nzWidth: 1200
    });
  }
  
  editTheme(theme: Theme) {
    this.modal.create({
      nzTitle: '編輯主題',
      nzContent: AppEditThemeModalComponent,
      nzComponentParams: { theme },
      nzFooter: null,
      nzWidth: 1000,
      nzOnOk: () => {
        this.loadThemes();
        return true;
      }
    });
  }
  
  applyTheme(theme: Theme) {
    this.themeService.applyTheme(theme.id).subscribe({
      next: () => {
        this.message.success('主題已應用');
        this.loadThemes();
      }
    });
  }
  
  cloneTheme(theme: Theme) {
    this.themeService.cloneTheme(theme.id).subscribe({
      next: (newTheme) => {
        this.message.success('主題已複製');
        this.loadThemes();
      }
    });
  }
  
  search() {
    this.loadThemes();
  }
  
  reset() {
    this.searchForm = { name: '', type: null, status: null };
    this.loadThemes();
  }
  
  onTableChange(event: STChange) {
    // 處理表格變化
  }
}
```

## 🔧 服務層設計

### 主題服務 (ThemeService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/themes';
  
  // 獲取主題列表
  getThemes(params?: any): Observable<Theme[]> {
    return this.http.get<Theme[]>(this.API_BASE, { params });
  }
  
  // 創建主題
  createTheme(theme: Partial<Theme>): Observable<Theme> {
    return this.http.post<Theme>(this.API_BASE, theme).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 更新主題
  updateTheme(id: string, theme: Partial<Theme>): Observable<Theme> {
    return this.http.put<Theme>(`${this.API_BASE}/${id}`, theme).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 刪除主題
  deleteTheme(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE}/${id}`).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 應用主題
  applyTheme(id: string): Observable<void> {
    return this.http.post<void>(`${this.API_BASE}/${id}/apply`, {}).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 複製主題
  cloneTheme(id: string): Observable<Theme> {
    return this.http.post<Theme>(`${this.API_BASE}/${id}/clone`, {}).pipe(
      tap(() => this.cache.clear())
    );
  }
  
  // 獲取當前主題
  getCurrentTheme(): Observable<Theme> {
    return this.cache.get('current-theme', () =>
      this.http.get<Theme>(`${this.API_BASE}/current`)
    );
  }
  
  // 預覽主題
  previewTheme(id: string): Observable<ThemePreview> {
    return this.http.get<ThemePreview>(`${this.API_BASE}/${id}/preview`);
  }
  
  // 導出主題
  exportTheme(id: string): Observable<Blob> {
    return this.http.get(`${this.API_BASE}/${id}/export`, { responseType: 'blob' });
  }
  
  // 導入主題
  importTheme(file: File): Observable<Theme> {
    const formData = new FormData();
    formData.append('file', file);
    
    return this.http.post<Theme>(`${this.API_BASE}/import`, formData).pipe(
      tap(() => this.cache.clear())
    );
  }
}

interface ThemePreview {
  theme: Theme;
  previewUrl: string;
  screenshots: string[];
  components: ComponentPreview[];
}

interface ComponentPreview {
  name: string;
  preview: string;
  styles: Record<string, any>;
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('ThemeService', () => {
  let service: ThemeService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThemeService]
    });
    service = TestBed.inject(ThemeService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create theme successfully', () => {
    const theme: Partial<Theme> = {
      name: 'Test Theme',
      type: ThemeType.LIGHT,
      status: ThemeStatus.DRAFT
    };
    
    service.createTheme(theme).subscribe(result => {
      expect(result.name).toBe('Test Theme');
    });
    
    const req = httpMock.expectOne('/api/themes');
    expect(req.request.method).toBe('POST');
    req.flush({ ...theme, id: '1' });
  });
});
```

## ⚡ 性能優化

### 主題緩存策略
```typescript
@Injectable({
  providedIn: 'root'
})
export class ThemeCacheService {
  private readonly cache = inject(DelonCacheService);
  private readonly CACHE_EXPIRE = 60 * 60 * 1000; // 1小時
  
  // 緩存主題
  cacheTheme(theme: Theme): void {
    this.cache.set(`theme-${theme.id}`, theme, { expire: this.CACHE_EXPIRE });
  }
  
  // 獲取緩存的主題
  getCachedTheme(id: string): Theme | null {
    return this.cache.get(`theme-${id}`);
  }
  
  // 預載入主題
  preloadThemes(): Observable<void> {
    return this.themeService.getThemes().pipe(
      tap(themes => {
        themes.forEach(theme => this.cacheTheme(theme));
      }),
      map(() => void 0)
    );
  }
}
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// 主題管理 API
GET    /api/themes                       // 獲取主題列表
POST   /api/themes                       // 創建主題
GET    /api/themes/:id                   // 獲取主題詳情
PUT    /api/themes/:id                   // 更新主題
DELETE /api/themes/:id                   // 刪除主題
POST   /api/themes/:id/apply             // 應用主題
POST   /api/themes/:id/clone             // 複製主題
GET    /api/themes/:id/preview           // 預覽主題
GET    /api/themes/:id/export            // 導出主題
POST   /api/themes/import                // 導入主題
GET    /api/themes/current               // 獲取當前主題

// 品牌資源 API
GET    /api/brand-assets                 // 獲取品牌資源列表
POST   /api/brand-assets                 // 上傳品牌資源
GET    /api/brand-assets/:id             // 獲取品牌資源詳情
DELETE /api/brand-assets/:id             // 刪除品牌資源
```

## 📊 成功指標

### 功能指標
- [ ] 支持 4 種主題類型
- [ ] 支持主題實時預覽
- [ ] 支持主題導入/導出
- [ ] 支持品牌資源管理
- [ ] 支持主題版本控制

### 性能指標
- [ ] 主題切換時間 < 1 秒
- [ ] 主題預覽載入時間 < 2 秒
- [ ] 支持主題緩存
- [ ] 支持主題批量操作

### 用戶體驗指標
- [ ] 主題預覽準確率 > 95%
- [ ] 支持主題實時編輯
- [ ] 支持主題響應式設計
- [ ] 提供主題使用指南

---

**📝 注意**: 本模組需要與組織設置模組深度集成，確保品牌主題的一致性和可管理性。