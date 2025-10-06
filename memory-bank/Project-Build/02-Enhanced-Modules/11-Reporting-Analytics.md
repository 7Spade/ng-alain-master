# 11️⃣ 報告分析模組

## 📋 模組概述

報告分析模組提供專案數據的全面分析和報告功能，包括數據可視化、自定義報告、儀表板、趨勢分析、預測分析等功能。此模組是 Project-Build 系統的數據洞察核心組件。

### 🎯 功能目標
- 實現多維度數據分析和可視化
- 提供自定義報告生成和模板管理
- 支持實時儀表板和關鍵指標監控
- 實現趨勢分析和預測功能
- 整合所有模組的數據進行綜合分析

## 🏗️ 功能架構

### 核心功能
```
報告分析模組
├── 數據可視化
│   ├── 圖表生成
│   ├── 儀表板設計
│   ├── 交互式圖表
│   └── 數據探索
├── 報告生成
│   ├── 自定義報告
│   ├── 報告模板
│   ├── 定期報告
│   └── 報告分發
├── 趨勢分析
│   ├── 時間序列分析
│   ├── 趨勢識別
│   ├── 異常檢測
│   └── 模式分析
├── 預測分析
│   ├── 進度預測
│   ├── 成本預測
│   ├── 風險預測
│   └── 資源預測
└── 智能洞察
    ├── 自動分析
    ├── 異常告警
    ├── 建議生成
    └── 決策支持
```

## 📊 數據結構設計

