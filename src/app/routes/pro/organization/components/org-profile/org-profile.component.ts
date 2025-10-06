import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-profile">
      <h2>組織檔案</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .org-profile {
      padding: 24px;
    }
  `]
})
export class OrgProfileComponent {}