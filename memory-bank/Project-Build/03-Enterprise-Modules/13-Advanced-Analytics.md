# 13️⃣ 高級分析模組

## 📋 模組概述

高級分析模組提供專案數據的深度分析和智能洞察功能，包括機器學習、預測建模、異常檢測、模式識別、智能推薦等功能。此模組是 Project-Build 系統的 AI 驅動分析核心組件。

### 🎯 功能目標
- 實現機器學習模型訓練和預測
- 提供異常檢測和模式識別
- 支持智能推薦和決策支持
- 實現自然語言處理和文本分析
- 整合所有模組的數據進行深度分析

## 🏗️ 功能架構

### 核心功能
```
高級分析模組
├── 機器學習
│   ├── 模型訓練
│   ├── 預測分析
│   ├── 模型評估
│   └── 模型部署
├── 異常檢測
│   ├── 統計異常
│   ├── 時間序列異常
│   ├── 模式異常
│   └── 行為異常
├── 智能推薦
│   ├── 協同過濾
│   ├── 內容推薦
│   ├── 混合推薦
│   └── 實時推薦
├── 文本分析
│   ├── 情感分析
│   ├── 主題建模
│   ├── 關鍵詞提取
│   └── 文本分類
└── 決策支持
    ├── 決策樹
    ├── 規則引擎
    ├── 優化算法
    └── 場景分析
```

## 📊 數據結構設計