### 報告實體 (Report)
```typescript
interface Report {
  id: string;                    // 報告唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 報告名稱
  description?: string;           // 報告描述
  type: ReportType;              // 報告類型
  category: ReportCategory;      // 報告分類
  status: ReportStatus;          // 報告狀態
  template: ReportTemplate;      // 報告模板
  data: ReportData;              // 報告數據
  visualizations: Visualization[]; // 可視化組件
  filters: ReportFilter[];        // 報告篩選器
  schedule: ReportSchedule;      // 報告排程
  permissions: ReportPermission[]; // 報告權限
  version: string;               // 版本號
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
  lastGeneratedAt?: Date;        // 最後生成時間
}

enum ReportType {
  DASHBOARD = 'dashboard',       // 儀表板
  SUMMARY = 'summary',           // 摘要報告
  DETAILED = 'detailed',         // 詳細報告
  ANALYTICAL = 'analytical',     // 分析報告
  PREDICTIVE = 'predictive',     // 預測報告
  COMPARATIVE = 'comparative',    // 比較報告
  TREND = 'trend'               // 趨勢報告
}

enum ReportCategory {
  PROJECT_OVERVIEW = 'project_overview', // 專案概覽
  PROGRESS_TRACKING = 'progress_tracking', // 進度追蹤
  COST_ANALYSIS = 'cost_analysis', // 成本分析
  QUALITY_METRICS = 'quality_metrics', // 品質指標
  RESOURCE_UTILIZATION = 'resource_utilization', // 資源利用
  RISK_ASSESSMENT = 'risk_assessment', // 風險評估
  TEAM_PERFORMANCE = 'team_performance', // 團隊績效
  COMPLIANCE = 'compliance'      // 合規報告
}

enum ReportStatus {
  DRAFT = 'draft',               // 草稿
  PUBLISHED = 'published',       // 已發布
  ARCHIVED = 'archived',         // 已封存
  SCHEDULED = 'scheduled'        // 已排程
}

interface ReportTemplate {
  id: string;                    // 模板唯一標識
  name: string;                  // 模板名稱
  description: string;            // 模板描述
  category: ReportCategory;       // 模板分類
  layout: TemplateLayout;        // 模板佈局
  sections: TemplateSection[];   // 模板區段
  styles: TemplateStyles;        // 模板樣式
  isDefault: boolean;            // 是否為預設模板
  isPublic: boolean;             // 是否公開
  version: string;               // 版本號
  createdAt: Date;              // 創建時間
  createdBy: string;            // 創建者 ID
}

interface TemplateLayout {
  id: string;                    // 佈局唯一標識
  name: string;                  // 佈局名稱
  columns: number;              // 欄位數
  rows: number;                 // 行數
  grid: GridCell[];             // 網格單元
  responsive: boolean;          // 是否響應式
}

interface GridCell {
  id: string;                    // 單元唯一標識
  x: number;                    // X 座標
  y: number;                    // Y 座標
  width: number;                // 寬度
  height: number;               // 高度
  component: string;            // 組件類型
  data: any;                    // 組件數據
}

interface TemplateSection {
  id: string;                    // 區段唯一標識
  name: string;                  // 區段名稱
  type: SectionType;            // 區段類型
  order: number;                // 順序
  content: SectionContent;       // 區段內容
  styles: SectionStyles;        // 區段樣式
}

enum SectionType {
  HEADER = 'header',             // 標題區段
  SUMMARY = 'summary',           // 摘要區段
  CHART = 'chart',              // 圖表區段
  TABLE = 'table',              // 表格區段
  TEXT = 'text',                // 文字區段
  IMAGE = 'image',              // 圖片區段
  FOOTER = 'footer'             // 頁腳區段
}

interface SectionContent {
  id: string;                    // 內容唯一標識
  title?: string;               // 標題
  text?: string;                // 文字內容
  dataSource: DataSource;       // 數據源
  visualization?: Visualization; // 可視化組件
  table?: TableConfig;          // 表格配置
  image?: ImageConfig;          // 圖片配置
}

interface DataSource {
  id: string;                    // 數據源唯一標識
  type: DataSourceType;         // 數據源類型
  connection: DataConnection;    // 數據連接
  query: DataQuery;              // 數據查詢
  cache: CacheConfig;           // 快取配置
}

enum DataSourceType {
  DATABASE = 'database',         // 資料庫
  API = 'api',                  // API
  FILE = 'file',               // 文件
  CALCULATED = 'calculated'     // 計算字段
}

interface DataConnection {
  id: string;                    // 連接唯一標識
  name: string;                 // 連接名稱
  type: ConnectionType;         // 連接類型
  host: string;                 // 主機
  port: number;                 // 端口
  database: string;             // 資料庫
  username: string;             // 用戶名
  password: string;             // 密碼
  ssl: boolean;                 // SSL
  timeout: number;              // 超時時間
}

enum ConnectionType {
  POSTGRESQL = 'postgresql',     // PostgreSQL
  MYSQL = 'mysql',              // MySQL
  MONGODB = 'mongodb',          // MongoDB
  REDIS = 'redis',              // Redis
  REST_API = 'rest_api',        // REST API
  GRAPHQL = 'graphql'           // GraphQL
}

interface DataQuery {
  id: string;                    // 查詢唯一標識
  sql?: string;                 // SQL 查詢
  apiEndpoint?: string;          // API 端點
  parameters: QueryParameter[]; // 查詢參數
  filters: QueryFilter[];       // 查詢篩選器
  aggregations: Aggregation[];   // 聚合函數
  sorting: SortConfig[];         // 排序配置
  limit?: number;               // 限制數量
}

interface QueryParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  type: ParameterType;          // 參數類型
  value: any;                   // 參數值
  required: boolean;            // 是否必需
  defaultValue?: any;           // 預設值
}

enum ParameterType {
  STRING = 'string',             // 字串
  NUMBER = 'number',            // 數字
  DATE = 'date',                // 日期
  BOOLEAN = 'boolean',          // 布林值
  ARRAY = 'array'               // 陣列
}

interface QueryFilter {
  id: string;                    // 篩選器唯一標識
  field: string;                // 欄位名稱
  operator: FilterOperator;      // 篩選運算子
  value: any;                   // 篩選值
  logic: FilterLogic;           // 邏輯運算子
}

enum FilterOperator {
  EQUALS = 'equals',            // 等於
  NOT_EQUALS = 'not_equals',    // 不等於
  GREATER_THAN = 'greater_than', // 大於
  LESS_THAN = 'less_than',      // 小於
  CONTAINS = 'contains',         // 包含
  NOT_CONTAINS = 'not_contains', // 不包含
  IN = 'in',                    // 在...中
  NOT_IN = 'not_in',            // 不在...中
  IS_NULL = 'is_null',          // 為空
  IS_NOT_NULL = 'is_not_null'   // 不為空
}

enum FilterLogic {
  AND = 'and',                  // 且
  OR = 'or'                     // 或
}

interface Aggregation {
  id: string;                    // 聚合唯一標識
  field: string;                // 欄位名稱
  function: AggregationFunction; // 聚合函數
  alias?: string;               // 別名
}

enum AggregationFunction {
  COUNT = 'count',              // 計數
  SUM = 'sum',                  // 求和
  AVG = 'avg',                  // 平均值
  MIN = 'min',                  // 最小值
  MAX = 'max',                  // 最大值
  DISTINCT = 'distinct'         // 去重
}

interface SortConfig {
  id: string;                    // 排序唯一標識
  field: string;                // 欄位名稱
  direction: SortDirection;      // 排序方向
}

enum SortDirection {
  ASC = 'asc',                  // 升序
  DESC = 'desc'                 // 降序
}

interface CacheConfig {
  id: string;                    // 快取唯一標識
  enabled: boolean;             // 是否啟用
  ttl: number;                 // 生存時間
  strategy: CacheStrategy;       // 快取策略
}

enum CacheStrategy {
  LRU = 'lru',                  // 最近最少使用
  LFU = 'lfu',                  // 最少使用
  TTL = 'ttl'                   // 時間到期
}

interface Visualization {
  id: string;                    // 可視化唯一標識
  name: string;                  // 可視化名稱
  type: VisualizationType;       // 可視化類型
  data: VisualizationData;       // 可視化數據
  config: VisualizationConfig;   // 可視化配置
  interactions: Interaction[];   // 交互配置
  styles: VisualizationStyles;  // 可視化樣式
}

enum VisualizationType {
  LINE_CHART = 'line_chart',     // 折線圖
  BAR_CHART = 'bar_chart',       // 長條圖
  PIE_CHART = 'pie_chart',       // 圓餅圖
  SCATTER_PLOT = 'scatter_plot', // 散點圖
  AREA_CHART = 'area_chart',     // 面積圖
  HEATMAP = 'heatmap',          // 熱力圖
  GAUGE = 'gauge',              // 儀表
  TABLE = 'table',              // 表格
  KPI = 'kpi',                  // 關鍵指標
  MAP = 'map'                   // 地圖
}

interface VisualizationData {
  id: string;                    // 數據唯一標識
  source: DataSource;           // 數據源
  dimensions: Dimension[];       // 維度
  measures: Measure[];           // 度量
  filters: DataFilter[];        // 數據篩選器
}

interface Dimension {
  id: string;                    // 維度唯一標識
  name: string;                 // 維度名稱
  field: string;                // 欄位名稱
  type: DimensionType;           // 維度類型
  format: FormatConfig;         // 格式配置
}

enum DimensionType {
  CATEGORICAL = 'categorical',   // 分類
  TEMPORAL = 'temporal',        // 時間
  GEOGRAPHICAL = 'geographical', // 地理
  HIERARCHICAL = 'hierarchical' // 層級
}

interface Measure {
  id: string;                    // 度量唯一標識
  name: string;                 // 度量名稱
  field: string;                // 欄位名稱
  aggregation: AggregationFunction; // 聚合函數
  format: FormatConfig;         // 格式配置
}

interface FormatConfig {
  id: string;                    // 格式唯一標識
  type: FormatType;             // 格式類型
  pattern: string;              // 格式模式
  precision?: number;           // 精度
  currency?: string;            // 貨幣
  locale?: string;              // 地區
}

enum FormatType {
  NUMBER = 'number',            // 數字
  CURRENCY = 'currency',        // 貨幣
  PERCENTAGE = 'percentage',    // 百分比
  DATE = 'date',                // 日期
  TIME = 'time',                // 時間
  TEXT = 'text'                 // 文字
}

interface DataFilter {
  id: string;                    // 篩選器唯一標識
  dimension: string;            // 維度名稱
  operator: FilterOperator;      // 篩選運算子
  value: any;                   // 篩選值
}

interface VisualizationConfig {
  id: string;                    // 配置唯一標識
  title: string;                // 標題
  subtitle?: string;            // 副標題
  xAxis: AxisConfig;            // X 軸配置
  yAxis: AxisConfig;            // Y 軸配置
  legend: LegendConfig;         // 圖例配置
  tooltip: TooltipConfig;       // 提示框配置
  animation: AnimationConfig;    // 動畫配置
}

interface AxisConfig {
  id: string;                    // 軸配置唯一標識
  title: string;                // 軸標題
  min?: number;                 // 最小值
  max?: number;                 // 最大值
  format: FormatConfig;         // 格式配置
  grid: boolean;                // 是否顯示網格
  labels: boolean;              // 是否顯示標籤
}

interface LegendConfig {
  id: string;                    // 圖例配置唯一標識
  show: boolean;                // 是否顯示
  position: LegendPosition;      // 圖例位置
  orientation: LegendOrientation; // 圖例方向
}

enum LegendPosition {
  TOP = 'top',                  // 上方
  BOTTOM = 'bottom',           // 下方
  LEFT = 'left',               // 左方
  RIGHT = 'right'              // 右方
}

enum LegendOrientation {
  HORIZONTAL = 'horizontal',    // 水平
  VERTICAL = 'vertical'         // 垂直
}

interface TooltipConfig {
  id: string;                    // 提示框配置唯一標識
  show: boolean;                // 是否顯示
  trigger: TooltipTrigger;       // 觸發方式
  formatter?: string;           // 格式化函數
}

enum TooltipTrigger {
  ITEM = 'item',                // 項目
  AXIS = 'axis',               // 軸
  NONE = 'none'                // 無
}

interface AnimationConfig {
  id: string;                    // 動畫配置唯一標識
  enabled: boolean;            // 是否啟用
  duration: number;             // 動畫時長
  easing: EasingType;          // 緩動類型
}

enum EasingType {
  LINEAR = 'linear',            // 線性
  EASE_IN = 'easeIn',          // 緩入
  EASE_OUT = 'easeOut',        // 緩出
  EASE_IN_OUT = 'easeInOut'     // 緩入緩出
}

interface Interaction {
  id: string;                    // 交互唯一標識
  type: InteractionType;         // 交互類型
  target: string;               // 目標組件
  action: InteractionAction;     // 交互動作
  parameters: InteractionParameter[]; // 交互參數
}

enum InteractionType {
  CLICK = 'click',              // 點擊
  HOVER = 'hover',              // 懸停
  SELECT = 'select',            // 選擇
  ZOOM = 'zoom',                // 縮放
  PAN = 'pan'                   // 平移
}

enum InteractionAction {
  FILTER = 'filter',            // 篩選
  DRILL_DOWN = 'drill_down',    // 下鑽
  DRILL_UP = 'drill_up',        // 上鑽
  NAVIGATE = 'navigate',        // 導航
  EXPAND = 'expand',            // 展開
  COLLAPSE = 'collapse'         // 收合
}

interface InteractionParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  value: any;                   // 參數值
}

interface VisualizationStyles {
  id: string;                    // 樣式唯一標識
  colors: ColorScheme;          // 色彩方案
  fonts: FontConfig;            // 字體配置
  spacing: SpacingConfig;       // 間距配置
  borders: BorderConfig;        // 邊框配置
  shadows: ShadowConfig;        // 陰影配置
}

interface ColorScheme {
  id: string;                    // 色彩方案唯一標識
  name: string;                 // 方案名稱
  primary: string[];            // 主要色彩
  secondary: string[];          // 次要色彩
  accent: string[];             // 強調色彩
  background: string;           // 背景色彩
  text: string;                 // 文字色彩
}

interface FontConfig {
  id: string;                    // 字體配置唯一標識
  family: string;               // 字體家族
  size: number;                 // 字體大小
  weight: FontWeight;           // 字體粗細
  style: FontStyle;             // 字體樣式
}

enum FontWeight {
  NORMAL = 'normal',            // 正常
  BOLD = 'bold',                // 粗體
  LIGHT = 'light'               // 細體
}

enum FontStyle {
  NORMAL = 'normal',            // 正常
  ITALIC = 'italic'             // 斜體
}

interface SpacingConfig {
  id: string;                    // 間距配置唯一標識
  margin: SpacingValue;         // 外邊距
  padding: SpacingValue;        // 內邊距
  gap: number;                  // 間隙
}

interface SpacingValue {
  top: number;                  // 上
  right: number;                // 右
  bottom: number;               // 下
  left: number;                 // 左
}

interface BorderConfig {
  id: string;                    // 邊框配置唯一標識
  width: number;                // 邊框寬度
  style: BorderStyle;           // 邊框樣式
  color: string;                // 邊框色彩
  radius: number;               // 圓角半徑
}

enum BorderStyle {
  SOLID = 'solid',              // 實線
  DASHED = 'dashed',            // 虛線
  DOTTED = 'dotted',            // 點線
  NONE = 'none'                 // 無
}

interface ShadowConfig {
  id: string;                    // 陰影配置唯一標識
  enabled: boolean;            // 是否啟用
  x: number;                    // X 偏移
  y: number;                    // Y 偏移
  blur: number;                 // 模糊半徑
  spread: number;               // 擴散半徑
  color: string;                // 陰影色彩
}

interface ReportFilter {
  id: string;                    // 篩選器唯一標識
  name: string;                 // 篩選器名稱
  type: FilterType;             // 篩選器類型
  field: string;                // 欄位名稱
  operator: FilterOperator;      // 篩選運算子
  value: any;                   // 篩選值
  options?: FilterOption[];      // 篩選選項
}

enum FilterType {
  TEXT = 'text',                // 文字
  NUMBER = 'number',            // 數字
  DATE = 'date',                // 日期
  SELECT = 'select',            // 選擇
  MULTI_SELECT = 'multi_select', // 多選
  BOOLEAN = 'boolean',          // 布林值
  RANGE = 'range'               // 範圍
}

interface FilterOption {
  id: string;                    // 選項唯一標識
  label: string;                // 選項標籤
  value: any;                   // 選項值
  color?: string;               // 選項色彩
}

interface ReportSchedule {
  id: string;                    // 排程唯一標識
  enabled: boolean;             // 是否啟用
  frequency: ScheduleFrequency;  // 排程頻率
  time: string;                 // 排程時間
  timezone: string;             // 時區
  recipients: string[];         // 接收者
  format: ReportFormat;         // 報告格式
  lastRun?: Date;               // 最後執行時間
  nextRun?: Date;               // 下次執行時間
}

enum ScheduleFrequency {
  DAILY = 'daily',              // 每日
  WEEKLY = 'weekly',            // 每週
  MONTHLY = 'monthly',          // 每月
  QUARTERLY = 'quarterly',      // 每季
  YEARLY = 'yearly'             // 每年
}

enum ReportFormat {
  PDF = 'pdf',                  // PDF
  EXCEL = 'excel',              // Excel
  CSV = 'csv',                  // CSV
  HTML = 'html',                // HTML
  JSON = 'json'                 // JSON
}

interface ReportPermission {
  id: string;                    // 權限唯一標識
  userId?: string;              // 用戶 ID
  role?: ProjectRole;           // 專案角色
  permission: ReportAccessLevel; // 訪問級別
}

enum ReportAccessLevel {
  VIEW = 'view',                // 查看
  EDIT = 'edit',                // 編輯
  SHARE = 'share',              // 分享
  ADMIN = 'admin'               // 管理
}

interface ReportData {
  id: string;                    // 數據唯一標識
  source: DataSource;           // 數據源
  query: DataQuery;              // 數據查詢
  cache: CacheConfig;           // 快取配置
  lastUpdated: Date;            // 最後更新時間
  size: number;                 // 數據大小
  records: number;              // 記錄數量
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 報告分析主組件
@Component({
  selector: 'app-reporting-analytics',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>報告分析</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createReport()">
              <i nz-icon nzType="plus"></i>
              創建報告
            </button>
            <button nz-button (click)="createDashboard()">
              <i nz-icon nzType="dashboard"></i>
              創建儀表板
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="儀表板">
            <app-dashboard-view></app-dashboard-view>
          </nz-tab>
          <nz-tab nzTitle="報告管理">
            <app-report-management></app-report-management>
          </nz-tab>
          <nz-tab nzTitle="數據可視化">
            <app-data-visualization></app-data-visualization>
          </nz-tab>
          <nz-tab nzTitle="趨勢分析">
            <app-trend-analysis></app-trend-analysis>
          </nz-tab>
          <nz-tab nzTitle="預測分析">
            <app-predictive-analysis></app-predictive-analysis>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class ReportingAnalyticsComponent implements OnInit {
  constructor(
    private reportingService: ReportingService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.reportingService.loadReports();
  }
  
  createReport() {
    this.modal.create({
      nzTitle: '創建報告',
      nzContent: AppCreateReportModalComponent,
      nzFooter: null,
      nzWidth: 1200
    });
  }
  
  createDashboard() {
    this.modal.create({
      nzTitle: '創建儀表板',
      nzContent: AppCreateDashboardModalComponent,
      nzFooter: null,
      nzWidth: 1400
    });
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private readonly apiUrl = '/api/projects';
  
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  private dashboardsSubject = new BehaviorSubject<Dashboard[]>([]);
  private templatesSubject = new BehaviorSubject<ReportTemplate[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  reports$ = this.reportsSubject.asObservable();
  dashboards$ = this.dashboardsSubject.asObservable();
  templates$ = this.templatesSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 載入報告
  loadReports(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Report[]>(`${this.apiUrl}/${projectId}/reports`)
      .pipe(
        tap(reports => this.reportsSubject.next(reports)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建報告
  createReport(reportData: CreateReportRequest): Observable<Report> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Report>(`${this.apiUrl}/${projectId}/reports`, reportData).pipe(
      tap(report => {
        const currentReports = this.reportsSubject.value;
        this.reportsSubject.next([...currentReports, report]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 生成報告
  generateReport(reportId: string, format: ReportFormat): Observable<ReportGeneration> {
    return this.http.post<ReportGeneration>(`/api/reports/${reportId}/generate`, { format }).pipe(
      catchError(this.handleError)
    );
  }
  
  // 載入儀表板
  loadDashboards(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Dashboard[]>(`${this.apiUrl}/${projectId}/dashboards`)
      .pipe(
        tap(dashboards => this.dashboardsSubject.next(dashboards)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 創建儀表板
  createDashboard(dashboardData: CreateDashboardRequest): Observable<Dashboard> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Dashboard>(`${this.apiUrl}/${projectId}/dashboards`, dashboardData).pipe(
      tap(dashboard => {
        const currentDashboards = this.dashboardsSubject.value;
        this.dashboardsSubject.next([...currentDashboards, dashboard]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入報告模板
  loadTemplates(): void {
    this.http.get<ReportTemplate[]>('/api/report-templates')
      .pipe(
        tap(templates => this.templatesSubject.next(templates)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 執行數據查詢
  executeQuery(query: DataQuery): Observable<QueryResult> {
    return this.http.post<QueryResult>('/api/data-query', query).pipe(
      catchError(this.handleError)
    );
  }
  
  // 獲取分析統計
  getAnalyticsStats(): Observable<AnalyticsStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<AnalyticsStats>(`${this.apiUrl}/${projectId}/analytics-stats`);
  }
  
  // 獲取趨勢分析
  getTrendAnalysis(metric: string, period: string): Observable<TrendAnalysis> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<TrendAnalysis>(`${this.apiUrl}/${projectId}/trend-analysis`, {
      params: { metric, period }
    });
  }
  
  // 獲取預測分析
  getPredictiveAnalysis(metric: string, horizon: number): Observable<PredictiveAnalysis> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<PredictiveAnalysis>(`${this.apiUrl}/${projectId}/predictive-analysis`, {
      params: { metric, horizon: horizon.toString() }
    });
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Reporting service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 報告分析權限
```typescript
enum ReportingAnalyticsPermission {
  VIEW_REPORTS = 'view_reports',
  CREATE_REPORTS = 'create_reports',
  EDIT_REPORTS = 'edit_reports',
  DELETE_REPORTS = 'delete_reports',
  SHARE_REPORTS = 'share_reports',
  VIEW_DASHBOARDS = 'view_dashboards',
  CREATE_DASHBOARDS = 'create_dashboards',
  EDIT_DASHBOARDS = 'edit_dashboards',
  DELETE_DASHBOARDS = 'delete_dashboards',
  VIEW_ANALYTICS = 'view_analytics',
  CREATE_ANALYTICS = 'create_analytics',
  VIEW_TRENDS = 'view_trends',
  VIEW_PREDICTIONS = 'view_predictions',
  MANAGE_TEMPLATES = 'manage_templates',
  EXPORT_DATA = 'export_data'
}

