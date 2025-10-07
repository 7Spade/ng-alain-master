# 組織管理功能

基於 ng-alain 和 ng-zorro-antd 構建的企業級組織管理功能模組。

## 📁 目錄結構

```
src/app/routes/pro/organization/
├── README.md                           # 說明文檔
├── routes.ts                           # 路由配置
├── models/                             # 數據模型
│   ├── user.model.ts                   # 用戶模型
│   ├── organization.model.ts           # 組織模型
│   └── membership.model.ts             # 成員關係模型
├── services/                           # 服務層
│   ├── user.service.ts                 # 用戶服務
│   ├── organization.service.ts         # 組織服務
│   └── membership.service.ts           # 成員關係服務
├── guards/                             # 路由守衛
│   └── org-admin.guard.ts              # 組織權限守衛
├── components/                         # 組件
│   ├── organization-list/              # 組織列表
│   ├── organization-form/              # 組織表單
│   ├── user-profile/                   # 用戶檔案
│   ├── org-profile/                    # 組織檔案
│   ├── org-members/                    # 組織成員管理
│   ├── org-settings/                   # 組織設定
│   ├── org-invitations/                # 邀請管理
│   └── org-structure/                  # 組織架構
└── shared/                             # 共用組件
    ├── avatar.component.ts             # 頭像組件
    ├── entity-tag.component.ts         # 實體標籤組件
    └── member-list.component.ts        # 成員列表組件
```

## 🚀 功能特性

### 核心功能
- ✅ **組織管理**: 創建、編輯、刪除組織
- ✅ **成員管理**: 邀請、移除、角色管理
- ✅ **權限控制**: 基於角色的訪問控制
- ✅ **用戶檔案**: 用戶信息展示和管理

### 技術特性
- ✅ **響應式設計**: 適配各種設備尺寸
- ✅ **懶加載**: 模組和組件按需加載
- ✅ **類型安全**: 完整的 TypeScript 類型定義
- ✅ **組件化**: 基於 ng-zorro-antd 的組件庫

## 📋 路由配置

| 路徑 | 組件 | 權限 | 描述 |
|------|------|------|------|
| `/pro/organization` | OrganizationListComponent | 公開 | 組織列表 |
| `/pro/organization/create` | OrganizationFormComponent | 公開 | 創建組織 |
| `/pro/organization/user/:id` | UserProfileComponent | 公開 | 用戶檔案 |
| `/pro/organization/:id` | OrgProfileComponent | 成員 | 組織檔案 |
| `/pro/organization/:id/members` | OrgMembersComponent | 管理員 | 成員管理 |
| `/pro/organization/:id/settings` | OrgSettingsComponent | 擁有者 | 組織設定 |
| `/pro/organization/:id/invitations` | OrgInvitationsComponent | 管理員 | 邀請管理 |
| `/pro/organization/:id/structure` | OrgStructureComponent | 成員 | 組織架構 |

## 🔐 權限系統

### 角色定義
- **OWNER**: 擁有者，擁有所有權限
- **ADMIN**: 管理員，可以管理成員和邀請
- **MEMBER**: 普通成員，可以查看組織信息
- **VIEWER**: 查看者，只能查看公開信息

### 權限守衛
- `orgOwnerGuard`: 僅擁有者可以訪問
- `orgAdminGuard`: 管理員和擁有者可以訪問
- `orgMemberGuard`: 所有成員都可以訪問

## 🗂️ Mock 資料

組織管理功能的 Mock 資料已整合到項目根目錄的 `_mock/` 目錄中：

- `_mock/_organization.ts` - 組織相關的所有 API endpoints
- `_mock/_org-user.ts` - 用戶相關的所有 API endpoints

這些 Mock 資料會在開發環境中自動生效，提供以下 API：

**組織 API**:
- `GET /api/organizations` - 獲取組織列表（支援分頁、篩選）
- `GET /api/organizations/:id` - 獲取單個組織
- `POST /api/organizations` - 創建組織
- `PUT /api/organizations/:id` - 更新組織
- `DELETE /api/organizations/:id` - 刪除組織
- `GET /api/organizations/:id/stats` - 獲取組織統計
- `GET /api/organizations/check-name` - 檢查名稱可用性
- `GET /api/organizations/public/:name` - 獲取公開組織資訊

**用戶 API**:
- `GET /api/users` - 獲取用戶列表（支援分頁、篩選）
- `GET /api/users/:id` - 獲取單個用戶
- `POST /api/users` - 創建用戶
- `PUT /api/users/:id` - 更新用戶
- `DELETE /api/users/:id` - 刪除用戶
- `GET /api/users/:id/followers` - 獲取關注者
- `GET /api/users/:id/following` - 獲取關注列表
- `POST /api/users/:id/follow` - 關注用戶
- `DELETE /api/users/:id/follow` - 取消關注
- `GET /api/users/:id/organizations` - 獲取用戶的組織列表

## 🛠️ 開發指南

### 添加新功能
1. 在 `models/` 中定義數據模型
2. 在 `services/` 中實現業務邏輯
3. 在 `components/` 中創建 UI 組件
4. 在 `routes.ts` 中配置路由
5. 在 `guards/` 中添加權限控制
6. 如需新增 Mock API，請在 `_mock/` 目錄中添加對應的處理函數

### 使用組件
```typescript
import { OrganizationService } from './services/organization.service';

@Component({
  // ...
})
export class YourComponent {
  private readonly organizationService = inject(OrganizationService);
  
  loadOrganizations() {
    this.organizationService.getOrganizations().subscribe(result => {
      // 處理結果
    });
  }
}
```

## 📊 數據模型

### Organization
```typescript
interface Organization {
  id: string;
  name: string;
  displayName?: string;
  description?: string;
  avatarUrl?: string;
  website?: string;
  location?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  isPublic: boolean;
  membersCount: number;
  repositoriesCount: number;
  settings?: OrganizationSettings;
}
```

### User
```typescript
interface User {
  id: string;
  username: string;
  name?: string;
  email?: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  website?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  stats?: UserStats;
}
```

### Membership
```typescript
interface Membership {
  id: string;
  userId: string;
  organizationId: string;
  role: MemberRole;
  joinedAt: Date;
  invitedBy?: string;
}
```

## 🔧 配置說明

### 環境變量
```typescript
// environment.ts
export const environment = {
  apiUrl: '/api',
  organizationSettings: {
    maxMembers: 1000,
    maxRepositories: 500,
    allowPublicOrganizations: true
  }
};
```

### 主題配置
```typescript
// styles.less
.organization-theme {
  --org-primary-color: #1890ff;
  --org-success-color: #52c41a;
  --org-warning-color: #faad14;
  --org-error-color: #f5222d;
}
```

## 🧪 測試

### 單元測試
```bash
npm run test -- --include="**/organization/**/*.spec.ts"
```

### E2E 測試
```bash
npm run e2e -- --include="**/organization/**/*.e2e-spec.ts"
```

## 📝 更新日誌

### v1.0.0 (2024-01-06)
- ✅ 初始版本發布
- ✅ 基礎組織管理功能
- ✅ 成員管理和權限控制
- ✅ 響應式 UI 設計
- ✅ TypeScript 類型安全

## 🤝 貢獻指南

1. Fork 項目
2. 創建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 開啟 Pull Request

## 📄 許可證

本項目採用 MIT 許可證 - 查看 [LICENSE](LICENSE) 文件了解詳情。

## 🔗 相關鏈接

- [ng-alain 官方文檔](https://ng-alain.com/)
- [ng-zorro-antd 官方文檔](https://ng.ant.design/)
- [Angular 官方文檔](https://angular.io/)