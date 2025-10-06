# 3️⃣ User Profile 模組

## 概述
- 使用者個人資料與 UI 編輯（ng-zorro-antd + @delon/abc SE/ST），同步 Firebase `User` 與後端擴充欄位。

## 資料模型
```ts
interface UserProfile {
  userId: string;
  bio?: string;
  avatar?: string;
  location?: string;
  social?: { github?: string; twitter?: string; linkedin?: string };
  preferencesRef?: string; // 關聯 User Preferences
  updatedAt: Date;
}
```

## 組件（精簡示例）
```ts
@Component({
  selector: 'app-user-profile',
  template: `
    <nz-card>
      <se-container>
        <se label="頭像">
          <nz-upload [nzShowUploadList]="false" (nzChange)="onUpload($event)">
            <button nz-button>上傳</button>
          </nz-upload>
        </se>
        <se label="暱稱">
          <input nz-input [formControl]="displayName" />
        </se>
        <se label="個人簡介">
          <textarea nz-input [formControl]="bio" rows="3"></textarea>
        </se>
        <se>
          <button nz-button nzType="primary" (click)="save()">保存</button>
        </se>
      </se-container>
    </nz-card>
  `
})
export class UserProfileComponent {
  displayName = new FormControl('', { nonNullable: true });
  bio = new FormControl('');
  private readonly profile = inject(UserProfileService);

  save() { /* 調用服務保存 */ }
  onUpload(e: any) { /* 上傳頭像 */ }
}
```

## 服務（摘要）
```ts
@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly http = inject(_HttpClient);
  get(userId: string) { return this.http.get<UserProfile>(`/api/users/${userId}/profile`); }
  update(userId: string, dto: Partial<UserProfile>) { return this.http.patch(`/api/users/${userId}/profile`, dto); }
}
```

## 檢查清單
- [ ] 與 @angular/fire 使用者資料對齊
- [ ] 使用 ng-zorro 與 @delon/abc 表單
- [ ] 後端 API 對齊 @Organization 命名
