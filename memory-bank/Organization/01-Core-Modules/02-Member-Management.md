# 2️⃣ 成員管理模組

## 📋 模組概述

成員管理模組負責組織成員的完整生命週期管理，包括成員邀請、角色分配、權限管理、活動監控等功能。此模組是組織管理的核心，為團隊協作提供人員基礎。

### 🎯 功能目標
- 實現完整的成員生命週期管理
- 支持多種邀請方式和審核流程
- 提供細粒度的角色和權限控制
- 實現成員活動監控和統計

## 🏗️ 功能架構

### 核心功能
```
成員管理模組
├── 成員邀請管理
│   ├── 郵箱邀請系統
│   ├── 邀請鏈接生成
│   ├── 邀請審核流程
│   └── 邀請狀態追蹤
├── 成員角色管理
│   ├── 角色分配與調整
│   ├── 權限繼承邏輯
│   ├── 角色變更審計
│   └── 臨時權限授予
├── 成員信息管理
│   ├── 基本信息維護
│   ├── 聯繫方式管理
│   ├── 偏好設置
│   └── 隱私設置
├── 成員活動監控
│   ├── 登錄活動追蹤
│   ├── 操作行為記錄
│   ├── 異常行為檢測
│   └── 活動統計分析
└── 成員狀態管理
    ├── 活躍狀態管理
    ├── 暫停與恢復
    ├── 封鎖與解封
    └── 成員移除
```

## 📊 數據結構設計

### 成員邀請實體 (MemberInvitation)
```typescript
interface MemberInvitation {
  id: string;                    // 邀請唯一標識
  organizationId: string;        // 組織 ID
  email: string;                 // 邀請郵箱
  role: OrganizationRole;        // 邀請角色
  permissions: Permission[];     // 具體權限
  status: InvitationStatus;      // 邀請狀態
  message?: string;              // 邀請消息
  invitedBy: string;             // 邀請者 ID
  invitedAt: Date;              // 邀請時間
  expiresAt: Date;              // 過期時間
  acceptedAt?: Date;            // 接受時間
  declinedAt?: Date;            // 拒絕時間
  token: string;                // 邀請令牌
}

enum InvitationStatus {
  PENDING = 'pending',          // 待處理
  ACCEPTED = 'accepted',        // 已接受
  DECLINED = 'declined',        // 已拒絕
  EXPIRED = 'expired',          // 已過期
  CANCELLED = 'cancelled'       // 已取消
}

interface InvitationSettings {
  expirationDays: number;       // 過期天數
  requireApproval: boolean;     // 需要審核
  allowRoleSelection: boolean;  // 允許角色選擇
  autoAccept: boolean;          // 自動接受
  maxInvitationsPerDay: number; // 每日最大邀請數
}
```

### 成員活動記錄 (MemberActivity)
```typescript
interface MemberActivity {
  id: string;                   // 活動記錄 ID
  organizationId: string;       // 組織 ID
  memberId: string;             // 成員 ID
  activityType: ActivityType;   // 活動類型
  description: string;          // 活動描述
  metadata: Record<string, any>; // 活動元數據
  ipAddress: string;            // IP 地址
  userAgent: string;            // 用戶代理
  location?: GeolocationData;   // 地理位置
  timestamp: Date;              // 時間戳
  riskLevel: RiskLevel;         // 風險等級
}

enum ActivityType {
  LOGIN = 'login',              // 登錄
  LOGOUT = 'logout',            // 登出
  PERMISSION_CHANGE = 'permission_change', // 權限變更
  ROLE_CHANGE = 'role_change',  // 角色變更
  DATA_ACCESS = 'data_access',  // 數據訪問
  DATA_MODIFICATION = 'data_modification', // 數據修改
  SETTINGS_CHANGE = 'settings_change', // 設置變更
  INVITATION_SENT = 'invitation_sent', // 發送邀請
  INVITATION_ACCEPTED = 'invitation_accepted', // 接受邀請
  SUSPICIOUS_ACTIVITY = 'suspicious_activity' // 可疑活動
}

enum RiskLevel {
  LOW = 'low',                  // 低風險
  MEDIUM = 'medium',            // 中等風險
  HIGH = 'high',                // 高風險
  CRITICAL = 'critical'         // 嚴重風險
}

interface GeolocationData {
  country: string;              // 國家
  region: string;               // 地區
  city: string;                 // 城市
  latitude: number;             // 緯度
  longitude: number;            // 經度
}
```

