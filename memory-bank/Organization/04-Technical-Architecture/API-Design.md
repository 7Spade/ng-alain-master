# 🔌 API 接口設計

## 📋 概述

本文檔詳細描述了 GitHub 組織功能系統的完整 API 接口設計，包括 RESTful API 規範、GraphQL 查詢設計、實時通信協議和 API 版本管理策略。

### 🎯 設計目標
- 提供統一、一致的 API 接口
- 支持高性能和可擴展性
- 確保 API 安全性和合規性
- 提供完整的 API 文檔和測試

## 🏗️ API 架構概覽

### API 分層架構
```
API 接口層
├── RESTful API
│   ├── 組織管理 API
│   ├── 成員管理 API
│   ├── 團隊管理 API
│   ├── 權限控制 API
│   ├── 項目管理 API
│   └── 審計安全 API
├── GraphQL API
│   ├── 查詢接口
│   ├── 變更接口
│   ├── 訂閱接口
│   └── 自定義類型
├── WebSocket API
│   ├── 實時通知
│   ├── 協作功能
│   ├── 狀態同步
│   └── 事件推送
└── 文件上傳 API
    ├── 圖片上傳
    ├── 文檔上傳
    ├── 批量上傳
    └── 文件管理
```

## 🌐 RESTful API 設計

### 通用 API 規範

#### 請求格式
```typescript
// HTTP 方法
GET    /api/v1/{resource}              // 獲取資源列表
GET    /api/v1/{resource}/{id}         // 獲取單個資源
POST   /api/v1/{resource}              // 創建資源
PUT    /api/v1/{resource}/{id}         // 更新資源
PATCH  /api/v1/{resource}/{id}         // 部分更新資源
DELETE /api/v1/{resource}/{id}         // 刪除資源

// 請求頭
Content-Type: application/json
Authorization: Bearer {token}
X-Request-ID: {uuid}
X-Client-Version: {version}

// 查詢參數
?page=1&limit=20&sort=createdAt&order=desc&filter={field}:{value}
```

#### 響應格式
```typescript
// 成功響應
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
  };
  timestamp: string;
  requestId: string;
}

// 錯誤響應
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
    field?: string;
  };
  timestamp: string;
  requestId: string;
}

// 分頁響應
interface PaginatedResponse<T> {
  success: true;
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  timestamp: string;
  requestId: string;
}
```

### 組織管理 API

#### 組織 CRUD 操作
```typescript
// 獲取組織列表
GET /api/v1/organizations
Query: {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  type?: OrganizationType;
  status?: OrganizationStatus;
}

Response: PaginatedResponse<Organization>

// 獲取組織詳情
GET /api/v1/organizations/{id}
Response: ApiResponse<Organization>

// 創建組織
POST /api/v1/organizations
Body: {
  name: string;
  slug: string;
  description?: string;
  type: OrganizationType;
  settings: OrganizationSettings;
}

Response: ApiResponse<Organization>

// 更新組織
PUT /api/v1/organizations/{id}
Body: Partial<Organization>
Response: ApiResponse<Organization>

// 刪除組織
DELETE /api/v1/organizations/{id}
Response: ApiResponse<void>

// 獲取組織統計
GET /api/v1/organizations/{id}/statistics
Response: ApiResponse<OrganizationStats>
```

#### 組織成員管理
```typescript
// 獲取組織成員
GET /api/v1/organizations/{id}/members
Query: {
  page?: number;
  limit?: number;
  role?: OrganizationRole;
  status?: MemberStatus;
  search?: string;
}

Response: PaginatedResponse<OrganizationMember>

// 邀請成員
POST /api/v1/organizations/{id}/members/invite
Body: {
  emails: string[];
  role: OrganizationRole;
  message?: string;
  expiresAt?: Date;
}

Response: ApiResponse<MemberInvitation[]>

// 更新成員角色
PUT /api/v1/organizations/{id}/members/{memberId}
Body: {
  role: OrganizationRole;
  permissions?: string[];
}

Response: ApiResponse<OrganizationMember>

// 移除成員
DELETE /api/v1/organizations/{id}/members/{memberId}
Response: ApiResponse<void>
```

### 團隊管理 API

