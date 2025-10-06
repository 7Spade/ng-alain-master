# 10️⃣ 溝通協作模組

## 📋 模組概述

溝通協作模組提供專案團隊的全面協作功能，包括即時通訊、會議管理、討論區、通知系統、文件協作等功能。此模組是 Project-Build 系統的協作核心組件。

### 🎯 功能目標
- 實現即時通訊和群組聊天
- 提供會議安排和記錄功能
- 支持討論區和主題討論
- 實現智能通知和提醒
- 整合所有模組的協作數據

## 🏗️ 功能架構

### 核心功能
```
溝通協作模組
├── 即時通訊
│   ├── 私聊功能
│   ├── 群組聊天
│   ├── 頻道管理
│   └── 訊息歷史
├── 會議管理
│   ├── 會議安排
│   ├── 會議記錄
│   ├── 會議錄音
│   └── 會議回放
├── 討論區
│   ├── 主題討論
│   ├── 投票功能
│   ├── 意見收集
│   └── 決策記錄
├── 通知系統
│   ├── 即時通知
│   ├── 郵件通知
│   ├── 推送通知
│   └── 通知偏好
└── 文件協作
    ├── 共享文件
    ├── 版本控制
    ├── 評論功能
    └── 協作編輯
```

## 📊 數據結構設計

### 即時通訊實體 (ChatMessage)
```typescript
interface ChatMessage {
  id: string;                    // 訊息唯一標識
  channelId: string;             // 頻道 ID
  senderId: string;              // 發送者 ID
  content: string;               // 訊息內容
  type: MessageType;             // 訊息類型
  status: MessageStatus;         // 訊息狀態
  replyTo?: string;              // 回覆的訊息 ID
  mentions: string[];            // 提及的用戶 ID
  attachments: Attachment[];     // 附件
  reactions: MessageReaction[];  // 反應
  editedAt?: Date;              // 編輯時間
  deletedAt?: Date;             // 刪除時間
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum MessageType {
  TEXT = 'text',                 // 文字
  IMAGE = 'image',              // 圖片
  FILE = 'file',                // 文件
  AUDIO = 'audio',              // 音頻
  VIDEO = 'video',              // 視頻
  LINK = 'link',                // 連結
  CODE = 'code',                // 代碼
  SYSTEM = 'system'             // 系統訊息
}

enum MessageStatus {
  SENDING = 'sending',           // 發送中
  SENT = 'sent',                // 已發送
  DELIVERED = 'delivered',       // 已送達
  READ = 'read',                // 已讀
  FAILED = 'failed'             // 發送失敗
}

interface MessageReaction {
  id: string;                    // 反應唯一標識
  userId: string;                // 用戶 ID
  emoji: string;                // 表情符號
  createdAt: Date;              // 創建時間
}

interface ChatChannel {
  id: string;                    // 頻道唯一標識
  projectId: string;             // 所屬專案 ID
  name: string;                  // 頻道名稱
  description?: string;           // 頻道描述
  type: ChannelType;             // 頻道類型
  visibility: ChannelVisibility; // 可見性
  members: ChannelMember[];      // 成員
  settings: ChannelSettings;     // 頻道設置
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum ChannelType {
  PUBLIC = 'public',             // 公開頻道
  PRIVATE = 'private',           // 私人頻道
  DIRECT = 'direct',             // 直接訊息
  GROUP = 'group'               // 群組頻道
}

enum ChannelVisibility {
  VISIBLE = 'visible',           // 可見
  HIDDEN = 'hidden',            // 隱藏
  ARCHIVED = 'archived'         // 已封存
}

interface ChannelMember {
  id: string;                    // 成員唯一標識
  userId: string;                // 用戶 ID
  role: ChannelRole;            // 頻道角色
  joinedAt: Date;              // 加入時間
  lastReadAt?: Date;            // 最後閱讀時間
  notificationSettings: NotificationSettings; // 通知設置
}

enum ChannelRole {
  OWNER = 'owner',               // 擁有者
  ADMIN = 'admin',              // 管理員
  MEMBER = 'member'             // 成員
}

interface ChannelSettings {
  id: string;                    // 設置唯一標識
  allowFileSharing: boolean;     // 允許文件共享
  allowMentions: boolean;        // 允許提及
  allowReactions: boolean;       // 允許反應
  allowThreads: boolean;         // 允許線程
  maxFileSize: number;          // 最大文件大小
  retentionDays: number;        // 保留天數
  autoArchive: boolean;         // 自動封存
  moderationEnabled: boolean;    // 啟用審核
}

interface NotificationSettings {
  id: string;                    // 設置唯一標識
  mentions: boolean;             // 提及通知
  directMessages: boolean;       // 直接訊息通知
  channelMessages: boolean;      // 頻道訊息通知
  reactions: boolean;            // 反應通知
  emailNotifications: boolean;   // 郵件通知
  pushNotifications: boolean;     // 推送通知
  quietHours: QuietHours;       // 靜音時間
}

interface QuietHours {
  id: string;                    // 靜音唯一標識
  enabled: boolean;              // 是否啟用
  startTime: string;             // 開始時間
  endTime: string;               // 結束時間
  timezone: string;              // 時區
  days: DayOfWeek[];            // 適用日期
}
```

