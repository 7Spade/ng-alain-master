# 架構重構方案：清晰的 Account vs User vs Organization

> 生成日期: 2025-10-07  
> 分析方法: Sequential Thinking (14 steps) + Context7 官方文檔  
> 目標: 解決 ng-alain Account 與 GitHub User 的概念混淆

## 🎯 問題陳述

### 當前混淆點

1. **ng-alain 原有結構**：
   ```
   /pro/account/center     → 我的中心（文章、應用、項目）
   /pro/account/settings   → 我的設定（基本、安全、綁定、通知）
   /pro/profile/*          → 檔案展示頁面（示範）
   ```
   **視角**：私有帳戶管理（"我的"）

2. **GitHub 風格需求**：
   ```
   /u/:username           → 用戶公開檔案（任何用戶）
   /u/:username/projects  → 用戶的項目列表
   /org/:orgname          → 組織公開頁面
   /org/:orgname/projects → 組織的項目列表
   ```
   **視角**：公開檔案展示（"某人的"）

3. **當前實施問題**：
   ```
   /pro/organization/:id  → 組織管理（位置不對）
   ```
   **問題**：應該是 `/org/:orgname` 而不是 `/pro/organization/:id`

### 核心疑問

> **是否需要"用戶"？還是直接從專案延伸出組織就好了？**

## 🤔 Sequential Thinking 分析過程

### 思考步驟摘要

1. **問題識別**：ng-alain Account（私有）vs GitHub User（公開）概念不同
2. **GitHub 模型分析**：User + Organization 平等所有權模型
3. **視角區分**：私有管理 vs 公開展示
4. **情境分析**：保留 vs 不保留 User 的優缺點
5. **方案設計**：路由分離策略
6. **可行性驗證**：Angular + ng-alain 技術能力確認
7. **UX 流程**：用戶操作流程模擬
8. **當前實施問題**：路由位置不符合規劃
9. **重構方案**：目標目錄結構設計
10. **命名規範**：避免混淆的命名策略
11. **重構步驟**：具體執行步驟
12. **可行性驗證**：技術、UX、Memory Bank 對齊檢查
13. **遺漏檢查**：導航、數據、權限、麵包屑
14. **最終決策**：保留 User，清晰分離

## ✅ 最終建議：保留 User 概念

### 為什麼需要 User？

| 考慮因素 | 只有 Organization | User + Organization |
|---------|------------------|---------------------|
| **個人項目支持** | ❌ 所有項目必須屬於組織 | ✅ 支持個人項目 |
| **架構對稱性** | ⚠️ 單一所有權模型 | ✅ 對稱所有權模型 |
| **Memory Bank 對齊** | ❌ User 域規劃無法使用 | ✅ 完全對齊規劃 |
| **真實場景** | ⚠️ 純企業場景 | ✅ 個人+企業場景 |
| **GitHub 風格** | ❌ 不完整 | ✅ 完整實現 |
| **靈活性** | ⚠️ 受限 | ✅ 高度靈活 |
| **實施複雜度** | ✅ 較簡單 | ⚠️ 需清晰設計 |

**結論**：✅ **保留 User，透過清晰的架構設計避免混淆**

## 🏗️ 推薦架構方案

### 方案概覽

```
┌─────────────────────────────────────────────────────────────┐
│                    ng-alain 應用架構                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  1️⃣ 私有視角（Account Management - 保留 ng-alain 原有）       │
│     ┌───────────────────────────────────────┐               │
│     │ /account/center    → 我的中心          │               │
│     │ /account/settings  → 我的設定          │               │
│     │ (當前登入用戶的私有管理介面)            │               │
│     └───────────────────────────────────────┘               │
│                                                               │
│  2️⃣ 公開視角（Public Profiles - 新增 GitHub 風格）           │
│     ┌───────────────────────────────────────┐               │
│     │ /u/:username         → 用戶公開檔案    │               │
│     │ /u/:username/projects → 用戶的項目     │               │
│     │ (任何用戶的公開展示頁面)                │               │
│     └───────────────────────────────────────┘               │
│                                                               │
│  3️⃣ 組織視角（Organization - 重構現有）                       │
│     ┌───────────────────────────────────────┐               │
│     │ /org/:orgname          → 組織公開頁面  │               │
│     │ /org/:orgname/members  → 成員管理      │               │
│     │ /org/:orgname/teams    → 團隊管理      │               │
│     │ /org/:orgname/projects → 組織的項目    │               │
│     │ /org/:orgname/settings → 組織設定      │               │
│     └───────────────────────────────────────┘               │
│                                                               │
│  4️⃣ 統一專案模組（Projects - 新建共用）                       │
│     ┌───────────────────────────────────────┐               │
│     │ 可重用組件供 User 和 Organization 使用  │               │
│     │ - ProjectListComponent                │               │
│     │ - ProjectDetailComponent              │               │
│     │ - ProjectFormComponent                │               │
│     └───────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────┘
```

### 目錄結構設計

