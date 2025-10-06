# 專案功能擴展方案（GitHub 風格；工地施工專用）- 骨架

## 目標
- 將「GitHub 儲存庫」概念映射為「工地施工專案（Project）」：支援個人與組織擁有的專案、協作、權限、設定與擴展模組。
- 對齊 Angular 20 最佳實踐（standalone、lazy routes、@if/@for、typed forms、OnPush）與 ng-alain/@delon + ng-zorro-antd UI。
- M1 先落地專案列表/詳情/建立/編輯與權限管控（Mock 接入），後續串接 BIM/成本/任務/文檔/進度等模組。

## 資訊架構與路由（IA）- GitHub 風格統一設計
- **統一所有權模型**：`owner = { ownerType: 'user' | 'organization', ownerId, ownerSlug }`
- **統一專案路由**：`/projects`（懶載入統一模組）
  - 個人專案：`/u/:userSlug/projects`（列表）、`/u/:userSlug/projects/:projectSlug`（詳情）
  - 組織專案：`/org/:orgSlug/projects`（列表）、`/org/:orgSlug/projects/:projectSlug`（詳情）
- **統一組件設計**：使用相同的組件，通過路由 `data` 屬性區分上下文
- 專案詳情下分頁（tabs）：`overview`、`members`、`settings`（M1）；後續：`bim`、`cost`、`tasks`、`docs`、`progress`（M2+）

## 前端技術與模式
- Standalone + lazy routes + 原生控制流（`@if/@for`）
- 服務層：`_HttpClient` + `DelonCacheService`；錯誤處理用 `@delon/util`
- 權限：`ProjectPermissionService.check()` + `@delon/acl`（路由 `data.permission` 與視圖內控）
- UI：ng-zorro-antd（table/form/tabs/modal/select/badge/tag/progress）+ @delon/abc（ST/SE 可逐步導入）

## 資料模型（GitHub 風格統一設計）
```ts
// GitHub 風格的統一所有權模型
export interface ProjectOwner {
  ownerType: 'user' | 'organization';
  ownerId: string;
  ownerSlug: string;
  ownerName: string;
  avatarUrl?: string;
  htmlUrl: string;
}

export type ProjectType = 'construction'|'infrastructure'|'manufacturing'|'renovation'|'maintenance';
export type ProjectStatus = 'planning'|'active'|'on_hold'|'completed'|'cancelled';
export type ProjectVisibility = 'public'|'private'|'organization';

export interface ProjectSettings { 
  visibility: ProjectVisibility; 
  enableNotifications: boolean; 
  enableTimeTracking: boolean; 
}

export interface ProjectStats { 
  memberCount: number; 
  taskCount: number; 
  progressPercent: number; 
  lastActivityAt: string; 
}

// 統一的專案模型（對齊 GitHub Repository 結構）
export interface Project {
  id: string;
  name: string;
  slug: string;
  fullName: string; // "owner/project" 格式
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  owner: ProjectOwner; // 統一的所有權對象
  settings: ProjectSettings;
  stats?: ProjectStats;
  createdAt: string;
  updatedAt: string;
}
```

## 服務層（MVP）
- `ProjectService`：列表/詳情/建立/更新/刪除、成員清單與增刪、統計；快取 5–15 分鐘，資料變更後清快取
- `ProjectPermissionService`：角色→權限映射、`check(resourcePermission)` 與 ACLService 整合

## 權限與守衛
- 路由守衛：`canActivate`/`canActivateChild` → 讀取 `route.data.permission` → `ProjectPermissionService.check()`；失敗導 `/exception/403`
- 視圖內控：`appPermission` 指令（或 ACL 指令）控制按鈕/區塊顯示
- 基本角色：`admin`/`write`/`read`；組織專案亦可繼承 org 角色並支持團隊批量賦權

## UI 重點頁（MVP）
- 專案列表：`nz-table` + 篩選（關鍵字/類型/狀態/可見性）+ 分頁；行內顯示 `nz-tag`（類型/狀態/可見性）、`nz-badge`（狀態）、`nz-progress`（進度）
- 專案詳情：頂部概要（名稱/標籤/進度/成員數）、`nz-tabs` 切換頁籤（overview/members/settings）
- 建立/編輯：`nz-modal` + reactive forms（typed forms；必填與長度規則）

## API 約定（MVP 端點）
- 共用：
  - `POST /api/projects`（body 需含 `owner`）
  - `GET /api/projects/:projectId`、`PATCH /api/projects/:projectId`、`DELETE /api/projects/:projectId`
  - `GET /api/projects/:projectId/members`、`POST /api/projects/:projectId/members`
- 範圍列表：
  - `GET /api/users/:userId/projects?q=&type=&status=&visibility=&page=&size=&sort=`
  - `GET /api/organizations/:orgId/projects?q=&type=&status=&visibility=&page=&size=&sort=`
