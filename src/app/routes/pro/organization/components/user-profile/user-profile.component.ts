import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-profile">
      <h2>用戶檔案</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .user-profile {
      padding: 24px;
    }
  `]
})
export class UserProfileComponent {}