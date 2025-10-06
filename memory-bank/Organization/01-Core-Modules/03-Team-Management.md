# 3️⃣ 團隊管理模組

## 📋 模組概述

團隊管理模組負責組織內團隊的創建、管理和協作功能。提供團隊層級的權限控制、成員管理、項目分配等功能，支持複雜的組織架構和團隊協作需求。

### 🎯 功能目標
- 實現靈活的團隊組織架構
- 提供團隊級別的權限管理
- 支持團隊成員的動態分配
- 實現團隊協作和項目管理

## 🏗️ 功能架構

### 核心功能
```
團隊管理模組
├── 團隊組織架構
│   ├── 團隊創建與設置
│   ├── 團隊層級管理
│   ├── 團隊合併與拆分
│   └── 團隊模板管理
├── 團隊成員管理
│   ├── 成員添加與移除
│   ├── 成員角色分配
│   ├── 成員權限繼承
│   └── 成員狀態管理
├── 團隊權限管理
│   ├── 團隊級權限設置
│   ├── 權限繼承邏輯
│   ├── 臨時權限授予
│   └── 權限審計追蹤
├── 團隊協作功能
│   ├── 團隊溝通工具
│   ├── 任務分配與跟蹤
│   ├── 團隊日曆管理
│   └── 團隊文檔共享
└── 團隊統計分析
    ├── 團隊績效指標
    ├── 成員活躍度分析
    ├── 項目完成統計
    └── 團隊效率報告
```

## 📊 數據結構設計

### 團隊實體 (Team)
```typescript
interface Team {
  id: string;                    // 團隊唯一標識
  organizationId: string;        // 組織 ID
  name: string;                  // 團隊名稱
  slug: string;                  // URL 友好的團隊標識
  description?: string;          // 團隊描述
  avatar?: string;               // 團隊頭像
  type: TeamType;                // 團隊類型
  visibility: TeamVisibility;    // 團隊可見性
  parentTeamId?: string;         // 父團隊 ID
  level: number;                 // 團隊層級
  path: string;                  // 團隊路徑
  settings: TeamSettings;        // 團隊設置
  permissions: TeamPermission[]; // 團隊權限
  members: TeamMember[];         // 團隊成員
  statistics: TeamStatistics;    // 團隊統計
  createdAt: Date;              // 創建時間
  updatedAt: Date;              // 更新時間
  createdBy: string;            // 創建者 ID
}

enum TeamType {
  DEPARTMENT = 'department',     // 部門
  PROJECT = 'project',          // 項目團隊
  FUNCTIONAL = 'functional',    // 職能團隊
  MATRIX = 'matrix',            // 矩陣團隊
  VIRTUAL = 'virtual'           // 虛擬團隊
}

enum TeamVisibility {
  PUBLIC = 'public',            // 公開團隊
  PRIVATE = 'private',          // 私有團隊
  RESTRICTED = 'restricted'     // 受限團隊
}

interface TeamSettings {
  allowSelfJoin: boolean;        // 允許自主加入
  requireApproval: boolean;      // 需要審核
  maxMembers: number;           // 最大成員數
  defaultRole: TeamRole;        // 默認角色
  notificationSettings: TeamNotificationSettings; // 通知設置
  collaborationSettings: CollaborationSettings; // 協作設置
}

interface TeamNotificationSettings {
  emailNotifications: boolean;   // 郵件通知
  pushNotifications: boolean;    // 推送通知
  weeklyDigest: boolean;        // 週報
  milestoneNotifications: boolean; // 里程碑通知
  mentionNotifications: boolean; // @提及通知
}

interface CollaborationSettings {
  allowFileSharing: boolean;     // 允許文件共享
  allowVideoConferencing: boolean; // 允許視頻會議
  allowScreenSharing: boolean;   // 允許屏幕共享
  defaultMeetingDuration: number; // 默認會議時長
  timezone: string;             // 時區
}
```