#### 團隊 CRUD 操作
```typescript
// 獲取團隊列表
GET /api/v1/teams
Query: {
  organizationId?: string;
  parentTeamId?: string;
  page?: number;
  limit?: number;
}

Response: PaginatedResponse<Team>

// 獲取團隊詳情
GET /api/v1/teams/{id}
Response: ApiResponse<Team>

// 創建團隊
POST /api/v1/teams
Body: {
  name: string;
  slug: string;
  description?: string;
  organizationId: string;
  parentTeamId?: string;
  type: TeamType;
  visibility: TeamVisibility;
}

Response: ApiResponse<Team>

// 更新團隊
PUT /api/v1/teams/{id}
Body: Partial<Team>
Response: ApiResponse<Team>

// 刪除團隊
DELETE /api/v1/teams/{id}
Response: ApiResponse<void>
```

#### 團隊成員管理
```typescript
// 獲取團隊成員
GET /api/v1/teams/{id}/members
Response: PaginatedResponse<TeamMember>

// 添加團隊成員
POST /api/v1/teams/{id}/members
Body: {
  userId: string;
  role: TeamRole;
  permissions?: TeamPermission[];
}

Response: ApiResponse<TeamMember>

// 更新團隊成員
PUT /api/v1/teams/{id}/members/{memberId}
Body: {
  role: TeamRole;
  permissions?: TeamPermission[];
}

Response: ApiResponse<TeamMember>

// 移除團隊成員
DELETE /api/v1/teams/{id}/members/{memberId}
Response: ApiResponse<void>
```

### 權限控制 API

#### 權限管理
```typescript
// 獲取權限列表
GET /api/v1/permissions
Query: {
  resourceType?: ResourceType;
  organizationId?: string;
}

Response: PaginatedResponse<Permission>

// 檢查權限
POST /api/v1/permissions/check
Body: {
  permission: string;
  resourceId?: string;
  conditions?: PermissionCondition[];
  context?: Record<string, any>;
}

Response: ApiResponse<PermissionCheckResult>

// 獲取用戶權限
GET /api/v1/users/{userId}/permissions
Query: {
  resourceId?: string;
  includeInherited?: boolean;
}

Response: ApiResponse<Permission[]>

// 分配權限
POST /api/v1/permissions/assign
Body: {
  subjectType: SubjectType;
  subjectId: string;
  resourceType: ResourceType;
  resourceId?: string;
  permission: string;
  granted: boolean;
  conditions?: PermissionCondition[];
  expiresAt?: Date;
}

Response: ApiResponse<PermissionAssignment>
```

### 項目管理 API

#### 項目 CRUD 操作
```typescript
// 獲取項目列表
GET /api/v1/projects
Query: {
  organizationId?: string;
  teamId?: string;
  type?: ProjectType;
  status?: ProjectStatus;
  visibility?: ProjectVisibility;
  page?: number;
  limit?: number;
}

Response: PaginatedResponse<Project>

// 獲取項目詳情
GET /api/v1/projects/{id}
Response: ApiResponse<Project>

// 創建項目
POST /api/v1/projects
Body: {
  name: string;
  slug: string;
  description?: string;
  type: ProjectType;
  visibility: ProjectVisibility;
  organizationId: string;
  teamId?: string;
  settings: ProjectSettings;
}

Response: ApiResponse<Project>

// 更新項目
PUT /api/v1/projects/{id}
Body: Partial<Project>
Response: ApiResponse<Project>

// 刪除項目
DELETE /api/v1/projects/{id}
Response: ApiResponse<void>
```

### 審計安全 API

#### 審計日誌
```typescript
// 獲取審計日誌
GET /api/v1/audit/logs
Query: {
  userId?: string;
  action?: AuditAction;
  resourceType?: ResourceType;
  resourceId?: string;
  severity?: AuditSeverity;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
}

Response: PaginatedResponse<AuditLog>

// 創建審計日誌
POST /api/v1/audit/logs
Body: {
  action: AuditAction;
  resourceType: ResourceType;
  resourceId?: string;
  details: AuditDetails;
  metadata: AuditMetadata;
  severity: AuditSeverity;
}

Response: ApiResponse<AuditLog>

// 導出審計日誌
GET /api/v1/audit/export
Query: {
  format: 'csv' | 'xlsx' | 'pdf';
  filters: any;
}

Response: Blob
```