```
src/app/routes/
├── account/（保留 ng-alain 原有 - 從 pro/account 移出）
│   ├── center/
│   │   ├── center.component.ts          # 我的中心
│   │   ├── articles/                    # 我的文章
│   │   ├── applications/                # 我的應用
│   │   └── projects/                    # 我的項目（使用統一組件）
│   └── settings/
│       ├── settings.component.ts        # 我的設定
│       ├── base/                        # 基本設定
│       ├── security/                    # 安全設定
│       ├── binding/                     # 帳號綁定
│       └── notification/                # 通知設定
│
├── user/（新建 - GitHub 風格公開檔案）
│   ├── user.routes.ts                   # 路由配置
│   ├── profile/
│   │   └── user-profile.page.ts         # /u/:username（公開檔案）
│   ├── projects/
│   │   └── user-projects.page.ts        # /u/:username/projects（用戶項目列表）
│   ├── organizations/
│   │   └── user-orgs.page.ts            # /u/:username/organizations（用戶加入的組織）
│   └── settings/
│       └── user-settings.page.ts        # /u/:username/settings（僅本人可見）
│
├── org/（重構現有 pro/organization）
│   ├── org.routes.ts                    # 路由配置
│   ├── profile/
│   │   └── org-profile.page.ts          # /org/:orgname（組織公開頁面）
│   ├── members/
│   │   └── org-members.page.ts          # /org/:orgname/members
│   ├── teams/
│   │   └── org-teams.page.ts            # /org/:orgname/teams
│   ├── projects/
│   │   └── org-projects.page.ts         # /org/:orgname/projects
│   ├── settings/
│   │   └── org-settings.page.ts         # /org/:orgname/settings
│   ├── models/
│   │   └── organization.models.ts       # 數據模型
│   ├── services/
│   │   └── organization.service.ts      # 業務邏輯
│   └── guards/
│       └── org-permission.guard.ts      # 權限守衛
│
└── projects/（新建 - 統一專案模組）
    ├── projects.routes.ts               # 路由配置
    ├── components/
    │   ├── project-list.component.ts    # 統一列表組件
    │   ├── project-card.component.ts    # 項目卡片
    │   ├── project-detail.component.ts  # 統一詳情組件
    │   └── project-form.component.ts    # 統一表單組件
    ├── models/
    │   └── project.models.ts            # 專案模型（含 ProjectOwner）
    ├── services/
    │   └── project.service.ts           # 專案服務
    └── guards/
        └── project-permission.guard.ts  # 專案權限
```

### 路由配置對照表

| 功能 | 路由 | 組件位置 | 視角 | 權限 |
|------|------|---------|------|------|
| **帳戶管理** | | | **私有** | |
| 我的中心 | `/account/center` | `routes/account/center/` | 私有 | 當前用戶 |
| 我的設定 | `/account/settings` | `routes/account/settings/` | 私有 | 當前用戶 |
| **用戶公開檔案** | | | **公開** | |
| 用戶檔案 | `/u/:username` | `routes/user/profile/` | 公開 | 公開/登入 |
| 用戶項目 | `/u/:username/projects` | `routes/user/projects/` | 公開 | 公開/登入 |
| 用戶組織 | `/u/:username/organizations` | `routes/user/organizations/` | 公開 | 公開/登入 |
| 用戶設定 | `/u/:username/settings` | `routes/user/settings/` | 私有 | 僅本人 |
| **組織** | | | **公開或受限** | |
| 組織檔案 | `/org/:orgname` | `routes/org/profile/` | 公開/受限 | 根據設定 |
| 組織成員 | `/org/:orgname/members` | `routes/org/members/` | 受限 | 成員 |
| 組織團隊 | `/org/:orgname/teams` | `routes/org/teams/` | 受限 | 成員 |
| 組織項目 | `/org/:orgname/projects` | `routes/org/projects/` | 公開/受限 | 根據設定 |
| 組織設定 | `/org/:orgname/settings` | `routes/org/settings/` | 私有 | 管理員/擁有者 |

### 清晰的概念區分

```
┌─────────────────────────────────────────────────────────────┐
│  Account（帳戶）         vs        User Profile（用戶檔案）    │
├─────────────────────────────────────────────────────────────┤
│  /account/*                          /u/:username            │
│                                                               │
│  視角：「我的」                      視角：「某人的」          │
│  權限：僅當前登入用戶                權限：公開或登入用戶      │
│  功能：管理和設定                    功能：展示和瀏覽          │
│  資料：私有資料（email, 通知）       資料：公開資料（bio, repos）│
│                                                               │
│  範例：                              範例：                    │
│  - 修改我的密碼                      - 查看 Alice 的檔案      │
│  - 設定我的通知偏好                  - 瀏覽 Bob 的項目        │
│  - 管理我的 API tokens               - 查看 Carol 的組織      │
│  - 綁定我的社交帳號                  - Follow/Unfollow 用戶   │
└─────────────────────────────────────────────────────────────┘
```

## 📋 具體重構計劃

### Phase 1: 保留 ng-alain 原有（調整路由）

**目標**：保留帳戶管理功能，調整路由為頂層