### 團隊成員實體 (TeamMember)
```typescript
interface TeamMember {
  id: string;                   // 成員關係 ID
  teamId: string;               // 團隊 ID
  userId: string;               // 用戶 ID
  role: TeamRole;               // 團隊角色
  permissions: TeamPermission[]; // 具體權限
  status: TeamMemberStatus;     // 成員狀態
  joinedAt: Date;              // 加入時間
  invitedBy: string;           // 邀請者 ID
  lastActiveAt: Date;          // 最後活躍時間
  responsibilities: string[];   // 職責描述
  skills: string[];            // 技能標籤
  availability: MemberAvailability; // 可用性設置
}

enum TeamRole {
  LEAD = 'lead',               // 團隊負責人
  MANAGER = 'manager',         // 團隊經理
  SENIOR = 'senior',           // 高級成員
  MEMBER = 'member',           // 普通成員
  CONTRIBUTOR = 'contributor', // 貢獻者
  OBSERVER = 'observer'        // 觀察者
}

enum TeamMemberStatus {
  ACTIVE = 'active',           // 活躍
  INACTIVE = 'inactive',       // 非活躍
  AWAY = 'away',              // 離開
  BUSY = 'busy',              // 忙碌
  DO_NOT_DISTURB = 'do_not_disturb' // 勿擾
}

interface MemberAvailability {
  workingHours: WorkingHours[]; // 工作時間
  timezone: string;            // 時區
  vacationDays: Date[];        // 休假日期
  preferredContactMethod: ContactMethod; // 偏好聯繫方式
}

interface WorkingHours {
  dayOfWeek: number;           // 星期幾 (0-6)
  startTime: string;           // 開始時間
  endTime: string;             // 結束時間
  isWorking: boolean;          // 是否工作
}

enum ContactMethod {
  EMAIL = 'email',             // 郵件
  SLACK = 'slack',             // Slack
  TEAMS = 'teams',             // Teams
  PHONE = 'phone'              // 電話
}
```

### 團隊權限實體 (TeamPermission)
```typescript
interface TeamPermission {
  id: string;                  // 權限 ID
  teamId: string;              // 團隊 ID
  permission: Permission;       // 權限類型
  resource: ResourceType;       // 資源類型
  resourceId?: string;         // 資源 ID
  conditions: PermissionCondition[]; // 權限條件
  grantedBy: string;           // 授權者
  grantedAt: Date;            // 授權時間
  expiresAt?: Date;           // 過期時間
  isInherited: boolean;        // 是否繼承
  parentPermissionId?: string; // 父權限 ID
}

enum Permission {
  READ = 'read',               // 讀取權限
  WRITE = 'write',             // 寫入權限
  DELETE = 'delete',           // 刪除權限
  ADMIN = 'admin',             // 管理權限
  INVITE = 'invite',           // 邀請權限
  MANAGE_MEMBERS = 'manage_members', // 管理成員權限
  MANAGE_PROJECTS = 'manage_projects', // 管理項目權限
  VIEW_ANALYTICS = 'view_analytics' // 查看分析權限
}

enum ResourceType {
  TEAM = 'team',               // 團隊資源
  PROJECT = 'project',         // 項目資源
  REPOSITORY = 'repository',   // 倉庫資源
  DOCUMENT = 'document',       // 文檔資源
  MEETING = 'meeting',         // 會議資源
  TASK = 'task'                // 任務資源
}

interface PermissionCondition {
  type: ConditionType;         // 條件類型
  field: string;               // 字段名
  operator: Operator;          // 操作符
  value: any;                  // 條件值
}

enum ConditionType {
  TIME_BASED = 'time_based',   // 時間條件
  LOCATION_BASED = 'location_based', // 位置條件
  DEVICE_BASED = 'device_based', // 設備條件
  ROLE_BASED = 'role_based'    // 角色條件
}

enum Operator {
  EQUALS = 'equals',           // 等於
  NOT_EQUALS = 'not_equals',   // 不等於
  GREATER_THAN = 'greater_than', // 大於
  LESS_THAN = 'less_than',     // 小於
  CONTAINS = 'contains',       // 包含
  IN = 'in',                   // 在...中
  NOT_IN = 'not_in'            // 不在...中
}
```

## 🔧 技術實現