### 成員設置 (MemberSettings)
```typescript
interface MemberSettings {
  notifications: NotificationPreferences; // 通知偏好
  privacy: PrivacySettings;               // 隱私設置
  security: SecuritySettings;             // 安全設置
  preferences: UserPreferences;           // 用戶偏好
}

interface NotificationPreferences {
  emailNotifications: boolean;           // 郵件通知
  pushNotifications: boolean;            // 推送通知
  smsNotifications: boolean;             // 短信通知
  notificationTypes: NotificationType[]; // 通知類型
  quietHours: QuietHours;                // 免打擾時間
}

interface PrivacySettings {
  profileVisibility: ProfileVisibility;  // 資料可見性
  activityVisibility: ActivityVisibility; // 活動可見性
  contactInfoVisibility: ContactVisibility; // 聯繫信息可見性
  showOnlineStatus: boolean;             // 顯示在線狀態
  allowDirectMessages: boolean;          // 允許私信
}

interface SecuritySettings {
  twoFactorEnabled: boolean;             // 雙因子認證
  sessionTimeout: number;                // 會話超時
  passwordPolicy: PasswordPolicy;        // 密碼策略
  loginNotifications: boolean;           // 登錄通知
  suspiciousActivityAlerts: boolean;     // 可疑活動警報
}

enum NotificationType {
  INVITATIONS = 'invitations',           // 邀請通知
  ROLE_CHANGES = 'role_changes',         // 角色變更通知
  PERMISSION_CHANGES = 'permission_changes', // 權限變更通知
  ORGANIZATION_UPDATES = 'organization_updates', // 組織更新通知
  SECURITY_ALERTS = 'security_alerts',   // 安全警報
  ACTIVITY_REPORTS = 'activity_reports'  // 活動報告
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 成員管理主組件
@Component({
  selector: 'app-member-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>成員管理</nz-card-title>
        <nz-card-extra>
          <button nz-button nzType="primary" (click)="inviteMember()">
            <i nz-icon nzType="user-add"></i>
            邀請成員
          </button>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="成員列表">
            <app-member-list></app-member-list>
          </nz-tab>
          <nz-tab nzTitle="待審核邀請">
            <app-pending-invitations></app-pending-invitations>
          </nz-tab>
          <nz-tab nzTitle="活動監控">
            <app-member-activities></app-member-activities>
          </nz-tab>
          <nz-tab nzTitle="設置">
            <app-member-settings></app-member-settings>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class MemberManagementComponent implements OnInit {
  constructor(
    private memberService: MemberService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.memberService.loadOrganizationMembers();
  }
  
  inviteMember() {
    this.modal.create({
      nzTitle: '邀請成員',
      nzContent: AppInviteMemberModalComponent,
      nzFooter: null,
      nzWidth: 600
    });
  }
}

// 成員列表組件
@Component({
  selector: 'app-member-list',
  template: `
    <nz-table 
      [nzData]="members$ | async" 
      [nzLoading]="loading$ | async"
      [nzPageSize]="20"
      [nzShowPagination]="true">
      
      <thead>
        <tr>
          <th>成員</th>
          <th>角色</th>
          <th>狀態</th>
          <th>加入時間</th>
          <th>最後活動</th>
          <th>操作</th>
        </tr>
      </thead>
      
      <tbody>
        <tr *ngFor="let member of members$ | async">
          <td>
            <div class="member-info">
              <nz-avatar [nzSrc]="member.user.avatar" [nzSize]="32"></nz-avatar>
              <div class="member-details">
                <div class="member-name">{{ member.user.name }}</div>
                <div class="member-email">{{ member.user.email }}</div>
              </div>
            </div>
          </td>
          <td>
            <nz-tag [nzColor]="getRoleColor(member.role)">
              {{ member.role | roleLabel }}
            </nz-tag>
          </td>
          <td>
            <nz-badge 
              [nzStatus]="getStatusType(member.status)" 
              [nzText]="member.status | statusLabel">
            </nz-badge>
          </td>
          <td>{{ member.joinedAt | date:'short' }}</td>
          <td>{{ member.lastActiveAt | date:'short' }}</td>
          <td>
            <nz-button-group>
              <button nz-button nzSize="small" (click)="editMember(member)">
                編輯
              </button>
              <button nz-button nzSize="small" nzDanger (click)="removeMember(member)">
                移除
              </button>
            </nz-button-group>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [`
    .member-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .member-details {
      display: flex;
      flex-direction: column;
    }
    
    .member-name {
      font-weight: 500;
    }
    
    .member-email {
      color: #666;
      font-size: 12px;
    }
  `]
})
export class MemberListComponent implements OnInit {
  members$ = this.memberService.members$;
  loading$ = this.memberService.loading$;
  
