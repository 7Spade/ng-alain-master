# 8️⃣ 通知系統模組

## 📋 模組概述

通知系統模組負責組織內部的消息通知、告警提醒、事件推送等功能，提供多渠道的通知服務，確保用戶能夠及時收到重要信息。

### 🎯 功能目標
- 提供多渠道通知服務
- 實現智能通知過濾
- 支持通知模板管理
- 提供通知統計分析

## 🏗️ 功能架構

### 核心功能
```
通知系統模組
├── 通知渠道管理
│   ├── 郵件通知
│   ├── 推送通知
│   ├── 短信通知
│   └── 站內消息
├── 通知模板管理
│   ├── 模板創建和編輯
│   ├── 變量替換
│   ├── 模板預覽
│   └── 模板版本管理
├── 通知規則引擎
│   ├── 觸發條件設置
│   ├── 通知頻率控制
│   ├── 通知時間窗口
│   └── 用戶偏好設置
├── 通知發送服務
│   ├── 批量發送
│   ├── 發送狀態追蹤
│   ├── 失敗重試機制
│   └── 發送統計分析
└── 通知管理中心
    ├── 通知歷史
    ├── 用戶反饋
    ├── 通知設置
    └── 通知統計
```

## 📊 數據結構設計

### 通知實體 (Notification)
```typescript
interface Notification {
  id: string;                           // 通知唯一標識
  type: NotificationType;               // 通知類型
  title: string;                        // 通知標題
  content: string;                      // 通知內容
  templateId?: string;                  // 模板ID
  variables: Record<string, any>;       // 變量替換
  channels: NotificationChannel[];      // 發送渠道
  recipients: NotificationRecipient[];  // 接收者
  sender: NotificationSender;           // 發送者
  priority: NotificationPriority;       // 優先級
  status: NotificationStatus;           // 狀態
  scheduledAt?: Date;                   // 計劃發送時間
  sentAt?: Date;                        // 實際發送時間
  readAt?: Date;                        // 讀取時間
  organizationId: string;               // 所屬組織
  metadata: NotificationMetadata;       // 元數據
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

enum NotificationType {
  SYSTEM = 'system',                    // 系統通知
  SECURITY = 'security',                // 安全通知
  TEAM = 'team',                        // 團隊通知
  PROJECT = 'project',                  // 項目通知
  REMINDER = 'reminder',                // 提醒通知
  ALERT = 'alert'                       // 告警通知
}

enum NotificationChannel {
  EMAIL = 'email',                      // 郵件
  PUSH = 'push',                        // 推送
  SMS = 'sms',                          // 短信
  IN_APP = 'in_app'                     // 站內消息
}

enum NotificationPriority {
  LOW = 'low',                          // 低
  MEDIUM = 'medium',                    // 中
  HIGH = 'high',                        // 高
  URGENT = 'urgent'                     // 緊急
}

enum NotificationStatus {
  DRAFT = 'draft',                      // 草稿
  SCHEDULED = 'scheduled',              // 已計劃
  SENDING = 'sending',                  // 發送中
  SENT = 'sent',                        // 已發送
  DELIVERED = 'delivered',              // 已送達
  READ = 'read',                        // 已讀取
  FAILED = 'failed',                    // 發送失敗
  CANCELLED = 'cancelled'               // 已取消
}

interface NotificationRecipient {
  userId: string;                       // 用戶ID
  email?: string;                       // 郵箱
  phone?: string;                       // 電話
  deviceTokens: string[];               // 設備令牌
  preferences: NotificationPreferences; // 通知偏好
}

interface NotificationSender {
  type: 'system' | 'user' | 'organization';
  id: string;
  name: string;
  avatar?: string;
}

interface NotificationMetadata {
  source: string;                       // 通知來源
  category: string;                     // 通知分類
  tags: string[];                       // 標籤
  context: Record<string, any>;         // 上下文信息
  trackingId?: string;                  // 追蹤ID
}
```