### 會議管理實體 (Meeting)
```typescript
interface Meeting {
  id: string;                    // 會議唯一標識
  projectId: string;             // 所屬專案 ID
  title: string;                // 會議標題
  description?: string;           // 會議描述
  type: MeetingType;             // 會議類型
  status: MeetingStatus;         // 會議狀態
  startTime: Date;              // 開始時間
  endTime: Date;                // 結束時間
  duration: number;             // 持續時間
  location: MeetingLocation;     // 會議地點
  organizer: string;            // 組織者 ID
  attendees: MeetingAttendee[];  // 參與者
  agenda: MeetingAgenda[];       // 議程
  minutes: MeetingMinutes;       // 會議記錄
  recordings: MeetingRecording[]; // 錄音錄影
  attachments: Attachment[];     // 附件
  reminders: MeetingReminder[];  // 提醒
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum MeetingType {
  REGULAR = 'regular',           // 例行會議
  PROJECT_REVIEW = 'project_review', // 專案審查
  CLIENT_MEETING = 'client_meeting', // 客戶會議
  TEAM_SYNC = 'team_sync',       // 團隊同步
  BRAINSTORMING = 'brainstorming', // 腦力激盪
  TRAINING = 'training',         // 培訓會議
  EMERGENCY = 'emergency'        // 緊急會議
}

enum MeetingStatus {
  SCHEDULED = 'scheduled',       // 已排程
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  CANCELLED = 'cancelled',       // 已取消
  POSTPONED = 'postponed'        // 已延期
}

interface MeetingLocation {
  id: string;                    // 地點唯一標識
  type: LocationType;           // 地點類型
  name: string;                 // 地點名稱
  address?: string;             // 地址
  room?: string;               // 房間
  link?: string;               // 線上連結
  coordinates?: Coordinates;     // 座標
}

enum LocationType {
  PHYSICAL = 'physical',         // 實體地點
  VIRTUAL = 'virtual',          // 虛擬會議
  HYBRID = 'hybrid'             // 混合會議
}

interface Coordinates {
  latitude: number;             // 緯度
  longitude: number;            // 經度
}

interface MeetingAttendee {
  id: string;                    // 參與者唯一標識
  userId: string;                // 用戶 ID
  role: AttendeeRole;           // 參與者角色
  status: AttendeeStatus;       // 參與狀態
  responseTime?: Date;          // 回應時間
  notes?: string;               // 備註
}

enum AttendeeRole {
  ORGANIZER = 'organizer',       // 組織者
  PRESENTER = 'presenter',       // 演講者
  PARTICIPANT = 'participant',   // 參與者
  OBSERVER = 'observer'          // 觀察者
}

enum AttendeeStatus {
  INVITED = 'invited',           // 已邀請
  ACCEPTED = 'accepted',         // 已接受
  DECLINED = 'declined',         // 已拒絕
  TENTATIVE = 'tentative',       // 暫定
  ATTENDED = 'attended',         // 已參加
  ABSENT = 'absent'             // 缺席
}

interface MeetingAgenda {
  id: string;                    // 議程唯一標識
  order: number;                // 順序
  title: string;                // 議程標題
  description?: string;           // 議程描述
  duration: number;             // 預計時間
  presenter?: string;           // 演講者 ID
  status: AgendaStatus;         // 議程狀態
  notes?: string;               // 備註
}

enum AgendaStatus {
  PENDING = 'pending',           // 待處理
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  SKIPPED = 'skipped'           // 已跳過
}

interface MeetingMinutes {
  id: string;                    // 記錄唯一標識
  recorder: string;             // 記錄者 ID
  summary: string;              // 會議摘要
  decisions: Decision[];         // 決策
  actionItems: ActionItem[];     // 行動項目
  nextSteps: string[];          // 下一步
  attachments: Attachment[];     // 附件
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

interface Decision {
  id: string;                    // 決策唯一標識
  title: string;                // 決策標題
  description: string;           // 決策描述
  rationale: string;            // 理由
  impact: string;               // 影響
  responsible: string;           // 負責人 ID
  dueDate?: Date;               // 截止日期
  status: DecisionStatus;        // 狀態
}

enum DecisionStatus {
  PENDING = 'pending',           // 待處理
  APPROVED = 'approved',         // 已批准
  REJECTED = 'rejected',         // 已拒絕
  IMPLEMENTED = 'implemented'     // 已實施
}

interface ActionItem {
  id: string;                    // 行動項目唯一標識
  title: string;                // 標題
  description: string;           // 描述
  assignee: string;             // 負責人 ID
  dueDate: Date;                // 截止日期
  priority: Priority;           // 優先級
  status: ActionItemStatus;     // 狀態
  progress: number;             // 進度
  notes?: string;               // 備註
}

enum ActionItemStatus {
  NOT_STARTED = 'not_started',   // 未開始
  IN_PROGRESS = 'in_progress',   // 進行中
  COMPLETED = 'completed',       // 已完成
  OVERDUE = 'overdue',          // 逾期
  CANCELLED = 'cancelled'        // 已取消
}

interface MeetingRecording {
  id: string;                    // 錄音唯一標識
  type: RecordingType;          // 錄音類型
  url: string;                  // 錄音連結
  duration: number;             // 持續時間
  size: number;                 // 文件大小
  quality: RecordingQuality;     // 品質
  transcript?: string;          // 轉錄文字
  createdAt: Date;              // 創建時間
}

enum RecordingType {
  AUDIO = 'audio',               // 音頻
  VIDEO = 'video',              // 視頻
  SCREEN = 'screen'             // 螢幕錄製
}

enum RecordingQuality {
  LOW = 'low',                  // 低品質
  MEDIUM = 'medium',            // 中等品質
  HIGH = 'high',                // 高品質
  ULTRA = 'ultra'               // 超高品質
}

interface MeetingReminder {
  id: string;                    // 提醒唯一標識
  type: ReminderType;           // 提醒類型
  time: Date;                   // 提醒時間
  message: string;              // 提醒訊息
  sent: boolean;                // 是否已發送
  recipients: string[];         // 接收者
}

enum ReminderType {
  EMAIL = 'email',               // 郵件提醒
  PUSH = 'push',                // 推送提醒
  SMS = 'sms'                   // 簡訊提醒
}
```

