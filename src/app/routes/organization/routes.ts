import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'new', loadComponent: () => import('./create/create.component').then(m => m.OrganizationCreateComponent) },
  { path: ':org/manage', loadComponent: () => import('./manage/manage.component').then(m => m.OrganizationManageComponent) },
  { path: ':org', loadComponent: () => import('./organization/organization.component').then(m => m.OrganizationComponent) }
];


