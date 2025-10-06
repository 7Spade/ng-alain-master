# 1️⃣ User Account 模組

## 概述
- 提供使用者帳號的生命週期與資料模型，串接 `@angular/fire`（Auth/Firestore）與組織關聯（多租戶）。

## 資料模型
```typescript
interface UserAccount {
  id: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;
  isEmailVerified: boolean;
  providerIds: string[]; // ['password','google.com',...]
  organizations: Array<{ orgId: string; role: string; joinedAt: Date }>; // 與 Organization 關聯
  createdAt: Date;
  updatedAt: Date;
}
```

## Angular 服務（精簡示例）
```ts
@Injectable({ providedIn: 'root' })
export class UserAccountService {
  private readonly http = inject(_HttpClient); // 或 HttpClient
  private readonly auth = inject(Auth); // @angular/fire/auth

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth);
  }

  // 以 API 形式補充帳號擴充欄位（後端可對齊 @Organization 設計）
  getAccountProfile(userId: string): Observable<UserAccount> {
    return this.http.get<UserAccount>(`/api/users/${userId}`);
  }
}
```

## REST 端點（對齊 @Organization）
```http
GET    /api/users/:id
PATCH  /api/users/:id
GET    /api/users/:id/organizations
```

## 檢查清單
- [ ] 與 @Organization 關聯欄位（roles、permissions）
- [ ] 與 @angular/fire auth 狀態同步
- [ ] 與 @delon/auth token 攜帶一致
