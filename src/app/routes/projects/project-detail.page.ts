import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Project Detail</h2>
      <div>Tabs coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectDetailPage {}


