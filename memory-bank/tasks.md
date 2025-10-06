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
2. [ ] 新增 outes/profiles 模組與路由
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
- Phase: Planning
- Status: In Progress
- Blockers: None
