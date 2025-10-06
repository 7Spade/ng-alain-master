import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, NzSkeletonModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent {
  private readonly route = inject(ActivatedRoute);
  readonly username = signal<string>(this.route.snapshot.paramMap.get('username') ?? '');
}