**操作**：
```bash
# 將 pro/account 移到頂層 account
src/app/routes/pro/account/ → src/app/routes/account/

# 路由變更
FROM: /pro/account/center
TO:   /account/center

FROM: /pro/account/settings  
TO:   /account/settings
```

**理由**：
- `/account/*` 更語義化（帳戶管理）
- 與 GitHub 的 `/settings` 概念對齊
- 避免 `/pro/` 前綴（pro 是示範區域）

**影響**：
- 需更新主路由配置
- 需更新導航連結
- 需更新頂部 user widget

### Phase 2: 重構 Organization 到正確位置

**目標**：符合 GitHub 風格和 Memory Bank 規劃

**操作**：
```bash
# 從 pro/organization 移到頂層 org
src/app/routes/pro/organization/ → src/app/routes/org/

# 路由變更
FROM: /pro/organization/:id
TO:   /org/:orgname

# URL 參數變更
FROM: id（數字 ID）
TO:   orgname（slug，如 'tech-company'）
```

**目錄重組**：
```
src/app/routes/org/
├── org.routes.ts                    # 路由配置
├── components/
│   ├── org-profile/
│   │   └── org-profile.page.ts      # /org/:orgname
│   ├── org-members/
│   │   └── org-members.page.ts      # /org/:orgname/members
│   ├── org-teams/
│   │   └── org-teams.page.ts        # /org/:orgname/teams
│   ├── org-projects/
│   │   └── org-projects.page.ts     # /org/:orgname/projects
│   ├── org-settings/
│   │   └── org-settings.page.ts     # /org/:orgname/settings
│   └── org-list/
│       └── org-list.page.ts         # /organizations（組織列表）
├── models/
│   └── organization.models.ts       # 保留現有模型
├── services/
│   └── organization.service.ts      # 保留現有服務，調整 API
└── guards/
    └── org-permission.guard.ts      # 保留現有守衛
```

**API 端點調整**：
```typescript
// 從
GET /api/organizations/:id          // 數字 ID
// 改為
GET /api/organizations/:orgname     // Slug（URL 友好）
或
GET /api/org/:orgname               // 更簡潔

// 支持兩種查詢
GET /api/organizations?id=123       // 內部用 ID
GET /api/organizations/:slug        // 公開用 slug
```

### Phase 3: 創建 User 公開檔案模組

**目標**：實現 GitHub 風格的用戶公開檔案

**新建結構**：
```
src/app/routes/user/
├── user.routes.ts                   # 路由配置
├── components/
│   ├── user-profile/
│   │   └── user-profile.page.ts     # /u/:username（公開檔案）
│   ├── user-projects/
│   │   └── user-projects.page.ts    # /u/:username/projects
│   ├── user-organizations/
│   │   └── user-orgs.page.ts        # /u/:username/organizations
│   ├── user-settings/
│   │   └── user-settings.page.ts    # /u/:username/settings（僅本人）
│   └── user-list/
│       └── user-list.page.ts        # /users（用戶列表）
├── models/
│   └── user-profile.models.ts       # 公開檔案模型
├── services/
│   └── user-profile.service.ts      # 公開檔案服務
└── guards/
    └── user-permission.guard.ts     # 僅本人可訪問守衛
```

**路由配置**：
```typescript
// user.routes.ts
export const routes: Routes = [
  {
    path: 'u/:username',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/user-profile/user-profile.page').then(m => m.UserProfilePage),
        data: { title: '用戶檔案', titleI18n: 'user.profile' }
      },
      {
        path: 'projects',
        loadComponent: () => import('./components/user-projects/user-projects.page').then(m => m.UserProjectsPage),
        data: { title: '用戶項目', titleI18n: 'user.projects' }
      },
      {
        path: 'organizations',
        loadComponent: () => import('./components/user-organizations/user-orgs.page').then(m => m.UserOrganizationsPage),
        data: { title: '用戶組織', titleI18n: 'user.organizations' }
      },
      {
        path: 'settings',
        loadComponent: () => import('./components/user-settings/user-settings.page').then(m => m.UserSettingsPage),
        canActivate: [userOwnerGuard], // 僅本人可訪問
        data: { title: '用戶設定', titleI18n: 'user.settings' }
      }
    ]
  },
  {
    path: 'users',
    loadComponent: () => import('./components/user-list/user-list.page').then(m => m.UserListPage),
    data: { title: '用戶列表', titleI18n: 'users.list' }
  }
];
```

### Phase 4: 創建統一 Projects 模組

**目標**：可重用的專案組件供 User 和 Organization 使用

**新建結構**：
```
src/app/routes/projects/
├── projects.routes.ts               # 路由配置（被 user/org 引用）
├── components/
│   ├── project-list/
│   │   └── project-list.component.ts    # 統一列表組件
│   ├── project-card/
│   │   └── project-card.component.ts    # 項目卡片
│   ├── project-detail/
│   │   └── project-detail.component.ts  # 統一詳情組件
│   ├── project-form/
│   │   └── project-form.component.ts    # 統一表單組件
│   └── project-owner-badge/
│       └── owner-badge.component.ts     # 所有權標識
├── models/
│   └── project.models.ts            # 專案模型
├── services/
│   └── project.service.ts           # 專案服務
└── guards/
    └── project-permission.guard.ts  # 專案權限
```

