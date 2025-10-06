import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-members',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-members">
      <h2>組織成員</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .org-members {
      padding: 24px;
    }
  `]
})
export class OrgMembersComponent {}