import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">User Profile</h2>
      <div>Profile form coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePage {}