**專案模型（關鍵）**：
```typescript
// project.models.ts
export interface ProjectOwner {
  ownerType: 'user' | 'organization';
  ownerId: string;
  ownerSlug: string;  // username 或 orgname
  ownerName: string;
  avatarUrl?: string;
  htmlUrl: string;    // /u/:username 或 /org/:orgname
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  fullName: string;   // "owner/project" 格式（如 "alice/my-app"）
  description?: string;
  type: ProjectType;
  status: ProjectStatus;
  owner: ProjectOwner; // 統一的所有權模型 ✅
  settings: ProjectSettings;
  stats?: ProjectStats;
  createdAt: string;
  updatedAt: string;
}
```

## 🔧 命名規範指南

### 避免混淆的命名策略

```typescript
// ✅ 清晰的命名
// Account 相關（私有管理）
AccountService              // 當前用戶帳戶操作
AccountCenterComponent      // 我的中心頁面
AccountSettingsComponent    // 我的設定頁面

// User Profile 相關（公開展示）
UserProfileService          // 用戶公開檔案查詢
UserProfilePageComponent    // 用戶公開檔案頁面
UserProjectsPageComponent   // 用戶項目列表頁

// Organization 相關
OrganizationService         // 組織操作
OrgProfilePageComponent     // 組織公開頁面
OrgMembersPageComponent     // 組織成員管理

// Current User 輔助
CurrentUserService          // 獲取當前登入用戶資訊

// ❌ 避免的命名（會混淆）
UserService                 // 太籠統，不知道是 account 還是 profile
ProfileComponent            // 不知道是 user profile 還是 org profile
SettingsComponent           // 不知道是 account 還是 user 還是 org
```

### API 端點命名

```typescript
// Account API（私有）
GET  /api/account/current         // 當前用戶完整資料
PUT  /api/account/profile         // 更新我的檔案
PUT  /api/account/settings        // 更新我的設定
POST /api/account/avatar          // 上傳我的頭像

// User Profile API（公開）
GET  /api/users/:username         // 獲取用戶公開檔案
GET  /api/users/:username/projects // 用戶的項目列表
GET  /api/users/:username/orgs    // 用戶加入的組織
POST /api/users/:username/follow  // Follow 用戶

// Organization API（公開或受限）
GET  /api/org/:orgname            // 組織資料
GET  /api/org/:orgname/members    // 組織成員（需權限）
GET  /api/org/:orgname/projects   // 組織項目
PUT  /api/org/:orgname/settings   // 組織設定（需權限）

// Unified Project API
GET  /api/projects?owner=user:alice       // Alice 的項目
GET  /api/projects?owner=org:techcorp     // TechCorp 的項目
GET  /api/projects/:owner/:projectSlug    // 特定項目
```

## 🚀 重構執行步驟

### Step 1: 準備工作（備份與規劃）

```bash
# 1. 創建功能分支
git checkout -b refactor/github-style-architecture

# 2. 備份當前實施
cp -r src/app/routes/pro/organization src/app/routes/pro/organization.backup

# 3. 更新 Memory Bank
# 創建重構計劃文檔（本文件）
```

### Step 2: 調整 Account 路由（低風險）

```bash
# 1. 在主路由配置中添加 account
# src/app/routes/routes.ts
{
  path: 'account',
  component: LayoutBasicComponent,
  canActivate: [authSimpleCanActivate],
  children: [
    {
      path: 'center',
      loadComponent: () => import('./account/center/center.component').then(m => m.ProAccountCenterComponent)
    },
    {
      path: 'settings',
      loadComponent: () => import('./account/settings/settings.component').then(m => m.ProAccountSettingsComponent)
    }
  ]
}

# 2. 更新導航連結
# src/app/layout/basic/widgets/user.component.ts
# 將 /pro/account/* 改為 /account/*
```

**測試點**：
- [ ] /account/center 可訪問
- [ ] /account/settings 可訪問
- [ ] 頂部用戶下拉選單連結正確
- [ ] 當前用戶資料正常顯示

### Step 3: 重構 Organization 到 /org

```bash
# 1. 移動目錄
mv src/app/routes/pro/organization src/app/routes/org

# 2. 更新路由配置
# src/app/routes/routes.ts
{
  path: 'org/:orgname',  # 改用 slug 而不是 id
  loadChildren: () => import('./org/org.routes').then(m => m.routes)
}

# 3. 更新 org.routes.ts
# 所有子路由不需要 :id 前綴

# 4. 更新服務
# organization.service.ts
# 所有 API 從 /api/organizations/:id 改為 /api/org/:orgname

# 5. 更新 Mock 數據
# _mock/_organization.ts
# 支持 slug 查詢
```

**測試點**：
- [ ] /org/:orgname 可訪問
- [ ] /org/:orgname/members 權限守衛正常
- [ ] /org/:orgname/settings Owner 守衛正常
- [ ] 組織切換器導航正確
- [ ] Mock API 正常響應

