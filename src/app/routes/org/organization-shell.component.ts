import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-organization-shell',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class OrganizationShellComponent {}