### 機器學習實體 (MLModel)
```typescript
interface MLModel {
  id: string;                    // 模型唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 模型名稱
  description?: string;           // 模型描述
  type: ModelType;              // 模型類型
  algorithm: MLAlgorithm;        // 算法類型
  status: ModelStatus;           // 模型狀態
  version: string;               // 版本號
  trainingData: TrainingData;    // 訓練數據
  hyperparameters: Hyperparameter[]; // 超參數
  performance: ModelPerformance; // 性能指標
  deployment: ModelDeployment;   // 部署配置
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum ModelType {
  CLASSIFICATION = 'classification', // 分類
  REGRESSION = 'regression',        // 回歸
  CLUSTERING = 'clustering',        // 聚類
  ANOMALY_DETECTION = 'anomaly_detection', // 異常檢測
  RECOMMENDATION = 'recommendation', // 推薦
  TIME_SERIES = 'time_series',     // 時間序列
  NLP = 'nlp',                     // 自然語言處理
  COMPUTER_VISION = 'computer_vision' // 計算機視覺
}

enum MLAlgorithm {
  // 線性模型
  LINEAR_REGRESSION = 'linear_regression',
  LOGISTIC_REGRESSION = 'logistic_regression',
  RIDGE_REGRESSION = 'ridge_regression',
  LASSO_REGRESSION = 'lasso_regression',
  
  // 樹模型
  DECISION_TREE = 'decision_tree',
  RANDOM_FOREST = 'random_forest',
  GRADIENT_BOOSTING = 'gradient_boosting',
  XGBOOST = 'xgboost',
  
  // 神經網絡
  NEURAL_NETWORK = 'neural_network',
  DEEP_NEURAL_NETWORK = 'deep_neural_network',
  CONVOLUTIONAL_NN = 'convolutional_nn',
  RECURRENT_NN = 'recurrent_nn',
  LSTM = 'lstm',
  TRANSFORMER = 'transformer',
  
  // 聚類算法
  K_MEANS = 'k_means',
  HIERARCHICAL_CLUSTERING = 'hierarchical_clustering',
  DBSCAN = 'dbscan',
  
  // 異常檢測
  ISOLATION_FOREST = 'isolation_forest',
  ONE_CLASS_SVM = 'one_class_svm',
  LOCAL_OUTLIER_FACTOR = 'local_outlier_factor',
  
  // 推薦算法
  COLLABORATIVE_FILTERING = 'collaborative_filtering',
  CONTENT_BASED = 'content_based',
  MATRIX_FACTORIZATION = 'matrix_factorization',
  
  // 時間序列
  ARIMA = 'arima',
  PROPHET = 'prophet',
  SARIMA = 'sarima'
}

enum ModelStatus {
  TRAINING = 'training',         // 訓練中
  TRAINED = 'trained',          // 已訓練
  VALIDATING = 'validating',     // 驗證中
  VALIDATED = 'validated',       // 已驗證
  DEPLOYING = 'deploying',       // 部署中
  DEPLOYED = 'deployed',         // 已部署
  FAILED = 'failed',            // 失敗
  ARCHIVED = 'archived'          // 已封存
}

interface TrainingData {
  id: string;                    // 數據唯一標識
  source: DataSource;           // 數據源
  features: Feature[];           // 特徵
  target?: string;              // 目標變量
  preprocessing: PreprocessingStep[]; // 預處理步驟
  split: DataSplit;             // 數據分割
  quality: DataQuality;          // 數據品質
}

interface Feature {
  id: string;                    // 特徵唯一標識
  name: string;                 // 特徵名稱
  type: FeatureType;            // 特徵類型
  description?: string;          // 特徵描述
  importance?: number;           // 特徵重要性
  statistics: FeatureStatistics; // 特徵統計
}

enum FeatureType {
  NUMERICAL = 'numerical',       // 數值型
  CATEGORICAL = 'categorical',   // 分類型
  TEXT = 'text',                // 文本型
  DATE_TIME = 'date_time',       // 日期時間型
  BOOLEAN = 'boolean',          // 布林型
  COMPLEX = 'complex'           // 複合型
}

interface FeatureStatistics {
  id: string;                    // 統計唯一標識
  count: number;                // 計數
  mean?: number;                // 平均值
  median?: number;              // 中位數
  mode?: any;                   // 眾數
  std?: number;                 // 標準差
  min?: number;                 // 最小值
  max?: number;                 // 最大值
  nullCount: number;            // 空值數量
  uniqueCount: number;          // 唯一值數量
  distribution?: Distribution;   // 分佈
}

interface Distribution {
  id: string;                    // 分佈唯一標識
  type: DistributionType;        // 分佈類型
  parameters: DistributionParameter[]; // 分佈參數
  histogram?: HistogramBin[];     // 直方圖
}

enum DistributionType {
  NORMAL = 'normal',            // 正態分佈
  UNIFORM = 'uniform',          // 均勻分佈
  EXPONENTIAL = 'exponential',   // 指數分佈
  BINOMIAL = 'binomial',        // 二項分佈
  POISSON = 'poisson',          // 泊松分佈
  CUSTOM = 'custom'             // 自定義分佈
}

interface DistributionParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  value: number;                // 參數值
}

interface HistogramBin {
  id: string;                    // 區間唯一標識
  start: number;                // 開始值
  end: number;                  // 結束值
  count: number;                // 計數
  frequency: number;             // 頻率
}

interface PreprocessingStep {
  id: string;                    // 步驟唯一標識
  name: string;                 // 步驟名稱
  type: PreprocessingType;      // 預處理類型
  parameters: PreprocessingParameter[]; // 參數
  order: number;                // 順序
}

enum PreprocessingType {
  SCALING = 'scaling',          // 縮放
  NORMALIZATION = 'normalization', // 標準化
  ENCODING = 'encoding',        // 編碼
  IMPUTATION = 'imputation',     // 填充
  FILTERING = 'filtering',      // 篩選
  TRANSFORMATION = 'transformation', // 轉換
  FEATURE_SELECTION = 'feature_selection', // 特徵選擇
  DIMENSIONALITY_REDUCTION = 'dimensionality_reduction' // 降維
}

interface PreprocessingParameter {
  id: string;                    // 參數唯一標識
  name: string;                 // 參數名稱
  value: any;                   // 參數值
}

interface DataSplit {
  id: string;                    // 分割唯一標識
  trainRatio: number;           // 訓練集比例
  validationRatio: number;      // 驗證集比例
  testRatio: number;            // 測試集比例
  strategy: SplitStrategy;      // 分割策略
  randomSeed?: number;          // 隨機種子
}

enum SplitStrategy {
  RANDOM = 'random',            // 隨機分割
  STRATIFIED = 'stratified',     // 分層分割
  TIME_BASED = 'time_based',     // 時間分割
  CUSTOM = 'custom'             // 自定義分割
}

interface DataQuality {
  id: string;                    // 品質唯一標識
  completeness: number;         // 完整性
  accuracy: number;             // 準確性
  consistency: number;          // 一致性
  validity: number;             // 有效性
  uniqueness: number;           // 唯一性
  timeliness: number;           // 時效性
  issues: QualityIssue[];       // 品質問題
}

interface QualityIssue {
  id: string;                    // 問題唯一標識
  type: QualityIssueType;       // 問題類型
  severity: IssueSeverity;      // 嚴重程度
  description: string;           // 問題描述
  count: number;                // 問題數量
  affectedFeatures: string[];   // 受影響特徵
}

enum QualityIssueType {
  MISSING_VALUES = 'missing_values', // 缺失值
  OUTLIERS = 'outliers',         // 異常值
  DUPLICATES = 'duplicates',     // 重複值
  INCONSISTENT_FORMAT = 'inconsistent_format', // 格式不一致
  INVALID_VALUES = 'invalid_values', // 無效值
  DATA_DRIFT = 'data_drift'      // 數據漂移
}

enum IssueSeverity {
  LOW = 'low',                  // 低
  MEDIUM = 'medium',            // 中
  HIGH = 'high',                // 高
  CRITICAL = 'critical'         // 嚴重
}

interface Hyperparameter {
  id: string;                    // 超參數唯一標識
  name: string;                 // 參數名稱
  value: any;                   // 參數值
  type: HyperparameterType;     // 參數類型
  range?: ParameterRange;       // 參數範圍
  description?: string;          // 參數描述
}

enum HyperparameterType {
  INTEGER = 'integer',          // 整數
  FLOAT = 'float',              // 浮點數
  STRING = 'string',            // 字串
  BOOLEAN = 'boolean',          // 布林值
  CHOICE = 'choice'             // 選擇
}

interface ParameterRange {
  id: string;                    // 範圍唯一標識
  min?: number;                 // 最小值
  max?: number;                 // 最大值
  step?: number;                // 步長
  choices?: any[];              // 選擇項
}

interface ModelPerformance {
  id: string;                    // 性能唯一標識
  metrics: PerformanceMetric[];  // 性能指標
  confusionMatrix?: ConfusionMatrix; // 混淆矩陣
  rocCurve?: ROCCurve;          // ROC 曲線
  learningCurve?: LearningCurve; // 學習曲線
  validationScore: number;      // 驗證分數
  testScore: number;           // 測試分數
  crossValidation?: CrossValidation; // 交叉驗證
}

interface PerformanceMetric {
  id: string;                    // 指標唯一標識
  name: string;                 // 指標名稱
  value: number;                // 指標值
  type: MetricType;             // 指標類型
  description?: string;          // 指標描述
}

enum MetricType {
  ACCURACY = 'accuracy',        // 準確率
  PRECISION = 'precision',      // 精確率
  RECALL = 'recall',            // 召回率
  F1_SCORE = 'f1_score',        // F1 分數
  AUC = 'auc',                  // AUC
  RMSE = 'rmse',                // 均方根誤差
  MAE = 'mae',                  // 平均絕對誤差
  R2_SCORE = 'r2_score',        // R² 分數
  SILHOUETTE_SCORE = 'silhouette_score', // 輪廓係數
  ADJUSTED_RAND_SCORE = 'adjusted_rand_score' // 調整蘭德指數
}

interface ConfusionMatrix {
  id: string;                    // 混淆矩陣唯一標識
  truePositives: number;        // 真正例
  falsePositives: number;       // 假正例
  trueNegatives: number;        // 真負例
  falseNegatives: number;       // 假負例
  labels: string[];             // 標籤
  matrix: number[][];           // 矩陣
}

interface ROCCurve {
  id: string;                    // ROC 曲線唯一標識
  fpr: number[];                // 假正例率
  tpr: number[];                // 真正例率
  auc: number;                  // AUC 值
  thresholds: number[];         // 閾值
}

interface LearningCurve {
  id: string;                    // 學習曲線唯一標識
  trainSizes: number[];         // 訓練集大小
  trainScores: number[];        // 訓練分數
  validationScores: number[];   // 驗證分數
  trainTimes: number[];         // 訓練時間
}

interface CrossValidation {
  id: string;                    // 交叉驗證唯一標識
  folds: number;                // 折數
  scores: number[];             // 分數
  meanScore: number;            // 平均分數
  stdScore: number;             // 標準差
  strategy: CVStrategy;         // 策略
}

enum CVStrategy {
  K_FOLD = 'k_fold',            // K 折交叉驗證
  STRATIFIED_K_FOLD = 'stratified_k_fold', // 分層 K 折
  TIME_SERIES_SPLIT = 'time_series_split', // 時間序列分割
  LEAVE_ONE_OUT = 'leave_one_out' // 留一法
}

interface ModelDeployment {
  id: string;                    // 部署唯一標識
  status: DeploymentStatus;      // 部署狀態
  endpoint: string;             // 端點
  version: string;              // 版本
  environment: DeploymentEnvironment; // 環境
  resources: ResourceRequirements; // 資源需求
  monitoring: DeploymentMonitoring; // 監控配置
  scaling: ScalingConfig;       // 擴展配置
}

enum DeploymentStatus {
  PENDING = 'pending',          // 待部署
  DEPLOYING = 'deploying',       // 部署中
  DEPLOYED = 'deployed',        // 已部署
  FAILED = 'failed',            // 部署失敗
  UPDATING = 'updating',        // 更新中
  ROLLING_BACK = 'rolling_back', // 回滾中
  STOPPED = 'stopped'           // 已停止
}

enum DeploymentEnvironment {
  DEVELOPMENT = 'development',   // 開發環境
  STAGING = 'staging',          // 測試環境
  PRODUCTION = 'production'     // 生產環境
}

interface ResourceRequirements {
  id: string;                    // 資源唯一標識
  cpu: number;                   // CPU 需求
  memory: number;               // 記憶體需求
  gpu?: number;                 // GPU 需求
  storage: number;              // 儲存需求
  network?: number;             // 網路需求
}

interface DeploymentMonitoring {
  id: string;                    // 監控唯一標識
  enabled: boolean;             // 是否啟用
  metrics: MonitoringMetric[];   // 監控指標
  alerts: AlertConfig[];        // 告警配置
  logging: LoggingConfig;       // 日誌配置
}

interface ScalingConfig {
  id: string;                    // 擴展唯一標識
  minInstances: number;         // 最小實例數
  maxInstances: number;         // 最大實例數
  targetUtilization: number;    // 目標利用率
  scaleUpPolicy: ScalingPolicy;  // 擴展策略
  scaleDownPolicy: ScalingPolicy; // 縮減策略
}

interface ScalingPolicy {
  id: string;                    // 策略唯一標識
  metric: string;               // 指標
  threshold: number;            // 閾值
  duration: number;             // 持續時間
  cooldown: number;             // 冷卻時間
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 高級分析主組件
@Component({
  selector: 'app-advanced-analytics',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>高級分析</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createModel()">
              <i nz-icon nzType="experiment"></i>
              創建模型
            </button>
            <button nz-button (click)="runAnalysis()">
              <i nz-icon nzType="bar-chart"></i>
              運行分析
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="機器學習">
            <app-machine-learning></app-machine-learning>
          </nz-tab>
          <nz-tab nzTitle="異常檢測">
            <app-anomaly-detection></app-anomaly-detection>
          </nz-tab>
          <nz-tab nzTitle="智能推薦">
            <app-intelligent-recommendation></app-intelligent-recommendation>
          </nz-tab>
          <nz-tab nzTitle="文本分析">
            <app-text-analysis></app-text-analysis>
          </nz-tab>
          <nz-tab nzTitle="決策支持">
            <app-decision-support></app-decision-support>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class AdvancedAnalyticsComponent implements OnInit {
  constructor(
    private analyticsService: AdvancedAnalyticsService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.analyticsService.loadModels();
  }
  
  createModel() {
    this.modal.create({
      nzTitle: '創建機器學習模型',
      nzContent: AppCreateModelModalComponent,
      nzFooter: null,
      nzWidth: 1200
    });
  }
  
  runAnalysis() {
    this.modal.create({
      nzTitle: '運行高級分析',
      nzContent: AppRunAnalysisModalComponent,
      nzFooter: null,
      nzWidth: 1000
    });
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class AdvancedAnalyticsService {
  private readonly apiUrl = '/api/projects';
  
  private modelsSubject = new BehaviorSubject<MLModel[]>([]);
  private analysesSubject = new BehaviorSubject<Analysis[]>([]);
  private predictionsSubject = new BehaviorSubject<Prediction[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  models$ = this.modelsSubject.asObservable();
  analyses$ = this.analysesSubject.asObservable();
  predictions$ = this.predictionsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 載入模型
  loadModels(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<MLModel[]>(`${this.apiUrl}/${projectId}/ml-models`)
      .pipe(
        tap(models => this.modelsSubject.next(models)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建模型
  createModel(modelData: CreateModelRequest): Observable<MLModel> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<MLModel>(`${this.apiUrl}/${projectId}/ml-models`, modelData).pipe(
      tap(model => {
        const currentModels = this.modelsSubject.value;
        this.modelsSubject.next([...currentModels, model]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 訓練模型
  trainModel(modelId: string): Observable<TrainingJob> {
    return this.http.post<TrainingJob>(`/api/ml-models/${modelId}/train`, {}).pipe(
      catchError(this.handleError)
    );
  }
  
  // 預測
  predict(modelId: string, data: any): Observable<Prediction> {
    return this.http.post<Prediction>(`/api/ml-models/${modelId}/predict`, data).pipe(
      tap(prediction => {
        const currentPredictions = this.predictionsSubject.value;
        this.predictionsSubject.next([...currentPredictions, prediction]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 異常檢測
  detectAnomalies(data: AnomalyDetectionRequest): Observable<AnomalyDetectionResult> {
    return this.http.post<AnomalyDetectionResult>('/api/anomaly-detection', data).pipe(
      catchError(this.handleError)
    );
  }
  
  // 智能推薦
  getRecommendations(request: RecommendationRequest): Observable<RecommendationResult> {
    return this.http.post<RecommendationResult>('/api/recommendations', request).pipe(
      catchError(this.handleError)
    );
  }
  
  // 文本分析
  analyzeText(text: string, analysisType: TextAnalysisType): Observable<TextAnalysisResult> {
    return this.http.post<TextAnalysisResult>('/api/text-analysis', {
      text,
      type: analysisType
    }).pipe(
      catchError(this.handleError)
    );
  }
  
  // 獲取分析統計
  getAnalyticsStats(): Observable<AnalyticsStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<AnalyticsStats>(`${this.apiUrl}/${projectId}/analytics-stats`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Advanced analytics service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 高級分析權限
```typescript
enum AdvancedAnalyticsPermission {
  VIEW_MODELS = 'view_models',
  CREATE_MODELS = 'create_models',
  EDIT_MODELS = 'edit_models',
  DELETE_MODELS = 'delete_models',
  TRAIN_MODELS = 'train_models',
  DEPLOY_MODELS = 'deploy_models',
  VIEW_PREDICTIONS = 'view_predictions',
  RUN_PREDICTIONS = 'run_predictions',
  VIEW_ANOMALIES = 'view_anomalies',
  DETECT_ANOMALIES = 'detect_anomalies',
  VIEW_RECOMMENDATIONS = 'view_recommendations',
  GET_RECOMMENDATIONS = 'get_recommendations',
  VIEW_TEXT_ANALYSIS = 'view_text_analysis',
  ANALYZE_TEXT = 'analyze_text',
  VIEW_DECISION_SUPPORT = 'view_decision_support',
  USE_DECISION_SUPPORT = 'use_decision_support',
  VIEW_ANALYTICS_STATS = 'view_analytics_stats'
}

