import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type AppContextType = 'user' | 'organization';

@Injectable({ providedIn: 'root' })
export class AppContextStore {
  private readonly router = inject(Router);

  readonly contextType = signal<AppContextType>('user');
  readonly slug = signal<string>('');

  setUser(username: string): void {
    this.contextType.set('user');
    this.slug.set(username);
  }

  setOrganization(orgSlug: string): void {
    this.contextType.set('organization');
    this.slug.set(orgSlug);
  }

  navigateToCurrent(): void {
    const type = this.contextType();
    const id = this.slug();
    if (!id) return;
    if (type === 'user') this.router.navigateByUrl(`/u/${id}`);
    else this.router.navigateByUrl(`/org/${id}`);
  }
}


