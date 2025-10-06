import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'new', loadComponent: () => import('./create/create.component').then(m => m.ProjectCreateComponent) },
  { path: ':owner/:project/manage', loadComponent: () => import('./manage/manage.component').then(m => m.ProjectManageComponent) },
  { path: ':owner/:project', loadComponent: () => import('./project/project.component').then(m => m.ProjectComponent) }
];