#### 安全事件
```typescript
// 獲取安全事件
GET /api/v1/security/events
Query: {
  type?: SecurityEventType;
  severity?: AuditSeverity;
  status?: SecurityEventStatus;
  page?: number;
  limit?: number;
}

Response: PaginatedResponse<SecurityEvent>

// 創建安全事件
POST /api/v1/security/events
Body: {
  type: SecurityEventType;
  severity: AuditSeverity;
  title: string;
  description: string;
  userId?: string;
  details: SecurityEventDetails;
}

Response: ApiResponse<SecurityEvent>

// 解決安全事件
PUT /api/v1/security/events/{id}/resolve
Body: {
  resolution: string;
  resolvedBy: string;
}

Response: ApiResponse<void>
```

## 🔍 GraphQL API 設計

### Schema 定義
```graphql
# 組織類型
type Organization {
  id: ID!
  name: String!
  slug: String!
  description: String
  avatar: String
  type: OrganizationType!
  settings: OrganizationSettings!
  statistics: OrganizationStats!
  members(first: Int, after: String): MemberConnection!
  teams(first: Int, after: String): TeamConnection!
  projects(first: Int, after: String): ProjectConnection!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type OrganizationSettings {
  allowMemberInvite: Boolean!
  allowPublicAccess: Boolean!
  defaultPermissions: [String!]!
  dataRetentionDays: Int!
  complianceSettings: ComplianceSettings!
}

type OrganizationStats {
  totalMembers: Int!
  totalTeams: Int!
  totalProjects: Int!
  activeMembers: Int!
  lastActivity: DateTime
}

# 成員類型
type Member {
  id: ID!
  user: User!
  organization: Organization!
  role: OrganizationRole!
  permissions: [String!]!
  status: MemberStatus!
  joinedAt: DateTime!
  invitedBy: Member
  activities(first: Int, after: String): ActivityConnection!
}

type User {
  id: ID!
  email: String!
  name: String!
  avatar: String
  profile: UserProfile
}

type UserProfile {
  bio: String
  location: String
  website: String
  socialLinks: [SocialLink!]!
}

type SocialLink {
  platform: String!
  url: String!
}

# 團隊類型
type Team {
  id: ID!
  name: String!
  slug: String!
  description: String
  type: TeamType!
  visibility: TeamVisibility!
  organization: Organization!
  parentTeam: Team
  childTeams(first: Int, after: String): TeamConnection!
  members(first: Int, after: String): TeamMemberConnection!
  projects(first: Int, after: String): ProjectConnection!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type TeamMember {
  id: ID!
  team: Team!
  member: Member!
  role: TeamRole!
  permissions: [TeamPermission!]!
  joinedAt: DateTime!
}

# 項目類型
type Project {
  id: ID!
  name: String!
  slug: String!
  description: String
  type: ProjectType!
  visibility: ProjectVisibility!
  status: ProjectStatus!
  organization: Organization!
  team: Team
  owner: Member!
  settings: ProjectSettings!
  statistics: ProjectStatistics!
  members(first: Int, after: String): ProjectMemberConnection!
  createdAt: DateTime!
  updatedAt: DateTime!
}

# 權限類型
type Permission {
  id: ID!
  name: String!
  code: String!
  description: String
  resourceType: ResourceType!
  actions: [PermissionAction!]!
  conditions: [PermissionCondition!]
  isSystem: Boolean!
}

type PermissionCondition {
  field: String!
  operator: Operator!
  value: JSON!
  type: ConditionType!
}

# 審計類型
type AuditLog {
  id: ID!
  user: User
  action: AuditAction!
  resourceType: ResourceType!
  resourceId: String
  resourceName: String
  organization: Organization!
  details: AuditDetails!
  metadata: AuditMetadata!
  severity: AuditSeverity!
  status: AuditStatus!
  timestamp: DateTime!
}

type AuditDetails {
  description: String!
  oldValues: JSON
  newValues: JSON
  changes: JSON
  reason: String
  context: JSON
}

# 安全事件類型
type SecurityEvent {
  id: ID!
  type: SecurityEventType!
  severity: AuditSeverity!
  title: String!
  description: String!
  user: User
  organization: Organization!
  details: SecurityEventDetails!
  metadata: SecurityEventMetadata!
  status: SecurityEventStatus!
  resolvedAt: DateTime
  resolvedBy: User
  createdAt: DateTime!
  updatedAt: DateTime!
}

# 連接類型
type OrganizationConnection {
  edges: [OrganizationEdge!]!
  pageInfo: PageInfo!
  totalCount: Int!
}

type OrganizationEdge {
  node: Organization!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# 枚舉類型
enum OrganizationType {
  PERSONAL
  ENTERPRISE
}

enum OrganizationRole {
  OWNER
  ADMIN
  MEMBER
}

enum MemberStatus {
  ACTIVE
  INACTIVE
  PENDING
  SUSPENDED
}

enum TeamType {
  SECURITY
  DEVELOPER
  MANAGEMENT
  CUSTOM
}

enum TeamVisibility {
  SECRET
  PRIVATE
  VISIBLE
}

enum ProjectType {
  SOFTWARE
  DESIGN
  MARKETING
  RESEARCH
  BUSINESS
}

enum ProjectStatus {
  PLANNING
  ACTIVE
  ON_HOLD
  COMPLETED
  CANCELLED
}

enum ResourceType {
  ORGANIZATION
  TEAM
  PROJECT
  MEMBER
  REPOSITORY
  SETTINGS
  AUDIT
  BILLING
}

enum PermissionAction {
  CREATE
  READ
  UPDATE
  DELETE
  INVITE
  REMOVE
  MANAGE
  ADMIN
}

enum AuditAction {
  CREATE
  READ
  UPDATE
  DELETE
  LOGIN
  LOGOUT
  INVITE
  REMOVE
  GRANT
  REVOKE
  EXPORT
  IMPORT
  CONFIGURE
}

enum AuditSeverity {
  LOW
  MEDIUM
  HIGH
  CRITICAL
}

enum SecurityEventType {
  UNAUTHORIZED_ACCESS
  SUSPICIOUS_LOGIN
  PRIVILEGE_ESCALATION
  DATA_BREACH
  MALWARE_DETECTED
  BRUTE_FORCE_ATTACK
  PHISHING_ATTEMPT
  ACCOUNT_COMPROMISE
}

# 查詢類型
type Query {
  # 組織查詢
  organization(id: ID!): Organization
  organizations(
    first: Int = 20
    after: String
    filter: OrganizationFilter
    sort: OrganizationSort
  ): OrganizationConnection!
  
  # 成員查詢
  member(id: ID!): Member
  members(
    organizationId: ID!
    first: Int = 20
    after: String
    filter: MemberFilter
  ): MemberConnection!
  
  # 團隊查詢
  team(id: ID!): Team
  teams(
    organizationId: ID!
    first: Int = 20
    after: String
    filter: TeamFilter
  ): TeamConnection!
  
  # 項目查詢
  project(id: ID!): Project
  projects(
    organizationId: ID
    teamId: ID
    first: Int = 20
    after: String
    filter: ProjectFilter
  ): ProjectConnection!
  
  # 權限查詢
  permissions(
    resourceType: ResourceType
    first: Int = 20
    after: String
  ): PermissionConnection!
  
  checkPermission(
    permission: String!
    resourceId: String
    conditions: [PermissionConditionInput!]
  ): PermissionCheckResult!
  
  # 審計查詢
  auditLogs(
    first: Int = 20
    after: String
    filter: AuditLogFilter
  ): AuditLogConnection!
  
  # 安全事件查詢
  securityEvents(
    first: Int = 20
    after: String
    filter: SecurityEventFilter
  ): SecurityEventConnection!
  
  # 統計查詢
  organizationStatistics(id: ID!): OrganizationStats!
  auditStatistics(filter: AuditStatisticsFilter): AuditStatistics!
}

# 變更類型
type Mutation {
  # 組織變更
  createOrganization(input: CreateOrganizationInput!): Organization!
  updateOrganization(id: ID!, input: UpdateOrganizationInput!): Organization!
  deleteOrganization(id: ID!): Boolean!
  
  # 成員變更
  inviteMember(input: InviteMemberInput!): MemberInvitation!
  updateMemberRole(id: ID!, role: OrganizationRole!): Member!
  removeMember(id: ID!): Boolean!
  
  # 團隊變更
  createTeam(input: CreateTeamInput!): Team!
  updateTeam(id: ID!, input: UpdateTeamInput!): Team!
  deleteTeam(id: ID!): Boolean!
  
  # 項目變更
  createProject(input: CreateProjectInput!): Project!
  updateProject(id: ID!, input: UpdateProjectInput!): Project!
  deleteProject(id: ID!): Boolean!
  
  # 權限變更
  assignPermission(input: AssignPermissionInput!): PermissionAssignment!
  revokePermission(id: ID!): Boolean!
  
  # 安全事件變更
  createSecurityEvent(input: CreateSecurityEventInput!): SecurityEvent!
  resolveSecurityEvent(id: ID!, input: ResolveSecurityEventInput!): SecurityEvent!
}

# 訂閱類型
type Subscription {
  # 實時通知
  organizationUpdated(organizationId: ID!): Organization!
  memberUpdated(organizationId: ID!): Member!
  teamUpdated(organizationId: ID!): Team!
  projectUpdated(organizationId: ID!): Project!
  
  # 安全事件
  securityEventCreated(organizationId: ID!): SecurityEvent!
  securityEventResolved(organizationId: ID!): SecurityEvent!
  
  # 審計事件
  auditLogCreated(organizationId: ID!): AuditLog!
}

# 輸入類型
input CreateOrganizationInput {
  name: String!
  slug: String!
  description: String
  type: OrganizationType!
  settings: OrganizationSettingsInput!
}

input UpdateOrganizationInput {
  name: String
  description: String
  settings: OrganizationSettingsInput
}

input InviteMemberInput {
  organizationId: ID!
  emails: [String!]!
  role: OrganizationRole!
  message: String
  expiresAt: DateTime
}

input CreateTeamInput {
  name: String!
  slug: String!
  description: String
  organizationId: ID!
  parentTeamId: ID
  type: TeamType!
  visibility: TeamVisibility!
}

input CreateProjectInput {
  name: String!
  slug: String!
  description: String
  type: ProjectType!
  visibility: ProjectVisibility!
  organizationId: ID!
  teamId: ID
  settings: ProjectSettingsInput!
}

input AssignPermissionInput {
  subjectType: SubjectType!
  subjectId: ID!
  resourceType: ResourceType!
  resourceId: ID
  permission: String!
  granted: Boolean!
  conditions: [PermissionConditionInput!]
  expiresAt: DateTime
}

input CreateSecurityEventInput {
  type: SecurityEventType!
  severity: AuditSeverity!
  title: String!
  description: String!
  userId: ID
  organizationId: ID!
  details: SecurityEventDetailsInput!
}

# 過濾器類型
input OrganizationFilter {
  name: String
  type: OrganizationType
  status: OrganizationStatus
}

input MemberFilter {
  role: OrganizationRole
  status: MemberStatus
  search: String
}

input TeamFilter {
  type: TeamType
  visibility: TeamVisibility
  parentTeamId: ID
}

input ProjectFilter {
  type: ProjectType
  status: ProjectStatus
  visibility: ProjectVisibility
  teamId: ID
}

input AuditLogFilter {
  userId: ID
  action: AuditAction
  resourceType: ResourceType
  resourceId: ID
  severity: AuditSeverity
  startDate: DateTime
  endDate: DateTime
}

input SecurityEventFilter {
  type: SecurityEventType
  severity: AuditSeverity
  status: SecurityEventStatus
}

# 排序類型
input OrganizationSort {
  field: OrganizationSortField!
  direction: SortDirection!
}

enum OrganizationSortField {
  NAME
  CREATED_AT
  UPDATED_AT
  MEMBER_COUNT
}

enum SortDirection {
  ASC
  DESC
}
```