// 角色權限映射
const REPORTING_PERMISSIONS: Record<ProjectRole, ReportingAnalyticsPermission[]> = {
  [ProjectRole.OWNER]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.CREATE_REPORTS,
    ReportingAnalyticsPermission.EDIT_REPORTS,
    ReportingAnalyticsPermission.DELETE_REPORTS,
    ReportingAnalyticsPermission.SHARE_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS,
    ReportingAnalyticsPermission.CREATE_DASHBOARDS,
    ReportingAnalyticsPermission.EDIT_DASHBOARDS,
    ReportingAnalyticsPermission.DELETE_DASHBOARDS,
    ReportingAnalyticsPermission.VIEW_ANALYTICS,
    ReportingAnalyticsPermission.CREATE_ANALYTICS,
    ReportingAnalyticsPermission.VIEW_TRENDS,
    ReportingAnalyticsPermission.VIEW_PREDICTIONS,
    ReportingAnalyticsPermission.MANAGE_TEMPLATES,
    ReportingAnalyticsPermission.EXPORT_DATA
  ],
  [ProjectRole.ADMIN]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.CREATE_REPORTS,
    ReportingAnalyticsPermission.EDIT_REPORTS,
    ReportingAnalyticsPermission.DELETE_REPORTS,
    ReportingAnalyticsPermission.SHARE_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS,
    ReportingAnalyticsPermission.CREATE_DASHBOARDS,
    ReportingAnalyticsPermission.EDIT_DASHBOARDS,
    ReportingAnalyticsPermission.DELETE_DASHBOARDS,
    ReportingAnalyticsPermission.VIEW_ANALYTICS,
    ReportingAnalyticsPermission.CREATE_ANALYTICS,
    ReportingAnalyticsPermission.VIEW_TRENDS,
    ReportingAnalyticsPermission.VIEW_PREDICTIONS,
    ReportingAnalyticsPermission.MANAGE_TEMPLATES,
    ReportingAnalyticsPermission.EXPORT_DATA
  ],
  [ProjectRole.MANAGER]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.CREATE_REPORTS,
    ReportingAnalyticsPermission.EDIT_REPORTS,
    ReportingAnalyticsPermission.SHARE_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS,
    ReportingAnalyticsPermission.CREATE_DASHBOARDS,
    ReportingAnalyticsPermission.EDIT_DASHBOARDS,
    ReportingAnalyticsPermission.VIEW_ANALYTICS,
    ReportingAnalyticsPermission.VIEW_TRENDS,
    ReportingAnalyticsPermission.VIEW_PREDICTIONS,
    ReportingAnalyticsPermission.EXPORT_DATA
  ],
  [ProjectRole.ENGINEER]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.CREATE_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS,
    ReportingAnalyticsPermission.VIEW_ANALYTICS,
    ReportingAnalyticsPermission.VIEW_TRENDS,
    ReportingAnalyticsPermission.EXPORT_DATA
  ],
  [ProjectRole.CONTRACTOR]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS,
    ReportingAnalyticsPermission.VIEW_ANALYTICS,
    ReportingAnalyticsPermission.VIEW_TRENDS
  ],
  [ProjectRole.VIEWER]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS,
    ReportingAnalyticsPermission.VIEW_ANALYTICS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    ReportingAnalyticsPermission.VIEW_REPORTS,
    ReportingAnalyticsPermission.VIEW_DASHBOARDS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface ReportingAnalyticsApi {
  // 報告管理
  POST /api/projects/{projectId}/reports           // 創建報告
  GET /api/projects/{projectId}/reports            // 獲取報告列表
  GET /api/reports/{reportId}                     // 獲取報告詳情
  PATCH /api/reports/{reportId}                   // 更新報告
  DELETE /api/reports/{reportId}                  // 刪除報告
  
  // 報告生成
  POST /api/reports/{reportId}/generate           // 生成報告
  GET /api/reports/{reportId}/download            // 下載報告
  POST /api/reports/{reportId}/schedule           // 排程報告
  
  // 儀表板管理
  POST /api/projects/{projectId}/dashboards        // 創建儀表板
  GET /api/projects/{projectId}/dashboards         // 獲取儀表板列表
  GET /api/dashboards/{dashboardId}                // 獲取儀表板詳情
  PATCH /api/dashboards/{dashboardId}              // 更新儀表板
  DELETE /api/dashboards/{dashboardId}             // 刪除儀表板
  
  // 數據查詢
  POST /api/data-query                            // 執行數據查詢
  GET /api/data-sources                           // 獲取數據源列表
  POST /api/data-sources                          // 創建數據源
  GET /api/data-sources/{sourceId}/test          // 測試數據源
  
  // 分析功能
  GET /api/projects/{projectId}/analytics-stats   // 獲取分析統計
  GET /api/projects/{projectId}/trend-analysis     // 獲取趨勢分析
  GET /api/projects/{projectId}/predictive-analysis // 獲取預測分析
  
  // 模板管理
  GET /api/report-templates                       // 獲取報告模板
  POST /api/report-templates                      // 創建報告模板
  GET /api/report-templates/{templateId}          // 獲取模板詳情
  PATCH /api/report-templates/{templateId}        // 更新模板
  DELETE /api/report-templates/{templateId}       // 刪除模板
}

