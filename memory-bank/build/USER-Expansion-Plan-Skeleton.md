# 用戶功能擴展方案（GitHub 風格）- 骨架

## 目標
- 在現有 ng-alain + @delon + ng-zorro-antd 的專案上，提供「像 GitHub」的完整用戶能力：個人資料、專案管理、組織參與、設定偏好、活動記錄、通知中心。
- 採用 Angular 20 最佳實踐：standalone、signals、原生控制流（@if/@for）、lazy routes、typed forms。
- 優先最小可行（MVP）：Profile/Projects/Organizations/Settings 四核心域先落地，其他模組按里程碑分期。
- 與組織擴展方案形成互補，確保用戶和組織都能完整管理各自的資源。

## 資訊架構與路由（IA）- GitHub 風格統一設計
- **頂層路由**：`/u/:userSlug`（懶載入）
  - `profile`：個人資料編輯、頭像上傳、基本資訊
  - **`projects`**：個人專案列表/建立/管理（使用統一專案模組）
  - `organizations`：加入的組織列表、邀請處理、角色查看
  - `settings`：偏好設定、安全設定、通知設定、帳戶管理
  - `activity`：個人活動記錄、操作歷史
  - 後續：`notifications`、`billing`、`integrations`

## 前端技術與模式
- Standalone components、lazy routes、Reactive Forms、原生控制流（`@if/@for`）。
- 服務模式：`_HttpClient`（@delon）+ `DelonCacheService` 快取。
- 權限模式：`UserPermissionService.checkPermission` + `@delon/acl`（route data { permission } 守衛 + 視圖內按鈕級權限指令/元件）。
- UI：ng-zorro-antd（form/tabs/modal/select/avatar/upload/badge）+ @delon/abc（ST/SE）。
- 認證整合：Keycloak Angular 或 @delon/auth 進行身份驗證。

## 資料模型（對齊 memory-bank 藍圖）
```typescript
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  timezone: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  security: SecuritySettings;
  appearance: AppearanceSettings;
}

export interface UserStats {
  projectCount: number;
  organizationCount: number;
  activityCount: number;
  lastActivityAt: string;
}
```

## 服務層（MVP）
- `UserService`：用戶資料載入、更新、統計
- `UserProfileService`：個人資料管理、頭像上傳
- `UserOrganizationService`：用戶組織關係管理
- `UserPermissionService`：用戶權限檢查（配合 `ACLService`）
- 快取策略：用戶資料 10-30 分鐘；設定變更後主動清快取

## 權限與守衛
- 路由守衛：`canActivate` 讀 `route.data.permission` → `UserPermissionService.checkPermission`，失敗導向 `/exception/403`
- 視圖內控：`appPermission` 指令、`UserPermissionCheck` 元件；按鈕/區塊級顯示控制
- 用戶身份驗證：確保只能訪問自己的資料（除非有管理權限）

## UI 重點頁（MVP）
- 個人資料：`nz-form` 編輯表單、`nz-upload` 頭像上傳、`nz-tag` 顯示標籤
- 個人專案：`nz-table` 清單、篩選/分頁、`nz-modal` 建立專案（共用專案組件）
- 組織管理：`nz-list` 組織清單、`nz-badge` 角色標示、`nz-modal` 加入組織
- 設定頁面：`nz-tabs` 分頁籤，包含偏好、安全、通知、帳戶設定

## API 約定（MVP 端點）
- `GET /api/users/:userId`、`PATCH /api/users/:userId`
- `GET /api/users/:userId/profile`、`PUT /api/users/:userId/profile`
- `POST /api/users/:userId/avatar`、`DELETE /api/users/:userId/avatar`
- `GET /api/users/:userId/organizations`、`POST /api/users/:userId/organizations/:orgId/join`
- `GET /api/users/:userId/settings`、`PUT /api/users/:userId/settings`
- 先接 `_mock`，後端接入時維持結構一致即可

## 狀態與快取
- 先用服務 + RxJS + DelonCache；跨頁複雜度上升時再引入 NgRx/Signal Store（延後決策）

