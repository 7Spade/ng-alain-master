import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':userSlug',
    loadComponent: () => import('./user-shell.component').then(m => m.UserShellComponent),
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', loadComponent: () => import('./profile/profile.page').then(m => m.ProfileComponent) },
      { path: 'projects', loadChildren: () => import('../projects/projects.routes').then(m => m.routes) },
      { path: 'organizations', loadComponent: () => import('./organizations/organizations.page').then(m => m.OrganizationsComponent) },
      { path: 'settings', loadComponent: () => import('./settings/settings.page').then(m => m.SettingsComponent) }
    ]
  }
];