### GraphQL 查詢示例
```graphql
# 獲取組織及其成員和團隊
query GetOrganization($id: ID!) {
  organization(id: $id) {
    id
    name
    slug
    description
    type
    statistics {
      totalMembers
      totalTeams
      totalProjects
    }
    members(first: 10) {
      edges {
        node {
          id
          user {
            name
            email
          }
          role
          status
          joinedAt
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    teams(first: 10) {
      edges {
        node {
          id
          name
          type
          visibility
          members {
            totalCount
          }
        }
      }
    }
  }
}

# 創建組織
mutation CreateOrganization($input: CreateOrganizationInput!) {
  createOrganization(input: $input) {
    id
    name
    slug
    type
    createdAt
  }
}

# 邀請成員
mutation InviteMember($input: InviteMemberInput!) {
  inviteMember(input: $input) {
    id
    email
    role
    status
    expiresAt
  }
}

# 訂閱組織更新
subscription OrganizationUpdated($organizationId: ID!) {
  organizationUpdated(organizationId: $organizationId) {
    id
    name
    statistics {
      totalMembers
      totalTeams
    }
  }
}
```

## 🔌 WebSocket API 設計

### 連接管理
```typescript
// WebSocket 連接端點
WS /ws/v1/organizations/{organizationId}

// 認證
{
  "type": "auth",
  "token": "jwt_token_here"
}

// 認證響應
{
  "type": "auth_success",
  "userId": "user_id",
  "organizationId": "org_id",
  "permissions": ["org:read", "team:manage"]
}
```