### 通知模板實體 (NotificationTemplate)
```typescript
interface NotificationTemplate {
  id: string;                           // 模板唯一標識
  name: string;                         // 模板名稱
  type: NotificationType;               // 通知類型
  channels: NotificationChannel[];      // 支持的渠道
  subject: string;                      // 主題模板
  content: string;                      // 內容模板
  variables: TemplateVariable[];        // 變量定義
  isActive: boolean;                    // 是否啟用
  organizationId: string;               // 所屬組織
  createdBy: string;                    // 創建者
  version: number;                      // 版本號
  createdAt: Date;                      // 創建時間
  updatedAt: Date;                      // 更新時間
}

interface TemplateVariable {
  name: string;                         // 變量名
  type: 'string' | 'number' | 'date' | 'boolean';
  required: boolean;                    // 是否必需
  defaultValue?: any;                   // 默認值
  description: string;                  // 描述
}
```

## 🧩 Angular 組件設計

### 通知管理主組件
```typescript
@Component({
  selector: 'app-notification-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, STModule, SEModule],
  template: `
    <div class="notification-management">
      <se-container>
        <se label="通知類型">
          <nz-select [(ngModel)]="searchForm.type" nzAllowClear>
            <nz-option *ngFor="let type of notificationTypes" [nzValue]="type.value" [nzLabel]="type.label"></nz-option>
          </nz-select>
        </se>
        <se label="狀態">
          <nz-select [(ngModel)]="searchForm.status" nzAllowClear>
            <nz-option *ngFor="let status of notificationStatuses" [nzValue]="status.value" [nzLabel]="status.label"></nz-option>
          </nz-select>
        </se>
        <se label="時間範圍">
          <nz-range-picker [(ngModel)]="searchForm.dateRange"></nz-range-picker>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="search()">搜索</button>
          <button nz-button (click)="reset()">重置</button>
          <button nz-button nzType="primary" (click)="createNotification()">創建通知</button>
        </se>
      </se-container>
      
      <st
        [data]="notifications"
        [columns]="columns"
        [page]="{ front: false, show: true, showSize: true }"
        (change)="onTableChange($event)"
        (refresh)="loadNotifications()">
      </st>
    </div>
  `
})
export class NotificationManagementComponent implements OnInit {
  private readonly notificationService = inject(NotificationService);
  private readonly modal = inject(NzModalService);
  private readonly message = inject(NzMessageService);
  
  searchForm = {
    type: null,
    status: null,
    dateRange: null
  };
  
  notifications: Notification[] = [];
  notificationTypes = [
    { value: NotificationType.SYSTEM, label: '系統通知' },
    { value: NotificationType.SECURITY, label: '安全通知' },
    { value: NotificationType.TEAM, label: '團隊通知' },
    { value: NotificationType.PROJECT, label: '項目通知' },
    { value: NotificationType.REMINDER, label: '提醒通知' },
    { value: NotificationType.ALERT, label: '告警通知' }
  ];
  
  notificationStatuses = [
    { value: NotificationStatus.DRAFT, label: '草稿' },
    { value: NotificationStatus.SCHEDULED, label: '已計劃' },
    { value: NotificationStatus.SENDING, label: '發送中' },
    { value: NotificationStatus.SENT, label: '已發送' },
    { value: NotificationStatus.DELIVERED, label: '已送達' },
    { value: NotificationStatus.READ, label: '已讀取' },
    { value: NotificationStatus.FAILED, label: '發送失敗' }
  ];
  
  columns: STColumn[] = [
    { title: '類型', index: 'type', width: 100, type: 'tag' },
    { title: '標題', index: 'title', width: 200 },
    { title: '接收者', index: 'recipients.length', width: 100 },
    { title: '渠道', index: 'channels', width: 150, type: 'tag' },
    { title: '優先級', index: 'priority', width: 100, type: 'tag' },
    { title: '狀態', index: 'status', width: 100, type: 'tag' },
    { title: '創建時間', index: 'createdAt', width: 150, type: 'date' },
    { title: '發送時間', index: 'sentAt', width: 150, type: 'date' },
    {
      title: '操作',
      width: 200,
      buttons: [
        {
          text: '查看',
          click: (record: Notification) => this.viewNotification(record)
        },
        {
          text: '編輯',
          click: (record: Notification) => this.editNotification(record)
        },
        {
          text: '取消',
          click: (record: Notification) => this.cancelNotification(record)
        }
      ]
    }
  ];
  
  ngOnInit() {
    this.loadNotifications();
  }
  
  loadNotifications() {
    this.notificationService.getNotifications(this.searchForm).subscribe({
      next: (notifications) => this.notifications = notifications,
      error: (error) => this.message.error('載入通知失敗')
    });
  }
  
  createNotification() {
    this.modal.create({
      nzTitle: '創建通知',
      nzContent: AppCreateNotificationModalComponent,
      nzFooter: null,
      nzWidth: 800,
      nzOnOk: () => {
        this.loadNotifications();
        return true;
      }
    });
  }
  
  viewNotification(notification: Notification) {
    this.modal.create({
      nzTitle: '通知詳情',
      nzContent: AppNotificationDetailsModalComponent,
      nzComponentParams: { notification },
      nzFooter: null,
      nzWidth: 600
    });
  }
  
  editNotification(notification: Notification) {
    this.modal.create({
      nzTitle: '編輯通知',
      nzContent: AppEditNotificationModalComponent,
      nzComponentParams: { notification },
      nzFooter: null,
      nzWidth: 800,
      nzOnOk: () => {
        this.loadNotifications();
        return true;
      }
    });
  }
  
  cancelNotification(notification: Notification) {
    this.notificationService.cancelNotification(notification.id).subscribe({
      next: () => {
        this.message.success('通知已取消');
        this.loadNotifications();
      }
    });
  }
  
  search() {
    this.loadNotifications();
  }
  
  reset() {
    this.searchForm = { type: null, status: null, dateRange: null };
    this.loadNotifications();
  }
  
  onTableChange(event: STChange) {
    // 處理表格變化
  }
}
```

