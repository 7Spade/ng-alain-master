import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-manage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectManageComponent {}