// 請求/響應類型
interface CreateReportRequest {
  name: string;
  description?: string;
  type: ReportType;
  category: ReportCategory;
  template: string;
  data: ReportData;
  visualizations: Visualization[];
  filters: ReportFilter[];
  schedule?: ReportSchedule;
  permissions: ReportPermission[];
}

interface CreateDashboardRequest {
  name: string;
  description?: string;
  layout: TemplateLayout;
  widgets: DashboardWidget[];
  filters: ReportFilter[];
  permissions: ReportPermission[];
}

interface DashboardWidget {
  id: string;
  type: VisualizationType;
  title: string;
  data: VisualizationData;
  config: VisualizationConfig;
  position: WidgetPosition;
  size: WidgetSize;
}

interface WidgetPosition {
  x: number;
  y: number;
}

interface WidgetSize {
  width: number;
  height: number;
}

interface ReportGeneration {
  id: string;
  reportId: string;
  format: ReportFormat;
  status: GenerationStatus;
  progress: number;
  downloadUrl?: string;
  error?: string;
  createdAt: Date;
  completedAt?: Date;
}

enum GenerationStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

interface QueryResult {
  id: string;
  data: any[];
  columns: QueryColumn[];
  totalRows: number;
  executionTime: number;
  cached: boolean;
  createdAt: Date;
}

