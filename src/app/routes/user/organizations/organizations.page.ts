import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-organizations-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">User Organizations</h2>
      <div>List coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationsPage {}


