import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-projects-list-page',
  standalone: true,
  template: `
    <div class="px-md py-sm">
      <h2 class="mb-sm">Projects</h2>
      <div>List coming soon…</div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsListPage {}


