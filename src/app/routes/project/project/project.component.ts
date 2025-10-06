import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [CommonModule, NzSkeletonModule],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectComponent {
  private readonly route = inject(ActivatedRoute);
  readonly owner = signal<string>(this.route.snapshot.paramMap.get('owner') ?? '');
  readonly project = signal<string>(this.route.snapshot.paramMap.get('project') ?? '');
}


