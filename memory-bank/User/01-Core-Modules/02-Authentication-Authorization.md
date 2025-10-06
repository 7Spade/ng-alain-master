# 2️⃣ Authentication & Authorization（@angular/fire + @delon/auth）

## 概述
- 使用 `@angular/fire` 提供登入/登出、多提供者與 token 取得；
- 使用 `@delon/auth` 管理本地 token、路由守衛與 ACL；
- 與 `@Organization/04-Permission-Control` 保持一致。

## 登入流程（摘要）
1. 使用 `signInWithEmailAndPassword` 或 `signInWithPopup` 完成 Firebase 登入；
2. 取得 Firebase Id Token，交換/簽發後端 JWT（可選）；
3. 以 `DA_SERVICE_TOKEN`（@delon/auth）保存 token 與過期時間；
4. 路由守衛檢查：登入狀態 + ACL 權限。

## 服務（精簡示例）
```ts
@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  private readonly auth = inject(Auth);
  private readonly tokenService = inject(DA_SERVICE_TOKEN);

  signInEmail(email: string, password: string) {
    return from(signInWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(async cred => {
        const token = await cred.user.getIdToken();
        this.tokenService.set({ token, expired: +new Date() + 3600_000 });
        return cred.user;
      })
    );
  }

  signOut() {
    this.tokenService.clear();
    return from(signOut(this.auth));
  }
}
```

## 路由守衛/攔截器（摘要）
- `CanActivate`: 驗證登入狀態與必要權限；
- `HTTP Interceptor`: 將 `DA_SERVICE_TOKEN` 中的 token 附加至請求頭。

## 檢查清單
- [ ] Email/Provider 登入
- [ ] Token 對齊 @delon/auth
- [ ] ACL 與 @Organization 角色/權限映射