### Angular 組件結構
```typescript
// 團隊管理主組件
@Component({
  selector: 'app-team-management',
  template: `
    <nz-card>
      <nz-card-header>
        <nz-card-title>團隊管理</nz-card-title>
        <nz-card-extra>
          <button nz-button nzType="primary" (click)="createTeam()">
            <i nz-icon nzType="team"></i>
            創建團隊
          </button>
        </nz-card-extra>
      </nz-card-header>
      <nz-card-content>
        <nz-tabset>
          <nz-tab nzTitle="團隊列表">
            <app-team-list></app-team-list>
          </nz-tab>
          <nz-tab nzTitle="團隊架構">
            <app-team-hierarchy></app-team-hierarchy>
          </nz-tab>
          <nz-tab nzTitle="成員管理">
            <app-team-members></app-team-members>
          </nz-tab>
          <nz-tab nzTitle="權限管理">
            <app-team-permissions></app-team-permissions>
          </nz-tab>
        </nz-tabset>
      </nz-card-content>
    </nz-card>
  `
})
export class TeamManagementComponent implements OnInit {
  constructor(
    private teamService: TeamService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.teamService.loadOrganizationTeams();
  }
  
  createTeam() {
    this.modal.create({
      nzTitle: '創建團隊',
      nzContent: AppCreateTeamModalComponent,
      nzFooter: null,
      nzWidth: 600
    });
  }
}

// 團隊列表組件
@Component({
  selector: 'app-team-list',
  template: `
    <nz-table 
      [nzData]="teams$ | async" 
      [nzLoading]="loading$ | async"
      [nzPageSize]="20"
      [nzShowPagination]="true">
      
      <thead>
        <tr>
          <th>團隊</th>
          <th>類型</th>
          <th>成員數</th>
          <th>負責人</th>
          <th>狀態</th>
          <th>創建時間</th>
          <th>操作</th>
        </tr>
      </thead>
      
      <tbody>
        <tr *ngFor="let team of teams$ | async">
          <td>
            <div class="team-info">
              <nz-avatar [nzSrc]="team.avatar" [nzSize]="32"></nz-avatar>
              <div class="team-details">
                <div class="team-name">{{ team.name }}</div>
                <div class="team-description">{{ team.description }}</div>
              </div>
            </div>
          </td>
          <td>
            <nz-tag [nzColor]="getTeamTypeColor(team.type)">
              {{ team.type | teamTypeLabel }}
            </nz-tag>
          </td>
          <td>
            <nz-badge [nzCount]="team.members.length" [nzShowZero]="true"></nz-badge>
          </td>
          <td>
            <div class="team-lead">
              <nz-avatar [nzSrc]="getTeamLead(team)?.avatar" [nzSize]="24"></nz-avatar>
              <span>{{ getTeamLead(team)?.name }}</span>
            </div>
          </td>
          <td>
            <nz-badge 
              [nzStatus]="getTeamStatusType(team)" 
              [nzText]="getTeamStatusText(team)">
            </nz-badge>
          </td>
          <td>{{ team.createdAt | date:'short' }}</td>
          <td>
            <nz-button-group>
              <button nz-button nzSize="small" (click)="viewTeam(team)">
                查看
              </button>
              <button nz-button nzSize="small" (click)="editTeam(team)">
                編輯
              </button>
              <button nz-button nzSize="small" nzDanger (click)="deleteTeam(team)">
                刪除
              </button>
            </nz-button-group>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [`
    .team-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .team-details {
      display: flex;
      flex-direction: column;
    }
    
    .team-name {
      font-weight: 500;
    }
    
    .team-description {
      color: #666;
      font-size: 12px;
    }
    
    .team-lead {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class TeamListComponent implements OnInit {
  teams$ = this.teamService.teams$;
  loading$ = this.teamService.loading$;
  
  constructor(
    private teamService: TeamService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {
    this.teamService.loadOrganizationTeams();
  }
  
  viewTeam(team: Team) {
    this.teamService.setCurrentTeam(team);
    // 導航到團隊詳情頁面
  }
  
  editTeam(team: Team) {
    this.modal.create({
      nzTitle: '編輯團隊',
      nzContent: AppEditTeamModalComponent,
      nzComponentParams: { team },
      nzFooter: null,
      nzWidth: 600
    });
  }
  
  deleteTeam(team: Team) {
    this.modal.confirm({
      nzTitle: '確認刪除',
      nzContent: `確定要刪除團隊 ${team.name} 嗎？`,
      nzOkText: '刪除',
      nzOkType: 'danger',
      nzCancelText: '取消',
      nzOnOk: () => this.teamService.deleteTeam(team.id)
    });
  }
  
  getTeamLead(team: Team): TeamMember | undefined {
    return team.members.find(member => member.role === TeamRole.LEAD);
  }
  
  getTeamTypeColor(type: TeamType): string {
    const colors = {
      [TeamType.DEPARTMENT]: 'blue',
      [TeamType.PROJECT]: 'green',
      [TeamType.FUNCTIONAL]: 'orange',
      [TeamType.MATRIX]: 'purple',
      [TeamType.VIRTUAL]: 'cyan'
    };
    return colors[type] || 'default';
  }
  
  getTeamStatusType(team: Team): 'success' | 'warning' | 'error' | 'default' {
    // 根據團隊狀態返回對應的狀態類型
    return 'success';
  }
  
  getTeamStatusText(team: Team): string {
    // 返回團隊狀態文本
    return '活躍';
  }
}

// 團隊層級組件
@Component({
  selector: 'app-team-hierarchy',
  template: `
    <div class="team-hierarchy">
      <nz-tree 
        [nzData]="teamTree$ | async"
        [nzSelectedKeys]="selectedKeys"
        [nzExpandedKeys]="expandedKeys"
        (nzClick)="onNodeClick($event)"
        (nzExpandChange)="onExpandChange($event)">
        
        <ng-container *nzTreeNodeTemplate="let node">
          <div class="tree-node">
            <nz-avatar [nzSrc]="node.origin.avatar" [nzSize]="24"></nz-avatar>
            <span class="node-title">{{ node.origin.name }}</span>
            <nz-tag [nzSize]="small" [nzColor]="getTeamTypeColor(node.origin.type)">
              {{ node.origin.type | teamTypeLabel }}
            </nz-tag>
            <span class="member-count">({{ node.origin.members.length }})</span>
          </div>
        </ng-container>
      </nz-tree>
    </div>
  `,
  styles: [`
    .team-hierarchy {
      padding: 16px;
    }
    
    .tree-node {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
    }
    
    .node-title {
      font-weight: 500;
    }
    
    .member-count {
      color: #666;
      font-size: 12px;
    }
  `]
})
export class TeamHierarchyComponent implements OnInit {
  teamTree$ = this.teamService.teamTree$;
  selectedKeys: string[] = [];
  expandedKeys: string[] = [];
  
  constructor(private teamService: TeamService) {}
  
  ngOnInit() {
    this.teamService.loadTeamHierarchy();
  }
  
  onNodeClick(event: NzFormatEmitEvent) {
    const node = event.node;
    if (node) {
      this.selectedKeys = [node.key];
      this.teamService.setCurrentTeam(node.origin);
    }
  }
  
  onExpandChange(event: NzFormatEmitEvent) {
    const node = event.node;
    if (node) {
      if (node.isExpanded) {
        this.expandedKeys = [...this.expandedKeys, node.key];
      } else {
        this.expandedKeys = this.expandedKeys.filter(key => key !== node.key);
      }
    }
  }
  
  getTeamTypeColor(type: TeamType): string {
    const colors = {
      [TeamType.DEPARTMENT]: 'blue',
      [TeamType.PROJECT]: 'green',
      [TeamType.FUNCTIONAL]: 'orange',
      [TeamType.MATRIX]: 'purple',
      [TeamType.VIRTUAL]: 'cyan'
    };
    return colors[type] || 'default';
  }
}
```

### 服務層實現
```typescript
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private readonly apiUrl = '/api/organizations';
  
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  private teamTreeSubject = new BehaviorSubject<NzTreeNodeOptions[]>([]);
  private currentTeamSubject = new BehaviorSubject<Team | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  
  teams$ = this.teamsSubject.asObservable();
  teamTree$ = this.teamTreeSubject.asObservable();
  currentTeam$ = this.currentTeamSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}
  
  // 創建團隊
  createTeam(teamData: CreateTeamRequest): Observable<Team> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.post<Team>(`${this.apiUrl}/${organizationId}/teams`, teamData)
      .pipe(
        tap(team => {
          const currentTeams = this.teamsSubject.value;
          this.teamsSubject.next([...currentTeams, team]);
          this.loadTeamHierarchy(); // 重新加載樹結構
        }),
        catchError(this.handleError)
      );
  }
  
  // 獲取組織團隊
  loadOrganizationTeams(): void {
    this.loadingSubject.next(true);
    const organizationId = this.getCurrentOrganizationId();
    
    this.http.get<Team[]>(`${this.apiUrl}/${organizationId}/teams`)
      .pipe(
        tap(teams => {
          this.teamsSubject.next(teams);
          this.buildTeamTree(teams);
        }),
        catchError(error => {
          this.loadingSubject.next(false);
          return this.handleError(error);
        }),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe();
  }
  
  // 加載團隊層級結構
  loadTeamHierarchy(): void {
    const teams = this.teamsSubject.value;
    this.buildTeamTree(teams);
  }
  
  // 構建團隊樹結構
  private buildTeamTree(teams: Team[]): void {
    const teamMap = new Map<string, NzTreeNodeOptions>();
    const rootNodes: NzTreeNodeOptions[] = [];
    
    // 創建所有節點
    teams.forEach(team => {
      const node: NzTreeNodeOptions = {
        title: team.name,
        key: team.id,
        icon: 'team',
        isLeaf: false,
        children: [],
        origin: team
      };
      teamMap.set(team.id, node);
    });
    
    // 建立父子關係
    teams.forEach(team => {
      const node = teamMap.get(team.id);
      if (node) {
        if (team.parentTeamId) {
          const parentNode = teamMap.get(team.parentTeamId);
          if (parentNode) {
            parentNode.children!.push(node);
          }
        } else {
          rootNodes.push(node);
        }
      }
    });
    
    this.teamTreeSubject.next(rootNodes);
  }
  
  // 更新團隊
  updateTeam(teamId: string, updates: Partial<Team>): Observable<Team> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.patch<Team>(`${this.apiUrl}/${organizationId}/teams/${teamId}`, updates)
      .pipe(
        tap(updatedTeam => {
          const teams = this.teamsSubject.value;
          const index = teams.findIndex(t => t.id === teamId);
          if (index !== -1) {
            teams[index] = updatedTeam;
            this.teamsSubject.next([...teams]);
            this.buildTeamTree(teams);
          }
        }),
        catchError(this.handleError)
      );
  }
  
  // 刪除團隊
  deleteTeam(teamId: string): Observable<void> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.delete<void>(`${this.apiUrl}/${organizationId}/teams/${teamId}`)
      .pipe(
        tap(() => {
          const teams = this.teamsSubject.value;
          const filteredTeams = teams.filter(t => t.id !== teamId);
          this.teamsSubject.next(filteredTeams);
          this.buildTeamTree(filteredTeams);
        }),
        catchError(this.handleError)
      );
  }
  
  // 添加團隊成員
  addTeamMember(teamId: string, memberData: AddTeamMemberRequest): Observable<TeamMember> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.post<TeamMember>(
      `${this.apiUrl}/${organizationId}/teams/${teamId}/members`, 
      memberData
    ).pipe(
      tap(member => {
        const teams = this.teamsSubject.value;
        const teamIndex = teams.findIndex(t => t.id === teamId);
        if (teamIndex !== -1) {
          teams[teamIndex].members.push(member);
          this.teamsSubject.next([...teams]);
          this.buildTeamTree(teams);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 移除團隊成員
  removeTeamMember(teamId: string, memberId: string): Observable<void> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.delete<void>(
      `${this.apiUrl}/${organizationId}/teams/${teamId}/members/${memberId}`
    ).pipe(
      tap(() => {
        const teams = this.teamsSubject.value;
        const teamIndex = teams.findIndex(t => t.id === teamId);
        if (teamIndex !== -1) {
          teams[teamIndex].members = teams[teamIndex].members.filter(m => m.id !== memberId);
          this.teamsSubject.next([...teams]);
          this.buildTeamTree(teams);
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 更新團隊成員角色
  updateTeamMemberRole(teamId: string, memberId: string, role: TeamRole): Observable<TeamMember> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.patch<TeamMember>(
      `${this.apiUrl}/${organizationId}/teams/${teamId}/members/${memberId}`,
      { role }
    ).pipe(
      tap(updatedMember => {
        const teams = this.teamsSubject.value;
        const teamIndex = teams.findIndex(t => t.id === teamId);
        if (teamIndex !== -1) {
          const memberIndex = teams[teamIndex].members.findIndex(m => m.id === memberId);
          if (memberIndex !== -1) {
            teams[teamIndex].members[memberIndex] = updatedMember;
            this.teamsSubject.next([...teams]);
            this.buildTeamTree(teams);
          }
        }
      }),
      catchError(this.handleError)
    );
  }
  
  // 設置當前團隊
  setCurrentTeam(team: Team): void {
    this.currentTeamSubject.next(team);
  }
  
  // 獲取團隊統計
  getTeamStatistics(teamId: string): Observable<TeamStatistics> {
    const organizationId = this.getCurrentOrganizationId();
    return this.http.get<TeamStatistics>(
      `${this.apiUrl}/${organizationId}/teams/${teamId}/statistics`
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
    console.error('Team service error:', error);
    return throwError(() => new Error(error.message || 'Unknown error'));
  }
}
```

## 🔐 權限控制

### 團隊權限定義
```typescript
enum TeamPermission {
  // 團隊管理權限
  MANAGE_TEAM = 'manage_team',
  VIEW_TEAM = 'view_team',
  DELETE_TEAM = 'delete_team',
  
  // 成員管理權限
  MANAGE_TEAM_MEMBERS = 'manage_team_members',
  INVITE_TEAM_MEMBERS = 'invite_team_members',
  REMOVE_TEAM_MEMBERS = 'remove_team_members',
  
  // 項目管理權限
  MANAGE_TEAM_PROJECTS = 'manage_team_projects',
  VIEW_TEAM_PROJECTS = 'view_team_projects',
  
  // 設置管理權限
  MANAGE_TEAM_SETTINGS = 'manage_team_settings',
  VIEW_TEAM_SETTINGS = 'view_team_settings',
  
  // 統計查看權限
  VIEW_TEAM_STATISTICS = 'view_team_statistics'
}

// 團隊角色權限映射
const TEAM_ROLE_PERMISSIONS: Record<TeamRole, TeamPermission[]> = {
  [TeamRole.LEAD]: [
    TeamPermission.MANAGE_TEAM,
    TeamPermission.DELETE_TEAM,
    TeamPermission.MANAGE_TEAM_MEMBERS,
    TeamPermission.MANAGE_TEAM_PROJECTS,
    TeamPermission.MANAGE_TEAM_SETTINGS,
    TeamPermission.VIEW_TEAM_STATISTICS
  ],
  [TeamRole.MANAGER]: [
    TeamPermission.VIEW_TEAM,
    TeamPermission.MANAGE_TEAM_MEMBERS,
    TeamPermission.MANAGE_TEAM_PROJECTS,
    TeamPermission.MANAGE_TEAM_SETTINGS,
    TeamPermission.VIEW_TEAM_STATISTICS
  ],
  [TeamRole.SENIOR]: [
    TeamPermission.VIEW_TEAM,
    TeamPermission.INVITE_TEAM_MEMBERS,
    TeamPermission.VIEW_TEAM_PROJECTS
  ],
  [TeamRole.MEMBER]: [
    TeamPermission.VIEW_TEAM,
    TeamPermission.VIEW_TEAM_PROJECTS
  ],
  [TeamRole.CONTRIBUTOR]: [
    TeamPermission.VIEW_TEAM
  ],
  [TeamRole.OBSERVER]: [
    TeamPermission.VIEW_TEAM
  ]
};
```

## 📱 UI/UX 設計

### 團隊成員管理組件
```typescript
@Component({
  selector: 'app-team-members',
  template: `
    <div class="team-members">
      <nz-card>
        <nz-card-header>
          <nz-card-title>團隊成員</nz-card-title>
          <nz-card-extra>
            <button nz-button nzType="primary" (click)="addMember()">
              <i nz-icon nzType="user-add"></i>
              添加成員
            </button>
          </nz-card-extra>
        </nz-card-header>
        <nz-card-content>
          <nz-table 
            [nzData]="teamMembers$ | async" 
            [nzLoading]="loading$ | async">
            
            <thead>
              <tr>
                <th>成員</th>
                <th>角色</th>
                <th>狀態</th>
                <th>可用性</th>
                <th>技能</th>
                <th>加入時間</th>
                <th>操作</th>
              </tr>
            </thead>
            
            <tbody>
              <tr *ngFor="let member of teamMembers$ | async">
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
                    {{ member.role | teamRoleLabel }}
                  </nz-tag>
                </td>
                <td>
                  <nz-badge 
                    [nzStatus]="getStatusType(member.status)" 
                    [nzText]="member.status | memberStatusLabel">
                  </nz-badge>
                </td>
                <td>
                  <div class="availability">
                    <nz-tag *ngFor="let skill of member.skills.slice(0, 2)" 
                           nzSize="small">
                      {{ skill }}
                    </nz-tag>
                    <span *ngIf="member.skills.length > 2" class="more-skills">
                      +{{ member.skills.length - 2 }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="skills">
                    <nz-tag *ngFor="let skill of member.skills.slice(0, 3)" 
                           nzSize="small">
                      {{ skill }}
                    </nz-tag>
                    <span *ngIf="member.skills.length > 3" class="more-skills">
                      +{{ member.skills.length - 3 }}
                    </span>
                  </div>
                </td>
                <td>{{ member.joinedAt | date:'short' }}</td>
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
        </nz-card-content>
      </nz-card>
    </div>
  `,
  styles: [`
    .team-members {
      margin-top: 16px;
    }
    
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
    
    .availability, .skills {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      align-items: center;
    }
    
    .more-skills {
      color: #666;
      font-size: 12px;
    }
  `]
})
export class TeamMembersComponent implements OnInit {
  teamMembers$ = this.teamService.currentTeam$.pipe(
    map(team => team?.members || [])
  );
  loading$ = this.teamService.loading$;
  
  constructor(
    private teamService: TeamService,
    private modal: NzModalService
  ) {}
  
  ngOnInit() {}
  
  addMember() {
    this.modal.create({
      nzTitle: '添加團隊成員',
      nzContent: AppAddTeamMemberModalComponent,
      nzFooter: null,
      nzWidth: 500
    });
  }
  
  editMember(member: TeamMember) {
    this.modal.create({
      nzTitle: '編輯團隊成員',
      nzContent: AppEditTeamMemberModalComponent,
      nzComponentParams: { member },
      nzFooter: null,
      nzWidth: 500
    });
  }
  
  removeMember(member: TeamMember) {
    this.modal.confirm({
      nzTitle: '確認移除',
      nzContent: `確定要移除成員 ${member.user.name} 嗎？`,
      nzOkText: '移除',
      nzOkType: 'danger',
      nzCancelText: '取消',
      nzOnOk: () => this.teamService.removeTeamMember(member.teamId, member.id)
    });
  }
  
  getRoleColor(role: TeamRole): string {
    const colors = {
      [TeamRole.LEAD]: 'red',
      [TeamRole.MANAGER]: 'blue',
      [TeamRole.SENIOR]: 'green',
      [TeamRole.MEMBER]: 'orange',
      [TeamRole.CONTRIBUTOR]: 'cyan',
      [TeamRole.OBSERVER]: 'default'
    };
    return colors[role] || 'default';
  }
  
  getStatusType(status: TeamMemberStatus): 'success' | 'warning' | 'error' | 'default' {
    const types = {
      [TeamMemberStatus.ACTIVE]: 'success',
      [TeamMemberStatus.INACTIVE]: 'default',
      [TeamMemberStatus.AWAY]: 'warning',
      [TeamMemberStatus.BUSY]: 'warning',
      [TeamMemberStatus.DO_NOT_DISTURB]: 'error'
    };
    return types[status] || 'default';
  }
}
```

## 🧪 測試策略

### 單元測試
```typescript
describe('TeamService', () => {
  let service: TeamService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TeamService]
    });
    service = TestBed.inject(TeamService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should create team successfully', () => {
    const teamData = {
      name: 'Development Team',
      description: 'Frontend development team',
      type: TeamType.PROJECT
    };
    
    service.createTeam(teamData).subscribe(team => {
      expect(team.name).toBe('Development Team');
      expect(team.type).toBe(TeamType.PROJECT);
    });
    
    const req = httpMock.expectOne('/api/organizations/test-org/teams');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(teamData);
    req.flush({ id: '1', ...teamData, members: [] });
  });
  
  it('should load team hierarchy', () => {
    const mockTeams = [
      { id: '1', name: 'Parent Team', parentTeamId: null, members: [] },
      { id: '2', name: 'Child Team', parentTeamId: '1', members: [] }
    ];
    
    service.loadOrganizationTeams();
    
    const req = httpMock.expectOne('/api/organizations/test-org/teams');
    req.flush(mockTeams);
    
    service.teamTree$.subscribe(tree => {
      expect(tree.length).toBe(1); // 只有一個根節點
      expect(tree[0].children?.length).toBe(1); // 有一個子節點
    });
  });
});
```

## 📈 性能優化

### 團隊樹虛擬化
```typescript
@Component({
  selector: 'app-team-hierarchy-virtual',
  template: `
    <cdk-virtual-scroll-viewport itemSize="40" class="hierarchy-viewport">
      <div *cdkVirtualFor="let team of flattenedTeams$ | async" 
           class="team-node"
           [style.padding-left]="team.level * 20 + 'px'">
        <nz-avatar [nzSrc]="team.avatar" [nzSize]="24"></nz-avatar>
        <span class="team-name">{{ team.name }}</span>
        <span class="member-count">({{ team.members.length }})</span>
      </div>
    </cdk-virtual-scroll-viewport>
  `,
  styles: [`
    .hierarchy-viewport {
      height: 400px;
    }
    
    .team-node {
      display: flex;
      align-items: center;
      gap: 8px;
      height: 40px;
      padding: 0 16px;
    }
    
    .team-name {
      font-weight: 500;
    }
    
    .member-count {
      color: #666;
      font-size: 12px;
    }
  `]
})
export class TeamHierarchyVirtualComponent {
  flattenedTeams$ = this.teamService.teams$.pipe(
    map(teams => this.flattenTeamHierarchy(teams))
  );
  
  private flattenTeamHierarchy(teams: Team[]): Team[] {
    const result: Team[] = [];
    
    const flatten = (teamList: Team[], level: number = 0) => {
      teamList.forEach(team => {
        result.push({ ...team, level });
        const children = teams.filter(t => t.parentTeamId === team.id);
        if (children.length > 0) {
          flatten(children, level + 1);
        }
      });
    };
    
    const rootTeams = teams.filter(t => !t.parentTeamId);
    flatten(rootTeams);
    
    return result;
  }
}
```

## 🔄 狀態管理

### NgRx 狀態結構
```typescript
export interface TeamState {
  teams: Team[];
  teamTree: NzTreeNodeOptions[];
  currentTeam: Team | null;
  loading: boolean;
  error: string | null;
}

export const initialState: TeamState = {
  teams: [],
  teamTree: [],
  currentTeam: null,
  loading: false,
  error: null
};

export const teamReducer = createReducer(
  initialState,
  on(TeamActions.loadTeams, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TeamActions.loadTeamsSuccess, (state, { teams }) => ({
    ...state,
    teams,
    loading: false,
    error: null
  })),
  on(TeamActions.createTeamSuccess, (state, { team }) => ({
    ...state,
    teams: [...state.teams, team]
  })),
  on(TeamActions.setCurrentTeam, (state, { team }) => ({
    ...state,
    currentTeam: team
  }))
);
```

## 📝 API 接口設計

### RESTful API 端點
```typescript
interface TeamManagementApi {
  // 創建團隊
  POST /api/organizations/{orgId}/teams
  // 獲取團隊列表
  GET /api/organizations/{orgId}/teams
  // 獲取團隊詳情
  GET /api/organizations/{orgId}/teams/{teamId}
  // 更新團隊
  PATCH /api/organizations/{orgId}/teams/{teamId}
  // 刪除團隊
  DELETE /api/organizations/{orgId}/teams/{teamId}
  // 獲取團隊層級
  GET /api/organizations/{orgId}/teams/hierarchy
  // 添加團隊成員
  POST /api/organizations/{orgId}/teams/{teamId}/members
  // 移除團隊成員
  DELETE /api/organizations/{orgId}/teams/{teamId}/members/{memberId}
  // 更新成員角色
  PATCH /api/organizations/{orgId}/teams/{teamId}/members/{memberId}
  // 獲取團隊統計
  GET /api/organizations/{orgId}/teams/{teamId}/statistics
}
```

## 🚀 部署考慮

### 環境變數配置
```typescript
export const teamConfig = {
  maxTeamsPerOrganization: parseInt(process.env.MAX_TEAMS_PER_ORG || '100'),
  maxMembersPerTeam: parseInt(process.env.MAX_MEMBERS_PER_TEAM || '50'),
  maxTeamDepth: parseInt(process.env.MAX_TEAM_DEPTH || '5'),
  enableTeamTemplates: process.env.ENABLE_TEAM_TEMPLATES === 'true',
  enableTeamAnalytics: process.env.ENABLE_TEAM_ANALYTICS === 'true'
};
```

### 數據庫索引
```sql
-- 團隊表索引
CREATE INDEX idx_teams_org_id ON teams(organization_id);
CREATE INDEX idx_teams_parent_id ON teams(parent_team_id);
CREATE INDEX idx_teams_type ON teams(type);
CREATE INDEX idx_teams_visibility ON teams(visibility);
CREATE INDEX idx_teams_level ON teams(level);

-- 團隊成員表索引
CREATE INDEX idx_team_members_team_id ON team_members(team_id);
CREATE INDEX idx_team_members_user_id ON team_members(user_id);
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_status ON team_members(status);

-- 團隊權限表索引
CREATE INDEX idx_team_permissions_team_id ON team_permissions(team_id);
CREATE INDEX idx_team_permissions_permission ON team_permissions(permission);
CREATE INDEX idx_team_permissions_resource ON team_permissions(resource);
```

---

**📋 實施檢查清單**
- [ ] 數據模型設計完成
- [ ] 團隊層級結構實現
- [ ] 團隊管理組件開發
- [ ] 成員管理功能
- [ ] 權限控制系統
- [ ] 團隊統計分析
- [ ] 單元測試編寫
- [ ] 集成測試編寫
- [ ] 性能優化實施
- [ ] 文檔編寫完成