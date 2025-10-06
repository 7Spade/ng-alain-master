# 組織功能擴展方案（GitHub 風格）- 骨架

## 目標
- 在現有 ng-alain + @delon + ng-zorro-antd 的專案上，提供「像 GitHub」的多組織能力：多組織上下文、團隊、成員、角色/權限、設置；後續擴展審計、通知、專案、API 管理。
- 採用 Angular 20 最佳實踐：standalone、signals、原生控制流（@if/@for）、lazy routes、typed forms。
- 優先最小可行（MVP）：Organization/Team/Member/Permission 四核心域先落地，其他模組按里程碑分期。

## 資訊架構與路由（IA）- GitHub 風格統一設計
- **頂層路由**：`/org/:orgSlug`（懶載入）
  - `overview`：概覽與統計
  - `members`：成員列表/邀請/角色變更
  - `teams`：團隊列表與樹/團隊成員維護
  - `permissions`：角色管理、權限樹、分配/檢查
  - `settings`：基本資訊、安全、整合、通知、高級
  - **`projects`**：組織專案管理（使用統一專案模組）
  - 後續：`audit`、`notifications`、`apis`

## 前端技術與模式
- Standalone components、lazy routes、Reactive Forms、原生控制流（`@if/@for`）。
- 服務模式：`_HttpClient`（@delon）+ `DelonCacheService` 快取。
- 權限模式：`PermissionService.checkPermission` + `@delon/acl`（route data { permission } 守衛 + 視圖內按鈕級權限指令/元件）。
- UI：ng-zorro-antd（table/form/tabs/tree/modal/select/avatar/badge/tag）+ @delon/abc（ST/SE）。

## 資料模型（對齊 memory-bank 藍圖）
- `Organization / OrganizationMember / Team / TeamMember / Role / Permission` 為主；使用 `slug` 作為 org 路徑主鍵；Team 以 `parentTeamId` 構建層級。

## 服務層（MVP）
- `OrganizationService`：當前組織載入、基本資訊、統計
- `MemberService`：成員清單、邀請、角色/狀態變更
- `TeamService`：團隊清單、樹構建、團隊成員維護
- `PermissionService`：權限清單、角色管理、權限分配與檢查（配合 `ACLService`）
- 快取策略：列表/設置 5–15 分鐘；資料變更後主動清快取

## 權限與守衛
- 路由守衛：`canActivate` 讀 `route.data.permission` → `PermissionService.checkPermission`，失敗導向 `/exception/403`
- 視圖內控：`appPermission` 指令、`PermissionCheck` 元件；按鈕/區塊級顯示控制
- 角色映射：先用記憶庫預設映射，後續由後端配置提供

## UI 重點頁（MVP）
- 概覽：統計卡片（成員/團隊/項目）+ 近期活動（可先留空）
- 成員：`nz-table` 清單、角色 `nz-tag`、狀態 `nz-badge`、操作（編輯/移除）；邀請 `NzModal`
- 團隊：清單 + `nz-tree`（搜尋/展開/選取），右側顯示當前團隊成員與操作
- 權限：角色清單（ST）+ 權限樹（`nz-tree` 可勾選）+ 角色權限分配/保存
- 設置：分頁籤，先實作基本資訊（名稱/slug/描述/語言/時區等）

## API 約定（MVP 端點）
- `GET /api/organizations/:orgId`
- `GET /api/organizations/:orgId/members`、`POST /invitations`、`PATCH /members/:id`、`DELETE /members/:id`
- `GET /api/organizations/:orgId/teams`、`POST /teams`、`PATCH /teams/:id`、`DELETE /teams/:id`
- `GET /api/permissions`、`POST /api/permissions/check`、`GET/PUT /api/roles`、`PUT /api/roles/:id/permissions`
- 先接 `_mock`，後端接入時維持結構一致即可

## 狀態與快取
- 先用服務 + RxJS + DelonCache；跨頁複雜度上升時再引入 NgRx/Signal Store（延後決策）

## i18n
- 依 ng-alain 現有 i18n 機制，補充組織相關字串；提供 zh-CN / en-US

## 里程碑（與專案擴展方案協作）
- M1：`/org/:orgSlug` 骨架 + `overview` + `members`（列表/邀請/角色）+ 路由守衛
- M2：`teams`（清單/樹/成員維護）
- M3：`settings`（基本資訊最小子集）
- M4：`permissions`（角色管理、權限樹、分配）
- **M5：`projects`**（整合統一專案模組，支持組織專案管理）
- M6+：`audit / notifications / apis` 逐步開啟

## 風險與對策
- 權限邏輯複雜度：先以角色→權限靜態映射落地，逐步引入 ABAC 條件
- 大清單性能：必要時上虛擬滾動與分頁；後端支援分頁/篩選
- 多語系一致性：建立詞彙表與 key 規範，PR 強制檢查

## 目錄與檔案路徑（落地對照）

- src/app/routes/org/（懶載入功能區）
  - src/app/routes/org/org.routes.ts
  - src/app/routes/org/organization-shell.component.ts
  - src/app/routes/org/overview/overview.page.ts
  - src/app/routes/org/members/members.page.ts
  - src/app/routes/org/members/invite-modal.component.ts
  - src/app/routes/org/members/edit-member-modal.component.ts
  - src/app/routes/org/teams/teams.page.ts
  - src/app/routes/org/teams/team-hierarchy.component.ts
  - src/app/routes/org/teams/add-edit-team-modal.component.ts
  - src/app/routes/org/permissions/permissions.page.ts
  - src/app/routes/org/permissions/role-permission-modal.component.ts
  - src/app/routes/org/settings/settings.page.ts
  - src/app/routes/org/settings/basic-info-form.component.ts

- src/app/core/organization/（核心服務與守衛）
  - src/app/core/organization/organization.service.ts
  - src/app/core/organization/member.service.ts
  - src/app/core/organization/team.service.ts
  - src/app/core/organization/permission.service.ts
  - src/app/core/organization/organization-permission.guard.ts

- src/app/shared/models/organization/
  - src/app/shared/models/organization/organization.models.ts

- src/app/shared/components/organization/
  - src/app/shared/components/organization/organization-selector.component.ts
  - src/app/shared/components/organization/org-stat-cards.component.ts

- _mock/（先行對接測試）
  - _mock/organizations.ts
  - _mock/organization-members.ts
  - _mock/organization-teams.ts
  - _mock/permissions.ts
  - _mock/roles.ts

## 實施清單（核對 - 與專案擴展方案協作）
- [ ] `/org/:orgSlug` 懶載入與子路由
- [ ] 成員頁（列表/邀請/角色）
- [ ] 團隊頁（清單/樹/成員維護）
- [ ] 權限頁（角色/權限樹/分配）
- [ ] 設置頁（基本資訊）
- [ ] **專案頁**（整合統一專案模組）
- [ ] 路由守衛 + 視圖內權限指令
- [ ] `_mock` 端點對齊與快取策略
- [ ] **與專案擴展方案的整合測試**

## 交叉文件
- 組織總規劃：`memory-bank/Organization/ORG-Expansion-Plan.md`
- 專案規格：`memory-bank/Organization/ORG-Project-Spec.md`
- 專案建構藍圖：`memory-bank/Project-Build/01-Core-Modules/01-Project-Management.md`