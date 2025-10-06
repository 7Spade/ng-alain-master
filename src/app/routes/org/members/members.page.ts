import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-org-members-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Organization Members</h2>
      <div>Table coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent {}


