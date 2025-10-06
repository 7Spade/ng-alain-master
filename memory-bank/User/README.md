# @User 模組

本區定義使用者相關的核心與增強模組，與 `@Organization/`、`@Project-Build/` 對齊，並相容 Angular 20、ng-alain、@delon/*、ng-zorro-antd、@angular/fire。

- 核心模組：
  1. User Account
  2. Authentication & Authorization
  3. User Profile
  4. User Preferences
  5. Session Management
  6. User Audit & Security

- 增強模組：
  7. Notifications & Subscriptions
  8. Integrations & Connected Accounts

相容性原則：
- 資料獲取以 `@delon/util`、`_HttpClient` 或 `HttpClient` 為主；
- 權限以 `@delon/auth`、ACL 與組織/角色策略對齊；
- UI 以 ng-zorro-antd 與 @delon/abc（ST/SE）優先；
- 認證與資料儲存以 `@angular/fire` 模組化 API（v20）整合；
- 採用 Angular 20 現代語法（standalone、signals、@if/@for、typed forms）。
