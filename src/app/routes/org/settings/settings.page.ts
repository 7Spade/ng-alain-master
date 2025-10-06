import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-org-settings-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Organization Settings</h2>
      <div>Basic info form coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {}


