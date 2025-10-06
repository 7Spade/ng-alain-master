import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-org-permissions-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Organization Permissions</h2>
      <div>Role list and permission tree coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsPage {}


