import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-org-teams-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Organization Teams</h2>
      <div>Tree view coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsComponent {}


