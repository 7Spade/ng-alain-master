# 💳 計費訂閱管理模組

## 📋 概述

計費訂閱管理模組提供完整的訂閱計劃管理、計費系統集成、使用量統計和發票生成功能，支持多種支付方式和靈活的計費模式。

### 🎯 模組目標
- 提供訂閱計劃管理功能
- 實現計費系統集成
- 支持使用量統計和計費
- 提供發票生成和管理功能

## 🏗️ 功能架構

### 核心功能
```
計費訂閱管理功能
├── 訂閱計劃管理
│   ├── 計劃創建與配置
│   ├── 價格策略設置
│   ├── 功能權限配置
│   └── 計劃版本管理
├── 訂閱管理
│   ├── 訂閱創建與激活
│   ├── 訂閱升級與降級
│   ├── 訂閱暫停與恢復
│   └── 訂閱取消與退款
├── 計費系統
│   ├── 使用量統計
│   ├── 計費計算引擎
│   ├── 支付處理
│   └── 發票生成
└── 財務管理
    ├── 收入統計
    ├── 財務報表
    ├── 稅務計算
    └── 合規性報告
```

## 📊 數據結構

### 核心實體
```typescript
// 訂閱計劃
export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  type: PlanType;
  status: PlanStatus;
  pricing: PricingModel;
  features: PlanFeature[];
  limits: PlanLimits;
  billing: BillingSettings;
  metadata: PlanMetadata;
  createdAt: Date;
  updatedAt: Date;
}

// 計劃類型
export enum PlanType {
  FREE = 'free',
  BASIC = 'basic',
  PROFESSIONAL = 'professional',
  ENTERPRISE = 'enterprise',
  CUSTOM = 'custom'
}

// 計劃狀態
export enum PlanStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

// 定價模型
export interface PricingModel {
  model: PricingModelType;
  currency: string;
  amount: number;
  interval: BillingInterval;
  trialPeriod?: TrialPeriod;
  setupFee?: number;
  discounts?: Discount[];
}

// 定價模型類型
export enum PricingModelType {
  FLAT_RATE = 'flat_rate',
  PER_USER = 'per_user',
  USAGE_BASED = 'usage_based',
  TIERED = 'tiered',
  VOLUME = 'volume'
}

// 計費週期
export enum BillingInterval {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

// 試用期
export interface TrialPeriod {
  duration: number;
  unit: TimeUnit;
  features: string[];
}

// 折扣
export interface Discount {
  type: DiscountType;
  value: number;
  conditions: DiscountCondition[];
  validFrom: Date;
  validTo: Date;
}

// 折扣類型
export enum DiscountType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount',
  FREE_TRIAL = 'free_trial'
}

// 折扣條件
export interface DiscountCondition {
  type: DiscountConditionType;
  value: any;
  operator: ConditionOperator;
}

// 折扣條件類型
export enum DiscountConditionType {
  MIN_USERS = 'min_users',
  MIN_DURATION = 'min_duration',
  PROMO_CODE = 'promo_code',
  CUSTOMER_TYPE = 'customer_type'
}

// 計劃功能
export interface PlanFeature {
  id: string;
  name: string;
  description: string;
  category: FeatureCategory;
  isIncluded: boolean;
  limit?: number;
  unit?: string;
  restrictions?: FeatureRestriction[];
}

// 功能類別
export enum FeatureCategory {
  USERS = 'users',
  STORAGE = 'storage',
  API_CALLS = 'api_calls',
  INTEGRATIONS = 'integrations',
  SUPPORT = 'support',
  CUSTOMIZATION = 'customization'
}

// 功能限制
export interface FeatureRestriction {
  type: RestrictionType;
  value: any;
  message: string;
}

// 限制類型
export enum RestrictionType {
  MAX_USAGE = 'max_usage',
  TIME_LIMIT = 'time_limit',
  FEATURE_ACCESS = 'feature_access'
}

// 計劃限制
export interface PlanLimits {
  maxUsers: number;
  maxStorage: number; // GB
  maxApiCalls: number;
  maxIntegrations: number;
  maxProjects: number;
  maxTeams: number;
  customLimits: Record<string, number>;
}

// 計費設置
export interface BillingSettings {
  autoRenewal: boolean;
  proration: boolean;
  gracePeriod: number; // 天數
  lateFees: LateFeeSettings;
  paymentMethods: PaymentMethodType[];
  invoiceSettings: InvoiceSettings;
}

// 遲付費用設置
export interface LateFeeSettings {
  enabled: boolean;
  type: LateFeeType;
  amount: number;
  gracePeriod: number; // 天數
}

// 遲付費用類型
export enum LateFeeType {
  PERCENTAGE = 'percentage',
  FIXED_AMOUNT = 'fixed_amount'
}

// 支付方式類型
export enum PaymentMethodType {
  CREDIT_CARD = 'credit_card',
  BANK_TRANSFER = 'bank_transfer',
  PAYPAL = 'paypal',
  ALIPAY = 'alipay',
  WECHAT_PAY = 'wechat_pay',
  INVOICE = 'invoice'
}

// 發票設置
export interface InvoiceSettings {
  template: string;
  numbering: InvoiceNumbering;
  dueDays: number;
  notes: string;
  footer: string;
}

// 發票編號
export interface InvoiceNumbering {
  prefix: string;
  format: string;
  startNumber: number;
}

// 計劃元數據
export interface PlanMetadata {
  tags: string[];
  category: string;
  priority: number;
  isPopular: boolean;
  isRecommended: boolean;
}

// 訂閱
export interface Subscription {
  id: string;
  organizationId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  billing: SubscriptionBilling;
  usage: SubscriptionUsage;
  payment: PaymentInfo;
  metadata: SubscriptionMetadata;
  createdAt: Date;
  updatedAt: Date;
  activatedAt?: Date;
  cancelledAt?: Date;
}

// 訂閱狀態
export enum SubscriptionStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
  TRIAL = 'trial'
}

// 訂閱計費
export interface SubscriptionBilling {
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  nextBillingDate: Date;
  billingCycle: BillingInterval;
  amount: number;
  currency: string;
  proration: boolean;
  autoRenewal: boolean;
}

// 訂閱使用量
export interface SubscriptionUsage {
  users: UsageMetric;
  storage: UsageMetric;
  apiCalls: UsageMetric;
  integrations: UsageMetric;
  projects: UsageMetric;
  teams: UsageMetric;
  customUsage: Record<string, UsageMetric>;
}

// 使用量指標
export interface UsageMetric {
  current: number;
  limit: number;
  unit: string;
  lastUpdated: Date;
  billingPeriod: BillingPeriod;
}

// 計費週期
export interface BillingPeriod {
  start: Date;
  end: Date;
  usage: Record<string, number>;
  cost: number;
}

// 支付信息
export interface PaymentInfo {
  method: PaymentMethodType;
  details: PaymentDetails;
  lastPayment?: Payment;
  nextPayment?: Payment;
  failedPayments: Payment[];
}

// 支付詳情
export interface PaymentDetails {
  [key: string]: any;
}

// 支付記錄
export interface Payment {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethodType;
  transactionId: string;
  gateway: PaymentGateway;
  processedAt: Date;
  failureReason?: string;
  metadata: Record<string, any>;
}

// 支付狀態
export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  CANCELLED = 'cancelled'
}

// 支付網關
export enum PaymentGateway {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  ALIPAY = 'alipay',
  WECHAT_PAY = 'wechat_pay',
  BANK_TRANSFER = 'bank_transfer'
}

// 訂閱元數據
export interface SubscriptionMetadata {
  source: string;
  notes: string;
  tags: string[];
  customFields: Record<string, any>;
}

// 發票
export interface Invoice {
  id: string;
  subscriptionId: string;
  organizationId: string;
  number: string;
  status: InvoiceStatus;
  billing: InvoiceBilling;
  items: InvoiceItem[];
  totals: InvoiceTotals;
  payment: InvoicePayment;
  metadata: InvoiceMetadata;
  createdAt: Date;
  dueDate: Date;
  paidAt?: Date;
}

// 發票狀態
export enum InvoiceStatus {
  DRAFT = 'draft',
  SENT = 'sent',
  VIEWED = 'viewed',
  PAID = 'paid',
  OVERDUE = 'overdue',
  CANCELLED = 'cancelled'
}

// 發票計費
export interface InvoiceBilling {
  periodStart: Date;
  periodEnd: Date;
  issueDate: Date;
  dueDate: Date;
  currency: string;
}

// 發票項目
export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate: number;
  taxAmount: number;
  total: number;
}

// 發票總計
export interface InvoiceTotals {
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  paid: number;
  balance: number;
}

// 發票支付
export interface InvoicePayment {
  method?: PaymentMethodType;
  transactionId?: string;
  paidAt?: Date;
  reference?: string;
}

// 發票元數據
export interface InvoiceMetadata {
  notes: string;
  footer: string;
  customFields: Record<string, any>;
}

// 使用量統計
export interface UsageStatistics {
  organizationId: string;
  subscriptionId: string;
  period: BillingPeriod;
  metrics: UsageMetric[];
  trends: UsageTrend[];
  alerts: UsageAlert[];
  lastUpdated: Date;
}

// 使用量趨勢
export interface UsageTrend {
  metric: string;
  period: string;
  value: number;
  change: number; // 百分比變化
  trend: TrendDirection;
}

// 趨勢方向
export enum TrendDirection {
  UP = 'up',
  DOWN = 'down',
  STABLE = 'stable'
}

// 使用量警報
export interface UsageAlert {
  id: string;
  metric: string;
  threshold: number;
  current: number;
  severity: AlertSeverity;
  message: string;
  triggeredAt: Date;
  acknowledged: boolean;
}

// 警報嚴重程度
export enum AlertSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// 財務報表
export interface FinancialReport {
  id: string;
  organizationId: string;
  type: ReportType;
  period: ReportPeriod;
  data: ReportData;
  generatedAt: Date;
  generatedBy: string;
}

// 報表類型
export enum ReportType {
  REVENUE = 'revenue',
  USAGE = 'usage',
  CUSTOMER = 'customer',
  CHURN = 'churn',
  LIFETIME_VALUE = 'lifetime_value'
}

// 報表週期
export interface ReportPeriod {
  start: Date;
  end: Date;
  granularity: ReportGranularity;
}

// 報表粒度
export enum ReportGranularity {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  QUARTERLY = 'quarterly',
  YEARLY = 'yearly'
}

// 報表數據
export interface ReportData {
  summary: ReportSummary;
  details: ReportDetail[];
  charts: ReportChart[];
}

// 報表摘要
export interface ReportSummary {
  totalRevenue: number;
  totalCustomers: number;
  averageRevenuePerUser: number;
  churnRate: number;
  growthRate: number;
}

// 報表明細
export interface ReportDetail {
  period: string;
  revenue: number;
  customers: number;
  newCustomers: number;
  churnedCustomers: number;
  usage: Record<string, number>;
}

// 報表圖表
export interface ReportChart {
  type: ChartType;
  title: string;
  data: ChartData;
  config: ChartConfig;
}

// 圖表類型
export enum ChartType {
  LINE = 'line',
  BAR = 'bar',
  PIE = 'pie',
  AREA = 'area'
}

// 圖表數據
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

// 圖表數據集
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string;
  borderColor?: string;
}

// 圖表配置
export interface ChartConfig {
  responsive: boolean;
  maintainAspectRatio: boolean;
  scales?: any;
  plugins?: any;
}
```