### 實時事件
```typescript
// 組織事件
interface OrganizationEvent {
  type: 'organization_updated' | 'organization_deleted';
  organizationId: string;
  data: Organization;
  timestamp: string;
}

// 成員事件
interface MemberEvent {
  type: 'member_added' | 'member_updated' | 'member_removed';
  organizationId: string;
  memberId: string;
  data: OrganizationMember;
  timestamp: string;
}

// 團隊事件
interface TeamEvent {
  type: 'team_created' | 'team_updated' | 'team_deleted';
  organizationId: string;
  teamId: string;
  data: Team;
  timestamp: string;
}

// 項目事件
interface ProjectEvent {
  type: 'project_created' | 'project_updated' | 'project_deleted';
  organizationId: string;
  projectId: string;
  data: Project;
  timestamp: string;
}

// 安全事件
interface SecurityEvent {
  type: 'security_event_created' | 'security_event_resolved';
  organizationId: string;
  eventId: string;
  data: SecurityEvent;
  timestamp: string;
}

// 審計事件
interface AuditEvent {
  type: 'audit_log_created';
  organizationId: string;
  logId: string;
  data: AuditLog;
  timestamp: string;
}
```

### 協作功能
```typescript
// 實時協作
interface CollaborationEvent {
  type: 'user_typing' | 'user_online' | 'user_offline';
  organizationId: string;
  userId: string;
  resourceId: string;
  resourceType: string;
  data: any;
  timestamp: string;
}

// 狀態同步
interface StateSyncEvent {
  type: 'state_sync';
  organizationId: string;
  resourceType: string;
  resourceId: string;
  state: any;
  version: number;
  timestamp: string;
}
```