// 角色權限映射
const ADVANCED_ANALYTICS_PERMISSIONS: Record<ProjectRole, AdvancedAnalyticsPermission[]> = {
  [ProjectRole.OWNER]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.CREATE_MODELS,
    AdvancedAnalyticsPermission.EDIT_MODELS,
    AdvancedAnalyticsPermission.DELETE_MODELS,
    AdvancedAnalyticsPermission.TRAIN_MODELS,
    AdvancedAnalyticsPermission.DEPLOY_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.RUN_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_ANOMALIES,
    AdvancedAnalyticsPermission.DETECT_ANOMALIES,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.GET_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.VIEW_TEXT_ANALYSIS,
    AdvancedAnalyticsPermission.ANALYZE_TEXT,
    AdvancedAnalyticsPermission.VIEW_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.USE_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.VIEW_ANALYTICS_STATS
  ],
  [ProjectRole.ADMIN]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.CREATE_MODELS,
    AdvancedAnalyticsPermission.EDIT_MODELS,
    AdvancedAnalyticsPermission.DELETE_MODELS,
    AdvancedAnalyticsPermission.TRAIN_MODELS,
    AdvancedAnalyticsPermission.DEPLOY_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.RUN_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_ANOMALIES,
    AdvancedAnalyticsPermission.DETECT_ANOMALIES,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.GET_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.VIEW_TEXT_ANALYSIS,
    AdvancedAnalyticsPermission.ANALYZE_TEXT,
    AdvancedAnalyticsPermission.VIEW_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.USE_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.VIEW_ANALYTICS_STATS
  ],
  [ProjectRole.MANAGER]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.CREATE_MODELS,
    AdvancedAnalyticsPermission.EDIT_MODELS,
    AdvancedAnalyticsPermission.TRAIN_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.RUN_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_ANOMALIES,
    AdvancedAnalyticsPermission.DETECT_ANOMALIES,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.GET_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.VIEW_TEXT_ANALYSIS,
    AdvancedAnalyticsPermission.ANALYZE_TEXT,
    AdvancedAnalyticsPermission.VIEW_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.USE_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.VIEW_ANALYTICS_STATS
  ],
  [ProjectRole.ENGINEER]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.CREATE_MODELS,
    AdvancedAnalyticsPermission.EDIT_MODELS,
    AdvancedAnalyticsPermission.TRAIN_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.RUN_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_ANOMALIES,
    AdvancedAnalyticsPermission.DETECT_ANOMALIES,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.GET_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.VIEW_TEXT_ANALYSIS,
    AdvancedAnalyticsPermission.ANALYZE_TEXT,
    AdvancedAnalyticsPermission.VIEW_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.USE_DECISION_SUPPORT
  ],
  [ProjectRole.CONTRACTOR]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_ANOMALIES,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.GET_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.VIEW_TEXT_ANALYSIS,
    AdvancedAnalyticsPermission.VIEW_DECISION_SUPPORT
  ],
  [ProjectRole.VIEWER]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_ANOMALIES,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS,
    AdvancedAnalyticsPermission.VIEW_TEXT_ANALYSIS,
    AdvancedAnalyticsPermission.VIEW_DECISION_SUPPORT,
    AdvancedAnalyticsPermission.VIEW_ANALYTICS_STATS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    AdvancedAnalyticsPermission.VIEW_MODELS,
    AdvancedAnalyticsPermission.VIEW_PREDICTIONS,
    AdvancedAnalyticsPermission.VIEW_RECOMMENDATIONS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface AdvancedAnalyticsApi {
  // 機器學習模型管理
  POST /api/projects/{projectId}/ml-models           // 創建模型
  GET /api/projects/{projectId}/ml-models            // 獲取模型列表
  GET /api/ml-models/{modelId}                       // 獲取模型詳情
  PATCH /api/ml-models/{modelId}                     // 更新模型
  DELETE /api/ml-models/{modelId}                    // 刪除模型
  
  // 模型訓練和預測
  POST /api/ml-models/{modelId}/train                // 訓練模型
  POST /api/ml-models/{modelId}/predict              // 預測
  POST /api/ml-models/{modelId}/evaluate             // 評估模型
  POST /api/ml-models/{modelId}/deploy               // 部署模型
  
  // 異常檢測
  POST /api/anomaly-detection                        // 異常檢測
  GET /api/projects/{projectId}/anomalies            // 獲取異常列表
  POST /api/anomalies/{anomalyId}/investigate        // 調查異常
  
  // 智能推薦
  POST /api/recommendations                          // 獲取推薦
  GET /api/projects/{projectId}/recommendations      // 獲取推薦歷史
  POST /api/recommendations/{recommendationId}/feedback // 推薦反饋
  
  // 文本分析
  POST /api/text-analysis                            // 文本分析
  POST /api/text-analysis/batch                      // 批量文本分析
  GET /api/text-analysis/{analysisId}                // 獲取分析結果
  
  // 決策支持
  POST /api/decision-support                         // 決策支持
  GET /api/projects/{projectId}/decision-scenarios    // 獲取決策場景
  POST /api/decision-scenarios/{scenarioId}/analyze  // 分析場景
  
  // 分析統計
  GET /api/projects/{projectId}/analytics-stats      // 獲取分析統計
  GET /api/ml-models/{modelId}/performance           // 獲取模型性能
}