- 先接 `_mock`；後端落地時維持結構一致

## 狀態與快取
- 服務 + RxJS + `DelonCacheService`；跨頁複雜度上升再評估 NgRx/Signal Store

## i18n（最小鍵）
- `proj.title`、`proj.create`、`proj.edit`、`proj.delete`
- `proj.type.*`、`proj.status.*`、`proj.visibility.*`
- `proj.owner.user`、`proj.owner.organization`

## 目錄與檔案路徑（GitHub 風格統一設計）
- **統一專案模組**：`src/app/routes/projects/`（懶載入）
  - `src/app/routes/projects/projects.routes.ts`（路由配置）
  - `src/app/routes/projects/projects-list.page.ts`（統一列表組件）
  - `src/app/routes/projects/project-detail.page.ts`（統一詳情組件）
  - `src/app/routes/projects/create-project.modal.ts`（統一建立組件）
  - `src/app/routes/projects/edit-project.modal.ts`（統一編輯組件）
- **路由掛載點**：
  - `src/app/routes/org/org.routes.ts`（掛載到組織路由）
  - `src/app/routes/user/user.routes.ts`（掛載到用戶路由）
- **核心服務與守衛**
  - `src/app/core/project/project.service.ts`
  - `src/app/core/project/project-permission.service.ts`
- **共享模型與元件**
  - `src/app/shared/models/project/project.models.ts`
  - `src/app/shared/components/project/project-card.component.ts`
  - `src/app/shared/components/project/project-owner-badge.component.ts`
- **Mock（先行對接）**
  - `_mock/projects.ts`、`_mock/project-members.ts`、`_mock/project-stats.ts`

## 擴展結構樹（GitHub 風格統一設計）

- **原則**：採用 GitHub 風格的統一設計，使用相同的組件處理用戶和組織的專案

```text
src/
  app/
    core/
      project/
        project.service.ts                  # 專案 CRUD + 列表/詳情/成員/統計 + DelonCache
        project-permission.service.ts       # 專案權限檢查（admin/write/read）+ ACL 橋接
    routes/
      projects/                             # 統一專案模組（懶載入）
        projects.routes.ts                  # 路由配置
        projects-list.page.ts               # 統一列表組件（支持用戶/組織上下文）
        project-detail.page.ts              # 統一詳情組件（支持用戶/組織上下文）
        create-project.modal.ts             # 統一建立組件（支持用戶/組織上下文）
        edit-project.modal.ts               # 統一編輯組件（支持用戶/組織上下文）
      org/
        org.routes.ts                       # 掛載 projects 路由到組織
      user/
        user.routes.ts                      # 掛載 projects 路由到用戶
    shared/
      models/
        project/
          project.models.ts                 # Project/ProjectOwner/Settings/Stats 型別
      components/
        project/
          project-card.component.ts         # 卡片式專案項（列表/grid 可複用）
          project-owner-badge.component.ts  # 所有權標識組件
_mock/
  projects.ts                               # 專案列表/詳情/新增/更新/刪除
  project-members.ts                        # 專案成員增刪查
  project-stats.ts                          # 專案統計
```

- **統一路由掛載**
  - `/#/org/:orgSlug/projects` → 組織專案列表
  - `/#/org/:orgSlug/projects/:projectSlug` → 組織專案詳情
  - `/#/u/:userSlug/projects` → 用戶專案列表
  - `/#/u/:userSlug/projects/:projectSlug` → 用戶專案詳情

## 實施清單（M1 測試就緒 - GitHub 風格統一設計）
- [ ] **統一專案模組**：`src/app/routes/projects/` 懶載入模組
- [ ] **統一列表組件**：支持用戶/組織上下文的專案列表頁
- [ ] **統一詳情組件**：支持用戶/組織上下文的專案詳情頁
- [ ] **統一建立/編輯組件**：支持用戶/組織上下文的專案表單
- [ ] **路由掛載**：在組織和用戶路由中掛載統一專案模組
- [ ] **權限守衛**：基於上下文的權限檢查（`admin/write/read`）
- [ ] **所有權標識**：統一的專案所有權顯示組件
- [ ] **Mock 端點**：支持用戶/組織上下文的 API 模擬
- [ ] **快取策略**：統一的專案資料快取管理
- [ ] **i18n 支援**：多語言專案管理界面

## 風險與對策
- 權限複雜度：先角色→權限靜態映射，逐步引入 ABAC 條件
- 清單性能：虛擬滾動/分頁；後端分頁查詢；快取與索引
- 多語一致性：關鍵詞彙與 key 規範，PR 強制檢查

## 交叉文件
- 組織總規劃：`memory-bank/Organization/ORG-Expansion-Plan.md`
- 專案規格：`memory-bank/Organization/ORG-Project-Spec.md`
- 專案建構藍圖：`memory-bank/Project-Build/01-Core-Modules/01-Project-Management.md`