## 📁 文件上傳 API

### 文件上傳端點
```typescript
// 單文件上傳
POST /api/v1/upload
Content-Type: multipart/form-data

Body: {
  file: File;
  type: 'avatar' | 'document' | 'image';
  organizationId: string;
  resourceId?: string;
  resourceType?: string;
}

Response: {
  success: true;
  data: {
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    url: string;
    thumbnailUrl?: string;
    uploadedAt: string;
  };
}

// 批量文件上傳
POST /api/v1/upload/batch
Content-Type: multipart/form-data

Body: {
  files: File[];
  type: 'document' | 'image';
  organizationId: string;
  resourceId?: string;
  resourceType?: string;
}

Response: {
  success: true;
  data: UploadedFile[];
}

// 文件管理
GET /api/v1/files
Query: {
  organizationId: string;
  resourceId?: string;
  resourceType?: string;
  type?: string;
  page?: number;
  limit?: number;
}

Response: PaginatedResponse<UploadedFile>

// 刪除文件
DELETE /api/v1/files/{id}
Response: ApiResponse<void>
```

## 🔒 API 安全設計

### 認證機制
```typescript
// JWT Token 認證
interface JWTPayload {
  sub: string;           // 用戶ID
  org: string;           // 組織ID
  iat: number;           // 發行時間
  exp: number;           // 過期時間
  permissions: string[]; // 權限列表
  roles: string[];       // 角色列表
}

// API Key 認證
interface APIKey {
  id: string;
  name: string;
  key: string;
  organizationId: string;
  permissions: string[];
  expiresAt?: Date;
  lastUsedAt?: Date;
  isActive: boolean;
}
```