### Step 4: 創建 User 公開檔案模組

```bash
# 1. 創建目錄結構
mkdir -p src/app/routes/user/{components,models,services,guards}

# 2. 創建路由配置
# src/app/routes/user/user.routes.ts

# 3. 實施組件
# - user-profile.page.ts（公開檔案）
# - user-projects.page.ts（項目列表）
# - user-organizations.page.ts（組織列表）

# 4. 實施服務
# src/app/routes/user/services/user-profile.service.ts

# 5. 實施守衛
# src/app/routes/user/guards/user-owner.guard.ts
# 用於 /u/:username/settings（僅本人可訪問）

# 6. 添加到主路由
# src/app/routes/routes.ts
{
  path: 'u/:username',
  loadChildren: () => import('./user/user.routes').then(m => m.routes)
}
```

**測試點**：
- [ ] /u/:username 顯示用戶公開檔案
- [ ] /u/:username/projects 顯示項目列表
- [ ] /u/:username/settings 僅本人可訪問
- [ ] Follow/Unfollow 功能正常

### Step 5: 創建統一 Projects 模組

```bash
# 1. 創建共享專案模組
mkdir -p src/app/routes/projects/{components,models,services,guards}

# 2. 實施統一組件
# - project-list.component.ts（接受 owner 參數）
# - project-detail.component.ts（接受 owner 參數）
# - project-form.component.ts（接受 owner 參數）

# 3. 實施 ProjectOwner 模型
# src/app/routes/projects/models/project.models.ts

# 4. 在 user 和 org 路由中引用
# user/components/user-projects.page.ts 使用 ProjectListComponent
# org/components/org-projects.page.ts 使用 ProjectListComponent
```

**測試點**：
- [ ] User projects 使用統一組件
- [ ] Org projects 使用統一組件
- [ ] Owner 標識正確顯示
- [ ] 權限控制正常工作

### Step 6: 更新 Mock 數據

```bash
# 1. 重組 Mock 文件
_mock/
├── _account.ts          # 帳戶管理 API
├── _user-profile.ts     # 用戶公開檔案 API
├── _organization.ts     # 組織 API（更新為 slug）
└── _project.ts          # 統一專案 API

# 2. 實施統一的 Project Mock
# 支持 owner 參數篩選
# 支持 user 和 organization 兩種 owner
```

### Step 7: 更新布局組件

```bash
# 1. 組織切換器
# src/app/layout/basic/widgets/organization-switcher.component.ts
# 更新導航路徑：
# - 個人檔案：/u/:username
# - 組織頁面：/org/:orgname
# - 我的帳戶：/account/center

# 2. 用戶下拉選單
# src/app/layout/basic/widgets/user.component.ts
# 添加「查看我的公開檔案」連結 → /u/:username
```

## 📊 重構前後對照

### Before（當前混淆狀態）

```
/pro/account/center              # ng-alain 帳戶中心
/pro/account/settings            # ng-alain 帳戶設定
/pro/organization/:id            # 組織管理（位置不對）
/pro/organization/user/:id       # 用戶檔案（放錯位置）
```

❌ 問題：
- organization 路徑不符合 GitHub 風格
- user 混在 organization 下
- 概念混淆

### After（清晰分離）

```
私有管理（Account Management）：
/account/center                  # 我的中心
/account/settings                # 我的設定

公開檔案（Public Profiles）：
/u/:username                     # 用戶公開檔案
/u/:username/projects            # 用戶項目
/u/:username/organizations       # 用戶組織

組織（Organizations）：
/org/:orgname                    # 組織頁面
/org/:orgname/members            # 組織成員
/org/:orgname/teams              # 組織團隊
/org/:orgname/projects           # 組織項目
/org/:orgname/settings           # 組織設定

列表頁面（Discovery）：
/users                           # 用戶列表
/organizations                   # 組織列表
```

✅ 優點：
- 清晰的視角分離
- 符合 GitHub 風格
- 語義化路由
- 不會混淆

## 🎯 用戶體驗流程

### 情境 1：Alice 管理自己的帳戶

```
1. Alice 登入後點擊頂部頭像下拉選單
   └→ 「我的中心」：/account/center
   └→ 「帳戶設定」：/account/settings
   └→ 「查看我的公開檔案」：/u/alice

2. 在「我的中心」Alice 可以：
   - 查看我的文章、應用、項目（私有視角）
   - 編輯和管理我的內容
   - 查看私有統計數據

3. 在「帳戶設定」Alice 可以：
   - 修改密碼、email（私有資料）
   - 設定通知偏好
   - 綁定社交帳號
   - 管理 API tokens
```

### 情境 2：Alice 查看 Bob 的公開檔案

```
1. Alice 在用戶列表中點擊 Bob
   └→ 導航到：/u/bob

2. 在 Bob 的公開檔案頁面，Alice 可以：
   - 查看 Bob 的 bio、location、website（公開資料）
   - 查看 Bob 的統計（公開項目數、組織數）
   - Follow Bob
   - 查看 Bob 的項目列表：/u/bob/projects

3. Alice 點擊「Bob 的項目」
   └→ 導航到：/u/bob/projects
   └→ 顯示 Bob 的所有公開項目
   └→ 可以點擊查看項目詳情
```

