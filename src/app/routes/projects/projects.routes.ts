import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', loadComponent: () => import('./projects-list.page').then(m => m.ProjectsListComponent) },
      { path: ':projectSlug', loadComponent: () => import('./project-detail.page').then(m => m.ProjectDetailComponent) }
    ]
  }
];


