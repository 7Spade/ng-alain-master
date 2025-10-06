import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NzButtonModule],
  template: `
    <div style="display:flex;min-height:60vh;align-items:center;justify-content:center;flex-direction:column;text-align:center;gap:16px;">
      <h1 style="margin:0;">Welcome to ng-alain</h1>
      <p style="max-width:680px;opacity:.75;">
        Enterprise admin starter built on Angular and ng-zorro-antd. Click Start to sign in and explore the dashboard.
      </p>
      <button nz-button nzType="primary" (click)="start()">Start</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent {
  private readonly router = inject(Router);
  start(): void {
    this.router.navigateByUrl('/passport/login');
  }
}