## 🎨 Angular 組件

### 訂閱管理組件
```typescript
// 訂閱管理組件
@Component({
  selector: 'app-subscription-management',
  template: `
    <nz-card>
      <div nz-row nzGutter="16">
        <div nz-col nzSpan="24">
          <div class="subscription-header">
            <h2>訂閱管理</h2>
            <button nz-button nzType="primary" (click)="upgradeSubscription()">
              <i nz-icon nzType="up"></i>
              升級訂閱
            </button>
          </div>
        </div>
      </div>
      
      <nz-tabset>
        <nz-tab nzTitle="當前訂閱">
          <app-current-subscription 
            [subscription]="currentSubscription"
            (upgrade)="upgradeSubscription()"
            (cancel)="cancelSubscription()">
          </app-current-subscription>
        </nz-tab>
        
        <nz-tab nzTitle="使用量統計">
          <app-usage-statistics 
            [usage]="usageStatistics"
            [alerts]="usageAlerts">
          </app-usage-statistics>
        </nz-tab>
        
        <nz-tab nzTitle="計費歷史">
          <app-billing-history 
            [invoices]="billingHistory"
            (viewInvoice)="viewInvoice($event)"
            (downloadInvoice)="downloadInvoice($event)">
          </app-billing-history>
        </nz-tab>
        
        <nz-tab nzTitle="支付方式">
          <app-payment-methods 
            [paymentMethods]="paymentMethods"
            (add)="addPaymentMethod()"
            (edit)="editPaymentMethod($event)"
            (delete)="deletePaymentMethod($event)">
          </app-payment-methods>
        </nz-tab>
      </nz-tabset>
    </nz-card>
  `,
  styles: [`
    .subscription-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  `]
})
export class SubscriptionManagementComponent implements OnInit {
  currentSubscription: Subscription | null = null;
  usageStatistics: UsageStatistics | null = null;
  usageAlerts: UsageAlert[] = [];
  billingHistory: Invoice[] = [];
  paymentMethods: PaymentMethod[] = [];
  
  constructor(
    private subscriptionService: SubscriptionService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}
  
  ngOnInit(): void {
    this.loadCurrentSubscription();
    this.loadUsageStatistics();
    this.loadBillingHistory();
    this.loadPaymentMethods();
  }
  
  // 升級訂閱
  upgradeSubscription(): void {
    const modalRef = this.modal.create({
      nzTitle: '升級訂閱',
      nzContent: UpgradeSubscriptionComponent,
      nzWidth: 800,
      nzComponentParams: { currentSubscription: this.currentSubscription },
      nzOnOk: (component) => component.upgrade()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadCurrentSubscription();
        this.message.success('訂閱升級成功');
      }
    });
  }
  
  // 取消訂閱
  cancelSubscription(): void {
    this.modal.confirm({
      nzTitle: '確認取消訂閱',
      nzContent: '確定要取消當前訂閱嗎？取消後將無法使用付費功能。',
      nzOnOk: () => {
        this.subscriptionService.cancelSubscription(this.currentSubscription!.id).subscribe({
          next: () => {
            this.loadCurrentSubscription();
            this.message.success('訂閱已取消');
          },
          error: (error) => this.message.error('取消訂閱失敗：' + error.message)
        });
      }
    });
  }
  
  // 查看發票
  viewInvoice(invoice: Invoice): void {
    const modalRef = this.modal.create({
      nzTitle: `發票 #${invoice.number}`,
      nzContent: InvoiceViewComponent,
      nzWidth: 600,
      nzComponentParams: { invoice },
      nzFooter: [
        {
          label: '下載 PDF',
          onClick: () => this.downloadInvoice(invoice)
        },
        {
          label: '關閉',
          onClick: () => modalRef.destroy()
        }
      ]
    });
  }
  
  // 下載發票
  downloadInvoice(invoice: Invoice): void {
    this.subscriptionService.downloadInvoice(invoice.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `invoice-${invoice.number}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => this.message.error('下載發票失敗：' + error.message)
    });
  }
  
  // 添加支付方式
  addPaymentMethod(): void {
    const modalRef = this.modal.create({
      nzTitle: '添加支付方式',
      nzContent: AddPaymentMethodComponent,
      nzWidth: 500,
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadPaymentMethods();
        this.message.success('支付方式添加成功');
      }
    });
  }
  
  // 編輯支付方式
  editPaymentMethod(paymentMethod: PaymentMethod): void {
    const modalRef = this.modal.create({
      nzTitle: '編輯支付方式',
      nzContent: EditPaymentMethodComponent,
      nzWidth: 500,
      nzComponentParams: { paymentMethod },
      nzOnOk: (component) => component.save()
    });
    
    modalRef.afterClose.subscribe(result => {
      if (result) {
        this.loadPaymentMethods();
        this.message.success('支付方式更新成功');
      }
    });
  }
  
  // 刪除支付方式
  deletePaymentMethod(paymentMethod: PaymentMethod): void {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除支付方式 "${paymentMethod.name}" 嗎？`,
      nzOnOk: () => {
        this.subscriptionService.deletePaymentMethod(paymentMethod.id).subscribe({
          next: () => {
            this.loadPaymentMethods();
            this.message.success('支付方式刪除成功');
          },
          error: (error) => this.message.error('刪除失敗：' + error.message)
        });
      }
    });
  }
  
  // 載入數據
  private loadCurrentSubscription(): void {
    this.subscriptionService.getCurrentSubscription().subscribe({
      next: (subscription) => this.currentSubscription = subscription,
      error: (error) => this.message.error('載入訂閱信息失敗：' + error.message)
    });
  }
  
  private loadUsageStatistics(): void {
    this.subscriptionService.getUsageStatistics().subscribe({
      next: (statistics) => {
        this.usageStatistics = statistics;
        this.usageAlerts = statistics.alerts;
      },
      error: (error) => this.message.error('載入使用量統計失敗：' + error.message)
    });
  }
  
  private loadBillingHistory(): void {
    this.subscriptionService.getBillingHistory().subscribe({
      next: (invoices) => this.billingHistory = invoices,
      error: (error) => this.message.error('載入計費歷史失敗：' + error.message)
    });
  }
  
  private loadPaymentMethods(): void {
    this.subscriptionService.getPaymentMethods().subscribe({
      next: (methods) => this.paymentMethods = methods,
      error: (error) => this.message.error('載入支付方式失敗：' + error.message)
    });
  }
}
```

## 🔧 服務層

### 訂閱服務
```typescript
@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private readonly baseUrl = '/api/subscriptions';
  
  constructor(private http: HttpClient) {}
  
  // 獲取當前訂閱
  getCurrentSubscription(): Observable<Subscription> {
    return this.http.get<Subscription>(`${this.baseUrl}/current`);
  }
  
  // 獲取訂閱計劃列表
  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this.http.get<SubscriptionPlan[]>(`${this.baseUrl}/plans`);
  }
  
  // 創建訂閱
  createSubscription(planId: string, paymentMethodId: string): Observable<Subscription> {
    return this.http.post<Subscription>(this.baseUrl, {
      planId,
      paymentMethodId
    });
  }
  
  // 升級訂閱
  upgradeSubscription(subscriptionId: string, planId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/${subscriptionId}/upgrade`, {
      planId
    });
  }
  
  // 降級訂閱
  downgradeSubscription(subscriptionId: string, planId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/${subscriptionId}/downgrade`, {
      planId
    });
  }
  
  // 取消訂閱
  cancelSubscription(subscriptionId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${subscriptionId}/cancel`, {});
  }
  
  // 暫停訂閱
  pauseSubscription(subscriptionId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/${subscriptionId}/pause`, {});
  }
  
  // 恢復訂閱
  resumeSubscription(subscriptionId: string): Observable<Subscription> {
    return this.http.post<Subscription>(`${this.baseUrl}/${subscriptionId}/resume`, {});
  }
  
  // 獲取使用量統計
  getUsageStatistics(): Observable<UsageStatistics> {
    return this.http.get<UsageStatistics>(`${this.baseUrl}/usage/statistics`);
  }
  
  // 獲取使用量警報
  getUsageAlerts(): Observable<UsageAlert[]> {
    return this.http.get<UsageAlert[]>(`${this.baseUrl}/usage/alerts`);
  }
  
  // 獲取計費歷史
  getBillingHistory(limit = 50): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/billing/history`, {
      params: { limit: limit.toString() }
    });
  }
  
  // 獲取發票詳情
  getInvoice(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.baseUrl}/invoices/${invoiceId}`);
  }
  
  // 下載發票
  downloadInvoice(invoiceId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    });
  }
  
  // 獲取支付方式
  getPaymentMethods(): Observable<PaymentMethod[]> {
    return this.http.get<PaymentMethod[]>(`${this.baseUrl}/payment-methods`);
  }
  
  // 添加支付方式
  addPaymentMethod(paymentMethod: Partial<PaymentMethod>): Observable<PaymentMethod> {
    return this.http.post<PaymentMethod>(`${this.baseUrl}/payment-methods`, paymentMethod);
  }
  
  // 更新支付方式
  updatePaymentMethod(id: string, paymentMethod: Partial<PaymentMethod>): Observable<PaymentMethod> {
    return this.http.put<PaymentMethod>(`${this.baseUrl}/payment-methods/${id}`, paymentMethod);
  }
  
  // 刪除支付方式
  deletePaymentMethod(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/payment-methods/${id}`);
  }
  
  // 設置默認支付方式
  setDefaultPaymentMethod(id: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/payment-methods/${id}/default`, {});
  }
  
  // 獲取財務報表
  getFinancialReport(type: ReportType, period: ReportPeriod): Observable<FinancialReport> {
    return this.http.post<FinancialReport>(`${this.baseUrl}/reports`, {
      type,
      period
    });
  }
  
  // 導出財務報表
  exportFinancialReport(reportId: string, format: 'pdf' | 'excel'): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/reports/${reportId}/export`, {
      responseType: 'blob',
      params: { format }
    });
  }
}
```

## 📊 成功指標

### 功能指標
- [ ] 訂閱管理功能完整性 > 95%
- [ ] 計費系統準確性 > 99.9%
- [ ] 支付處理成功率 > 99%
- [ ] 發票生成準確性 > 99%

### 性能指標
- [ ] 訂閱創建時間 < 30 秒
- [ ] 計費計算時間 < 5 秒
- [ ] 發票生成時間 < 10 秒
- [ ] 支付處理時間 < 15 秒

---

**📝 注意**: 計費訂閱管理模組需要與支付網關緊密集成，確保支付安全和數據準確性。