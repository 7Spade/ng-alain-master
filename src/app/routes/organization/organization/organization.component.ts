import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule, NzSkeletonModule],
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationComponent {
  private readonly route = inject(ActivatedRoute);
  readonly org = signal<string>(this.route.snapshot.paramMap.get('org') ?? '');
}