### 討論區實體 (Discussion)
```typescript
interface Discussion {
  id: string;                    // 討論唯一標識
  projectId: string;             // 所屬專案 ID
  title: string;                // 討論標題
  description: string;            // 討論描述
  category: DiscussionCategory;  // 討論分類
  type: DiscussionType;          // 討論類型
  status: DiscussionStatus;      // 討論狀態
  priority: Priority;           // 優先級
  author: string;               // 作者 ID
  participants: DiscussionParticipant[]; // 參與者
  posts: DiscussionPost[];       // 討論貼文
  tags: string[];               // 標籤
  attachments: Attachment[];     // 附件
  votes: DiscussionVote[];      // 投票
  decisions: DiscussionDecision[]; // 決策
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  lastActivityAt: Date;         // 最後活動時間
}

enum DiscussionCategory {
  GENERAL = 'general',           // 一般討論
  TECHNICAL = 'technical',       // 技術討論
  PROJECT = 'project',          // 專案討論
  FEEDBACK = 'feedback',        // 意見反饋
  ANNOUNCEMENT = 'announcement', // 公告
  QUESTION = 'question'         // 問題討論
}

enum DiscussionType {
  OPEN = 'open',                // 開放討論
  RESTRICTED = 'restricted',    // 限制討論
  PRIVATE = 'private',          // 私人討論
  VOTING = 'voting'             // 投票討論
}

enum DiscussionStatus {
  ACTIVE = 'active',            // 活躍
  CLOSED = 'closed',            // 已關閉
  ARCHIVED = 'archived',        // 已封存
  LOCKED = 'locked'             // 已鎖定
}

interface DiscussionParticipant {
  id: string;                    // 參與者唯一標識
  userId: string;                // 用戶 ID
  role: ParticipantRole;        // 參與者角色
  joinedAt: Date;              // 加入時間
  lastReadAt?: Date;            // 最後閱讀時間
  notificationSettings: NotificationSettings; // 通知設置
}

enum ParticipantRole {
  CREATOR = 'creator',           // 創建者
  MODERATOR = 'moderator',       // 版主
  PARTICIPANT = 'participant'     // 參與者
}

interface DiscussionPost {
  id: string;                    // 貼文唯一標識
  discussionId: string;          // 討論 ID
  authorId: string;              // 作者 ID
  content: string;               // 內容
  type: PostType;               // 貼文類型
  status: PostStatus;           // 貼文狀態
  replyTo?: string;             // 回覆的貼文 ID
  mentions: string[];           // 提及的用戶 ID
  attachments: Attachment[];     // 附件
  reactions: PostReaction[];     // 反應
  votes: PostVote[];            // 投票
  editedAt?: Date;              // 編輯時間
  deletedAt?: Date;             // 刪除時間
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
}

enum PostType {
  COMMENT = 'comment',           // 評論
  REPLY = 'reply',              // 回覆
  ANNOUNCEMENT = 'announcement', // 公告
  QUESTION = 'question',        // 問題
  ANSWER = 'answer',            // 答案
  SUGGESTION = 'suggestion'     // 建議
}

enum PostStatus {
  PUBLISHED = 'published',       // 已發布
  DRAFT = 'draft',              // 草稿
  HIDDEN = 'hidden',            // 隱藏
  DELETED = 'deleted'           // 已刪除
}

interface PostReaction {
  id: string;                    // 反應唯一標識
  userId: string;                // 用戶 ID
  emoji: string;                // 表情符號
  createdAt: Date;              // 創建時間
}

interface PostVote {
  id: string;                    // 投票唯一標識
  userId: string;                // 用戶 ID
  type: VoteType;               // 投票類型
  createdAt: Date;              // 創建時間
}

enum VoteType {
  UP = 'up',                    // 贊成
  DOWN = 'down',                // 反對
  NEUTRAL = 'neutral'           // 中立
}

interface DiscussionVote {
  id: string;                    // 投票唯一標識
  discussionId: string;         // 討論 ID
  title: string;                // 投票標題
  description?: string;          // 投票描述
  type: DiscussionVoteType;     // 投票類型
  options: VoteOption[];         // 選項
  voters: VoteRecord[];          // 投票記錄
  status: VoteStatus;           // 投票狀態
  startDate: Date;              // 開始日期
  endDate: Date;                // 結束日期
  createdAt: Date;              // 創建時間
  createdBy: string;            // 創建者 ID
}

enum DiscussionVoteType {
  SINGLE_CHOICE = 'single_choice', // 單選
  MULTIPLE_CHOICE = 'multiple_choice', // 多選
  RATING = 'rating',            // 評分
  YES_NO = 'yes_no'            // 是/否
}

interface VoteOption {
  id: string;                    // 選項唯一標識
  text: string;                  // 選項文字
  description?: string;          // 選項描述
  votes: number;                // 票數
}

interface VoteRecord {
  id: string;                    // 投票記錄唯一標識
  userId: string;                // 用戶 ID
  optionId: string;             // 選項 ID
  votedAt: Date;                // 投票時間
}

enum VoteStatus {
  ACTIVE = 'active',            // 進行中
  CLOSED = 'closed',            // 已結束
  CANCELLED = 'cancelled'        // 已取消
}

interface DiscussionDecision {
  id: string;                    // 決策唯一標識
  discussionId: string;         // 討論 ID
  title: string;                // 決策標題
  description: string;           // 決策描述
  rationale: string;            // 理由
  impact: string;               // 影響
  responsible: string;           // 負責人 ID
  dueDate?: Date;               // 截止日期
  status: DecisionStatus;        // 狀態
  createdAt: Date;              // 創建時間
  createdBy: string;            // 創建者 ID
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 溝通協作主組件
@Component({
  selector: 'app-collaboration',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>溝通協作</nz-card-title>
        <nz-card-extra>
          <nz-button-group>
            <button nz-button nzType="primary" (click)="createChannel()">
              <i nz-icon nzType="plus"></i>
              創建頻道
            </button>
            <button nz-button (click)="scheduleMeeting()">
              <i nz-icon nzType="calendar"></i>
              安排會議
            </button>
          </nz-button-group>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="即時通訊">
            <app-chat-interface></app-chat-interface>
          </nz-tab>
          <nz-tab nzTitle="會議管理">
            <app-meeting-management></app-meeting-management>
          </nz-tab>
          <nz-tab nzTitle="討論區">
            <app-discussion-forum></app-discussion-forum>
          </nz-tab>
          <nz-tab nzTitle="通知中心">
            <app-notification-center></app-notification-center>
          </nz-tab>
          <nz-tab nzTitle="文件協作">
            <app-document-collaboration></app-document-collaboration>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class CollaborationComponent implements OnInit {
  constructor(
    private collaborationService: CollaborationService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.collaborationService.loadChannels();
  }
  
  createChannel() {
    this.modal.create({
      nzTitle: '創建頻道',
      nzContent: AppCreateChannelModalComponent,
      nzFooter: null,
      nzWidth: 600
    });
  }
  
  scheduleMeeting() {
    this.modal.create({
      nzTitle: '安排會議',
      nzContent: AppScheduleMeetingModalComponent,
      nzFooter: null,
      nzWidth: 800
    });
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class CollaborationService {
  private readonly apiUrl = '/api/projects';
  
  private channelsSubject = new BehaviorSubject<ChatChannel[]>([]);
  private messagesSubject = new BehaviorSubject<ChatMessage[]>([]);
  private meetingsSubject = new BehaviorSubject<Meeting[]>([]);
  private discussionsSubject = new BehaviorSubject<Discussion[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  channels$ = this.channelsSubject.asObservable();
  messages$ = this.messagesSubject.asObservable();
  meetings$ = this.meetingsSubject.asObservable();
  discussions$ = this.discussionsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 載入頻道
  loadChannels(): void {
    this.loadingSubject.next(true);
    const projectId = this.getCurrentProjectId();
    
    this.http.get<ChatChannel[]>(`${this.apiUrl}/${projectId}/channels`)
      .pipe(
        tap(channels => this.channelsSubject.next(channels)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 創建頻道
  createChannel(channelData: CreateChannelRequest): Observable<ChatChannel> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<ChatChannel>(`${this.apiUrl}/${projectId}/channels`, channelData).pipe(
      tap(channel => {
        const currentChannels = this.channelsSubject.value;
        this.channelsSubject.next([...currentChannels, channel]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 發送訊息
  sendMessage(messageData: CreateMessageRequest): Observable<ChatMessage> {
    return this.http.post<ChatMessage>('/api/chat-messages', messageData).pipe(
      tap(message => {
        const currentMessages = this.messagesSubject.value;
        this.messagesSubject.next([...currentMessages, message]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入訊息
  loadMessages(channelId: string): void {
    this.http.get<ChatMessage[]>(`/api/channels/${channelId}/messages`)
      .pipe(
        tap(messages => this.messagesSubject.next(messages)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 安排會議
  scheduleMeeting(meetingData: CreateMeetingRequest): Observable<Meeting> {
    return this.http.post<Meeting>('/api/meetings', meetingData).pipe(
      tap(meeting => {
        const currentMeetings = this.meetingsSubject.value;
        this.meetingsSubject.next([...currentMeetings, meeting]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入會議
  loadMeetings(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Meeting[]>(`${this.apiUrl}/${projectId}/meetings`)
      .pipe(
        tap(meetings => this.meetingsSubject.next(meetings)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 創建討論
  createDiscussion(discussionData: CreateDiscussionRequest): Observable<Discussion> {
    const projectId = this.getCurrentProjectId();
    return this.http.post<Discussion>(`${this.apiUrl}/${projectId}/discussions`, discussionData).pipe(
      tap(discussion => {
        const currentDiscussions = this.discussionsSubject.value;
        this.discussionsSubject.next([...currentDiscussions, discussion]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 載入討論
  loadDiscussions(): void {
    const projectId = this.getCurrentProjectId();
    
    this.http.get<Discussion[]>(`${this.apiUrl}/${projectId}/discussions`)
      .pipe(
        tap(discussions => this.discussionsSubject.next(discussions)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 發送通知
  sendNotification(notificationData: CreateNotificationRequest): Observable<Notification> {
    return this.http.post<Notification>('/api/notifications', notificationData).pipe(
      catchError(this.handleError)
    );
  }
  
  // 獲取協作統計
  getCollaborationStats(): Observable<CollaborationStats> {
    const projectId = this.getCurrentProjectId();
    return this.http.get<CollaborationStats>(`${this.apiUrl}/${projectId}/collaboration-stats`);
  }
  
  private getCurrentProjectId(): string {
    const currentProject = this.authService.getCurrentProject();
    if (!currentProject) {
      throw new Error('No current project selected');
    }
    return currentProject.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Collaboration service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 溝通協作權限
```typescript
enum CollaborationPermission {
  VIEW_CHANNELS = 'view_channels',
  MANAGE_CHANNELS = 'manage_channels',
  SEND_MESSAGES = 'send_messages',
  VIEW_MESSAGES = 'view_messages',
  MANAGE_MEETINGS = 'manage_meetings',
  VIEW_MEETINGS = 'view_meetings',
  CREATE_DISCUSSIONS = 'create_discussions',
  VIEW_DISCUSSIONS = 'view_discussions',
  MODERATE_DISCUSSIONS = 'moderate_discussions',
  SEND_NOTIFICATIONS = 'send_notifications',
  VIEW_NOTIFICATIONS = 'view_notifications',
  MANAGE_DOCUMENTS = 'manage_documents',
  COLLABORATE_DOCUMENTS = 'collaborate_documents'
}

