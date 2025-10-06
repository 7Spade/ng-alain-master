import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-owner-router',
  standalone: true,
  template: ''
})
export class OwnerRouterComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  constructor() {
    const owner = this.route.snapshot.paramMap.get('owner');
    const projectSlug = this.route.snapshot.paramMap.get('projectSlug');
    if (!owner) {
      this.router.navigateByUrl('/');
      return;
    }
    // naive heuristic: org if contains '-' (customize as needed) or configurable later
    const isOrg = owner.includes('-');
    if (projectSlug) {
      this.router.navigate([isOrg ? '/org' : '/u', owner, 'projects', projectSlug]);
    } else {
      this.router.navigate([isOrg ? '/org' : '/u', owner, isOrg ? 'overview' : 'profile']);
    }
  }
}


