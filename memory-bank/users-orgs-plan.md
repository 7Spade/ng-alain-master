# Feature Planning Document: 使用者與組織（GitHub 風格）

## Requirements Analysis
- Core Requirements:
  - [ ] 使用者（User）CRUD、個人檔案、追蹤（follow）
  - [ ] 組織（Organization）CRUD、成員管理（roles: owner, admin, member）
  - [ ] 關係：User ↔ User（Follow）、Org ↔ User（Membership）
  - [ ] 頁面：User Profile、Org Profile、Org Members、Org Repos（骨架）
  - [ ] 權限：僅擁有者/管理員可管理成員與設定
- Technical Constraints:
  - [ ] 遵循現有 outes/* 模組化與 @delon/*、
g-zorro-antd 元件
  - [ ] 使用現有 core/net 攔截器與環境設定

## Component Analysis
- Modules/Routes:
  - outes/profiles 新增子模組：user, org
    - user-profile、org-profile、org-members、org-settings
  - 共用：shared 新增 vatar, entity-tag、member-list 組件（骨架）
- Services:
  - UserService：getUser(id), listFollowers(id), ollow(id)
  - OrgService：getOrg(id), listMembers(id), ddMember, emoveMember, updateRole
  - MembershipService（可選）：封裝 User-Org 關係操作
- State/Models:
  - User: { id, username, name?, bio?, avatarUrl?, stats? }
  - Organization: { id, login, name?, description?, avatarUrl? }
  - Membership: { orgId, userId, role }

## Design Decisions
- Architecture:
  - [ ] 採用功能模組分離（outes/profiles），服務置於 core 或各功能模組 providers 內
  - [ ] 路由守衛：OrgAdminGuard 僅允許角色 owner|admin 進入設定頁
  - [ ] 假資料以 _mock 擴充 endpoints：/api/users, /api/orgs, /api/orgs/:id/members
- UI/UX:
  - [ ] 沿用 page-header, card, list, 	able 樣式
  - [ ] User/Org Profile 採左右欄：左側檔案/組織資訊，右側內容分頁（followers/members）
- Algorithms:
  - [ ] 角色升降權限檢查於前端 guard + 後端響應碼（mock）

## Implementation Strategy
1. 模型與路由骨架
   - [ ] 定義 models/user.ts, models/org.ts, models/membership.ts
   - [ ] 新增 outes/profiles 模組與子路由（user/:id, org/:id, org/:id/members, org/:id/settings）
2. 服務與守衛
   - [ ] 建立 UserService, OrgService
   - [ ] 建立 OrgAdminGuard
3. UI 骨架
   - [ ] user-profile：基本資訊卡 + 追蹤按鈕
   - [ ] org-profile：基本資訊卡 + 入口按鈕（Members/Settings）
   - [ ] org-members：成員表格（角色切換下拉、移除按鈕僅在 admin 顯示）
   - [ ] org-settings：僅顯示表單骨架（名稱、描述）
4. 假資料與 API 串接
   - [ ] _mock 擴充 users/orgs/members 端點
   - [ ] 服務串接 + 錯誤處理（利用現有攔截器）
5. 測試與文件
   - [ ] 基礎單元測試（服務/守衛）
   - [ ] README 區塊更新與路由地圖

## Testing Strategy
- Unit Tests: Service/Guard 基本路徑；Component 建立成功
- Integration: 路由導覽與 guard 條件

## Documentation Plan
- memory-bank/users-orgs-plan.md（本文件）
- memory-bank/tasks.md：可操作任務清單
- 在 README.md 新增功能導覽簡述（可後續）

## Creative Phases Required
- 🎨 UI/UX：Profile 佈局與成員管理互動
- 🏗️ Architecture：Guard 與服務切分位置（core vs feature providers）

## Verification
- [ ] 功能路由與守衛能運作
- [ ] 假資料可返回正確格式
- [ ] 服務與 UI 骨架串上資料