## 🔧 服務層設計

### 通知服務 (NotificationService)
```typescript
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly http = inject(_HttpClient);
  private readonly cache = inject(DelonCacheService);
  
  private readonly API_BASE = '/api/notifications';
  
  // 獲取通知列表
  getNotifications(params?: any): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.API_BASE, { params });
  }
  
  // 創建通知
  createNotification(notification: Partial<Notification>): Observable<Notification> {
    return this.http.post<Notification>(this.API_BASE, notification);
  }
  
  // 發送通知
  sendNotification(notificationId: string): Observable<void> {
    return this.http.post<void>(`${this.API_BASE}/${notificationId}/send`, {});
  }
  
  // 取消通知
  cancelNotification(notificationId: string): Observable<void> {
    return this.http.post<void>(`${this.API_BASE}/${notificationId}/cancel`, {});
  }
  
  // 獲取通知統計
  getNotificationStatistics(params?: any): Observable<NotificationStatistics> {
    return this.http.get<NotificationStatistics>(`${this.API_BASE}/statistics`, { params });
  }
  
  // 批量發送通知
  batchSendNotifications(notifications: Partial<Notification>[]): Observable<void> {
    return this.http.post<void>(`${this.API_BASE}/batch-send`, { notifications });
  }
}

interface NotificationStatistics {
  totalNotifications: number;           // 總通知數
  sentNotifications: number;            // 已發送通知數
  deliveredNotifications: number;       // 已送達通知數
  readNotifications: number;            // 已讀通知數
  failedNotifications: number;          // 失敗通知數
  averageDeliveryTime: number;          // 平均送達時間
  deliveryRate: number;                 // 送達率
  readRate: number;                     // 讀取率
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('NotificationService', () => {
  let service: NotificationService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create notification successfully', () => {
    const notification: Partial<Notification> = {
      type: NotificationType.SYSTEM,
      title: 'Test Notification',
      content: 'Test content',
      channels: [NotificationChannel.EMAIL],
      priority: NotificationPriority.MEDIUM
    };
    
    service.createNotification(notification).subscribe(result => {
      expect(result.title).toBe('Test Notification');
    });
    
    const req = httpMock.expectOne('/api/notifications');
    expect(req.request.method).toBe('POST');
    req.flush({ ...notification, id: '1' });
  });
});
```

