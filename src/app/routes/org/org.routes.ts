import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':orgSlug',
    loadComponent: () => import('./organization-shell.component').then(m => m.OrganizationShellComponent),
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', loadComponent: () => import('./overview/overview.page').then(m => m.OverviewComponent) },
      { path: 'members', loadComponent: () => import('./members/members.page').then(m => m.MembersComponent) },
      { path: 'teams', loadComponent: () => import('./teams/teams.page').then(m => m.TeamsComponent) },
      { path: 'permissions', loadComponent: () => import('./permissions/permissions.page').then(m => m.PermissionsComponent) },
      { path: 'settings', loadComponent: () => import('./settings/settings.page').then(m => m.OrgSettingsComponent) },
      { path: 'projects', loadChildren: () => import('../projects/projects.routes').then(m => m.routes) }
    ]
  }
];