### 權限控制
```typescript
// 權限中間件
interface PermissionMiddleware {
  required: string[];           // 必需權限
  resourceType?: string;        // 資源類型
  resourceParam?: string;       // 資源參數名
  conditions?: PermissionCondition[]; // 條件
}

// 速率限制
interface RateLimit {
  windowMs: number;            // 時間窗口（毫秒）
  maxRequests: number;         // 最大請求數
  skipSuccessfulRequests?: boolean; // 跳過成功請求
  keyGenerator?: (req: Request) => string; // 鍵生成器
}
```

## 📊 API 監控和統計

### 性能指標
```typescript
interface APIMetrics {
  requestCount: number;        // 請求總數
  responseTime: number;        // 平均響應時間
  errorRate: number;           // 錯誤率
  throughput: number;          // 吞吐量
  activeConnections: number;   // 活躍連接數
  cacheHitRate: number;        // 緩存命中率
}

// API 健康檢查
GET /api/v1/health
Response: {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  services: {
    database: 'healthy';
    cache: 'healthy';
    queue: 'healthy';
    storage: 'healthy';
  };
  metrics: APIMetrics;
}
```

## 🧪 API 測試策略

### 單元測試
```typescript
describe('Organization API', () => {
  it('should create organization successfully', async () => {
    const organizationData = {
      name: 'Test Organization',
      slug: 'test-org',
      type: OrganizationType.ENTERPRISE
    };
    
    const response = await request(app)
      .post('/api/v1/organizations')
      .set('Authorization', 'Bearer valid-token')
      .send(organizationData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(organizationData.name);
  });
  
  it('should return 401 for unauthorized request', async () => {
    await request(app)
      .get('/api/v1/organizations')
      .expect(401);
  });
});
```

### 集成測試
```typescript
describe('API Integration Tests', () => {
  it('should handle complete organization workflow', async () => {
    // 1. 創建組織
    const orgResponse = await createOrganization(orgData);
    
    // 2. 邀請成員
    const inviteResponse = await inviteMember(orgResponse.data.id, memberData);
    
    // 3. 創建團隊
    const teamResponse = await createTeam(orgResponse.data.id, teamData);
    
    // 4. 創建項目
    const projectResponse = await createProject(orgResponse.data.id, projectData);
    
    // 5. 驗證完整流程
    expect(orgResponse.data.id).toBeDefined();
    expect(inviteResponse.data.id).toBeDefined();
    expect(teamResponse.data.id).toBeDefined();
    expect(projectResponse.data.id).toBeDefined();
  });
});
```

## 📚 API 文檔生成

### OpenAPI 規範
```yaml
openapi: 3.0.0
info:
  title: Organization Management API
  version: 1.0.0
  description: GitHub-like organization management system API
servers:
  - url: https://api.example.com/v1
    description: Production server
  - url: https://staging-api.example.com/v1
    description: Staging server

paths:
  /organizations:
    get:
      summary: Get organizations
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/OrganizationList'
    post:
      summary: Create organization
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateOrganizationRequest'
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Organization'

components:
  schemas:
    Organization:
      type: object
      properties:
        id:
          type: string
          format: uuid
        name:
          type: string
        slug:
          type: string
        type:
          $ref: '#/components/schemas/OrganizationType'
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
      required:
        - id
        - name
        - slug
        - type

    OrganizationType:
      type: string
      enum:
        - personal
        - enterprise

    CreateOrganizationRequest:
      type: object
      properties:
        name:
          type: string
        slug:
          type: string
        type:
          $ref: '#/components/schemas/OrganizationType'
      required:
        - name
        - slug
        - type
```

## 📊 成功指標

### 功能指標
- [ ] 支持 1000+ 並發 API 請求
- [ ] API 響應時間 < 500ms
- [ ] 支持 GraphQL 查詢
- [ ] 支持 WebSocket 實時通信
- [ ] 100% API 測試覆蓋

### 性能指標
- [ ] API 可用性 > 99.9%
- [ ] 支持水平擴展
- [ ] 支持 API 緩存
- [ ] 支持速率限制

### 安全指標
- [ ] JWT Token 認證
- [ ] API 權限控制
- [ ] 輸入驗證和清理
- [ ] API 審計日誌

---

**📝 注意**: 本 API 設計需要與 Firebase 認證系統和 ng-alain 架構完美集成，確保高性能和安全性。