### 情境 3：Alice 管理組織 TechCorp

```
1. Alice 在組織切換器中選擇 TechCorp
   └→ 導航到：/org/techcorp

2. 在組織頁面，Alice（作為管理員）可以：
   - 查看組織概覽
   - 點擊「成員」：/org/techcorp/members
   - 點擊「團隊」：/org/techcorp/teams
   - 點擊「項目」：/org/techcorp/projects
   - 點擊「設定」：/org/techcorp/settings（需要 Owner 權限）

3. 組織項目列表使用統一的 ProjectListComponent
   - 自動顯示 owner 為 organization
   - owner 標識顯示組織 logo
```

## 📝 數據模型對齊

### Account（帳戶）

```typescript
// 當前登入用戶的完整資料（私有）
interface Account {
  id: string;
  username: string;
  email: string;           // 私有
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  
  // 私有設定
  settings: {
    notifications: NotificationSettings;
    security: SecuritySettings;
    privacy: PrivacySettings;
    bindings: SocialBindings;
  };
  
  // 私有統計
  stats: {
    privateProjects: number;
    privateOrganizations: number;
    apiTokens: number;
  };
}
```

### UserProfile（用戶公開檔案）

```typescript
// 任何用戶的公開資料
interface UserProfile {
  id: string;
  username: string;
  name: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  
  // 公開統計
  stats: {
    publicProjects: number;
    organizations: number;
    followers: number;
    following: number;
  };
  
  // 公開設定
  isPublic: boolean;
  allowFollow: boolean;
  
  createdAt: string;
  updatedAt: string;
}
```

### Organization（組織）

```typescript
// 組織資料（已實施，需調整）
interface Organization {
  id: string;
  name: string;           // URL slug（唯一）
  displayName: string;    // 顯示名稱
  description?: string;
  avatarUrl?: string;
  website?: string;
  location?: string;
  email?: string;         // 公開聯繫 email
  
  // 組織設定
  settings: OrganizationSettings;
  
  // 統計
  stats: {
    membersCount: number;
    teamsCount: number;
    projectsCount: number;
  };
  
  // 可見性
  visibility: 'public' | 'private';
  
  createdAt: string;
  updatedAt: string;
}
```

## 🔄 重構 Checklist

### Phase 1: Account 調整
- [ ] 更新主路由添加 `/account/*`
- [ ] 更新頂部用戶下拉選單連結
- [ ] 測試 account center 功能
- [ ] 測試 account settings 功能

### Phase 2: Organization 重構
- [ ] 移動 `pro/organization/` 到 `org/`
- [ ] 更新路由為 `/org/:orgname`
- [ ] API 改用 slug 而不是 id
- [ ] 更新 Mock 數據支持 slug
- [ ] 更新組織切換器導航
- [ ] 測試所有組織功能
- [ ] 測試權限守衛

### Phase 3: User Profile 創建
- [ ] 創建 `routes/user/` 目錄結構
- [ ] 實施 user-profile 組件
- [ ] 實施 user-projects 組件
- [ ] 實施 user-organizations 組件
- [ ] 實施 user-settings 組件（僅本人）
- [ ] 創建 UserProfileService
- [ ] 創建 userOwnerGuard
- [ ] 創建 Mock 數據
- [ ] 添加到主路由
- [ ] 測試所有用戶功能

### Phase 4: Unified Projects 模組
- [ ] 創建 `routes/projects/` 共享模組
- [ ] 實施 ProjectOwner 模型
- [ ] 實施統一組件（list, detail, form）
- [ ] 整合到 user routes
- [ ] 整合到 org routes
- [ ] 創建統一 Mock 數據
- [ ] 測試 user projects
- [ ] 測試 org projects

### Phase 5: 文檔更新
- [ ] 更新 Memory Bank activeContext
- [ ] 更新 Memory Bank techContext
- [ ] 更新 Memory Bank implementation-status
- [ ] 創建重構報告
- [ ] 更新項目 README

## ⚠️ 重構風險與對策

### 風險 1: 破壞現有功能
**對策**：
- ✅ 使用功能分支開發
- ✅ 完整的測試計劃
- ✅ 保留備份
- ✅ 漸進式重構（一次一個 Phase）

### 風險 2: 路由衝突
**對策**：
- ✅ 清晰的路由前綴（/account, /u, /org）
- ✅ 路由順序設計（具體路由在前）
- ✅ 通配符路由在最後

### 風險 3: Mock 數據不同步
**對策**：
- ✅ 集中管理 Mock 數據
- ✅ 統一的數據生成函數
- ✅ Mock 數據版本控制

### 風險 4: 用戶混淆
**對策**：
- ✅ 清晰的視覺區分（私有 vs 公開）
- ✅ 麵包屑導航
- ✅ 頁面標題明確
- ✅ 一致的命名規範

## 📚 參考 GitHub 實際設計

### GitHub 的路由設計