// 角色權限映射
const COLLABORATION_PERMISSIONS: Record<ProjectRole, CollaborationPermission[]> = {
  [ProjectRole.OWNER]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.MANAGE_CHANNELS,
    CollaborationPermission.SEND_MESSAGES,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.MANAGE_MEETINGS,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.CREATE_DISCUSSIONS,
    CollaborationPermission.VIEW_DISCUSSIONS,
    CollaborationPermission.MODERATE_DISCUSSIONS,
    CollaborationPermission.SEND_NOTIFICATIONS,
    CollaborationPermission.VIEW_NOTIFICATIONS,
    CollaborationPermission.MANAGE_DOCUMENTS,
    CollaborationPermission.COLLABORATE_DOCUMENTS
  ],
  [ProjectRole.ADMIN]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.MANAGE_CHANNELS,
    CollaborationPermission.SEND_MESSAGES,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.MANAGE_MEETINGS,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.CREATE_DISCUSSIONS,
    CollaborationPermission.VIEW_DISCUSSIONS,
    CollaborationPermission.MODERATE_DISCUSSIONS,
    CollaborationPermission.SEND_NOTIFICATIONS,
    CollaborationPermission.VIEW_NOTIFICATIONS,
    CollaborationPermission.MANAGE_DOCUMENTS,
    CollaborationPermission.COLLABORATE_DOCUMENTS
  ],
  [ProjectRole.MANAGER]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.MANAGE_CHANNELS,
    CollaborationPermission.SEND_MESSAGES,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.MANAGE_MEETINGS,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.CREATE_DISCUSSIONS,
    CollaborationPermission.VIEW_DISCUSSIONS,
    CollaborationPermission.MODERATE_DISCUSSIONS,
    CollaborationPermission.SEND_NOTIFICATIONS,
    CollaborationPermission.VIEW_NOTIFICATIONS,
    CollaborationPermission.MANAGE_DOCUMENTS,
    CollaborationPermission.COLLABORATE_DOCUMENTS
  ],
  [ProjectRole.ENGINEER]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.SEND_MESSAGES,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.CREATE_DISCUSSIONS,
    CollaborationPermission.VIEW_DISCUSSIONS,
    CollaborationPermission.VIEW_NOTIFICATIONS,
    CollaborationPermission.COLLABORATE_DOCUMENTS
  ],
  [ProjectRole.CONTRACTOR]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.SEND_MESSAGES,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.VIEW_DISCUSSIONS,
    CollaborationPermission.VIEW_NOTIFICATIONS,
    CollaborationPermission.COLLABORATE_DOCUMENTS
  ],
  [ProjectRole.VIEWER]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.VIEW_DISCUSSIONS,
    CollaborationPermission.VIEW_NOTIFICATIONS
  ],
  [ProjectRole.OUTSIDE_COLLABORATOR]: [
    CollaborationPermission.VIEW_CHANNELS,
    CollaborationPermission.SEND_MESSAGES,
    CollaborationPermission.VIEW_MESSAGES,
    CollaborationPermission.VIEW_MEETINGS,
    CollaborationPermission.VIEW_DISCUSSIONS
  ]
};
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface CollaborationApi {
  // 頻道管理
  POST /api/projects/{projectId}/channels           // 創建頻道
  GET /api/projects/{projectId}/channels            // 獲取頻道列表
  GET /api/channels/{channelId}                    // 獲取頻道詳情
  PATCH /api/channels/{channelId}                  // 更新頻道
  DELETE /api/channels/{channelId}                 // 刪除頻道
  
  // 訊息管理
  POST /api/chat-messages                          // 發送訊息
  GET /api/channels/{channelId}/messages           // 獲取訊息列表
  PATCH /api/chat-messages/{messageId}             // 更新訊息
  DELETE /api/chat-messages/{messageId}            // 刪除訊息
  
  // 會議管理
  POST /api/meetings                               // 安排會議
  GET /api/projects/{projectId}/meetings           // 獲取會議列表
  GET /api/meetings/{meetingId}                    // 獲取會議詳情
  PATCH /api/meetings/{meetingId}                 // 更新會議
  DELETE /api/meetings/{meetingId}                 // 取消會議
  
  // 討論管理
  POST /api/projects/{projectId}/discussions       // 創建討論
  GET /api/projects/{projectId}/discussions        // 獲取討論列表
  GET /api/discussions/{discussionId}              // 獲取討論詳情
  PATCH /api/discussions/{discussionId}            // 更新討論
  DELETE /api/discussions/{discussionId}           // 刪除討論
  
  // 通知管理
  POST /api/notifications                          // 發送通知
  GET /api/notifications                           // 獲取通知列表
  PATCH /api/notifications/{notificationId}        // 更新通知狀態
  DELETE /api/notifications/{notificationId}       // 刪除通知
  
  // 協作統計
  GET /api/projects/{projectId}/collaboration-stats // 獲取協作統計
}