// 請求/響應類型
interface CreateModelRequest {
  name: string;
  description?: string;
  type: ModelType;
  algorithm: MLAlgorithm;
  trainingData: TrainingData;
  hyperparameters: Hyperparameter[];
}

interface AnomalyDetectionRequest {
  data: any[];
  algorithm: MLAlgorithm;
  threshold: number;
  features: string[];
}

interface RecommendationRequest {
  userId: string;
  itemType: string;
  count: number;
  algorithm: MLAlgorithm;
  context?: any;
}

interface TextAnalysisResult {
  id: string;
  text: string;
  type: TextAnalysisType;
  results: AnalysisResult[];
  confidence: number;
  createdAt: Date;
}

enum TextAnalysisType {
  SENTIMENT = 'sentiment',
  TOPIC_MODELING = 'topic_modeling',
  KEYWORD_EXTRACTION = 'keyword_extraction',
  TEXT_CLASSIFICATION = 'text_classification',
  NAMED_ENTITY_RECOGNITION = 'named_entity_recognition',
  SUMMARIZATION = 'summarization'
}

interface AnalysisResult {
  id: string;
  type: string;
  value: any;
  confidence: number;
  metadata?: any;
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const advancedAnalyticsConfig = {
  enableMachineLearning: process.env.ENABLE_MACHINE_LEARNING === 'true',
  enableAnomalyDetection: process.env.ENABLE_ANOMALY_DETECTION === 'true',
  enableRecommendations: process.env.ENABLE_RECOMMENDATIONS === 'true',
  enableTextAnalysis: process.env.ENABLE_TEXT_ANALYSIS === 'true',
  enableDecisionSupport: process.env.ENABLE_DECISION_SUPPORT === 'true',
  maxModelsPerProject: parseInt(process.env.MAX_MODELS_PER_PROJECT || '50'),
  maxTrainingJobs: parseInt(process.env.MAX_TRAINING_JOBS || '10'),
  modelTrainingTimeout: parseInt(process.env.MODEL_TRAINING_TIMEOUT || '3600'), // 1 hour
  predictionTimeout: parseInt(process.env.PREDICTION_TIMEOUT || '60'), // 1 minute
  maxPredictionBatchSize: parseInt(process.env.MAX_PREDICTION_BATCH_SIZE || '1000'),
  modelDeploymentEnabled: process.env.MODEL_DEPLOYMENT_ENABLED === 'true',
  gpuEnabled: process.env.GPU_ENABLED === 'true',
  mlFramework: process.env.ML_FRAMEWORK || 'tensorflow',
  modelStorage: process.env.MODEL_STORAGE || 's3',
  analyticsEngine: process.env.ANALYTICS_ENGINE || 'spark',
  cacheEnabled: process.env.CACHE_ENABLED === 'true',
  cacheTtl: parseInt(process.env.CACHE_TTL || '3600'), // 1 hour
  monitoringEnabled: process.env.MONITORING_ENABLED === 'true',
  alertThreshold: parseFloat(process.env.ALERT_THRESHOLD || '0.8')
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 機器學習功能
- [ ] 異常檢測系統
- [ ] 智能推薦引擎
- [ ] 文本分析功能
- [ ] 決策支持系統
- [ ] 模型部署功能
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成