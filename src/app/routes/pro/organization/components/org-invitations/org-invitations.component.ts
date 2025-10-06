import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-invitations',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-invitations">
      <h2>邀請管理</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .org-invitations {
      padding: 24px;
    }
  `]
})
export class OrgInvitationsComponent {}