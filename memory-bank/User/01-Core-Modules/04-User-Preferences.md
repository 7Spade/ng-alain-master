# 4️⃣ User Preferences 模組

## 概述
- 個人偏好（主題、語言、通知偏好、版面密度等），以 Firestore/REST 儲存，頁面以 ng-zorro 表單與 @delon/abc SE 標單編排。

## 資料模型
```ts
interface UserPreferences {
  userId: string;
  theme: 'default' | 'dark' | 'compact';
  language: 'zh-CN' | 'en-US';
  density: 'comfortable' | 'compact';
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    types: string[]; // 對齊 @Organization/Notification-System
  };
  updatedAt: Date;
}
```

## 服務（摘要）
```ts
@Injectable({ providedIn: 'root' })
export class UserPreferencesService {
  private readonly http = inject(_HttpClient);
  get(userId: string) { return this.http.get<UserPreferences>(`/api/users/${userId}/preferences`); }
  update(userId: string, dto: Partial<UserPreferences>) { return this.http.patch(`/api/users/${userId}/preferences`, dto); }
}
```

## 檢查清單
- [ ] 與 i18n 與主題（@delon/theme）對齊
- [ ] 與通知系統整合
- [ ] 表單驗證與提示