```
私有管理：
/settings                    # 我的設定（等同於我們的 /account/settings）
/settings/profile            # 檔案設定
/settings/account            # 帳戶設定
/settings/security           # 安全設定

公開檔案：
/:username                   # 用戶公開檔案（等同於 /u/:username）
/:username?tab=repositories  # 用戶的倉庫
/:username?tab=projects      # 用戶的項目

組織：
/:orgname                    # 組織頁面（等同於 /org/:orgname）
/orgs/:orgname/people        # 成員
/orgs/:orgname/teams         # 團隊
```

### 我們的對應設計

```
私有管理：
/account/center              # 我的中心
/account/settings            # 我的設定
/account/settings/base       # 基本設定
/account/settings/security   # 安全設定

公開檔案：
/u/:username                 # 用戶公開檔案
/u/:username/projects        # 用戶的項目
/u/:username/organizations   # 用戶的組織

組織：
/org/:orgname                # 組織頁面
/org/:orgname/members        # 成員
/org/:orgname/teams          # 團隊
/org/:orgname/projects       # 項目
/org/:orgname/settings       # 設定（僅 owner）

列表：
/users                       # 用戶列表
/organizations               # 組織列表
```

## 🎨 視覺設計指引

### Account vs User Profile 視覺區分

**Account 頁面**（私有管理）：
- 🔒 顯示鎖頭圖示
- 📝 編輯表單風格
- 💾 保存按鈕明顯
- ⚙️ 設定風格的 UI
- 顏色：偏向管理後台色調

**User Profile 頁面**（公開展示）：
- 👤 大頭像展示
- 📊 統計卡片
- 🔗 社交連結
- 📌 Follow 按鈕
- 顏色：偏向展示風格

**Organization 頁面**（公開或受限）：
- 🏢 組織 Logo 大圖
- 📊 組織統計
- 👥 成員預覽
- 📁 項目預覽
- Tab 切換不同區域

## 💡 最佳實踐建議

### 1. 統一的所有權模型

```typescript
// 核心抽象：Owner
export type OwnerType = 'user' | 'organization';

export interface Owner {
  type: OwnerType;
  id: string;
  slug: string;        // username 或 orgname
  name: string;
  avatarUrl?: string;
  url: string;         // /u/:slug 或 /org/:slug
}

// 使用範例
const userOwner: Owner = {
  type: 'user',
  id: '123',
  slug: 'alice',
  name: 'Alice Wang',
  avatarUrl: '...',
  url: '/u/alice'
};

const orgOwner: Owner = {
  type: 'organization',
  id: '456',
  slug: 'techcorp',
  name: 'Tech Corp',
  avatarUrl: '...',
  url: '/org/techcorp'
};
```

### 2. 統一的權限檢查

```typescript
// 權限服務
@Injectable({ providedIn: 'root' })
export class PermissionService {
  // 檢查對 Owner 擁有的資源的權限
  checkOwnerPermission(
    owner: Owner,
    permission: 'read' | 'write' | 'admin'
  ): Observable<boolean> {
    if (owner.type === 'user') {
      return this.checkUserPermission(owner.slug, permission);
    } else {
      return this.checkOrgPermission(owner.slug, permission);
    }
  }
  
  // 檢查是否為當前用戶
  isCurrentUser(username: string): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser.username === username;
  }
  
  // 檢查組織權限
  checkOrgPermission(orgname: string, permission: string): Observable<boolean> {
    return this.membershipService.getUserRole(orgname).pipe(
      map(role => this.hasPermission(role, permission))
    );
  }
}
```

### 3. 統一的導航輔助

```typescript
// 導航服務
@Injectable({ providedIn: 'root' })
export class NavigationHelper {
  // 導航到 Owner 頁面
  navigateToOwner(owner: Owner): void {
    this.router.navigate([owner.url]);
  }
  
  // 導航到 Owner 的項目
  navigateToOwnerProjects(owner: Owner): void {
    this.router.navigate([owner.url, 'projects']);
  }
  
  // 導航到我的帳戶
  navigateToMyAccount(): void {
    this.router.navigate(['/account/center']);
  }
  
  // 導航到我的公開檔案
  navigateToMyProfile(): void {
    const currentUser = this.authService.getCurrentUser();
    this.router.navigate(['/u', currentUser.username]);
  }
}
```

## 📈 實施優先級

### 🥇 高優先級（建議立即執行）

**Phase 1 + 2**: Account 調整 + Organization 重構
- **時間**：2-3 天
- **價值**：高（解決當前混淆）
- **風險**：低（主要是移動和路由調整）
- **依賴**：無

**為什麼先做**：
- 解決當前路由不符合規劃的問題
- 為後續 User 和 Projects 打好基礎
- 風險低，容易驗證

### 🥈 中優先級（短期目標）

**Phase 3**: User 公開檔案模組
- **時間**：1 週
- **價值**：高（完成 GitHub 風格核心）
- **風險**：中（新功能開發）
- **依賴**：Phase 1, 2 完成

**為什麼重要**：
- 完成 User + Organization 對稱設計
- 實現完整的 GitHub 風格
- Memory Bank User 域規劃可以使用

