import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-organization-form',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="organization-form">
      <h2>創建組織</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .organization-form {
      padding: 24px;
    }
  `]
})
export class OrganizationFormComponent {}