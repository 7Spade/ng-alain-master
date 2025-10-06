import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-org-overview-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Organization Overview</h2>
      <div>Stats coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverviewPage {}


