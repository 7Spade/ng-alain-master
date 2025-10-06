import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-org-structure',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="org-structure">
      <h2>組織架構</h2>
      <p>此功能正在開發中...</p>
    </div>
  `,
  styles: [`
    .org-structure {
      padding: 24px;
    }
  `]
})
export class OrgStructureComponent {}