### 🥉 中優先級（中期目標）

**Phase 4**: 統一 Projects 模組
- **時間**：1-2 週
- **價值**：極高（核心業務價值）
- **風險**：中（跨模組整合）
- **依賴**：Phase 1, 2, 3 完成

**為什麼重要**：
- 實現真正的 GitHub 風格所有權模型
- 可以展示完整的功能鏈
- 為 BIM、Cost 等模組打基礎

## 🚀 建議的執行順序

### 選項 A：穩健漸進（推薦） ⭐

```
Week 1: Phase 1 + 2（重構基礎）
├── Day 1-2: Account 路由調整 + 測試
├── Day 3-4: Organization 移動到 /org
└── Day 5:   整合測試 + 文檔更新

Week 2-3: Phase 3（User Profile）
├── Day 1-2: 創建目錄結構 + 路由配置
├── Day 3-4: 實施核心組件（profile, projects）
├── Day 5-6: 實施 Mock 數據 + 守衛
└── Day 7:   整合測試 + 文檔

Week 4-5: Phase 4（Unified Projects）
├── Day 1-2: 創建共享組件
├── Day 3-4: 實施 ProjectOwner 模型
├── Day 5-6: 整合到 user 和 org
└── Day 7:   端到端測試 + 文檔
```

**優點**：
- ✅ 風險可控
- ✅ 每個 Phase 可獨立測試
- ✅ 可隨時暫停或調整

### 選項 B：快速實施（激進）

```
Week 1: 全部重構
├── Day 1: Phase 1 + 2
├── Day 2-3: Phase 3
├── Day 4-5: Phase 4
└── Day 6-7: 整合測試
```

**優點**：
- ✅ 快速完成
- ✅ 避免中間狀態

**缺點**：
- ⚠️ 風險較高
- ⚠️ 難以隔離問題
- ⚠️ 測試時間緊張

## 📊 決策矩陣

| 考慮因素 | 不要 User（只有 Org） | 保留 User + Org |
|---------|---------------------|-----------------|
| **架構複雜度** | ⭐⭐ 簡單 | ⭐⭐⭐⭐ 複雜 |
| **功能完整性** | ⭐⭐ 受限 | ⭐⭐⭐⭐⭐ 完整 |
| **GitHub 對齊** | ⭐⭐ 部分 | ⭐⭐⭐⭐⭐ 完全 |
| **Memory Bank 對齊** | ⭐⭐ 部分 | ⭐⭐⭐⭐⭐ 完全 |
| **靈活性** | ⭐⭐ 低 | ⭐⭐⭐⭐⭐ 高 |
| **個人項目** | ❌ 不支持 | ✅ 支持 |
| **實施時間** | ⭐⭐⭐⭐⭐ 短 | ⭐⭐⭐ 中等 |
| **維護成本** | ⭐⭐⭐⭐ 低 | ⭐⭐⭐ 中等 |

## ✅ 最終建議

### 🎯 推薦方案：**保留 User + Organization**

**核心理由**：
1. ✅ **架構完整性**：符合 GitHub 完整模型
2. ✅ **業務靈活性**：支持個人和企業兩種場景
3. ✅ **Memory Bank 對齊**：充分利用已有規劃
4. ✅ **可擴展性**：為未來功能預留空間
5. ✅ **用戶體驗**：清晰的私有/公開視角分離

**透過清晰的設計避免混淆**：
- 路由分離：`/account/*` vs `/u/:username` vs `/org/:orgname`
- 命名規範：AccountService vs UserProfileService vs OrganizationService
- 視覺區分：管理風格 vs 展示風格
- 功能分離：私有管理 vs 公開展示

## 🎬 下一步行動

### 立即行動（今天）

**創建重構任務**：
```
請告訴我：
1. 您希望使用「選項 A：穩健漸進」還是「選項 B：快速實施」？
2. 我可以立即開始 Phase 1（Account 調整）的實施
3. 或者您希望先 PLAN → CREATIVE 完整設計後再實施？
```

### 建議工作流程

**選項 1：立即開始重構**（如果您認同方案）
```
我可以：
1. 開始 Phase 1: 調整 Account 路由
2. 開始 Phase 2: 重構 Organization 到 /org
3. 逐步完成所有 Phases
```

**選項 2：進入 CREATIVE 模式**（如果需要更多設計）
```
進入 CREATIVE 模式深入設計：
- UI/UX 詳細設計
- 數據流程設計
- 組件互動設計
- 權限矩陣設計
```

---

**🎉 架構分析完成！**

**核心結論**：
- ✅ **保留 User**：必要且有價值
- ✅ **清晰分離**：Account（私有）vs User Profile（公開）vs Organization
- ✅ **重構必要**：當前 `/pro/organization` 需移到 `/org`
- ✅ **方案可行**：技術、UX、Memory Bank 全面驗證通過

**您的下一步決定**：
告訴我您想如何繼續：
1. 🚀 開始執行重構 Phase 1？
2. 🎨 進入 CREATIVE 模式深入設計？
3. 📋 進入 PLAN 模式制定詳細計劃？