## i18n
- 依 ng-alain 現有 i18n 機制，補充用戶相關字串；提供 zh-CN / en-US

## 里程碑（與專案擴展方案協作）
- M1：`/u/:userSlug` 骨架 + `profile` + **`projects`**（整合統一專案模組）+ 路由守衛
- M2：`organizations`（列表/加入/角色查看）
- M3：`settings`（偏好/安全/通知設定）
- M4：`activity`（活動記錄/操作歷史）
- M5+：`notifications`、`billing`、`integrations` 逐步開啟

## 風險與對策
- 用戶資料隱私：嚴格權限控制，確保用戶只能訪問自己的資料
- 頭像上傳性能：圖片壓縮、CDN 整合、快取策略
- 多語系一致性：建立詞彙表與 key 規範，PR 強制檢查

## 目錄與檔案路徑（落地對照）

- src/app/routes/user/（懶載入功能區）
  - src/app/routes/user/user.routes.ts
  - src/app/routes/user/user-shell.component.ts
  - src/app/routes/user/profile/profile.page.ts
  - src/app/routes/user/profile/edit-profile.modal.ts
  - src/app/routes/user/profile/avatar-upload.component.ts
  - src/app/routes/user/projects/projects.page.ts（使用統一專案組件）
  - src/app/routes/user/organizations/organizations.page.ts
  - src/app/routes/user/organizations/join-organization.modal.ts
  - src/app/routes/user/settings/settings.page.ts
  - src/app/routes/user/settings/preferences.form.ts
  - src/app/routes/user/settings/security.form.ts
  - src/app/routes/user/activity/activity.page.ts
  - src/app/routes/user/notifications/notifications.page.ts

- src/app/core/user/（核心服務與守衛）
  - src/app/core/user/user.service.ts
  - src/app/core/user/user-profile.service.ts
  - src/app/core/user/user-organization.service.ts
  - src/app/core/user/user-permission.service.ts
  - src/app/core/user/user-auth.guard.ts

- src/app/shared/models/user/
  - src/app/shared/models/user/user.models.ts

- src/app/shared/components/user/
  - src/app/shared/components/user/user-avatar.component.ts
  - src/app/shared/components/user/user-stats-cards.component.ts
  - src/app/shared/components/user/user-profile-form.component.ts

- _mock/（先行對接測試）
  - _mock/users.ts
  - _mock/user-profiles.ts
  - _mock/user-organizations.ts
  - _mock/user-settings.ts
  - _mock/user-activities.ts

## 與其他擴展方案的整合

### 與組織擴展方案的關係
- 用戶可以加入多個組織，在組織中擔任不同角色
- 用戶的組織列表在 `/u/:userSlug/organizations` 中管理
- 組織的成員列表在 `/org/:orgSlug/members` 中管理

### 與專案擴展方案的關係（GitHub 風格統一設計）
- **統一專案模組**：用戶和組織都使用相同的專案組件
- **個人專案路由**：`/u/:userSlug/projects`（使用統一專案模組）
- **組織專案路由**：`/org/:orgSlug/projects`（使用統一專案模組）
- **上下文感知**：通過路由 `data` 屬性區分用戶/組織上下文
- **所有權統一**：專案使用統一的 `ProjectOwner` 模型

## 實施清單（核對 - 與專案擴展方案協作）
- [ ] `/u/:userSlug` 懶載入與子路由
- [ ] 個人資料頁（編輯/頭像上傳）
- [ ] **個人專案頁**（整合統一專案模組）
- [ ] 組織管理頁（列表/加入/角色）
- [ ] 設定頁（偏好/安全/通知）
- [ ] 活動記錄頁（操作歷史）
- [ ] 路由守衛 + 視圖內權限指令
- [ ] `_mock` 端點對齊與快取策略
- [ ] **與專案擴展方案的整合測試**

## 交叉文件
- 組織總規劃：`memory-bank/Organization/ORG-Expansion-Plan.md`
- 專案擴展方案：`memory-bank/Project-Build/PROJECT-Expansion-Plan.md`
- 用戶管理藍圖：`memory-bank/User/01-Core-Modules/01-User-Management.md`