// 請求/響應類型
interface CreateChannelRequest {
  name: string;
  description?: string;
  type: ChannelType;
  visibility: ChannelVisibility;
  members: string[];
  settings: ChannelSettings;
}

interface CreateMessageRequest {
  channelId: string;
  content: string;
  type: MessageType;
  replyTo?: string;
  mentions: string[];
  attachments: Attachment[];
}

interface CreateMeetingRequest {
  projectId: string;
  title: string;
  description?: string;
  type: MeetingType;
  startTime: Date;
  endTime: Date;
  location: MeetingLocation;
  attendees: string[];
  agenda: MeetingAgenda[];
}

interface CreateDiscussionRequest {
  projectId: string;
  title: string;
  description: string;
  category: DiscussionCategory;
  type: DiscussionType;
  priority: Priority;
  tags: string[];
  participants: string[];
}

interface CreateNotificationRequest {
  recipients: string[];
  type: NotificationType;
  title: string;
  content: string;
  priority: Priority;
  channels: NotificationChannel[];
  scheduledAt?: Date;
}

enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success',
  REMINDER = 'reminder'
}

enum NotificationChannel {
  IN_APP = 'in_app',
  EMAIL = 'email',
  PUSH = 'push',
  SMS = 'sms'
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const collaborationConfig = {
  enableChat: process.env.ENABLE_CHAT === 'true',
  enableMeetings: process.env.ENABLE_MEETINGS === 'true',
  enableDiscussions: process.env.ENABLE_DISCUSSIONS === 'true',
  enableNotifications: process.env.ENABLE_NOTIFICATIONS === 'true',
  enableDocumentCollaboration: process.env.ENABLE_DOCUMENT_COLLABORATION === 'true',
  maxMessageLength: parseInt(process.env.MAX_MESSAGE_LENGTH || '2000'),
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB
  messageRetentionDays: parseInt(process.env.MESSAGE_RETENTION_DAYS || '365'),
  maxMeetingDuration: parseInt(process.env.MAX_MEETING_DURATION || '480'), // 8 hours
  notificationChannels: process.env.NOTIFICATION_CHANNELS?.split(',') || ['in_app', 'email'],
  realTimeEnabled: process.env.REAL_TIME_ENABLED === 'true',
  websocketUrl: process.env.WEBSOCKET_URL || 'ws://localhost:8080',
  pushNotificationKey: process.env.PUSH_NOTIFICATION_KEY,
  emailServiceUrl: process.env.EMAIL_SERVICE_URL
};
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 即時通訊功能
- [ ] 會議管理系統
- [ ] 討論區功能
- [ ] 通知系統
- [ ] 文件協作功能
- [ ] 權限控制實現
- [ ] 單元測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成