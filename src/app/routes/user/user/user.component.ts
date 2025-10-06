import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppContextStore } from '../../../shared/context/context.store';
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
  private readonly ctx = inject(AppContextStore);
  readonly username = signal<string>(this.route.snapshot.paramMap.get('username') ?? '');
  readonly mode = this.ctx.contextType; // 'user' | 'organization'

  switchToUser(): void {
    this.ctx.setUser(this.username());
    this.ctx.navigateToCurrent();
  }

  switchToOrganization(): void {
    const slug = prompt('請輸入要切換的組織識別（slug）');
    if (!slug) return;
    this.ctx.setOrganization(slug);
    this.ctx.navigateToCurrent();
  }
}


