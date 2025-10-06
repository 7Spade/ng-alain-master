import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':orgSlug',
    loadComponent: () => import('./organization-shell.component').then(m => m.OrganizationShellComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadComponent: () => import('./overview/overview.page').then(m => m.OverviewPage) },
      { path: 'members', loadComponent: () => import('./members/members.page').then(m => m.MembersPage) },
      { path: 'teams', loadComponent: () => import('./teams/teams.page').then(m => m.TeamsPage) },
      { path: 'permissions', loadComponent: () => import('./permissions/permissions.page').then(m => m.PermissionsPage) },
      { path: 'settings', loadComponent: () => import('./settings/settings.page').then(m => m.SettingsPage) },
      { path: 'projects', loadChildren: () => import('../projects/projects.routes').then(m => m.routes) }
    ]
  }
];


