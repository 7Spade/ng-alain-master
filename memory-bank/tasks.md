# Task: Users & Orgs（GitHub 風格骨架）

## Complexity
Level: 3
Type: Feature

## Requirements
- [ ] User CRUD 與 Profile 頁
- [ ] Organization CRUD、Members、Settings
- [ ] Follow（User↔User）、Membership（Org↔User）
- [ ] 守衛：Org 管理頁需 admin/owner 才可訪問

## Components Affected
- src/app/routes：新增 profiles 模組 + 多個 component
- src/app/core：服務與守衛（或置於 feature providers）
- _mock：擴充 /api users、orgs、members

## Implementation Steps
1. [ ] 建立模型 User/Organization/Membership
2. [ ] 新增 
outes/profiles 模組與路由
3. [ ] 建立 UserService/OrgService
4. [ ] 建立 OrgAdminGuard
5. [ ] 建立元件骨架：user-profile、org-profile、org-members、org-settings
6. [ ] 假資料端點與服務串接
7. [ ] 單元測試骨架（service/guard/component create）

## Creative Phases Required
- [ ] 🎨 UI/UX 佈局
- [ ] 🏗️ Guard 與 Service 放置位置

## Checkpoints
- [ ] 路由可導覽
- [ ] 守衛限制生效
- [ ] 服務呼叫可返回資料
- [ ] 基本頁面渲染成功

## Status
- Phase: Completed ✅
- Status: Implemented
- Blockers: None

## Implementation Summary
✅ **已完成的功能**:
1. **數據模型** (models/):
   - organization.model.ts: Organization, OrganizationSettings, MemberRole
   - user.model.ts: User, UserStats
   - membership.model.ts: Membership

2. **服務層** (services/):
   - organization.service.ts: 組織 CRUD + 統計 + 頭像上傳
   - user.service.ts: 用戶管理 + Follow 關係
   - membership.service.ts: 成員關係管理

3. **權限守衛** (guards/):
   - orgOwnerGuard: 僅擁有者
   - orgAdminGuard: 管理員 + 擁有者
   - orgMemberGuard: 所有成員

4. **UI 組件** (components/): 8個
   - organization-list: 組織列表（網格佈局 + 搜索 + 分頁）
   - organization-form: 創建/編輯表單
   - user-profile: 用戶檔案頁
   - org-profile: 組織檔案頁
   - org-members: 成員管理（邀請/角色/移除）
   - org-settings: 組織設定
   - org-invitations: 邀請管理
   - org-structure: 組織架構視圖

5. **Mock 數據** (_mock/):
   - _organization.ts: 組織相關 API（9個端點）
   - _org-user.ts: 用戶相關 API（9個端點）

6. **路由配置** (routes.ts):
   - 懶加載 standalone 組件
   - 權限守衛整合
   - i18n 支援

## Technical Highlights
- ✅ Angular 20 最佳實踐：Standalone components, @if/@for, OnPush
- ✅ 響應式設計：Grid layout + 行動裝置適配
- ✅ 類型安全：完整 TypeScript 類型定義
- ✅ @delon 整合：_HttpClient, ACL, Theme
- ✅ ng-zorro-antd UI：Card, Avatar, Tag, Pagination, etc.
