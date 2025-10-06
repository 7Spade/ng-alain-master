import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [NzButtonModule],
  template: `
    <div style="display:flex;min-height:60vh;align-items:center;justify-content:center;flex-direction:column;text-align:center;gap:16px;">
      <h1 style="margin:0;">歡迎使用 ng-alain</h1>
      <p style="max-width:680px;opacity:.75;">
        基於 Angular 和 ng-zorro-antd 構建的企業級管理後台系統。點擊下方按鈕開始登入並探索儀表板。
      </p>
      <button nz-button nzType="primary" nzSize="large" (click)="start()">開始登入</button>
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