## ⚡ 性能優化

### 通知隊列優化
```typescript
@Injectable({
  providedIn: 'root'
})
export class NotificationQueueService {
  private readonly queue = new Map<NotificationChannel, Notification[]>();
  private readonly processing = new Map<NotificationChannel, boolean>();
  
  // 添加通知到隊列
  addToQueue(notification: Notification): void {
    notification.channels.forEach(channel => {
      if (!this.queue.has(channel)) {
        this.queue.set(channel, []);
      }
      this.queue.get(channel)!.push(notification);
    });
    
    this.processQueue();
  }
  
  // 處理隊列
  private async processQueue(): Promise<void> {
    for (const [channel, notifications] of this.queue.entries()) {
      if (this.processing.get(channel) || notifications.length === 0) {
        continue;
      }
      
      this.processing.set(channel, true);
      
      try {
        await this.processChannelQueue(channel, notifications);
      } finally {
        this.processing.set(channel, false);
      }
    }
  }
  
  private async processChannelQueue(channel: NotificationChannel, notifications: Notification[]): Promise<void> {
    const batchSize = this.getBatchSize(channel);
    const batches = this.chunkArray(notifications, batchSize);
    
    for (const batch of batches) {
      await this.sendBatch(channel, batch);
      // 移除已處理的通知
      notifications.splice(0, batch.length);
    }
  }
  
  private getBatchSize(channel: NotificationChannel): number {
    const batchSizes = {
      [NotificationChannel.EMAIL]: 100,
      [NotificationChannel.PUSH]: 1000,
      [NotificationChannel.SMS]: 50,
      [NotificationChannel.IN_APP]: 500
    };
    return batchSizes[channel] || 100;
  }
  
  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
  
  private async sendBatch(channel: NotificationChannel, batch: Notification[]): Promise<void> {
    // 根據渠道發送批次通知
    switch (channel) {
      case NotificationChannel.EMAIL:
        await this.sendEmailBatch(batch);
        break;
      case NotificationChannel.PUSH:
        await this.sendPushBatch(batch);
        break;
      case NotificationChannel.SMS:
        await this.sendSMSBatch(batch);
        break;
      case NotificationChannel.IN_APP:
        await this.sendInAppBatch(batch);
        break;
    }
  }
}
```

## 🚀 API 設計

### RESTful API 端點
```typescript
// 通知管理 API
GET    /api/notifications                    // 獲取通知列表
POST   /api/notifications                    // 創建通知
GET    /api/notifications/:id               // 獲取通知詳情
PUT    /api/notifications/:id               // 更新通知
DELETE /api/notifications/:id               // 刪除通知
POST   /api/notifications/:id/send          // 發送通知
POST   /api/notifications/:id/cancel        // 取消通知
POST   /api/notifications/batch-send        // 批量發送通知
GET    /api/notifications/statistics        // 獲取通知統計

// 通知模板 API
GET    /api/notification-templates          // 獲取模板列表
POST   /api/notification-templates          // 創建模板
GET    /api/notification-templates/:id     // 獲取模板詳情
PUT    /api/notification-templates/:id     // 更新模板
DELETE /api/notification-templates/:id     // 刪除模板
```

## 📊 成功指標

### 功能指標
- [ ] 支持 4 種通知渠道
- [ ] 通知發送成功率 > 99%
- [ ] 支持批量發送 1000+ 通知
- [ ] 通知送達時間 < 30 秒
- [ ] 支持通知模板管理

### 性能指標
- [ ] 通知處理延遲 < 5 秒
- [ ] 支持並發發送 10000+ 通知
- [ ] 通知隊列處理能力 > 1000/秒
- [ ] 支持通知優先級處理

### 用戶體驗指標
- [ ] 通知讀取率 > 80%
- [ ] 用戶滿意度 > 90%
- [ ] 支持通知偏好設置
- [ ] 支持通知免打擾模式

---

**📝 注意**: 本模組需要與組織設置模組和審計安全模組深度集成，確保通知的可靠性和安全性。