  constructor(
    private memberService: MemberService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.memberService.loadOrganizationMembers();
  }
  
  editMember(member: OrganizationMember) {
    this.modal.create({
      nzTitle: '編輯成員',
      nzContent: AppEditMemberModalComponent,
      nzComponentParams: { member },
      nzFooter: null,
      nzWidth: 500
    });
  }
  
  removeMember(member: OrganizationMember) {
    this.modal.confirm({
      nzTitle: '確認移除',
      nzContent: `確定要移除成員 ${member.user.name} 嗎？`,
      nzOkText: '移除',
      nzOkType: 'danger',
      nzCancelText: '取消',
      nzOnOk: () => this.memberService.removeMember(member.id)
    });
  }
  
  getRoleColor(role: OrganizationRole): string {
    const colors = {
      [OrganizationRole.OWNER]: 'red',
      [OrganizationRole.ADMIN]: 'blue',
      [OrganizationRole.MEMBER]: 'green',
      [OrganizationRole.OUTSIDE_COLLABORATOR]: 'orange'
    };
    return colors[role] || 'default';
  }
  
  getStatusType(status: MemberStatus): 'success' | 'warning' | 'error' | 'default' {
    const types = {
      [MemberStatus.ACTIVE]: 'success',
      [MemberStatus.PENDING]: 'warning',
      [MemberStatus.SUSPENDED]: 'error',
      [MemberStatus.BLOCKED]: 'error'
    };
    return types[status] || 'default';
  }
}

