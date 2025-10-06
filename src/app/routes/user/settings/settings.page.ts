import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">User Settings</h2>
      <div>Preferences form coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsPage {}