interface QueryColumn {
  name: string;
  type: string;
  nullable: boolean;
}

interface AnalyticsStats {
  totalReports: number;
  totalDashboards: number;
  totalQueries: number;
  dataVolume: number;
  activeUsers: number;
  lastUpdated: Date;
}

interface TrendAnalysis {
  metric: string;
  period: string;
  data: TrendDataPoint[];
  trend: TrendDirection;
  change: number;
  confidence: number;
}

interface TrendDataPoint {
  date: Date;
  value: number;
  forecast?: number;
}

enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable',
  VOLATILE = 'volatile'
}

interface PredictiveAnalysis {
  metric: string;
  horizon: number;
  forecast: ForecastDataPoint[];
  accuracy: number;
  confidence: number;
  model: string;
}

interface ForecastDataPoint {
  date: Date;
  value: number;
  lowerBound: number;
  upperBound: number;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const reportingConfig = {
  enableReporting: process.env.ENABLE_REPORTING === 'true',
  enableDashboards: process.env.ENABLE_DASHBOARDS === 'true',
  enableAnalytics: process.env.ENABLE_ANALYTICS === 'true',
  enablePredictions: process.env.ENABLE_PREDICTIONS === 'true',
  maxReportSize: parseInt(process.env.MAX_REPORT_SIZE || '104857600'), // 100MB
  maxDashboardWidgets: parseInt(process.env.MAX_DASHBOARD_WIDGETS || '50'),
  reportCacheTtl: parseInt(process.env.REPORT_CACHE_TTL || '3600'), // 1 hour
  queryTimeout: parseInt(process.env.QUERY_TIMEOUT || '300'), // 5 minutes
  maxConcurrentQueries: parseInt(process.env.MAX_CONCURRENT_QUERIES || '10'),
  dataRetentionDays: parseInt(process.env.DATA_RETENTION_DAYS || '365'),
  exportFormats: process.env.EXPORT_FORMATS?.split(',') || ['pdf', 'excel', 'csv'],
  chartingLibrary: process.env.CHARTING_LIBRARY || 'echarts',
  predictionModels: process.env.PREDICTION_MODELS?.split(',') || ['linear', 'arima', 'lstm'],
  analyticsEngine: process.env.ANALYTICS_ENGINE || 'postgresql',
  cacheEngine: process.env.CACHE_ENGINE || 'redis'
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 報告生成功能
- [ ] 儀表板管理
- [ ] 數據可視化
- [ ] 趨勢分析功能
- [ ] 預測分析功能
- [ ] 模板管理系統
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成