// 邀請成員模態框組件
@Component({
  selector: 'app-invite-member-modal',
  template: `
    <nz-form [formGroup]="inviteForm" nzLayout="vertical">
      <nz-form-item>
        <nz-form-label>郵箱地址</nz-form-label>
        <nz-form-control nzErrorTip="請輸入有效的郵箱地址">
          <input nz-input formControlName="email" placeholder="輸入成員郵箱地址">
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label>角色</nz-form-label>
        <nz-form-control>
          <nz-select formControlName="role">
            <nz-option nzValue="member" nzLabel="成員"></nz-option>
            <nz-option nzValue="admin" nzLabel="管理員"></nz-option>
          </nz-select>
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-label>邀請消息 (可選)</nz-form-label>
        <nz-form-control>
          <textarea nz-input formControlName="message" 
                   placeholder="輸入邀請消息" rows="3"></textarea>
        </nz-form-control>
      </nz-form-item>
      
      <nz-form-item>
        <nz-form-control>
          <div class="form-actions">
            <button nz-button (click)="cancel()">取消</button>
            <button nz-button nzType="primary" 
                   (click)="sendInvitation()" 
                   [nzLoading]="sending"
                   [disabled]="!inviteForm.valid">
              發送邀請
            </button>
          </div>
        </nz-form-control>
      </nz-form-item>
    </nz-form>
  `,
  styles: [`
    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `]
})
export class AppInviteMemberModalComponent implements OnInit {
  inviteForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    role: ['member', Validators.required],
    message: ['']
  });
  
  sending = false;
  
  constructor(
    private fb: FormBuilder,
    private memberService: MemberService,
    private modal: NzModalRef,
    private message: NzMessageService
  ) {}
  
  ngOnInit() {}
  
  sendInvitation() {
    if (this.inviteForm.valid) {
      this.sending = true;
      const formValue = this.inviteForm.value;
      
      this.memberService.inviteMember(formValue).subscribe({
        next: () => {
          this.message.success('邀請已發送');
          this.modal.close();
        },
        error: (error) => {
          this.message.error('發送失敗: ' + error.message);
          this.sending = false;
        }
      });
    }
  }
  
  cancel() {
    this.modal.close();
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly apiUrl = '/api/organizations';
  
  private membersSubject = new BehaviorSubject<OrganizationMember[]>([]);
  private invitationsSubject = new BehaviorSubject<MemberInvitation[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  members$ = this.membersSubject.asObservable();
  invitations$ = this.invitationsSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 邀請成員
  inviteMember(invitationData: InviteMemberRequest): Observable<MemberInvitation> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.post<MemberInvitation>(
      `${this.apiUrl}/${organizationId}/invitations`, 
      invitationData
    ).pipe(
      tap(invitation => {
        const currentInvitations = this.invitationsSubject.value;
        this.invitationsSubject.next([...currentInvitations, invitation]);
      }),
      catchError(this.handleError)
    );
  }
  
  // 獲取組織成員
  loadOrganizationMembers(): void {
    this.loadingSubject.next(true);
    const organizationId = this.getCurrentOrganizationId();
    
    this.http.get<OrganizationMember[]>(`${this.apiUrl}/${organizationId}/members`)
      .pipe(
        tap(members => this.membersSubject.next(members)),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 更新成員角色
  updateMemberRole(memberId: string, role: OrganizationRole): Observable<OrganizationMember> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.patch<OrganizationMember>(
      `${this.apiUrl}/${organizationId}/members/${memberId}`,
      { role }
    ).pipe(
      tap(updatedMember => {
        const members = this.membersSubject.value;
        const index = members.findIndex(m => m.id === memberId);
        if (index !== -1) {
          members[index] = updatedMember;
          this.membersSubject.next([...members]);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 移除成員
  removeMember(memberId: string): Observable<void> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.delete<void>(`${this.apiUrl}/${organizationId}/members/${memberId}`)
      .pipe(
        tap(() => {
          const members = this.membersSubject.value;
          const filteredMembers = members.filter(m => m.id !== memberId);
          this.membersSubject.next(filteredMembers);
        }),
        catchError(this.handleError)
      );
  }
  
  // 獲取待審核邀請
  loadPendingInvitations(): void {
    const organizationId = this.getCurrentOrganizationId();
    
    this.http.get<MemberInvitation[]>(`${this.apiUrl}/${organizationId}/invitations`)
      .pipe(
        tap(invitations => this.invitationsSubject.next(invitations)),
        catchError(this.handleError)
      )
      .subscribe();
  }
  
  // 取消邀請
  cancelInvitation(invitationId: string): Observable<void> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.delete<void>(`${this.apiUrl}/${organizationId}/invitations/${invitationId}`)
      .pipe(
        tap(() => {
          const invitations = this.invitationsSubject.value;
          const filteredInvitations = invitations.filter(i => i.id !== invitationId);
          this.invitationsSubject.next(filteredInvitations);
        }),
        catchError(this.handleError)
      );
  }
  
  // 獲取成員活動
  getMemberActivities(memberId: string): Observable<MemberActivity[]> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.get<MemberActivity[]>(
      `${this.apiUrl}/${organizationId}/members/${memberId}/activities`
    );
  }
  
  // 暫停成員
  suspendMember(memberId: string, reason: string): Observable<OrganizationMember> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.patch<OrganizationMember>(
      `${this.apiUrl}/${organizationId}/members/${memberId}`,
      { status: MemberStatus.SUSPENDED, suspensionReason: reason }
    ).pipe(
      tap(updatedMember => {
        const members = this.membersSubject.value;
        const index = members.findIndex(m => m.id === memberId);
        if (index !== -1) {
          members[index] = updatedMember;
          this.membersSubject.next([...members]);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private getCurrentOrganizationId(): string {
    const currentOrg = this.authService.getCurrentOrganization();
    if (!currentOrg) {
      throw new Error('No current organization selected');
    }
    return currentOrg.id;
  }
  
  private handleError(error: any): Observable<never> {
    console.error('Member service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 成員管理權限
```typescript
enum MemberManagementPermission {
  INVITE_MEMBERS = 'invite_members',
  REMOVE_MEMBERS = 'remove_members',
  MANAGE_MEMBER_ROLES = 'manage_member_roles',
  VIEW_MEMBER_ACTIVITIES = 'view_member_activities',
  SUSPEND_MEMBERS = 'suspend_members',
  MANAGE_INVITATIONS = 'manage_invitations',
  VIEW_MEMBER_DETAILS = 'view_member_details',
  EXPORT_MEMBER_DATA = 'export_member_data'
}

// 角色權限映射
const MEMBER_MANAGEMENT_PERMISSIONS: Record<OrganizationRole, MemberManagementPermission[]> = {
  [OrganizationRole.OWNER]: [
    MemberManagementPermission.INVITE_MEMBERS,
    MemberManagementPermission.REMOVE_MEMBERS,
    MemberManagementPermission.MANAGE_MEMBER_ROLES,
    MemberManagementPermission.VIEW_MEMBER_ACTIVITIES,
    MemberManagementPermission.SUSPEND_MEMBERS,
    MemberManagementPermission.MANAGE_INVITATIONS,
    MemberManagementPermission.VIEW_MEMBER_DETAILS,
    MemberManagementPermission.EXPORT_MEMBER_DATA
  ],
  [OrganizationRole.ADMIN]: [
    MemberManagementPermission.INVITE_MEMBERS,
    MemberManagementPermission.REMOVE_MEMBERS,
    MemberManagementPermission.MANAGE_MEMBER_ROLES,
    MemberManagementPermission.VIEW_MEMBER_ACTIVITIES,
    MemberManagementPermission.MANAGE_INVITATIONS,
    MemberManagementPermission.VIEW_MEMBER_DETAILS
  ],
  [OrganizationRole.MEMBER]: [
    MemberManagementPermission.VIEW_MEMBER_DETAILS
  ],
  [OrganizationRole.OUTSIDE_COLLABORATOR]: []
};
```

## 📱 UI/UX 設計

### 成員活動監控組件
```typescript
@Component({
  selector: 'app-member-activities',
  template: `
    <div class="activity-monitoring">
      <nz-card>
        <nz-card-header>
          <nz-card-title>成員活動監控</nz-card-title>
          <nz-card-extra>
            <nz-date-picker 
              [(ngModel)]="dateRange" 
              nzMode="range" 
              (ngModelChange)="onDateRangeChange($event)">
            </nz-date-picker>
          </nz-card-extra>
        </nz-card-header>
        <nz-card-content>
          <nz-table 
            [nzData]="activities$ | async" 
            [nzLoading]="loading$ | async"
            [nzPageSize]="50">
            
            <thead>
              <tr>
                <th>成員</th>
                <th>活動類型</th>
                <th>描述</th>
                <th>風險等級</th>
                <th>時間</th>
                <th>位置</th>
                <th>操作</th>
              </tr>
            </thead>
            
            <tbody>
              <tr *ngFor="let activity of activities$ | async">
                <td>
                  <div class="member-info">
                    <nz-avatar [nzSrc]="activity.member.user.avatar" [nzSize]="24"></nz-avatar>
                    <span>{{ activity.member.user.name }}</span>
                  </div>
                </td>
                <td>
                  <nz-tag [nzColor]="getActivityTypeColor(activity.activityType)">
                    {{ activity.activityType | activityTypeLabel }}
                  </nz-tag>
                </td>
                <td>{{ activity.description }}</td>
                <td>
                  <nz-badge 
                    [nzStatus]="getRiskLevelStatus(activity.riskLevel)" 
                    [nzText]="activity.riskLevel | riskLevelLabel">
                  </nz-badge>
                </td>
                <td>{{ activity.timestamp | date:'short' }}</td>
                <td>{{ activity.location?.city }}, {{ activity.location?.country }}</td>
                <td>
                  <button nz-button nzSize="small" (click)="viewActivityDetails(activity)">
                    詳情
                  </button>
                </td>
              </tr>
            </tbody>
          </nz-table>
        </nz-card-content>
      </nz-card>
    </div>
  `,
  styles: [`
    .activity-monitoring {
      margin-top: 16px;
    }
    
    .member-info {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class MemberActivitiesComponent implements OnInit {
  activities$ = this.memberService.activities$;
  loading$ = this.memberService.loading$;
  dateRange: Date[] = [];
  
  constructor(private memberService: MemberService) {}
  
  ngOnInit() {
    this.loadActivities();
  }
  
  onDateRangeChange(dates: Date[]) {
    this.dateRange = dates;
    this.loadActivities();
  }
  
  loadActivities() {
    const params: any = {};
    if (this.dateRange && this.dateRange.length === 2) {
      params.startDate = this.dateRange[0].toISOString();
      params.endDate = this.dateRange[1].toISOString();
    }
    this.memberService.loadMemberActivities(params);
  }
  
  viewActivityDetails(activity: MemberActivity) {
    // 顯示活動詳情模態框
  }
  
  getActivityTypeColor(type: ActivityType): string {
    const colors = {
      [ActivityType.LOGIN]: 'green',
      [ActivityType.LOGOUT]: 'blue',
      [ActivityType.PERMISSION_CHANGE]: 'orange',
      [ActivityType.ROLE_CHANGE]: 'red',
      [ActivityType.DATA_ACCESS]: 'cyan',
      [ActivityType.DATA_MODIFICATION]: 'purple',
      [ActivityType.SUSPICIOUS_ACTIVITY]: 'red'
    };
    return colors[type] || 'default';
  }
  
  getRiskLevelStatus(riskLevel: RiskLevel): 'success' | 'warning' | 'error' | 'default' {
    const statuses = {
      [RiskLevel.LOW]: 'success',
      [RiskLevel.MEDIUM]: 'warning',
      [RiskLevel.HIGH]: 'error',
      [RiskLevel.CRITICAL]: 'error'
    };
    return statuses[riskLevel] || 'default';
  }
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('MemberService', () => {
  let service: MemberService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService]
    });
    service = TestBed.inject(MemberService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should invite member successfully', () => {
    const invitationData = {
      email: 'test@example.com',
      role: OrganizationRole.MEMBER,
      message: 'Welcome to our organization'
    };
    
    service.inviteMember(invitationData).subscribe(invitation => {
      expect(invitation.email).toBe('test@example.com');
      expect(invitation.role).toBe(OrganizationRole.MEMBER);
    });
    
    const req = httpMock.expectOne('/api/organizations/test-org/invitations');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(invitationData);
    req.flush({ id: '1', ...invitationData, status: InvitationStatus.PENDING });
  });
  
  it('should update member role', () => {
    const memberId = 'member-1';
    const newRole = OrganizationRole.ADMIN;
    
    service.updateMemberRole(memberId, newRole).subscribe(member => {
      expect(member.role).toBe(OrganizationRole.ADMIN);
    });
    
    const req = httpMock.expectOne(`/api/organizations/test-org/members/${memberId}`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ role: newRole });
    req.flush({ id: memberId, role: newRole });
  });
});
```

## 📈 性能優化

### 虛擬滾動
```typescript
@Component({
  selector: 'app-member-list-virtual',
  template: `
    <cdk-virtual-scroll-viewport itemSize="60" class="viewport">
      <div *cdkVirtualFor="let member of members$ | async" class="member-item">
        <!-- 成員項目內容 -->
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .viewport {
      height: 400px;
    }
    
    .member-item {
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 16px;
      border-bottom: 1px solid #f0f0f0;
    }
  `]
})
export class MemberListVirtualComponent {}
```

### 數據緩存
```typescript
@Injectable()
export class MemberCacheService {
  private cache = new Map<string, CachedMemberData>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 分鐘
  
  getCachedMembers(orgId: string): OrganizationMember[] | null {
    const cached = this.cache.get(orgId);
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }
    return null;
  }
  
  setCachedMembers(orgId: string, members: OrganizationMember[]): void {
    this.cache.set(orgId, {
      data: members,
      timestamp: Date.now()
    });
  }
  
  invalidateCache(orgId: string): void {
    this.cache.delete(orgId);
  }
}
```

## 🔄 狀態管理

### NgRx 狀態結構
```typescript
export interface MemberState {
  members: OrganizationMember[];
  invitations: MemberInvitation[];
  activities: MemberActivity[];
  loading: boolean;
  error: string | null;
  selectedMember: OrganizationMember | null;
}

export const initialState: MemberState = {
  members: [],
  invitations: [],
  activities: [],
  loading: false,
  error: null,
  selectedMember: null
};

export const memberReducer = createReducer(
  initialState,
  on(MemberActions.loadMembers, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MemberActions.loadMembersSuccess, (state, { members }) => ({
    ...state,
    members,
    loading: false,
    error: null
  })),
  on(MemberActions.inviteMemberSuccess, (state, { invitation }) => ({
    ...state,
    invitations: [...state.invitations, invitation]
  })),
  on(MemberActions.updateMemberRoleSuccess, (state, { member }) => ({
    ...state,
    members: state.members.map(m => m.id === member.id ? member : m)
  }))
);
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface MemberManagementApi {
  // 邀請成員
  POST /api/organizations/{orgId}/invitations
  // 獲取邀請列表
  GET /api/organizations/{orgId}/invitations
  // 取消邀請
  DELETE /api/organizations/{orgId}/invitations/{invitationId}
  // 獲取成員列表
  GET /api/organizations/{orgId}/members
  // 更新成員
  PATCH /api/organizations/{orgId}/members/{memberId}
  // 移除成員
  DELETE /api/organizations/{orgId}/members/{memberId}
  // 獲取成員活動
  GET /api/organizations/{orgId}/members/{memberId}/activities
  // 暫停成員
  POST /api/organizations/{orgId}/members/{memberId}/suspend
  // 恢復成員
  POST /api/organizations/{orgId}/members/{memberId}/restore
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const memberConfig = {
  maxInvitationsPerDay: parseInt(process.env.MAX_INVITATIONS_PER_DAY || '50'),
  invitationExpirationDays: parseInt(process.env.INVITATION_EXPIRATION_DAYS || '7'),
  maxMembersPerOrganization: parseInt(process.env.MAX_MEMBERS_PER_ORG || '1000'),
  enableActivityTracking: process.env.ENABLE_ACTIVITY_TRACKING === 'true',
  activityRetentionDays: parseInt(process.env.ACTIVITY_RETENTION_DAYS || '90')
};
```

### 數據庫索引
```sql
-- 成員表索引
CREATE INDEX idx_organization_members_org_id ON organization_members(organization_id);
CREATE INDEX idx_organization_members_user_id ON organization_members(user_id);
CREATE INDEX idx_organization_members_role ON organization_members(role);
CREATE INDEX idx_organization_members_status ON organization_members(status);
CREATE INDEX idx_organization_members_joined_at ON organization_members(joined_at);

-- 邀請表索引
CREATE INDEX idx_member_invitations_org_id ON member_invitations(organization_id);
CREATE INDEX idx_member_invitations_email ON member_invitations(email);
CREATE INDEX idx_member_invitations_status ON member_invitations(status);
CREATE INDEX idx_member_invitations_expires_at ON member_invitations(expires_at);

-- 活動記錄表索引
CREATE INDEX idx_member_activities_org_id ON member_activities(organization_id);
CREATE INDEX idx_member_activities_member_id ON member_activities(member_id);
CREATE INDEX idx_member_activities_type ON member_activities(activity_type);
CREATE INDEX idx_member_activities_timestamp ON member_activities(timestamp);
CREATE INDEX idx_member_activities_risk_level ON member_activities(risk_level);
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 邀請系統實現
- [ ] 成員管理組件開發
- [ ] 角色權限控制
- [ ] 活動監控實現
- [ ] 單元測試編寫
- [ ] 集成測試編寫
- [ ] 性能優化實施
- [ ] 安全措施實施
- [ ] 文檔編寫完成