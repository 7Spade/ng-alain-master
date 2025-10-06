import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-settings">
      <h2>組織設定</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .org-settings {
      padding: 24px;
    }
  `]
})
export class OrgSettingsComponent {}